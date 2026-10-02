import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense, useEffect, type ComponentType } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminProvider } from "@/contexts/AdminContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import PageTransition from "@/components/PageTransition";
import usePageTitle from "@/hooks/usePageTitle";
import { isPrerendered } from "./prerender";
import Index from "./pages/Index";

// Inner pages are split into their own chunks and only downloaded when visited.
// preload() lets main.tsx load the current page's chunk *before* the first render, so a
// prerendered page is never replaced by the empty Suspense fallback while its chunk downloads.
const lazyPage = (load: () => Promise<{ default: ComponentType }>) => {
  let Loaded: ComponentType | null = null;
  const preload = () => load().then(m => { Loaded = m.default; });
  const Lazy = lazy(() => load().then(m => { Loaded = m.default; return m; }));
  const Page = () => (Loaded ? <Loaded /> : <Lazy />);
  return Object.assign(Page, { preload });
};

const Services = lazyPage(() => import("./pages/Services"));
const About = lazyPage(() => import("./pages/About"));
const Careers = lazyPage(() => import("./pages/Careers"));
const Contact = lazyPage(() => import("./pages/Contact"));
const NotFound = lazyPage(() => import("./pages/NotFound"));

const pagesByPath: Record<string, { preload: () => Promise<void> }> = {
  "/services": Services,
  "/about": About,
  "/careers": Careers,
  "/contact": Contact,
};

/** Loads the chunk for `path` (the homepage is already in the main bundle). */
export const preloadPage = (path: string) =>
  path === "/" ? Promise.resolve() : (pagesByPath[path] ?? NotFound).preload();

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  usePageTitle();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Suspense fallback={<div className="min-h-[100svh]" />}>
      {/* initial={false} on a prerendered load: the first page is already on screen, so it must
          not fade in from opacity 0 again when React takes over. Later navigations animate. */}
      <AnimatePresence mode="wait" initial={!isPrerendered}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Index /></PageTransition>} />
          <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/careers" element={<PageTransition><Careers /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />

          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
    <TooltipProvider>
      <AdminProvider mode="public">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </AdminProvider>
    </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
