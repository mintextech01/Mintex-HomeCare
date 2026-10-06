import { HeartHandshake, UserCheck, Stethoscope, ClipboardList, type LucideIcon } from "lucide-react";

/**
 * Facility Staffing (B2B) content shared by /facility-staffing, /facility-staffing/roles and
 * /facility-staffing/request-staff. Credential and screening wording should be confirmed by
 * MintexCare before changing it.
 */
export interface StaffingRole {
  /** Short code used in links (?role=CNA) and on the request form. */
  code: "HHA" | "CNA" | "LPN" | "RN";
  title: string;
  icon: LucideIcon;
  summary: string;
  duties: string[];
  settings: string[];
  credential: string;
}

export const STAFFING_ROLES: StaffingRole[] = [
  {
    code: "HHA",
    title: "Home Health Aides",
    icon: HeartHandshake,
    summary: "Certified home health aides who help residents and clients with daily living activities, comfort and safety.",
    duties: [
      "Bathing, dressing, grooming and toileting",
      "Transfers, walking and repositioning",
      "Meal help, feeding and hydration",
      "Companionship and supervision",
      "Observing and reporting changes to the nurse",
    ],
    settings: ["Assisted living", "Group homes", "Home care programs", "Memory care"],
    credential: "New Jersey Certified Home Health Aide (CHHA) certification",
  },
  {
    code: "CNA",
    title: "Certified Nursing Assistants",
    icon: UserCheck,
    summary: "Certified nursing assistants who provide hands-on resident care as part of your nursing team.",
    duties: [
      "Activities of daily living and personal care",
      "Vital signs, weights and intake / output",
      "Safe transfers and fall prevention",
      "Feeding assistance and hydration rounds",
      "Charting care in your documentation system",
    ],
    settings: ["Skilled nursing facilities", "Long-term care", "Rehabilitation centers", "Assisted living"],
    credential: "New Jersey Certified Nurse Aide (CNA) certification",
  },
  {
    code: "LPN",
    title: "Licensed Practical Nurses",
    icon: ClipboardList,
    summary: "Licensed practical nurses for medication passes, treatments and resident monitoring under RN supervision.",
    duties: [
      "Medication administration and med passes",
      "Treatments and wound care",
      "Monitoring residents and reporting changes",
      "Documentation and care plan follow-through",
      "Supervising aides on the unit, where permitted",
    ],
    settings: ["Skilled nursing facilities", "Sub-acute rehab", "Long-term care", "Assisted living"],
    credential: "Active New Jersey Licensed Practical Nurse (LPN) license",
  },
  {
    code: "RN",
    title: "Registered Nurses",
    icon: Stethoscope,
    summary: "Registered nurses for assessments, complex care and charge or supervisory coverage.",
    duties: [
      "Resident assessments and care planning",
      "IV therapy and complex treatments",
      "Admissions, discharges and transfers",
      "Charge nurse and supervisory coverage",
      "Communicating with physicians and families",
    ],
    settings: ["Skilled nursing facilities", "Sub-acute rehab", "Assisted living", "Long-term care"],
    credential: "Active New Jersey Registered Nurse (RN) license",
  },
];

export const FACILITY_TYPES = [
  "Skilled nursing facility",
  "Assisted living community",
  "Rehabilitation center",
  "Memory care community",
  "Long-term care facility",
  "Group home",
  "Other",
];

export const STAFFING_FAQS = [
  { q: "What kinds of facilities do you staff?", a: "We provide aides and nurses to skilled nursing facilities, assisted living and memory care communities, rehabilitation centers, long-term care facilities and group homes in New Jersey." },
  { q: "How quickly can you fill a shift?", a: "We work to fill urgent and same-week requests as quickly as we can. The more notice you give, the better we can match staff to your needs. For urgent coverage, call us directly." },
  { q: "How are your staff screened?", a: "Before placement we verify licenses and certifications, check references and run background checks, and confirm required health screenings. Staff are oriented to your facility's expectations before their first shift." },
  { q: "Do you offer per diem, contract and long-term staffing?", a: "Yes. We can cover single shifts, short-term contracts (for example during leave or a census increase) and longer-term placements." },
  { q: "Can we request the same staff member again?", a: "Yes. Continuity matters for residents and your team, so we try to send staff who already know your facility whenever possible." },
  { q: "What if a staff member isn't the right fit?", a: "Let us know right away. We'll follow up, address the concern and work to provide a replacement." },
  { q: "How is billing handled?", a: "Rates depend on the role, shift and length of the assignment. Once we understand your needs, we'll send you the details and agreement." },
];

export const STAFFING_PATHS = ["/facility-staffing", "/facility-staffing/roles", "/facility-staffing/request-staff"];
