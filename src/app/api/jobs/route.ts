import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const companyId = searchParams.get("companyId");
  const jobId = searchParams.get("id"); // Check for job ID

  try {
    // If a specific job ID is provided, fetch that job
    if (jobId) {
      const job = await prisma.availablePosition.findUnique({
        where: { id: parseInt(jobId) },
        include: {
          company: true,
          skills: true, // Also include skills as they are used on the page
        },
      });

      if (!job) {
        return NextResponse.json(
          { success: false, error: "Job not found" },
          { status: 404 },
        );
      }

      // You might want to format the single job data similarly to the list
      const now = new Date();
      let status = "Scheduled";
      const startDate = new Date(job.submission_start_date);
      const endDate = new Date(job.submission_end_date);

      if (now >= startDate && now <= endDate) {
        status = "Active";
      } else if (now > endDate) {
        status = "Closed";
      }

      const jobWithStatus = { ...job, status };

      // The frontend expects required_skills as an array of strings (skill names)
      // but the query returns an array of skill objects. Let's transform it.
      const transformedJob = {
        ...jobWithStatus,
        job_type: jobWithStatus.jobType,
        salary: `${jobWithStatus.salaryMin} - ${jobWithStatus.salaryMax}`,
        required_skills: job.skills.map((skill) => skill.name),
      };

      return NextResponse.json({ success: true, data: transformedJob });
    }

    // Existing logic for fetching multiple jobs
    const whereClause = companyId ? { company_id: parseInt(companyId) } : {};
    const jobs = await prisma.availablePosition.findMany({
      where: whereClause,
      include: {
        company: true,
      },
    });

    const now = new Date();
    const jobsWithStatus = jobs.map((job) => {
      let status = "Scheduled";
      const startDate = new Date(job.submission_start_date);
      const endDate = new Date(job.submission_end_date);

      if (now >= startDate && now <= endDate) {
        status = "Active";
      } else if (now > endDate) {
        status = "Closed";
      }
      return { ...job, status };
    });

    return NextResponse.json({ success: true, data: jobsWithStatus });
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
      department,
      location,
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
        department,
        location,
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
