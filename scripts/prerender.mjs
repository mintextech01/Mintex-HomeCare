/**
 * Build-time prerendering for the public site (runs after `vite build`).
 *
 * Opens each public route of the built app in headless Chromium, waits for the live
 * content (Firestore data, per-page title/canonical/JSON-LD) and saves the rendered HTML:
 *   /         -> dist/index.html
 *   /about    -> dist/about.html    (Firebase "cleanUrls" serves it at /about)
 *   ...
 * Search engines, AI crawlers and link previews then get real content without running JS;
 * in the browser, src/user/main.tsx takes over the prerendered page.
 *
 * If prerendering fails, the build still succeeds and the site works as a normal SPA.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");

// `title`: the page's <title> must start with this (set by src/hooks/usePageTitle.ts) before
// the snapshot is taken, which confirms the route rendered. Keep in sync with usePageTitle.
const ROUTES = [
  { path: "/", file: "index.html", title: "Home Care in Edison, NJ" },
  { path: "/about", file: "about.html", title: "About MintexCare" },
  { path: "/services", file: "services.html", title: "Home Care Services in Edison" },
  { path: "/careers", file: "careers.html", title: "Caregiver & Nursing Jobs" },
  { path: "/contact", file: "contact.html", title: "Contact MintexCare" },
  { path: "/privacy-policy", file: "privacy-policy.html", title: "Privacy Policy" },
  { path: "/terms", file: "terms.html", title: "Terms of Service" },
  { path: "/hipaa-notice", file: "hipaa-notice.html", title: "HIPAA Notice" },
  { path: "/accessibility", file: "accessibility.html", title: "Accessibility Statement" },
  { path: "/non-discrimination", file: "non-discrimination.html", title: "Non-Discrimination" },
  // Individual service pages (keep in sync with src/data/serviceIndex.ts and firebase.json).
  ...[
    ["personal-care", "In-Home Personal Care"],
    ["companion-care", "Companion Care"],
    ["hourly-care", "Hourly Home Care"],
    ["live-in-24-hour-care", "Live-In & 24-Hour"],
    ["respite-care", "Respite Care"],
    ["post-surgery-care", "Post-Surgery"],
    ["skilled-nursing", "Skilled Nursing"],
    ["therapy-support", "Rehab & Therapy"],
    ["wound-care-iv-therapy", "Wound Care & IV"],
    ["medication-management", "Medication Management"],
  ].map(([slug, title]) => ({ path: `/services/${slug}`, file: `services/${slug}.html`, title })),
  { path: "/facility-staffing", file: "facility-staffing.html", title: "Healthcare Facility Staffing" },
  { path: "/facility-staffing/roles", file: "facility-staffing/roles.html", title: "HHA, CNA, LPN & RN" },
  { path: "/facility-staffing/request-staff", file: "facility-staffing/request-staff.html", title: "Request Facility Staff" },
  // Areas We Serve hub + county pages (keep in sync with src/data/areas.ts and firebase.json).
  { path: "/areas-we-serve", file: "areas-we-serve.html", title: "Areas We Serve" },
  ...["Middlesex", "Monmouth", "Somerset", "Union", "Mercer", "Essex", "Bergen", "Hudson", "Passaic", "Morris", "Ocean", "Burlington"]
    .map(name => {
      const slug = `${name.toLowerCase()}-county`;
      return { path: `/areas-we-serve/${slug}`, file: `areas-we-serve/${slug}.html`, title: `Home Care in ${name} County` };
    }),
  // Town pages (Phase 2; keep in sync with TOWNS in src/data/areas.ts and firebase.json).
  ...[
    ["edison-nj", "Edison"], ["metuchen-nj", "Metuchen"], ["woodbridge-nj", "Woodbridge"], ["new-brunswick-nj", "New Brunswick"],
    ["piscataway-nj", "Piscataway"], ["east-brunswick-nj", "East Brunswick"], ["south-plainfield-nj", "South Plainfield"],
  ].map(([slug, name]) => ({ path: `/areas-we-serve/${slug}`, file: `areas-we-serve/${slug}.html`, title: `Home Care in ${name}, NJ` })),
  { path: "/free-consultation", file: "free-consultation.html", title: "Free Home Care Consultation" },
  { path: "/thank-you", file: "thank-you.html", title: "Thank You", minWords: 30 },
  // Any unknown path renders the 404 page; Firebase Hosting serves dist/404.html for missing URLs.
  { path: "/this-page-does-not-exist", file: "404.html", title: "Page Not Found", minWords: 30 },
  // Careers flow. Job pages (/careers/jobs/{slug}) are live data and use dist/spa.html instead.
  { path: "/careers/jobs", file: "careers/jobs.html", title: "Open Positions" },
  { path: "/careers/apply", file: "careers/apply.html", title: "Apply Online" },
  { path: "/careers/thank-you", file: "careers/thank-you.html", title: "Application Received", minWords: 30 },
  // Resources
  { path: "/resources", file: "resources.html", title: "Home Care Resources" },
  { path: "/how-it-works", file: "how-it-works.html", title: "How Home Care Works" },
  { path: "/faq", file: "faq.html", title: "Home Care FAQ" },
  { path: "/resources/guides", file: "resources/guides.html", title: "Family Guides & Checklists" },
  // Costs & Payment
  { path: "/paying-for-care", file: "paying-for-care.html", title: "Paying for Home Care" },
  { path: "/paying-for-care/cost", file: "paying-for-care/cost.html", title: "Cost of Home Care" },
  { path: "/paying-for-care/private-pay", file: "paying-for-care/private-pay.html", title: "Private Pay Home Care" },
  // Blog (keep in sync with BLOG_POSTS in src/data/blog.ts and firebase.json)
  { path: "/blog", file: "blog.html", title: "Care Articles" },
  ...[
    ["signs-aging-parent-needs-help-at-home", "10 Signs Your Aging Parent"],
    ["hospital-to-home-family-checklist", "Coming Home From the Hospital"],
    ["home-care-or-assisted-living", "Home Care or Assisted Living"],
  ].map(([slug, title]) => ({ path: `/blog/${slug}`, file: `blog/${slug}.html`, title })),
];

// Same 1x1 placeholder the app uses while an admin-uploaded image loads (see siteImageConfig.ts).
// Uploaded images are base64 data URIs; inlining them would make each HTML file ~1 MB.
const PENDING_IMAGE = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
const DATA_IMAGE = /data:image\/[a-zA-Z0-9.+-]+;base64,[A-Za-z0-9+/=]+/g;

const warn = (msg) => console.warn(`\n⚠  prerender: ${msg}\n   The site will still work, but pages are served without prerendered HTML.\n`);

/**
 * dist/spa.html: the plain app shell (no prerendered content) for pages whose content is live data
 * and can't be prerendered — the job pages at /careers/jobs/{slug} (see firebase.json). Written
 * first, from Vite's untouched index.html, so it exists even if prerendering below fails. The
 * homepage's canonical/og:url are removed; the job page sets its own when it renders.
 */
