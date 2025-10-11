"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, notFound, useRouter } from "next/navigation";
import { JobType, WorkStyle, ApplicationStatus } from "@prisma/client";

// --- SVG ICONS ---
const BriefcaseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
);
const MoneyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
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
);
const BuildingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="3" y1="9" x2="21" y2="9"></line>
    <line x1="9" y1="21" x2="9" y2="9"></line>
  </svg>
);
const UsersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
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
);
const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);
const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
const CertificateIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#9F54FF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
      <polyline points="13 2 13 9 20 9"></polyline>
      <path d="M12 15l-2 2 2 2"></path>
      <path d="M16 15l2 2-2 2"></path>
    </svg>
  );

// --- TYPES ---
type Applicant = {
  apply_date: string;
  status: ApplicationStatus;
  society: {
    name: string;
  };
};

type Company = {
  name: string;
  logo: string | null;
  address: string;
  description: string;
  companyCertificateUrl?: string | null;
};

type JobData = {
  id: number;
  position_name: string;
  capacity: number;
  description: string;
  jobType: JobType | null;
  salaryMin: number | null;
  salaryMax: number | null;
  workStyle: WorkStyle | null;
  skills: string[];
  company: Company;
  applicants: Applicant[];
};

// --- HELPER FUNCTIONS ---
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

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const GlassCard = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(({ children, className = "" }, ref) => (
    <div
      ref={ref}
      className={`bg-gray-900/50 backdrop-blur-lg border border-purple-500/20 rounded-xl shadow-lg ${className}`}
    >
      {children}
    </div>
  ));
GlassCard.displayName = "GlassCard";


// --- MAIN COMPONENT ---
export default function JobPostingDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const applicantsCardRef = useRef<HTMLDivElement>(null);

  const [job, setJob] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    async function fetchJobData() {
      try {
        setLoading(true);
        const response = await fetch(`/api/jobs/${id}`);
        if (!response.ok) {
          const err = await response.json();
          throw new Error(
            err.error || `Failed to fetch data: ${response.statusText}`,
          );
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

  const handleViewApplicantsClick = () => {
    applicantsCardRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleEditClick = () => {
    router.push(`/admin/job-postings/edit/${id}`);
  };

  // --- RENDER STATES ---
  if (loading) {
    return <div className="p-8 text-white">Loading job details...</div>;
  }

  if (error) {
    return <div className="p-8 text-white">Error: {error}</div>;
  }

  if (!job) {
    return notFound();
  }

  // --- UI COMPONENTS ---
  const StatusBadge = ({ status }: { status: ApplicationStatus }) => {
    const baseStyle = "px-3 py-1 text-xs font-semibold rounded-full";
    const styles = {
      PENDING: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
      ACCEPTED: "bg-green-500/20 text-green-400 border border-green-500/30",
      REJECTED: "bg-red-500/20 text-red-400 border border-red-500/30",
    };
    return <span className={`${baseStyle} ${styles[status]}`}>{status}</span>;
  };

  return (
    <div className="p-8 text-gray-200 space-y-8">
      {/* Job Header Section */}
      <GlassCard className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-white mb-1">
              {job.position_name}
            </h1>
            <p className="text-lg text-gray-400">
              {job.company.name} &middot; {job.company.address}
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleViewApplicantsClick}
              className="px-5 py-2 rounded-lg border-2 border-purple-500 text-purple-400 font-semibold transition-all duration-300 hover:bg-purple-500 hover:text-white"
            >
              View Applicants
            </button>
            <button
              onClick={handleEditClick}
              className="px-5 py-2 rounded-lg bg-purple-600 text-white font-semibold shadow-[0_0_15px_rgba(159,84,255,0.5)] transition-all duration-300 hover:bg-purple-500"
            >
              Edit Post
            </button>
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Key Details Card */}
          <GlassCard className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center gap-2">
                <BriefcaseIcon />{" "}
                <span className="text-gray-400">Job Type</span>{" "}
                <span className="font-bold text-white">
                  {job.jobType?.replace("_", "-") || "N/A"}
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <MoneyIcon /> <span className="text-gray-400">Salary</span>{" "}
                <span className="font-bold text-white">
                  {formatSalary(job.salaryMin, job.salaryMax)}
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <BuildingIcon />{" "}
                <span className="text-gray-400">Work Style</span>{" "}
                <span className="font-bold text-white">
                  {job.workStyle || "N/A"}
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <UsersIcon /> <span className="text-gray-400">Capacity</span>{" "}
                <span className="font-bold text-white">
                  Hiring {job.capacity}
                </span>
              </div>
            </div>
          </GlassCard>

          {/* Required Skills Card */}
          {job.skills && job.skills.length > 0 && (
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4">
                Required Skills
              </h2>
              <div className="flex flex-wrap gap-3">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-1.5 text-sm bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </GlassCard>
          )}

          {/* Full Job Description Card */}
          <GlassCard className="p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Full Job Description
            </h2>
            <div
              className="prose prose-invert max-w-none text-gray-300"
              dangerouslySetInnerHTML={{ __html: job.description }}
            />
          </GlassCard>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* About the Company Card */}
          <GlassCard className="p-6">
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
                    <CertificateIcon />
                    View Company Certificate
                    </a>
                </div>
            )}
          </GlassCard>

          {/* Applicants Card */}
          <GlassCard className="p-6" ref={applicantsCardRef}>
            <h2 className="text-2xl font-bold text-white mb-4">
              Applicants ({job.applicants.length})
            </h2>
            <div className="space-y-4">
              {job.applicants.length > 0 ? (
                job.applicants.map((applicant, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-semibold text-white">
                        {applicant.society.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Applied on {formatDate(applicant.apply_date)}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      {applicant.status === "PENDING" && (
                        <div className="flex gap-2">
                          <button className="p-1.5 rounded-full bg-green-500/20 text-green-400 hover:bg-green-500/40">
                            <CheckIcon />
                          </button>
                          <button className="p-1.5 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/40">
                            <XIcon />
                          </button>
                        </div>
                      )}
                      <StatusBadge status={applicant.status} />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">
                  No applicants for this position yet.
                </p>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}