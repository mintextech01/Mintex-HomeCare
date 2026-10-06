import { Home, Hospital, ClipboardList, Heart, type LucideIcon } from "lucide-react";

/**
 * Family Guides & Checklists (/resources/guides). Practical, general checklists; nothing here is
 * medical advice or a claim about MintexCare beyond what the rest of the site already says.
 */
export interface Checklist {
  id: string;
  title: string;
  icon: LucideIcon;
  intro: string;
  groups: { heading: string; items: string[] }[];
  related?: { to: string; label: string };
}

export const CHECKLISTS: Checklist[] = [
  {
    id: "home-safety",
    title: "Home Safety Checklist",
    icon: Home,
    intro: "Most falls and accidents at home are preventable. Walk through your loved one's home with this list and fix what you can.",
    groups: [
      {
        heading: "Floors & walkways",
        items: [
          "Remove or secure loose rugs and runners",
          "Clear clutter, cords and furniture from walking paths",
          "Make sure stairs have sturdy handrails on both sides",
          "Mark the edges of steps so they're easy to see",
        ],
      },
      {
        heading: "Lighting",
        items: [
          "Light switches at the top and bottom of every staircase",
          "Night lights between the bedroom and bathroom",
          "A lamp or light switch reachable from the bed",
          "Bright, working bulbs in hallways and entrances",
        ],
      },
      {
        heading: "Bathroom",
        items: [
          "Grab bars by the toilet and in the shower or tub",
          "Non-slip mats inside and outside the shower",
          "A shower chair or tub bench if standing is tiring",
          "A raised toilet seat if getting up is difficult",
        ],
      },
      {
        heading: "Kitchen & everyday safety",
        items: [
          "Everyday items stored between waist and shoulder height",
          "Working smoke and carbon monoxide detectors on every floor",
          "Emergency numbers posted by the phone and saved in the cell phone",
          "Medications stored in one place, clearly labeled",
        ],
      },
    ],
    related: { to: "/services/personal-care", label: "Personal care at home" },
  },
  {
    id: "hospital-discharge",
    title: "Hospital Discharge Checklist",
    icon: Hospital,
    intro: "The first days home after a hospital stay matter most. Use this list before discharge day and during the first week.",
    groups: [
      {
        heading: "Before leaving the hospital",
        items: [
          "Get the written discharge instructions and ask questions about anything unclear",
          "Get an updated medication list: what's new, what's changed, what's stopped",
          "Know which warning signs mean you should call the doctor, and when to call 911",
          "Schedule follow-up appointments and note who to call with questions",
          "Ask whether equipment is needed at home (walker, shower chair, hospital bed)",
        ],
      },
      {
        heading: "Getting the home ready",
        items: [
          "Arrange a ride home and someone to help on arrival",
          "Set up a bedroom on the main floor if stairs will be hard",
          "Fill new prescriptions before or on the way home",
          "Stock easy, nutritious meals and drinks",
        ],
      },
      {
        heading: "The first week",
        items: [
          "Give medications exactly as listed and keep a simple log",
          "Help with walking and transfers until strength returns",
          "Watch wounds or incisions for redness, swelling or drainage",
          "Keep follow-up appointments and bring the medication list",
        ],
      },
    ],
    related: { to: "/services/post-surgery-care", label: "Post-surgery & hospital-to-home care" },
  },
  {
    id: "agency-questions",
    title: "Questions to Ask a Home Care Agency",
    icon: ClipboardList,
    intro: "Whichever agency you choose, these questions help you compare and know what to expect before care starts.",
    groups: [
      {
        heading: "Licensing & caregivers",
        items: [
          "Is the agency licensed in New Jersey, bonded and insured?",
          "How are caregivers screened, trained and certified?",
          "Are caregivers supervised by a registered nurse?",
          "Can we meet the caregiver, and what if they're not a good fit?",
        ],
      },
      {
        heading: "Care & scheduling",
        items: [
          "Who creates the care plan, and how often is it reviewed?",
          "What happens if our regular caregiver is sick or on vacation?",
          "Is there a minimum number of hours per visit or per week?",
          "Can someone be reached 24 hours a day if there's a problem?",
        ],
      },
      {
        heading: "Costs & paperwork",
        items: [
          "What is the rate, and does it change for nights, weekends or holidays?",
          "Which payment options are accepted for our type of care?",
          "Is there a written service agreement, and how is care ended or changed?",
        ],
      },
    ],
    related: { to: "/how-it-works", label: "How MintexCare works" },
  },
  {
    id: "caregiver-break",
    title: "Signs a Family Caregiver Needs a Break",
    icon: Heart,
    intro: "Caring for a loved one is demanding. If several of these sound familiar, it may be time to get help, for their sake and yours.",
    groups: [
      {
        heading: "How you're feeling",
        items: [
          "You feel exhausted most of the time, even after sleeping",
          "You feel irritable, anxious or close to tears more often",
          "You've lost interest in things you used to enjoy",
        ],
      },
      {
        heading: "Your health & life",
        items: [
          "You're skipping your own doctor's appointments",
          "You rarely see friends or have time for yourself",
          "Work or other family responsibilities are suffering",
        ],
      },
      {
        heading: "Ways to get support",
        items: [
          "Schedule regular respite, even a few hours a week",
          "Share tasks with other family members and write the plan down",
          "Talk to your doctor about how you're coping",
          "Ask about caregiver support groups in your area",
        ],
      },
    ],
    related: { to: "/services/respite-care", label: "Respite care" },
  },
];
