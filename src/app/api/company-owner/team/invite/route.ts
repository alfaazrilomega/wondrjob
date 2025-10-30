import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/lib/auth";
import { prisma } from "@/lib/lib/db";

export async function POST(request: NextRequest) {
  try {
    const session = await getCurrentUser();
    if (!session?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Get the company owned by this user
    const company = await prisma.company.findUnique({
      where: { user_id: session.id },
    });

    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    // Check if user exists
    const userToInvite = await prisma.user.findUnique({
      where: { email },
    });

    if (!userToInvite) {
      return NextResponse.json(
        { error: "User with this email does not exist" },
        { status: 404 },
      );
    }

    // Check if user is already an HRD for this company
    const existingHRD = await prisma.hRD.findFirst({
      where: {
        user_id: userToInvite.id,
        company_id: company.id,
      },
    });

    if (existingHRD) {
      return NextResponse.json(
        { error: "User is already an HRD for this company" },
        { status: 400 },
      );
    }

    // Create HRD record
    const newHRD = await prisma.hRD.create({
      data: {
        user_id: userToInvite.id,
        company_id: company.id,
      },
    });

    // Update user role to HRD if not already
    if (userToInvite.role !== "HRD") {
      await prisma.user.update({
        where: { id: userToInvite.id },
        data: { role: "HRD" },
      });
    }

    return NextResponse.json({
      success: true,
      hrd: newHRD,
      message: "HRD invitation sent successfully",
    });
  } catch (error) {
    console.error("Error inviting HRD:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
