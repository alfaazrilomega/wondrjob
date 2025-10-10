"use client";

import React, { useState, useEffect, useTransition } from "react";
import Image from "next/image";
import { Company } from "@prisma/client";

interface JobPostingFormProps {
  title: string;
  companies: Company[];
  job?: any;
  onSave: (formData: any) => void;
  onCancel: () => void;
  selectedCompany: Company | null;
  onCompanyChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  jobsForCompany: any[];
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
  const [formData, setFormData] = useState({
    company_id: '',
    position_name: '',
    capacity: 1,
    description: '',
    submission_start_date: '',
    submission_end_date: '',
  });

  useEffect(() => {
    if (job) {
      setFormData({
        company_id: job.company_id || '',
        position_name: job.position_name || '',
        capacity: job.capacity || 1,
        description: job.description || '',
        submission_start_date: job.submission_start_date ? new Date(job.submission_start_date).toISOString().split('T')[0] : '',
        submission_end_date: job.submission_end_date ? new Date(job.submission_end_date).toISOString().split('T')[0] : '',
      });
    } else {
        setFormData({
            company_id: selectedCompany?.id.toString() || '',
            position_name: '',
            capacity: 1,
            description: '',
            submission_start_date: '',
            submission_end_date: '',
        });
    }
  }, [job, selectedCompany]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      onSave(formData);
    });
  };

  const areFieldsDisabled = !selectedCompany || (jobsForCompany.length > 1 && !job);

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
                value={selectedCompany?.id || ''}
                onChange={onCompanyChange}
                required
                disabled={isLoadingCompanies}
              >
                <option value="" disabled>
                  {isLoadingCompanies ? 'Loading companies...' : '-- Choose a company --'}
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
                  value={job?.id || ''}
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
                <button type="button" onClick={onCancel} className="btn btn-secondary">Cancel</button>
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
                <p>Hiring for <strong>{formData.capacity}</strong> positions</p>
                <p>Apply Before: <strong>{formData.submission_end_date ? new Date(formData.submission_end_date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }) : "—"}</strong></p>
            </div>
            <div className="preview-description">
              <h5>Job Description</h5>
              <p>{formData.description || "Job description will appear here..."}</p>
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