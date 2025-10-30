"use server";

import { prisma } from "@/lib/lib/db";
import { getCurrentUser } from "@/lib/lib/auth";
import { revalidatePath } from "next/cache";

export interface JobDraftData {
  id: number;
  position_name: string;
  capacity: number;
  description: string;
  submission_start_date: Date;
  submission_end_date: Date;
  department?: string;
  location?: string;
  jobType?: string;
  salaryMax?: number;
  salaryMin?: number;
  workStyle?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  skills: { id: number; name: string; category: string }[];
}

export async function createJobDraft(data: {
  position_name: string;
  capacity: number;
  description: string;
  submission_start_date: Date;
  submission_end_date: Date;
  department?: string;
  location?: string;
  jobType?: string;
  salaryMax?: number;
  salaryMin?: number;
  workStyle?: string;
  skillIds: number[];
}): Promise<{ success: boolean; error?: string; draftId?: number }> {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    // Get HRD info
    const hrd = await prisma.hRD.findUnique({
      where: { user_id: user.id },
      include: { company: true },
    });

    if (!hrd) {
      return { success: false, error: "HRD profile not found" };
    }

    // Create job draft
    const draft = await prisma.jobDraft.create({
      data: {
        position_name: data.position_name,
        capacity: data.capacity,
        description: data.description,
        submission_start_date: data.submission_start_date,
        submission_end_date: data.submission_end_date,
        department: data.department,
        location: data.location,
        jobType: data.jobType,
        salaryMax: data.salaryMax,
        salaryMin: data.salaryMin,
        workStyle: data.workStyle,
        createdBy: user.id,
        company_id: hrd.company_id,
        skills: {
          connect: data.skillIds.map((id) => ({ id })),
        },
      },
    });

    // Create notification for company owner
    await prisma.notification.create({
      data: {
        type: "JOB_APPROVAL_REQUEST",
        title: "New Job Posting Draft",
        message: `A new job posting draft "${data.position_name}" has been submitted for approval.`,
        recipientId: hrd.company.user_id,
        senderId: user.id,
        jobDraftId: draft.id,
      },
    });

    revalidatePath("/dashboard/company-owner/notifications");

    return { success: true, draftId: draft.id };
  } catch (error) {
    console.error("Error creating job draft:", error);
    return { success: false, error: "Failed to create job draft" };
  }
}

export async function getMyJobDrafts(): Promise<JobDraftData[]> {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      throw new Error("Unauthorized");
    }

    // Get HRD info
    const hrd = await prisma.hRD.findUnique({
      where: { user_id: user.id },
    });

    if (!hrd) {
      throw new Error("HRD profile not found");
    }

    const drafts = await prisma.jobDraft.findMany({
      where: {
        company_id: hrd.company_id,
        createdBy: user.id,
      },
      include: {
        skills: {
          select: {
            id: true,
            name: true,
            category: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return drafts;
  } catch (error) {
    console.error("Error fetching job drafts:", error);
    throw new Error("Failed to fetch job drafts");
  }
}

export async function updateJobDraft(
  draftId: number,
  data: {
    position_name?: string;
    capacity?: number;
    description?: string;
    submission_start_date?: Date;
    submission_end_date?: Date;
    department?: string;
    location?: string;
    jobType?: string;
    salaryMax?: number;
    salaryMin?: number;
    workStyle?: string;
    skillIds?: number[];
  },
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    // Verify ownership
    const draft = await prisma.jobDraft.findUnique({
      where: { id: draftId },
    });

    if (!draft || draft.createdBy !== user.id) {
      return { success: false, error: "Unauthorized" };
    }

    // Only allow updates if status is PENDING
    if (draft.status !== "PENDING") {
      return {
        success: false,
        error: "Cannot update approved or rejected drafts",
      };
    }

    const { skillIds, ...restData } = data;
    const updateData: {
      position_name?: string;
      capacity?: number;
      description?: string;
      submission_start_date?: Date;
      submission_end_date?: Date;
      department?: string;
      location?: string;
      jobType?: string;
      salaryMax?: number;
      salaryMin?: number;
      workStyle?: string;
      skills?: { set: { id: number }[] };
    } = restData;

    if (skillIds) {
      updateData.skills = {
        set: skillIds.map((id) => ({ id })),
      };
    }

    await prisma.jobDraft.update({
      where: { id: draftId },
      data: updateData,
    });

    revalidatePath("/dashboard/hrd/job-drafts");

    return { success: true };
  } catch (error) {
    console.error("Error updating job draft:", error);
    return { success: false, error: "Failed to update job draft" };
  }
}

export async function deleteJobDraft(
  draftId: number,
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    // Verify ownership
    const draft = await prisma.jobDraft.findUnique({
      where: { id: draftId },
    });

    if (!draft || draft.createdBy !== user.id) {
      return { success: false, error: "Unauthorized" };
    }

    // Only allow deletion if status is PENDING
    if (draft.status !== "PENDING") {
      return {
        success: false,
        error: "Cannot delete approved or rejected drafts",
      };
    }

    await prisma.jobDraft.delete({
      where: { id: draftId },
    });

    revalidatePath("/dashboard/hrd/job-drafts");

    return { success: true };
  } catch (error) {
    console.error("Error deleting job draft:", error);
    return { success: false, error: "Failed to delete job draft" };
  }
}

import type { User } from "@supabase/supabase-js";

export async function getJobDraftDetails(draftId: number, user: User | null) {
  try {
    if (!user?.id) {
      throw new Error("Unauthorized");
    }

    const draft = await prisma.jobDraft.findUnique({
      where: { id: draftId },
      include: {
        company: true,
        skills: true,
      },
    });

    if (!draft) {
      throw new Error("Draft not found");
    }

    // Verify the user is the creator of the draft
    if (draft.createdBy !== user.id) {
      throw new Error("Unauthorized");
    }

    return draft;
  } catch (error) {
    console.error("Error fetching job draft details:", error);
    throw new Error("Failed to fetch job draft details");
  }
}
