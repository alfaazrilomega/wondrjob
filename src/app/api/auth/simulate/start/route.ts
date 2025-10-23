import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/lib/db";

// This endpoint starts the simulation
export async function POST(request: NextRequest) {
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
          (await cookieStore).set({ name, value, ...options });
        },
        async remove(name: string, options: CookieOptions) {
          (await cookieStore).set({ name, value: "", ...options });
        },
      },
    },
  );

  // 1. Check if the current user is an admin
  const {
    data: { user: adminUser },
  } = await supabase.auth.getUser();

  if (!adminUser) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const adminDbUser = await prisma.user.findUnique({
    where: { id: adminUser.id },
    select: { role: true },
  });

  if (adminDbUser?.role !== "ADMIN") {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // 2. Get the target user ID from the request body
  const { targetUserId } = await request.json();
  if (!targetUserId) {
    return new NextResponse("Missing targetUserId", { status: 400 });
  }

  const targetUser = await prisma.user.findUnique({
    where: { id: targetUserId },
    select: { name: true },
  });

  if (!targetUser) {
    return new NextResponse("Target user not found", { status: 404 });
  }

  // 3. Set the simulation cookies
  (await cookieStore).set("simulation_mode", "true", { path: "/" });
  (await cookieStore).set("simulated_user_id", targetUserId, { path: "/" });
  (await cookieStore).set("original_admin_id", adminUser.id, { path: "/" });
  (await cookieStore).set("simulated_user_name", targetUser.name, {
    path: "/",
  }); // Store name

  return NextResponse.json({ success: true });
}
