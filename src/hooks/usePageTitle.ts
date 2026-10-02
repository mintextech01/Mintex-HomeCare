import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  /** Breadcrumb label; omitted for the homepage (a one-item trail is not useful). */
  crumb?: string;
}

const pageMeta: Record<string, PageMeta> = {
  "/": {
    title: "Home Care in Edison, NJ | 24/7 In-Home Care | MintexCare",
    description:
      "Home care agency in Edison, NJ: personal care, companion care, skilled nursing and live-in care across Central New Jersey, 24/7. Call (732) 268-5112.",
    canonical: "https://mintexcare.com/",
  },
  "/about": {
    title: "About MintexCare | Home Care Agency in Edison, NJ",
    description:
      "Meet MintexCare, a home healthcare agency in Edison, NJ caring for families across Middlesex, Monmouth, Somerset, Union and Mercer counties.",
    canonical: "https://mintexcare.com/about",
    crumb: "About",
  },
  "/services": {
    title: "Home Care Services in Edison & Central NJ | MintexCare",
    description:
      "Personal care, companion care, skilled nursing, post-surgery, respite and live-in care at home in Edison and Central NJ. Free consultation: (732) 268-5112.",
    canonical: "https://mintexcare.com/services",
    crumb: "Services",
  },
  "/careers": {
    title: "Caregiver & Nursing Jobs in Edison, NJ | MintexCare",
    description:
      "Join MintexCare in Edison, NJ. Openings for Home Health Aides, CNAs, LPNs, RNs and companion caregivers across Central New Jersey. Apply online today.",
    canonical: "https://mintexcare.com/careers",
    crumb: "Careers",
  },
  "/contact": {
    title: "Contact MintexCare | Home Care in Edison, NJ",
    description:
      "Visit MintexCare at 2163 Oak Tree Road, Edison, NJ, call (732) 268-5112, or send a message for a free home care consultation. Available 24/7.",
    canonical: "https://mintexcare.com/contact",
    crumb: "Contact",
  },
};

const setMeta = (name: string, content: string, property = false) => {
  const attr = property ? "property" : "name";
  let tag = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

const setCanonical = (href: string) => {
  let tag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", "canonical");
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", href);
};

const BREADCRUMB_ID = "breadcrumb-schema";

const setBreadcrumb = (meta: PageMeta) => {
  document.getElementById(BREADCRUMB_ID)?.remove();
  if (!meta.crumb) return;
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = BREADCRUMB_ID;
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mintexcare.com/" },
      { "@type": "ListItem", "position": 2, "name": meta.crumb, "item": meta.canonical },
    ],
  });
  document.head.appendChild(script);
};

const INDEXABLE_ROBOTS = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

const usePageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const known = pageMeta[location.pathname];

    // Unknown route = in-app 404: keep it out of search results and don't canonicalize the junk URL.
    if (!known) {
      document.title = "Page Not Found | MintexCare";
      setMeta("robots", "noindex, follow");
      document.querySelector('link[rel="canonical"]')?.remove();
      document.getElementById(BREADCRUMB_ID)?.remove();
      return;
    }

    const meta = known;
    document.title = meta.title;
    setMeta("robots", INDEXABLE_ROBOTS);
    setMeta("description", meta.description);
    setCanonical(meta.canonical);
    setBreadcrumb(meta);
    setMeta("og:title", meta.title, true);
    setMeta("og:description", meta.description, true);
    setMeta("og:url", meta.canonical, true);
    setMeta("twitter:title", meta.title);
    setMeta("twitter:description", meta.description);
  }, [location.pathname]);
};

export default usePageTitle;
