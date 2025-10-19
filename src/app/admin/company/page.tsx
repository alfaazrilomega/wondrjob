"use client";

import React, { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

// --- TYPES ---
type Company = {
  id: number;
  name: string;
  logo: string | null;
  address: string;
  phone: string;
  description: string;
  companyCertificateUrl?: string | null;
  user?: { name: string };
  user_id?: string;
};

type User = {
  id: string;
  name: string;
  email: string;
};

// --- ICONS ---
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
const BuildingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-white/60"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="3" y1="9" x2="21" y2="9"></line>
    <line x1="9" y1="21" x2="9" y2="9"></line>
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

// --- MODAL & FORM COMPONENTS ---
type ModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ title, isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="glass-pane w-full max-w-lg p-6 border border-[#9F54FF]/30">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-3xl"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

type CompanyFormProps = {
  company: Company;
  onSave: (formData: Company, certificateFile?: File | null) => void;
  onCancel: () => void;
  unassignedUsers?: User[];
  isEdit?: boolean;
};

const CompanyForm = ({
  company,
  onSave,
  onCancel,
  unassignedUsers = [],
  isEdit = false,
}: CompanyFormProps) => {
  const [formData, setFormData] = useState<Company>({ ...company });
  const [certificateFile, setCertificateFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCertificateFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(formData, certificateFile);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {isEdit ? (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Assigned to User
          </label>
          <input
            type="text"
            value={company.user?.name || ""}
            disabled
            className="w-full p-2 bg-gray-800 border border-purple-500/30 rounded-lg text-gray-400 cursor-not-allowed"
          />
        </div>
      ) : (
        <select
          name="user_id"
          value={formData.user_id || ""}
          onChange={handleChange}
          required
          className="bg-transparent border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#9F54FF]"
        >
          <option value="" disabled>
            Assign to User
          </option>
          {unassignedUsers.map((user) => (
            <option key={user.id} value={user.id} className="bg-[#101018]">
              {user.name} ({user.email})
            </option>
          ))}
        </select>
      )}
      <input
        type="text"
        name="name"
        value={formData.name || ""}
        onChange={handleChange}
        placeholder="Company Name"
        required
        className="bg-transparent border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#9F54FF]"
      />
      <input
        type="text"
        name="logo"
        value={formData.logo || ""}
        onChange={handleChange}
        placeholder="Logo URL"
        className="bg-transparent border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#9F54FF]"
        pattern=".*\.(jpeg|jpg|gif|png|webp|svg)$"
        title="Please enter a valid image URL (e.g., .jpg, .png, .webp)."
      />
      <input
        type="text"
        name="address"
        value={formData.address || ""}
        onChange={handleChange}
        placeholder="Address"
        required
        className="bg-transparent border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#9F54FF]"
      />
      <input
        type="text"
        name="phone"
        value={formData.phone || ""}
        onChange={handleChange}
        placeholder="Phone"
        required
        className="bg-transparent border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#9F54FF]"
      />
      <textarea
        name="description"
        value={formData.description || ""}
        onChange={handleChange}
        placeholder="Description"
        required
        className="bg-transparent border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#9F54FF]"
        rows={4}
      ></textarea>
      <div>
        <label
          htmlFor="companyCertificateUrl"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Company Certificate (Optional)
        </label>
        <input
          type="file"
          name="companyCertificateUrl"
          id="companyCertificateUrl"
          onChange={handleFileChange}
          accept=".pdf,.png,.jpg,.jpeg"
          className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#9F54FF] file:text-white hover:file:bg-purple-600"
        />
        {formData.companyCertificateUrl && !certificateFile && (
          <div className="mt-2 text-sm text-gray-400">
            Current certificate:{" "}
            <a
              href={formData.companyCertificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:underline"
            >
              View Certificate
            </a>
          </div>
        )}
      </div>
      <div className="flex justify-end gap-4 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2 rounded-lg border-2 border-white/30 text-white/80 font-semibold transition-all duration-300 hover:bg-white/10"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-[#9F54FF] text-white font-semibold shadow-[0_0_15px_rgba(159,84,255,0.5)] transition-all duration-300 hover:bg-purple-600"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

const sanitizeLogoUrl = (url: string | null | undefined): string => {
  if (!url) return "/next.svg"; // Use a valid fallback image
  if (url.includes("google.com/imgres")) {
    try {
      const urlObj = new URL(url);
      const imgurl = urlObj.searchParams.get("imgurl");
      if (imgurl) {
        return imgurl;
      }
    } catch (e) {
      console.error("Could not parse logo URL", e);
      return "/next.svg"; // Fallback on parsing error
    }
  }
  return url;
};

// --- PAGE ---
export default function CompanyManagementPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState("");
  const [unassignedUsers, setUnassignedUsers] = useState<User[]>([]);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/companies");
        const data = await response.json();
        if (data.success) setCompanies(data.data);
      } catch (error) {
        console.error("Failed to fetch companies", error);
      }
      setLoading(false);
    };
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (isAddModalOpen) {
      const fetchUnassignedUsers = async () => {
        try {
          const response = await fetch("/api/users?unassigned=true");
          const data = await response.json();
          if (data.success) setUnassignedUsers(data.data);
        } catch (error) {
          console.error("Failed to fetch unassigned users", error);
        }
      };
      fetchUnassignedUsers();
    }
  }, [isAddModalOpen]);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  const handleAddCompany = async (
    formData: Company,
    certificateFile?: File | null,
  ) => {
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      alert("You are not authenticated. Please log in again.");
      return;
    }

    let certificateUrl = null;
    if (certificateFile) {
      const fileName = `${Date.now()}.${certificateFile.name.split(".").pop()}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("company-certificates")
        .upload(fileName, certificateFile, {
          contentType: certificateFile.type,
        });

      if (uploadError) {
        console.error("Supabase upload error:", uploadError);
        alert(`Failed to upload certificate: ${uploadError.message}`);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("company-certificates")
        .getPublicUrl(uploadData.path);
      certificateUrl = urlData.publicUrl;
    }

    let logoUrl = formData.logo;
    if (logoUrl && logoUrl.includes("google.com/imgres")) {
      try {
        const url = new URL(logoUrl);
        const imgurlParams = url.searchParams.get("imgurl");
        if (imgurlParams) {
          logoUrl = imgurlParams;
        }
      } catch (e) {
        console.error("Could not parse logo URL", e);
      }
    }
    const finalFormData = {
      ...formData,
      logo: logoUrl,
      companyCertificateUrl: certificateUrl,
    };

    const res = await fetch("/api/company/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalFormData),
    });
    if (res.ok) {
      const newCompany = await res.json();
      setCompanies((prev) => [newCompany.data, ...prev]);
      setIsAddModalOpen(false);
      showNotification("Company created successfully!");
    } else {
      showNotification("Failed to create company.");
    }
  };

  const handleEditCompany = async (
    formData: Company,
    certificateFile?: File | null,
  ) => {
    if (!selectedCompany) return;

    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      alert("You are not authenticated. Please log in again.");
      return;
    }

    let certificateUrl = formData.companyCertificateUrl;

    if (certificateFile) {
      const fileName = `${Date.now()}.${certificateFile.name.split(".").pop()}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("company-certificates")
        .upload(fileName, certificateFile, {
          contentType: certificateFile.type,
        });

      if (uploadError) {
        console.error("Supabase upload error:", uploadError);
        alert(`Failed to upload certificate: ${uploadError.message}`);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("company-certificates")
        .getPublicUrl(uploadData.path);
      certificateUrl = urlData.publicUrl;
    }

    let logoUrl = formData.logo;
    if (logoUrl && logoUrl.includes("google.com/imgres")) {
      try {
        const url = new URL(logoUrl);
        const imgurlParams = url.searchParams.get("imgurl");
        if (imgurlParams) {
          logoUrl = imgurlParams;
        }
      } catch (e) {
        console.error("Could not parse logo URL", e);
      }
    }
    const finalFormData = {
      ...formData,
      logo: logoUrl,
      companyCertificateUrl: certificateUrl,
    };

    const res = await fetch(`/api/company/${selectedCompany.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalFormData),
    });
    if (res.ok) {
      const updatedCompany = await res.json();
      setCompanies((prev) =>
        prev.map((c) =>
          c.id === updatedCompany.data.id ? updatedCompany.data : c,
        ),
      );
      setSelectedCompany(updatedCompany.data);
      setIsEditModalOpen(false);
      showNotification("Company updated successfully!");
    } else {
      showNotification("Failed to update company.");
    }
  };

  const handleDeleteCompany = async () => {
    if (!selectedCompany) return;
    const res = await fetch(`/api/company/${selectedCompany.id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setCompanies((prev) => prev.filter((c) => c.id !== selectedCompany.id));
      setSelectedCompany(null);
      setIsDeleteModalOpen(false);
      showNotification("Company deleted successfully!");
    } else {
      showNotification("Failed to delete company.");
    }
  };

  const filteredCompanies = companies.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
      {notification && (
        <div className="fixed top-5 right-5 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {notification}
        </div>
      )}

      <div
        className="p-8 text-white min-h-screen"
        style={{ background: "#101018" }}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Company Management</h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-6 py-2 rounded-lg bg-[#9F54FF] text-white font-semibold shadow-[0_0_15px_rgba(159,84,255,0.5)] transition-all duration-300 hover:bg-purple-600 hover:shadow-[0_0_25px_rgba(159,84,255,0.8)]"
          >
            Add New Company
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="glass-pane h-full">
              <div className="p-6 border-b border-[rgba(159,84,255,0.2)] flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">All Companies</h2>
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#9F54FF]"
                />
              </div>
              <div
                className="overflow-y-auto"
                style={{ maxHeight: "calc(100vh - 250px)" }}
              >
                {loading ? (
                  <p className="text-center p-8">Loading companies...</p>
                ) : (
                  filteredCompanies.map((company) => (
                    <div
                      key={company.id}
                      onClick={() => setSelectedCompany(company)}
                      className={`flex items-center gap-4 p-4 cursor-pointer border-l-4 transition-all duration-300 ${selectedCompany?.id === company.id ? "border-[#9F54FF] bg-white/5" : "border-transparent hover:bg-white/5"}`}
                    >
                      <Image
                        src={sanitizeLogoUrl(company.logo)}
                        alt={`${company.name} logo`}
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-bold text-lg text-white">
                          {company.name}
                        </p>
                        <p className="text-sm text-white/60">
                          {company.address}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="glass-pane sticky top-28">
              {selectedCompany ? (
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {selectedCompany.name}
                  </h2>
                  <div className="flex flex-col gap-5 mb-6">
                    <div className="flex items-start gap-4">
                      <MapPinIcon />
                      <span className="text-white/80">
                        {selectedCompany.address}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <PhoneIcon />
                      <span className="text-white/80">
                        {selectedCompany.phone}
                      </span>
                    </div>
                    {selectedCompany.companyCertificateUrl && (
                      <div className="flex items-center gap-4">
                        <CertificateIcon />
                        <a
                          href={selectedCompany.companyCertificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-400 hover:underline"
                        >
                          View Company Certificate
                        </a>
                      </div>
                    )}
                    <p className="text-white/60 text-sm italic line-clamp-3">
                      {selectedCompany.description}
                    </p>
                  </div>
                  <div className="pt-6 border-t border-[rgba(159,84,255,0.2)]">
                    <h3 className="text-xl font-bold text-white mb-4">
                      Manage Company
                    </h3>
                    <div className="flex flex-col gap-3">
                      <Link
                        href={`/admin/company/${selectedCompany.id}`}
                        passHref
                      >
                        <button className="w-full px-6 py-2 rounded-lg bg-[#9F54FF] text-white font-semibold shadow-[0_0_15px_rgba(159,84,255,0.5)] transition-all duration-300 hover:bg-purple-600">
                          View Full Profile
                        </button>
                      </Link>
                      <button
                        onClick={() => setIsEditModalOpen(true)}
                        className="w-full px-5 py-2 rounded-lg border-2 border-[#9F54FF] text-[#9F54FF] font-semibold transition-all duration-300 hover:bg-[#9F54FF] hover:text-white"
                      >
                        Edit Company
                      </button>
                      <button
                        onClick={() => setIsDeleteModalOpen(true)}
                        className="w-full text-red-500 hover:text-red-400 transition-colors duration-300 py-2"
                      >
                        Delete Company
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-12 flex flex-col items-center justify-center text-center">
                  <BuildingIcon />
                  <p className="mt-4 text-white/60">
                    Select a company from the list to view details and manage
                    data.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isAddModalOpen && (
        <Modal
          title="Add New Company"
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        >
          <CompanyForm
            company={{
              id: 0,
              name: "",
              logo: "",
              address: "",
              phone: "",
              description: "",
            }}
            onSave={handleAddCompany}
            onCancel={() => setIsAddModalOpen(false)}
            unassignedUsers={unassignedUsers}
          />
        </Modal>
      )}
      {isEditModalOpen && selectedCompany && (
        <Modal
          title={`Edit ${selectedCompany.name}`}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        >
          <CompanyForm
            company={selectedCompany}
            onSave={handleEditCompany}
            onCancel={() => setIsEditModalOpen(false)}
            isEdit
          />
        </Modal>
      )}
      {isDeleteModalOpen && (
        <Modal
          title="Confirm Deletion"
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
        >
          <div className="text-white/80">
            <p>
              Are you sure you want to permanently delete{" "}
              <span className="font-bold">{selectedCompany?.name}</span>? This
              action cannot be undone.
            </p>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-5 py-2 rounded-lg border-2 border-white/30 text-white/80 font-semibold transition-all duration-300 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCompany}
                className="px-6 py-2 rounded-lg bg-red-600 text-white font-semibold shadow-lg transition-all duration-300 hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
