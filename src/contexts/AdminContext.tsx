import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
export type { SiteImages } from "@/config/siteImageConfig";
import { SiteImages, defaultSiteImages } from "@/config/siteImageConfig";
import { db, auth } from "@/lib/firebase";
import { doc, collection, onSnapshot, setDoc, getDoc, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
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
  type: "contact" | "career";
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  date: string;
  read: boolean;
  status?: "new" | "reviewed" | "interview" | "hired" | "rejected";
  // career application fields
  position?: string;
  coverLetter?: string;
  resumeUrl?: string;
  resumeName?: string;
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
  sectionEyebrow: string;
  sectionHeading: string;
  sectionDescription: string;
  facebookUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
}

interface AdminContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
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
  addSubmission: (sub: Omit<ContactSubmission, "id" | "date" | "read" | "status"> & { type?: "contact" | "career" }) => Promise<void>;
  updateSubmission: (id: string, updates: Partial<ContactSubmission>) => Promise<void>;
  deleteSubmission: (id: string) => Promise<void>;
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
  sectionEyebrow: "Get In Touch",
  sectionHeading: "Ready to Get Started?",
  sectionDescription: "Contact us today for a free, no-obligation consultation. Let us show you why families across New Jersey trust MintexCare.",
  facebookUrl: "",
  instagramUrl: "",
  linkedinUrl: "",
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

