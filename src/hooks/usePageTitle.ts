import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SERVICE_INDEX } from "@/data/serviceIndex";
import { COUNTIES, TOWNS } from "@/data/areas";
import { BLOG_POSTS } from "@/data/blog";

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  /** Breadcrumb label; omitted for the homepage (a one-item trail is not useful). */
  crumb?: string;
  /** Middle breadcrumb level(s) for deeper pages (e.g. Home › Services › Personal Care). */
  parent?: { name: string; url: string } | { name: string; url: string }[];
  /** Keep out of search results (e.g. the thank-you page). */
  noindex?: boolean;
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
      "Meet MintexCare, a home healthcare agency in Edison, NJ caring for families across 12 New Jersey counties, from Middlesex and Monmouth to Bergen and Ocean.",
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
  "/privacy-policy": {
    title: "Privacy Policy | MintexCare",
    description:
      "How MintexCare collects, uses and protects information from website visitors, families requesting care and job applicants.",
    canonical: "https://mintexcare.com/privacy-policy",
    crumb: "Privacy Policy",
  },
  "/terms": {
    title: "Terms of Service | MintexCare",
    description: "Terms of Service for using the MintexCare website, forms and job listings.",
    canonical: "https://mintexcare.com/terms",
    crumb: "Terms of Service",
  },
  "/hipaa-notice": {
    title: "HIPAA Notice of Privacy Practices | MintexCare",
    description:
      "How MintexCare may use and disclose your health information, your rights under HIPAA and how to file a complaint.",
    canonical: "https://mintexcare.com/hipaa-notice",
    crumb: "HIPAA Notice",
  },
  "/accessibility": {
    title: "Accessibility Statement | MintexCare",
    description:
      "MintexCare's commitment to an accessible website, the features available and how to get help if something isn't working for you.",
    canonical: "https://mintexcare.com/accessibility",
    crumb: "Accessibility",
  },
  "/non-discrimination": {
    title: "Non-Discrimination Notice | MintexCare",
    description:
      "MintexCare does not discriminate in care or employment. Free language and communication aids, and how to file a grievance.",
    canonical: "https://mintexcare.com/non-discrimination",
    crumb: "Non-Discrimination",
  },
  "/facility-staffing": {
    title: "Healthcare Facility Staffing in NJ | HHA, CNA, LPN, RN | MintexCare",
    description:
      "Screened home health aides, CNAs, LPNs and RNs for New Jersey nursing homes, assisted living, rehab and long-term care facilities. Per diem to long-term staffing.",
    canonical: "https://mintexcare.com/facility-staffing",
    crumb: "Facility Staffing",
  },
  "/facility-staffing/roles": {
    title: "HHA, CNA, LPN & RN Staffing Roles | MintexCare",
    description:
      "The aide and nurse roles MintexCare staffs for New Jersey facilities: typical duties, settings and the credentials we verify for HHAs, CNAs, LPNs and RNs.",
    canonical: "https://mintexcare.com/facility-staffing/roles",
    crumb: "Roles",
    parent: { name: "Facility Staffing", url: "https://mintexcare.com/facility-staffing" },
  },
  "/facility-staffing/request-staff": {
    title: "Request Facility Staff | MintexCare Staffing NJ",
    description:
      "Request home health aides, CNAs, LPNs or RNs for your New Jersey facility. Tell us the roles, shifts and start date and our staffing team will follow up.",
    canonical: "https://mintexcare.com/facility-staffing/request-staff",
    crumb: "Request Staff",
    parent: { name: "Facility Staffing", url: "https://mintexcare.com/facility-staffing" },
  },
  "/resources": {
    title: "Home Care Resources & Help for NJ Families | MintexCare",
    description:
      "Guides and answers for families planning home care in New Jersey: how home care works, frequently asked questions, services and areas. Search the MintexCare site.",
    canonical: "https://mintexcare.com/resources",
    crumb: "Resources",
  },
  "/how-it-works": {
    title: "How Home Care Works | Getting Started | MintexCare",
    description:
      "How getting home care with MintexCare works: a free consultation, a free in-home assessment, a personalized care plan and caregiver match, then ongoing nurse-supervised care.",
    canonical: "https://mintexcare.com/how-it-works",
    crumb: "How It Works",
    parent: { name: "Resources", url: "https://mintexcare.com/resources" },
  },
  "/faq": {
    title: "Home Care FAQ | Questions & Answers | MintexCare NJ",
    description:
      "Answers to common questions about MintexCare home care in New Jersey: getting started, services, caregivers, scheduling, service area, costs and facility staffing.",
    canonical: "https://mintexcare.com/faq",
    crumb: "FAQ",
    parent: { name: "Resources", url: "https://mintexcare.com/resources" },
  },
  "/about/why-mintexcare": {
    title: "Why MintexCare | Licensed, Nurse-Supervised Home Care in NJ",
    description:
      "Why families trust MintexCare: licensed by the State of New Jersey, bonded and insured, RN-supervised care plans, a 7-step caregiver screening and support 24/7.",
    canonical: "https://mintexcare.com/about/why-mintexcare",
    crumb: "Why MintexCare",
    parent: { name: "About", url: "https://mintexcare.com/about" },
  },
  "/reviews": {
    title: "Reviews & Testimonials | What Families Say | MintexCare",
    description:
      "Read what New Jersey families say about MintexCare's home care, caregivers and nurses. 500+ families served, available 24/7.",
    canonical: "https://mintexcare.com/reviews",
    crumb: "Reviews",
    parent: { name: "About", url: "https://mintexcare.com/about" },
  },
  "/paying-for-care": {
    title: "Paying for Home Care in NJ | Costs & Payment | MintexCare",
    description:
      "How much home care costs in New Jersey and how families pay for it. Free consultation and a written quote before care starts, with no obligation.",
    canonical: "https://mintexcare.com/paying-for-care",
    crumb: "Costs & Payment",
  },
  "/paying-for-care/cost": {
    title: "Cost of Home Care in New Jersey | MintexCare",
    description:
      "What affects the cost of home care in NJ: type of care, hours, nights and weekends, live-in or 24-hour care and nursing. See typical care plans and get a free quote.",
    canonical: "https://mintexcare.com/paying-for-care/cost",
    crumb: "Cost of Home Care",
    parent: { name: "Costs & Payment", url: "https://mintexcare.com/paying-for-care" },
  },
  "/paying-for-care/private-pay": {
    title: "Private Pay Home Care in NJ | Payment Options | MintexCare",
    description:
      "Paying privately for home care with MintexCare: flexible hours, no waiting for approvals, and easy payment by check, card, ACH bank transfer, Zelle or cash.",
    canonical: "https://mintexcare.com/paying-for-care/private-pay",
    crumb: "Private Pay",
    parent: { name: "Costs & Payment", url: "https://mintexcare.com/paying-for-care" },
  },
  "/resources/guides": {
    title: "Family Guides & Checklists for Home Care | MintexCare",
    description:
      "Free printable checklists for families: home safety, hospital discharge, questions to ask a home care agency, and signs a family caregiver needs a break.",
    canonical: "https://mintexcare.com/resources/guides",
    crumb: "Family Guides",
    parent: { name: "Resources", url: "https://mintexcare.com/resources" },
  },
  "/blog": {
    title: "Care Articles & Advice for Families | MintexCare Blog",
    description:
      "Practical articles for families caring for an aging parent or a loved one recovering at home: warning signs, hospital discharge, home care vs. assisted living.",
    canonical: "https://mintexcare.com/blog",
    crumb: "Care Articles",
    parent: { name: "Resources", url: "https://mintexcare.com/resources" },
  },
  ...Object.fromEntries(BLOG_POSTS.map(p => [`/blog/${p.slug}`, {
    title: `${p.title} | MintexCare`,
    description: p.description,
    canonical: `https://mintexcare.com/blog/${p.slug}`,
    crumb: p.title,
    parent: [
      { name: "Resources", url: "https://mintexcare.com/resources" },
      { name: "Care Articles", url: "https://mintexcare.com/blog" },
    ],
  }])),
  "/careers/jobs": {
    title: "Open Positions | Caregiver & Nursing Jobs in NJ | MintexCare",
    description:
      "Current openings at MintexCare for Home Health Aides, CNAs, LPNs, RNs and caregivers in New Jersey. See pay, requirements and apply online.",
    canonical: "https://mintexcare.com/careers/jobs",
    crumb: "Open Positions",
    parent: { name: "Careers", url: "https://mintexcare.com/careers" },
  },
  "/careers/apply": {
    title: "Apply Online | Caregiver & Nursing Jobs | MintexCare",
    description:
      "Apply online for a caregiver or nursing job with MintexCare in New Jersey. It takes a few minutes; a resume is optional. We respond within 3–5 business days.",
    canonical: "https://mintexcare.com/careers/apply",
    crumb: "Apply Online",
    parent: { name: "Careers", url: "https://mintexcare.com/careers" },
  },
  "/careers/thank-you": {
    title: "Application Received | MintexCare Careers",
    description: "Thank you for applying to MintexCare. Our hiring team will review your application.",
    canonical: "https://mintexcare.com/careers/thank-you",
    crumb: "Application Received",
    parent: { name: "Careers", url: "https://mintexcare.com/careers" },
    noindex: true,
  },
  "/free-consultation": {
    title: "Free Home Care Consultation | MintexCare NJ",
    description:
      "Request a free, no-obligation home care consultation with MintexCare. Tell us who needs care and a care coordinator will call you and arrange a free in-home assessment.",
    canonical: "https://mintexcare.com/free-consultation",
    crumb: "Free Consultation",
  },
  "/thank-you": {
    title: "Thank You | MintexCare",
    description: "Thank you for contacting MintexCare. Our team will be in touch shortly.",
    canonical: "https://mintexcare.com/thank-you",
    crumb: "Thank You",
    noindex: true,
  },
  "/areas-we-serve": {
    title: "Areas We Serve | Home Care in 12 NJ Counties | MintexCare",
    description:
      "MintexCare provides home care and skilled nursing across 12 New Jersey counties, from Middlesex, Monmouth and Somerset to Bergen, Essex, Ocean and Burlington. Find your town.",
    canonical: "https://mintexcare.com/areas-we-serve",
    crumb: "Areas We Serve",
  },
  ...Object.fromEntries(COUNTIES.map(c => [`/areas-we-serve/${c.slug}`, {
    title: `Home Care in ${c.name} County, NJ | MintexCare`,
    description: `In-home care and skilled nursing in ${c.name} County, NJ, including ${c.towns.slice(0, 3).join(", ")} and nearby towns. Personal care, live-in care, nursing and more. Call (732) 268-5112.`,
    canonical: `https://mintexcare.com/areas-we-serve/${c.slug}`,
    crumb: `${c.name} County`,
    parent: { name: "Areas We Serve", url: "https://mintexcare.com/areas-we-serve" },
  }])),
  ...Object.fromEntries(TOWNS.map(t => {
    const county = COUNTIES.find(c => c.slug === t.countySlug)!;
    return [`/areas-we-serve/${t.slug}`, {
      title: `Home Care in ${t.name}, NJ | In-Home Care & Nursing | MintexCare`,
      description: `In-home care and skilled nursing in ${t.name}, NJ (${t.zips[0]}): personal care, companion care, live-in care and nursing at home from ${t.slug === "edison-nj" ? "our Edison office" : "nearby Edison"}. Free consultation: (732) 268-5112.`,
      canonical: `https://mintexcare.com/areas-we-serve/${t.slug}`,
      crumb: t.name,
      parent: [
        { name: "Areas We Serve", url: "https://mintexcare.com/areas-we-serve" },
        { name: `${county.name} County`, url: `https://mintexcare.com/areas-we-serve/${county.slug}` },
      ],
    }];
  })),
  ...Object.fromEntries(SERVICE_INDEX.map(s => [`/services/${s.slug}`, {
    title: s.metaTitle,
    description: s.metaDescription,
    canonical: `https://mintexcare.com/services/${s.slug}`,
    crumb: s.name,
    parent: { name: "Services", url: "https://mintexcare.com/services" },
  }])),
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
      { name: "Home", item: "https://mintexcare.com/" },
      ...[meta.parent ?? []].flat().map(p => ({ name: p.name, item: p.url })),
      { name: meta.crumb, item: meta.canonical },
    ].map((c, i) => ({ "@type": "ListItem", "position": i + 1, ...c })),
  });
  document.head.appendChild(script);
};

