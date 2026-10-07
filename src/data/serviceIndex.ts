import {
  Bath, HeartHandshake, Clock, Home, Coffee, Activity, Stethoscope, Dumbbell, Bandage, Pill, Brain,
  type LucideIcon,
} from "lucide-react";

/**
 * The individual service pages (/services/{slug}): one naming set used by the routes, SEO tags,
 * footer, Services hub and homepage cards. Long page content lives in servicePages.tsx (loaded
 * only with the service page itself), keyed by the same slug.
 */
export type ServiceGroup = "in-home" | "clinical";

export interface ServiceIndexEntry {
  slug: string;
  name: string;
  /** One sentence for cards and link lists. */
  short: string;
  group: ServiceGroup;
  icon: LucideIcon;
  metaTitle: string;
  metaDescription: string;
}

export const SERVICE_GROUP_LABEL: Record<ServiceGroup, string> = {
  "in-home": "In-Home Care",
  clinical: "Specialized & Clinical",
};

export const SERVICE_INDEX: ServiceIndexEntry[] = [
  {
    slug: "personal-care",
    name: "Personal Care",
    short: "Respectful help with bathing, dressing, grooming, toileting and moving safely around the home.",
    group: "in-home",
    icon: Bath,
    metaTitle: "In-Home Personal Care in NJ | Bathing & Dressing | MintexCare",
    metaDescription: "In-home personal care in Edison and across New Jersey: help with bathing, dressing, grooming, toileting and mobility from trained, supervised caregivers. Free consultation.",
  },
  {
    slug: "companion-care",
    name: "Companion & Homemaking",
    short: "Friendly company plus light housekeeping, meals, laundry, errands and rides to appointments.",
    group: "in-home",
    icon: HeartHandshake,
    metaTitle: "Companion Care & Homemaking in NJ | MintexCare",
    metaDescription: "Companion care and homemaking for seniors in New Jersey: conversation, meal preparation, light housekeeping, laundry, errands and appointment escorts. Call (732) 268-5112.",
  },
  {
    slug: "hourly-care",
    name: "Hourly Care",
    short: "Flexible visits from a few hours a week to daily shifts, scheduled around your routine.",
    group: "in-home",
    icon: Clock,
    metaTitle: "Hourly Home Care in NJ | Flexible Caregiver Visits | MintexCare",
    metaDescription: "Flexible hourly home care in New Jersey: caregiver visits from a few hours a week to daily shifts, for personal care, companionship and help around the house.",
  },
  {
    slug: "live-in-24-hour-care",
    name: "Live-In & 24-Hour Care",
    short: "Round-the-clock support at home with a live-in caregiver or rotating 24-hour shifts.",
    group: "in-home",
    icon: Home,
    metaTitle: "Live-In & 24-Hour Home Care in NJ | MintexCare",
    metaDescription: "Live-in and 24-hour home care in New Jersey for seniors who need someone there day and night. Live-in caregivers or awake overnight shifts, supervised by our nurses.",
  },
  {
    slug: "respite-care",
    name: "Respite Care",
    short: "Short-term care that gives family caregivers time to rest, work or travel.",
    group: "in-home",
    icon: Coffee,
    metaTitle: "Respite Care for Family Caregivers in NJ | MintexCare",
    metaDescription: "Respite care in New Jersey: a trained caregiver steps in for a few hours, days or weeks so family caregivers can rest, work or travel. Available 24/7.",
  },
  {
    slug: "post-surgery-care",
    name: "Post-Surgery & Hospital-to-Home",
    short: "Safe recovery at home after surgery or a hospital stay, from discharge day onward.",
    group: "clinical",
    icon: Activity,
    metaTitle: "Post-Surgery & Hospital-to-Home Care in NJ | MintexCare",
    metaDescription: "Post-surgery and hospital-to-home care in New Jersey: discharge-day support, mobility help, medication reminders and nurse visits to help you recover safely at home.",
  },
  {
    slug: "skilled-nursing",
    name: "Skilled Nursing (RN / LPN)",
    short: "Licensed RNs and LPNs for assessments, chronic condition care and medical tasks at home.",
    group: "clinical",
    icon: Stethoscope,
    metaTitle: "Skilled Nursing at Home in NJ | RN & LPN Care | MintexCare",
    metaDescription: "In-home skilled nursing in New Jersey from licensed RNs and LPNs: assessments, chronic disease management, wound care, medication management and more.",
  },
  {
    slug: "therapy-support",
    name: "Rehab & Therapy Support",
    short: "Help rebuilding strength, mobility and independence alongside physical, occupational and speech therapy.",
    group: "clinical",
    icon: Dumbbell,
    metaTitle: "Rehab & Therapy Support at Home in NJ | MintexCare",
    metaDescription: "In-home rehab and therapy support in New Jersey: help with physical, occupational and speech therapy goals after surgery, stroke, a fall or illness.",
  },
  {
    slug: "wound-care-iv-therapy",
    name: "Wound Care & IV Therapy",
    short: "Nurse-led wound care and IV infusion at home, following your physician's orders.",
    group: "clinical",
    icon: Bandage,
    metaTitle: "Wound Care & IV Therapy at Home in NJ | MintexCare",
    metaDescription: "In-home wound care and IV therapy in New Jersey by licensed nurses: dressing changes, surgical and pressure wound care, IV antibiotics and hydration, as ordered by your doctor.",
  },
  {
    slug: "dementia-care",
    name: "Alzheimer's & Dementia Care",
    short: "Patient, specially trained caregivers who keep loved ones with memory loss safe, calm and engaged at home.",
    group: "clinical",
    icon: Brain,
    metaTitle: "Alzheimer's & Dementia Care at Home in NJ | MintexCare",
    metaDescription: "In-home Alzheimer's and dementia care in New Jersey from specially trained caregivers: supervision, safe routines, personal care, wandering prevention and respite for families.",
  },
  {
    slug: "medication-management",
    name: "Medication Management",
    short: "Medication reviews, organizing, reminders and nurse oversight so every dose is taken right.",
    group: "clinical",
    icon: Pill,
    metaTitle: "Medication Management at Home in NJ | MintexCare",
    metaDescription: "In-home medication management in New Jersey: nurse medication reviews, pill organizers, reminders and monitoring to keep medicines safe and on schedule.",
  },
];

/** "Service needed" options for the contact forms: the same names as the service pages. */
export const CONTACT_SERVICE_OPTIONS = [...SERVICE_INDEX.map(s => s.name), "Facility Staffing", "Not sure / Other"];

export const SERVICE_PATHS =SERVICE_INDEX.map(s => `/services/${s.slug}`);

export const serviceBySlug = (slug: string) => SERVICE_INDEX.find(s => s.slug === slug);
