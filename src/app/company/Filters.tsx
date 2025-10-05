"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, Search, Filter as FilterIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { SortOption } from "./types";

interface FiltersProps {
  onFilterChange: (newFilter: { sort?: string; search?: string }) => void;
  currentSearch: string;
  currentSort: string;
}

const CONFIG = {
  searchPlaceholder: "Search companies...",
  sortOptions: [
    { name: "Default", value: "none" },
    { name: "Name A-Z", value: "name-asc" },
    { name: "Name Z-A", value: "name-desc" },
    { name: "Most Jobs", value: "jobs-desc" },
    { name: "Least Jobs", value: "jobs-asc" },
    { name: "Success Rate (High-Low)", value: "success-desc" },
    { name: "Success Rate (Low-High)", value: "success-asc" },
  ] as const satisfies readonly SortOption[],
};

export default function Filters({
  onFilterChange,
  currentSearch,
  currentSort,
}: FiltersProps) {
  const [localSearch, setLocalSearch] = useState(currentSearch);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (localSearch !== currentSearch) {
        onFilterChange({ search: localSearch });
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [localSearch, currentSearch, onFilterChange]);

  useEffect(() => {
    setLocalSearch(currentSearch);
  }, [currentSearch]);

  const handleSortChange = (sortValue: string) => {
    onFilterChange({ sort: sortValue });
  };

  const selectedSortName =
    CONFIG.sortOptions.find((opt) => opt.value === currentSort)?.name ||
    "Default";

  return (
    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg shadow">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder={CONFIG.searchPlaceholder}
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="pl-10 w-full"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-48">
            <span>Sort by: {selectedSortName}</span>
            <ChevronDown className="h-5 w-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {CONFIG.sortOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onSelect={() => handleSortChange(option.value)}
              className={cn("cursor-pointer", {
                "bg-gray-100": currentSort === option.value,
              })}
            >
              {option.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
        <FilterIcon className="h-5 w-5 mr-2" />
        <span>Filters</span>
      </button>
    </div>
  );
}
