// src/app/company/types.ts

export interface ChartDataPoint {
  month: string;
  successRate: number; // Percentage
}

export interface Job {
  id: number;
  position_name: string;
  capacity: number;
  submission_end_date: string;
}

export interface Company {
  id: number;
  name: string;
  address: string;
  phone: string;
  description: string;
  user_id: string;
  _count: {
    jobs: number;
  };
  jobs: Job[];
  // You might add successRate here later if fetched or calculated
  successRate?: number; // Added for chart data and sorting by success rate
  historicalSuccessRates?: ChartDataPoint[]; // Added for line chart data
}

export interface ApiResponse {
  success: boolean;
  data?: Company[];
  count?: number;
  error?: string;
  details?: string;
  suggestion?: string;
}

// Interface for filter state passed between components
export interface FilterState {
  sort: string;
  search: string;
  category: string;
  minSuccessRate: number;
  maxSuccessRate: number;
  successRateRange?: [number, number]; // Example for a potential future filter
}

export interface SortOption {
  name: string;
  value: string;
}

export const CONFIG = {
  apiEndpoint: "/api/companies",
  noResultsMessage: "No companies found matching your criteria.",
};

export interface AppStats {
  companyName: string;
  successRate: number;
  totalApplications?: number;
  successfulApplications?: number;
}
