import { createRoot } from "react-dom/client";
import { MotionGlobalConfig } from "framer-motion";
import App, { preloadPage } from "./App.tsx";
import { isPrerendered } from "./prerender";
import "../index.css";

const container = document.getElementById("root")!;

// The website has no motion animations: every Framer Motion animation (entrance fades, slide-ins,
// page transitions, carousel slides) jumps straight to its end state. CSS animations are turned
// off in index.css ("Animations are off site-wide").
MotionGlobalConfig.skipAnimations = true;

const start = async () => {
  if (isPrerendered) {
    // Let the browser paint the prerendered page first. When the scripts arrive quickly, Chrome
    // would otherwise run the whole React start-up (hundreds of ms on a phone) before the first
    // paint, delaying First/Largest Contentful Paint for content that is already in the HTML.
    // (Background tabs don't run animation frames, so they skip this.)
    if (document.visibilityState === "visible") {
      await new Promise<void>(resolve => requestAnimationFrame(() => setTimeout(resolve, 0)));
    }
    // Load this page's code before rendering so the prerendered content is replaced by the
    // identical live page in one step (no empty loading state in between).
    await preloadPage(window.location.pathname).catch(() => {});
  }
  createRoot(container).render(<App />);
};

start();
