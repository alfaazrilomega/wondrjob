import { NextResponse } from "next/server";
import { prisma } from "@/lib/lib/db";

type FollowerCompany = {
  id: number;
  name: string;
  industry?: string | null;
  logoUrl?: string | null;
};

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    // Because the domain model requires clarity, we'll query Follow records where followedUserId == userId
    // and then map follower -> company if that follower is associated with a company.
    const userFollowedBy = await prisma.follow.findMany({
      where: { followedUserId: userId, follower: { company: { isNot: null } } },
      include: { follower: { include: { company: true } } },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    const companies: FollowerCompany[] = userFollowedBy
      .map((f): FollowerCompany | null => {
        const c = f.follower.company;
        if (!c) return null;
        return {
          id: c.id,
          name: c.name,
          industry: null,
          logoUrl: c.logo ?? null,
        };
      })
      .filter((c): c is FollowerCompany => c !== null);

    return NextResponse.json({ companies });
  } catch (err) {
    console.error("/api/followers/companies error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
