/**
 * SINGLE SOURCE OF TRUTH for all manageable site images.
 *
 * To add a new image anywhere on the website:
 *  1. Add one entry here (key, default URL, label, description, page, pageUrl)
 *  2. Use  siteImages.<key>  in your component (via useAdmin())
 *  3. Done — it automatically appears in Admin → Site Images with no other changes needed.
 */

export interface SiteImageEntry {
  key: string;
  defaultUrl: string;
  label: string;
  description: string;
  page: string;
  pageUrl: string;
}

export const SITE_IMAGE_REGISTRY: SiteImageEntry[] = [
  // ── Hero Section ──────────────────────────────────────────────────────────
  {
    key: "heroTopLeft",
    defaultUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=500&fit=crop&q=80",
    label: "Top Left",
    description: "Small photo in the top-left corner of the hero image mosaic",
    page: "Homepage — Hero Section",
    pageUrl: "/",
  },
  {
    key: "heroBottomLeft",
    defaultUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=500&fit=crop&q=80",
    label: "Bottom Left",
    description: "Small photo in the bottom-left corner of the hero image mosaic",
    page: "Homepage — Hero Section",
    pageUrl: "/",
  },
  {
    key: "heroLargeCenter",
    defaultUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=900&h=800&fit=crop&q=85",
    label: "Large Center",
    description: "The main large photo in the center of the hero mosaic (most prominent)",
    page: "Homepage — Hero Section",
    pageUrl: "/",
  },
  {
    key: "heroBottomRight",
    defaultUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=600&fit=crop&q=80",
    label: "Bottom Right",
    description: "Floating photo overlaid at the bottom-right of the hero mosaic",
    page: "Homepage — Hero Section",
    pageUrl: "/",
  },

  // ── About Section (homepage) ──────────────────────────────────────────────
  {
    key: "about",
    defaultUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=700&h=600&fit=crop&q=85",
    label: "About Main Photo",
    description: "Primary photo in the About / 'Built on Compassion' section",
    page: "Homepage — About Section",
    pageUrl: "/#about",
  },
  {
    key: "aboutAvatar1",
    defaultUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=60&h=60&fit=crop&q=80",
    label: "Family Badge — Avatar 1",
    description: "First small circular avatar in the floating 'Happy Families' badge",
    page: "Homepage — About Section",
    pageUrl: "/#about",
  },
  {
    key: "aboutAvatar2",
    defaultUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&h=60&fit=crop&q=80",
    label: "Family Badge — Avatar 2",
    description: "Second small circular avatar in the floating 'Happy Families' badge",
    page: "Homepage — About Section",
    pageUrl: "/#about",
  },
  {
    key: "aboutAvatar3",
    defaultUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=60&h=60&fit=crop&q=80",
    label: "Family Badge — Avatar 3",
    description: "Third small circular avatar in the floating 'Happy Families' badge",
    page: "Homepage — About Section",
    pageUrl: "/#about",
  },

  // ── Services Section ──────────────────────────────────────────────────────
  {
    key: "serviceCard1",
    defaultUrl: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=800&q=80",
    label: "Card 1 — Hourly Care",
    description: "Background image for the Hourly Care service card",
    page: "Homepage — Services Section",
    pageUrl: "/#services",
  },
  {
    key: "serviceCard2",
    defaultUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&q=80",
    label: "Card 2 — Live-In Care",
    description: "Background image for the Live-In Care service card",
    page: "Homepage — Services Section",
    pageUrl: "/#services",
  },
  {
    key: "serviceCard3",
    defaultUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
    label: "Card 3 — Post-Surgery Recovery",
    description: "Background image for the Post-Surgery Recovery service card",
    page: "Homepage — Services Section",
    pageUrl: "/#services",
  },
  {
    key: "serviceCard4",
    defaultUrl: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80",
    label: "Card 4 — Skilled Nursing",
    description: "Background image for the Skilled Nursing service card",
    page: "Homepage — Services Section",
    pageUrl: "/#services",
  },
  {
    key: "serviceCard5",
    defaultUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    label: "Card 5 — Rehab Support",
    description: "Background image for the Rehab Support service card",
    page: "Homepage — Services Section",
    pageUrl: "/#services",
  },
  {
    key: "serviceCard6",
    defaultUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&q=80",
    label: "Card 6 — Facility Staffing",
    description: "Background image for the Facility Staffing service card",
    page: "Homepage — Services Section",
    pageUrl: "/#services",
  },

  // ── Careers Teaser (homepage) ─────────────────────────────────────────────
  {
    key: "careers",
    defaultUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop",
    label: "Team Photo",
    description: "Photo in the 'Join the MintexCare Team' teaser section on the homepage",
    page: "Homepage — Careers Teaser",
    pageUrl: "/",
  },

  // ── About Us Page ─────────────────────────────────────────────────────────
  {
    key: "aboutPageHero",
    defaultUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=700&h=600&fit=crop&q=85",
    label: "Who We Are — Hero Photo",
    description: "Main photo in the 'Who We Are' hero section at the top of the About Us page",
    page: "About Us Page",
    pageUrl: "/about",
  },
  {
    key: "aboutPageStory",
    defaultUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&h=500&fit=crop",
    label: "Our Story Photo",
    description: "Large photo in the story section on the About Us page",
    page: "About Us Page",
    pageUrl: "/about",
  },
  {
    key: "aboutPageAvatar1",
    defaultUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=60&h=60&fit=crop&q=80",
    label: "Family Badge — Avatar 1",
    description: "First avatar in the floating 'Happy Families' badge on the About Us page",
    page: "About Us Page",
    pageUrl: "/about",
  },
  {
    key: "aboutPageAvatar2",
    defaultUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&h=60&fit=crop&q=80",
    label: "Family Badge — Avatar 2",
    description: "Second avatar in the floating 'Happy Families' badge on the About Us page",
    page: "About Us Page",
    pageUrl: "/about",
  },
  {
    key: "aboutPageAvatar3",
    defaultUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=60&h=60&fit=crop&q=80",
    label: "Family Badge — Avatar 3",
    description: "Third avatar in the floating 'Happy Families' badge on the About Us page",
    page: "About Us Page",
    pageUrl: "/about",
  },

  // ── Specialized Care Section (Nursing) ────────────────────────────────────
  {
    key: "nursingCard1",
    defaultUrl: "",
    label: "Physical Therapy — Card Image",
    description: "Image for the Physical Therapy card in the Specialized Care section. Leave blank to use the default SVG illustration.",
    page: "Homepage — Specialized Care Section",
    pageUrl: "/#specialized-care",
  },
  {
    key: "nursingCard2",
    defaultUrl: "",
    label: "Occupational Therapy — Card Image",
    description: "Image for the Occupational Therapy card in the Specialized Care section. Leave blank to use the default SVG illustration.",
    page: "Homepage — Specialized Care Section",
    pageUrl: "/#specialized-care",
  },
  {
    key: "nursingCard3",
    defaultUrl: "",
    label: "Speech Therapy — Card Image",
    description: "Image for the Speech Therapy card in the Specialized Care section. Leave blank to use the default SVG illustration.",
    page: "Homepage — Specialized Care Section",
    pageUrl: "/#specialized-care",
  },
  {
    key: "nursingCard4",
    defaultUrl: "",
    label: "IV Therapy — Card Image",
    description: "Image for the IV Therapy card in the Specialized Care section. Leave blank to use the default SVG illustration.",
    page: "Homepage — Specialized Care Section",
    pageUrl: "/#specialized-care",
  },
  {
    key: "nursingCard5",
    defaultUrl: "",
    label: "Wound Care — Card Image",
    description: "Image for the Wound Care card in the Specialized Care section. Leave blank to use the default SVG illustration.",
    page: "Homepage — Specialized Care Section",
    pageUrl: "/#specialized-care",
  },
  {
    key: "nursingCard6",
    defaultUrl: "",
    label: "Medication Management — Card Image",
    description: "Image for the Medication Management card in the Specialized Care section. Leave blank to use the default SVG illustration.",
    page: "Homepage — Specialized Care Section",
    pageUrl: "/#specialized-care",
  },

  // ── Careers Page ──────────────────────────────────────────────────────────
  {
    key: "careersPageBanner",
    defaultUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=400&fit=crop",
    label: "Culture Banner",
    description: "Wide banner photo in the 'Why Work With MintexCare?' section on the Careers page",
    page: "Careers Page",
    pageUrl: "/careers",
  },
];

