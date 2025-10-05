import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";
import { supabase } from "../../../../lib/supabase";

export async function POST(request: Request) {
  try {
    const { email, password, name, role, phone, address, date_of_birth } =
      await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Email, password, and name are required" },
        { status: 400 },
      );
    }

    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role: role || "SOCIETY",
        },
      },
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    if (!authUser) {
      return NextResponse.json(
        { error: "User registration failed in Supabase" },
        { status: 500 },
      );
    }

    // Create a user in your local database and link it to the Supabase user
    const user = await prisma.user.create({
      data: {
        id: authUser.id, // Use the id from Supabase user
        email,
        name,
        role: role || "SOCIETY",
        phone,
        address,
        date_of_birth: date_of_birth ? new Date(date_of_birth) : null,
        ...(role === "SOCIETY" && {
          society: {
            create: {
              name,
              address: address || "",
              phone: phone || "",
              date_of_birth: date_of_birth
                ? new Date(date_of_birth)
                : new Date(),
              gender: "UNSPECIFIED",
            },
          },
        }),
        ...(role === "COMPANY" && {
          company: {
            create: {
              name,
              address: address || "",
              phone: phone || "",
              description: "",
            },
          },
        }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        society: true,
        company: true,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);

    let errorMessage = "Registration failed";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
