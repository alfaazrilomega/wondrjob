import { NextResponse } from "next/server";
import { prisma } from "@/lib/lib/db";
import { getCurrentUser } from "@/lib/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const company = await prisma.company.findUnique({
      where: { user_id: user.id },
      include: {
        jobs: {
          include: {
            applicants: true,
            skills: true,
          },
        },
        monthlyStats: true,
        hrds: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!company) {
      return new NextResponse("Company not found for this user", {
        status: 404,
      });
    }

    const totalJobs = company.jobs.length;
    const totalApplicants = company.jobs.reduce(
      (sum, job) => sum + job.applicants.length,
      0,
    );

    const jobsWithSalary = company.jobs.filter(
      (job) => job.salaryMin !== null && job.salaryMax !== null,
    );
    const avgSalary =
      jobsWithSalary.length > 0
        ? jobsWithSalary.reduce(
            (sum, job) => sum + (job.salaryMin! + job.salaryMax!) / 2,
            0,
          ) / jobsWithSalary.length
        : 0;

    // Dummy data for avgTimeToFill as it's not in the schema
    const avgTimeToFill = 30;

    const jobsResponse = company.jobs.map((job) => ({
      id: job.id,
      title: job.position_name,
      applicants: job.applicants.length,
      location: job.location || "N/A",
      department: job.department || "N/A",
      status:
        new Date(job.submission_end_date) > new Date() ? "Active" : "Closed",
      description: job.description,
      skills: job.skills.map((skill) => skill.name),
    }));

    const teamResponse = company.hrds.map((hrd) => ({
      id: hrd.user.id,
      avatar:
        hrd.user.profile_picture ||
        `https://ui-avatars.com/api/?name=${hrd.user.name.replace(" ", "+")}&background=random`,
      name: hrd.user.name,
      role: "HRD", // Assuming all are HRD for now
      email: hrd.user.email,
    }));

    const monthlyStatsResponse = company.monthlyStats.map((stat) => ({
      id: stat.id,
      month: new Date(stat.year, stat.month - 1).toLocaleString("default", {
        month: "short",
      }),
      rate: stat.successRate,
      year: stat.year,
    }));

    const data = {
      jobs: jobsResponse,
      stats: {
        totalJobs,
        totalApplicants,
        avgSalary,
        avgTimeToFill,
      },
      team: teamResponse,
      monthlyStats: monthlyStatsResponse,
      profile: {
        logoUrl: company.logo || "",
        companyName: company.name,
        tagline: company.tagline || "",
        website: company.website || "",
        phone: company.phone,
        address: company.address,
        certificateUrl: company.companyCertificateUrl || "",
        description: company.description,
      },
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error("[COMPANY_DASHBOARD_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
