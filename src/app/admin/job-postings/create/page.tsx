"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { JobPostingForm } from "../JobPostingForm";
import "../styles.css";
import { JobFormData } from "../types";

interface Company {
  id: number;
  name: string;
  logo: string | null;
}

const CreateJobPostingPage = () => {
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/companies");
        const data = await response.json();
        if (data.success) {
          setCompanies(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch companies", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const companyId = parseInt(e.target.value, 10);
    const company = companies.find((c) => c.id === companyId) || null;
    setSelectedCompany(company);
  };

  const handleCreateJob = async (formData: JobFormData) => {
    try {
      const dataToSave = {
        ...formData,
        skills: formData.skills?.map(skill => skill.id),
      };
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSave),
      });

      if (response.ok) {
        router.push("/admin/job-postings");
      } else {
        console.error("Failed to create job");
      }
    } catch (error) {
      console.error("Failed to create job", error);
    }
  };

  return (
    <div style={{ background: "#101018", minHeight: "100vh" }}>
      <JobPostingForm
        title="Create New Job Post"
        companies={companies}
        onSave={handleCreateJob}
        onCancel={() => router.push("/admin/job-postings")}
        selectedCompany={selectedCompany}
        onCompanyChange={handleCompanyChange}
        jobsForCompany={[]}
        onJobSelectionChange={() => {}}
        isLoadingCompanies={isLoading}
      />
    </div>
  );
};

export default CreateJobPostingPage;