import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

/**
 * Wrapper around each page (keyed by path, so a new page starts fresh).
 * data-page: scripts/prerender.mjs puts React's Suspense markers around this element in the saved
 * HTML, so React can take over (hydrate) the prerendered page.
 */
const PageTransition = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  return (
    <div key={location.pathname} data-page="">
      {children}
    </div>
  );
};

export default PageTransition;
