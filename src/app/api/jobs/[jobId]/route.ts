import { NextResponse } from "next/server";
import { prisma } from "@/lib/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { jobId: string } },
) {
  const { jobId: jobIdString } = params;

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
        company: {
          select: {
            name: true,
            logo: true,
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
  { params }: { params: { jobId: string } },
) {
  const { jobId } = params;
  try {
    const body = await request.json();
    const { 
      company_id, 
      position_name, 
      capacity, 
      description, 
      submission_start_date, 
      submission_end_date 
    } = body;

    const updatedJob = await prisma.availablePosition.update({
      where: { id: parseInt(jobId) },
      data: {
        company_id: parseInt(company_id),
        position_name,
        capacity: parseInt(capacity),
        description,
        submission_start_date: new Date(submission_start_date),
        submission_end_date: new Date(submission_end_date),
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
