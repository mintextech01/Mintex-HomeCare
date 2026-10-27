/**
 * MintexCare form emails — Google Apps Script web app (free, runs on MintexCare's Google account).
 *
 * The website saves every form submission to Firestore, then POSTs the same data here. This script
 * builds the branded email (same design as before) and sends it from the Google account that
 * deployed it, with the logo embedded and the resume attached for job applications.
 *
 * Setup: see email-script/README.md. Paste this file as Code.gs and Logo.gs next to it.
 */

// Where alerts go. Empty = the Google account that deployed this script.
// Several addresses: "a@example.com, b@example.com".
const MAIL_TO = "s.goswami@plentycart.com, info@mintexcare.com";

const SITE_URL = "https://mintexcare.com";
const MAX_PER_HOUR = 30;              // flood limit for the whole script
const MAX_RESUME_BASE64 = 1000000;   // ~700 KB file, same limit as the site

/* ── Web app entry points ─────────────────────────────────────────── */

function doGet() {
  return ContentService.createTextOutput("MintexCare email script is running.");
}

function doPost(e) {
  let d = {};
  try { d = JSON.parse((e && e.postData && e.postData.contents) || "{}") || {}; } catch (err) { d = {}; }

  const str = (v, max) => String(v == null ? "" : v).slice(0, max);
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
    return json({ ok: false, error: "invalid" });
  }
  if (!underHourlyLimit()) return json({ ok: false, error: "limit" });

  const receivedAt = sub.date && !isNaN(new Date(sub.date)) ? new Date(sub.date) : new Date();
  const mail = renderEmail(sub, { siteUrl: SITE_URL, logoSrc: "cid:mintexcarelogo", receivedAt: receivedAt });

  const attachments = [];
  const resume = d.resume || {};
  if (sub.type === "career" && resume.base64 && String(resume.base64).length <= MAX_RESUME_BASE64) {
    const fileName = str(resume.fileName || sub.resumeName || "resume.pdf", 255);
    try {
      attachments.push(Utilities.newBlob(Utilities.base64Decode(String(resume.base64)), mimeFor(fileName), fileName));
    } catch (err) {
      console.error("Resume could not be decoded: " + err);
    }
  }

  try {
    MailApp.sendEmail({
      to: MAIL_TO || Session.getEffectiveUser().getEmail(),
      name: "MintexCare Website",
      replyTo: sub.email,
      subject: mail.subject,
      body: mail.text,
      htmlBody: mail.html,
      inlineImages: { mintexcarelogo: Utilities.newBlob(Utilities.base64Decode(LOGO_PNG_BASE64), "image/png", "mintexcare-logo.png") },
      attachments: attachments,
    });
    return json({ ok: true });
  } catch (err) {
    console.error("Send failed: " + err);
    return json({ ok: false, error: "send" });
  }
}

/** Run this once from the editor (Run ▸ testSend) to approve permissions and get a sample email. */
function testSend() {
  doPost({ postData: { contents: JSON.stringify({
    type: "contact", name: "Test Visitor", email: "test@example.com", phone: "(732) 555-0100",
    service: "Personal Care", message: "This is a test message from the MintexCare email script.",
    date: new Date().toISOString(),
  }) } });
}

/* ── Helpers ──────────────────────────────────────────────────────── */

const json = (o) => ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);

function underHourlyLimit() {
  const lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    const cache = CacheService.getScriptCache();
    const key = "sent-" + Math.floor(Date.now() / 3600000);
    const count = Number(cache.get(key) || 0);
    if (count >= MAX_PER_HOUR) return false;
    cache.put(key, String(count + 1), 3600);
    return true;
  } finally {
    lock.releaseLock();
  }
}

function mimeFor(fileName) {
  const ext = String(fileName).toLowerCase().split(".").pop();
  return ({
    pdf: "application/pdf",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    txt: "text/plain",
    rtf: "application/rtf",
    jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png",
  })[ext] || "application/octet-stream";
}

/* ── Email design (ported from the old email-api/lib/template.js) ─── */
/*
 * Styled like mintexcare.com's style tile (Mintex blue, charcoal text, mist-blue soft buttons,
 * soft-white cards, Nunito). Email clients only support simple HTML: tables for layout, inline
 * styles, no SVG.
 */

const C = {
  ink: "#22272E",        // charcoal: headings, values
  text: "#22272E",
  muted: "#5B6470",      // soft grey: labels, supporting text
  blue: "#2A66B0",       // Mintex blue: header card, links, primary button
  mist: "#EEF3FA",       // soft buttons
  surface: "#F7F9FC",    // soft white cards
  border: "#E3E8F0",
  page: "#EEF3FA",
};
const HEAD = "'Nunito', Arial, Helvetica, sans-serif";
const BODY = "'Nunito Sans', 'Nunito', Arial, Helvetica, sans-serif";

