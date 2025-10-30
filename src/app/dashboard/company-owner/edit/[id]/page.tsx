import { getJobById, updateJobPosting } from "@/app/actions/jobs";
import { JobPostingForm } from "@/app/admin/job-postings/JobPostingForm";
import { prisma } from "@/lib/lib/db";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import "./styles.css";

// This is a server component to fetch data
export default async function EditJobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div className="p-8 text-white">Unauthorized. Please log in.</div>;
  }

  const [job, companies] = await Promise.all([
    getJobById(id),
    prisma.company.findMany({ where: { user_id: user.id } }),
  ]);

  if (!job) {
    notFound();
  }

  const selectedCompany =
    companies.find((c) => c.id === job.company_id) || null;

  const formattedJob = {
    ...job,
    submission_start_date: job.submission_start_date
      .toISOString()
      .split("T")[0],
    submission_end_date: job.submission_end_date.toISOString().split("T")[0],
    skills: job.skills || [],
    jobType: job.jobType || undefined,
    workStyle: job.workStyle || undefined,
    salaryMin: job.salaryMin ?? undefined,
    salaryMax: job.salaryMax ?? undefined,
  };

  return (
    <div className="p-4 md:p-8 bg-[#121217] min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Edit Job Posting</h1>

        <form action={updateJobPosting}>
          <input type="hidden" name="jobId" value={job.id} />

          <JobPostingForm
            title="Edit Job Details"
            job={formattedJob}
            companies={companies}
            selectedCompany={selectedCompany}
            jobsForCompany={[formattedJob]}
          />
        </form>
      </div>
    </div>
  );
}
