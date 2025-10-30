"use server";

import { prisma } from "@/lib/lib/db";
import { getCurrentUser } from "@/lib/lib/auth";
import { revalidatePath } from "next/cache";

export interface NotificationData {
  id: string;
  type: "job_approval" | "info" | "applicant_update";
  text: string;
  timestamp: string;
  read: boolean;
  jobId?: number;
  hrdName?: string;
  jobTitle?: string;
}

export async function getMyNotifications(): Promise<NotificationData[]> {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      throw new Error("Unauthorized");
    }

    // Get company owner notifications
    const notifications = await prisma.notification.findMany({
      where: {
        recipientId: user.id,
      },
      include: {
        jobDraft: {
          include: {
            company: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Transform to frontend format
    const transformedNotifications: NotificationData[] = notifications.map(
      (notif) => {
        let type: "job_approval" | "info" | "applicant_update" = "info";
        let text = notif.message;
        let jobId: number | undefined;
        let hrdName: string | undefined;
        let jobTitle: string | undefined;

        switch (notif.type) {
          case "JOB_APPROVAL_REQUEST":
            type = "job_approval";
            text = "submitted a new job posting for review:";
            hrdName = notif.senderId ? "HRD User" : undefined; // TODO: Get actual HRD name
            jobTitle = notif.jobDraft?.position_name;
            jobId = notif.jobDraft?.id;
            break;
          case "APPLICANT_UPDATE":
            type = "applicant_update";
            jobId = notif.jobDraftId || undefined;
            break;
          default:
            type = "info";
        }

        return {
          id: notif.id,
          type,
          text,
          timestamp: notif.createdAt.toLocaleString(),
          read: notif.isRead,
          jobId,
          hrdName,
          jobTitle,
        };
      },
    );

    return transformedNotifications;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw new Error("Failed to fetch notifications");
  }
}

export async function markNotificationRead(
  notificationId: string,
): Promise<void> {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      throw new Error("Unauthorized");
    }

    await prisma.notification.updateMany({
      where: {
        id: notificationId,
        recipientId: user.id,
      },
      data: {
        isRead: true,
      },
    });

    revalidatePath("/dashboard/company-owner/notifications");
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw new Error("Failed to mark notification as read");
  }
}

export async function markAllNotificationsRead(): Promise<void> {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      throw new Error("Unauthorized");
    }

    await prisma.notification.updateMany({
      where: {
        recipientId: user.id,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    revalidatePath("/dashboard/company-owner/notifications");
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    throw new Error("Failed to mark all notifications as read");
  }
}

export async function approveJobDraft(
  draftId: number,
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    // Get the draft
    const draft = await prisma.jobDraft.findUnique({
      where: { id: draftId },
      include: {
        company: true,
        skills: true,
      },
    });

    if (!draft) {
      return { success: false, error: "Draft not found" };
    }

    // Verify the user is the company owner
    if (draft.company.user_id !== user.id) {
      return { success: false, error: "Unauthorized" };
    }

    // Create the job posting
    await prisma.availablePosition.create({
      data: {
        position_name: draft.position_name,
        capacity: draft.capacity,
        description: draft.description,
        submission_start_date: draft.submission_start_date,
        submission_end_date: draft.submission_end_date,
        company_id: draft.company_id,
        department: draft.department,
        location: draft.location,
        jobType: draft.jobType,
        salaryMax: draft.salaryMax,
        salaryMin: draft.salaryMin,
        workStyle: draft.workStyle,
        skills: {
          connect: draft.skills.map((skill) => ({ id: skill.id })),
        },
      },
    });

    // Update draft status
    await prisma.jobDraft.update({
      where: { id: draftId },
      data: { status: "APPROVED" },
    });

    // Update notification
    await prisma.notification.updateMany({
      where: {
        jobDraftId: draftId,
        type: "JOB_APPROVAL_REQUEST",
      },
      data: {
        type: "JOB_APPROVAL_ACCEPTED",
        message: `Job posting "${draft.position_name}" has been approved and published.`,
        isRead: false,
      },
    });

    revalidatePath("/dashboard/company-owner/notifications");
    revalidatePath("/dashboard/company/jobs");

    return { success: true };
  } catch (error) {
    console.error("Error approving job draft:", error);
    return { success: false, error: "Failed to approve job draft" };
  }
}

export async function rejectJobDraft(
  draftId: number,
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    // Get the draft
    const draft = await prisma.jobDraft.findUnique({
      where: { id: draftId },
      include: {
        company: true,
      },
    });

    if (!draft) {
      return { success: false, error: "Draft not found" };
    }

    // Verify the user is the company owner
    if (draft.company.user_id !== user.id) {
      return { success: false, error: "Unauthorized" };
    }

    // Update draft status
    await prisma.jobDraft.update({
      where: { id: draftId },
      data: { status: "REJECTED" },
    });

    // Update notification
    await prisma.notification.updateMany({
      where: {
        jobDraftId: draftId,
        type: "JOB_APPROVAL_REQUEST",
      },
      data: {
        type: "JOB_APPROVAL_REJECTED",
        message: `Job posting "${draft.position_name}" has been rejected.`,
        isRead: false,
      },
    });

    revalidatePath("/dashboard/company-owner/notifications");

    return { success: true };
  } catch (error) {
    console.error("Error rejecting job draft:", error);
    return { success: false, error: "Failed to reject job draft" };
  }
}

export async function getJobDraftDetails(draftId: number) {
  try {
    const user = await getCurrentUser();
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

    // Verify the user is the company owner
    if (draft.company.user_id !== user.id) {
      throw new Error("Unauthorized");
    }

    return draft;
  } catch (error) {
    console.error("Error fetching job draft details:", error);
    throw new Error("Failed to fetch job draft details");
  }
}
