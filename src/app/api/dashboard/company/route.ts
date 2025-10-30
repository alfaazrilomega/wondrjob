import { NextResponse } from "next/server";
import { prisma } from "@/lib/lib/db";
import { getCompanyId } from "@/lib/lib/getCompanyId";

export async function GET() {
  try {
    const companyId = await getCompanyId();

    if (!companyId) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    const company = await prisma.company.findUnique({
      where: { id: companyId },
      include: {
        jobs: {
          include: {
            applicants: true,
            skills: true,
          },
        },
        hrds: {
          include: {
            user: true,
          },
        },
        monthlyStats: true,
      },
    });

    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    const totalApplicants = company.jobs.reduce(
      (acc, job) => acc + job.applicants.length,
      0,
    );
    const avgSalary =
      company.jobs.length > 0
        ? company.jobs.reduce((acc, job) => acc + (job.salaryMax || 0), 0) /
          company.jobs.length
        : 0;

    const stats = {
      totalJobs: company.jobs.length,
      totalApplicants,
      avgSalary,
      avgTimeToFill: 28, // This is a mock value, as we don't have this data in the database
    };

    const response = {
      jobs: company.jobs.map((job) => ({
        id: job.id,
        title: job.position_name,
        applicants: job.applicants.length,
        status: job.submission_end_date > new Date() ? "Active" : "Closed",
        location: job.workStyle,
        department: "N/A", // This is a mock value, as we don't have this data in the database
        description: job.description,
        skills: job.skills.map((skill) => skill.name),
      })),
      stats,
      team: company.hrds.map((hrd) => ({
        id: hrd.id,
        name: hrd.user.name,
        role: "HRD",
        email: hrd.user.email,
        avatar:
          hrd.user.profile_picture ||
          `https://placehold.co/100x100/A985D4/FFFFFF?text=${hrd.user.name.charAt(0)}`,
      })),
      profile: {
        companyName: company.name,
        tagline: "Quality Skincare for All", // This is a mock value, as we don't have this data in the database
        description: company.description,
        logoUrl:
          company.logo ||
          "https://placehold.co/100x100/FFFFFF/121217?text=LOGO",
        phone: company.phone,
        website: company.website,
        address: company.address,
        certificateUrl: company.companyCertificateUrl,
      },
      monthlyStats: company.monthlyStats.map((stat) => ({
        id: stat.id,
        month: `${new Date(stat.year, stat.month - 1).toLocaleString("default", { month: "short" })} ${String(stat.year).slice(-2)}`,
        rate: stat.successRate,
      })),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching company dashboard data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
