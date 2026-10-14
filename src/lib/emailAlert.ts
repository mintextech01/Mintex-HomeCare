/**
 * Emails each new website form submission (contact, free consultation, staffing request, job
 * application) through MintexCare's SMTP account. The website can't hold the SMTP password, so it
 * calls a small free server (email-api/, deployed on Vercel) that builds the branded email and
 * sends it with nodemailer.
 *
 * Set VITE_EMAIL_API_URL in .env (e.g. https://mintexcare-email.vercel.app/api/send). Without it
 * nothing is sent (submissions still save to Admin).
 */
import type { NewSubmission } from "@/contexts/AdminContext";

const API_URL = import.meta.env.VITE_EMAIL_API_URL as string | undefined;

export type ResumeFile = { fileName: string; base64: string };

export const sendSubmissionEmail = async (
  sub: NewSubmission & { type: "contact" | "career"; date: string },
  resume?: ResumeFile,
) => {
  if (!API_URL) return;
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...sub, resume }),
    keepalive: !resume, // keepalive bodies are limited to 64 KB
  });
  if (!res.ok) throw new Error(`email API ${res.status}`);
};
