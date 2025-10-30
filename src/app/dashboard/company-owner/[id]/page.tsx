"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const JobDetails = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [job, setJob] = useState<{
    id: number;
    position_name: string;
    capacity: number;
    description: string;
    submission_start_date: Date;
    submission_end_date: Date;
    company_id: number;
    department: string | null;
    salaryMin: number | null;
    salaryMax: number | null;
    jobType: string | null;
    workStyle: string | null;
    company: {
      id: number;
      name: string;
      address: string;
      description: string;
      companyCertificateUrl: string | null;
    };
    skills: Array<{
      id: number;
      name: string;
    }>;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return;
      try {
        const response = await fetch(`/api/jobs/${id}`);
        if (!response.ok) throw new Error("Failed to fetch job details");
        const data = await response.json();
        if (data.success) {
          setJob(data.data);
        } else {
          throw new Error(data.error || "Failed to fetch job details");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading)
    return <div className="p-8 text-white">Loading job details...</div>;
  if (error) return <div className="p-8 text-white">Error: {error}</div>;
  if (!job) return <div className="p-8 text-white">No job found</div>;

  const formatSalary = (min: number | null, max: number | null) => {
    if (!min && !max) return "Not specified";
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    if (min && max)
      return `${formatter.format(min)} - ${formatter.format(max)} / month`;
    if (min) return `From ${formatter.format(min)} / month`;
    if (max) return `Up to ${formatter.format(max)} / month`;
    return "Not specified";
  };

  return (
    <div className="p-8 text-gray-200 space-y-8">
      {/* Job Header Section */}
      <div className="bg-gray-900/50 backdrop-blur-lg border border-purple-500/20 rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-white mb-1">
              {job.position_name}
            </h1>
            <p className="text-lg text-gray-400">
              {job.company.name} &middot; {job.company.address}
            </p>
          </div>
          <button
            onClick={() => router.push(`/dashboard/company-owner/edit/${id}`)}
            className="px-5 py-2 rounded-lg bg-purple-600 text-white font-semibold shadow-[0_0_15px_rgba(159,84,255,0.5)] transition-all duration-300 hover:bg-purple-500"
          >
            Edit Job
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Key Details Card */}
          <div className="bg-gray-900/50 backdrop-blur-lg border border-purple-500/20 rounded-xl shadow-lg p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="2"
                      y="7"
                      width="20"
                      height="14"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                </div>
                <span className="text-gray-400 text-sm">Job Type</span>
                <span className="font-bold text-white">
                  {job.jobType?.replace("_", "-") || "N/A"}
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <span className="text-gray-400 text-sm">Salary</span>
                <span className="font-bold text-white">
                  {formatSalary(job.salaryMin, job.salaryMax)}
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <line x1="9" y1="21" x2="9" y2="9"></line>
                  </svg>
                </div>
                <span className="text-gray-400 text-sm">Work Style</span>
                <span className="font-bold text-white">
                  {job.workStyle || "N/A"}
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <span className="text-gray-400 text-sm">Capacity</span>
                <span className="font-bold text-white">
                  Hiring {job.capacity}
                </span>
              </div>
            </div>
          </div>

          {/* Required Skills Card */}
          {job.skills && job.skills.length > 0 && (
            <div className="bg-gray-900/50 backdrop-blur-lg border border-purple-500/20 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">
                Required Skills
              </h2>
              <div className="flex flex-wrap gap-3">
                {job.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-4 py-1.5 text-sm bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Full Job Description Card */}
          <div className="bg-gray-900/50 backdrop-blur-lg border border-purple-500/20 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Full Job Description
            </h2>
            <div
              className="prose prose-invert max-w-none text-gray-300"
              dangerouslySetInnerHTML={{ __html: job.description }}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* About the Company Card */}
          <div className="bg-gray-900/50 backdrop-blur-lg border border-purple-500/20 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              About {job.company.name}
            </h2>
            <p className="text-gray-400 leading-relaxed">
              {job.company.description}
            </p>
            {job.company.companyCertificateUrl && (
              <div className="mt-4">
                <a
                  href={job.company.companyCertificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:underline flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                    <polyline points="13 2 13 9 20 9"></polyline>
                    <path d="M12 15l-2 2 2 2"></path>
                    <path d="M16 15l2 2-2 2"></path>
                  </svg>
                  View Company Certificate
                </a>
              </div>
            )}
          </div>

          {/* Submission Dates Card */}
          <div className="bg-gray-900/50 backdrop-blur-lg border border-purple-500/20 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Submission Period
            </h2>
            <div className="space-y-2">
              <div>
                <span className="text-gray-400">Start Date:</span>
                <span className="text-white ml-2">
                  {new Date(job.submission_start_date).toLocaleDateString(
                    "en-GB",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    },
                  )}
                </span>
              </div>
              <div>
                <span className="text-gray-400">End Date:</span>
                <span className="text-white ml-2">
                  {new Date(job.submission_end_date).toLocaleDateString(
                    "en-GB",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    },
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
