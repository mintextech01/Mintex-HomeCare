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
    title: "MintexCare | Compassionate Home Care Services in New Jersey",
    description:
      "Trusted home healthcare agency in New Jersey providing personal care, skilled nursing, companion care, and post-surgery care. Serving Middlesex, Monmouth, Somerset, Union & Mercer counties. Available 24/7. Call (732) 268-5112.",
    canonical: "https://mintexcare.com/",
  },
  "/about": {
    title: "About MintexCare | Our Mission & Compassionate Care Team in NJ",
    description:
      "Learn about MintexCare's mission to deliver compassionate, personalized home healthcare across New Jersey. Meet our experienced care team dedicated to improving lives.",
    canonical: "https://mintexcare.com/about",
    crumb: "About",
  },
  "/services": {
    title: "Home Care Services in New Jersey | MintexCare",
    description:
      "Explore MintexCare's full range of home healthcare services in NJ: personal care, companion care, skilled nursing, post-surgery care, respite care, live-in care, and meal preparation.",
    canonical: "https://mintexcare.com/services",
    crumb: "Services",
  },
  "/careers": {
    title: "Careers at MintexCare | Join Our Home Care Team in New Jersey",
    description:
      "Looking for a rewarding healthcare career in New Jersey? Join the MintexCare team as a caregiver, nurse, or support staff. Apply today and make a real difference.",
    canonical: "https://mintexcare.com/careers",
    crumb: "Careers",
  },
  "/contact": {
    title: "Contact MintexCare | Get Home Care in New Jersey Today",
    description:
      "Contact MintexCare to discuss home healthcare options for your loved one in New Jersey. Call (732) 268-5112 or fill out our form for a free consultation. Available 24/7.",
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
