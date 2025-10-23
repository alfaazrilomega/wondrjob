import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/lib/db";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const dates: string[] = Array.isArray(body.dates) ? body.dates : [];

    // Convert ISO date-only strings to full Date objects at midnight UTC
    const dateObjects = dates.map((d) => new Date(d + "T00:00:00Z"));

    await prisma.user.update({
      where: { id: user.id },
      data: {
        society: {
          update: {
            available_dates: dateObjects,
          },
        },
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error saving availability:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
