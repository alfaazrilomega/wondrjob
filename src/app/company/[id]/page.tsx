/* eslint-disable @next/next/no-img-element */

"use client";

import React, { useState, useEffect, use } from "react";
import { notFound } from "next/navigation";
import {
  MapPin,
  Phone,
  FileText,
  Briefcase,
  Link as LinkIcon,
  Users,
  Clock,
  Building,
  Home,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// --- TYPE DEFINITIONS ---
interface AvailablePosition {
  id: number;
  position_name: string;
  location: string;
  capacity: number;
  jobType?: string;
  workStyle?: string;
  salaryMin?: number;
  salaryMax?: number;
}

interface CompanyMonthlyStats {
  month: string;
  successRate: number;
}

interface HRD {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
}

interface Company {
  id: number;
  name: string;
  tagline: string;
  logo: string;
  address: string;
  phone: string;
  description: string;
  companyCertificateUrl: string;
  website?: string;
  followerCount?: number;
  availablePositions: AvailablePosition[];
  historicalSuccessRate: number;
  monthlyStats: CompanyMonthlyStats[];
  hrds?: HRD[];
}

// Helper function to format salary
const formatSalary = (min?: number, max?: number) => {
  if (!min || !max) return null;
  return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
};

// Helper to format large numbers
const formatFollowers = (num?: number) => {
  if (!num) return "0";
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

// Icon helper
const JobIcon = ({ type }: { type?: string }) => {
  switch (type) {
    case "FULL_TIME":
    case "CONTRACT":
    case "INTERNSHIP":
      return <Briefcase className="w-4 h-4 mr-1.5" />;
    case "PART_TIME":
      return <Clock className="w-4 h-4 mr-1.5" />;
    case "ON_SITE":
    case "HYBRID":
      return <Building className="w-4 h-4 mr-1.5" />;
    case "REMOTE":
      return <Home className="w-4 h-4 mr-1.5" />;
    default:
      return null;
  }
};

// --- MAIN COMPONENT ---
export default function CompanyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchCompanyDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/companies?id=${id}`);
        const data = await response.json();

        if (response.ok && data.success) {
          setCompany(data.data);
        } else {
          setError(data.error || "Failed to fetch company details.");
          if (response.status === 404) {
            notFound();
          }
        }
      } catch (err) {
        setError("An unexpected error occurred.");
        console.error(err);
      } finally {
        setLoading(false);
        setTimeout(() => setIsLoaded(true), 100);
      }
    };

    fetchCompanyDetails();
  }, [id]);

  if (loading) {
    return (
      <main className="bg-[#121217] min-h-screen text-white p-4 md:p-8 flex items-center justify-center">
        <p className="text-xl animate-pulse">Loading company data...</p>
      </main>
    );
  }

  if (!company) {
    return (
      <main className="bg-[#121217] min-h-screen text-white p-4 md:p-8 flex items-center justify-center">
        <h1 className="text-2xl font-bold">Company Not Found</h1>
      </main>
    );
  }

  return (
    <main
      className={`bg-[#121217] min-h-screen text-white p-4 md:p-8 pt-48 transition-all duration-700 ease-out ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-1/4"}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Banner Section */}
        <div className="bg-gradient-to-r from-purple-900/30 to-purple-800/10 border border-purple-500/30 rounded-xl p-8 mb-8 relative overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(159,84,255,0.15),_transparent_40%)]"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                width={96}
                height={96}
                className="w-24 h-24 rounded-lg bg-gray-800 border-2 border-purple-500/50"
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/100x100/1e1e2f/9f54ff?text=Logo")
                }
              />
              <div>
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-300">
                  {company.name}
                </h1>
                <p className="text-white/60 mt-1">{company.tagline}</p>
              </div>
            </div>
            {/* Follow Button with Follower Count */}
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300 shadow-lg shadow-purple-600/30 w-full md:w-auto flex items-center justify-center gap-2">
              Follow
              <span className="h-4 w-px bg-white/30"></span>
              <span className="font-normal text-purple-200">
                {formatFollowers(company.followerCount)}
              </span>
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Description Card */}
            <div className="bg-[#1C1C21] border border-purple-500/20 rounded-xl p-8 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(159,84,255,0.2)]">
              <h2 className="text-2xl font-bold text-white mb-4">
                Description
              </h2>
              <p className="text-white/70 text-base leading-relaxed whitespace-pre-line">
                {company.description}
              </p>
            </div>

            {/* Available Positions Card */}
            <div className="bg-[#1C1C21] border border-purple-500/20 rounded-xl p-8 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(159,84,255,0.2)]">
              <h2 className="text-2xl font-bold text-white mb-6">
                Available Positions
              </h2>
              <ul className="space-y-6">
                {company.availablePositions.map((job) => (
                  <li
                    key={job.id}
                    className="p-4 bg-gray-800/30 rounded-lg border border-purple-500/10"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {job.position_name}
                        </h3>
                        <p className="text-white/50 text-sm mt-1">
                          {job.location} • {job.capacity} Openings
                        </p>
                      </div>
                      <button className="border border-purple-500 text-purple-400 hover:bg-purple-500/10 text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-300 w-full sm:w-auto flex-shrink-0">
                        View Details
                      </button>
                    </div>
                    {/* Job Details Row */}
                    <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-x-4 gap-y-2 items-center text-sm text-white/60">
                      {job.jobType && (
                        <span className="flex items-center bg-purple-500/10 text-purple-300 px-2.5 py-0.5 rounded-full">
                          <JobIcon type={job.jobType} />
                          {job.jobType.replace("_", " ")}
                        </span>
                      )}
                      {job.workStyle && (
                        <span className="flex items-center bg-blue-500/10 text-blue-300 px-2.5 py-0.5 rounded-full">
                          <JobIcon type={job.workStyle} />
                          {job.workStyle.replace("_", " ")}
                        </span>
                      )}
                      {formatSalary(job.salaryMin, job.salaryMax) && (
                        <span className="text-green-400/80 font-medium">
                          {formatSalary(job.salaryMin, job.salaryMax)}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            {/* Company Details Card */}
            <div className="bg-[#1C1C21] border border-purple-500/20 rounded-xl p-6 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(159,84,255,0.2)]">
              <h2 className="text-xl font-bold text-white mb-4">
                Company Details
              </h2>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <span className="text-white/80">{company.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <span className="text-white/80">{company.phone}</span>
                </li>
                <li className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <a
                    href={company.companyCertificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-purple-400 transition-colors break-all"
                  >
                    View Company Certificate
                  </a>
                </li>
                {company.website && (
                  <li className="flex items-center gap-3">
                    <LinkIcon className="w-5 h-5 text-purple-400 flex-shrink-0" />
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/80 hover:text-purple-400 transition-colors break-all"
                    >
                      {company.website}
                    </a>
                  </li>
                )}
              </ul>
            </div>

            {/* HRD Team Card */}
            {company.hrds && company.hrds.length > 0 && (
              <div className="bg-[#1C1C21] border border-purple-500/20 rounded-xl p-6 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(159,84,255,0.2)]">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-400" />
                  HRD Team
                </h2>
                <ul className="space-y-3">
                  {company.hrds.map((hr) => (
                    <li key={hr.id} className="flex items-center gap-3">
                      <img
                        src={hr.user.avatar}
                        alt={hr.user.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full bg-gray-700"
                        onError={(e) =>
                          (e.currentTarget.src =
                            "https://placehold.co/40x40/777/FFF?text=HR")
                        }
                      />
                      <div>
                        <h3 className="text-white font-medium">
                          {hr.user.name}
                        </h3>
                        <p className="text-white/50 text-sm">HR Department</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Monthly Stats Card */}
            <div className="bg-[#1C1C21] border border-purple-500/20 rounded-xl p-6 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(159,84,255,0.2)]">
              <h2 className="text-xl font-bold text-white mb-1">
                Company Monthly Stats
              </h2>
              <p className="text-sm text-white/50 mb-2">
                Historical Success Rate
              </p>

              <div className="text-5xl font-extrabold text-purple-400 mb-2">
                {company.historicalSuccessRate}%
              </div>
              <p className="text-sm text-white/50 mb-4">Last 12 Months</p>

              <div className="w-full h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={company.monthlyStats}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid
                      vertical={false}
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.1)"
                    />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      fontSize={10}
                      stroke="#888888"
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      fontSize={10}
                      stroke="#888888"
                      domain={[0, "dataMax + 20"]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#333333",
                        borderColor: "#666666",
                        color: "#E0E0E0",
                      }}
                      itemStyle={{ color: "#E0E0E0" }}
                      formatter={(value: number) => [
                        `${value.toFixed(1)}%`,
                        "Success Rate",
                      ]}
                      labelFormatter={(label) => `Month: ${label}`}
                    />
                    <defs>
                      <linearGradient
                        id="colorSuccess"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#a78bfa"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#a78bfa"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="successRate"
                      stroke="#a78bfa"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorSuccess)"
                      dot={{
                        r: 4,
                        fill: "#a78bfa",
                        stroke: "#1C1C21",
                        strokeWidth: 2,
                      }}
                      activeDot={{
                        r: 6,
                        fill: "#a78bfa",
                        stroke: "#1C1C21",
                        strokeWidth: 2,
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
