import type { JobPosition } from "@/contexts/AdminContext";
import type { EmploymentType, Job } from "@/types/job";

/**
 * Careers flow helpers: /careers/jobs (open positions), /careers/jobs/{slug} (job detail),
 * /careers/apply and /careers/thank-you. Jobs come live from Admin → Job Positions, so job
 * URLs are derived from the title (stable as long as the title doesn't change).
 */

// Positions created before the Admin Dashboard recorded postedAt were first published on this date.
export const ORIGINAL_POSTING_DATE = "2026-04-01";

export const CAREERS_PATHS = ["/careers/jobs", "/careers/apply", "/careers/thank-you"];
export const JOB_PATH_PREFIX = "/careers/jobs/";

const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "job";

/** Active positions with a unique URL slug each (a repeated title gets "-2", "-3"…). */
export const activeJobsWithSlugs = (positions: JobPosition[]) => {
  const seen = new Map<string, number>();
  return positions.filter(p => p.active).map(p => {
    const base = slugify(p.title);
    const n = (seen.get(base) ?? 0) + 1;
    seen.set(base, n);
    return { position: p, slug: n === 1 ? base : `${base}-${n}` };
  });
};

export const jobUrl = (slug: string) => `${JOB_PATH_PREFIX}${slug}`;
export const applyUrl = (slug?: string) => (slug ? `/careers/apply?position=${slug}` : "/careers/apply");

const parseEmploymentType = (type: string): EmploymentType => {
  const t = type.toLowerCase();
  if (t.includes("per diem") || t.includes("per-diem")) return "Per Diem";
  if (t.includes("part")) return "Part-time";
  return "Full-time";
};

/** Admin requirements are free text; split it into a list for display. */
export const splitRequirements = (requirements: string) => {
  const reqs = requirements.split(/\n|,\s*(?=[A-Z])/).map(r => r.trim().replace(/\.$/, "")).filter(r => r.length > 0);
  return reqs.length > 0 ? reqs : [requirements];
};

export const positionToJob = (p: JobPosition): Job => ({
  id: p.id,
  title: p.title,
  employmentType: parseEmploymentType(p.type),
  location: "New Jersey",
  description: p.description,
  fullDescription: p.description,
  requirements: splitRequirements(p.requirements),
  benefits: [],
  salaryRange: p.payMin != null && p.payMax != null
    ? { min: p.payMin, max: p.payMax, unit: p.payUnit ?? "HOUR" }
    : undefined,
});

// Admin "type" is free text like "Full-time / Part-time" or "Part-time / Per Diem";
// Google expects its fixed employmentType values.
const toEmploymentTypes = (type: string): string[] => {
  const t = type.toLowerCase();
  const types: string[] = [];
  if (t.includes("full")) types.push("FULL_TIME");
  if (t.includes("part")) types.push("PART_TIME");
  if (t.includes("per diem") || t.includes("per-diem")) types.push("PER_DIEM");
  if (t.includes("contract")) types.push("CONTRACTOR");
  if (t.includes("temp")) types.push("TEMPORARY");
  return types.length > 0 ? types : ["FULL_TIME"];
};

const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Google JobPosting for one ACTIVE position, published on that job's own page. */
export const jobPostingSchema = (p: JobPosition, slug: string) => {
  const url = `https://mintexcare.com${jobUrl(slug)}`;
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "@id": `${url}#job`,
    "title": p.title,
    "description": `<p>${escapeHtml(p.description)}</p><p><strong>Requirements:</strong> ${escapeHtml(p.requirements)}</p>`,
    "identifier": { "@type": "PropertyValue", "name": "MintexCare", "value": p.id },
    "datePosted": p.postedAt ?? ORIGINAL_POSTING_DATE,
    "employmentType": toEmploymentTypes(p.type),
    "directApply": true,
    "url": url,
    // Only published when the admin has entered a real pay range (never placeholder zeros).
    ...(p.payMin != null && p.payMax != null && {
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": { "@type": "QuantitativeValue", "minValue": p.payMin, "maxValue": p.payMax, "unitText": p.payUnit ?? "HOUR" },
      },
    }),
    "hiringOrganization": {
      "@type": "Organization",
      "@id": "https://mintexcare.com/#organization",
      "name": "MintexCare",
      "sameAs": "https://mintexcare.com/",
      "logo": "https://mintexcare.com/favicon-512.png",
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "2163 Oak Tree Road, Suite 204",
        "addressLocality": "Edison",
        "addressRegion": "NJ",
        "postalCode": "08820",
        "addressCountry": "US",
      },
    },
  };
};
