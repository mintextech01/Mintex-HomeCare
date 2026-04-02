import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
export type { SiteImages } from "@/config/siteImageConfig";
import { SiteImages, defaultSiteImages } from "@/config/siteImageConfig";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  location: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  bio: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: "home" | "nursing";
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  date: string;
  read: boolean;
}

export interface JobPosition {
  id: string;
  title: string;
  type: string;
  description: string;
  requirements: string;
  active: boolean;
}

export interface ContactInfo {
  phone: string;
  fax: string;
  email: string;
  address: string;
  hours: string;
}

interface AdminContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isLoading: boolean;
  testimonials: Testimonial[];
  setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;
  teamMembers: TeamMember[];
  setTeamMembers: React.Dispatch<React.SetStateAction<TeamMember[]>>;
  gallery: GalleryImage[];
  setGallery: React.Dispatch<React.SetStateAction<GalleryImage[]>>;
  services: ServiceItem[];
  setServices: React.Dispatch<React.SetStateAction<ServiceItem[]>>;
  submissions: ContactSubmission[];
  setSubmissions: React.Dispatch<React.SetStateAction<ContactSubmission[]>>;
  addSubmission: (sub: Omit<ContactSubmission, "id" | "date" | "read">) => void;
  jobPositions: JobPosition[];
  setJobPositions: React.Dispatch<React.SetStateAction<JobPosition[]>>;
  contactInfo: ContactInfo;
  setContactInfo: React.Dispatch<React.SetStateAction<ContactInfo>>;
  siteImages: SiteImages;
  setSiteImages: React.Dispatch<React.SetStateAction<SiteImages>>;
}

// ── Default data ──────────────────────────────────────────────────────────────

const defaultTestimonials: Testimonial[] = [
  { id: "1", name: "Sarah M.", text: "MintexCare has been a blessing for our family. Their caregivers are incredibly professional and genuinely caring. Mom looks forward to their visits every day.", rating: 5, location: "Edison, NJ" },
  { id: "2", name: "James R.", text: "After my father's surgery, we needed reliable post-operative care. MintexCare provided exceptional support that helped him recover faster than expected.", rating: 5, location: "New Brunswick, NJ" },
  { id: "3", name: "Maria L.", text: "The companionship services have made such a difference for my grandmother. She's happier, more active, and we have peace of mind knowing she's in good hands.", rating: 5, location: "Woodbridge, NJ" },
  { id: "4", name: "David K.", text: "Professional, punctual, and compassionate — everything you want in a home care provider. Highly recommend MintexCare to any family in need.", rating: 5, location: "Princeton, NJ" },
];

