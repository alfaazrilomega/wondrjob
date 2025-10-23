"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { notFound, usePathname, useParams } from "next/navigation";
import Image from "next/image";

// --- TYPE DEFINITIONS ---
interface Company {
  id: number;
  name: string;
  logo: string | null;
  address: string;
}

interface Job {
  id: number;
  position_name: string;
  description: string;
  capacity: number;
  company: Company;
  job_type: string;
  salary: string;
  required_skills: string[];
}

// --- PUBLIC HEADER ---
const PublicHeader = () => {
  const pathname = usePathname();
  const glowStyle = { textShadow: "0 0 8px rgba(159, 84, 255, 0.6)" };

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        backgroundColor: "rgba(16, 16, 24, 0.5)",
        borderBottom: "1px solid rgba(159, 84, 255, 0.2)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        <Link href="/" passHref>
          <span
            className="cursor-pointer text-2xl font-bold text-[#E0E0E0]"
            style={glowStyle}
          >
            WondrJob
          </span>
        </Link>
        <nav className="flex items-center gap-8">
          <Link href="/" passHref>
            <span
              className={`cursor-pointer transition-colors hover:text-[#9F54FF] hover:[text-shadow:0_0_8px_rgba(159,84,255,0.6)] relative ${
                pathname === "/"
                  ? "text-[#9F54FF] [text-shadow:0_0_8px_rgba(159,84,255,0.6)]"
                  : "text-white/60"
              }`}
            >
              Home
              {pathname === "/" && (
                <span
                  className="absolute -bottom-2 left-0 w-full h-0.5 bg-[#9F54FF]"
                  style={{ boxShadow: "0 0 4px #9F54FF" }}
                ></span>
              )}
            </span>
          </Link>
          <Link href="/company" passHref>
            <span
              className={`cursor-pointer transition-colors hover:text-[#9F54FF] hover:[text-shadow:0_0_8px_rgba(159,84,255,0.6)] relative ${
                pathname.startsWith("/company")
                  ? "text-[#9F54FF] [text-shadow:0_0_8px_rgba(159,84,255,0.6)]"
                  : "text-white/60"
              }`}
            >
              Companies
              {pathname.startsWith("/company") && (
                <span
                  className="absolute -bottom-2 left-0 w-full h-0.5 bg-[#9F54FF]"
                  style={{ boxShadow: "0 0 4px #9F54FF" }}
                ></span>
              )}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

// --- HELPERS ---
const sanitizeLogoUrl = (url: string | null | undefined): string => {
  if (!url) return "/images/default-logo.svg";
  if (url.includes("google.com/imgres")) {
    try {
      const urlObj = new URL(url);
      const imgurl = urlObj.searchParams.get("imgurl");
      if (imgurl) return imgurl;
    } catch (e) {
      console.error("Could not parse logo URL", e);
      return "/images/default-logo.svg";
    }
  }
  return url;
};

// --- MAIN COMPONENT ---
export default function JobDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/jobs?id=${id}`);
        const data = await response.json();

        if (response.ok && data.success) {
          setJob(data.data);
        } else {
          setError(data.error || "Failed to fetch job details.");
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

    fetchJobDetails();
  }, [id]);

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

  if (!job) {
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
        className="min-h-screen bg-[#101018] text-white p-4 md:p-8"
        style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
      >
        <PublicHeader />

        <main className="max-w-4xl mx-auto">
          {/* Job Header */}
          <div className="glass-pane flex flex-col md:flex-row items-start md:items-center justify-between p-6 mb-8">
            <div className="flex items-center gap-5">
              <div className="relative w-20 h-20 flex-shrink-0">
                <Image
                  src={sanitizeLogoUrl(job.company.logo)}
                  alt={`${job.company.name} logo`}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-full"
                />
              </div>
              <div>
                <h1 className="text-[2rem] font-bold text-[#E0E0E0] leading-none">
                  {job.position_name}
                </h1>
                <Link href={`/company/${job.company.id}`} passHref>
                  <span className="text-white/60 mt-1 cursor-pointer hover:text-[#9F54FF]">
                    {job.company.name} - {job.company.address}
                  </span>
                </Link>
              </div>
            </div>
            <Link href={`/apply/${job.id}`} passHref>
              <button className="bg-[#9F54FF] text-white font-semibold py-2.5 px-6 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(159,84,255,0.8)] mt-4 md:mt-0">
                Apply Now
              </button>
            </Link>
          </div>

          {/* Main Content */}
          <div className="glass-pane p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Job Description
            </h2>
            <p
              style={{ color: "rgba(224, 224, 224, 0.7)" }}
              className="leading-relaxed whitespace-pre-line"
            >
              {job.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Job Type</h3>
                <p className="text-white/70">{job.job_type}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Salary</h3>
                <p className="text-white/70">{job.salary}</p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-white mb-4">
                Required Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {job.required_skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-[rgba(159,84,255,0.2)] text-[#E0E0E0] text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
