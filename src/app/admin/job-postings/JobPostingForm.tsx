"use client";

import React, { useState, useEffect, useTransition } from "react";
import Image from "next/image";
import { Company, JobType, WorkStyle } from "@prisma/client";
import { Job, JobFormData, Skill } from "./types";
import SkillInput from "../../Component/SkillInput";

interface JobPostingFormProps {
  title: string;
  companies: Company[];
  job?: Job;
  onSave: (formData: JobFormData) => void;
  onCancel: () => void;
  selectedCompany: Company | null;
  onCompanyChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  jobsForCompany: Job[];
  onJobSelectionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isLoadingCompanies?: boolean;
}

export function JobPostingForm({
  title,
  companies,
  job,
  onSave,
  onCancel,
  selectedCompany,
  onCompanyChange,
  jobsForCompany,
  onJobSelectionChange,
  isLoadingCompanies,
}: JobPostingFormProps) {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState<JobFormData>({
    company_id: "",
    position_name: "",
    capacity: 1,
    description: "",
    submission_start_date: "",
    submission_end_date: "",
    jobType: undefined,
    salaryMin: undefined,
    salaryMax: undefined,
    workStyle: undefined,
    skills: [],
  });

  useEffect(() => {
    if (job) {
      setFormData({
        company_id: job.company_id.toString() || "",
        position_name: job.position_name || "",
        capacity: job.capacity || 1,
        description: job.description || "",
        submission_start_date: job.submission_start_date
          ? new Date(job.submission_start_date).toISOString().split("T")[0]
          : "",
        submission_end_date: job.submission_end_date
          ? new Date(job.submission_end_date).toISOString().split("T")[0]
          : "",
        jobType: job.jobType || undefined,
        salaryMin: job.salaryMin || undefined,
        salaryMax: job.salaryMax || undefined,
        workStyle: job.workStyle || undefined,
        skills: job.skills || [],
      });
    } else {
      setFormData({
        company_id: selectedCompany?.id.toString() || "",
        position_name: "",
        capacity: 1,
        description: "",
        submission_start_date: "",
        submission_end_date: "",
        jobType: undefined,
        salaryMin: undefined,
        salaryMax: undefined,
        workStyle: undefined,
        skills: [],
      });
    }
  }, [job, selectedCompany]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (newSkills: Skill[]) => {
    setFormData((prev) => ({ ...prev, skills: newSkills }));
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      onSave(formData);
    });
  };

  const areFieldsDisabled =
    !selectedCompany || (jobsForCompany.length > 1 && !job);

  return (
    <div className="golden-ratio-layout">
      <div className="form-column">
        <div className="glass-card form-container">
          <h2>{title}</h2>
          <form onSubmit={handlePublish}>
            <div className="form-group">
              <label htmlFor="company-select">Select Company</label>
              <select
                id="company-select"
                name="company_id"
                value={selectedCompany?.id || ""}
                onChange={onCompanyChange}
                required
                disabled={isLoadingCompanies}
              >
                <option value="" disabled>
                  {isLoadingCompanies
                    ? "Loading companies..."
                    : "-- Choose a company --"}
                </option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>

            {jobsForCompany.length > 1 && (
              <div className="form-group">
                <label htmlFor="job-select">Select Job Post to Edit</label>
                <select
                  id="job-select"
                  value={job?.id || ""}
                  onChange={onJobSelectionChange}
                  required
                >
                  <option value="" disabled>
                    -- Choose a job --
                  </option>
                  {jobsForCompany.map((j) => (
                    <option key={j.id} value={j.id}>
                      {j.position_name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="position-name">Position Name</label>
              <input
                id="position-name"
                name="position_name"
                type="text"
                value={formData.position_name}
                onChange={handleChange}
                placeholder="e.g., Senior Frontend Developer"
                required
                disabled={areFieldsDisabled}
              />
            </div>

            <div className="form-group">
              <label htmlFor="jobType">Job Type</label>
              <select
                id="jobType"
                name="jobType"
                value={formData.jobType || ""}
                onChange={handleChange}
                required
                disabled={areFieldsDisabled}
              >
                <option value="" disabled>
                  -- Select Job Type --
                </option>
                {Object.values(JobType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="workStyle">Work Style</label>
              <select
                id="workStyle"
                name="workStyle"
                value={formData.workStyle || ""}
                onChange={handleChange}
                required
                disabled={areFieldsDisabled}
              >
                <option value="" disabled>
                  -- Select Work Style --
                </option>
                {Object.values(WorkStyle).map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group salary-range">
              <label>Salary Range</label>
              <div className="salary-inputs">
                <input
                  name="salaryMin"
                  type="number"
                  value={formData.salaryMin || ""}
                  onChange={handleChange}
                  placeholder="Minimum"
                  disabled={areFieldsDisabled}
                />
                <span>-</span>
                <input
                  name="salaryMax"
                  type="number"
                  value={formData.salaryMax || ""}
                  onChange={handleChange}
                  placeholder="Maximum"
                  disabled={areFieldsDisabled}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="capacity">Capacity / Number of Openings</label>
              <input
                id="capacity"
                name="capacity"
                type="number"
                value={formData.capacity}
                onChange={handleChange}
                min="1"
                required
                disabled={areFieldsDisabled}
              />
            </div>

            <div className="form-group">
              <label htmlFor="skills">Required Skills</label>
              <SkillInput
                skills={formData.skills || []}
                setSkills={handleSkillsChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Job Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide a detailed job description..."
                rows={10}
                required
                disabled={areFieldsDisabled}
              />
            </div>

            <div className="date-fields">
              <div className="form-group">
                <label htmlFor="start-date">Submission Start Date</label>
                <input
                  id="start-date"
                  name="submission_start_date"
                  type="date"
                  value={formData.submission_start_date}
                  onChange={handleChange}
                  required
                  disabled={areFieldsDisabled}
                />
              </div>
              <div className="form-group">
                <label htmlFor="end-date">Submission End Date</label>
                <input
                  id="end-date"
                  name="submission_end_date"
                  type="date"
                  value={formData.submission_end_date}
                  onChange={handleChange}
                  required
                  disabled={areFieldsDisabled}
                />
              </div>
            </div>

            <div className="action-buttons">
              <button
                type="button"
                onClick={onCancel}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isPending || areFieldsDisabled}
              >
                {isPending ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="preview-column">
        <div className="glass-card live-preview-container">
          <h3>Live Preview</h3>
          <div className="preview-content">
            <div className="preview-header">
              {selectedCompany ? (
                <>
                  <Image
                    src={selectedCompany.logo || "/images/default-logo.svg"}
                    alt={`${selectedCompany.name} logo`}
                    width={50}
                    height={50}
                    className="preview-logo"
                  />
                  <span className="preview-company-name">
                    {selectedCompany.name}
                  </span>
                </>
              ) : (
                <div className="preview-placeholder">
                  Select a company to see a preview
                </div>
              )}
            </div>
            <h4 className="preview-position-title">
              {formData.position_name || "Position Title"}
            </h4>
            <div className="preview-details">
              <p>
                <strong>Job Type:</strong> {formData.jobType || "N/A"}
              </p>
              <p>
                <strong>Work Style:</strong> {formData.workStyle || "N/A"}
              </p>
              <p>
                <strong>Salary:</strong>{" "}
                {formData.salaryMin && formData.salaryMax
                  ? `$${formData.salaryMin} - $${formData.salaryMax}`
                  : "N/A"}
              </p>
              <p>
                Hiring for <strong>{formData.capacity}</strong> positions
              </p>
              <p>
                Apply Before:{" "}
                <strong>
                  {formData.submission_end_date
                    ? new Date(formData.submission_end_date).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "long", day: "numeric" },
                      )
                    : "—"}
                </strong>
              </p>
            </div>
            <div className="preview-skills">
              <h5>Required Skills</h5>
              <div className="skills-preview-tags">
                {formData.skills && formData.skills.length > 0 ? (
                  formData.skills.map((skill) => (
                    <span key={skill.id} className="skill-preview-tag">
                      {skill.name}
                    </span>
                  ))
                ) : (
                  <p>No skills specified.</p>
                )}
              </div>
            </div>
            <div className="preview-description">
              <h5>Job Description</h5>
              <p>
                {formData.description || "Job description will appear here..."}
              </p>
            </div>
            <button disabled className="preview-apply-button">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
