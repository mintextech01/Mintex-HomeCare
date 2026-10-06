/**
 * Lead tracking shared by the site's forms. Each successful submission pushes a dataLayer event
 * for Google Tag Manager / GA4 / Google Ads, then the form sends the visitor to /thank-you
 * (with `source` in the router state so the page shows the right message).
 */
export type LeadSource = "consultation" | "contact" | "staffing";

const EVENTS: Record<LeadSource | "application", string> = {
  consultation: "consultation_submitted",
  contact: "contact_submitted",
  staffing: "staff_request_submitted",
  // Job applications go to /careers/thank-you instead.
  application: "application_submitted",
};

export const trackLead = (source: LeadSource | "application", data: Record<string, string> = {}) => {
  (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({ event: EVENTS[source], lead_source: source, ...data });
};
