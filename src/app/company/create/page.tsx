/* eslint-disable prettier/prettier */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateCompanyPage() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleCreateCompany = async () => {
    setError('');
    setSuccess('');

    const res = await fetch('/api/companies/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, address, phone, description }),
    });

    if (res.ok) {
      setSuccess('Company created successfully! Your role has been updated.');
      // Redirect to the company page or dashboard
      router.push('/company');
    } else {
      const data = await res.json();
      setError(data.error || 'Failed to create company.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a Company</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <div className="mb-4">
        <label htmlFor="name" className="block mb-2">Company Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="address" className="block mb-2">Address:</label>
        <input
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block mb-2">Phone:</label>
        <input
          id="phone"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-2">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>

      <button
        onClick={handleCreateCompany}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create Company
      </button>
    </div>
  );
}
