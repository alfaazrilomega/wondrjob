import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { prisma } from "@/lib/lib/db";

export async function GET(request: Request) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => {
          const cookieHeader = request.headers.get("cookie");
          if (!cookieHeader) {
            return undefined;
          }
          const cookie = cookieHeader
            .split("; ")
            .find((row) => row.startsWith(name + "="));

          if (!cookie) {
            return undefined;
          }
          return cookie.split("=")[1];
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

  try {
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        name: true,
        email: true,
        twoFactorEnabled: true,
      },
    });

    if (!dbUser) {
      return new NextResponse("User not found in database", { status: 404 });
    }

    return NextResponse.json(dbUser);
  } catch {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
