/**
 * SINGLE SOURCE OF TRUTH for all manageable site images.
 *
 * To add a new image anywhere on the website:
 *  1. Add one entry here (key, default URL, label, description, page, pageUrl)
 *  2. Use  siteImages.<key>  in your component (via useAdmin())
 *  3. Done — it automatically appears in Admin → Site Images with no other changes needed.
 */

/**
 * The box an image is shown in on the live site. Every slot renders with object-fit: cover, so
 * uploads are cropped to this shape in Admin — what the admin sees in the cropper is exactly
 * what visitors see, instead of the browser silently cutting off heads or edges.
 */
export interface ImageFrame {
  /** Width ÷ height of the on-page box (desktop, where it is largest) */
  aspect: number;
  /** "4:3"-style label shown to admins */
  ratio: string;
  /** Width uploads are saved at: ~2× the largest on-screen width, so photos stay sharp on retina screens */
  width: number;
}

const frame = (w: number, h: number, width: number): ImageFrame => ({ aspect: w / h, ratio: `${w}:${h}`, width });

/** Team member cards on the About page (4:5 portraits, 3 per row) */
export const TEAM_PHOTO_FRAME = frame(4, 5, 800);

export interface SiteImageEntry {
  key: string;
  defaultUrl: string;
  label: string;
  description: string;
  page: string;
  pageUrl: string;
  frame: ImageFrame;
}

/** Big photo at the top of a /services/{slug} page (the 4:4.2 box in ServiceDetail). */
const SERVICE_PAGE_FRAME = frame(20, 21, 1000);

const SPECIALIZED_GROUP = "Homepage — Specialized Care (6 services: card + inside page)";

/**
 * The 6 "Specialized Care" homepage cards. Each card opens its own service page, so in Admin every
 * service gets two separate slots side by side: ① the small square card picture on the homepage,
 * ② the big photo at the top of the page the card opens.
 */
const specializedCare = (n: number, cardKey: string, pageKey: string, name: string, slug: string): SiteImageEntry[] => [
  {
    key: cardKey,
    defaultUrl: "",
    label: `${n}. ${name} — ① Homepage card (small square)`,
    description: `Small square picture on the ${name} card on the homepage. Blank = the built-in drawing.`,
    page: SPECIALIZED_GROUP,
    pageUrl: "/#specialized-care",
    frame: frame(1, 1, 400),
  },
  {
    key: pageKey,
    defaultUrl: "",
    label: `${n}. ${name} — ② Inside page photo (big)`,
    description: `Big photo at the top of the ${name} page (opens when someone clicks the card). Blank = a simple icon.`,
    page: SPECIALIZED_GROUP,
    pageUrl: `/services/${slug}`,
    frame: SERVICE_PAGE_FRAME,
  },
];

