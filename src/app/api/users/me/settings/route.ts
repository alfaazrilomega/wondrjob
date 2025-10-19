import { NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { prisma } from "@/lib/lib/db";
import { cookies } from "next/headers";

export async function PUT(request: Request) {
  // 1. Get the current authenticated user
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          const cookieStore = await cookies();
          const cookie = cookieStore.get(name);
          return cookie?.value;
        },
        async set(name: string, value: string, options: CookieOptions) {
          try {
            const cookieStore = await cookies();
            cookieStore.set({ name, value, ...options });
          } catch {}
        },
        async remove(name: string, options: CookieOptions) {
          try {
            const cookieStore = await cookies();
            cookieStore.set({ name, value: "", ...options });
          } catch {}
        },
      },
    },
  );

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // 2. Get the new setting from the request body
  const { twoFactorEnabled } = await request.json();

  if (typeof twoFactorEnabled !== "boolean") {
    return new NextResponse("Invalid request body", { status: 400 });
  }

  try {
    // 3. Update the user in the database using the session user's ID
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        twoFactorEnabled: twoFactorEnabled,
      },
    });

    return NextResponse.json({
      success: true,
      message: "2FA setting updated.",
    });
  } catch {
    return new NextResponse("Failed to update setting", { status: 500 });
  }
}
