"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useParams, notFound } from "next/navigation";
import {
  ApplicationStatus,
  PositionApplied,
  Society,
  AvailablePosition,
  Company,
} from "@prisma/client";

// --- MOCK DATA (Remove once API is connected) ---
// Simulating the detailed applicant data we'll get
type DetailedApplicant = PositionApplied & {
  society: Society & {
    skills: { id: number; name: string }[];
  };
};

// --- ICONS ---
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-purple-400"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

// --- HELPER FUNCTIONS ---
const formatDate = (dateString: string | Date) => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// --- UI COMPONENTS ---
const GlassCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-gray-900/50 backdrop-blur-lg border border-purple-500/20 rounded-xl shadow-lg ${className}`}
  >
    {children}
  </div>
);

const StatusBadge = ({ status }: { status: ApplicationStatus }) => {
  const baseStyle = "px-3 py-1 text-xs font-semibold rounded-full";
  const styles = {
    PENDING: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
    ACCEPTED: "bg-green-500/20 text-green-400 border border-green-500/30",
    REJECTED: "bg-red-500/20 text-red-400 border border-red-500/30",
  };
  return <span className={`${baseStyle} ${styles[status]}`}>{status}</span>;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-lg ${
            currentPage === page
              ? "bg-purple-600 text-white"
              : "bg-purple-500/20 text-purple-300"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    children,
  }: {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    children: React.ReactNode;
  }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
        <GlassCard className="w-full max-w-md p-6">
          <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
          <div className="text-gray-300 mb-6">{children}</div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-700 text-white font-semibold hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-500"
            >
              Confirm
            </button>
          </div>
        </GlassCard>
      </div>
    );
  };

// --- MAIN PAGE COMPONENT ---
export default function ViewApplicantsPage() {
  const params = useParams();
  const id = params.id as string;

  const [job, setJob] = useState<(AvailablePosition & { company: Company; applicants: DetailedApplicant[] }) | null>(null);
  const [selectedApplicant, setSelectedApplicant] = useState<DetailedApplicant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "ALL">("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{title: string, onConfirm: () => void, applicantName: string, action: string} | null>(null);

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    if (!id) return;
    async function fetchJobData() {
      try {
        setLoading(true);
        const response = await fetch(`/api/jobs/${id}`);
        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.error || `Failed to fetch data: ${response.statusText}`);
        }
        const result = await response.json();
        if (result.success) {
          setJob(result.data);
        } else {
          throw new Error(result.error || "Failed to load job data.");
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
          if (err.message.includes("not found")) {
            notFound();
          }
        }
      } finally {
        setLoading(false);
      }
    }
    fetchJobData();
  }, [id]);

  const filteredApplicants = useMemo(() => {
    if (!job) return [];
    if (statusFilter === "ALL") {
      return job.applicants;
    }
    return job.applicants.filter((app) => app.status === statusFilter);
  }, [job, statusFilter]);

  const paginatedApplicants = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredApplicants.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredApplicants, currentPage]);

  const totalPages = Math.ceil(filteredApplicants.length / ITEMS_PER_PAGE);

  const handleStatusUpdate = (applicationId: number, status: ApplicationStatus) => {
    const applicant = job?.applicants.find(a => a.id === applicationId);
    if (!applicant) return;

    setModalContent({
        title: `Confirm ${status === 'ACCEPTED' ? 'Acceptance' : 'Rejection'}`,
        onConfirm: () => confirmStatusUpdate(applicationId, status),
        applicantName: applicant.society.name,
        action: status === 'ACCEPTED' ? 'accept' : 'reject',
    });
    setIsModalOpen(true);
  };

  const confirmStatusUpdate = async (applicationId: number, status: ApplicationStatus) => {
    try {
        const response = await fetch(`/api/applications/${applicationId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        });

        if (!response.ok) {
            throw new Error('Failed to update status');
        }

        setJob(prevJob => {
            if (!prevJob) return null;
            const updatedApplicants = prevJob.applicants.map(app => 
                app.id === applicationId ? { ...app, status } : app
            );
            return { ...prevJob, applicants: updatedApplicants };
        });

        setSelectedApplicant(prev => prev && prev.id === applicationId ? { ...prev, status } : prev);

    } catch (error) {
        console.error("Failed to update application status:", error);
        // Here you could show an error message to the user
    } finally {
        setIsModalOpen(false);
    }
  };


  if (loading) return <div className="p-8 text-white">Loading applicants...</div>;
  if (error) return <div className="p-8 text-white">Error: {error}</div>;
  if (!job) return notFound();

  return (
    <>
        <div className="p-8 text-gray-200 space-y-8" style={{ background: "#101018" }}>
        {/* Page Header */}
        <GlassCard className="p-6">
            <h1 className="text-3xl font-bold text-white mb-1">
            Applicants for: {job.position_name}
            </h1>
            <p className="text-lg text-gray-400">
            Total Applicants: {filteredApplicants.length}
            </p>
            <div className="mt-4">
            <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="bg-gray-800 border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
                <option value="ALL">All</option>
                <option value="PENDING">Pending</option>
                <option value="ACCEPTED">Accepted</option>
                <option value="REJECTED">Rejected</option>
            </select>
            </div>
        </GlassCard>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" style={{gridTemplateColumns: '2fr 1fr'}}>
            {/* Left Column: Applicant List */}
            <GlassCard className="lg:col-span-2 p-6 flex flex-col">
                <div className="flex-grow">
                    {paginatedApplicants.map((applicant) => (
                        <div
                            key={applicant.id}
                            onClick={() => setSelectedApplicant(applicant)}
                            className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border-l-4 ${selectedApplicant?.id === applicant.id ? 'bg-purple-500/20 border-purple-500' : 'border-transparent hover:bg-purple-500/10'}`}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-bold text-lg text-white">{applicant.society.name}</p>
                                    <p className="text-sm text-gray-400">
                                        Applied on {formatDate(applicant.apply_date)}
                                    </p>
                                </div>
                                <StatusBadge status={applicant.status} />
                            </div>
                        </div>
                    ))}
                </div>
                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}
            </GlassCard>

            {/* Right Column: Applicant Details */}
            <div className="lg:col-span-1">
                <GlassCard className="p-6 sticky top-8">
                    {!selectedApplicant ? (
                        <div className="flex flex-col items-center justify-center h-96 text-center">
                            <UserIcon />
                            <p className="mt-4 text-lg font-semibold">Select an applicant</p>
                            <p className="text-gray-400">Details will be shown here.</p>
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">{selectedApplicant.society.name}</h2>
                            
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-purple-300">Expected Salary</h3>
                                    <p>{selectedApplicant.expectedSalary ? new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(selectedApplicant.expectedSalary) : "Not specified"}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-purple-300">Earliest Start Date</h3>
                                    <p>{selectedApplicant.earliestStartDate ? formatDate(selectedApplicant.earliestStartDate) : "Not specified"}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-purple-300">Resume</h3>
                                    <a href={selectedApplicant.resume || '#'} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">View Resume</a>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-purple-300">Cover Letter</h3>
                                    <p className="text-gray-300 whitespace-pre-wrap">{selectedApplicant.coverLetter || "No cover letter provided."}</p>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-purple-500/20">
                                <h3 className="text-xl font-bold text-white mb-4">Manage Application</h3>
                                {selectedApplicant.status === 'PENDING' && (
                                    <div className="flex space-x-4">
                                        <button onClick={() => handleStatusUpdate(selectedApplicant.id, 'ACCEPTED')} className="flex-1 px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-500">Accept</button>
                                        <button onClick={() => handleStatusUpdate(selectedApplicant.id, 'REJECTED')} className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-500">Reject</button>
                                    </div>
                                )}
                                {selectedApplicant.status !== 'PENDING' && (
                                    <p className="text-center text-gray-400">This application has already been processed.</p>
                                )}
                            </div>
                        </div>
                    )}
                </GlassCard>
            </div>
        </div>
        </div>
        <ConfirmationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={modalContent?.onConfirm || (() => {})}
            title={modalContent?.title || ''}
        >
            {modalContent && <p>Are you sure you want to {modalContent.action} the application for <strong>{modalContent.applicantName}</strong>? This action cannot be undone.</p>}
        </ConfirmationModal>
    </>
  );
}