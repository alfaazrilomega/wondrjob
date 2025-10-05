"use client";

import React, {
  useState,
  useEffect,
  FormEvent,
  useRef,
  DragEvent,
} from "react";
import Image from "next/image";
import { useParams, useRouter, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

// --- TYPE DEFINITIONS ---
interface JobDetails {
  id: number;
  position_name: string;
  company: { name: string; logo?: string | null };
}

// --- MAIN PAGE COMPONENT ---
export default function ApplicationPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params.jobId as string;

  const [job, setJob] = useState<JobDetails | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    portfolioUrl: "",
    coverLetter: "",
    expectedSalary: "",
    earliestStartDate: "",
    workPermit: "",
    referral: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  const [coverLetterMode, setCoverLetterMode] = useState<"text" | "file">(
    "text",
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!jobId) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const jobResponse = await fetch(`/api/jobs/${jobId}`);
        const jobData = await jobResponse.json();
        if (!jobResponse.ok)
          throw new Error(jobData.error || "Failed to fetch job details");
        setJob(jobData.data);

        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          const name = user.user_metadata.name || "";
          const [firstName, ...lastNameParts] = name.split(" ");
          setFormData((prev) => ({
            ...prev,
            firstName: firstName || "",
            lastName: lastNameParts.join(" ") || "",
            email: user.email || "",
            phone: user.user_metadata.phone || "",
          }));
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [jobId]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    if (!resumeFile) {
      setFormError("Resume/CV is required.");
      setIsSubmitting(false);
      return;
    }
    if (coverLetterMode === "text" && !formData.coverLetter) {
      setFormError("Cover letter text is required.");
      setIsSubmitting(false);
      return;
    }
    if (coverLetterMode === "file" && !coverLetterFile) {
      setFormError("Cover letter file is required.");
      setIsSubmitting(false);
      return;
    }

    const body = new FormData();
    body.append("jobId", jobId);
    body.append("resume", resumeFile);

    // Append all text-based form data
    Object.entries(formData).forEach(([key, value]) => {
      // Don't append the text cover letter if we are in file mode
      if (key === "coverLetter" && coverLetterMode === "file") return;
      body.append(key, value);
    });

    // Append the cover letter file if in file mode
    if (coverLetterMode === "file" && coverLetterFile) {
      body.append("coverLetterFile", coverLetterFile);
    }

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        body,
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Failed to submit application.");
      alert("Application submitted successfully!");
      router.push(`/`);
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#0E0E10] text-white flex items-center justify-center">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen bg-[#0E0E10] text-white flex items-center justify-center">
        Error: {error}
      </div>
    );
  if (!job) return notFound();

  return (
    <div style={{ fontFamily: "Mona Sans, sans-serif" }}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            body { background-color: #0E0E10; color: #D9ECFF; }
            .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
            select option { background-color: #0E0E10; color: #D9ECFF; }
            input[type="date"] { color-scheme: dark; }
        `,
        }}
      />

      <main className="flex-grow pt-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-8">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-6 mb-8">
                {job.company.logo ? (
                  <Image
                    src={job.company.logo}
                    alt={`${job.company.name} logo`}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-xl object-cover"
                    style={{ objectFit: "cover" }}
                    priority
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-800 border border-gray-700 rounded-xl flex items-center justify-center">
                    <Image
                      src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23818cf8'%3e%3cpath fill-rule='evenodd' d='M4.5 2.25a.75.75 0 000 1.5v16.5a.75.75 0 00.75.75h13.5a.75.75 0 00.75-.75V3.75a.75.75 0 000-1.5h-15a.75.75 0 00-.75.75zM15 6.75a.75.75 0 00-.75.75v.75a.75.75 0 00.75.75h.75a.75.75 0 00.75-.75v-.75a.75.75 0 00-.75-.75h-.75zM15 11.25a.75.75 0 00-.75.75v.75a.75.75 0 00.75.75h.75a.75.75 0 00.75-.75v-.75a.75.75 0 00-.75-.75h-.75zM15 15.75a.75.75 0 00-.75.75v.75a.75.75 0 00.75.75h.75a.75.75 0 00.75-.75v-.75a.75.75 0 00-.75-.75h-.75zM8.25 6.75a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75V6.75zM8.25 11.25a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75A.75.75 0 018.25 12v-.75zM8.25 15.75a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75V15.75z' clip-rule='evenodd' /%3e%3c/svg%3e"
                      alt="Company Logo Placeholder"
                      width={36}
                      height={36}
                    />
                  </div>
                )}
                <div className="flex-grow">
                  <h1 className="text-3xl font-bold text-white">
                    Apply for {job.position_name} at {job.company.name}
                  </h1>
                  <p className="text-gray-400 mt-2">
                    Join our mission to revolutionize the tech industry.
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-800 pt-8">
                <form onSubmit={handleSubmit} className="space-y-10">
                  {/* Applicant Info */}
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-6">
                      Applicant Information
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                      <div className="flex flex-col gap-2">
                        <label
                          className="block text-sm font-medium text-gray-400"
                          htmlFor="firstName"
                        >
                          First Name
                        </label>
                        <input
                          onChange={handleInputChange}
                          value={formData.firstName}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                          id="firstName"
                          name="firstName"
                          placeholder="e.g., Jane"
                          required
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label
                          className="block text-sm font-medium text-gray-400"
                          htmlFor="lastName"
                        >
                          Last Name
                        </label>
                        <input
                          onChange={handleInputChange}
                          value={formData.lastName}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                          id="lastName"
                          name="lastName"
                          placeholder="e.g., Doe"
                          required
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label
                          className="block text-sm font-medium text-gray-400"
                          htmlFor="email"
                        >
                          Email Address
                        </label>
                        <input
                          onChange={handleInputChange}
                          value={formData.email}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                          id="email"
                          name="email"
                          placeholder="e.g., jane.doe@example.com"
                          required
                          type="email"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label
                          className="block text-sm font-medium text-gray-400"
                          htmlFor="phone"
                        >
                          Phone Number
                        </label>
                        <input
                          onChange={handleInputChange}
                          value={formData.phone}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                          id="phone"
                          name="phone"
                          placeholder="e.g., +1 (555) 123-4567"
                          type="tel"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Resume & Portfolio */}
                  <div className="space-y-8 border-t border-gray-800 pt-8 mt-8">
                    <h2 className="text-xl font-semibold text-white">
                      Resume & Portfolio
                    </h2>
                    <FileUploader
                      label="Upload your Resume/CV"
                      onFileChange={setResumeFile}
                    />
                    <div className="flex flex-col gap-2">
                      <label
                        className="block text-sm font-medium text-gray-400"
                        htmlFor="portfolio-url"
                      >
                        Portfolio URL (Optional)
                      </label>
                      <input
                        onChange={handleInputChange}
                        value={formData.portfolioUrl}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                        id="portfolio-url"
                        name="portfolioUrl"
                        placeholder="https://yourportfolio.com"
                        type="url"
                      />
                    </div>
                  </div>

                  {/* Cover Letter */}
                  <div className="space-y-4 border-t border-gray-800 pt-8">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold text-white">
                        Cover Letter
                      </h2>
                      <div className="flex items-center gap-2 p-1 bg-gray-800 rounded-lg">
                        <button
                          type="button"
                          onClick={() => setCoverLetterMode("text")}
                          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                            coverLetterMode === "text"
                              ? "bg-indigo-600 text-white"
                              : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                          }`}
                        >
                          Write Text
                        </button>
                        <button
                          type="button"
                          onClick={() => setCoverLetterMode("file")}
                          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                            coverLetterMode === "file"
                              ? "bg-indigo-600 text-white"
                              : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                          }`}
                        >
                          Upload File
                        </button>
                      </div>
                    </div>
                    {coverLetterMode === "text" ? (
                      <textarea
                        onChange={handleInputChange}
                        value={formData.coverLetter}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                        id="coverLetter"
                        name="coverLetter"
                        placeholder="Tell us why you are the perfect candidate..."
                        rows={8}
                      ></textarea>
                    ) : (
                      <FileUploader
                        label="Upload your Cover Letter"
                        onFileChange={setCoverLetterFile}
                      />
                    )}
                  </div>

                  {/* Additional Info */}
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-6 pt-8 border-t border-gray-800">
                      Additional Information
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                      <div className="flex flex-col gap-2">
                        <label
                          className="block text-sm font-medium text-gray-400"
                          htmlFor="expectedSalary"
                        >
                          Expected Salary (USD)
                        </label>
                        <input
                          onChange={handleInputChange}
                          value={formData.expectedSalary}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                          id="expectedSalary"
                          min="0"
                          name="expectedSalary"
                          placeholder="e.g., 135000"
                          type="number"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label
                          className="block text-sm font-medium text-gray-400"
                          htmlFor="earliestStartDate"
                        >
                          Earliest Start Date
                        </label>
                        <input
                          onChange={handleInputChange}
                          value={formData.earliestStartDate}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                          id="earliestStartDate"
                          name="earliestStartDate"
                          type="date"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label
                          className="block text-sm font-medium text-gray-400"
                          htmlFor="workPermit"
                        >
                          Do you have a valid work permit?
                        </label>
                        <select
                          onChange={handleInputChange}
                          value={formData.workPermit}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                          id="workPermit"
                          name="workPermit"
                        >
                          <option value="">Select an option</option>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label
                          className="block text-sm font-medium text-gray-400"
                          htmlFor="referral"
                        >
                          Referral
                        </label>
                        <input
                          onChange={handleInputChange}
                          value={formData.referral}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                          id="referral"
                          name="referral"
                          placeholder="e.g., John Smith"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submission */}
                  <div className="border-t border-gray-800 pt-8 flex justify-end items-center gap-4">
                    <button
                      onClick={() => router.back()}
                      className="px-6 py-3 rounded-lg text-sm font-semibold text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                      type="button"
                    >
                      Cancel
                    </button>
                    <button
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
                      type="submit"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                      <Image
                        src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='white'%3e%3cpath fill-rule='evenodd' d='M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z' clip-rule='evenodd' /%3e%3c/svg%3e"
                        alt="Arrow Forward"
                        width={20}
                        height={20}
                        className="ml-2"
                      />
                    </button>
                  </div>
                  {formError && (
                    <p className="text-red-500 text-sm mt-4 text-right">
                      {formError}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// --- GENERIC FILE UPLOADER COMPONENT ---
const FileUploader = ({
  label,
  onFileChange,
}: {
  label: string;
  onFileChange: (file: File | null) => void;
}) => {
  const [fileName, setFileName] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File | null) => {
    setFileName(file ? file.name : "");
    onFileChange(file);
    if (!file && inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="block text-sm font-medium text-gray-400">{label}</label>
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative block w-full border-2 border-dashed border-gray-700 rounded-lg justify-center items-center text-center cursor-pointer hover:border-indigo-500 transition-all duration-300 bg-gray-900/50 p-6 ${
          dragActive ? "border-indigo-500" : ""
        }`}
      >
        <input
          ref={inputRef}
          onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
          className="sr-only"
          type="file"
          accept=".pdf,.doc,.docx,.txt"
        />
        {!fileName ? (
          <div className="flex flex-col items-center justify-center space-y-2 text-gray-400">
            <Image
              src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234b5563' stroke-width='1.5'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z' /%3e%3c/svg%3e"
              alt="Upload Cloud"
              width={48}
              height={48}
            />
            <p>
              <span className="font-semibold text-indigo-400">
                Click to upload
              </span>{" "}
              or drag and drop
            </p>
            <p className="text-xs text-gray-500">
              PDF, DOC, DOCX, or TXT (Max. 5MB)
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 text-green-400">
            <span className="material-symbols-outlined text-5xl">
              check_circle
            </span>
            <p className="font-semibold">{fileName}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFileSelect(null);
              }}
              className="text-xs text-red-500 hover:underline"
              type="button"
            >
              Remove file
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
