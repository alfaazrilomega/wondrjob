"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getMyJobDrafts,
  deleteJobDraft,
  JobDraftData,
} from "@/actions/jobDrafts";

export default function HrdDashboard() {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<"create" | "manage">("create");
  const [drafts, setDrafts] = useState<JobDraftData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDrafts = async () => {
    try {
      setLoading(true);
      setError(null);
      const draftsData = await getMyJobDrafts();
      setDrafts(draftsData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      console.error("Error fetching drafts:", err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentView === "manage") {
      fetchDrafts();
    } else {
      setDrafts([]);
      setLoading(true);
      setError(null);
    }
  }, [currentView]);

  const handleEditDraft = (draftId: number) => {
    router.push(`/dashboard/hrd/edit/${draftId}`);
  };

  const handleDeleteDraft = async (draftId: number) => {
    if (
      !confirm(
        "Are you sure you want to delete this draft? This action cannot be undone.",
      )
    ) {
      return;
    }

    try {
      const result = await deleteJobDraft(draftId);
      if (result.success) {
        alert("Draft deleted successfully");
        fetchDrafts(); // Refresh the list
      } else {
        alert(`Failed to delete draft: ${result.error}`);
      }
    } catch (err) {
      console.error("Error deleting draft:", err);
      alert("An error occurred while deleting the draft");
    }
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      PENDING: "bg-yellow-100 text-yellow-800",
      APPROVED: "bg-green-100 text-green-800",
      REJECTED: "bg-red-100 text-red-800",
    };

    const statusText = {
      PENDING: "Pending",
      APPROVED: "Approved",
      REJECTED: "Rejected",
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${
          statusClasses[status as keyof typeof statusClasses] ||
          "bg-gray-100 text-gray-800"
        }`}
      >
        {statusText[status as keyof typeof statusText] || status}
      </span>
    );
  };

  const sortedDrafts = [...drafts].sort((a, b) => {
    if (a.status === "PENDING" && b.status !== "PENDING") return -1;
    if (a.status !== "PENDING" && b.status === "PENDING") return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="p-8 md:p-12 text-gray-200">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">HRD Dashboard</h1>

        {/* Navigation */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setCurrentView("create")}
            className={`px-6 py-2 rounded-md font-semibold transition-colors ${
              currentView === "create"
                ? "bg-purple-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Create Job Draft
          </button>
          <button
            onClick={() => setCurrentView("manage")}
            className={`px-6 py-2 rounded-md font-semibold transition-colors ${
              currentView === "manage"
                ? "bg-purple-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Manage My Drafts
          </button>
        </div>

        {/* Content */}
        {currentView === "create" ? (
          <div className="bg-[#1e1e24] rounded-lg p-8 border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Create New Job Draft
            </h2>
            <p className="text-gray-400 mb-6">
              Fill out the job draft form to submit it for company owner
              approval.
            </p>
            <button
              onClick={() => router.push("/dashboard/hrd/create")}
              className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-500 font-semibold transition-colors"
            >
              Start Creating Draft
            </button>
          </div>
        ) : (
          <div className="bg-[#1e1e24] rounded-lg p-8 border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Manage My Job Drafts
            </h2>

            {error && (
              <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-md">
                <p className="text-red-300">{error}</p>
              </div>
            )}

            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
                <p className="text-gray-400 mt-4">Loading drafts...</p>
              </div>
            ) : drafts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400">
                  You haven&apos;t created any job drafts yet.
                </p>
                <button
                  onClick={() => setCurrentView("create")}
                  className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-500 font-semibold transition-colors"
                >
                  Create Your First Draft
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {sortedDrafts.map((draft) => (
                  <div
                    key={draft.id}
                    className="p-6 bg-gray-800/50 rounded-lg border border-gray-700 hover:bg-gray-800/70 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex-grow">
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {draft.position_name}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                          {draft.department && (
                            <span>Department: {draft.department}</span>
                          )}
                          {draft.location && (
                            <span>Location: {draft.location}</span>
                          )}
                          <span>
                            Created:{" "}
                            {new Date(draft.createdAt).toLocaleDateString()}
                          </span>
                          {draft.updatedAt && (
                            <span>
                              Updated:{" "}
                              {new Date(draft.updatedAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 flex-shrink-0">
                        {getStatusBadge(draft.status)}
                        {draft.status === "PENDING" && (
                          <>
                            <button
                              onClick={() => handleEditDraft(draft.id)}
                              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 font-medium transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteDraft(draft.id)}
                              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 font-medium transition-colors"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
