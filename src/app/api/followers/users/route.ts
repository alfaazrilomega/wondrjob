import { NextResponse } from "next/server";
import { prisma } from "@/lib/lib/db";

type FollowerUser = {
  id: string;
  name: string;
  role?: string | null;
  initials?: string | null;
  avatarUrl?: string | null;
};

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    // Find Follow records where the followedUserId equals the provided userId
    const follows = await prisma.follow.findMany({
      where: { followedUserId: userId },
      include: {
        follower: {
          select: {
            id: true,
            name: true,
            role: true,
            society: {
              select: { profile_picture: true },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    const users: FollowerUser[] = follows.map((f) => ({
      id: f.follower.id,
      name: f.follower.name,
      role: f.follower.role ?? null,
      initials: f.follower.name
        ? f.follower.name.slice(0, 2).toUpperCase()
        : null,
      avatarUrl: f.follower.society?.profile_picture ?? null,
    }));

    return NextResponse.json({ users });
  } catch (err) {
    console.error("/api/followers/users error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
