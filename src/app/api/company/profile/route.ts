import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/lib/db";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const company = await prisma.company.findUnique({
      where: {
        user_id: user.id,
      },
      include: {
        jobs: {
          orderBy: {
            submission_end_date: "desc",
          },
        },
      },
    });

    // No need to check for !company, because if it's null, we want to inform the frontend
    // so it can redirect to the company creation page.
    return NextResponse.json({ company });
  } catch (error) {
    console.error("Error fetching company profile:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