const defaultTeamMembers: TeamMember[] = [
  { id: "1", name: "Dr. Adeline Carter", role: "Founder & CEO", photoUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop", bio: "With over 20 years in healthcare, Dr. Carter founded MintexCare to bring compassionate home care to New Jersey families." },
  { id: "2", name: "Michael Torres", role: "Director of Nursing", photoUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop", bio: "Michael oversees all nursing operations and ensures the highest standards of clinical care across our services." },
  { id: "3", name: "Jennifer Okafor", role: "Care Coordinator", photoUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964ac31?w=300&h=300&fit=crop", bio: "Jennifer works directly with families to create personalized care plans that meet each client's unique needs." },
];

const defaultJobPositions: JobPosition[] = [
  { id: "1", title: "Home Health Aide (HHA)", type: "Full-time / Part-time", description: "Provide daily living assistance including bathing, dressing, meal preparation, and companionship to clients in their homes. Work closely with care coordinators to follow individualized care plans.", requirements: "Valid HHA certification in NJ, CPR/First Aid certified, reliable transportation, compassionate attitude, minimum 1 year experience preferred.", active: true },
  { id: "2", title: "Certified Nursing Assistant (CNA)", type: "Full-time / Part-time", description: "Deliver hands-on patient care under the supervision of licensed nurses. Monitor vital signs, assist with mobility, and document patient progress.", requirements: "Active CNA certification in NJ, current CPR certification, strong communication skills, ability to lift up to 50 lbs.", active: true },
  { id: "3", title: "Licensed Practical Nurse (LPN)", type: "Full-time", description: "Provide skilled nursing care including medication administration, wound care, and patient education. Coordinate with RNs and physicians on care plans.", requirements: "Active LPN license in NJ, minimum 2 years clinical experience, IV certification preferred, strong assessment skills.", active: true },
  { id: "4", title: "Registered Nurse (RN)", type: "Full-time", description: "Lead patient assessments, develop care plans, supervise CNAs and HHAs, and ensure quality of care delivery. Serve as primary clinical liaison with healthcare providers.", requirements: "Active RN license in NJ, BSN preferred, minimum 3 years home health or clinical experience, excellent leadership skills.", active: true },
  { id: "5", title: "Companion Caregiver", type: "Part-time / Per Diem", description: "Provide friendly companionship, engage clients in social activities, assist with light housekeeping, meal prep, and accompany clients to appointments.", requirements: "High school diploma, compassionate personality, reliable transportation, background check clearance, no certification required.", active: true },
];

const defaultContactInfo: ContactInfo = {
  phone: "(732) 268-5112",
  fax: "(732) 515-9939",
  email: "info@mintexcare.com",
  address: "New Jersey",
  hours: "Monday - Sunday, 24/7",
};

const defaultServices: ServiceItem[] = [
  { id: "h1", title: "Hourly Companion Care", description: "Flexible hourly visits providing companionship, supervision, and assistance with daily activities.", icon: "Clock", category: "home" },
  { id: "h2", title: "Live-in Companion Care", description: "Around-the-clock live-in caregivers for continuous support and peace of mind.", icon: "Home", category: "home" },
  { id: "h3", title: "Post-Surgery Care", description: "Specialized recovery support after surgical procedures to ensure safe and speedy healing.", icon: "Stethoscope", category: "home" },
  { id: "h4", title: "Rehab Support", description: "Assistance during rehabilitation to help regain strength, mobility, and independence.", icon: "Dumbbell", category: "home" },
  { id: "h5", title: "Facility Care", description: "Professional staffing support for skilled nursing facilities and assisted living communities.", icon: "Building2", category: "home" },
  { id: "h6", title: "Family Respite Care", description: "Temporary relief for family caregivers so they can rest and recharge.", icon: "HeartHandshake", category: "home" },
  { id: "h7", title: "Skilled Nursing", description: "Licensed nursing care including medication management, wound care, and health monitoring.", icon: "Syringe", category: "home" },
  { id: "h8", title: "Personal Care", description: "Help with bathing, grooming, dressing, toileting, and other personal hygiene needs.", icon: "Bath", category: "home" },
  { id: "h9", title: "Errand Support", description: "Assistance with grocery shopping, picking up prescriptions, and running essential errands.", icon: "ShoppingBag", category: "home" },
  { id: "h10", title: "Appointment Scheduling", description: "Help coordinating and accompanying clients to medical appointments.", icon: "CalendarCheck", category: "home" },
  { id: "h11", title: "Companionship", description: "Meaningful social interaction, conversation, games, and emotional support to combat loneliness.", icon: "Users", category: "home" },
  { id: "h12", title: "Respite Care", description: "Short-term care to give primary caregivers a much-needed break.", icon: "Timer", category: "home" },
  { id: "h13", title: "Medication Reminder", description: "Timely reminders to ensure medications are taken correctly and on schedule.", icon: "Pill", category: "home" },
  { id: "h14", title: "Housekeeping", description: "Light housekeeping including dusting, vacuuming, tidying, and maintaining a clean living environment.", icon: "SprayCan", category: "home" },
  { id: "h15", title: "Laundry Assistance", description: "Help with washing, drying, folding, and organizing clothes and linens.", icon: "Shirt", category: "home" },
  { id: "h16", title: "Meal Preparation", description: "Nutritious meal planning and cooking based on dietary needs and preferences.", icon: "UtensilsCrossed", category: "home" },
  { id: "n1", title: "Custodial Care", description: "Assistance with activities of daily living for patients in skilled nursing settings.", icon: "Heart", category: "nursing" },
  { id: "n2", title: "Wound Care", description: "Expert wound assessment, treatment, and management to promote healing.", icon: "Bandage", category: "nursing" },
  { id: "n3", title: "Post-Stroke Recovery", description: "Rehabilitation support to help stroke survivors regain function and independence.", icon: "Brain", category: "nursing" },
  { id: "n4", title: "Physical Therapy", description: "Exercise programs and mobility training to restore physical function.", icon: "Footprints", category: "nursing" },
  { id: "n5", title: "Speech Therapy", description: "Communication and swallowing therapy for patients with speech difficulties.", icon: "MessageSquare", category: "nursing" },
  { id: "n6", title: "Occupational Therapy", description: "Helping patients relearn daily tasks and regain independence in everyday activities.", icon: "Hand", category: "nursing" },
];

// ── Row mappers (DB snake_case ↔ TS camelCase) ────────────────────────────────

const fromTestimonialRow = (r: any): Testimonial => ({ id: r.id, name: r.name, text: r.text, rating: r.rating, location: r.location });
const toTestimonialRow = (t: Testimonial) => ({ id: t.id, name: t.name, text: t.text, rating: t.rating, location: t.location });

const fromTeamMemberRow = (r: any): TeamMember => ({ id: r.id, name: r.name, role: r.role, photoUrl: r.photo_url, bio: r.bio });
const toTeamMemberRow = (m: TeamMember) => ({ id: m.id, name: m.name, role: m.role, photo_url: m.photoUrl, bio: m.bio });

const fromGalleryRow = (r: any): GalleryImage => ({ id: r.id, url: r.url, caption: r.caption });
const toGalleryRow = (g: GalleryImage) => ({ id: g.id, url: g.url, caption: g.caption });

const fromServiceRow = (r: any): ServiceItem => ({ id: r.id, title: r.title, description: r.description, icon: r.icon, category: r.category });
const toServiceRow = (s: ServiceItem) => ({ id: s.id, title: s.title, description: s.description, icon: s.icon, category: s.category });

const fromPositionRow = (r: any): JobPosition => ({ id: r.id, title: r.title, type: r.type, description: r.description, requirements: r.requirements, active: r.active });
const toPositionRow = (p: JobPosition) => ({ id: p.id, title: p.title, type: p.type, description: p.description, requirements: p.requirements, active: p.active });

const fromSubmissionRow = (r: any): ContactSubmission => ({ id: r.id, name: r.name, email: r.email, phone: r.phone, service: r.service, message: r.message, date: r.date, read: r.read });
const toSubmissionRow = (s: ContactSubmission) => ({ id: s.id, name: s.name, email: s.email, phone: s.phone, service: s.service, message: s.message, date: s.date, read: s.read });

// ── Supabase sync helpers ─────────────────────────────────────────────────────

async function syncTable<T extends { id: string }>(
  table: string,
  items: T[],
  toRow: (item: T) => Record<string, unknown>
) {
  try {
    const { data: existing } = await supabase.from(table).select("id");
    const existingIds = (existing ?? []).map((e: any) => e.id as string);
    const currentIds = items.map(i => i.id);
    const toDelete = existingIds.filter(id => !currentIds.includes(id));

    if (items.length > 0) {
      await supabase.from(table).upsert(items.map(toRow), { onConflict: "id" });
    }
    if (toDelete.length > 0) {
      await supabase.from(table).delete().in("id", toDelete);
    }
  } catch (err) {
    console.error(`Failed to sync ${table}:`, err);
  }
}

async function saveSetting(key: string, value: unknown) {
  try {
    await supabase.from("site_settings").upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });
  } catch (err) {
    console.error(`Failed to save setting ${key}:`, err);
  }
}

// ── Fallback: localStorage (used when Supabase is not configured) ─────────────

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return fallback;
    const parsed = JSON.parse(stored);
    if (typeof fallback === "object" && fallback !== null && !Array.isArray(fallback)) {
      return { ...(fallback as object), ...parsed } as T;
    }
    return parsed;
  } catch { return fallback; }
}

