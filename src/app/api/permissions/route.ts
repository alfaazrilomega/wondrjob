import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/lib/db";
import { createServerClient } from "@supabase/ssr";
import { UserRole } from "@prisma/client";

// Helper function to get admin user
async function getAdminUser(request: NextRequest) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => request.cookies.get(name)?.value,
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: Request) {
  const permissions = await prisma.rolePermission.findMany();
  return NextResponse.json(permissions);
}

// PUT /api/permissions - Updates a permission
export async function PUT(request: NextRequest) {
  const admin = await getAdminUser(request);
  if (!admin) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { role, permission, enabled } = await request.json();

  if (!role || !permission || typeof enabled !== "boolean") {
    return new NextResponse("Missing required fields", { status: 400 });
  }

  try {
    await prisma.rolePermission.upsert({
      where: { role_permission: { role: role as UserRole, permission } },
      update: { enabled },
      create: { role: role as UserRole, permission, enabled },
    });
    return NextResponse.json({ success: true, message: "Permission updated." });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    return new NextResponse("Error updating permission", { status: 500 });
  }
}
