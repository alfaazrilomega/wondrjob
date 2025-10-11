import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const companyId = searchParams.get("companyId");

  try {
    const whereClause = companyId ? { company_id: parseInt(companyId) } : {};
    const jobs = await prisma.availablePosition.findMany({
      where: whereClause,
      include: {
        company: true,
      },
    });
    return NextResponse.json({ success: true, data: jobs });
  } catch (error) {
    console.error("GET_JOBS_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      company_id,
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
    } = body;

    const newJob = await prisma.availablePosition.create({
      data: {
        company_id: parseInt(company_id),
        position_name,
        capacity: parseInt(capacity),
        description,
        submission_start_date: new Date(submission_start_date),
        submission_end_date: new Date(submission_end_date),
        jobType,
        salaryMin: salaryMin ? parseInt(salaryMin) : null,
        salaryMax: salaryMax ? parseInt(salaryMax) : null,
        workStyle,
        skills: {
          connect: skills.map((id: number) => ({ id })),
        },
      },
    });
    return NextResponse.json({ success: true, data: newJob });
  } catch (error) {
    console.error("CREATE_JOB_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