const esc = (s) => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const nl2br = (s) => esc(s).replace(/\r?\n/g, "<br>");
const telHref = (p) => "tel:" + String(p || "").replace(/[^\d+]/g, "");

/** What kind of form this came from, and how to title it. */
const kindOf = (sub) => {
  if (sub.type === "career") return { key: "career", eyebrow: "New job application", title: sub.position || "Job application" };
  if ((sub.service || "").startsWith("Facility Staffing")) return { key: "staffing", eyebrow: "New staffing request", title: "Facility staffing request" };
  if ((sub.message || "").startsWith("Free consultation request")) return { key: "consultation", eyebrow: "New free consultation request", title: sub.service ? `${sub.service} consultation` : "Free consultation" };
  return { key: "contact", eyebrow: "New website message", title: sub.service || "Contact form message" };
};

/**
 * Consultation and staffing messages are built by the site as "Label: value" lines plus an
 * optional "Notes:" block; turn those into rows. Contact messages are free text.
 */
const parseMessage = (sub, kind) => {
  const msg = String(sub.message || "").trim();
  if (kind.key === "career") return { rows: [], notes: sub.coverLetter || "", notesLabel: "Cover letter" };
  if (kind.key === "contact") return { rows: [], notes: msg, notesLabel: "Message" };
  const rows = [];
  const notes = [];
  let inNotes = false;
  for (const line of msg.split(/\r?\n/)) {
    if (inNotes) { notes.push(line); continue; }
    if (!line.trim() || line.trim() === "Free consultation request") continue;
    if (/^Notes:\s*$/.test(line.trim())) { inNotes = true; continue; }
    const m = /^([^:]{2,40}):\s*(.+)$/.exec(line.trim());
    if (m) rows.push([m[1], m[2]]); else notes.push(line);
  }
  return { rows, notes: notes.join("\n").trim(), notesLabel: "Notes" };
};

const row = (label, valueHtml, last) => `
  <tr>
    <td style="padding:14px 20px;${last ? "" : `border-bottom:1px solid ${C.border};`}font-family:${BODY};font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:${C.muted};width:38%;vertical-align:top;">${esc(label)}</td>
    <td style="padding:14px 20px;${last ? "" : `border-bottom:1px solid ${C.border};`}font-family:${BODY};font-size:16px;line-height:1.5;color:${C.ink};font-weight:600;vertical-align:top;">${valueHtml}</td>
  </tr>`;

