/* eslint-disable prettier/prettier */
"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import CompanyMonthlySuccessRateChart from "@/app/Component/company/CompanyMonthlySuccessRateChart";
import Image from "next/image";

// --- TYPE DEFINITIONS ---
interface Job {
  id: number;
  position_name: string;
  description: string;
  capacity: number;
}

interface CompanyMonthlyStats {
  month: number;
  year: number;
  successRate: number;
}

interface Company {
  id: number;
  name: string;
  logo: string | null;
  address: string;
  phone: string;
  description: string;
  jobs: Job[];
  monthlyStats: CompanyMonthlyStats[];
  companyCertificateUrl?: string | null;
}

// --- HELPERS ---
const sanitizeLogoUrl = (url: string | null | undefined): string => {
  if (!url) return "/next.svg";
  if (url.includes("google.com/imgres")) {
    try {
      const urlObj = new URL(url);
      const imgurl = urlObj.searchParams.get("imgurl");
      if (imgurl) return imgurl;
    } catch (e) {
      console.error("Could not parse logo URL", e);
      return "/next.svg";
    }
  }
  return url;
};

// --- SVG ICONS ---
const MapPinIcon = () => (
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
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const PhoneIcon = () => (
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
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
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

// --- MAIN COMPONENT ---
export default function CompanyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      }
    };

    fetchCompanyDetails();
  }, [id]);

  const latestSuccessRate = useMemo(() => {
    if (!company || !company.monthlyStats || company.monthlyStats.length === 0)
      return 0;
    const sortedStats = [...company.monthlyStats].sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return b.month - a.month;
    });
    return sortedStats[0].successRate * 100;
  }, [company]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#101018] text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#101018] text-white flex items-center justify-center">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!company) {
    return notFound();
  }

  return (
    <>
      <style jsx global>{`
        .glass-pane {
          background-color: rgba(26, 26, 46, 0.5);
          border: 1px solid rgba(159, 84, 255, 0.2);
          backdrop-filter: blur(10px);
          border-radius: 10px;
          box-shadow: 0 0 20px rgba(159, 84, 255, 0.1);
        }
      `}</style>
      <div
        className="bg-[#101018] text-white p-4 md:p-8"
        style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif', paddingTop: '120px' }}
      >
        <main className="max-w-7xl mx-auto">
          {/* Company Banner */}
          <div className="glass-pane flex items-center justify-between p-6 mb-8">
            <div className="flex items-center gap-5">
              <div className="relative w-20 h-20 flex-shrink-0">
                <Image
                  src={sanitizeLogoUrl(company.logo)}
                  alt={`${company.name} logo`}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-full"
                />
              </div>
              <div>
                <h1 className="text-[2rem] font-bold text-[#E0E0E0] leading-none">
                  {company.name}
                </h1>
                <p className="text-white/60 mt-1">
                  IT Infrastructure Innovators
                </p>
              </div>
            </div>
            <button className="bg-[#9F54FF] text-white font-semibold py-2.5 px-6 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(159,84,255,0.8)]">
              Follow
            </button>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              <div className="glass-pane p-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Description
                </h2>
                <p
                  style={{ color: "rgba(224, 224, 224, 0.7)" }}
                  className="leading-relaxed"
                >
                  {company.description}
                </p>
              </div>

              <div className="glass-pane p-8">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Available Positions
                </h2>
                <div className="flex flex-col">
                  {company.jobs && company.jobs.length > 0 ? (
                    company.jobs.map((job, index) => (
                      <div
                        key={job.id}
                        className={`flex flex-col md:flex-row items-start md:items-center justify-between py-4 ${index < company.jobs.length - 1 ? "border-b border-[rgba(159,84,255,0.2)]" : ""}`}
                      >
                        <div className="mb-4 md:mb-0">
                          <h3 className="font-bold text-lg text-white">
                            {job.position_name}
                          </h3>
                          <p className="text-sm text-white/60">
                            Jakarta, Indonesia • {job.capacity} Openings
                          </p>
                        </div>
                        <Link href={`/job-posting/${job.id}`} passHref>
                          <button className="px-5 py-2 w-full md:w-auto rounded-lg border-2 border-[#9F54FF] text-[#9F54FF] font-semibold transition-all duration-300 hover:bg-[#9F54FF] hover:text-white flex-shrink-0">
                            View Details
                          </button>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-white/60 py-8">
                      No available positions at the moment.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-1 flex flex-col gap-8">
              <div className="glass-pane p-6">
                <h2 className="text-xl font-bold text-white mb-4">
                  Company Details
                </h2>
                <div className="flex flex-col gap-5">
                  <div className="flex items-start gap-4">
                    <MapPinIcon />
                    <span className="text-white/80">{company.address}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <PhoneIcon />
                    <span className="text-white/80">{company.phone}</span>
                  </div>
                  {company.companyCertificateUrl && (
                    <div className="flex items-center gap-4">
                      <CertificateIcon />
                      <a
                        href={company.companyCertificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:underline"
                      >
                        View Company Certificate
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="glass-pane p-6">
                <h2 className="text-xl font-bold text-white mb-2">
                  Company Monthly Stats
                </h2>
                <p className="text-sm text-white/60 mb-4">
                  Historical Success Rate
                </p>
                <p className="text-6xl font-bold text-white mb-1">
                  {latestSuccessRate.toFixed(0)}%
                </p>
                <p className="text-sm text-white/60 mb-6">Last 12 Months</p>
                <div className="h-48">
                  <CompanyMonthlySuccessRateChart
                    data={company.monthlyStats || []}
                    lineColor="#9F54FF"
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
