import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { password } = await request.json();
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      console.error("Supabase reset password error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Password updated successfully.", user: data.user },
      { status: 200 },
    );
  } catch (error) {
    console.error("Server error during password reset:", error);
    let message = "Internal server error";
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
