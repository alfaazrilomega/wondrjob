"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  getMyJobDrafts,
  deleteJobDraft,
  JobDraftData,
} from "@/actions/jobDrafts";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Edit, Trash2 } from "lucide-react";

export default function ManageJobDraftsPage() {
  const router = useRouter();
  const [drafts, setDrafts] = useState<JobDraftData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPendingDelete, startDeleteTransition] = useTransition();

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const draftsData = await getMyJobDrafts();
        setDrafts(draftsData);
      } catch (error) {
        console.error("Error fetching drafts:", error);
        toast.error("Failed to load job drafts");
      } finally {
        setLoading(false);
      }
    };

    fetchDrafts();
  }, []);

  const handleDeleteDraft = async (draftId: number) => {
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
        setDrafts((prev) => prev.filter((d) => d.id !== draftId));
      }
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Pending Approval
          </Badge>
        );
      case "APPROVED":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Approved
          </Badge>
        );
      case "REJECTED":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="p-8 md:p-12 text-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">Loading drafts...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 md:p-12 text-gray-200">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">
          Manage My Job Drafts
        </h1>

        {drafts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">
              You haven&apos;t created any job drafts yet.
            </p>
            <Button
              onClick={() => router.push("/dashboard/hrd/create-job-draft")}
            >
              Create Your First Draft
            </Button>
          </div>
        ) : (
          <div className="bg-[#1e1e24] rounded-lg shadow-lg overflow-hidden border border-gray-700">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-300">Position Name</TableHead>
                  <TableHead className="text-gray-300">Department</TableHead>
                  <TableHead className="text-gray-300">Location</TableHead>
                  <TableHead className="text-gray-300">Created Date</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drafts.map((draft) => (
                  <TableRow key={draft.id} className="border-gray-700">
                    <TableCell className="text-white">
                      {draft.position_name}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {draft.department || "—"}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {draft.location || "—"}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {new Date(draft.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{getStatusBadge(draft.status)}</TableCell>
                    <TableCell>
                      {draft.status === "PENDING" && (
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              router.push(
                                `/dashboard/hrd/edit-draft/${draft.id}`,
                              )
                            }
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteDraft(draft.id)}
                            disabled={isPendingDelete}
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
