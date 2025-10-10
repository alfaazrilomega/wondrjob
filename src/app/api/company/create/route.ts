import { NextResponse } from "next/server";
import { prisma } from "@/lib/lib/db";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set(name, value, options);
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.delete(name, options);
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const existingCompany = await prisma.company.findUnique({
        where: {
            user_id: user.id,
        },
    });

    if (existingCompany) {
        return NextResponse.json(
            { success: false, error: "User can only have one company" },
            { status: 400 }
        );
    }

    const body = await req.json();
    const {
      name,
      logo,
      address,
      phone,
      description
    } = body;

    // Basic validation
    if (!name || !address || !phone || !description) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newCompany = await prisma.company.create({
      data: {
        name,
        logo,
        address,
        phone,
        description,
        user_id: user.id,
      },
    });

    return NextResponse.json({ success: true, data: newCompany });
  } catch (error) {
    console.error("CREATE_COMPANY_ERROR", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

