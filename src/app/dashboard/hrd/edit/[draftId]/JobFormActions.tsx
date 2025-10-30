"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteJobDraft } from "@/actions/jobDrafts";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface JobFormActionsProps {
  draftId: number;
}

export function JobFormActions({ draftId }: JobFormActionsProps) {
  const router = useRouter();
  const [isPendingDelete, startDeleteTransition] = useTransition();

  const handleCancel = () => {
    router.back();
  };

  const handleDelete = () => {
    const confirmed = confirm(
      "Are you sure you want to delete this draft? This cannot be undone.",
    );
    if (!confirmed) return;

    startDeleteTransition(async () => {
      const result = await deleteJobDraft(draftId);
      if (!result.success) {
        toast.error(result.error || "Failed to delete draft.");
      } else {
        toast.success("Draft deleted successfully");
        // Redirect to the main dashboard page, which can then show the list
        router.push("/dashboard/hrd");
        router.refresh();
      }
    });
  };

  return (
    <div className="flex justify-end gap-4">
      <Button
        type="button"
        variant="outline"
        onClick={handleCancel}
        disabled={isPendingDelete}
      >
        Cancel
      </Button>
      <Button
        type="button"
        variant="destructive"
        onClick={handleDelete}
        disabled={isPendingDelete}
      >
        <Trash2 className="w-4 h-4 mr-2" />
        {isPendingDelete ? "Deleting..." : "Delete Draft"}
      </Button>
    </div>
  );
}
