import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const company = await prisma.company.findUnique({
        where: { id: parseInt(id) },
        include: {
          jobs: true,
          monthlyStats: true,
        },
      });

      if (!company) {
        return NextResponse.json(
          { success: false, error: "Company not found" },
          { status: 404 },
        );
      }

      return NextResponse.json({ success: true, data: company });
    }

    const companies = await prisma.company.findMany({
      include: {
        user: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json({ success: true, data: companies });
  } catch (error) {
    console.error("GET_COMPANIES_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
