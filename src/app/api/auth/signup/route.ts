import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/lib/db";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { email, password, name, phone, address, date_of_birth, gender } =
    await request.json();
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
      },
    });

    if (error) {
      console.error("Supabase signup error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (data.user) {
      // Check if user already exists in our database by email
      const userInDb = await prisma.user.findUnique({
        where: {
          email: data.user.email!,
        },
      });

      if (userInDb) {
        // User with this email already exists.
        // Check if the ID matches the one from Supabase.
        if (userInDb.id !== data.user.id) {
          // This is a data inconsistency.
          return NextResponse.json(
            { error: "User data is inconsistent. Please contact support." },
            { status: 500 },
          );
        } else {
          // User exists and ID is correct. Nothing to do.
          return NextResponse.json(
            { message: "Signup already completed." },
            { status: 200 },
          );
        }
      }

      // If user doesn't exist in our DB, create them and their society profile
      await prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            id: data.user.id, // Use Supabase user ID
            email: data.user.email!,
            name: name,
            phone: phone || null,
            address: address || null,
            date_of_birth: date_of_birth ? new Date(date_of_birth) : null,
            role: "SOCIETY", // Assign role
          },
        });

        await tx.society.create({
          data: {
            user_id: user.id,
            name: name,
            phone: phone || "-",
            address: address || "-",
            date_of_birth: date_of_birth ? new Date(date_of_birth) : new Date(),
            gender: gender || null, // gender is now optional
          },
        });
      });

      return NextResponse.json(
        { message: "User signed up successfully and profile created." },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { message: "Signup initiated. Check your email for confirmation." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Server error during signup:", error);
    let message = "Internal server error";
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
