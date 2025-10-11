import { NextResponse } from "next/server";
import { prisma } from "@/lib/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('search') || '';

  if (!query) {
    return NextResponse.json({ success: true, data: [] });
  }

  try {
    const skills = await prisma.skill.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { aliases: { has: query.toLowerCase() } }
        ]
      },
      take: 10
    });
    return NextResponse.json({ success: true, data: skills });
  } catch (error) {
    console.error("GET_SKILLS_ERROR", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
