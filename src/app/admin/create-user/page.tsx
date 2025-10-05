"use client";

import { useState } from "react";
import { UserRole } from "@prisma/client";

export default function CreateUserPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "SOCIETY" as UserRole,
    companyName: "",
    companyAddress: "",
    companyPhone: "",
    companyDescription: "",
    companyId: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/admin/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setSuccess(data.message || "User created successfully!");
      // Optionally reset form
      // setFormData({ ...initial state... });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Create New User</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 bg-gray-700 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 bg-gray-700 rounded"
          />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 bg-gray-700 rounded"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded"
          >
            {Object.values(UserRole).map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          {formData.role === "COMPANY" && (
            <div className="space-y-2 border-t border-gray-700 pt-4">
              <h2 className="font-semibold">Company Details</h2>
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="w-full p-2 bg-gray-700 rounded"
              />
              <input
                type="text"
                name="companyAddress"
                placeholder="Company Address"
                value={formData.companyAddress}
                onChange={handleChange}
                required
                className="w-full p-2 bg-gray-700 rounded"
              />
              <input
                type="text"
                name="companyPhone"
                placeholder="Company Phone"
                value={formData.companyPhone}
                onChange={handleChange}
                required
                className="w-full p-2 bg-gray-700 rounded"
              />
              <input
                type="text"
                name="companyDescription"
                placeholder="Company Description"
                value={formData.companyDescription}
                onChange={handleChange}
                required
                className="w-full p-2 bg-gray-700 rounded"
              />
            </div>
          )}

          {formData.role === "HRD" && (
            <div className="space-y-2 border-t border-gray-700 pt-4">
              <h2 className="font-semibold">HRD Details</h2>
              <input
                type="text"
                name="companyId"
                placeholder="Company ID to associate with"
                value={formData.companyId}
                onChange={handleChange}
                required
                className="w-full p-2 bg-gray-700 rounded"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-500"
          >
            {loading ? "Creating..." : "Create User"}
          </button>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}
        </form>
      </div>
    </div>
  );
}
