/**
 * Emails each new website form submission (contact, free consultation, staffing request, job
 * application) via Web3Forms (https://web3forms.com). The email goes to the address the access key
 * was created for. The key is meant to be public (it can only send to that address).
 *
 * Set VITE_WEB3FORMS_KEY in .env. Without it nothing is sent (submissions still save to Admin).
 */
import type { NewSubmission } from "@/contexts/AdminContext";

const KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;

export const sendSubmissionEmail = async (sub: NewSubmission & { type: "contact" | "career" }) => {
  if (!KEY) return;
  const isCareer = sub.type === "career";
  const fields: Record<string, string> = {
    access_key: KEY,
    subject: isCareer
      ? `New job application: ${sub.position || "Caregiver"} – ${sub.name}`
      : `New website message: ${sub.service || "Contact form"} – ${sub.name}`,
    from_name: "MintexCare website",
    // "Reply" in the email client answers the visitor directly.
    replyto: sub.email,
    Name: sub.name,
    Email: sub.email,
    Phone: sub.phone,
  };
  if (sub.service) fields[isCareer ? "Service" : "Type of care / service"] = sub.service;
  if (sub.position) fields.Position = sub.position;
  if (sub.message) fields.Message = sub.message;
  if (sub.coverLetter) fields["Cover letter"] = sub.coverLetter;
  if (sub.resumeName) fields.Resume = `${sub.resumeName} (open it in Admin → Careers)`;
  fields["Page"] = window.location.href;

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(fields),
    keepalive: true,
  });
  if (!res.ok) throw new Error(`Web3Forms ${res.status}`);
};
