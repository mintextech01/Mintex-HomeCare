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
import { SERVICE_PATHS } from "@/data/serviceIndex";
import { STAFFING_PATHS } from "@/data/staffing";
import { AREA_PATHS } from "@/data/areas";
import { CAREERS_PATHS, JOB_PATH_PREFIX } from "@/data/careers";
import { BLOG_PATHS } from "@/data/blog";
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
const Legal = lazyPage(() => import("./pages/Legal"));
const ServiceDetail = lazyPage(() => import("./pages/ServiceDetail"));
const FacilityStaffing = lazyPage(() => import("./pages/FacilityStaffing"));
const Areas = lazyPage(() => import("./pages/Areas"));
const Consultation = lazyPage(() => import("./pages/Consultation"));
const CareersFlow = lazyPage(() => import("./pages/CareersFlow"));
const Resources = lazyPage(() => import("./pages/Resources"));
const Blog = lazyPage(() => import("./pages/Blog"));
const Payment = lazyPage(() => import("./pages/Payment"));

const PAYMENT_PATHS = ["/paying-for-care", "/paying-for-care/cost", "/paying-for-care/private-pay"];

const LEAD_PATHS = ["/free-consultation", "/thank-you"];
const RESOURCE_PATHS = ["/resources", "/how-it-works", "/faq", "/resources/guides"];

const LEGAL_PATHS = ["/privacy-policy", "/terms", "/hipaa-notice", "/accessibility", "/non-discrimination"];

const pagesByPath: Record<string, { preload: () => Promise<void> }> = {
  "/services": Services,
  "/about": About,
  "/careers": Careers,
  "/contact": Contact,
  ...Object.fromEntries(LEGAL_PATHS.map(p => [p, Legal])),
  ...Object.fromEntries(SERVICE_PATHS.map(p => [p, ServiceDetail])),
  ...Object.fromEntries(STAFFING_PATHS.map(p => [p, FacilityStaffing])),
  ...Object.fromEntries(AREA_PATHS.map(p => [p, Areas])),
  ...Object.fromEntries(LEAD_PATHS.map(p => [p, Consultation])),
  ...Object.fromEntries(CAREERS_PATHS.map(p => [p, CareersFlow])),
  ...Object.fromEntries(RESOURCE_PATHS.map(p => [p, Resources])),
  ...Object.fromEntries(BLOG_PATHS.map(p => [p, Blog])),
  ...Object.fromEntries(PAYMENT_PATHS.map(p => [p, Payment])),
};

const pageForPath = (path: string) =>
  pagesByPath[path] ?? (path.startsWith(JOB_PATH_PREFIX) ? CareersFlow : NotFound);

/** Loads the chunk for `path` (the homepage is already in the main bundle). */
export const preloadPage = (path: string) =>
  path === "/" ? Promise.resolve() : pageForPath(path).preload();

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
          {LEGAL_PATHS.map(p => (
            <Route key={p} path={p} element={<PageTransition><Legal /></PageTransition>} />
          ))}
          {SERVICE_PATHS.map(p => (
            <Route key={p} path={p} element={<PageTransition><ServiceDetail /></PageTransition>} />
          ))}
          {STAFFING_PATHS.map(p => (
            <Route key={p} path={p} element={<PageTransition><FacilityStaffing /></PageTransition>} />
          ))}
          {AREA_PATHS.map(p => (
            <Route key={p} path={p} element={<PageTransition><Areas /></PageTransition>} />
          ))}
          {LEAD_PATHS.map(p => (
            <Route key={p} path={p} element={<PageTransition><Consultation /></PageTransition>} />
          ))}
          {CAREERS_PATHS.map(p => (
            <Route key={p} path={p} element={<PageTransition><CareersFlow /></PageTransition>} />
          ))}
          <Route path={`${JOB_PATH_PREFIX}:slug`} element={<PageTransition><CareersFlow /></PageTransition>} />
          {RESOURCE_PATHS.map(p => (
            <Route key={p} path={p} element={<PageTransition><Resources /></PageTransition>} />
          ))}
          {BLOG_PATHS.map(p => (
            <Route key={p} path={p} element={<PageTransition><Blog /></PageTransition>} />
          ))}
          {PAYMENT_PATHS.map(p => (
            <Route key={p} path={p} element={<PageTransition><Payment /></PageTransition>} />
          ))}

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