const button = (href, label, primary) => `
  <td style="padding:0 8px 10px 0;">
    <a href="${esc(href)}" style="display:inline-block;padding:13px 22px;border-radius:12px;font-family:${BODY};font-size:15px;font-weight:700;text-decoration:none;${primary ? `background:${C.blue};color:#ffffff;border:1px solid ${C.blue};` : `background:${C.mist};color:${C.blue};border:1px solid ${C.mist};`}">${label}</a>
  </td>`;

/** logoSrc: image address for the logo, e.g. "cid:mintexcarelogo" (embedded in the email). */
function renderEmail(sub, opts) {
  const siteUrl = opts.siteUrl, logoSrc = opts.logoSrc, receivedAt = opts.receivedAt || new Date();
  const kind = kindOf(sub);
  const parsed = parseMessage(sub, kind);
  const notes = parsed.notes, notesLabel = parsed.notesLabel;
  const firstName = String(sub.name || "").trim().split(/\s+/)[0] || "them";
  const when = Utilities.formatDate(receivedAt, "America/New_York", "EEE, MMM d, yyyy, h:mm a z");

  const rows = [
    ["Name", esc(sub.name)],
    ["Phone", `<a href="${esc(telHref(sub.phone))}" style="color:${C.blue};text-decoration:none;">${esc(sub.phone)}</a>`],
    ["Email", `<a href="mailto:${esc(sub.email)}" style="color:${C.blue};text-decoration:none;word-break:break-all;">${esc(sub.email)}</a>`],
  ];
  if (kind.key === "career") rows.push(["Position", esc(sub.position || sub.service)]);
  else if (kind.key === "staffing") rows.push(["Roles needed", esc(String(sub.service).replace(/^Facility Staffing:\s*/, ""))]);
  else if (sub.service) rows.push([kind.key === "consultation" ? "Type of care" : "Service", esc(sub.service)]);
  for (const [k, v] of parsed.rows) if (!(kind.key === "staffing" && k === "Roles needed")) rows.push([k, esc(v)]);
  if (kind.key === "career") rows.push(["Resume", sub.resumeName ? `${esc(sub.resumeName)} <span style="color:${C.muted};font-weight:400;">(attached)</span>` : `<span style="color:${C.muted};font-weight:400;">Not provided</span>`]);

  const replySubject = kind.key === "career" ? "Your application to MintexCare" : "Your request to MintexCare";
  const subject = kind.key === "career"
    ? `New job application: ${sub.position || "Caregiver"} – ${sub.name}`
    : `${kind.eyebrow}: ${kind.key === "staffing" ? "Facility staffing" : sub.service || "Website"} – ${sub.name}`;

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${esc(subject)}</title>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700;800&family=Nunito+Sans:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  @media (max-width: 620px) {
    .container { width: 100% !important; }
    .px { padding-left: 20px !important; padding-right: 20px !important; }
    .h1 { font-size: 24px !important; }
    .stack td { display: block !important; width: 100% !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${C.page};-webkit-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(kind.eyebrow)} from ${esc(sub.name)} · ${esc(sub.phone)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.page};">
  <tr><td align="center" style="padding:28px 12px;">
    <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:#ffffff;border:1px solid ${C.border};border-radius:20px;overflow:hidden;">

      <!-- Logo -->
      <tr><td class="px" style="padding:24px 32px 8px;">
        <a href="${esc(siteUrl)}" style="text-decoration:none;"><img src="${esc(logoSrc)}" width="150" alt="MintexCare" style="display:block;width:150px;height:auto;border:0;"></a>
      </td></tr>

      <!-- Header card (Mintex blue) -->
      <tr><td class="px" style="padding:12px 24px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.blue};border-radius:16px;">
          <tr><td style="padding:26px 28px;">
            <div style="font-family:${BODY};font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#D6E3F5;">${esc(kind.eyebrow)}</div>
            <div class="h1" style="font-family:${HEAD};font-size:28px;line-height:1.25;font-weight:800;color:#ffffff;margin-top:8px;">${esc(kind.title)}</div>
            <div style="font-family:${BODY};font-size:15px;line-height:1.6;color:#E6EEF9;margin-top:8px;">From <strong style="color:#ffffff;">${esc(sub.name)}</strong> · ${esc(when)}</div>
          </td></tr>
        </table>
      </td></tr>

      <!-- Actions -->
      <tr><td class="px" style="padding:20px 32px 6px;">
        <table role="presentation" cellpadding="0" cellspacing="0" class="stack"><tr>
          ${button(telHref(sub.phone), `Call ${esc(firstName)}`, true)}
          ${button(`mailto:${sub.email}?subject=${encodeURIComponent(replySubject)}`, "Reply by email", false)}        </tr></table>
      </td></tr>

      <!-- Details -->
      <tr><td class="px" style="padding:10px 32px 0;">
        <div style="font-family:${HEAD};font-size:18px;font-weight:800;color:${C.ink};margin:0 0 10px;">Details</div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.surface};border:1px solid ${C.border};border-radius:12px;">
          ${rows.map(([k, v], i) => row(k, v, i === rows.length - 1)).join("")}
        </table>
      </td></tr>

      ${notes ? `
      <!-- Message / notes -->
      <tr><td class="px" style="padding:24px 32px 0;">
        <div style="font-family:${HEAD};font-size:18px;font-weight:800;color:${C.ink};margin:0 0 10px;">${esc(notesLabel)}</div>
        <div style="background:${C.surface};border:1px solid ${C.border};border-left:4px solid ${C.blue};border-radius:12px;padding:18px 20px;font-family:${BODY};font-size:16px;line-height:1.65;color:${C.text};">${nl2br(notes)}</div>
      </td></tr>` : ""}

      <!-- Footer -->
      <tr><td class="px" style="padding:28px 32px 30px;">
        <div style="border-top:1px solid ${C.border};padding-top:18px;font-family:${BODY};font-size:12px;line-height:1.6;color:${C.muted};">
          Sent automatically by <a href="${esc(siteUrl)}" style="color:${C.blue};text-decoration:none;font-weight:600;">mintexcare.com</a>.<br>
          This email contains personal information. Please keep it within MintexCare.
        </div>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;

  const text = [
    `${kind.eyebrow}: ${kind.title}`,
    `Received ${when}`,
    "",
    ...rows.map(([k, v]) => `${k}: ${v.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'")}`),
    ...(notes ? ["", `${notesLabel}:`, notes] : []),
  ].join("\n");

  return { subject: subject, html: html, text: text };
}
