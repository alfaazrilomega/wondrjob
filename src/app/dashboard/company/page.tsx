'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Company, AvailablePosition } from '@prisma/client';
import Loader from '@/app/Component/LoadingAnimation/Loading';
import AnimatedButton from '@/app/Component/ButtonAnimateCode/Button';

// Define a more specific type for the component's state
type CompanyProfile = Company & {
  jobs: AvailablePosition[];
};

export default function CompanyDashboard() {
  const [company, setCompany] = useState<CompanyProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchCompanyProfile() {
      try {
        const response = await fetch('/api/company/profile');
        
        if (!response.ok) {
          // Handle non-2xx responses
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.company) {
          setCompany(data.company);
        } else {
          // If no company profile exists, redirect to create page
          router.push('/company/create');
        }
      } catch (err) {
        console.error('Failed to fetch company profile', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchCompanyProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!company) {
    // This case is handled by the redirect, but it's good practice to have a fallback.
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Welcome, {company.name}</h1>
          <p className="mt-2 text-lg text-gray-400">Here's what's happening with your company today.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content: Job Postings */}
          <main className="md:col-span-3 bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Your Job Postings</h2>
              <AnimatedButton onClick={() => router.push('/dashboard/company/jobs/create')} />
            </div>

            <div className="space-y-4">
              {company.jobs.length > 0 ? (
                company.jobs.map((job) => (
                  <div key={job.id} className="bg-gray-900 p-4 rounded-lg border border-gray-700 flex justify-between items-center hover:border-indigo-500 transition-colors duration-300">
                    <div>
                      <h3 className="font-bold text-lg text-indigo-400">{job.position_name}</h3>
                      <p className="text-sm text-gray-400">
                        Capacity: {job.capacity} | Closes on: {new Date(job.submission_end_date).toLocaleDateString()}
                      </p>
                    </div>
                    <button 
                      onClick={() => router.push(`/dashboard/company/jobs/${job.id}/applicants`)} 
                      className="text-sm bg-gray-700 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
                      View Applicants
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 px-6 bg-gray-900 rounded-lg border-2 border-dashed border-gray-700">
                  <h3 className="text-xl font-semibold">No Jobs Posted Yet</h3>
                  <p className="mt-2 text-gray-400">Click the button above to create your first job posting!</p>
                </div>
              )}
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}