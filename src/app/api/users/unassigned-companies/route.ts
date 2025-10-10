
import { NextResponse } from "next/server";
import { prisma } from "@/lib/lib/db";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: "COMPANY",
        company: null,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error("GET_UNASSIGNED_USERS_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
