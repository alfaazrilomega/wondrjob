import { NextResponse } from "next/server";
import { prisma } from "@/lib/lib/db";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!password || !email) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    const supabase = await createClient();
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    if (!authData.user) {
      return NextResponse.json({ error: "Login failed" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: authData.user.id },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found in database" },
        { status: 404 },
      );
    }

    let redirectTo = '/homepage'; // Default redirect
    switch (user.role) {
      case 'ADMIN':
        redirectTo = '/admin';
        break;
      case 'COMPANY':
        redirectTo = '/dashboard/company';
        break;
      case 'HRD':
        redirectTo = '/dashboard/hrd';
        break;
      case 'SOCIETY':
        redirectTo = '/homepage';
        break;
    }

    return NextResponse.json({
      user,
      session: authData.session,
      redirectTo,
    });

  } catch (error) {
    console.error("Login error:", error);
    const errorMessage = error instanceof Error ? error.message : "Login failed";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
