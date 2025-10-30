"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/lib/db";

export async function getCompanyDashboardData() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const company = await prisma.company.findUnique({
    where: { user_id: user.id },
    include: {
      jobs: {
        include: {
          applicants: true,
          _count: {
            select: { applicants: true },
          },
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
    return { error: "Company not found for user." };
  }

  // Job Postings Stats
  const totalJobs = company.jobs.length;
  const totalApplicants = company.jobs.reduce(
    (sum, job) => sum + job._count.applicants,
    0,
  );
  const avgSalary =
    company.jobs.length > 0
      ? company.jobs.reduce((sum, job) => sum + (job.salaryMax ?? 0), 0) /
        company.jobs.length
      : 0;

  const jobStats = {
    totalJobs,
    totalApplicants,
    avgSalary,
    avgTimeToFill: "28d", // This is still mock data as we don't have the data to calculate it
  };

  // Jobs List
  const jobs = company.jobs.map((job) => ({
    id: job.id,
    title: job.position_name,
    status:
      new Date(job.submission_end_date) > new Date() ? "Active" : "Expired",
    applicants: job._count.applicants,
    description: job.description,
    skills: [], // skills relation is not included in the query to keep it simple for now
    location: "Remote", // Mock data
    department: "Engineering", // Mock data
  }));

  // Team Members
  const teamMembers = company.hrds.map((hrd) => ({
    id: hrd.id,
    name: hrd.user.name,
    role: "HRD Staff",
    email: hrd.user.email,
    avatar:
      hrd.user.profile_picture ||
      `https://placehold.co/100x100/A985D4/FFFFFF?text=${hrd.user.name.charAt(0)}`,
  }));

  // Company Profile
  const companyProfile = {
    name: company.name,
    logo: company.logo,
    tagline: company.website, // Assuming website is tagline for now
    description: company.description,
    phone: company.phone,
    address: company.address,
    website: company.website,
    certificateUrl: company.companyCertificateUrl,
  };

  // Finance Stats
  const latestStats = company.monthlyStats[company.monthlyStats.length - 1];
  const financeStats = {
    totalRevenue: latestStats?.revenue ?? 0,
    totalExpenses: latestStats?.expenses ?? 0,
    netIncome: latestStats?.netIncome ?? 0,
    payroll: 0, // No data for this
  };

  return {
    jobStats,
    jobs,
    teamMembers,
    companyProfile,
    financeStats,
  };
}
