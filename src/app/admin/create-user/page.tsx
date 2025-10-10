"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { User, UserRole } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

// Reusable Modal Component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
      <div className="card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Main User Management Component
export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for modals
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // State for search and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    limit: 10,
  });

  const fetchUsers = useCallback(
    async (page = 1, search = "") => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/users?page=${page}&limit=${pagination.limit}&search=${search}`,
        );
        if (!response.ok) throw new Error("Failed to fetch users.");
        const data = await response.json();
        setUsers(data.users);
        setPagination(data.pagination);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
      } finally {
        setLoading(false);
      }
    },
    [pagination.limit],
  );

  useEffect(() => {
    fetchUsers(pagination.currentPage, searchTerm);
  }, [pagination.currentPage, searchTerm, fetchUsers]);

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  const handleUserCreated = (newUser: User) => {
    setUsers([newUser, ...users]);
    setCreateModalOpen(false);
  };

  const handleUserUpdated = (updatedUser: User) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setEditModalOpen(false);
  };

  const handleUserDeleted = () => {
    if (!selectedUser) return;
    setUsers(users.filter((u) => u.id !== selectedUser.id));
    setDeleteModalOpen(false);
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      {/* === CREATE USER CARD === */}
      <div className="card mb-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl">Create New User</h3>
          <button
            onClick={() => setCreateModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            Create
          </button>
        </div>
      </div>

      {/* === ALL USERS TABLE === */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl">All Users</h3>
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-1/3 p-2 bg-gray-700 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="p-2">ID</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Role</th>
                    <th className="p-2">Created At</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-gray-800 hover:bg-gray-800"
                      >
                        <td className="p-2 text-xs">{user.id}</td>
                        <td className="p-2">{user.name}</td>
                        <td className="p-2">{user.email}</td>
                        <td className="p-2">
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-500 text-white">
                            {user.role}
                          </span>
                        </td>
                        <td className="p-2">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-2 flex gap-2">
                          <button
                            onClick={() => handleEditClick(user)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClick(user)}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center p-4">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-400">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <div className="flex gap-2">
                <button
                  disabled={pagination.currentPage <= 1}
                  onClick={() =>
                    setPagination((p) => ({
                      ...p,
                      currentPage: p.currentPage - 1,
                    }))
                  }
                  className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-1 px-3 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  disabled={pagination.currentPage >= pagination.totalPages}
                  onClick={() =>
                    setPagination((p) => ({
                      ...p,
                      currentPage: p.currentPage + 1,
                    }))
                  }
                  className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-1 px-3 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* === MODALS === */}
      <UserFormModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSuccess={handleUserCreated}
      />
      {selectedUser && (
        <UserFormModal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          onSuccess={handleUserUpdated}
          user={selectedUser}
        />
      )}
      {selectedUser && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleUserDeleted}
          user={selectedUser}
        />
      )}
    </>
  );
}

interface UserFormData {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  phone?: string | null;
  address?: string | null;
  date_of_birth?: string;
  companyName?: string;
  companyAddress?: string;
  companyPhone?: string;
  companyDescription?: string;
  companyId?: string;
}

// User Form Modal (for Create and Edit)
const UserFormModal = ({
  isOpen,
  onClose,
  onSuccess,
  user,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User) => void;
  user?: User;
}) => {
  const [formData, setFormData] = useState<UserFormData>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [companies, setCompanies] = useState<{ id: number; name: string }[]>(
    [],
  );

  const isEditMode = useMemo(() => !!user, [user]);

  useEffect(() => {
    if (isOpen) {
      if (isEditMode && user) {
        setFormData({
          ...user,
          date_of_birth: user.date_of_birth
            ? new Date(user.date_of_birth).toISOString().split("T")[0]
            : "",
        });
      } else {
        setFormData({
          id: "",
          name: "",
          email: "",
          password: "",
          role: "SOCIETY",
          phone: "",
          address: "",
          date_of_birth: "",
        });
      }

      // Fetch companies for HRD role
      const fetchCompanies = async () => {
        try {
          const response = await fetch("/api/companies");
          if (!response.ok) throw new Error("Failed to fetch companies.");
          const result = await response.json();
          // Handle both direct array response and object response { data: [...] }
          const companiesData = Array.isArray(result) ? result : result.data;
          setCompanies(companiesData || []);
        } catch (err) {
          console.error(err);
        }
      };

      fetchCompanies();
    }
  }, [user, isEditMode, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateUserId = () => {
    setFormData({ ...formData, id: uuidv4() });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const url = isEditMode
      ? `/api/users/update/${user?.id}`
      : "/api/users/create";
    const method = isEditMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "An error occurred.");
      if (isEditMode) {
        onSuccess(data.user);
      } else {
        onSuccess(data);
      }
      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Edit User" : "Create New User"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isEditMode && (
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="id"
              placeholder="User ID"
              value={formData.id || ""}
              onChange={handleChange}
              required
              className="w-full p-2 bg-gray-700 rounded"
            />
            <button
              type="button"
              onClick={generateUserId}
              className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
            >
              Generate
            </button>
          </div>
        )}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name || ""}
          onChange={handleChange}
          required
          className="w-full p-2 bg-gray-700 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email || ""}
          onChange={handleChange}
          required
          className="w-full p-2 bg-gray-700 rounded"
          autoComplete="username"
        />
        <input
          type="password"
          name="password"
          placeholder={
            isEditMode ? "New Password (optional)" : "Temporary Password"
          }
          onChange={handleChange}
          className="w-full p-2 bg-gray-700 rounded"
          autoComplete="new-password"
        />
        <select
          name="role"
          value={formData.role || ""}
          onChange={handleChange}
          className="w-full p-2 bg-gray-700 rounded"
        >
          {Object.values(UserRole).map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>

        {formData.role === "HRD" && (
          <select
            name="companyId"
            value={formData.companyId || ""}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded"
            required
          >
            <option value="" disabled>
              Select a company
            </option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        )}

        {formData.role === "COMPANY" && (
          <>
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName || ""}
              onChange={handleChange}
              required
              className="w-full p-2 bg-gray-700 rounded"
            />
            <textarea
              name="companyDescription"
              placeholder="Company Description"
              value={formData.companyDescription || ""}
              onChange={handleChange}
              required
              className="w-full p-2 bg-gray-700 rounded"
            />
            <input
              type="text"
              name="companyAddress"
              placeholder="Company Address"
              value={formData.companyAddress || ""}
              onChange={handleChange}
              required
              className="w-full p-2 bg-gray-700 rounded"
            />
            <input
              type="text"
              name="companyPhone"
              placeholder="Company Phone"
              value={formData.companyPhone || ""}
              onChange={handleChange}
              required
              className="w-full p-2 bg-gray-700 rounded"
            />
          </>
        )}

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone || ""}
          onChange={handleChange}
          className="w-full p-2 bg-gray-700 rounded"
        />
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address || ""}
          onChange={handleChange}
          className="w-full p-2 bg-gray-700 rounded"
        />
        <input
          type="date"
          name="date_of_birth"
          placeholder="Date of Birth"
          value={formData.date_of_birth || ""}
          onChange={handleChange}
          className="w-full p-2 bg-gray-700 rounded"
        />

        {error && <p className="text-red-500 text-sm">Error: {error}</p>}

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : isEditMode
                ? "Save Changes"
                : "Create User"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

// Delete Confirmation Modal
const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  user,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  user: User;
}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await fetch(`/api/users/delete/${user.id}`, { method: "DELETE" });
      onConfirm();
    } catch (err) {
      console.error(err);
      alert("Failed to delete user.");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete User?">
      <p>
        Are you sure you want to permanently delete the user `&quot;`{user.name}
        `&quot;`? This action cannot be undone.
      </p>
      <div className="flex justify-end gap-4 pt-4 mt-4">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </Modal>
  );
};
