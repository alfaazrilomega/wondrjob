import { NextResponse } from "next/server";
import { prisma } from "@/lib/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const unassigned = searchParams.get("unassigned");

    if (unassigned === "true") {
      const users = await prisma.user.findMany({
        where: {
          role: 'COMPANY',
          company: null,
        },
        select: {
          id: true,
          name: true,
          email: true,
        }
      });
      return NextResponse.json({ success: true, data: users });
    }

    const searchQuery = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const skip = (page - 1) * limit;

    const whereClause = searchQuery
      ? {
          OR: [
            {
              name: {
                contains: searchQuery,
                mode: "insensitive" as const,
              },
            },
            {
              email: {
                contains: searchQuery,
                mode: "insensitive" as const,
              },
            },
          ],
        }
      : {};

    const [users, totalUsers] = await prisma.$transaction([
      prisma.user.findMany({
        where: whereClause,
        skip: skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.user.count({ where: whereClause }),
    ]);

    const totalPages = Math.ceil(totalUsers / limit);

    return NextResponse.json({
      users,
      pagination: {
        currentPage: page,
        totalPages,
        totalUsers,
        limit,
      },
    });
  } catch (error) {
    console.error("GET_USERS_ERROR", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
