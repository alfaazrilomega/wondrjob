import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/lib/auth";
import { prisma } from "@/lib/lib/db";

export async function GET() {
  try {
    const session = await getCurrentUser();
    if (!session?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the company profile with jobs
    const company = await prisma.company.findUnique({
      where: { user_id: session.id },
      include: {
        jobs: true,
      },
    });

    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      company,
    });
  } catch (error) {
    console.error("Error fetching company profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getCurrentUser();
    if (!session?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, address, phone, description, website } = body;

    // Validate required fields
    if (!name || !address || !phone || !description) {
      return NextResponse.json(
        { error: "Name, address, phone, and description are required" },
        { status: 400 },
      );
    }

    // Update the company profile
    const updatedCompany = await prisma.company.update({
      where: { user_id: session.id },
      data: {
        name,
        address,
        phone,
        description,
        website,
      },
    });

    return NextResponse.json({
      success: true,
      company: updatedCompany,
    });
  } catch (error) {
    console.error("Error updating company profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
