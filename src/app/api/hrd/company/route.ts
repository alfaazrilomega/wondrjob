import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/lib/auth";
import { prisma } from "@/lib/lib/db";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const hrd = await prisma.hRD.findUnique({
      where: { user_id: user.id },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            logo: true,
          },
        },
      },
    });

    if (!hrd) {
      return NextResponse.json(
        { error: "HRD profile not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      companyId: hrd.company_id,
      company: hrd.company,
    });
  } catch (error) {
    console.error("Error fetching HRD company:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
