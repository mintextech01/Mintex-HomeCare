/**
 * POST /api/send — emails a website form submission through SMTP (nodemailer), in the MintexCare
 * design (lib/template.js). Called by the website (src/lib/emailAlert.ts) after the submission is
 * saved to Firestore. Runs free on Vercel.
 *
 * Environment variables (Vercel ▸ Project ▸ Settings ▸ Environment Variables):
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO, MAIL_FROM (optional)
 */
import nodemailer from "nodemailer";
import { renderEmail } from "../lib/template.js";
import { LOGO_PNG_BASE64 } from "../lib/logo.js";

const ALLOWED_ORIGINS = [
  "https://mintexcare.com",
  "https://www.mintexcare.com",
  "https://mintex-care-b2204.web.app",
  "https://mintex-care-b2204.firebaseapp.com",
];
const SITE_URL = "https://mintexcare.com";

// Best-effort flood limit (per server instance).
const recent = [];
const MAX_PER_HOUR = 30;

const str = (v, max) => String(v ?? "").slice(0, max);

export default async function handler(req, res) {
  const origin = req.headers.origin || "";
  if (ALLOWED_ORIGINS.includes(origin)) res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method === "GET") return res.status(200).send("MintexCare email API is running.");
  if (req.method !== "POST") return res.status(405).end();
  // Only the MintexCare website may send (browsers always include Origin on cross-site POSTs).
  if (!ALLOWED_ORIGINS.includes(origin)) return res.status(403).json({ ok: false, error: "origin" });

  let d = req.body;
  if (typeof d === "string") { try { d = JSON.parse(d); } catch { d = {}; } }
  d = d || {};

  const sub = {
    type: d.type === "career" ? "career" : "contact",
    name: str(d.name, 100).trim(),
    email: str(d.email, 200).trim(),
    phone: str(d.phone, 40).trim(),
    service: str(d.service, 100),
    message: str(d.message, 5000),
    position: str(d.position, 100),
    coverLetter: str(d.coverLetter, 5000),
    resumeName: str(d.resumeName, 255),
    date: str(d.date, 40),
  };
  if (!sub.name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(sub.email) || sub.phone.replace(/\D/g, "").length < 7) {
    return res.status(400).json({ ok: false, error: "invalid" });
  }

  const now = Date.now();
  while (recent.length && now - recent[0] > 3600_000) recent.shift();
  if (recent.length >= MAX_PER_HOUR) return res.status(429).json({ ok: false, error: "limit" });
  recent.push(now);

  const { subject, html, text } = renderEmail(sub, {
    siteUrl: SITE_URL, logoSrc: "cid:mintexcare-logo",
    receivedAt: sub.date ? new Date(sub.date) : new Date(),
  });

  // The logo travels inside the email (inline image), so it shows without loading anything.
  const attachments = [{ filename: "mintexcare-logo.png", content: LOGO_PNG_BASE64, encoding: "base64", cid: "mintexcare-logo", contentDisposition: "inline" }];
  if (sub.type === "career" && d.resume?.base64 && String(d.resume.base64).length <= 1_000_000) {
    attachments.push({ filename: str(d.resume.fileName || sub.resumeName || "resume.pdf", 255), content: String(d.resume.base64), encoding: "base64" });
  }

  // Settings pasted into the dashboard often carry a stray space or line break.
  const env = (k) => (process.env[k] || "").trim();
  const port = Number(env("SMTP_PORT") || 465);
  const transport = nodemailer.createTransport({
    host: env("SMTP_HOST"),
    port,
    secure: port === 465, // 465 = SSL, 587 = STARTTLS
    auth: { user: env("SMTP_USER"), pass: env("SMTP_PASS").replace(/\s+/g, "") }, // app passwords are shown with spaces
  });

  try {
    await transport.sendMail({
      from: { name: "MintexCare Website", address: env("MAIL_FROM") || env("SMTP_USER") },
      to: env("MAIL_TO"),
      replyTo: { name: sub.name, address: sub.email },
      subject, html, text, attachments,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("SMTP send failed:", err?.code, err?.response || err?.message);
    return res.status(502).json({ ok: false, error: "smtp" });
  }
}

// Resumes are sent as base64 (up to ~700 KB files).
export const config = { api: { bodyParser: { sizeLimit: "2mb" } } };
