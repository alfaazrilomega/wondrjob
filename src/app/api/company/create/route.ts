import { NextResponse } from "next/server";
import { prisma } from "@/lib/lib/db";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized: You must be logged in to create a company.' }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      logo,
      address,
      phone,
      description,
      companyCertificateUrl,
      user_id,
    } = body;

    if (!name || !user_id) {
      return NextResponse.json({ error: 'Name and assigned user are required.' }, { status: 400 });
    }

    const existingCompany = await prisma.company.findUnique({
      where: {
        user_id: user_id,
      },
    });

    if (existingCompany) {
      return NextResponse.json(
        { success: false, error: "Target user can only have one company" },
        { status: 400 },
      );
    }

    const newCompany = await prisma.company.create({
      data: {
        name,
        logo,
        address,
        phone,
        description,
        companyCertificateUrl,
        user_id: user_id,
      },
    });

    return NextResponse.json({ success: true, data: newCompany }, { status: 201 });

  } catch (error) {
    console.error("CREATE_COMPANY_ERROR", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}