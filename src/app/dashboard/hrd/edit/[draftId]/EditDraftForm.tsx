/* eslint-disable prettier/prettier */
"use client";

import React, { useState, useEffect, useTransition } from "react";
import { notFound, useRouter } from "next/navigation";
import { getJobDraftDetails, updateJobDraft } from "@/actions/jobDrafts";
import { JobPostingForm } from "@/app/admin/job-postings/JobPostingForm";
import { toast } from "sonner";
import type { JobFormData } from "@/app/admin/job-postings/types";
import "./styles.css";

import type { User } from "@supabase/supabase-js";

// Define interfaces for better type safety
interface Skill {
  id: number;
  name: string;
  category: string;
  aliases: string[];
}

interface CompanyForForm {
  id: number;
  name: string;
  logo: string | null;
}

interface JobDraftFromDB {
  id: number;
  company_id: number;
  position_name: string;
  description: string;
  capacity: number;
  salaryMin?: number | null;
  salaryMax?: number | null;
  submission_start_date?: Date | null;
  submission_end_date?: Date | null;
  skills: Skill[];
  jobType?: string | null;
  workStyle?: string | null;
  department?: string | null;
  location?: string | null;
  status: string;
  createdBy: string;
  company: CompanyForForm;
}

interface JobDraftUpdateData {
  position_name: string;
  capacity: number;
  description: string;
  submission_start_date: Date;
  submission_end_date: Date;
  salaryMin?: number;
  salaryMax?: number;
  jobType: string;
  workStyle: string;
  department: string;
  location: string;
  skillIds: number[];
}

// This helper function can be moved to a utils file if needed
function formatDraftForForm(draft: JobDraftFromDB | null) {
  if (!draft) return null;
  return {
    id: draft.id,
    company_id: draft.company_id,
    position_name: draft.position_name,
    capacity: draft.capacity,
    description: draft.description,
    salaryMin: draft.salaryMin ?? undefined,
    salaryMax: draft.salaryMax ?? undefined,
    submission_start_date:
      draft.submission_start_date?.toISOString().split("T")[0] || "",
    submission_end_date:
      draft.submission_end_date?.toISOString().split("T")[0] || "",
    skills: draft.skills || [],
    jobType: draft.jobType as "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP" | undefined,
    workStyle: draft.workStyle as "ON_SITE" | "HYBRID" | "REMOTE" | undefined,
  };
}

export default function EditDraftForm({
  draftId,
  user,
}: {
  draftId: number;
  user: User | null;
}) {
  const [jobDraft, setJobDraft] = useState<JobDraftFromDB | null>(null);
  const [hrdCompany, setHrdCompany] = useState<CompanyForForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        if (!user) {
          throw new Error("Unauthorized. Please log in.");
        }

        // Fetch draft details and company info
        const draftDetails = await getJobDraftDetails(draftId, user);

        // Since we can't use prisma on the client, we need an API route
        // or another server action to get the company info.
        // For now, let's assume the company is included in draftDetails.
        if (!draftDetails.company) {
          throw new Error(
            "Could not find associated company for this HRD user.",
          );
        }

        // Validation
        if (!draftDetails || draftDetails.createdBy !== user.id) {
          return notFound();
        }

        if (draftDetails.status !== "PENDING") {
          throw new Error(
            `This job draft has already been ${draftDetails.status.toLowerCase()} and cannot be edited.`,
          );
        }

        setJobDraft(draftDetails);
        setHrdCompany(draftDetails.company);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(
          (err as Error).message || "Error loading data. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [draftId, user]);

  const handleSaveDraft = (formData: JobFormData) => {
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
        salaryMax: formData.salaryMax ? parseInt(formData.salaryMax.toString()) : undefined,
        salaryMin: formData.salaryMin ? parseInt(formData.salaryMin.toString()) : undefined,
        workStyle: formData.workStyle,
        skillIds: formData.skills
          ? formData.skills.map((skill) => skill.id)
          : [],
      };

      const result = await updateJobDraft(draftId, draftData);

      if (!result.success) {
        toast.error(result.error || "Failed to update draft.");
      } else {
        toast.success("Draft updated successfully!");
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

  if (!hrdCompany) {
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

  const formattedDraft = formatDraftForForm(jobDraft);

  return (
    <div className="p-8 md:p-12 text-gray-200">
      <div className="max-w-4xl mx-auto">
        <JobPostingForm
          title="Edit Job Draft"
          job={formattedDraft!}
          companies={[hrdCompany]}
          selectedCompany={hrdCompany}
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