const INDEXABLE_ROBOTS = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

/** Sets title, description, robots, canonical, breadcrumb and social tags for a page. */
export const applyPageMeta = (meta: PageMeta) => {
  document.title = meta.title;
  setMeta("robots", meta.noindex ? "noindex, follow" : INDEXABLE_ROBOTS);
  setMeta("description", meta.description);
  setCanonical(meta.canonical);
  setBreadcrumb(meta);
  setMeta("og:title", meta.title, true);
  setMeta("og:description", meta.description, true);
  setMeta("og:url", meta.canonical, true);
  setMeta("twitter:title", meta.title);
  setMeta("twitter:description", meta.description);
};

/** Pages whose tags depend on live data set them themselves with applyPageMeta (job detail pages). */
const SELF_MANAGED_PREFIXES = ["/careers/jobs/"];

const usePageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    if (SELF_MANAGED_PREFIXES.some(p => location.pathname.startsWith(p))) return;
    const known = pageMeta[location.pathname];

    // Unknown route = in-app 404: keep it out of search results and don't canonicalize the junk URL.
    if (!known) {
      document.title = "Page Not Found | MintexCare";
      setMeta("robots", "noindex, follow");
      document.querySelector('link[rel="canonical"]')?.remove();
      document.getElementById(BREADCRUMB_ID)?.remove();
      return;
    }

    applyPageMeta(known);
  }, [location.pathname]);
};

export default usePageTitle;
