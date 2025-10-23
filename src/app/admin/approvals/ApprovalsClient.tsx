"use client";

import React, { useState, useEffect } from "react";

// --- TYPES ---
type Application = {
  id: number;
  apply_date: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  society: {
    user: {
      name: string;
    };
  };
  availablePosition: {
    position_name: string;
    company: {
      name: string;
    };
  };
  resume: string;
  coverLetter: string;
  expectedSalary: number;
  earliestStartDate: string;
};

const Modal = ({
  title,
  isOpen,
  onClose,
  children,
}: {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="glass-pane w-full max-w-2xl p-6 border border-[#9F54FF]/30">
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

const ApprovalsClient = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/applications");
        const data = await response.json();
        if (data.success) {
          setApplications(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch applications", error);
      }
      setLoading(false);
    };
    fetchApplications();
  }, []);

  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const openViewModal = (app: Application) => {
    setSelectedApp(app);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setSelectedApp(null);
    setIsViewModalOpen(false);
  };

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [actionToConfirm, setActionToConfirm] = useState<
    "ACCEPT" | "REJECT" | null
  >(null);

  const openConfirmationModal = (
    app: Application,
    action: "ACCEPT" | "REJECT",
  ) => {
    setSelectedApp(app);
    setActionToConfirm(action);
    setIsConfirmModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setSelectedApp(null);
    setActionToConfirm(null);
    setIsConfirmModalOpen(false);
  };

  const handleUpdateStatus = async () => {
    if (!selectedApp || !actionToConfirm) return;

    const newStatus = actionToConfirm === "ACCEPT" ? "ACCEPTED" : "REJECTED";

    try {
      const response = await fetch(`/api/applications/${selectedApp.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setApplications((prevApps) =>
          prevApps.map((app) =>
            app.id === selectedApp.id ? { ...app, status: newStatus } : app,
          ),
        );
        closeConfirmationModal();
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const filteredApplications = applications.filter((app) => {
    if (filter === "ALL") return true;
    return app.status === filter;
  });

  const StatusBadge = ({
    status,
  }: {
    status: "PENDING" | "ACCEPTED" | "REJECTED";
  }) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-semibold";
    const statusClasses = {
      PENDING: "bg-yellow-500/20 text-yellow-400",
      ACCEPTED: "bg-green-500/20 text-green-400",
      REJECTED: "bg-red-500/20 text-red-400",
    };
    return (
      <span className={`${baseClasses} ${statusClasses[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div
      className="p-8 text-white min-h-screen"
      style={{ background: "#101018" }}
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Application Approvals</h1>
        <div className="flex gap-4 items-center">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-transparent border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#9F54FF]"
          >
            <option value="ALL" className="bg-[#101018]">
              All Statuses
            </option>
            <option value="PENDING" className="bg-[#101018]">
              Pending
            </option>
            <option value="ACCEPTED" className="bg-[#101018]">
              Accepted
            </option>
            <option value="REJECTED" className="bg-[#101018]">
              Rejected
            </option>
          </select>
        </div>
      </div>

      <div className="glass-pane p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[rgba(159,84,255,0.2)]">
                <th className="p-4">Applicant Name</th>
                <th className="p-4">Applied Position</th>
                <th className="p-4">Company</th>
                <th className="p-4">Apply Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center p-8">
                    Loading...
                  </td>
                </tr>
              ) : (
                filteredApplications.map((app) => (
                  <tr
                    key={app.id}
                    className="border-b border-[rgba(159,84,255,0.2)] hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4">{app.society.user.name}</td>
                    <td className="p-4">
                      {app.availablePosition.position_name}
                    </td>
                    <td className="p-4">
                      {app.availablePosition.company.name}
                    </td>
                    <td className="p-4">
                      {new Date(app.apply_date).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="p-4 flex gap-2 items-center">
                      {app.status === "PENDING" && (
                        <>
                          <button
                            onClick={() => openViewModal(app)}
                            className="px-3 py-1 rounded-lg border-2 border-[#9F54FF] text-[#9F54FF] text-sm font-semibold transition-all duration-300 hover:bg-[#9F54FF] hover:text-white"
                          >
                            View
                          </button>
                          <button
                            onClick={() => openConfirmationModal(app, "ACCEPT")}
                            className="px-3 py-1 rounded-lg bg-green-500/80 text-white text-sm font-semibold transition-all duration-300 hover:bg-green-600"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => openConfirmationModal(app, "REJECT")}
                            className="text-red-500 hover:text-red-400 transition-colors duration-300 text-sm"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedApp && (
        <Modal
          title={`Application for ${selectedApp.availablePosition.position_name}`}
          isOpen={isViewModalOpen}
          onClose={closeViewModal}
        >
          <div className="text-white/80 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-lg text-[#9F54FF] mb-2">
                Applicant Details
              </h3>
              <p>
                <strong>Name:</strong> {selectedApp.society.user.name}
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#9F54FF] mb-2">
                Position Details
              </h3>
              <p>
                <strong>Position:</strong>{" "}
                {selectedApp.availablePosition.position_name}
              </p>
              <p>
                <strong>Company:</strong>{" "}
                {selectedApp.availablePosition.company.name}
              </p>
            </div>
            <div className="md:col-span-2">
              <h3 className="font-bold text-lg text-[#9F54FF] mb-2">
                Application Info
              </h3>
              <p>
                <strong>Expected Salary:</strong>{" "}
                {selectedApp.expectedSalary
                  ? `${selectedApp.expectedSalary.toLocaleString()}`
                  : "N/A"}
              </p>
              <p>
                <strong>Earliest Start Date:</strong>{" "}
                {selectedApp.earliestStartDate
                  ? new Date(selectedApp.earliestStartDate).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
            <div className="md:col-span-2">
              <h3 className="font-bold text-lg text-[#9F54FF] mb-2">
                Documents
              </h3>
              <div className="flex gap-4">
                <a
                  href={selectedApp.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-[#9F54FF] text-white font-semibold transition-all duration-300 hover:bg-[#9F54FF] hover:text-white"
                >
                  View Resume
                </a>
                <a
                  href={selectedApp.coverLetter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg border-2 border-[#9F54FF] text-[#9F54FF] font-semibold transition-all duration-300 hover:bg-[#9F54FF] hover:text-white"
                >
                  View Cover Letter
                </a>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {isConfirmModalOpen && selectedApp && (
        <Modal
          title={`Confirm ${actionToConfirm === "ACCEPT" ? "Acceptance" : "Rejection"}`}
          isOpen={isConfirmModalOpen}
          onClose={closeConfirmationModal}
        >
          <div className="text-white/80">
            <p>
              Are you sure you want to{" "}
              <span
                className={`font-bold ${actionToConfirm === "ACCEPT" ? "text-green-400" : "text-red-400"}`}
              >
                {actionToConfirm?.toLowerCase()}
              </span>{" "}
              the application from{" "}
              <span className="font-bold">{selectedApp.society.user.name}</span>{" "}
              for the position of{" "}
              <span className="font-bold">
                {selectedApp.availablePosition.position_name}
              </span>
              ?
            </p>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={closeConfirmationModal}
                className="px-5 py-2 rounded-lg border-2 border-white/30 text-white/80 font-semibold transition-all duration-300 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateStatus}
                className={`px-6 py-2 rounded-lg text-white font-semibold shadow-lg transition-all duration-300 ${actionToConfirm === "ACCEPT" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
              >
                {actionToConfirm === "ACCEPT" ? "Accept" : "Reject"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ApprovalsClient;
