"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

// --- TYPES ---
type Job = {
  id: number;
  position_name: string;
  capacity: number;
  submission_end_date: string;
  status: string;
  company: {
    name: string;
  };
};

const Modal = ({
  title,
  isOpen,
  onClose,
  children,
}: {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="glass-pane w-full max-w-lg p-6 border border-[#9F54FF]/30">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-3xl"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const JobPostingsClient = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/jobs");
        const data = await response.json();
        if (data.success) {
          setJobs(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      }
      setLoading(false);
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.position_name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const openDeleteModal = (job: Job) => {
    setSelectedJob(job);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedJob(null);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteJob = async () => {
    if (!selectedJob) return;

    try {
      const response = await fetch(`/api/jobs/${selectedJob.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setJobs((prevJobs) =>
          prevJobs.filter((job) => job.id !== selectedJob.id),
        );
        closeDeleteModal();
      } else {
        console.error("Failed to delete job");
      }
    } catch (error) {
      console.error("Failed to delete job", error);
    }
  };

  return (
    <div
      className="p-8 text-white min-h-screen"
      style={{ background: "#101018" }}
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Job Post Management</h1>
        <Link href="/admin/job-postings/create">
          <button className="px-6 py-2 rounded-lg bg-[#9F54FF] text-white font-semibold shadow-[0_0_15px_rgba(159,84,255,0.5)] transition-all duration-300 hover:bg-purple-600 hover:shadow-[0_0_25px_rgba(159,84,255,0.8)]">
            Add New Job Post
          </button>
        </Link>
      </div>

      <div className="glass-pane p-6">
        <div className="flex justify-end mb-4">
          <input
            type="text"
            placeholder="Search by position..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#9F54FF]"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[rgba(159,84,255,0.2)]">
                <th className="p-4">Position Name</th>
                <th className="p-4">Company Name</th>
                <th className="p-4">Capacity</th>
                <th className="p-4">Submission End</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center p-8">
                    Loading...
                  </td>
                </tr>
              ) : (
                currentJobs.map((job) => (
                  <tr
                    key={job.id}
                    className="border-b border-[rgba(159,84,255,0.2)] hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4">{job.position_name}</td>
                    <td className="p-4">{job.company.name}</td>
                    <td className="p-4">{job.capacity}</td>
                    <td className="p-4">
                      {new Date(job.submission_end_date).toLocaleDateString()}
                    </td>
                    <td className="p-4">{job.status}</td>
                    <td className="p-4 flex gap-4 items-center">
                      <Link href={`/admin/job-postings/edit/${job.id}`}>
                        <button className="px-4 py-1 rounded-lg border-2 border-[#9F54FF] text-[#9F54FF] font-semibold transition-all duration-300 hover:bg-[#9F54FF] hover:text-white">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => openDeleteModal(job)}
                        className="text-red-500 hover:text-red-400 transition-colors duration-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-6">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg transition-colors ${currentPage === page ? "bg-[#9F54FF] text-white" : "bg-white/10 hover:bg-white/20"}`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>

      <Modal
        title="Confirm Deletion"
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
      >
        <div className="text-white/80">
          <p>
            Are you sure you want to permanently delete the job post for{" "}
            <span className="font-bold">{selectedJob?.position_name}</span>?This
            action cannot be undone.
          </p>
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={closeDeleteModal}
              className="px-5 py-2 rounded-lg border-2 border-white/30 text-white/80 font-semibold transition-all duration-300 hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteJob}
              className="px-6 py-2 rounded-lg bg-red-600 text-white font-semibold shadow-lg transition-all duration-300 hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default JobPostingsClient;
