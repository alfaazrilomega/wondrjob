'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import type { PositionApplied, Society } from '@prisma/client';
import Loader from '@/app/Component/LoadingAnimation/Loading';

// Define a more specific type for the applicants
type Applicant = PositionApplied & {
  society: Society;
};

export default function JobApplicantsPage() {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const { jobId } = params;

  useEffect(() => {
    if (!jobId) return;

    async function fetchApplicants() {
      try {
        const response = await fetch(`/api/jobs/${jobId}/applicants`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch applicants');
        }
        const data = await response.json();
        setApplicants(data.applicants);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchApplicants();
  }, [jobId]);

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

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Applicants for Job #{jobId}</h1>
        </header>
        <main>
          <div className="space-y-4">
            {applicants.length > 0 ? (
              applicants.map((applicant) => (
                <div key={applicant.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h3 className="font-bold text-lg">{applicant.society.name}</h3>
                  <p className="text-sm text-gray-400">Applied on: {new Date(applicant.apply_date).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-400">Status: {applicant.status}</p>
                </div>
              ))
            ) : (
              <p>No applicants for this job yet.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
