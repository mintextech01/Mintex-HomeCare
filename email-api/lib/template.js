/**
 * Branded email for a new website submission, styled like mintexcare.com (ink headings, indigo
 * highlights, lavender pill buttons, light-grey cards, Poppins / Montserrat).
 *
 * Email clients only support simple HTML: tables for layout, inline styles, no SVG, no CSS
 * variables. Web fonts load in Apple Mail / iOS / Outlook.com; Gmail falls back to Arial.
 */

const C = {
  ink: "#16161d",        // headings, dark header card
  text: "#3b3b46",
  muted: "#6b6b78",
  indigo: "#5558c4",     // links, highlights
  lavender: "#d5d8fa",   // soft pill buttons
  surface: "#f4f4f6",    // cards
  border: "#e6e6ec",
  page: "#eef0f5",
};
const HEAD = "'Poppins', 'Montserrat', Arial, Helvetica, sans-serif";
const BODY = "'Montserrat', Arial, Helvetica, sans-serif";

const esc = (s) => String(s ?? "")
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

const row = (label, valueHtml, last = false) => `
  <tr>
    <td style="padding:14px 20px;${last ? "" : `border-bottom:1px solid ${C.border};`}font-family:${BODY};font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:${C.muted};width:38%;vertical-align:top;">${esc(label)}</td>
    <td style="padding:14px 20px;${last ? "" : `border-bottom:1px solid ${C.border};`}font-family:${BODY};font-size:15px;line-height:1.5;color:${C.ink};font-weight:600;vertical-align:top;">${valueHtml}</td>
  </tr>`;

const button = (href, label, dark) => `
  <td style="padding:0 8px 10px 0;">
    <a href="${esc(href)}" style="display:inline-block;padding:12px 20px;border-radius:999px;font-family:${BODY};font-size:14px;font-weight:700;text-decoration:none;${dark ? `background:${C.ink};color:#ffffff;` : `background:${C.lavender};color:${C.ink};`}">${label}</a>
  </td>`;

/** logoSrc: image address for the logo, e.g. "cid:mintexcare-logo" (embedded in the email). */
export const renderEmail = (sub, { siteUrl, logoSrc, receivedAt = new Date() }) => {
  const kind = kindOf(sub);
  const { rows: extraRows, notes, notesLabel } = parseMessage(sub, kind);
  const firstName = String(sub.name || "").trim().split(/\s+/)[0] || "them";
  const when = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York", weekday: "short", month: "short", day: "numeric",
    year: "numeric", hour: "numeric", minute: "2-digit", timeZoneName: "short",
  }).format(receivedAt);

  const rows = [
    ["Name", esc(sub.name)],
    ["Phone", `<a href="${esc(telHref(sub.phone))}" style="color:${C.indigo};text-decoration:none;">${esc(sub.phone)}</a>`],
    ["Email", `<a href="mailto:${esc(sub.email)}" style="color:${C.indigo};text-decoration:none;word-break:break-all;">${esc(sub.email)}</a>`],
  ];
  if (kind.key === "career") rows.push(["Position", esc(sub.position || sub.service)]);
  else if (kind.key === "staffing") rows.push(["Roles needed", esc(String(sub.service).replace(/^Facility Staffing:\s*/, ""))]);
  else if (sub.service) rows.push([kind.key === "consultation" ? "Type of care" : "Service", esc(sub.service)]);
  for (const [k, v] of extraRows) if (!(kind.key === "staffing" && k === "Roles needed")) rows.push([k, esc(v)]);
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
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet">
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
    <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:#ffffff;border-radius:24px;overflow:hidden;">

      <!-- Logo -->
      <tr><td class="px" style="padding:24px 32px 8px;">
        <a href="${esc(siteUrl)}" style="text-decoration:none;"><img src="${esc(logoSrc)}" width="150" alt="MintexCare" style="display:block;width:150px;height:auto;border:0;"></a>
      </td></tr>

      <!-- Header card (like the site's "Tell us how we can help" box) -->
      <tr><td class="px" style="padding:12px 24px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.ink};border-radius:20px;">
          <tr><td style="padding:26px 28px;">
            <div style="font-family:${BODY};font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#b9bcf3;">${esc(kind.eyebrow)}</div>
            <div class="h1" style="font-family:${HEAD};font-size:28px;line-height:1.2;font-weight:700;color:#ffffff;margin-top:8px;">${esc(kind.title)}</div>
            <div style="font-family:${BODY};font-size:14px;line-height:1.6;color:#c9c9d3;margin-top:8px;">From <strong style="color:#ffffff;">${esc(sub.name)}</strong> · ${esc(when)}</div>
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
        <div style="font-family:${HEAD};font-size:16px;font-weight:700;color:${C.ink};margin:0 0 10px;">Details</div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.surface};border-radius:16px;">
          ${rows.map(([k, v], i) => row(k, v, i === rows.length - 1)).join("")}
        </table>
      </td></tr>

      ${notes ? `
      <!-- Message / notes -->
      <tr><td class="px" style="padding:24px 32px 0;">
        <div style="font-family:${HEAD};font-size:16px;font-weight:700;color:${C.ink};margin:0 0 10px;">${esc(notesLabel)}</div>
        <div style="background:${C.surface};border-radius:16px;border-left:4px solid ${C.indigo};padding:18px 20px;font-family:${BODY};font-size:15px;line-height:1.65;color:${C.text};">${nl2br(notes)}</div>
      </td></tr>` : ""}

      <!-- Footer -->
      <tr><td class="px" style="padding:28px 32px 30px;">
        <div style="border-top:1px solid ${C.border};padding-top:18px;font-family:${BODY};font-size:12px;line-height:1.6;color:${C.muted};">
          Sent automatically by <a href="${esc(siteUrl)}" style="color:${C.indigo};text-decoration:none;font-weight:600;">mintexcare.com</a>.<br>
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

  return { subject, html, text };
};
