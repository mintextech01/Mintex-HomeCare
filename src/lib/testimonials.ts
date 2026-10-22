import type { Testimonial, TestimonialCategory } from "@/contexts/AdminContext";

export const STORY_LABELS: Record<TestimonialCategory, string> = {
  family: "Family story",
  client: "Client story",
  caregiver: "Caregiver story",
};

export const storyLabel = (t: Testimonial) => STORY_LABELS[t.category ?? "family"];

/** Avatar letters: "Sarah Kim" -> "SK". */
export const initials = (name: string) =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]!.toUpperCase()).join("") || "?";

/** The name as shown on the site: full name, or "S.K." when the family asked for initials only. */
export const displayName = (t: Testimonial) =>
  t.initialsOnly ? initials(t.name).split("").join(".") + "." : t.name;

/** "Daughter of client · Edison, NJ" (either part may be missing). */
export const byline = (t: Testimonial) =>
  [t.relationship?.trim(), t.location?.trim()].filter(Boolean).join(" · ");
