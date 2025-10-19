import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/lib/db";

export async function POST(request: Request) {
  // 1. Create a server client to check the user's role.
  const supabaseUserClient = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => {
          const cookieHeader = request.headers.get("cookie");
          if (!cookieHeader) return undefined;
          const cookie = cookieHeader
            .split("; ")
            .find((row) => row.startsWith(`${name}=`));
          return cookie ? cookie.split("=")[1] : undefined;
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabaseUserClient.auth.getUser();

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const adminDbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { role: true },
  });

  if (adminDbUser?.role !== "ADMIN") {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // 2. If the user is an admin, create a privileged admin client.
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

  // 3. Proceed with generating the signed URL.
  try {
    const { fileName } = await request.json();
    const filePath = `public/${Date.now()}-${fileName}`;

    const { data, error } = await supabaseAdmin.storage
      .from("site-assets") // ASSUMPTION: Bucket is named 'site-assets'
      .createSignedUploadUrl(filePath);

    if (error) {
      throw error;
    }

    // Get the public URL for the file after it's uploaded.
    const {
      data: { publicUrl },
    } = supabaseAdmin.storage.from("site-assets").getPublicUrl(filePath);

    return NextResponse.json({ signedUrl: data.signedUrl, publicUrl });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create signed URL";
    return new NextResponse(message, {
      status: 500,
    });
  }
}
