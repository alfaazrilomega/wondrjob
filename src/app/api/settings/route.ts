import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/lib/db";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { Prisma } from "@prisma/client";
import { cookies } from "next/headers";

// Helper function to get admin user
async function getAdminUser() {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          return (await cookieStore).get(name)?.value;
        },
        async set(name: string, value: string, options: CookieOptions) {
          try {
            (await cookieStore).set({ name, value, ...options });
          } catch {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        async remove(name: string, options: CookieOptions) {
          try {
            (await cookieStore).set({ name, value: "", ...options });
          } catch {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { role: true },
  });

  if (dbUser?.role !== "ADMIN") return null;
  return user;
}

// GET /api/settings - Fetches all settings
export async function GET() {
  const settingsList = await prisma.setting.findMany();
  const settings = settingsList.reduce<Record<string, Prisma.JsonValue>>(
    (acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    },
    {},
  );
  return NextResponse.json(settings);
}

// PUT /api/settings - Updates one or more settings
export async function PUT(request: NextRequest) {
  const admin = await getAdminUser();
  if (!admin) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const data: Record<string, Prisma.JsonValue> = await request.json();

  try {
    const updatePromises = Object.keys(data).map((key) => {
      const value = data[key];
      return prisma.setting.upsert({
        where: { key },
        update: { value: value === null ? Prisma.JsonNull : value },
        create: { key, value: value === null ? Prisma.JsonNull : value },
      });
    });

    await Promise.all(updatePromises);

    return NextResponse.json({
      success: true,
      message: "Settings updated successfully.",
    });
  } catch (error) {
    console.error("Error updating settings:", error);
    return new NextResponse("Error updating settings", { status: 500 });
  }
}
