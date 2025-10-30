"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Company } from "@prisma/client";
import { JobPostingForm } from "../JobPostingForm";
import { JobFormData, Job } from "../types";
import "../styles.css";

export default function CreateJobPostingPage() {
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [jobsForCompany, setJobsForCompany] = useState<Job[]>([]);
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(true);

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const response = await fetch("/api/companies");
        if (response.ok) {
          const data = await response.json();
          setCompanies(data.data || data); // Handle both {success: true, data: [...]} and direct array formats
        }
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      } finally {
        setIsLoadingCompanies(false);
      }
    }

    fetchCompanies();
  }, []);

  const handleCompanyChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const companyId = e.target.value;
    const company =
      companies.find((c) => c.id.toString() === companyId) || null;
    setSelectedCompany(company);

    if (company) {
      try {
        const response = await fetch(`/api/jobs?company_id=${company.id}`);
        if (response.ok) {
          const jobs = await response.json();
          setJobsForCompany(jobs);
        }
      } catch (error) {
        console.error("Failed to fetch jobs for company:", error);
      }
    } else {
      setJobsForCompany([]);
    }
  };

  const handleSave = async (formData: JobFormData) => {
    const { createJobPosting } = await import("@/app/actions/jobs");
    const result = await createJobPosting(formData);

    if (result.success) {
      router.push("/dashboard/company-owner");
    } else {
      console.error("Failed to create job posting:", result.error);
      alert(result.error || "Failed to create job posting");
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-[#121217] text-white">
      <JobPostingForm
        title="Create New Job Posting"
        companies={companies}
        job={null}
        onSave={handleSave}
        onCancel={handleCancel}
        selectedCompany={selectedCompany}
        onCompanyChange={handleCompanyChange}
        jobsForCompany={jobsForCompany}
        onJobSelectionChange={() => {}}
        isLoadingCompanies={isLoadingCompanies}
      />
    </div>
  );
}