// ── Auto-generated types and helpers ─────────────────────────────────────────

/** Strongly-typed key union derived from the registry */
export type SiteImageKey = (typeof SITE_IMAGE_REGISTRY)[number]["key"];

/** The SiteImages object type — add an entry above and this updates automatically */
export type SiteImages = Record<SiteImageKey, string>;

/** Default values derived from the registry — always in sync */
export const defaultSiteImages: SiteImages = Object.fromEntries(
  SITE_IMAGE_REGISTRY.map((e) => [e.key, e.defaultUrl])
) as SiteImages;

/** Groups for the admin Site Images tab — auto-generated, always in sync */
export interface SiteImageGroup {
  page: string;
  pageUrl: string;
  fields: { key: SiteImageKey; label: string; description: string }[];
}

export const SITE_IMAGE_GROUPS: SiteImageGroup[] = (() => {
  const map = new Map<string, SiteImageGroup>();
  for (const entry of SITE_IMAGE_REGISTRY) {
    if (!map.has(entry.page)) {
      map.set(entry.page, { page: entry.page, pageUrl: entry.pageUrl, fields: [] });
    }
    map.get(entry.page)!.fields.push({
      key: entry.key as SiteImageKey,
      label: entry.label,
      description: entry.description,
    });
  }
  return Array.from(map.values());
})();