/**
 * Emails each new website form submission (contact, free consultation, staffing request, job
 * application) to MintexCare's inbox. The website posts the submission to a free Google Apps
 * Script web app (email-script/, runs on MintexCare's Google account), which builds the branded
 * email and sends it through Gmail. No server, SMTP password or paid plan involved.
 *
 * Set VITE_EMAIL_SCRIPT_URL in .env (the Apps Script "Web app" URL ending in /exec). Without it
 * nothing is sent (submissions still save to Admin).
 */
import type { NewSubmission } from "@/contexts/AdminContext";

const SCRIPT_URL = import.meta.env.VITE_EMAIL_SCRIPT_URL as string | undefined;

export type ResumeFile = { fileName: string; base64: string };

export const sendSubmissionEmail = async (
  sub: NewSubmission & { type: "contact" | "career"; date: string },
  resume?: ResumeFile,
) => {
  if (!SCRIPT_URL) return;
  // No Content-Type header: Apps Script only accepts "simple" cross-site requests (text/plain).
  const res = await fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({ ...sub, resume }),
    keepalive: !resume, // keepalive bodies are limited to 64 KB
  });
  const out = await res.json().catch(() => null) as { ok?: boolean; error?: string } | null;
  if (!res.ok || !out?.ok) throw new Error(`email script: ${out?.error ?? res.status}`);
};
