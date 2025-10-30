"use client";

import React, { useState, useEffect, useTransition } from "react";
import { notFound, useRouter } from "next/navigation";
import { getJobDraftDetails, updateJobDraft } from "@/actions/jobDrafts";
import { JobPostingForm } from "@/app/admin/job-postings/JobPostingForm";
import { JobFormActions } from "./JobFormActions";
import { toast } from "sonner";

import type { User } from "@supabase/supabase-js";

// Define interfaces for better type safety
interface Skill {
  id: number;
  name: string;
}

interface CompanyForForm {
  id: number;
  name: string;
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
    ...draft,
    id: draft.id,
    company_id: draft.company_id.toString(),
    capacity: draft.capacity,
    salaryMin: draft.salaryMin ?? undefined,
    salaryMax: draft.salaryMax ?? undefined,
    submission_start_date:
      draft.submission_start_date?.toISOString().split("T")[0] || "",
    submission_end_date:
      draft.submission_end_date?.toISOString().split("T")[0] || "",
    skills: draft.skills || [],
    jobType: draft.jobType || undefined,
    workStyle: draft.workStyle || undefined,
    department: draft.department || "",
    location: draft.location || "",
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
  const [isPending, startTransition] = useTransition();
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

  const handleUpdate = (formData: FormData) => {
    startTransition(async () => {
      try {
        const data: JobDraftUpdateData = {
          position_name: formData.get("position_name") as string,
          capacity: Number(formData.get("capacity")),
          description: formData.get("description") as string,
          submission_start_date: new Date(
            formData.get("submission_start_date") as string,
          ),
          submission_end_date: new Date(
            formData.get("submission_end_date") as string,
          ),
          salaryMin: Number(formData.get("salaryMin")) || undefined,
          salaryMax: Number(formData.get("salaryMax")) || undefined,
          jobType: formData.get("jobType") as string,
          workStyle: formData.get("workStyle") as string,
          department: formData.get("department") as string,
          location: formData.get("location") as string,
          skillIds: formData.getAll("skills").map(Number),
        };

        const result = await updateJobDraft(draftId, data);

        if (result?.success) {
          toast.success("Draft updated successfully!");
          router.push("/dashboard/hrd");
          router.refresh();
        } else {
          toast.error(result?.error || "Failed to update draft.");
        }
      } catch (e) {
        toast.error("An unexpected error occurred.");
        console.error(e);
      }
    });
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-400">{error}</div>;
  }

  const formattedDraft = formatDraftForForm(jobDraft);

  return (
    <div className="p-4 md:p-8 bg-[#121217] min-h-screen text-gray-200">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Edit Job Draft</h1>

        <form action={handleUpdate}>
          <input type="hidden" name="company_id" value={hrdCompany!.id} />

          <JobPostingForm
            title="Edit Draft Details"
            job={formattedDraft!}
            companies={[hrdCompany!]}
            selectedCompany={hrdCompany!}
            jobsForCompany={[]}
            isLoadingCompanies={false}
          />

          <div className="bg-[#1e1e24] rounded-b-lg shadow-lg p-8 border-t border-gray-700">
            <div className="flex justify-end gap-4">
              <JobFormActions draftId={draftId} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
