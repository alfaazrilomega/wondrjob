export interface Skill {
  id: number;
  name: string;
}

export interface Job {
  id: number;
  company_id: number;
  position_name: string;
  capacity: number;
  description: string;
  submission_start_date: string;
  submission_end_date: string;
  jobType?: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP';
  salaryMin?: number;
  salaryMax?: number;
  workStyle?: 'ON_SITE' | 'HYBRID' | 'REMOTE';
  skills?: Skill[];
}

export interface JobFormData {
  company_id: string;
  position_name: string;
  capacity: number;
  description: string;
  submission_start_date: string;
  submission_end_date: string;
  jobType?: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP';
  salaryMin?: number;
  salaryMax?: number;
  workStyle?: 'ON_SITE' | 'HYBRID' | 'REMOTE';
  skills?: Skill[];
}
