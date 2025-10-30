"use client";

import { useRouter } from "next/navigation";
import { JobPostingForm } from "./JobPostingForm";
import { Job, JobFormData } from "./types";
import { deleteJobPosting } from "@/app/actions/jobs";
import { Company } from "@prisma/client";

interface EditJobClientProps {
  job: Job;
  companies: Company[];
  isLoadingCompanies?: boolean;
}

export function EditJobClient({
  job,
  companies,
  isLoadingCompanies,
}: EditJobClientProps) {
  const router = useRouter();

  const handleCancel = () => {
    router.push("/dashboard/company-owner");
  };

  const handleDelete = async (jobId: string) => {
    await deleteJobPosting(jobId);
    router.push("/dashboard/company-owner");
  };

  const handleSave = async (formData: JobFormData) => {
    // Implement save logic here
    console.log("Saving job:", formData);
    // Call updateJobPosting or similar
  };

  const selectedCompany =
    companies.find((c) => c.id === job.company_id) || null;

  return (
    <JobPostingForm
      title="Edit Job Details"
      companies={companies}
      job={job}
      onSave={handleSave}
      onCancel={handleCancel}
      onDelete={handleDelete}
      selectedCompany={selectedCompany}
      onCompanyChange={() => {}}
      jobsForCompany={[job]}
      onJobSelectionChange={() => {}}
      isLoadingCompanies={isLoadingCompanies}
    />
  );
}
