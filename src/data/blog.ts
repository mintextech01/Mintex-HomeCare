/**
 * Blog / Care Articles (/blog, /blog/{slug}). Starter articles drafted for MintexCare to review.
 * Keep content general (no statistics, prices or coverage claims) and add new posts at the top.
 */
export interface BlogSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  /** Meta description and card summary. */
  description: string;
  category: string;
  /** YYYY-MM-DD */
  date: string;
  readMinutes: number;
  intro: string;
  sections: BlogSection[];
  /** Related service/resource pages linked at the end of the article. */
  related: { to: string; label: string }[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "signs-aging-parent-needs-help-at-home",
    title: "10 Signs Your Aging Parent May Need Help at Home",
    description: "Not sure whether your mom or dad needs help at home? Here are 10 common signs to look for, and what to do next if you notice them.",
    category: "Planning Care",
    date: "2026-10-06",
    readMinutes: 6,
    intro:
      "Changes in an older parent often happen slowly, and they're easy to miss when you see them every week, or easy to overlook when you only visit on holidays. These signs don't always mean something is seriously wrong, but if you notice several of them, it's a good time to talk about getting some help at home.",
    sections: [
      {
        heading: "1. Mail, bills and paperwork are piling up",
        paragraphs: ["Unopened mail, late notices or unpaid bills can be an early sign that keeping track of everyday tasks has become harder."],
      },
      {
        heading: "2. The fridge is nearly empty, or full of expired food",
        paragraphs: ["Weight loss, skipped meals or spoiled food can mean shopping and cooking have become difficult or tiring."],
      },
      {
        heading: "3. Medications are being missed or doubled",
        paragraphs: ["Full pill bottles that should be half empty, or a week's pill box that's still full, are worth paying attention to. Medication mistakes are a common reason older adults end up back in the doctor's office or hospital."],
      },
      {
        heading: "4. Unexplained bruises, or mentions of falls",
        paragraphs: ["Bruises, a new limp, or comments like \"I just slipped a little\" may mean your parent is unsteady on their feet. Many people don't mention falls because they worry about losing their independence."],
      },
      {
        heading: "5. Personal care is slipping",
        paragraphs: ["Wearing the same clothes for days, skipping showers or neglecting grooming often means bathing and dressing have become physically hard or feel unsafe."],
      },
      {
        heading: "6. The house is less tidy than it used to be",
        paragraphs: ["Piles of laundry, dirty dishes or a cluttered home can be a sign that housework has become too much, and clutter itself increases the risk of falls."],
      },
      {
        heading: "7. They're withdrawing from friends and activities",
        paragraphs: ["Loneliness affects health. If your parent has stopped going to church, clubs or family events, ask why. Sometimes it's transportation, sometimes it's confidence, and sometimes it's mood."],
      },
      {
        heading: "8. Memory changes are affecting daily life",
        paragraphs: ["Everyone forgets things. But repeating the same questions, getting lost in familiar places or leaving the stove on are worth discussing with their doctor."],
      },
      {
        heading: "9. New dents or scratches on the car",
        paragraphs: ["Changes in driving can reflect changes in vision, reaction time or attention. Help with errands and appointments can reduce the need to drive."],
      },
      {
        heading: "10. You're worried, and you're becoming exhausted",
        paragraphs: ["Sometimes the clearest sign is how you feel. If you're constantly worried about your parent, or you're stretched thin trying to do everything yourself, getting support helps both of you."],
      },
      {
        heading: "What to do if you notice these signs",
        list: [
          "Talk openly and respectfully. Focus on helping your parent stay independent, not on what they can no longer do.",
          "Involve their doctor, especially if you've noticed memory changes, falls or weight loss.",
          "Start small. A few hours of help a week with bathing, meals or errands can make a big difference.",
          "Get a professional assessment. A home care agency can visit, look at needs and home safety, and suggest a plan.",
        ],
      },
    ],
    related: [
      { to: "/services/personal-care", label: "Personal care" },
      { to: "/services/companion-care", label: "Companion & homemaking" },
      { to: "/resources/guides#home-safety", label: "Home safety checklist" },
    ],
  },
  {
    slug: "hospital-to-home-family-checklist",
    title: "Coming Home From the Hospital: A Family Checklist",
    description: "How to prepare for a loved one's hospital discharge: questions to ask, how to get the home ready, and what to watch for in the first week.",
    category: "Hospital to Home",
    date: "2026-10-06",
    readMinutes: 5,
    intro:
      "Coming home after a hospital stay is a relief, but the first days and weeks are also when people are most vulnerable. Medications change, strength is low and it's easy to miss a warning sign. A little planning before discharge day makes the transition much smoother.",
    sections: [
      {
        heading: "Before discharge: ask the right questions",
        paragraphs: ["Discharge can feel rushed. Ask the care team to slow down and go through the plan with you, and write the answers down."],
        list: [
          "What medications should be taken, and which ones have changed or stopped?",
          "What activities are safe, and which should be avoided, and for how long?",
          "Which symptoms mean we should call the doctor, and which mean we should call 911?",
          "When are the follow-up appointments, and who do we call with questions?",
          "Will any equipment be needed at home, such as a walker or shower chair?",
        ],
      },
      {
        heading: "Get the home ready",
        list: [
          "Clear walking paths and remove loose rugs.",
          "If stairs will be hard, set up a bedroom on the main floor.",
          "Put commonly used items within easy reach.",
          "Fill new prescriptions and stock simple, nutritious meals.",
          "Arrange for someone to be there on the first day and night home.",
        ],
      },
      {
        heading: "The first week at home",
        paragraphs: ["Recovery isn't a straight line. Expect good days and tiring days, and keep an eye on the basics."],
        list: [
          "Medications: give them exactly as listed and keep a simple log.",
          "Eating and drinking: small, regular meals and enough fluids support healing.",
          "Mobility: help with walking and getting in and out of bed or the shower until strength returns.",
          "Wounds: watch for increasing redness, swelling, warmth or drainage, and report them.",
          "Follow-ups: keep every appointment and bring the medication list.",
        ],
      },
      {
        heading: "When to get extra help",
        paragraphs: [
          "If your loved one lives alone, if family can't take time off, or if care involves tasks like wound care, extra support at home can make recovery safer. Many families arrange a caregiver for the first days home and add nurse visits when the doctor orders skilled care.",
          "This article is general information, not medical advice. Always follow your loved one's discharge instructions and their doctor's guidance, and call 911 in an emergency.",
        ],
      },
    ],
    related: [
      { to: "/services/post-surgery-care", label: "Post-surgery & hospital-to-home care" },
      { to: "/services/skilled-nursing", label: "Skilled nursing at home" },
      { to: "/resources/guides#hospital-discharge", label: "Printable discharge checklist" },
    ],
  },
  {
    slug: "home-care-or-assisted-living",
    title: "Home Care or Assisted Living? How to Decide",
    description: "Comparing home care and assisted living for an older parent: what each offers, questions to ask, and how to choose what fits your family.",
    category: "Planning Care",
    date: "2026-10-06",
    readMinutes: 6,
    intro:
      "When a parent needs more help, families often wonder whether to bring care into the home or consider a move to assisted living. There's no single right answer. The best choice depends on your loved one's needs, wishes, home and budget. Here's a practical way to think it through.",
    sections: [
      {
        heading: "What home care offers",
        list: [
          "Staying in familiar surroundings, with their own routines, belongings and neighbors.",
          "One-on-one attention from a caregiver focused on one person.",
          "Flexible hours, from a few hours a week to live-in or 24-hour care, that can change as needs change.",
          "Clinical support at home when needed, such as nurse visits for wound care or medication management.",
        ],
      },
      {
        heading: "What assisted living offers",
        list: [
          "Staff available on site around the clock.",
          "Built-in social activities and shared meals.",
          "No home maintenance to worry about.",
          "A move to a new place, which some people welcome and others find difficult.",
        ],
      },
      {
        heading: "Questions to help you decide",
        list: [
          "What does your loved one want? Their preferences matter, and many people strongly prefer to stay home.",
          "How much help is needed, and when? A few hours a day is very different from needing someone overnight.",
          "Is the home safe, or can it be made safe with simple changes?",
          "How important is social contact? Is your parent isolated now, and would companionship at home help?",
          "What are the medical needs, and can they be met at home with nursing support?",
          "What does each option cost for the hours and level of care actually needed?",
        ],
      },
      {
        heading: "Comparing costs fairly",
        paragraphs: [
          "Home care is usually priced by the hour, while assisted living is usually a monthly fee, so compare the total cost for the amount of care your loved one actually needs. For someone who needs help a few hours a day, home care is often a flexible option. For round-the-clock needs, compare live-in or 24-hour home care with assisted living plus any extra care fees.",
        ],
      },
      {
        heading: "You don't have to decide alone",
        paragraphs: [
          "A free in-home assessment can help you understand exactly what level of care is needed and whether it can be provided safely at home. Even if you choose assisted living later, home care can bridge the gap while you plan, or give a family caregiver a break.",
        ],
      },
    ],
    related: [
      { to: "/services/live-in-24-hour-care", label: "Live-in & 24-hour care" },
      { to: "/services/hourly-care", label: "Hourly care" },
      { to: "/resources/guides#agency-questions", label: "Questions to ask a home care agency" },
    ],
  },
];

export const BLOG_PATHS = ["/blog", ...BLOG_POSTS.map(p => `/blog/${p.slug}`)];

export const postBySlug = (slug: string) => BLOG_POSTS.find(p => p.slug === slug);