// ── Firestore Sync Helpers ─────────────

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize with defaults until Firebase loads
  const [testimonials, setTestimonialsState] = useState<Testimonial[]>(defaultTestimonials);
  const [teamMembers, setTeamMembersState] = useState<TeamMember[]>(defaultTeamMembers);
  const [gallery, setGalleryState] = useState<GalleryImage[]>([]);
  const [services, setServicesState] = useState<ServiceItem[]>(defaultServices);
  const [submissions, setSubmissionsState] = useState<ContactSubmission[]>([]);
  const [jobPositions, setJobPositionsState] = useState<JobPosition[]>(defaultJobPositions);
  const [contactInfo, setContactInfoState] = useState<ContactInfo>(defaultContactInfo);
  const [siteImages, setSiteImagesState] = useState<SiteImages>(defaultSiteImages);

  useEffect(() => {
    // Initialize any missing Firestore documents when the admin logs in.
    // Uses getDoc + setDoc in sequence (no race condition since we await getDoc first).
    const initMissingDoc = async (docName: string, defaultData: any) => {
      const snap = await getDoc(doc(db, "appData", docName));
      if (!snap.exists()) {
        await setDoc(doc(db, "appData", docName), { data: defaultData });
      }
    };

    const unsubAuth = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setIsLoading(false);
      if (user) {
        // Initialize each document separately so a failure on one doesn't block others
        initMissingDoc("testimonials", defaultTestimonials).catch(console.error);
        initMissingDoc("teamMembers", defaultTeamMembers).catch(console.error);
        initMissingDoc("gallery", []).catch(console.error);
        initMissingDoc("services", defaultServices).catch(console.error);
        initMissingDoc("submissions", []).catch(console.error);
        initMissingDoc("jobPositions", defaultJobPositions).catch(console.error);
        initMissingDoc("contactInfo", defaultContactInfo).catch(console.error);
        // siteImages are stored per-key in the "siteImageData" collection — no bulk init needed
      }
    });

    // Real-time Firestore listeners
    const unsubTestimonials = onSnapshot(doc(db, "appData", "testimonials"), (d) => {
      if (d.exists()) setTestimonialsState(d.data().data);
    });
    const unsubTeam = onSnapshot(doc(db, "appData", "teamMembers"), (d) => {
      if (d.exists()) setTeamMembersState(d.data().data);
    });
    const unsubGallery = onSnapshot(doc(db, "appData", "gallery"), (d) => {
      if (d.exists()) setGalleryState(d.data().data);
    });
    const unsubServices = onSnapshot(doc(db, "appData", "services"), (d) => {
      if (d.exists()) setServicesState(d.data().data);
    });
    const unsubSubmissions = onSnapshot(
      collection(db, "submissions"),
      (snapshot) => {
        const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as ContactSubmission));
        // Sort newest first in JS — avoids needing a Firestore composite index
        docs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setSubmissionsState(docs);
      },
      (error) => {
        console.debug("[AdminContext] submissions listener:", error.code);
      }
    );
    const unsubPositions = onSnapshot(doc(db, "appData", "jobPositions"), (d) => {
      if (d.exists()) setJobPositionsState(d.data().data);
    });
    const unsubContact = onSnapshot(doc(db, "appData", "contactInfo"), (d) => {
      if (d.exists()) setContactInfoState(d.data().data);
    });
    // Each site image lives in its own document: siteImageData/{key} → { url: "..." }
    // This avoids Firestore's 1MB per-document limit when images are stored as base64.
    const unsubImages = onSnapshot(collection(db, "siteImageData"), (snapshot) => {
      setSiteImagesState(prev => {
        const next = { ...prev };
        snapshot.docs.forEach(d => {
          const url = d.data().url;
          if (url) next[d.id as keyof SiteImages] = url;
        });
        return next;
      });
    });

    return () => {
      unsubAuth();
      unsubTestimonials(); unsubTeam(); unsubGallery(); unsubServices();
      unsubSubmissions(); unsubPositions(); unsubContact(); unsubImages();
    };
  }, []);

  // ── Wrapped setters: update React state AND sync to Firestore ────────────────

  const updateFirebase = (collectionName: string, data: any) => {
    setDoc(doc(db, "appData", collectionName), { data }).catch((err) => {
      console.error(`[AdminContext] Failed to save "${collectionName}" to Firestore:`, err);
    });
  };

  const setTestimonials = useCallback((action: React.SetStateAction<Testimonial[]>) => {
    setTestimonialsState(prev => {
      const next = typeof action === "function" ? action(prev) : action;
      updateFirebase("testimonials", next);
      return next;
    });
  }, []);

  const setTeamMembers = useCallback((action: React.SetStateAction<TeamMember[]>) => {
    setTeamMembersState(prev => {
      const next = typeof action === "function" ? action(prev) : action;
      updateFirebase("teamMembers", next);
      return next;
    });
  }, []);

  const setGallery = useCallback((action: React.SetStateAction<GalleryImage[]>) => {
    setGalleryState(prev => {
      const next = typeof action === "function" ? action(prev) : action;
      updateFirebase("gallery", next);
      return next;
    });
  }, []);

  const setServices = useCallback((action: React.SetStateAction<ServiceItem[]>) => {
    setServicesState(prev => {
      const next = typeof action === "function" ? action(prev) : action;
      updateFirebase("services", next);
      return next;
    });
  }, []);

  const setSubmissions = useCallback((action: React.SetStateAction<ContactSubmission[]>) => {
    setSubmissionsState(action);
  }, []);

  const setJobPositions = useCallback((action: React.SetStateAction<JobPosition[]>) => {
    setJobPositionsState(prev => {
      const next = typeof action === "function" ? action(prev) : action;
      updateFirebase("jobPositions", next);
      return next;
    });
  }, []);

  const setContactInfo = useCallback((action: React.SetStateAction<ContactInfo>) => {
    setContactInfoState(prev => {
      const next = typeof action === "function" ? action(prev) : action;
      updateFirebase("contactInfo", next);
      return next;
    });
  }, []);

  // setSiteImages only updates local React state.
  // The actual Firestore write is done per-key in ImageField.save() → siteImageData/{key}.
  const setSiteImages = useCallback((action: React.SetStateAction<SiteImages>) => {
    setSiteImagesState(action);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const addSubmission = async (sub: Omit<ContactSubmission, "id" | "date" | "read" | "status">) => {
    const newSub = { ...sub, type: sub.type ?? "contact", date: new Date().toISOString(), read: false, status: "new" as const };
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Firestore timeout — check your connection")), 10000)
    );
    await Promise.race([addDoc(collection(db, "submissions"), newSub), timeout]);
  };

  const updateSubmission = async (id: string, updates: Partial<ContactSubmission>) => {
    await updateDoc(doc(db, "submissions", id), updates as Record<string, unknown>);
  };

  const deleteSubmission = async (id: string) => {
    await deleteDoc(doc(db, "submissions", id));
  };

  return (
    <AdminContext.Provider value={{
      isAuthenticated, login, logout, isLoading,
      testimonials, setTestimonials,
      teamMembers, setTeamMembers,
      gallery, setGallery,
      services, setServices,
      submissions, setSubmissions, addSubmission, updateSubmission, deleteSubmission,
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
