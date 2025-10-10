import { NextResponse } from "next/server";
import { prisma } from "@/lib/lib/db";
import { UserRole } from "@prisma/client";
import bcrypt from "bcrypt";

interface UserUpdateData {
  name?: string;
  email?: string;
  role?: UserRole;
  phone?: string | null;
  address?: string | null;
  date_of_birth?: Date | null;
}

export async function PUT(
  request: Request,
) {
  const url = new URL(request.url);
  const userId = url.pathname.split('/').pop();
  if (!userId) {
    return NextResponse.json(
      { error: "User ID is required." },
      { status: 400 },
    );
  }

  try {
    const body = await request.json();
    const {
      name,
      email,
      password, // For password changes
      role,
      phone,
      address,
      date_of_birth,
      // ... other fields for company, hrd, etc.
    } = body;

    const updateData: UserUpdateData = { name, email, role, phone, address };

    if (date_of_birth) {
      updateData.date_of_birth = new Date(date_of_birth);
    }

    // Start a transaction to ensure atomicity
    const updatedUser = await prisma.$transaction(async (tx) => {
      // 1. Update the main User record
      const user = await tx.user.update({
        where: { id: userId },
        data: updateData,
      });

      // 2. Handle password change for the associated Admin record if provided
      if (role === UserRole.ADMIN && password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await tx.admin.update({
          where: { user_id: userId },
          data: { password: hashedPassword, email, name, phone, address },
        });
      }

      // 3. Handle updates for other roles if necessary
      // (e.g., updating company name, society details, etc.)
      // This can be expanded based on the fields available in the "Edit" modal.
      if (role === UserRole.SOCIETY) {
        await tx.society.update({
          where: { user_id: userId },
          data: {
            name,
            phone,
            address,
            date_of_birth: new Date(date_of_birth),
          },
        });
      }

      // Add logic for COMPANY and HRD updates here if their details can be edited.

      return user;
    });

    return NextResponse.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(`UPDATE_USER_ERROR (ID: ${userId})`, error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
