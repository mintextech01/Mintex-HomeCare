export type EmploymentType = "Full-time" | "Part-time" | "Per Diem";
export type FilterOption = "all" | "full-time" | "part-time" | "per-diem";

export interface Job {
  id: string;
  title: string;
  employmentType: EmploymentType;
  location: string;
  description: string;
  fullDescription: string;
  requirements: string[];
  benefits: string[];
  salaryRange?: {
    min: number;
    max: number;
  };
  featured?: boolean;
}
