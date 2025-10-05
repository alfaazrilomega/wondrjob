"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link"; // Import Link
import { notFound } from "next/navigation";
import { use } from "react";
import CompanyMonthlySuccessRateChart from "@/app/Component/company/CompanyMonthlySuccessRateChart";

// --- TYPE DEFINITIONS (based on schema.prisma) ---
interface Job {
  id: number;
  position_name: string;
  description: string;
}

interface CompanyMonthlyStats {
  month: number;
  year: number;
  successRate: number;
}

interface Company {
  id: number;
  name: string;
  address: string;
  phone: string;
  description: string;
  jobs: Job[];
  monthlyStats: CompanyMonthlyStats[];
}

// --- UI COMPONENTS ---

const Header = ({ companyName }: { companyName: string }) => (
  <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#223649] px-10 py-3">
    <div className="flex items-center gap-8">
      <div className="flex items-center gap-4 text-white">
        <div className="size-4">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z"
              fill="currentColor"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.4485 13.8519C10.4749 13.9271 10.6203 14.246 11.379 14.7361C12.298 15.3298 13.7492 15.9145 15.6717 16.3735C18.0007 16.9296 20.8712 17.2655 24 17.2655C27.1288 17.2655 29.9993 16.9296 32.3283 16.3735C34.2508 15.9145 35.702 15.3298 36.621 14.7361C37.3796 14.246 37.5251 13.9271 37.5515 13.8519C37.5287 13.7876 37.4333 13.5973 37.0635 13.2931C36.5266 12.8516 35.6288 12.3647 34.343 11.9175C31.79 11.0295 28.1333 10.4437 24 10.4437C19.8667 10.4437 16.2099 11.0295 13.657 11.9175C12.3712 12.3647 11.4734 12.8516 10.9365 13.2931C10.5667 13.5973 10.4713 13.7876 10.4485 13.8519ZM37.5563 18.7877C36.3176 19.3925 34.8502 19.8839 33.2571 20.2642C30.5836 20.9025 27.3973 21.2655 24 21.2655C20.6027 21.2655 17.4164 20.9025 14.7429 20.2642C13.1498 19.8839 11.6824 19.3925 10.4436 18.7877V34.1275C10.4515 34.1545 10.5427 34.4867 11.379 35.027C12.298 35.6207 13.7492 36.2054 15.6717 36.6644C18.0007 37.2205 20.8712 37.5564 24 37.5564C27.1288 37.5564 29.9993 37.2205 32.3283 36.6644C34.2508 36.2054 35.702 35.6207 36.621 35.027C37.4573 34.4867 37.5485 34.1546 37.5563 34.1275V18.7877ZM41.5563 13.8546V34.1455C41.5563 36.1078 40.158 37.5042 38.7915 38.3869C37.3498 39.3182 35.4192 40.0389 33.2571 40.5551C30.5836 41.1934 27.3973 41.5564 24 41.5564C20.6027 41.5564 17.4164 41.1934 14.7429 40.5551C12.5808 40.0389 10.6502 39.3182 9.20848 38.3869C7.84205 37.5042 6.44365 36.1078 6.44365 34.1455L6.44365 13.8546C6.44365 12.2684 7.37223 11.0454 8.39581 10.2036C9.43325 9.3505 10.8137 8.67141 12.343 8.13948C15.4203 7.06909 19.5418 6.44366 24 6.44366C28.4582 6.44366 32.5797 7.06909 35.657 8.13948C37.1863 8.67141 38.5667 9.3505 39.6042 10.2036C40.6278 11.0454 41.5563 12.2684 41.5563 13.8546Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
          {companyName}
        </h2>
      </div>
      <div className="flex items-center gap-9">
        <Link
          className="text-white text-sm font-medium leading-normal"
          href="/company"
        >
          Home
        </Link>
        <Link className="text-white text-sm font-medium leading-normal" href="">
          Companies
        </Link>
      </div>
    </div>
  </header>
);

const JobListItem = ({ job, address }: { job: Job; address: string }) => (
  <div className="flex items-center gap-4 bg-[#101a23] px-4 min-h-[72px] py-2 justify-between">
    <div className="flex flex-col justify-center">
      <p className="text-white text-base font-medium leading-normal line-clamp-1">
        {job.position_name}
      </p>
      <p className="text-[#90adcb] text-sm font-normal leading-normal line-clamp-2">
        {address}
      </p>
    </div>
    <div className="shrink-0">
      <Link href={`/apply/${job.id}`} passHref>
        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#223649] text-white text-sm font-medium leading-normal w-fit">
          <span className="truncate">Apply Now</span>
        </button>
      </Link>
    </div>
  </div>
);

// MAIN
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
    if (!company || company.monthlyStats.length === 0) return 0;
    const sortedStats = [...company.monthlyStats].sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return b.month - a.month;
    });
    return sortedStats[0].successRate * 100;
  }, [company]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#101a23] text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#101a23] text-white flex items-center justify-center">
        Error: {error}
      </div>
    );
  }

  if (!company) {
    return notFound();
  }

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#101a23] group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <Header companyName={company.name} />
        <main className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
                {company.name}
              </p>
            </div>

            <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#314d68] py-5">
                <p className="text-[#90adcb] text-sm font-normal leading-normal">
                  Address
                </p>
                <p className="text-white text-sm font-normal leading-normal">
                  {company.address}
                </p>
              </div>
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#314d68] py-5">
                <p className="text-[#90adcb] text-sm font-normal leading-normal">
                  Phone
                </p>
                <p className="text-white text-sm font-normal leading-normal">
                  {company.phone}
                </p>
              </div>
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#314d68] py-5">
                <p className="text-[#90adcb] text-sm font-normal leading-normal">
                  Description
                </p>
                <p className="text-white text-sm font-normal leading-normal">
                  {company.description}
                </p>
              </div>
            </div>

            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Available Positions
            </h2>
            {company.jobs.length > 0 ? (
              company.jobs.map((job) => (
                <JobListItem key={job.id} job={job} address={company.address} />
              ))
            ) : (
              <p className="px-4 text-[#90adcb]">
                No available positions at the moment.
              </p>
            )}

            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Company Monthly Stats
            </h2>
            <div className="flex flex-wrap gap-4 px-4 py-6">
              <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-lg border border-[#314d68] p-6">
                <p className="text-white text-base font-medium leading-normal">
                  Historical Success Rate
                </p>
                <p className="text-white tracking-light text-[32px] font-bold leading-tight truncate">
                  {latestSuccessRate.toFixed(0)}%
                </p>
                <div className="flex gap-1">
                  <p className="text-[#90adcb] text-base font-normal leading-normal">
                    Last 12 Months
                  </p>
                </div>
                <div className="flex-1">
                  <CompanyMonthlySuccessRateChart data={company.monthlyStats} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
