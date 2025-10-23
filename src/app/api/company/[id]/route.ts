// src/app/api/company/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: idString } = await params;
    const id = parseInt(idString, 10);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid company ID" },
        { status: 400 },
      );
    }

    const company = await prisma.company.findUnique({
      where: { id },
      include: {
        jobs: true,
        monthlyStats: true,
        user: true,
      },
    });

    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: company });
  } catch (error) {
    console.error("GET_COMPANY_BY_ID_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: idString } = await params;
    const id = parseInt(idString, 10);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid company ID" },
        { status: 400 },
      );
    }

    const body = await request.json();
    const { name, logo, address, phone, description, companyCertificateUrl } =
      body;

    const updatedCompany = await prisma.company.update({
      where: { id },
      data: {
        name,
        logo,
        address,
        phone,
        description,
        companyCertificateUrl,
      },
    });

    return NextResponse.json({ success: true, data: updatedCompany });
  } catch (error) {
    console.error("UPDATE_COMPANY_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
