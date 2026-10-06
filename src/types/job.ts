export type EmploymentType = "Full-time" | "Part-time" | "Per Diem";
export type PayUnit = "HOUR" | "YEAR";
export type FilterOption = "all" | "full-time" | "part-time" | "per-diem";

export interface Job {
  id: string;
  /** URL slug of the job's page (/careers/jobs/{slug}). */
  slug?: string;
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
    /** Defaults to YEAR when omitted. */
    unit?: PayUnit;
  };
  featured?: boolean;
}

const money = (n: number) => `$${n.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;

/** "$18 - $22/hr", "$45,000 - $55,000/yr", or a single amount when min equals max. */
export const formatPay = ({ min, max, unit = "YEAR" }: NonNullable<Job["salaryRange"]>) => {
  const suffix = unit === "HOUR" ? "/hr" : "/yr";
  return min === max ? `${money(min)}${suffix}` : `${money(min)} - ${money(max)}${suffix}`;
};
