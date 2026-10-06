/**
 * Site-wide FAQ (/faq), grouped by topic. Answers only state what MintexCare already says elsewhere
 * on the site. Payment answers stay general until accepted payers (LTC insurance, Medicaid/MLTSS,
 * VA) are confirmed; add those questions with the Costs & Payment pages.
 */
export interface FaqItem { q: string; a: string; link?: { to: string; label: string } }
export interface FaqGroup { id: string; title: string; items: FaqItem[] }

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: "getting-started",
    title: "Getting started",
    items: [
      { q: "How do I get started with home care?", a: "Call us 24/7, message us on WhatsApp, or request a free consultation online. A care coordinator will talk through your loved one's needs, answer your questions and arrange a free in-home assessment.", link: { to: "/how-it-works", label: "How it works" } },
      { q: "Is the consultation really free?", a: "Yes. The phone consultation and the in-home assessment are free, and there's no obligation to start care." },
      { q: "How quickly can care start?", a: "In many cases care can begin within a few days of the assessment, and sooner when it's urgent, such as a hospital discharge. Call us as soon as you know a date." },
      { q: "What should I have ready for the assessment?", a: "A list of current medications, your loved one's doctors and their contact details, any hospital discharge papers, and an idea of the days and hours you need help. Notes about routines, likes and dislikes help us match the right caregiver." },
    ],
  },
  {
    id: "services",
    title: "Services & care",
    items: [
      { q: "What services do you offer?", a: "In-home care (personal care, companion care and homemaking, hourly care, live-in and 24-hour care, respite care) and specialized clinical care (post-surgery and hospital-to-home care, skilled nursing, rehab and therapy support, wound care and IV therapy, and medication management).", link: { to: "/services", label: "All care services" } },
      { q: "What is the difference between companion care and personal care?", a: "Companion care covers company, household help, meals and errands. Personal care adds hands-on help with bathing, dressing, toileting and mobility. Many families combine both in one care plan." },
      { q: "Do you provide skilled nursing at home?", a: "Yes. Our licensed registered nurses (RNs) and licensed practical nurses (LPNs) provide skilled nursing at home, including wound care, IV therapy and medication management, following your physician's orders.", link: { to: "/services/skilled-nursing", label: "Skilled nursing" } },
      { q: "Can someone stay with my parent day and night?", a: "Yes. We provide live-in caregivers and 24-hour care with caregivers working in shifts. We'll help you decide which fits your loved one's needs.", link: { to: "/services/live-in-24-hour-care", label: "Live-in & 24-hour care" } },
    ],
  },
  {
    id: "caregivers",
    title: "Caregivers & safety",
    items: [
      { q: "Who are your caregivers?", a: "Trained, background-checked caregivers such as certified home health aides, supported by licensed nurses. Our registered nurses oversee care plans and check in regularly." },
      { q: "Is MintexCare licensed and insured?", a: "Yes. MintexCare is a New Jersey licensed home care agency, and we are bonded and insured." },
      { q: "Can we meet or choose the caregiver?", a: "We match caregivers to each client's needs and personality, and your input is always welcome. If a caregiver isn't the right fit, tell us and we'll make a change." },
      { q: "What happens if the regular caregiver is unavailable?", a: "We work to arrange a qualified replacement who follows the same care plan, so your loved one isn't left without support." },
    ],
  },
  {
    id: "scheduling",
    title: "Scheduling & service area",
    items: [
      { q: "What areas do you serve?", a: "We serve 12 New Jersey counties: Middlesex, Monmouth, Somerset, Union, Mercer, Essex, Bergen, Hudson, Passaic, Morris, Ocean and Burlington.", link: { to: "/areas-we-serve", label: "Find your town" } },
      { q: "Is care available at night, on weekends and on holidays?", a: "Yes. Care is available 24 hours a day, 7 days a week, and someone is always available to talk to." },
      { q: "Is there a minimum number of hours?", a: "Visit lengths depend on the care needed and scheduling in your area. We'll explain the options during your free consultation." },
      { q: "Can we change the care plan later?", a: "Yes. Care plans are flexible. Hours, days and services can be adjusted as your loved one's needs change." },
    ],
  },
  {
    id: "costs",
    title: "Costs & payment",
    items: [
      { q: "How much does home care cost?", a: "Cost depends on the type of care, the number of hours and the schedule. After we understand your needs, we'll give you clear pricing before care starts, with no obligation.", link: { to: "/paying-for-care/cost", label: "Cost of home care in NJ" } },
      { q: "How can we pay for care?", a: "Families pay MintexCare directly (private pay) by check, credit or debit card, bank transfer (ACH), Zelle or cash. If you have other coverage, tell us during your consultation and we'll talk through your situation.", link: { to: "/paying-for-care/private-pay", label: "Private pay" } },
    ],
  },
  {
    id: "staffing-careers",
    title: "Facilities & careers",
    items: [
      { q: "Do you provide staff to nursing homes and other facilities?", a: "Yes. We provide home health aides, CNAs, LPNs and RNs to skilled nursing, assisted living, rehab and long-term care facilities in New Jersey.", link: { to: "/facility-staffing", label: "Facility staffing" } },
      { q: "How do I apply for a job at MintexCare?", a: "See our open positions and apply online in a few minutes. A resume is optional, and we respond to every application within 3–5 business days.", link: { to: "/careers/jobs", label: "Open positions" } },
    ],
  },
];
