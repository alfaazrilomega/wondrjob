"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createJobDraft } from "@/actions/jobDrafts";
import { JobPostingForm } from "@/app/admin/job-postings/JobPostingForm";
import { toast } from "sonner";
import type { JobFormData } from "@/app/admin/job-postings/types";

interface Company {
  id: number;
  name: string;
  logo: string | null;
}

export default function CreateJobDraftPage() {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [companyId, setCompanyId] = useState<number | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyId = async () => {
      try {
        const response = await fetch("/api/hrd/company");
        if (response.ok) {
          const data = await response.json();
          setCompanyId(data.companyId);
          setCompany(data.company);
        } else {
          throw new Error("Failed to fetch company");
        }
      } catch (error) {
        console.error("Error fetching company:", error);
        toast.error("Failed to load company information");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyId();
  }, []);

  const handleSaveDraft = (formData: JobFormData) => {
    if (!companyId) {
      toast.error("Company information not available");
      return;
    }

    startTransition(async () => {
      const draftData = {
        position_name: formData.position_name,
        capacity: formData.capacity,
        description: formData.description,
        submission_start_date: new Date(formData.submission_start_date),
        submission_end_date: new Date(formData.submission_end_date),
        department: "", // Not in form, can be added later
        location: "", // Not in form, can be added later
        jobType: formData.jobType,
        salaryMax: formData.salaryMax,
        salaryMin: formData.salaryMin,
        workStyle: formData.workStyle,
        skillIds: formData.skills
          ? formData.skills.map((skill) => skill.id)
          : [],
      };

      const result = await createJobDraft(draftData);

      if (!result.success) {
        toast.error(result.error || "Failed to create draft.");
      } else {
        toast.success("Job draft submitted for approval");
        router.push("/dashboard/hrd/my-drafts");
      }
    });
  };

  const handleCancel = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="p-8 md:p-12 text-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="p-8 md:p-12 text-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-red-400">
            Unable to load company information
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 md:p-12 text-gray-200">
      <div className="max-w-4xl mx-auto">
        <JobPostingForm
          title="Create New Job Draft"
          job={null}
          companies={[company]}
          selectedCompany={company}
          onSave={handleSaveDraft}
          jobsForCompany={[]}
          isLoadingCompanies={false}
        />
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 rounded-md text-purple-400 border border-purple-600 hover:bg-purple-600/10"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
