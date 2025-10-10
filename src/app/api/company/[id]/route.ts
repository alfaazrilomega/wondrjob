// src/app/api/company/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/lib/db";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10);

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid company ID" }, { status: 400 });
    }

    const company = await prisma.company.findUnique({
      where: { id },
      // **CRUCIAL FIX: Sertakan data relasi yang dibutuhkan**
      include: {
        jobs: true,          // Untuk kartu "Available Positions"
        monthlyStats: true,  // **Untuk kartu "Company Monthly Stats"**
        user: true           // Untuk menampilkan info user jika perlu
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