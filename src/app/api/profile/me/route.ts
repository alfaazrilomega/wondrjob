import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/lib/db";

type ISkillResp = { id: number; name: string; category: string };

type ISocietyResp = {
  id: number;
  name: string;
  headline?: string | null;
  address?: string | null;
  phone?: string | null;
  date_of_birth?: string | null;
  gender?: string | null;
  location?: string | null;
  about?: string | null;
  profile_picture?: string | null;
  social_media_url?: string | null;
  working_papers_url?: string | null;
  occupation?: string | null;
  most_memorable_tip?: string | null;
  available_dates?: string[];
};

type IUserResp = {
  id: string;
  name?: string | null;
  email: string;
  society?: ISocietyResp | null;
  skills: ISkillResp[];
};

export async function GET(request: Request) {
  request.headers.set("Access-Control-Allow-Origin", "*");

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const userProfile = await prisma.user.findUnique({
      where: { id: user.id },
      include: { society: true, skills: true },
    });

    if (!userProfile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const society = userProfile.society
      ? {
          id: userProfile.society.id,
          name: userProfile.society.name,
          headline: userProfile.society.headline ?? null,
          address: userProfile.society.address ?? null,
          phone: userProfile.society.phone ?? null,
          date_of_birth: userProfile.society.date_of_birth
            ? userProfile.society.date_of_birth.toISOString()
            : null,
          gender: userProfile.society.gender ?? null,
          location: userProfile.society.location ?? null,
          about: userProfile.society.about ?? null,
          profile_picture: userProfile.society.profile_picture ?? null,
          social_media_url: userProfile.society.social_media_url ?? null,
          working_papers_url: userProfile.society.working_papers_url ?? null,
          occupation: userProfile.society.occupation ?? null,
          most_memorable_tip: userProfile.society.most_memorable_tip ?? null,
          available_dates: Array.isArray(userProfile.society.available_dates)
            ? userProfile.society.available_dates.map((d) =>
                d instanceof Date ? d.toISOString() : String(d),
              )
            : [],
        }
      : null;

    const skills = Array.isArray(userProfile.skills)
      ? userProfile.skills.map((s) => ({
          id: s.id,
          name: s.name,
          category: s.category,
        }))
      : [];

    const resp: IUserResp = {
      id: userProfile.id,
      name: userProfile.name ?? null,
      email: userProfile.email,
      society,
      skills,
    };

    return NextResponse.json({ user: resp });
  } catch (err) {
    console.error("/api/profile/me error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