// ── Context ───────────────────────────────────────────────────────────────────

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem("mintex_auth") === "true");
  const [isLoading, setIsLoading] = useState(true);

  const [testimonials, setTestimonialsState] = useState<Testimonial[]>([]);
  const [teamMembers, setTeamMembersState] = useState<TeamMember[]>([]);
  const [gallery, setGalleryState] = useState<GalleryImage[]>([]);
  const [services, setServicesState] = useState<ServiceItem[]>([]);
  const [submissions, setSubmissionsState] = useState<ContactSubmission[]>([]);
  const [jobPositions, setJobPositionsState] = useState<JobPosition[]>([]);
  const [contactInfo, setContactInfoState] = useState<ContactInfo>(defaultContactInfo);
  const [siteImages, setSiteImagesState] = useState<SiteImages>(defaultSiteImages);

  // Load all data from Supabase (or localStorage fallback) on mount
  useEffect(() => {
    if (!isSupabaseConfigured) {
      // Fallback to localStorage for local dev without Supabase
      setTestimonialsState(loadFromStorage("mintex_testimonials", defaultTestimonials));
      setTeamMembersState(loadFromStorage("mintex_team", defaultTeamMembers));
      setGalleryState(loadFromStorage("mintex_gallery", []));
      setServicesState(loadFromStorage("mintex_services", defaultServices));
      setSubmissionsState(loadFromStorage("mintex_submissions", []));
      setJobPositionsState(loadFromStorage("mintex_positions", defaultJobPositions));
      setContactInfoState(loadFromStorage("mintex_contact_info", defaultContactInfo));
      setSiteImagesState(loadFromStorage("mintex_site_images", defaultSiteImages));
      setIsLoading(false);
      return;
    }

    const loadAll = async () => {
      try {
        const [
          { data: tData },
          { data: tmData },
          { data: gData },
          { data: sData },
          { data: subData },
          { data: pData },
          { data: settingsData },
        ] = await Promise.all([
          supabase.from("testimonials").select("*").order("created_at"),
          supabase.from("team_members").select("*").order("created_at"),
          supabase.from("gallery").select("*").order("created_at"),
          supabase.from("services").select("*").order("created_at"),
          supabase.from("contact_submissions").select("*").order("date", { ascending: false }),
          supabase.from("job_positions").select("*").order("created_at"),
          supabase.from("site_settings").select("*"),
        ]);

        setTestimonialsState(tData && tData.length > 0 ? tData.map(fromTestimonialRow) : defaultTestimonials);
        setTeamMembersState(tmData && tmData.length > 0 ? tmData.map(fromTeamMemberRow) : defaultTeamMembers);
        setGalleryState(gData ? gData.map(fromGalleryRow) : []);
        setServicesState(sData && sData.length > 0 ? sData.map(fromServiceRow) : defaultServices);
        setSubmissionsState(subData ? subData.map(fromSubmissionRow) : []);
        setJobPositionsState(pData && pData.length > 0 ? pData.map(fromPositionRow) : defaultJobPositions);

        const contactSetting = settingsData?.find((s: any) => s.key === "contact_info");
        setContactInfoState(contactSetting ? (contactSetting.value as ContactInfo) : defaultContactInfo);

        const imagesSetting = settingsData?.find((s: any) => s.key === "site_images");
        setSiteImagesState(imagesSetting ? { ...defaultSiteImages, ...(imagesSetting.value as SiteImages) } : defaultSiteImages);
      } catch (err) {
        console.error("Failed to load from Supabase, using defaults:", err);
        setTestimonialsState(defaultTestimonials);
        setTeamMembersState(defaultTeamMembers);
        setServicesState(defaultServices);
        setJobPositionsState(defaultJobPositions);
        setContactInfoState(defaultContactInfo);
        setSiteImagesState(defaultSiteImages);
      } finally {
        setIsLoading(false);
      }
    };

    loadAll();
  }, []);

  // ── Wrapped setters: update React state AND sync to Supabase ────────────────

  const setTestimonials = useCallback((action: React.SetStateAction<Testimonial[]>) => {
    setTestimonialsState(prev => {
      const next = typeof action === "function" ? action(prev) : action;
      if (isSupabaseConfigured) {
        syncTable("testimonials", next, toTestimonialRow);
      } else {
        localStorage.setItem("mintex_testimonials", JSON.stringify(next));
      }
      return next;
    });
  }, []);

  const setTeamMembers = useCallback((action: React.SetStateAction<TeamMember[]>) => {
    setTeamMembersState(prev => {
      const next = typeof action === "function" ? action(prev) : action;
      if (isSupabaseConfigured) {
        syncTable("team_members", next, toTeamMemberRow);
      } else {
        localStorage.setItem("mintex_team", JSON.stringify(next));
      }
      return next;
    });
  }, []);

  const setGallery = useCallback((action: React.SetStateAction<GalleryImage[]>) => {
    setGalleryState(prev => {
      const next = typeof action === "function" ? action(prev) : action;
      if (isSupabaseConfigured) {
        syncTable("gallery", next, toGalleryRow);
      } else {
        localStorage.setItem("mintex_gallery", JSON.stringify(next));
      }
      return next;
    });
  }, []);

  const setServices = useCallback((action: React.SetStateAction<ServiceItem[]>) => {
    setServicesState(prev => {
      const next = typeof action === "function" ? action(prev) : action;
      if (isSupabaseConfigured) {
        syncTable("services", next, toServiceRow);
      } else {
        localStorage.setItem("mintex_services", JSON.stringify(next));
      }
      return next;
    });
  }, []);

  const setSubmissions = useCallback((action: React.SetStateAction<ContactSubmission[]>) => {
    setSubmissionsState(prev => {
      const next = typeof action === "function" ? action(prev) : action;
      if (isSupabaseConfigured) {
        syncTable("contact_submissions", next, toSubmissionRow);
      } else {
        localStorage.setItem("mintex_submissions", JSON.stringify(next));
      }
      return next;
    });
  }, []);

  const setJobPositions = useCallback((action: React.SetStateAction<JobPosition[]>) => {
    setJobPositionsState(prev => {
      const next = typeof action === "function" ? action(prev) : action;
      if (isSupabaseConfigured) {
        syncTable("job_positions", next, toPositionRow);
      } else {
        localStorage.setItem("mintex_positions", JSON.stringify(next));
      }
      return next;
    });
  }, []);

  const setContactInfo = useCallback((action: React.SetStateAction<ContactInfo>) => {
    setContactInfoState(prev => {
      const next = typeof action === "function" ? action(prev) : action;
      if (isSupabaseConfigured) {
        saveSetting("contact_info", next);
      } else {
        localStorage.setItem("mintex_contact_info", JSON.stringify(next));
      }
      return next;
    });
  }, []);

  const setSiteImages = useCallback((action: React.SetStateAction<SiteImages>) => {
    setSiteImagesState(prev => {
      const next = typeof action === "function" ? action(prev) : action;
      if (isSupabaseConfigured) {
        saveSetting("site_images", next);
      } else {
        localStorage.setItem("mintex_site_images", JSON.stringify(next));
      }
      return next;
    });
  }, []);

  const login = (username: string, password: string) => {
    const validUser = import.meta.env.VITE_ADMIN_USERNAME ?? "admin";
    const validPass = import.meta.env.VITE_ADMIN_PASSWORD ?? "mintex2025";
    if (username === validUser && password === validPass) {
      setIsAuthenticated(true);
      localStorage.setItem("mintex_auth", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("mintex_auth");
  };

  const addSubmission = (sub: Omit<ContactSubmission, "id" | "date" | "read">) => {
    const newSub: ContactSubmission = { ...sub, id: Date.now().toString(), date: new Date().toISOString(), read: false };
    setSubmissionsState(prev => [newSub, ...prev]);
    if (isSupabaseConfigured) {
      supabase.from("contact_submissions").insert(toSubmissionRow(newSub)).then(({ error }) => { if (error) console.error(error); });
    } else {
      setSubmissionsState(prev => {
        localStorage.setItem("mintex_submissions", JSON.stringify(prev));
        return prev;
      });
    }
  };

  return (
    <AdminContext.Provider value={{
      isAuthenticated, login, logout, isLoading,
      testimonials, setTestimonials,
      teamMembers, setTeamMembers,
      gallery, setGallery,
      services, setServices,
      submissions, setSubmissions, addSubmission,
      jobPositions, setJobPositions,
      contactInfo, setContactInfo,
      siteImages, setSiteImages,
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
};
