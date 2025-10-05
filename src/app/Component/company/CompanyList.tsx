"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import CompanyCard from "./CompanyCard";
import { Company, CONFIG } from "./types";

interface CompanyListProps {
  companies: Company[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

export default function CompanyList({
  companies,
  loading,
  error,
  onRetry,
}: CompanyListProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-2">{error}</p>
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      ) : companies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            {CONFIG.noResultsMessage}
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <Link
              href={`/company/${company.id}`}
              key={company.id}
              className="block h-full"
            >
              <CompanyCard company={company} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
