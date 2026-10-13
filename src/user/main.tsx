import { createRoot, hydrateRoot } from "react-dom/client";
import App, { preloadPage } from "./App.tsx";
import { isPrerendered } from "./prerender";
import "../index.css";

const container = document.getElementById("root")!;

const start = async () => {
  if (isPrerendered) {
    // Prerendered pages only start this script after their first paint (scripts/prerender.mjs).
    // Load this page's code first, then let React take over the existing HTML (hydrate) instead of
    // rebuilding it: no flash, no second "largest paint", much less work on phones. The page was
    // built with the same site data (window.__SITE_DATA__, see AdminContext). If something still
    // differs, React re-renders that part by itself.
    await preloadPage(window.location.pathname).catch(() => {});
    hydrateRoot(container, <App />);
    return;
  }
  createRoot(container).render(<App />);
};

start();
