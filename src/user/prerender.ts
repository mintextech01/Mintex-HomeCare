/**
 * True when this page load started from build-time prerendered HTML (scripts/prerender.mjs).
 * Evaluated once at startup, before React replaces the prerendered markup.
 */
export const isPrerendered =
  typeof document !== "undefined" && !!document.getElementById("root")?.hasChildNodes();
