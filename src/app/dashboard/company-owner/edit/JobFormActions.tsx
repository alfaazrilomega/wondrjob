/* eslint-disable prettier/prettier */
"use client";

import { deleteJobPosting } from "@/app/actions/jobs";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function JobFormActions({ jobId }: { jobId: number }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this job?")) {
      startTransition(async () => {
        await deleteJobPosting(jobId.toString());
        router.push("/dashboard/company-owner");
      });
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => router.back()}
        className="btn btn-secondary"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={handleDelete}
        className="btn btn-danger"
        disabled={isPending}
      >
        {isPending ? "Deleting..." : "Delete Job"}
      </button>
    </>
  );
}
