import { Job } from "@/types/job";

export const jobsData: Job[] = [
  {
    id: "hha-001",
    title: "Home Health Aide (HHA)",
    employmentType: "Full-time",
    location: "New Jersey",
    description:
      "Provide daily living assistance including bathing, dressing, meal preparation, and personal care support.",
    fullDescription:
      "We are seeking compassionate Home Health Aides to join our team and provide essential care services to our clients. You will assist with activities of daily living, maintain a clean and safe environment, and support our clients' independence and dignity.",
    requirements: [
      "High School diploma or GED",
      "HHA Certification (preferred)",
      "Valid driver's license",
      "Ability to lift up to 50 lbs",
      "Compassionate and patient demeanor",
    ],
    benefits: [
      "Competitive hourly rates",
      "Flexible scheduling",
      "Health insurance eligibility",
      "Professional development opportunities",
      "Supportive team environment",
    ],
    salaryRange: {
      min: 28000,
      max: 35000,
    },
  },
  {
    id: "cna-001",
    title: "Certified Nursing Assistant (CNA)",
    employmentType: "Full-time",
    location: "New Jersey",
    description:
      "Deliver hands-on patient care under the supervision of licensed nurses. Monitor vital signs and assist with medical procedures.",
    fullDescription:
      "Join our healthcare team as a Certified Nursing Assistant. You will work closely with nurses to provide direct patient care, maintain patient comfort, and document patient information accurately. This role offers excellent exposure to various healthcare settings and patient populations.",
    requirements: [
      "Current CNA Certification",
      "CPR/BLS Certification",
      "High School diploma",
      "Strong communication skills",
      "Physical ability to assist patients",
    ],
    benefits: [
      "Competitive salary",
      "Health and dental insurance",
      "Paid time off",
      "Continuing education support",
      "Career advancement opportunities",
    ],
    salaryRange: {
      min: 32000,
      max: 40000,
    },
    featured: true,
  },
  {
    id: "lpn-001",
    title: "Licensed Practical Nurse (LPN)",
    employmentType: "Full-time",
    location: "New Jersey",
    description:
      "Provide skilled nursing care including medication administration, wound care, and patient education.",
    fullDescription:
      "We are looking for experienced Licensed Practical Nurses to deliver quality patient care. You will work collaboratively with RNs and physicians, manage patient health information, and ensure excellent patient outcomes. This is a rewarding opportunity to make a real difference in patients' lives.",
    requirements: [
      "Current LPN License",
      "RN or equivalent certification",
      "CPR/BLS Certification",
      "Minimum 1 year nursing experience",
      "Excellent clinical skills",
    ],
    benefits: [
      "Comprehensive health benefits",
      "Dental and vision coverage",
      "401(k) with employer match",
      "Continuing nursing education",
      "Shift differentials",
    ],
    salaryRange: {
      min: 45000,
      max: 55000,
    },
  },
  {
    id: "rn-001",
    title: "Registered Nurse (RN)",
    employmentType: "Full-time",
    location: "New Jersey",
    description:
      "Lead patient assessments, develop care plans, supervise CNAs and HHAs, and ensure quality patient outcomes.",
    fullDescription:
      "Registered Nurses are essential to our healthcare team. You will provide clinical leadership, manage complex patient care, supervise clinical staff, and collaborate with interdisciplinary teams. We value experienced nurses who are committed to excellence and patient advocacy.",
    requirements: [
      "Current RN License",
      "Bachelor's degree in Nursing preferred",
      "CPR/BLS Certification",
      "Minimum 2 years nursing experience",
      "Strong leadership abilities",
    ],
    benefits: [
      "Competitive RN salary",
      "Comprehensive health benefits",
      "Tuition reimbursement program",
      "Flexible scheduling options",
      "Leadership development program",
      "Sign-on bonus available",
    ],
    salaryRange: {
      min: 60000,
      max: 75000,
    },
  },
  {
    id: "caregiver-001",
    title: "Companion Caregiver",
    employmentType: "Part-time",
    location: "New Jersey",
    description:
      "Provide friendly companionship, engage clients in social activities, and assist with light household tasks.",
    fullDescription:
      "Companion Caregivers bring joy and companionship to our clients' lives. You will provide social interaction, assist with light housekeeping, help with meal preparation, and support clients' wellness and happiness. Perfect for caring individuals who enjoy helping others.",
    requirements: [
      "High School diploma or equivalent",
      "Ability to communicate effectively",
      "Reliable transportation",
      "Genuine interest in helping others",
      "Flexibility with scheduling",
    ],
    benefits: [
      "Flexible part-time hours",
      "Hourly rate competitive with market",
      "Mileage reimbursement",
      "Supportive team culture",
      "Opportunity for full-time conversion",
    ],
    salaryRange: {
      min: 20000,
      max: 28000,
    },
  },
];

export const employmentTypes: { value: string; label: string }[] = [
  { value: "all", label: "All Positions" },
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "per-diem", label: "Per Diem" },
];
