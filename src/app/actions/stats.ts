"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/lib/db";
import { revalidatePath } from "next/cache";

export async function addMonthlyStat(formData: FormData) {
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

  const month = parseInt(formData.get("month") as string);
  const year = parseInt(formData.get("year") as string);
  const rate = parseFloat(formData.get("rate") as string);

  if (isNaN(month) || isNaN(year) || isNaN(rate)) {
    return { error: "Invalid stat data." };
  }

  try {
    await prisma.companyMonthlyStats.upsert({
      where: {
        companyId_month_year: {
          companyId: company.id,
          month,
          year,
        },
      },
      update: {
        successRate: rate,
      },
      create: {
        companyId: company.id,
        month,
        year,
        successRate: rate,
      },
    });

    revalidatePath("/dashboard/company-owner");
    return { success: true };
  } catch (error) {
    console.error("Error adding/updating monthly stat:", error);
    return { error: "Could not add or update monthly stat." };
  }
}

export async function deleteMonthlyStat(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const statId = parseInt(formData.get("statId") as string);

  if (isNaN(statId)) {
    return { error: "Invalid stat ID." };
  }

  try {
    await prisma.companyMonthlyStats.delete({
      where: { id: statId },
    });

    revalidatePath("/dashboard/company-owner");
    return { success: true };
  } catch (error) {
    console.error("Error deleting monthly stat:", error);
    return { error: "Could not delete monthly stat." };
  }
}