const writeSpaShell = async () => {
  const shell = (await readFile(path.join(DIST, "index.html"), "utf8"))
    .replace(/\s*<link rel="canonical"[^>]*>/, "")
    .replace(/\s*<meta property="og:url"[^>]*>/, "")
    .replace(/<title>[^<]*<\/title>/, "<title>Careers | MintexCare</title>");
  await writeFile(path.join(DIST, "spa.html"), shell, "utf8");
};

/** Adds the open job pages found on /careers/jobs to dist/sitemap.xml (jobs change in Admin, so they aren't in public/). */
const addJobsToSitemap = async (jobPaths) => {
  if (jobPaths.length === 0) return;
  const file = path.join(DIST, "sitemap.xml");
  const xml = await readFile(file, "utf8");
  const today = new Date().toISOString().slice(0, 10);
  const entries = jobPaths.map((p) => `  <url><loc>https://mintexcare.com${p}</loc><lastmod>${today}</lastmod></url>`).join("\n");
  await writeFile(file, xml.replace("</urlset>", `${entries}\n</urlset>`), "utf8");
  console.log(`✓ sitemap.xml: added ${jobPaths.length} job page(s)`);
};

const main = async () => {
  await writeSpaShell();
  let chromium, preview;
  try {
    ({ chromium } = await import("playwright"));
    ({ preview } = await import("vite"));
  } catch (err) {
    warn(`could not load playwright/vite (${err.message}).`);
    return;
  }

  const server = await preview({ root: ROOT, logLevel: "error", preview: { port: 4325, strictPort: false, open: false } });
  const baseUrl = (server.resolvedUrls?.local?.[0] ?? "http://localhost:4325/").replace(/\/$/, "");
  let browser;
  const pages = [];
  let jobPaths = [];
  try {
    browser = await chromium.launch();
    for (const route of ROUTES) {
      const page = await browser.newPage({ viewport: { width: 1350, height: 900 } });
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto(baseUrl + route.path, { waitUntil: "load", timeout: 60000 });
      await page.waitForFunction((t) => document.title.startsWith(t), route.title, { timeout: 30000 });
      // Let Firestore content (contact info, services, jobs, testimonials) arrive.
      await page.waitForTimeout(3500);
      // Scroll through the page so scroll-triggered sections render their content visibly,
      // then return to the top so scroll-linked effects are at their initial position.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 600) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 150));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(1500);
      if (errors.length) throw new Error(`${route.path}: ${errors[0]}`);

      const html = await page.evaluate(() => "<!DOCTYPE html>\n" + document.documentElement.outerHTML);
      const words = await page.evaluate(() => document.querySelector("main")?.innerText.split(/\s+/).length ?? 0);
      if (!html.includes('<div id="root"><') || words < (route.minWords ?? 50)) throw new Error(`${route.path}: page did not render (${words} words)`);
      pages.push({ ...route, html: html.replace(DATA_IMAGE, PENDING_IMAGE), words });
      if (route.path === "/careers/jobs") {
        jobPaths = await page.evaluate(() =>
          [...new Set([...document.querySelectorAll('main a[href^="/careers/jobs/"]')].map((a) => a.getAttribute("href")))]);
      }
      await page.close();
    }
  } catch (err) {
    warn(err.message);
    return;
  } finally {
    await browser?.close();
    await new Promise((r) => server.httpServer.close(r));
  }

  // Write only after every route rendered, so a failure never leaves a half-prerendered dist.
  for (const p of pages) {
    const out = path.join(DIST, p.file);
    await mkdir(path.dirname(out), { recursive: true });
    await writeFile(out, p.html, "utf8");
    console.log(`✓ prerendered ${p.path.padEnd(10)} -> dist/${p.file.padEnd(14)} ${String(p.words).padStart(5)} words, ${(p.html.length / 1024).toFixed(0)} KB`);
  }
  await addJobsToSitemap(jobPaths);
};

main().catch((err) => warn(err.message));
