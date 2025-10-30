import { Skill } from "@prisma/client";

export interface Job {
  id: number;
  company_id: number;
  position_name: string;
  department?: string | null;
  location?: string | null;
  capacity: number;
  description: string;
  submission_start_date: Date | string;
  submission_end_date: Date | string;
  jobType?: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP";
  salaryMin?: number | null;
  salaryMax?: number | null;
  workStyle?: "ON_SITE" | "HYBRID" | "REMOTE";
  skills?: Skill[];
}

export interface JobFormData {
  company_id: string;
  position_name: string;
  department?: string;
  location?: string;
  capacity: number;
  description: string;
  submission_start_date: string;
  submission_end_date: string;
  jobType?: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP";
  salaryMin?: number;
  salaryMax?: number;
  workStyle?: "ON_SITE" | "HYBRID" | "REMOTE";
  skills?: Skill[];
}

export type { Skill };
