import { NextResponse } from "next/server";
import { prisma } from "@/lib/lib/db";
import { JobType, WorkStyle } from "@prisma/client";

export async function GET(
  request: Request,
  context: { params: Promise<{ jobId: string }> },
) {
  const { jobId: jobIdString } = await context.params;

  try {
    const jobId = parseInt(jobIdString, 10);

    if (isNaN(jobId)) {
      return NextResponse.json(
        { success: false, error: "Invalid job ID format" },
        { status: 400 },
      );
    }

    const job = await prisma.availablePosition.findUnique({
      where: { id: jobId },
      include: {
        company: true, // Include full company details
        skills: true, // Include skills
        applicants: {
          // Include all applicants for this job
          orderBy: {
            apply_date: "desc", // Order by most recent first
          },
          include: {
            society: {
              // From the application, get the society profile
              select: {
                name: true, // And from the profile, get the name
              },
            },
          },
        },
      },
    });

    if (!job) {
      return NextResponse.json(
        { success: false, error: "Job not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: job });
  } catch (error) {
    console.error(`Error fetching job ${jobIdString}:`, error);
    return NextResponse.json(
      { success: false, error: "An internal server error occurred" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ jobId: string }> },
) {
  const { jobId } = await context.params;
  try {
    const body = await request.json();
    const {
      position_name,
      capacity,
      description,
      submission_start_date,
      submission_end_date,
      jobType,
      salaryMin,
      salaryMax,
      workStyle,
      skills, // This is an array of skill IDs
      department,
      location,
    } = body;

    const updatedJob = await prisma.availablePosition.update({
      where: { id: parseInt(jobId) },
      data: {
        position_name,
        capacity: capacity ? parseInt(capacity) : undefined,
        description,
        submission_start_date: submission_start_date
          ? new Date(submission_start_date)
          : undefined,
        submission_end_date: submission_end_date
          ? new Date(submission_end_date)
          : undefined,
        jobType: jobType ? (jobType as JobType) : undefined,
        salaryMin: salaryMin ? parseInt(salaryMin) : undefined,
        salaryMax: salaryMax ? parseInt(salaryMax) : undefined,
        workStyle: workStyle ? (workStyle as WorkStyle) : undefined,
        department,
        location,
        skills: {
          set: skills.map((id: number) => ({ id })),
        },
      },
    });

    return NextResponse.json({ success: true, data: updatedJob });
  } catch (error) {
    console.error(`Error updating job ${jobId}:`, error);
    return NextResponse.json(
      { success: false, error: "An internal server error occurred" },
      { status: 500 },
    );
  }
}
