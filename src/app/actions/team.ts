"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { prisma } from "@/lib/lib/db";
import { revalidatePath } from "next/cache";
import { UserRole } from "@prisma/client";

export async function removeTeamMember(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const company = await prisma.company.findUnique({
    where: { user_id: user.id },
  });

  if (!company) {
    return { error: "Company not found for user." };
  }

  const memberId = formData.get("memberId") as string;

  if (!memberId) {
    return { error: "Member ID is required." };
  }

  try {
    // Delete the HRD relationship (this will cascade to remove the user if no other relationships exist)
    await prisma.hRD.delete({
      where: {
        user_id: memberId,
      },
    });

    revalidatePath("/dashboard/company-owner");
    return { success: true };
  } catch (error) {
    console.error("Error removing team member:", error);
    return { error: "Could not remove team member." };
  }
}

export async function updateTeamMember(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const company = await prisma.company.findUnique({
    where: { user_id: user.id },
  });

  if (!company) {
    return { error: "Company not found for user." };
  }

  const memberId = formData.get("memberId") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  if (!memberId || !name || !email) {
    return { error: "Member ID, name, and email are required." };
  }

  try {
    await prisma.user.update({
      where: { id: memberId },
      data: {
        name,
        email,
      },
    });

    revalidatePath("/dashboard/company-owner");
    return { success: true };
  } catch (error) {
    console.error("Error updating team member:", error);
    return { error: "Could not update team member." };
  }
}

export async function addTeamMember(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const company = await prisma.company.findUnique({
    where: { user_id: user.id },
  });

  if (!company) {
    return { error: "Company not found for user." };
  }

  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "Name, email, and password are required." };
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: email },
    include: { hrd: true },
  });

  if (existingUser) {
    // Check if user is already HRD for this company
    if (existingUser.hrd && existingUser.hrd.company_id === company.id) {
      return { error: "User is already a team member of this company." };
    }
    // If user exists but is HRD for a different company, we can't add them
    if (existingUser.hrd && existingUser.hrd.company_id !== company.id) {
      return { error: "User is already an HRD for a different company." };
    }
    // If user exists but has no HRD relationship, we can add them to this company
    // Continue with the flow but skip user creation
  }

  const supabaseAdmin = createAdminClient();
  let newAuthUserId: string | undefined;
  let userIdToUse: string;

  try {
    if (existingUser) {
      // Use existing user - just create HRD relationship
      userIdToUse = existingUser.id;
      newAuthUserId = undefined; // No new auth user created
    } else {
      // 1. Create the user in Supabase Auth
      const { data: authData, error: authError } =
        await supabaseAdmin.auth.admin.createUser({
          email: email,
          password: password,
          email_confirm: true,
          user_metadata: { name: name },
        });

      if (authError) {
        console.error("Supabase auth error:", authError.message);
        return { error: `Supabase auth error: ${authError.message}` };
      }

      if (!authData.user?.id) {
        return { error: "Failed to create auth user" };
      }

      newAuthUserId = authData.user.id;
      userIdToUse = newAuthUserId;
    }

    // 2. Use a transaction to create/update the HRD relationship
    await prisma.$transaction(async (tx) => {
      if (!existingUser) {
        // 3. Create the user profile in your public `User` table (only for new users)
        await tx.user.create({
          data: {
            id: userIdToUse,
            name: name,
            email: email,
            role: UserRole.HRD,
            password: null, // No password in public table
          },
        });
      }

      // 4. Create the HRD record and link it to the user and company
      await tx.hRD.create({
        data: {
          user_id: userIdToUse,
          company_id: company.id,
        },
      });
    });

    revalidatePath("/dashboard/company-owner");
    return { success: true };
  } catch (e) {
    const error = e as Error;
    console.error("Error adding team member:", error.message);

    // CRITICAL: If Prisma fails, delete the orphaned Supabase Auth user
    if (newAuthUserId) {
      console.log(`Rolling back auth user: ${newAuthUserId}`);
      await supabaseAdmin.auth.admin.deleteUser(newAuthUserId);
    }

    return { error: error.message || "An unknown database error occurred." };
  }
}
