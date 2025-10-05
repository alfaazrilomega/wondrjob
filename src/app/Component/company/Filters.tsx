// src/app/Component/company/Filters.tsx
"use client";

import React from "react";
import { ChevronDown, Search, Filter as FilterIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { SortOption, FilterState } from "./types";

interface FiltersProps {
  filter: FilterState;
  onSortChange: (value: string) => void;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CONFIG = {
  searchPlaceholder: "Search companies...",
  sortOptions: [
    { name: "Default", value: "none" },
    { name: "Name A-Z", value: "name-asc" },
    { name: "Name Z-A", value: "name-desc" },
    { name: "Most Jobs", value: "jobs-desc" },
    { name: "Least Jobs", value: "jobs-asc" },
    { name: "Success Rate (High-Low)", value: "success-rate-desc" },
    { name: "Success Rate (Low-High)", value: "success-rate-asc" },
  ] as const satisfies readonly SortOption[],
};

export default function Filters({
  filter,
  onSortChange,
  onSearchChange,
}: FiltersProps) {
  const selectedSortName =
    CONFIG.sortOptions.find((opt) => opt.value === filter.sort)?.name ||
    "Default";

  const handleFilterButtonClick = () => {
    console.log(
      "Filter button clicked. Current success rate range:",
      filter.successRateRange,
    );
  };

  return (
    <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg w-full">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder={CONFIG.searchPlaceholder}
          value={filter.search}
          onChange={onSearchChange}
          className="pl-10 w-full bg-gray-900 border-gray-700 text-white rounded-md"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center justify-between px-4 py-2 bg-gray-900 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-white hover:bg-gray-800 w-48">
            <span>Sort by: {selectedSortName}</span>
            <ChevronDown className="h-5 w-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-48 bg-gray-900 border-gray-700 text-white"
        >
          {CONFIG.sortOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onSelect={() => onSortChange(option.value)}
              className={cn("cursor-pointer hover:bg-gray-800", {
                "bg-gray-700": filter.sort === option.value,
              })}
            >
              {option.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <button
        onClick={handleFilterButtonClick}
        className="flex items-center px-4 py-2 bg-gray-900 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-white hover:bg-gray-800"
      >
        <FilterIcon className="h-5 w-5 mr-2" />
        <span>Filters</span>
      </button>
    </div>
  );
}
