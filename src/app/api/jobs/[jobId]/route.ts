import { NextResponse } from "next/server";
import { prisma } from "@/lib/lib/db";

export async function GET(
  request: Request,
  context: { params: { jobId: string } },
) {
  const { jobId: jobIdString } = context.params;

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
    console.error(`Error fetching job ${jobIdString}:`, error); // Use jobIdString
    return NextResponse.json(
      { success: false, error: "An internal server error occurred" },
      { status: 500 },
    );
  }
}
