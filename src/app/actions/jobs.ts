"use server";

import { prisma } from "../../lib/lib/db";
import { revalidatePath } from "next/cache";

export async function getCompanies() {
  try {
    const companies = await prisma.company.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return companies;
  } catch (error) {
    console.error("Failed to fetch companies:", error);
    return [];
  }
}

export async function createJobPost(data: {
  company_id: number;
  position_name: string;
  capacity: number;
  description: string;
  submission_start_date: Date;
  submission_end_date: Date;
}) {
  try {
    const newPosition = await prisma.availablePosition.create({
      data: {
        company_id: data.company_id,
        position_name: data.position_name,
        capacity: data.capacity,
        description: data.description,
        submission_start_date: data.submission_start_date,
        submission_end_date: data.submission_end_date,
      },
    });
    revalidatePath("/admin/job-postings");
    return { success: true, data: newPosition };
  } catch (error) {
    console.error("Failed to create job post:", error);
    return { success: false, error: "Failed to create job post." };
  }
}
