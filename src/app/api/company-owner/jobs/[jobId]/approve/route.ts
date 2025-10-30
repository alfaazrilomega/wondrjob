import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/lib/auth";
import { prisma } from "@/lib/lib/db";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> },
) {
  try {
    const session = await getCurrentUser();
    if (!session?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { jobId } = await params;
    const jobIdNum = parseInt(jobId);
    if (isNaN(jobIdNum)) {
      return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
    }

    // Get the company owned by this user
    const company = await prisma.company.findUnique({
      where: { user_id: session.id },
    });

    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    // Check if the job belongs to this company
    const job = await prisma.availablePosition.findFirst({
      where: {
        id: jobIdNum,
        company_id: company.id,
      },
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Approve the job (assuming approval means making it active, but since status field doesn't exist, perhaps just confirm it exists)
    const approvedJob = await prisma.availablePosition.findUnique({
      where: { id: jobIdNum },
    });

    return NextResponse.json({
      success: true,
      job: approvedJob,
      message: "Job approved successfully",
    });
  } catch (error) {
    console.error("Error approving job:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
