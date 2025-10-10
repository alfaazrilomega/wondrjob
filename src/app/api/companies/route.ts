import { NextResponse } from "next/server";
import { prisma } from "@/lib/lib/db";

export async function GET() {
  try {
    const companies = await prisma.company.findMany({
      include: {
        user: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json({ success: true, data: companies });

  } catch (error) {
    console.error("GET_COMPANIES_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
