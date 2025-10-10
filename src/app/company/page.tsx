"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";

// UI Components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CompanyList from "../Component/company/CompanyList";
import Filters from "../Component/company/Filters";

// Types and Utils
import {
  CONFIG,
  Company,
  ApiResponse,
} from "../Component/company/types";
import { useDebounce } from "../Component/company/useDebounce";
import { createClient } from "@/lib/supabase/client";
import { logout } from "@/app/actions/auth";

export default function CompanyPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState({
    sort: "none",
    search: "",
    category: "",
    minSuccessRate: 0,
    maxSuccessRate: 100,
  });

  // State for scroll and user
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const debouncedSearchTerm = useDebounce(filter.search, 500);
  const router = useRouter();

  // Effect to get user from Supabase
  useEffect(() => {
    const supabase = createClient();
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
  }, []);

  // Effect for scroll event
  useEffect(() => {
    const handleScroll = () => {
      // A small threshold to detect scroll, e.g., 10px
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- Data Fetching Effects ---
  const fetchCompanies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams({
        sort: filter.sort,
        search: debouncedSearchTerm,
        category: filter.category,
      });
      const response = await fetch(`${CONFIG.apiEndpoint}?${params}`);
      const data: ApiResponse = await response.json();
      if (data.success && data.data) {
        setCompanies(data.data);
      } else {
        setError(data.error || "Failed to fetch companies");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Network error";
      setError(`Connection error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }, [filter.sort, debouncedSearchTerm, filter.category]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  // --- Memoized Data Filtering ---
  const filteredData = useMemo(() => {
    let data = companies.map((company) => {
      let latestSuccessRate = 0;
      if (company.monthlyStats && company.monthlyStats.length > 0) {
        const sortedStats = [...company.monthlyStats].sort((a, b) => {
          if (a.year !== b.year) return b.year - a.year;
          return b.month - a.month;
        });
        latestSuccessRate = sortedStats[0].successRate;
      }
      return { ...company, successRate: latestSuccessRate * 100 };
    });

    if (filter.sort === "success-rate-asc") {
      data.sort((a, b) => (a.successRate || 0) - (b.successRate || 0));
    } else if (filter.sort === "success-rate-desc") {
      data.sort((a, b) => (b.successRate || 0) - (a.successRate || 0));
    }

    return data.filter((company) => {
      const successRate = company.successRate || 0;
      return (
        successRate >= filter.minSuccessRate &&
        successRate <= filter.maxSuccessRate
      );
    });
  }, [
    companies,
    filter.sort,
    filter.minSuccessRate,
    filter.maxSuccessRate,
  ]);

  // --- Handlers ---
  const handleSortChange = (value: string) =>
    setFilter((prev) => ({ ...prev, sort: value }));
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilter((prev) => ({ ...prev, search: e.target.value }));
  const handleRetry = () => fetchCompanies();
  const handleLogout = async () => {
    await logout();
    router.refresh();
  };

  return (
    <div className="bg-black dark:bg-gray-900 text-white dark:text-gray-200 min-h-screen pt-20">
      {/* --- Sticky Header --- */}
      <div
        className={`sticky top-0 z-20 transition-all duration-300 ease-in-out ${
          isScrolled
            ? "py-3 bg-gray-950/80 backdrop-blur-lg border-b border-gray-800"
            : "pt-8 pb-12 bg-black"
        }`}
      >
        {isScrolled ? (
          // --- Scrolled State Header ---
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center gap-x-4 md:gap-x-6">
              <h1 className="text-2xl font-bold tracking-tighter text-white whitespace-nowrap">
                <span className="animated-gradient">Find</span> Opportunity
              </h1>
              <Filters
                filter={filter}
                onSortChange={handleSortChange}
                onSearchChange={handleSearchChange}
              />
            </div>
            <div className="opacity-100">
              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarImage src={user.user_metadata.avatar_url || ""} />
                      <AvatarFallback>
                        {user.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="DropdownIndex">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <a href="/profile">Profile</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <button onClick={handleLogout}>Log Out</button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        ) : (
          // --- Default (Top) State Header ---
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-extrabold tracking-tighter text-white dark:text-white sm:text-6xl md:text-7xl">
                <span className="animated-gradient">Find</span> Your Next Big
                Opportunity
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300 dark:text-gray-400">
                Discover companies that are actively hiring and find the perfect
                fit for your career.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-gray-900/50 border border-gray-800 p-4 rounded-xl">
              <Filters
                filter={filter}
                onSortChange={handleSortChange}
                onSearchChange={handleSearchChange}
              />
            </div>
          </div>
        )}
      </div>

      {/* --- Page Content --- */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <CompanyList
          companies={filteredData}
          loading={loading}
          error={error}
          onRetry={handleRetry}
        />
      </div>
    </div>
  );
}
