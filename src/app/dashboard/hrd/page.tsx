/* eslint-disable react/no-unescaped-entities */
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
import { Edit, Trash2, Plus } from "lucide-react";

export default function ManageJobDraftsPage() {
  const router = useRouter();
  const [drafts, setDrafts] = useState<JobDraftData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPendingDelete, startDeleteTransition] = useTransition();

  useEffect(() => {
    // Fungsi ini akan mengambil draf saat halaman dimuat
    const fetchDrafts = async () => {
      try {
        // Ambil data draf dari Server Action
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
  }, []); // Dijalankan sekali saat mount

  // Fungsi untuk menangani penghapusan draf
  const handleDeleteDraft = async (draftId: number) => {
    const confirmed = confirm(
      "Are you sure you want to delete this draft? This cannot be undone.",
    );
    if (!confirmed) return;

    startDeleteTransition(async () => {
      const result = await deleteJobDraft(draftId);
      if (!result.success) {
        toast.error(result.error || "Failed to delete draft");
      } else {
        toast.success("Draft deleted successfully");
        // Perbarui state lokal untuk menghapus draf dari UI
        setDrafts((prev) => prev.filter((d) => d.id !== draftId));
      }
    });
  };

  // Fungsi untuk mendapatkan badge status
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

  // Tampilan saat loading
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
        <p className="text-gray-400 mt-4">Loading drafts...</p>
      </div>
    );
  }

  // Tampilan utama
  return (
    <>
      {/* Header Halaman (di dalam area konten) */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Manage My Job Drafts</h1>
        <Button
          onClick={() => router.push("/dashboard/hrd/create-job-draft")}
          className="flex items-center gap-2"
        >
          <Plus size={18} />
          Create New Draft
        </Button>
      </div>

      {/* Konten Halaman */}
      {drafts.length === 0 ? (
        // Tampilan jika tidak ada draf
        <div className="text-center py-12 bg-[#1e1e24] rounded-lg border border-gray-700">
          <p className="text-gray-400 mb-4">
            You haven't created any job drafts yet.
          </p>
          <Button
            onClick={() => router.push("/dashboard/hrd/create-job-draft")}
          >
            Create Your First Draft
          </Button>
        </div>
      ) : (
        // Tampilan tabel jika ada draf
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
                    {/* Tombol Edit/Delete hanya muncul jika status PENDING */}
                    {draft.status === "PENDING" && (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-gray-300 border-gray-600 hover:bg-gray-700 hover:text-white"
                          onClick={() =>
                            router.push(
                              `/dashboard/hrd/edit/${draft.id}`, // Arahkan ke halaman edit
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
    </>
  );
}
