"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { JobType, WorkStyle } from "@prisma/client";

/**
 * Deletes a job posting by its ID.
 *
 * @param jobId The ID of the job to delete.
 * @returns An object with a success flag or an error message.
 */
export async function deleteJobPosting(jobId: string) {
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

  if (!jobId) {
    return { error: "Job ID is required." };
  }

  try {
    await prisma.availablePosition.delete({
      where: {
        id: parseInt(jobId),
        company_id: company.id, // Ensure the job belongs to the user's company
      },
    });

    revalidatePath("/dashboard/company-owner");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error deleting job posting:", error);
    return { error: "Could not delete job posting." };
  }
}

/**
 * Fetches a single job posting by its ID, including related skills.
 * This is a server-side utility function, not a Server Action.
 *
 * @param jobId The ID of the job to fetch.
 * @returns The job object or null if not found.
 */
export async function getJobById(jobId: string) {
  try {
    const job = await prisma.availablePosition.findUnique({
      where: { id: parseInt(jobId) },
      include: {
        skills: true, // Include the related skills
      },
    });
    return job;
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    return null;
  }
}

/**
 * Updates an existing job posting using form data.
 * This is a Server Action.
 *
 * @param formData The FormData object from the edit form.
 */
export async function updateJobPosting(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // Data Extraction
  const jobId = formData.get("jobId") as string;
  const position_name = formData.get("position_name") as string;
  const description = formData.get("description") as string;
  const capacity = formData.get("capacity") as string;
  const jobType = formData.get("jobType") as JobType;
  const workStyle = formData.get("workStyle") as WorkStyle;
  const salaryMin = formData.get("salaryMin") as string;
  const salaryMax = formData.get("salaryMax") as string;
  const skillsString = formData.get("skills") as string; // Comma-separated string

  if (!jobId) {
    throw new Error("Job ID is required for updates.");
  }

  // Data Parsing
  const parsedJobId = parseInt(jobId);
  const skillsArray = skillsString
    ? skillsString
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  try {
    await prisma.availablePosition.update({
      where: {
        id: parsedJobId,
      },
      data: {
        position_name,
        description,
        capacity: parseInt(capacity) || 1,
        jobType,
        workStyle,
        salaryMin: salaryMin ? parseFloat(salaryMin) : null,
        salaryMax: salaryMax ? parseFloat(salaryMax) : null,
        skills: {
          set: [],
          connectOrCreate: skillsArray.map((skillName) => ({
            where: { name: skillName },
            create: { name: skillName, category: "General" },
          })),
        },
      },
    });
  } catch (error: unknown) {
    console.error("Error updating job posting:", error);
    throw error;
  }

  revalidatePath("/dashboard/company-owner");
  revalidatePath(`/dashboard/company-owner/${jobId}`);

  redirect("/dashboard/company-owner");
}

export async function createJobPosting(data: {
  company_id: string;
  position_name: string;
  department?: string;
  location?: string;
  capacity: number;
  description: string;
  submission_start_date: string;
  submission_end_date: string;
  jobType?: JobType;
  salaryMin?: number;
  salaryMax?: number;
  workStyle?: WorkStyle;
  skills?: { id: number; name: string }[];
}) {
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

  if (!data.position_name || !data.description) {
    return { error: "Job title and description are required." };
  }

  try {
    const skillsToConnect = data.skills
      ? data.skills.map((skill) => ({
          where: { name: skill.name },
          create: { name: skill.name, category: "General" },
        }))
      : [];

    await prisma.availablePosition.create({
      data: {
        position_name: data.position_name,
        description: data.description,
        department: data.department,
        location: data.location,
        jobType: data.jobType,
        workStyle: data.workStyle,
        salaryMin: data.salaryMin
          ? parseInt(data.salaryMin.toString(), 10)
          : null,
        salaryMax: data.salaryMax
          ? parseInt(data.salaryMax.toString(), 10)
          : null,
        company_id: company.id,
        capacity: parseInt(data.capacity.toString(), 10),
        submission_start_date: new Date(data.submission_start_date),
        submission_end_date: new Date(data.submission_end_date),
        skills: {
          connectOrCreate: skillsToConnect,
        },
      },
    });

    revalidatePath("/dashboard/company-owner");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error creating job:", error);
    return { error: "Could not create job." };
  }
}
