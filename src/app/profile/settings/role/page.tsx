/* eslint-disable prettier/prettier */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RoleManagementPage() {
  const [targetRole, setTargetRole] = useState('SOCIETY');
  const [companyId, setCompanyId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleRoleChange = async () => {
    setError('');
    setSuccess('');

    const res = await fetch('/api/role-management/change-role', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetRole, companyId: targetRole === 'HRD' ? parseInt(companyId) : undefined }),
    });

    if (res.ok) {
      setSuccess('Role updated successfully!');
      // Optionally redirect or update UI
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || 'Failed to update role.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Change Your Role</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <div className="mb-4">
        <label htmlFor="role-select" className="block mb-2">Select Role:</label>
        <select
          id="role-select"
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="SOCIETY">Job Seeker (Society)</option>
          <option value="COMPANY">Company</option>
          <option value="HRD">HRD</option>
        </select>
      </div>

      {targetRole === 'HRD' && (
        <div className="mb-4">
          <label htmlFor="company-id" className="block mb-2">Company ID:</label>
          <input
            id="company-id"
            type="text"
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
            className="p-2 border rounded w-full"
            placeholder="Enter the ID of the company you work for"
          />
        </div>
      )}

      {targetRole === 'COMPANY' && (
        <div className="mb-4">
            <p>To become a company, you need to create a company profile.</p>
            <button
                onClick={() => router.push('/company/create')}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Create Company Page
            </button>
        </div>
      )}


      <button
        onClick={handleRoleChange}
        disabled={targetRole === 'COMPANY'}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
      >
        Save Role
      </button>
    </div>
  );
}
