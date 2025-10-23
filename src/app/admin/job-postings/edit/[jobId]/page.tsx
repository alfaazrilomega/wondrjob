"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { JobPostingForm } from "../../JobPostingForm";
import "../../styles.css";
import { Job, JobFormData } from "../../types";
import { Company } from "@prisma/client";

const EditJobPostingPage = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [jobsForCompany, setJobsForCompany] = useState<Job[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const router = useRouter();
  const { jobId: initialJobId } = params;

  useEffect(() => {
    if (initialJobId) {
      const fetchInitialData = async () => {
        setLoading(true);
        try {
          const [jobRes, companiesRes] = await Promise.all([
            fetch(`/api/jobs/${initialJobId}`),
            fetch("/api/companies"),
          ]);

          const jobData = await jobRes.json();
          const companiesData: { success: boolean; data: Company[] } =
            await companiesRes.json();

          if (companiesData.success) {
            setCompanies(companiesData.data);
          }

          if (jobData.success) {
            setSelectedJob(jobData.data);
            if (companiesData.success) {
              const company =
                companiesData.data.find(
                  (c) => c.id === jobData.data.company_id,
                ) || null;
              setSelectedCompany(company);
            }
          }
        } catch (error) {
          console.error("Failed to fetch initial data", error);
        }
        setLoading(false);
      };
      fetchInitialData();
    }
  }, [initialJobId]);

  useEffect(() => {
    if (selectedCompany) {
      const fetchJobsForCompany = async () => {
        try {
          const res = await fetch(`/api/jobs?companyId=${selectedCompany.id}`);
          const data = await res.json();
          if (data.success) {
            setJobsForCompany(data.data);
            if (data.data.length === 1) {
              setSelectedJob(data.data[0]);
            }
          }
        } catch (error) {
          console.error("Failed to fetch jobs for company", error);
        }
      };
      fetchJobsForCompany();
    }
  }, [selectedCompany]);

  const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const companyId = parseInt(e.target.value, 10);
    const company = companies.find((c) => c.id === companyId) || null;
    setSelectedCompany(company);
    setJobsForCompany([]);
    setSelectedJob(null);
  };

  const handleJobSelectionChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const jobId = e.target.value;
    const job = jobsForCompany.find((j) => j.id === parseInt(jobId)) || null;
    setSelectedJob(job);
  };

  const handleUpdateJob = async (formData: JobFormData) => {
    if (!selectedJob) return;
    try {
      const dataToSave = {
        ...formData,
        skills: formData.skills?.map((skill) => skill.id),
      };
      const response = await fetch(`/api/jobs/${selectedJob.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSave),
      });

      if (response.ok) {
        router.push("/admin/job-postings");
      } else {
        console.error("Failed to update job");
      }
    } catch (error) {
      console.error("Failed to update job", error);
    }
  };

  if (loading) {
    return <div style={{ color: "white", padding: "2rem" }}>Loading...</div>;
  }

  return (
    <div style={{ background: "#101018", minHeight: "100vh" }}>
      <JobPostingForm
        title="Edit Job Post"
        job={selectedJob}
        companies={companies}
        onSave={handleUpdateJob}
        onCancel={() => router.push("/admin/job-postings")}
        selectedCompany={selectedCompany}
        onCompanyChange={handleCompanyChange}
        jobsForCompany={jobsForCompany}
        onJobSelectionChange={handleJobSelectionChange}
      />
    </div>
  );
};

export default EditJobPostingPage;
