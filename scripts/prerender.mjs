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
import { writeFile } from "node:fs/promises";
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
];

// Same 1x1 placeholder the app uses while an admin-uploaded image loads (see siteImageConfig.ts).
// Uploaded images are base64 data URIs; inlining them would make each HTML file ~1 MB.
const PENDING_IMAGE = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
const DATA_IMAGE = /data:image\/[a-zA-Z0-9.+-]+;base64,[A-Za-z0-9+/=]+/g;

const warn = (msg) => console.warn(`\n⚠  prerender: ${msg}\n   The site will still work, but pages are served without prerendered HTML.\n`);

const main = async () => {
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
      if (!html.includes('<div id="root"><') || words < 50) throw new Error(`${route.path}: page did not render (${words} words)`);
      pages.push({ ...route, html: html.replace(DATA_IMAGE, PENDING_IMAGE), words });
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
    await writeFile(path.join(DIST, p.file), p.html, "utf8");
    console.log(`✓ prerendered ${p.path.padEnd(10)} -> dist/${p.file.padEnd(14)} ${String(p.words).padStart(5)} words, ${(p.html.length / 1024).toFixed(0)} KB`);
  }
};

main().catch((err) => warn(err.message));