export const SITE_IMAGE_REGISTRY: SiteImageEntry[] = [
  // ── Hero Section ──────────────────────────────────────────────────────────
  {
    key: "heroTopLeft",
    defaultUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=500&fit=crop&q=80",
    label: "Top Left",
    description: "Small photo in the top-left corner of the hero image mosaic",
    page: "Homepage — Hero Section",
    pageUrl: "/",
    frame: frame(9, 4, 1600),
  },
  {
    key: "heroBottomLeft",
    defaultUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=500&fit=crop&q=80",
    label: "Bottom Left",
    description: "Small photo in the bottom-left corner of the hero image mosaic",
    page: "Homepage — Hero Section",
    pageUrl: "/",
    frame: frame(1, 1, 800),
  },
  {
    key: "heroLargeCenter",
    defaultUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=900&h=800&fit=crop&q=85",
    label: "Large Center",
    description: "The main large photo in the center of the hero mosaic (most prominent)",
    page: "Homepage — Hero Section",
    pageUrl: "/",
    frame: frame(1, 1, 1300),
  },
  {
    key: "heroBottomRight",
    defaultUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=600&fit=crop&q=80",
    label: "Bottom Right",
    description: "Floating photo overlaid at the bottom-right of the hero mosaic",
    page: "Homepage — Hero Section",
    pageUrl: "/",
    frame: frame(1, 1, 800),
  },

  // ── About Section (homepage) ──────────────────────────────────────────────
  {
    key: "about",
    defaultUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=700&h=600&fit=crop&q=85",
    label: "About Main Photo",
    description: "Primary photo in the About / 'Built on Compassion' section",
    page: "Homepage — About Section",
    pageUrl: "/#about",
    frame: frame(1, 1, 1300),
  },
  {
    key: "aboutAvatar1",
    defaultUrl: "/site-images/client-avatar-1.webp",
    label: "Family Badge — Avatar 1",
    description: "First small circular avatar in the floating 'Happy Families' badge",
    page: "Homepage — About Section",
    pageUrl: "/#about",
    frame: frame(1, 1, 160),
  },
  {
    key: "aboutAvatar2",
    defaultUrl: "/site-images/client-avatar-2.webp",
    label: "Family Badge — Avatar 2",
    description: "Second small circular avatar in the floating 'Happy Families' badge",
    page: "Homepage — About Section",
    pageUrl: "/#about",
    frame: frame(1, 1, 160),
  },
  {
    key: "aboutAvatar3",
    defaultUrl: "/site-images/client-avatar-3.webp",
    label: "Family Badge — Avatar 3",
    description: "Third small circular avatar in the floating 'Happy Families' badge",
    page: "Homepage — About Section",
    pageUrl: "/#about",
    frame: frame(1, 1, 160),
  },

  // ── Services Section ──────────────────────────────────────────────────────
  {
    key: "serviceCard1",
    defaultUrl: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=800&q=80",
    label: "Card 1 — Hourly Care",
    description: "Background image for the Hourly Care service card",
    page: "Homepage — Services Section",
    pageUrl: "/#services",
    frame: frame(16, 9, 1100),
  },
  {
    key: "serviceCard2",
    defaultUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&q=80",
    label: "Card 2 — Live-In Care",
    description: "Background image for the Live-In Care service card",
    page: "Homepage — Services Section",
    pageUrl: "/#services",
    frame: frame(16, 9, 1100),
  },
  {
    key: "serviceCard3",
    defaultUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
    label: "Card 3 — Post-Surgery Recovery",
    description: "Background image for the Post-Surgery Recovery service card",
    page: "Homepage — Services Section",
    pageUrl: "/#services",
    frame: frame(16, 9, 1100),
  },
  {
    key: "serviceCard4",
    defaultUrl: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80",
    label: "Card 4 — Skilled Nursing",
    description: "Background image for the Skilled Nursing service card",
    page: "Homepage — Services Section",
    pageUrl: "/#services",
    frame: frame(16, 9, 1100),
  },
  {
    key: "serviceCard5",
    defaultUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    label: "Card 5 — Rehab Support",
    description: "Background image for the Rehab Support service card",
    page: "Homepage — Services Section",
    pageUrl: "/#services",
    frame: frame(16, 9, 1100),
  },
  {
    key: "serviceCard6",
    defaultUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&q=80",
    label: "Card 6 — Facility Staffing",
    description: "Background image for the Facility Staffing service card",
    page: "Homepage — Services Section",
    pageUrl: "/#services",
    frame: frame(16, 9, 1100),
  },

  // ── Careers Teaser (homepage) ─────────────────────────────────────────────
  {
    key: "careers",
    defaultUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop",
    label: "Team Photo",
    description: "Photo in the 'Join the MintexCare Team' teaser section on the homepage",
    page: "Homepage — Careers Teaser",
    pageUrl: "/",
    frame: frame(3, 2, 1300),
  },

  // ── About Us Page ─────────────────────────────────────────────────────────
  {
    key: "aboutPageHero",
    defaultUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=700&h=600&fit=crop&q=85",
    label: "Who We Are — Hero Photo",
    description: "Main photo in the 'Who We Are' hero section at the top of the About Us page",
    page: "About Us Page",
    pageUrl: "/about",
    frame: frame(1, 1, 1300),
  },
  {
    key: "aboutPageStory",
    defaultUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&h=500&fit=crop",
    label: "Our Story Photo",
    description: "Large photo in the story section on the About Us page",
    page: "About Us Page",
    pageUrl: "/about",
    frame: frame(5, 4, 1400),
  },
  {
    key: "aboutPageAvatar1",
    defaultUrl: "/site-images/client-avatar-1.webp",
    label: "Family Badge — Avatar 1",
    description: "First avatar in the floating 'Happy Families' badge on the About Us page",
    page: "About Us Page",
    pageUrl: "/about",
    frame: frame(1, 1, 160),
  },
  {
    key: "aboutPageAvatar2",
    defaultUrl: "/site-images/client-avatar-2.webp",
    label: "Family Badge — Avatar 2",
    description: "Second avatar in the floating 'Happy Families' badge on the About Us page",
    page: "About Us Page",
    pageUrl: "/about",
    frame: frame(1, 1, 160),
  },
  {
    key: "aboutPageAvatar3",
    defaultUrl: "/site-images/client-avatar-3.webp",
    label: "Family Badge — Avatar 3",
    description: "Third avatar in the floating 'Happy Families' badge on the About Us page",
    page: "About Us Page",
    pageUrl: "/about",
    frame: frame(1, 1, 160),
  },

  // ── Specialized Care Section (Nursing) ────────────────────────────────────
  ...specializedCare(1, "nursingCard1", "svcPhysicalTherapy",      "Physical Therapy",      "physical-therapy"),
  ...specializedCare(2, "nursingCard2", "svcOccupationalTherapy",  "Occupational Therapy",  "occupational-therapy"),
  ...specializedCare(3, "nursingCard3", "svcSpeechTherapy",        "Speech Therapy",        "speech-therapy"),
  ...specializedCare(4, "nursingCard4", "svcIvTherapy",            "IV Therapy",            "iv-therapy"),
  ...specializedCare(5, "nursingCard5", "svcWoundCare",            "Wound Care",            "wound-care"),
  ...specializedCare(6, "nursingCard6", "svcMedicationManagement", "Medication Management", "medication-management"),

  // ── Other Service Pages (the menu pages) ──────────────────────────────────
  // Blank by default: the page shows a designed illustration until a real photo is uploaded.
  // Medication Management's photo is in the Specialized Care group above.
  ...([
    ["svcPersonalCare",         "personal-care",         "Personal Care"],
    ["svcCompanionCare",        "companion-care",        "Companion & Homemaking"],
    ["svcHourlyCare",           "hourly-care",           "Hourly Care"],
    ["svcLiveInCare",           "live-in-24-hour-care",  "Live-In & 24-Hour Care"],
    ["svcRespiteCare",          "respite-care",          "Respite Care"],
    ["svcPostSurgeryCare",      "post-surgery-care",     "Post-Surgery & Hospital-to-Home"],
    ["svcSkilledNursing",       "skilled-nursing",       "Skilled Nursing"],
    ["svcTherapySupport",       "therapy-support",       "Rehab & Therapy Support"],
    ["svcWoundCareIv",          "wound-care-iv-therapy", "Wound Care & IV Therapy"],
    ["svcDementiaCare",         "dementia-care",         "Alzheimer's & Dementia Care"],
  ] as const).map(([key, slug, name]) => ({
    key,
    defaultUrl: "",
    label: `${name} — Page Photo`,
    description: `Big photo at the top of the ${name} page (opens from the Care Services menu). Blank = a simple icon.`,
    page: "Service Pages (Care Services menu)",
    pageUrl: `/services/${slug}`,
    frame: SERVICE_PAGE_FRAME,
  })),

  // ── Facility Staffing ─────────────────────────────────────────────────────
  {
    key: "staffingHero",
    defaultUrl: "",
    label: "Facility Staffing — Hero Photo",
    description: "Photo at the top of the Facility Staffing page. Leave blank to use the designed illustration.",
    page: "Facility Staffing Page",
    pageUrl: "/facility-staffing",
    frame: frame(20, 21, 1000),
  },

  // ── Careers Page ──────────────────────────────────────────────────────────
  {
    key: "careersPageBanner",
    defaultUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=400&fit=crop",
    label: "Culture Banner",
    description: "Wide banner photo in the 'Why Work With MintexCare?' section on the Careers page",
    page: "Careers Page",
    pageUrl: "/careers",
    frame: frame(5, 4, 1400),
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

/** 1×1 transparent GIF shown on public pages until the real image has been fetched. */
export const PENDING_IMAGE = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

export const pendingSiteImages: SiteImages = Object.fromEntries(
  SITE_IMAGE_REGISTRY.map((e) => [e.key, PENDING_IMAGE])
) as SiteImages;

/**
 * Uploaded (base64) site images that the build saved as optimized static files
 * (scripts/prerender.mjs injects window.__SITE_IMAGES__ into every page). Pages show these
 * immediately; the Firestore copy is still checked afterwards so Admin changes go live without
 * a rebuild. `fp` is imageFingerprint() of the base64 data URI the file was made from.
 */
export type BakedSiteImages = Partial<Record<SiteImageKey, { src: string; fp: string }>>;
export const bakedSiteImages: BakedSiteImages =
  (typeof window !== "undefined" && (window as unknown as { __SITE_IMAGES__?: BakedSiteImages }).__SITE_IMAGES__) || {};

/** FNV-1a hash + length of a data URI. Keep identical to fingerprint() in scripts/prerender.mjs. */
export const imageFingerprint = (s: string): string => {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return `${(h >>> 0).toString(36)}-${s.length.toString(36)}`;
};

/** Image keys displayed on a route ("/#about" counts as "/"), derived from the registry. */
export const siteImageKeysForPage = (path: string): SiteImageKey[] =>
  SITE_IMAGE_REGISTRY
    .filter((e) => (e.pageUrl.split("#")[0] || "/") === path)
    .map((e) => e.key as SiteImageKey);

/** Groups for the admin Site Images tab — auto-generated, always in sync */
export interface SiteImageGroup {
  page: string;
  pageUrl: string;
  fields: {
    key: SiteImageKey; label: string; description: string; frame: ImageFrame; pageUrl: string;
    /** Built-in fallback when blank: a drawing/icon (no defaultUrl) or a stock photo */
    hasDefaultUrl: boolean;
  }[];
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
      frame: entry.frame,
      pageUrl: entry.pageUrl,
      hasDefaultUrl: !!entry.defaultUrl,
    });
  }
  return Array.from(map.values());
})();