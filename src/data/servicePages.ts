import type { SiteImageKey } from "@/config/siteImageConfig";

/**
 * Page content for each /services/{slug} page. Names, icons and SEO tags are in serviceIndex.ts.
 * Clinical wording is deliberately conservative (nurses work under physician orders, aides give
 * reminders, not medication): have clinical leadership review before changing it.
 */
export interface ServicePageContent {
  /** H1 split so the second part is highlighted in brand blue. */
  heading: [string, string];
  intro: string;
  imageKey: SiteImageKey;
  /** Three short selling points shown in the hero card and highlight strip. */
  highlights: { title: string; text: string }[];
  included: string[];
  rightFor: string[];
  faqs: { q: string; a: string }[];
  related: string[];
}

export const SERVICE_PAGES: Record<string, ServicePageContent> = {
  "personal-care": {
    heading: ["Personal Care", "at Home"],
    intro:
      "Everyday tasks like bathing and dressing can become hard after an illness, injury or simply with age. Our trained caregivers help with personal care respectfully and privately, so your loved one can stay clean, comfortable and safe in their own home.",
    imageKey: "svcPersonalCare",
    highlights: [
      { title: "Dignity first", text: "Care at your loved one's pace, with privacy and respect." },
      { title: "Trained caregivers", text: "Certified home health aides, background-checked and supervised." },
      { title: "Flexible hours", text: "A few hours a week up to live-in care." },
    ],
    included: [
      "Bathing, showering and sponge baths",
      "Dressing and undressing",
      "Grooming, hair care, shaving and oral care",
      "Toileting and incontinence care",
      "Safe transfers in and out of bed, chair and shower",
      "Help walking and moving around the home",
      "Repositioning to prevent pressure sores",
      "Medication reminders",
    ],
    rightFor: [
      "Bathing or dressing alone has become difficult or unsafe",
      "There has been a fall, or you worry one could happen",
      "Your loved one is recovering from surgery or a hospital stay",
      "A family member is providing hands-on care and needs help",
      "Memory changes make it hard to keep up with daily routines",
    ],
    faqs: [
      { q: "Who provides personal care?", a: "Personal care is provided by trained, background-checked caregivers such as certified home health aides (CHHAs). Their work is supervised by our registered nurses." },
      { q: "Can we choose the days and times?", a: "Yes. Visits are scheduled around your loved one's routine, from a few hours a week to daily visits or live-in care, and can be adjusted as needs change." },
      { q: "What if my parent is uncomfortable accepting help with bathing?", a: "This is very common. Caregivers start slowly, explain each step, protect privacy and follow your loved one's preferences. We can also try to match a caregiver they feel comfortable with." },
      { q: "How quickly can care start?", a: "Call us for a free consultation. In many cases we can complete an in-home assessment and start care within a few days, and sooner when it's urgent." },
    ],
    related: ["companion-care", "hourly-care", "live-in-24-hour-care"],
  },

  "companion-care": {
    heading: ["Companion Care", "& Homemaking"],
    intro:
      "Loneliness and an untidy, unsafe home can affect health as much as illness. Our companion caregivers bring friendly conversation, help around the house and a reliable pair of hands for errands and appointments, so your loved one can stay independent at home.",
    imageKey: "svcCompanionCare",
    highlights: [
      { title: "Friendly company", text: "Conversation, hobbies and outings that brighten the day." },
      { title: "A tidy, safe home", text: "Light housekeeping, laundry and meals taken care of." },
      { title: "Peace of mind", text: "Someone you trust checking in and keeping you updated." },
    ],
    included: [
      "Conversation, games, reading and hobbies",
      "Meal planning and preparation",
      "Light housekeeping and tidying",
      "Laundry and changing bed linens",
      "Grocery shopping and errands",
      "Escorts to doctor's appointments and outings",
      "Medication reminders",
      "Regular updates for family members",
    ],
    rightFor: [
      "Your loved one lives alone or spends long days by themselves",
      "Housework, cooking or shopping has become too much",
      "They have stopped going out or seeing friends",
      "Family lives far away and wants someone checking in",
      "They don't need hands-on care yet, but need support",
    ],
    faqs: [
      { q: "What is the difference between companion care and personal care?", a: "Companion care covers company, household help, meals and errands. Personal care adds hands-on help with bathing, dressing, toileting and mobility. Many families combine both in one care plan." },
      { q: "Can the caregiver drive my parent to appointments?", a: "Caregivers can accompany your loved one to appointments, shopping and outings. Ask us about transportation options when you plan care." },
      { q: "How many hours a week do I need?", a: "It depends on your loved one's needs. Some families start with a few visits a week and add hours over time. We'll recommend a schedule during the free consultation." },
      { q: "Will it be the same caregiver each time?", a: "We aim for consistency and try to keep the same caregiver or small team with your loved one, so they can build a trusting relationship." },
    ],
    related: ["personal-care", "hourly-care", "respite-care"],
  },

  "hourly-care": {
    heading: ["Hourly Home Care", "on Your Schedule"],
    intro:
      "Not every family needs around-the-clock help. With hourly care, a caregiver comes when you need one most, whether that's a morning routine, a few afternoons a week or evening help, and the plan can grow as needs change.",
    imageKey: "svcHourlyCare",
    highlights: [
      { title: "Pay for what you need", text: "Visits from a few hours a week to daily shifts." },
      { title: "Any time of day", text: "Mornings, evenings, weekends and overnights." },
      { title: "Easy to adjust", text: "Add, reduce or change visits as needs change." },
    ],
    included: [
      "Morning and bedtime routines",
      "Help with bathing, dressing and grooming",
      "Meal preparation and help with eating",
      "Light housekeeping and laundry",
      "Medication reminders",
      "Companionship and activities",
      "Errands and appointment escorts",
      "Short check-in visits for safety",
    ],
    rightFor: [
      "Your loved one is mostly independent but needs help at certain times",
      "A family caregiver needs regular cover for work or school runs",
      "You want to try home care before committing to more hours",
      "Help is needed after a hospital stay for a limited time",
      "Evenings or weekends are the hardest part of the week",
    ],
    faqs: [
      { q: "Is there a minimum number of hours per visit?", a: "Visit lengths depend on the care needed and scheduling. We'll explain the options for your area during the free consultation." },
      { q: "Can we change the schedule later?", a: "Yes. Hourly care is designed to be flexible. Let your care coordinator know and we'll adjust visits as your loved one's needs change." },
      { q: "What can a caregiver do during an hourly visit?", a: "Anything in the care plan: personal care, meals, light housekeeping, companionship, errands and medication reminders. We set the priorities together with you." },
      { q: "Can hourly care become live-in care later?", a: "Yes. Many families start with hourly visits and move to longer shifts or live-in care when needed, without changing agencies." },
    ],
    related: ["personal-care", "companion-care", "live-in-24-hour-care"],
  },

  "live-in-24-hour-care": {
    heading: ["Live-In & 24-Hour", "Home Care"],
    intro:
      "When your loved one shouldn't be alone, day or night, round-the-clock care at home is often the best alternative to a facility. We provide live-in caregivers and 24-hour shift care, supervised by our nurses, so someone is always there.",
    imageKey: "svcLiveInCare",
    highlights: [
      { title: "Someone always there", text: "Support day and night, in the comfort of home." },
      { title: "Two options", text: "A live-in caregiver or rotating awake shifts." },
      { title: "Nurse supervised", text: "Care plans overseen by our registered nurses." },
    ],
    included: [
      "Help with all daily activities: bathing, dressing, toileting",
      "Safe mobility and transfers, day and night",
      "Meals, light housekeeping and laundry",
      "Medication reminders",
      "Overnight supervision and help",
      "Companionship and engagement throughout the day",
      "Fall prevention and home safety checks",
      "Regular updates for family members",
    ],
    rightFor: [
      "Your loved one can't safely be left alone",
      "They need help during the night or wander at night",
      "Advanced illness, frailty or dementia needs constant support",
      "You want an alternative to a nursing home or assisted living",
      "A family caregiver can no longer cover nights",
    ],
    faqs: [
      { q: "What is the difference between live-in and 24-hour care?", a: "With live-in care, one caregiver stays in the home and has time to sleep at night, so it suits people who sleep through most nights. With 24-hour care, caregivers work in shifts and stay awake, which suits people who need help during the night." },
      { q: "Does a live-in caregiver need their own room?", a: "Yes. A live-in caregiver needs a private place to sleep and rest. We'll talk through the arrangements during the consultation." },
      { q: "Is round-the-clock care at home an alternative to a nursing home?", a: "For many families, yes. Care at home lets your loved one stay in familiar surroundings with one-on-one attention. We'll help you understand whether home care can safely meet their needs." },
      { q: "Who supervises the caregivers?", a: "Our registered nurses create the care plan, check in regularly and update the plan as your loved one's condition changes." },
    ],
    related: ["personal-care", "respite-care", "skilled-nursing"],
  },

  "respite-care": {
    heading: ["Respite Care", "for Family Caregivers"],
    intro:
      "Caring for someone you love is rewarding, and exhausting. Respite care gives you a break: a trained caregiver steps in for a few hours, a weekend or a few weeks, so you can rest, work, travel or simply recharge, knowing your loved one is in good hands.",
    imageKey: "svcRespiteCare",
    highlights: [
      { title: "Time for you", text: "A few hours, overnight, or a week away." },
      { title: "Same routine", text: "We follow your loved one's habits and preferences." },
      { title: "Short notice", text: "Available 24/7 when you need cover quickly." },
    ],
    included: [
      "Short visits, full days, overnights or multi-week stays",
      "All the care your loved one usually receives from you",
      "Personal care, meals and medication reminders",
      "Companionship and activities",
      "Cover while you travel, work or recover from illness",
      "Emergency back-up when a family caregiver can't be there",
      "A handover so you know how everything went",
    ],
    rightFor: [
      "You are the main caregiver and feel tired or burned out",
      "You need cover for a trip, work commitment or family event",
      "You are recovering from your own illness or surgery",
      "You want a regular break each week",
      "You'd like to try home care before committing to more",
    ],
    faqs: [
      { q: "How short or long can respite care be?", a: "Respite can be a few hours, an overnight, a weekend or several weeks. It can be one-off or a regular weekly break." },
      { q: "How do you learn my loved one's routine?", a: "Before care starts we visit to learn routines, preferences, medications and anything that helps your loved one feel comfortable, and we put it in the care plan." },
      { q: "Can respite care start at short notice?", a: "We are available 24/7. Call us and we'll do our best to arrange care as quickly as possible." },
      { q: "Can respite care turn into ongoing care?", a: "Yes. Many families start with respite and continue with regular hourly or live-in care when they see how much it helps." },
    ],
    related: ["hourly-care", "live-in-24-hour-care", "companion-care"],
  },

  "post-surgery-care": {
    heading: ["Post-Surgery &", "Hospital-to-Home Care"],
    intro:
      "The first days and weeks after surgery or a hospital stay are when falls, missed medications and readmissions are most likely. We help your loved one get home safely and recover with the right mix of caregiver support and nurse visits, following the discharge plan.",
    imageKey: "svcPostSurgeryCare",
    highlights: [
      { title: "Discharge-day help", text: "Support getting home and settled safely." },
      { title: "Follows the plan", text: "Care matches the hospital's discharge instructions." },
      { title: "Nurse visits", text: "Skilled nursing added when your doctor orders it." },
    ],
    included: [
      "Help on discharge day and settling in at home",
      "Mobility help, transfers and fall prevention",
      "Bathing, dressing and personal care while healing",
      "Medication reminders and following the discharge plan",
      "Meals, hydration and light housekeeping",
      "Rides or escorts to follow-up appointments",
      "Nurse visits for wound checks and monitoring, when ordered",
      "Support with home exercise programs from your therapist",
    ],
    rightFor: [
      "Joint replacement, heart, back or other major surgery",
      "A hospital or rehab stay for illness, a fall or a stroke",
      "Being discharged home and living alone",
      "Family can't take enough time off to help",
      "Reducing the risk of a fall or return to hospital",
    ],
    faqs: [
      { q: "When should we arrange care?", a: "Ideally before the surgery or discharge date. Call us as soon as you know, and we can have a plan ready for the day your loved one comes home." },
      { q: "Can you provide nursing care after surgery?", a: "Yes. Our licensed nurses can provide skilled care such as wound care and monitoring when it is ordered by your physician. Caregivers handle day-to-day support." },
      { q: "How long does post-surgery care last?", a: "As long as it's needed, often a few days to several weeks. We adjust hours as your loved one gets stronger." },
      { q: "Do you coordinate with the hospital or doctor?", a: "We follow the discharge instructions and can coordinate with the care team. Bring the discharge papers to your consultation so we can build the plan around them." },
    ],
    related: ["skilled-nursing", "therapy-support", "wound-care-iv-therapy"],
  },

  "skilled-nursing": {
    heading: ["Skilled Nursing", "at Home"],
    intro:
      "Some care can only be provided by a licensed nurse. Our registered nurses (RNs) and licensed practical nurses (LPNs) bring clinical care into the home, from assessments and chronic condition management to medical tasks ordered by your physician.",
    imageKey: "svcSkilledNursing",
    highlights: [
      { title: "Licensed nurses", text: "Care from New Jersey-licensed RNs and LPNs." },
      { title: "Physician-directed", text: "Clinical care follows your doctor's orders." },
      { title: "Visits or shifts", text: "Short nurse visits or longer private-duty shifts." },
    ],
    included: [
      "Nursing assessments and care planning",
      "Monitoring vital signs and symptoms",
      "Chronic condition care (diabetes, heart failure, COPD and more)",
      "Medication administration and management",
      "Wound care and dressing changes",
      "IV therapy and injections, as ordered",
      "Catheter, ostomy and feeding tube care",
      "Teaching patients and families how to manage care",
    ],
    rightFor: [
      "A new diagnosis or a complex chronic condition",
      "Medical tasks a family member can't safely do",
      "Recovery after surgery that needs clinical monitoring",
      "Frequent hospital visits you want to prevent",
      "Serious illness where comfort and symptom care matter most",
    ],
    faqs: [
      { q: "What's the difference between an RN and an LPN?", a: "Registered nurses (RNs) carry out assessments, create and update care plans and handle more complex care. Licensed practical nurses (LPNs) provide many hands-on nursing tasks under an RN's supervision." },
      { q: "Do I need a doctor's order for skilled nursing?", a: "Many skilled nursing tasks, such as IV therapy, injections and some wound care, require a physician's order. We can help coordinate with your doctor." },
      { q: "Can a nurse stay for a full shift?", a: "Yes. Depending on needs, we can provide short skilled visits or longer private-duty nursing shifts." },
      { q: "How do I pay for skilled nursing?", a: "Payment options depend on the type of care and your coverage. Talk to us about your situation and we'll explain what applies." },
    ],
    related: ["wound-care-iv-therapy", "medication-management", "post-surgery-care"],
  },

  "therapy-support": {
    heading: ["Rehab & Therapy", "Support at Home"],
    intro:
      "Getting stronger after surgery, a stroke, a fall or a long illness takes steady practice between therapy sessions. Our team supports your loved one's physical, occupational and speech therapy goals at home, so progress continues every day, not just on therapy days.",
    imageKey: "svcTherapySupport",
    highlights: [
      { title: "Steady progress", text: "Practice between sessions, every day." },
      { title: "PT, OT & speech", text: "Support for mobility, daily tasks and communication." },
      { title: "Safer at home", text: "Fewer falls and more confidence moving around." },
    ],
    included: [
      "Help with home exercise programs from the therapist",
      "Walking practice and safe use of walkers or canes",
      "Practicing daily tasks like dressing, cooking and bathing",
      "Support with speech and swallowing exercises",
      "Home safety and fall-prevention checks",
      "Encouragement and motivation to keep going",
      "Progress updates for family and the care team",
    ],
    rightFor: [
      "Recovery after a stroke, joint replacement or fracture",
      "Weakness after a hospital stay or long illness",
      "Parkinson's, MS or another condition affecting movement",
      "Difficulty speaking or swallowing",
      "Fear of falling that limits daily life",
    ],
    faqs: [
      { q: "Do you provide physical, occupational and speech therapy?", a: "We support therapy goals at home and work alongside licensed physical, occupational and speech therapists. Contact us to discuss the therapy your loved one needs and how we can help." },
      { q: "Do I need a therapist's plan?", a: "Exercises should follow a plan from a licensed therapist or physician. We help your loved one follow that plan safely between sessions." },
      { q: "Can therapy support be combined with other care?", a: "Yes. It is often combined with personal care, post-surgery care or skilled nursing in one care plan." },
      { q: "How do we know it's working?", a: "We track progress such as walking distance, independence with daily tasks and confidence, and share updates with you and the care team." },
    ],
    related: ["post-surgery-care", "skilled-nursing", "personal-care"],
  },

  "wound-care-iv-therapy": {
    heading: ["Wound Care", "& IV Therapy at Home"],
    intro:
      "Healing wounds and IV treatments no longer have to mean long stays in a hospital or clinic. Our licensed nurses provide wound care and IV infusion at home, following your physician's orders and watching closely for any signs of complications.",
    imageKey: "svcWoundCareIv",
    highlights: [
      { title: "Licensed nurses", text: "Every treatment by an RN or LPN." },
      { title: "Doctor's orders", text: "Care follows your physician's treatment plan." },
      { title: "Fewer trips", text: "Treatment at home instead of the clinic." },
    ],
    included: [
      "Surgical wound care and dressing changes",
      "Pressure injury (bedsore) care and prevention",
      "Diabetic and other chronic wound care",
      "Monitoring for signs of infection",
      "IV antibiotics and IV hydration, as ordered",
      "IV line and PICC line care and flushing",
      "Injections, as ordered",
      "Teaching patients and families how to protect healing wounds",
    ],
    rightFor: [
      "A surgical wound that needs regular dressing changes",
      "Pressure sores or slow-healing diabetic wounds",
      "IV antibiotics or hydration prescribed after discharge",
      "Frequent trips to a clinic that are hard to manage",
      "Someone with limited mobility who is at risk of skin breakdown",
    ],
    faqs: [
      { q: "Do I need a doctor's order for wound care or IV therapy?", a: "Yes. Wound treatments and IV therapy are provided under a physician's order. We can help coordinate with your doctor or the discharge team." },
      { q: "Who provides the care?", a: "Wound care and IV therapy are provided by our licensed nurses (RNs and LPNs), not by aides." },
      { q: "What happens if there's a problem with the wound or IV line?", a: "Nurses watch for warning signs such as redness, swelling, fever or line problems, and contact your physician when needed. In an emergency, call 911." },
      { q: "Can caregivers help between nurse visits?", a: "Yes. Caregivers can help with personal care and mobility and report any concerns to the nurse, while the nurse handles all wound and IV treatment." },
    ],
    related: ["skilled-nursing", "post-surgery-care", "medication-management"],
  },

  "dementia-care": {
    heading: ["Alzheimer's & Dementia", "Care at Home"],
    intro:
      "Memory loss changes daily life for the whole family. Our specially trained caregivers help your loved one stay safe, calm and as independent as possible at home, with familiar routines, patient support and supervision, while giving family caregivers the break they need.",
    imageKey: "svcDementiaCare",
    highlights: [
      { title: "Specially trained", text: "Caregivers trained in dementia care and communication." },
      { title: "Familiar routines", text: "Consistent caregivers and calm, predictable days." },
      { title: "Safety first", text: "Supervision and home safety to prevent falls and wandering." },
    ],
    included: [
      "Supervision and companionship during the day or night",
      "Keeping a consistent, familiar daily routine",
      "Gentle reminders and calm redirection when confused or anxious",
      "Patient help with bathing, dressing, grooming and toileting",
      "Meals, snacks and making sure enough fluids are taken",
      "Medication reminders",
      "Activities that engage memory, such as music, photos and simple tasks",
      "Home safety checks and help preventing wandering",
      "Updates for family and coordination with doctors",
    ],
    rightFor: [
      "Memory loss is making everyday tasks hard or unsafe",
      "Your loved one has gotten lost or tried to leave home",
      "Confusion or agitation gets worse in the late afternoon or evening",
      "Safety worries, such as the stove left on or doors left open",
      "A family caregiver is exhausted and needs regular support",
    ],
    faqs: [
      { q: "Are your caregivers trained in dementia care?", a: "Yes. Caregivers who support clients with Alzheimer's and dementia receive dementia care training, including communication, calm redirection and safety. Their care plans are overseen by our registered nurses." },
      { q: "Can you help at night or around the clock?", a: "Yes. Many people with dementia need more help in the evening or overnight. We offer evening and overnight shifts, live-in care and 24-hour care." },
      { q: "Will my loved one have the same caregiver?", a: "Consistency matters with memory loss, so we aim to keep the same caregiver or a small team, and we introduce any new caregiver carefully." },
      { q: "What if needs change as the condition progresses?", a: "Our nurses review the care plan regularly and adjust hours and support as needs change. We'll always talk honestly with you about the level of care your loved one needs." },
    ],
    related: ["live-in-24-hour-care", "respite-care", "personal-care"],
  },

  "medication-management": {
    heading: ["Medication", "Management at Home"],
    intro:
      "Missed doses, double doses and confusing prescriptions are a common reason older adults end up back in hospital. We help keep medicines safe and on schedule, with nurse reviews, organized pill boxes and reminders from caregivers who notice when something isn't right.",
    imageKey: "svcMedicationManagement",
    highlights: [
      { title: "Nurse reviews", text: "Medication lists checked by a licensed nurse." },
      { title: "On schedule", text: "Reminders so doses aren't missed or doubled." },
      { title: "Early warnings", text: "Side effects and changes spotted and reported." },
    ],
    included: [
      "Nurse review of all medications and supplements",
      "Weekly pill organizer setup by a nurse",
      "Medication reminders from caregivers",
      "Medication administration by a nurse, when ordered",
      "Watching for side effects and changes in condition",
      "Prescription pick-ups and refill tracking",
      "An up-to-date medication list for doctors and family",
      "Coordination with physicians and pharmacies",
    ],
    rightFor: [
      "Your loved one takes several medications a day",
      "Doses have been missed, doubled or mixed up",
      "Memory changes make it hard to keep track",
      "Prescriptions changed after a hospital stay",
      "Family can't check medications every day",
    ],
    faqs: [
      { q: "Can a caregiver give medication?", a: "Caregivers provide reminders and help your loved one follow their routine. Medication setup, review and administration are handled by our licensed nurses, as allowed under New Jersey rules and your physician's orders." },
      { q: "What do you do if a dose is missed?", a: "Caregivers report missed doses or problems to the nurse, who follows the physician's instructions and keeps the family informed." },
      { q: "Do you work with our pharmacy and doctors?", a: "Yes. We keep a current medication list and coordinate with your doctors and pharmacy when prescriptions change." },
      { q: "Can medication management be added to other care?", a: "Yes. It is often part of personal care, companion care or post-surgery care plans." },
    ],
    related: ["skilled-nursing", "personal-care", "post-surgery-care"],
  },
};
