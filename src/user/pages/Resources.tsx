import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import AccessibilityButton from "@/components/AccessibilityButton";
import AnimatedSection from "@/components/AnimatedSection";
import { useAdmin } from "@/contexts/AdminContext";
import { FAQ_GROUPS, type FaqItem } from "@/data/faqs";
import { SERVICE_INDEX } from "@/data/serviceIndex";
import { COUNTIES } from "@/data/areas";
import { STAFFING_ROLES } from "@/data/staffing";
import { CHECKLISTS, type Checklist } from "@/data/guides";
import { BLOG_POSTS } from "@/data/blog";
import {
  ArrowRight, Phone, MessageCircle, Search, X, BookOpen, HelpCircle, ListChecks, PhoneCall, ClipboardList,
  UserCheck, HeartPulse, Pill as PillIcon, Stethoscope, FileText, CalendarDays, Heart, Clock, ChevronRight,
  MapPin, Building2, Briefcase, Sparkles, CheckCircle2, ShieldCheck, Printer, RotateCcw, Newspaper, DollarSign,
} from "lucide-react";
import React from "react";

// /resources (hub + site search), /how-it-works and /faq share this chunk.

const GRADIENT_BTN = {
  background: "linear-gradient(135deg, hsl(214 66% 44%) 0%, hsl(192 91% 37%) 100%)",
  border: "1px solid rgba(255,255,255,0.3)",
  boxShadow: "0 2px 12px rgba(38,104,188,0.30), inset 0 1px 0 rgba(255,255,255,0.25)",
  color: "#fff",
};
const BRAND_GRADIENT = "linear-gradient(135deg, #1d4f8c 0%, #2a66b0 55%, #0891b2 100%)";
// White tints are inline styles: the dark theme overrides bg-white/* classes.
const WHITE_TINT = "rgba(255,255,255,0.15)";

/* ════════════════════════════════════════════
   SHARED PIECES
   ════════════════════════════════════════════ */

const Breadcrumb = ({ trail }: { trail: { label: string; to?: string }[] }) => (
  <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-8 flex flex-wrap items-center gap-2">
    {trail.map((c, i) => (
      <React.Fragment key={c.label}>
        {i > 0 && <span className="text-gray-300">/</span>}
        {c.to
          ? <Link to={c.to} className="hover:text-[#2a66b0] transition-colors">{c.label}</Link>
          : <span className="text-[#2a66b0] font-medium" aria-current="page">{c.label}</span>}
      </React.Fragment>
    ))}
  </nav>
);

const Pill = ({ icon: Icon, children }: { icon: typeof BookOpen; children: ReactNode }) => (
  <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-6">
    <Icon className="w-3.5 h-3.5 text-[#2a66b0]" />
    <span className="text-xs font-semibold text-[#2a66b0] uppercase tracking-widest">{children}</span>
  </div>
);

const HeroDeco = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="absolute rounded-full deco-drift" style={{ background: "radial-gradient(circle, #bfdbfe 0%, transparent 70%)", width: 620, height: 620, top: "-18%", right: "-10%", opacity: 0.7 }} />
    <div className="absolute rounded-full deco-float-down" style={{ background: "radial-gradient(circle, #a7f3d0 0%, transparent 70%)", width: 400, height: 400, bottom: "-20%", left: "-8%", opacity: 0.5 }} />
    <div className="absolute rounded-full deco-float-up" style={{ background: "radial-gradient(circle, #c7d2fe 0%, transparent 70%)", width: 300, height: 300, top: "12%", left: "28%", opacity: 0.35 }} />
    <div className="absolute top-[24%] right-[38%] w-28 h-28 rounded-full border-[3px] border-dashed border-[#0891b2]/[0.1] deco-spin-slow hidden lg:block" />
    <svg className="absolute bottom-0 left-0 w-full h-16 opacity-[0.06]" viewBox="0 0 1440 64" preserveAspectRatio="none">
      <path d="M0,32 C360,64 720,0 1080,32 C1260,48 1380,16 1440,32 L1440,64 L0,64 Z" fill="#2a66b0" />
    </svg>
  </div>
);

const CtaBlock = ({ tel, phone, title, text }: { tel: string; phone: string; title: string; text: string }) => (
  <section className="py-20 bg-background">
    <div className="container mx-auto px-4 md:px-6">
      <AnimatedSection>
        <div className="relative rounded-3xl overflow-hidden px-6 py-12 sm:px-10 sm:py-16 md:px-16 text-center" style={{ background: BRAND_GRADIENT }}>
          <div className="pointer-events-none absolute top-0 right-0 w-72 h-72 rounded-full -translate-y-1/2 translate-x-1/4" style={{ background: "rgba(255,255,255,0.10)" }} />
          <div className="pointer-events-none absolute bottom-0 left-0 w-52 h-52 rounded-full translate-y-1/2 -translate-x-1/4" style={{ background: "rgba(255,255,255,0.08)" }} />
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5" style={{ background: WHITE_TINT }}>
              <Clock className="w-3.5 h-3.5 text-white" />
              <span className="text-xs font-semibold text-white uppercase tracking-widest">We're here 24/7</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-white leading-snug mb-4">{title}</h2>
            <p className="text-white/80 text-sm md:text-base leading-relaxed mb-9">{text}</p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <a href={`tel:+1${tel}`} className="inline-flex items-center justify-center gap-2 font-bold text-sm px-7 py-4 rounded-full transition-all hover:scale-105 shadow-lg" style={{ background: "#fff", color: "#1d4f8c" }}>
                <Phone className="h-4 w-4" /> Call {phone}
              </a>
              <a href={`https://wa.me/1${tel}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 font-bold text-sm px-7 py-4 rounded-full text-white transition-all hover:scale-105"
                style={{ background: WHITE_TINT, border: "1px solid rgba(255,255,255,0.35)" }}>
                <MessageCircle className="h-4 w-4" /> WhatsApp Us
              </a>
              <Link to="/free-consultation" className="inline-flex items-center justify-center gap-2 font-bold text-sm px-7 py-4 rounded-full text-white transition-all hover:scale-105"
                style={{ background: WHITE_TINT, border: "1px solid rgba(255,255,255,0.35)" }}>
                Free Consultation <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

/** Accordion item whose answer stays in the HTML when closed (readable by search engines). */
const FaqRow = ({ item, index, open, onToggle, idPrefix }: { item: FaqItem; index: number; open: boolean; onToggle: () => void; idPrefix: string }) => (
  <div className={`bg-card border rounded-2xl shadow-sm transition-all duration-300 ${open ? "border-[#2a66b0]/30 shadow-lg" : "border-border hover:shadow-md"}`}>
    <button type="button" onClick={onToggle} aria-expanded={open} aria-controls={`${idPrefix}-${index}`}
      className="w-full flex items-center gap-4 text-left px-5 md:px-6 py-5">
      <span className="h-9 w-9 rounded-xl text-xs font-bold flex items-center justify-center shrink-0 text-white shadow-md" style={{ background: BRAND_GRADIENT }}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="flex-1 font-semibold text-gray-900 leading-snug">{item.q}</span>
      <ChevronRight className={`h-5 w-5 text-[#2a66b0] shrink-0 transition-transform duration-300 ${open ? "rotate-90" : ""}`} />
    </button>
    <div id={`${idPrefix}-${index}`} className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
      <div className="overflow-hidden">
        <div className="px-5 md:px-6 pb-6 md:pl-[76px]">
          <p className="text-gray-600 leading-relaxed">{item.a}</p>
          {item.link && (
            <Link to={item.link.to} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2a66b0] mt-3 hover:gap-2.5 transition-all">
              {item.link.label} <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  </div>
);

/* ════════════════════════════════════════════
   SITE SEARCH (used on /resources)
   ════════════════════════════════════════════ */

interface SearchEntry { title: string; text: string; to: string; kind: string; icon: typeof BookOpen }

const SEARCH_INDEX: SearchEntry[] = [
  { title: "How It Works", text: "Getting started with home care: free consultation, in-home assessment, care plan, caregiver match", to: "/how-it-works", kind: "Guide", icon: ListChecks },
  { title: "Frequently Asked Questions", text: "Answers about services, caregivers, scheduling, costs, service area", to: "/faq", kind: "FAQ", icon: HelpCircle },
  { title: "Free Consultation", text: "Request a free home care consultation and in-home assessment", to: "/free-consultation", kind: "Page", icon: CalendarDays },
  { title: "All Care Services", text: "In-home care and specialized clinical services", to: "/services", kind: "Page", icon: Stethoscope },
  { title: "Areas We Serve", text: "12 New Jersey counties and towns", to: "/areas-we-serve", kind: "Page", icon: MapPin },
  { title: "Facility Staffing", text: "HHA CNA LPN RN staffing for nursing homes assisted living rehab", to: "/facility-staffing", kind: "Page", icon: Building2 },
  { title: "Request Facility Staff", text: "Staffing request form for facilities", to: "/facility-staffing/request-staff", kind: "Page", icon: Building2 },
  { title: "Open Positions", text: "Caregiver and nursing jobs, apply online", to: "/careers/jobs", kind: "Careers", icon: Briefcase },
  { title: "About MintexCare", text: "Our story, mission and team in Edison NJ", to: "/about", kind: "Page", icon: Heart },
  { title: "Why MintexCare", text: "Licensed by the State of New Jersey, bonded, insured, RN supervision, caregiver screening, background check, drug test, TB test, trust, safety", to: "/about/why-mintexcare", kind: "Page", icon: ShieldCheck },
  { title: "Reviews & Testimonials", text: "What families say, testimonials, reviews, experience", to: "/reviews", kind: "Page", icon: Heart },
  { title: "Contact", text: "Phone, email, office address, directions", to: "/contact", kind: "Page", icon: Phone },
  { title: "Privacy Policy", text: "How we protect your information", to: "/privacy-policy", kind: "Legal", icon: ShieldCheck },
  { title: "HIPAA Notice of Privacy Practices", text: "Health information privacy rights", to: "/hipaa-notice", kind: "Legal", icon: ShieldCheck },
  ...SERVICE_INDEX.map(s => ({ title: s.name, text: s.short, to: `/services/${s.slug}`, kind: "Service", icon: s.icon })),
  ...COUNTIES.map(c => ({ title: `${c.name} County`, text: `Home care in ${c.name} County NJ: ${c.towns.join(", ")}`, to: `/areas-we-serve/${c.slug}`, kind: "Area", icon: MapPin })),
  ...STAFFING_ROLES.map(r => ({ title: `${r.title} (${r.code}) staffing`, text: r.summary, to: `/facility-staffing/roles#${r.code.toLowerCase()}`, kind: "Staffing", icon: r.icon })),
  ...FAQ_GROUPS.flatMap(g => g.items.map(i => ({ title: i.q, text: i.a, to: `/faq#${g.id}`, kind: "FAQ", icon: HelpCircle }))),
  { title: "Family Guides & Checklists", text: "Printable checklists for families: home safety, hospital discharge, agency questions, caregiver burnout", to: "/resources/guides", kind: "Guide", icon: ListChecks },
  ...CHECKLISTS.map(c => ({ title: c.title, text: `${c.intro} ${c.groups.flatMap(g => g.items).join(" ")}`, to: `/resources/guides#${c.id}`, kind: "Checklist", icon: c.icon })),
  { title: "Care Articles", text: "Blog articles and advice for families planning home care", to: "/blog", kind: "Blog", icon: Newspaper },
  { title: "Costs & Payment", text: "Paying for home care, price, cost, quote, payment options", to: "/paying-for-care", kind: "Page", icon: DollarSign },
  { title: "Cost of Home Care in NJ", text: "What affects the price of home care, rates, hourly, live-in, 24-hour, nursing, free quote", to: "/paying-for-care/cost", kind: "Page", icon: DollarSign },
  { title: "Private Pay", text: "Pay by check, credit card, debit card, ACH bank transfer, Zelle or cash", to: "/paying-for-care/private-pay", kind: "Page", icon: DollarSign },
  ...BLOG_POSTS.map(p => ({ title: p.title, text: `${p.description} ${p.sections.map(s => s.heading).join(" ")}`, to: `/blog/${p.slug}`, kind: "Article", icon: Newspaper })),
];

const searchSite = (query: string) => {
  const words = query.toLowerCase().split(/\s+/).filter(w => w.length > 1);
  if (words.length === 0) return [];
  return SEARCH_INDEX
    .map(e => {
      const title = e.title.toLowerCase(), text = e.text.toLowerCase();
      if (!words.every(w => title.includes(w) || text.includes(w))) return null;
      // Title matches rank above body matches.
      return { e, score: words.reduce((s, w) => s + (title.includes(w) ? 3 : 1), 0) };
    })
    .filter((r): r is { e: SearchEntry; score: number } => !!r)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map(r => r.e);
};

/* ════════════════════════════════════════════
   /resources
   ════════════════════════════════════════════ */

const HUB_CARDS = [
  { to: "/how-it-works", icon: ListChecks, title: "How It Works", text: "The four simple steps from your first call to care at home, and what to have ready." },
  { to: "/faq", icon: HelpCircle, title: "Frequently Asked Questions", text: "Answers about services, caregivers, scheduling, costs and the areas we serve." },
  { to: "/resources/guides", icon: ClipboardList, title: "Family Guides & Checklists", text: "Printable checklists for home safety, hospital discharge and choosing an agency." },
  { to: "/blog", icon: Newspaper, title: "Care Articles", text: "Practical advice for families, from spotting the signs to planning care." },
  { to: "/services", icon: Stethoscope, title: "Care Services Guide", text: "What each service includes and who it helps, from personal care to skilled nursing." },
  { to: "/areas-we-serve", icon: MapPin, title: "Areas We Serve", text: "Check whether we cover your town across 12 New Jersey counties." },
];

const Hub = ({ tel, phone }: { tel: string; phone: string }) => {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchSite(query), [query]);
  const searching = query.trim().length >= 2;

  return (
    <>
      <section className="relative pt-32 md:pt-40 pb-20 overflow-hidden">
        <HeroDeco />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center"><Breadcrumb trail={[{ label: "Home", to: "/" }, { label: "Resources" }]} /></div>
            <Pill icon={BookOpen}>Family Resources</Pill>
            <h1 className="font-bold text-gray-900 leading-[1.07] mb-5" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)" }}>
              Help &amp; <span className="text-[#2a66b0]">Resources</span>
            </h1>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-9 max-w-[600px] mx-auto">
              Clear answers for families planning care at home. Search the site, or start with one of the guides below.
            </p>

            {/* Site search */}
            <div className="relative max-w-2xl mx-auto text-left">
              <label htmlFor="site-search" className="sr-only">Search the MintexCare website</label>
              <Search className="absolute left-5 top-[30px] -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input id="site-search" type="search" autoComplete="off" value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Search services, towns, questions…"
                className="w-full h-[60px] rounded-full pl-14 pr-12 bg-card border border-border shadow-xl shadow-primary/5 text-foreground placeholder:text-gray-400 outline-none focus:ring-4 focus:ring-[#2a66b0]/15 focus:border-[#2a66b0]/40 [&::-webkit-search-cancel-button]:appearance-none" />
              {query && (
                <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-4 top-[30px] -translate-y-1/2 p-1.5 rounded-full text-gray-400 hover:text-gray-700">
                  <X className="h-4 w-4" />
                </button>
              )}
              <div aria-live="polite">
                {searching && (
                  <div className="mt-3 bg-card border border-border rounded-3xl shadow-2xl overflow-hidden">
                    {results.length > 0 ? (
                      <ul className="divide-y divide-border">
                        {results.map(r => (
                          <li key={r.to + r.title}>
                            <Link to={r.to} className="group flex items-center gap-4 px-5 py-4 hover:bg-[#2a66b0]/[0.04] transition-colors">
                              <span className="w-10 h-10 rounded-xl bg-[#2a66b0]/10 flex items-center justify-center shrink-0">
                                <r.icon className="w-5 h-5 text-[#2a66b0]" />
                              </span>
                              <span className="flex-1 min-w-0">
                                <span className="block font-semibold text-gray-900 group-hover:text-[#2a66b0] truncate">{r.title}</span>
                                <span className="block text-xs text-gray-500 truncate">{r.text}</span>
                              </span>
                              <span className="text-[10px] font-bold uppercase tracking-widest text-[#0891b2] shrink-0">{r.kind}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="px-5 py-5 text-sm text-gray-600">
                        No results for "{query.trim()}". Try another word, or{" "}
                        <a href={`tel:+1${tel}`} className="font-semibold text-[#2a66b0]">call us at {phone}</a>, we're happy to help.
                      </p>
                    )}
                  </div>
                )}
              </div>
              {!searching && (
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {["live-in care", "skilled nursing", "Edison", "cost", "caregivers"].map(s => (
                    <button key={s} type="button" onClick={() => setQuery(s)}
                      className="text-xs font-medium text-gray-600 bg-card border border-border rounded-full px-3.5 py-1.5 hover:border-[#2a66b0]/40 hover:text-[#2a66b0] transition-colors">
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-[#f7f8f9] border-t border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HUB_CARDS.map(({ to, icon: I, title, text }, i) => (
              <AnimatedSection key={to} delay={i * 0.06} className="h-full">
                <Link to={to} className="group relative h-full flex flex-col bg-card border border-border rounded-3xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#2a66b0]/25 transition-all duration-300 overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" style={{ background: BRAND_GRADIENT }} />
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform" style={{ background: BRAND_GRADIENT }}>
                    <I className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 mb-2">{title}</h2>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1">{text}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2a66b0] mt-5 group-hover:gap-2.5 transition-all">
                    Read more <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          {/* Popular questions */}
          <AnimatedSection className="mt-14">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Popular questions</h2>
              <Link to="/faq" className="inline-flex items-center gap-2 text-sm font-semibold text-[#2a66b0] hover:gap-3 transition-all">All FAQs <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {FAQ_GROUPS.slice(0, 4).map(g => g.items[0]).map(item => (
                <Link key={item.q} to="/faq" className="group flex items-center gap-4 bg-card border border-border rounded-2xl px-5 py-4 shadow-sm hover:shadow-md hover:border-[#2a66b0]/25 transition-all">
                  <HelpCircle className="h-5 w-5 text-[#0891b2] shrink-0" />
                  <span className="flex-1 font-semibold text-gray-800 group-hover:text-[#2a66b0]">{item.q}</span>
                  <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-[#2a66b0]" />
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CtaBlock tel={tel} phone={phone} title="Still have questions?" text="Our care coordinators are happy to talk through your situation, day or night, with no obligation." />
    </>
  );
};

/* ════════════════════════════════════════════
   /how-it-works
   ════════════════════════════════════════════ */

const STEPS = [
  { icon: PhoneCall, title: "Reach out", time: "Day 1", text: "Call us 24/7, message us on WhatsApp or request a free consultation online. A care coordinator listens to what's going on, answers your questions and explains your options." },
  { icon: ClipboardList, title: "Free in-home assessment", time: "Within days", text: "We visit your loved one at home to understand their health, daily routines, home safety and what matters most to them. There's no cost and no obligation." },
  { icon: UserCheck, title: "Care plan & caregiver match", time: "Before care starts", text: "We build a personalized care plan, agree the schedule with you and match a caregiver or nurse with the right skills and personality." },
  { icon: HeartPulse, title: "Care begins, with ongoing support", time: "Ongoing", text: "Care starts on the agreed day. Our nurses oversee the care plan, check in regularly and update it as needs change, and you can reach us 24/7." },
];

const PREPARE = [
  { icon: PillIcon, text: "A list of current medications and doses" },
  { icon: Stethoscope, text: "Doctors' names and contact details" },
  { icon: FileText, text: "Hospital or rehab discharge papers, if any" },
  { icon: CalendarDays, text: "The days and hours you need help" },
  { icon: Heart, text: "Routines, preferences, likes and dislikes" },
  { icon: ShieldCheck, text: "Insurance or benefit information you have" },
];

const HowItWorks = ({ tel, phone }: { tel: string; phone: string }) => (
  <>
    <section className="relative pt-32 md:pt-40 pb-16 md:pb-20 overflow-hidden">
      <HeroDeco />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection className="max-w-3xl">
          <Breadcrumb trail={[{ label: "Home", to: "/" }, { label: "Resources", to: "/resources" }, { label: "How It Works" }]} />
          <Pill icon={ListChecks}>Getting Started</Pill>
          <h1 className="font-bold text-gray-900 leading-[1.07] mb-5" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)" }}>
            How Home Care<br /><span className="text-[#2a66b0]">With MintexCare Works</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-8 max-w-[600px]">
            Arranging care for someone you love can feel overwhelming. We keep it simple: four steps from your first
            call to a caregiver at the door, with a care coordinator guiding you the whole way.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/free-consultation" className="inline-flex items-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-full transition-all hover:scale-105" style={GRADIENT_BTN}>
              Start with a Free Consultation <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={`tel:+1${tel}`} className="inline-flex items-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-full text-foreground hover:text-primary transition-all glass-btn">
              <Phone className="h-4 w-4" /> Call {phone}
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>

    {/* Steps */}
    <section className="py-20 md:py-24 bg-[#f7f8f9] border-t border-border">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="relative">
        <div className="absolute left-7 md:left-1/2 top-4 bottom-4 w-px md:-translate-x-1/2 bg-gradient-to-b from-[#2a66b0]/40 via-[#0891b2]/30 to-[#2a66b0]/10" aria-hidden="true" />
        <ol className="relative">
          {STEPS.map(({ icon: I, title, time, text }, i) => (
            <li key={title} className={`relative flex md:items-center gap-6 md:gap-0 mb-10 last:mb-0 ${i % 2 ? "md:flex-row-reverse" : ""}`}>
              <div className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg md:absolute md:left-1/2 md:-translate-x-1/2" style={{ background: BRAND_GRADIENT }}>
                <I className="w-6 h-6 text-white" />
              </div>
              <AnimatedSection from={i % 2 ? "right" : "left"} className={`flex-1 md:w-1/2 md:flex-none ${i % 2 ? "md:pl-16" : "md:pr-16"}`}>
                <div className="bg-card border border-border rounded-3xl p-6 md:p-7 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-[#2a66b0]">STEP {i + 1}</span>
                    <span className="text-[11px] font-semibold text-[#0891b2] bg-cyan-50 border border-cyan-100 rounded-full px-2.5 py-0.5">{time}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
                  <p className="text-gray-500 leading-relaxed">{text}</p>
                </div>
              </AnimatedSection>
            </li>
          ))}
        </ol>
        </div>
      </div>
    </section>

    {/* Prepare + promises */}
    <section className="py-20 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
          <AnimatedSection from="left">
            <Pill icon={ListChecks}>Before the Assessment</Pill>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">What to <span className="text-[#2a66b0]">have ready</span></h2>
            <p className="text-gray-500 leading-relaxed mb-8">You don't need everything, but these help us build an accurate plan at the first visit.</p>
            <ul className="grid sm:grid-cols-2 gap-4">
              {PREPARE.map(({ icon: I, text }) => (
                <li key={text} className="flex items-center gap-4 bg-card border border-border rounded-2xl p-4 shadow-sm">
                  <span className="w-10 h-10 rounded-xl bg-[#0891b2]/10 flex items-center justify-center shrink-0"><I className="w-5 h-5 text-[#0891b2]" /></span>
                  <span className="text-gray-700 leading-snug">{text}</span>
                </li>
              ))}
            </ul>
          </AnimatedSection>
          <AnimatedSection from="right" delay={0.1}>
            <div className="relative rounded-3xl p-8 overflow-hidden text-white" style={{ background: BRAND_GRADIENT }}>
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full -translate-y-1/2 translate-x-1/3" style={{ background: "rgba(255,255,255,0.10)" }} />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: WHITE_TINT }}>
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Our promise to your family</h3>
                <div className="w-10 h-[3px] rounded-full mb-5" style={{ background: "rgba(255,255,255,0.5)" }} />
                <ul className="space-y-3.5 mb-7">
                  {[
                    "Free consultation and assessment, no obligation",
                    "Clear pricing before care starts",
                    "Background-checked, trained caregivers",
                    "Care plans overseen by registered nurses",
                    "Change hours or services any time",
                    "Someone to talk to 24/7",
                  ].map(t => (
                    <li key={t} className="flex items-start gap-3 text-sm text-white/90"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /> {t}</li>
                  ))}
                </ul>
                <Link to="/free-consultation" className="flex items-center justify-center gap-2 font-bold text-sm px-6 py-3.5 rounded-full shadow-lg transition-all hover:scale-[1.03]" style={{ background: "#fff", color: "#1d4f8c" }}>
                  Book a Free Consultation <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection className="mt-12">
          <div className="grid md:grid-cols-2 gap-4">
            <Link to="/faq" className="group flex items-center gap-4 rounded-3xl border border-blue-100 bg-blue-50 p-6 hover:shadow-md transition-all">
              <span className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md" style={{ background: BRAND_GRADIENT }}><HelpCircle className="w-6 h-6 text-white" /></span>
              <span className="flex-1"><span className="block font-bold text-gray-900">Have more questions?</span><span className="block text-sm text-gray-600">Read our frequently asked questions.</span></span>
              <ArrowRight className="h-5 w-5 text-[#2a66b0] group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/facility-staffing" className="group flex items-center gap-4 rounded-3xl border border-blue-100 bg-blue-50 p-6 hover:shadow-md transition-all">
              <span className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md" style={{ background: BRAND_GRADIENT }}><Building2 className="w-6 h-6 text-white" /></span>
              <span className="flex-1"><span className="block font-bold text-gray-900">Staffing a care facility?</span><span className="block text-sm text-gray-600">See how facility staffing works.</span></span>
              <ArrowRight className="h-5 w-5 text-[#2a66b0] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>

    <CtaBlock tel={tel} phone={phone} title="Ready to take the first step?" text="Talk to a care coordinator today. We'll answer your questions and arrange a free in-home assessment." />
  </>
);

/* ════════════════════════════════════════════
   /faq
   ════════════════════════════════════════════ */

const Faq = ({ tel, phone }: { tel: string; phone: string }) => {
  const [open, setOpen] = useState<string | null>(`${FAQ_GROUPS[0].id}-0`);

  return (
    <>
      <section className="relative pt-32 md:pt-40 pb-16 overflow-hidden">
        <HeroDeco />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <AnimatedSection className="max-w-3xl">
            <Breadcrumb trail={[{ label: "Home", to: "/" }, { label: "Resources", to: "/resources" }, { label: "FAQ" }]} />
            <Pill icon={HelpCircle}>FAQ</Pill>
            <h1 className="font-bold text-gray-900 leading-[1.07] mb-5" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)" }}>
              Frequently Asked<br /><span className="text-[#2a66b0]">Questions</span>
            </h1>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-[600px]">
              Answers to the questions families ask us most. Can't find yours? Call us any time at{" "}
              <a href={`tel:+1${tel}`} className="font-semibold text-[#2a66b0]">{phone}</a>.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-[#f7f8f9] border-t border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-[260px_1fr] gap-10 items-start max-w-6xl mx-auto">
            {/* Topic list */}
            <nav aria-label="FAQ topics" className="lg:sticky lg:top-32 bg-card border border-border rounded-3xl p-5 shadow-sm">
              <p className="text-xs font-semibold text-[#2a66b0] uppercase tracking-widest mb-3 px-3">Topics</p>
              <ul className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible -mx-1 px-1" style={{ scrollbarWidth: "none" }}>
                {FAQ_GROUPS.map(g => (
                  <li key={g.id} className="shrink-0">
                    <a href={`#${g.id}`} className="flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-[#2a66b0] transition-colors whitespace-nowrap">
                      {g.title} <span className="text-xs text-gray-400">{g.items.length}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="space-y-12 min-w-0">
              {FAQ_GROUPS.map(g => (
                <section key={g.id} id={g.id} className="scroll-mt-32">
                  <h2 className="text-2xl font-bold text-gray-900 mb-5">{g.title}</h2>
                  <div className="space-y-3">
                    {g.items.map((item, i) => {
                      const key = `${g.id}-${i}`;
                      return <FaqRow key={key} item={item} index={i} idPrefix={g.id} open={open === key} onToggle={() => setOpen(open === key ? null : key)} />;
                    })}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBlock tel={tel} phone={phone} title="Didn't find your answer?" text="Call, message or request a free consultation. A care coordinator will help with your specific situation." />
    </>
  );
};

/* ════════════════════════════════════════════
   /resources/guides — Family Guides & Checklists
   ════════════════════════════════════════════ */

// Ticks are a per-visitor convenience only (browser storage), so they may be unavailable; never rely on them.
const loadTicks = (id: string): string[] => {
  try { return JSON.parse(localStorage.getItem(`mintexcare-checklist-${id}`) ?? "[]"); } catch { return []; }
};
const saveTicks = (id: string, ticks: string[]) => {
  try { localStorage.setItem(`mintexcare-checklist-${id}`, JSON.stringify(ticks)); } catch { /* storage unavailable */ }
};

/** Prints just this checklist (see the print rules for [data-print-area] in index.css). */
const printChecklist = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.setAttribute("data-print-area", "active");
  document.body.setAttribute("data-printing", "");
  const done = () => {
    el.removeAttribute("data-print-area");
    document.body.removeAttribute("data-printing");
    window.removeEventListener("afterprint", done);
  };
  window.addEventListener("afterprint", done);
  window.print();
};

const ChecklistCard = ({ c }: { c: Checklist }) => {
  const [ticks, setTicks] = useState<string[]>([]);
  useEffect(() => { setTicks(loadTicks(c.id)); }, [c.id]);
  const total = c.groups.reduce((n, g) => n + g.items.length, 0);
  const toggle = (item: string) => {
    const next = ticks.includes(item) ? ticks.filter(t => t !== item) : [...ticks, item];
    setTicks(next);
    saveTicks(c.id, next);
  };
  const Icon = c.icon;

  return (
    <article id={c.id} className="scroll-mt-32 bg-card border border-border rounded-3xl shadow-sm overflow-hidden">
      <div className="relative px-6 md:px-9 py-7 text-white overflow-hidden" style={{ background: BRAND_GRADIENT }}>
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full -translate-y-1/2 translate-x-1/4" style={{ background: "rgba(255,255,255,0.10)" }} />
        <div className="relative flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ background: WHITE_TINT, border: "1px solid rgba(255,255,255,0.3)" }}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-bold">{c.title}</h2>
            <p className="text-white/80 text-sm mt-1 leading-relaxed">{c.intro}</p>
          </div>
        </div>
        {/* Progress */}
        <div className="relative mt-6 flex items-center gap-4" data-print-hide>
          <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: WHITE_TINT }}>
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(ticks.length / total) * 100}%`, background: "#fff" }} />
          </div>
          <span className="text-sm font-semibold whitespace-nowrap">{ticks.length} of {total} done</span>
        </div>
      </div>

      <div className="p-6 md:p-9 grid md:grid-cols-2 gap-x-10 gap-y-7">
        {c.groups.map(g => (
          <div key={g.heading}>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#2a66b0] mb-3">{g.heading}</h3>
            <ul className="space-y-2">
              {g.items.map(item => {
                const checked = ticks.includes(item);
                return (
                  <li key={item}>
                    <label className={`flex items-start gap-3 rounded-xl px-3 py-2.5 cursor-pointer transition-colors ${checked ? "bg-[#0891b2]/[0.07]" : "hover:bg-[#2a66b0]/[0.04]"}`}>
                      <input type="checkbox" checked={checked} onChange={() => toggle(item)}
                        className="mt-0.5 h-5 w-5 shrink-0 rounded border-gray-300 accent-[#0891b2] cursor-pointer" />
                      <span className={`leading-snug ${checked ? "text-gray-400 line-through" : "text-gray-700"}`}>{item}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="px-6 md:px-9 pb-7 flex flex-wrap items-center gap-3" data-print-hide>
        <button type="button" onClick={() => printChecklist(c.id)}
          className="inline-flex items-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-full transition-all hover:scale-[1.03]" style={GRADIENT_BTN}>
          <Printer className="h-4 w-4" /> Print checklist
        </button>
        {ticks.length > 0 && (
          <button type="button" onClick={() => { setTicks([]); saveTicks(c.id, []); }}
            className="inline-flex items-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-full text-foreground hover:text-primary glass-btn">
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
        )}
        {c.related && (
          <Link to={c.related.to} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2a66b0] ml-auto hover:gap-2.5 transition-all">
            {c.related.label} <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </article>
  );
};

const Guides = ({ tel, phone }: { tel: string; phone: string }) => (
  <>
    <section className="relative pt-32 md:pt-40 pb-16 overflow-hidden">
      <HeroDeco />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection className="max-w-3xl">
          <Breadcrumb trail={[{ label: "Home", to: "/" }, { label: "Resources", to: "/resources" }, { label: "Family Guides" }]} />
          <Pill icon={ListChecks}>Free Checklists</Pill>
          <h1 className="font-bold text-gray-900 leading-[1.07] mb-5" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)" }}>
            Family Guides<br /><span className="text-[#2a66b0]">&amp; Checklists</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-8 max-w-[600px]">
            Practical checklists for families caring for an older parent or loved one. Tick items off as you go,
            or print a checklist to keep on the fridge.
          </p>
          <div className="flex flex-wrap gap-2">
            {CHECKLISTS.map(c => (
              <a key={c.id} href={`#${c.id}`} className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-gray-700 bg-card border border-border shadow-sm hover:text-[#2a66b0] hover:border-[#2a66b0]/30 transition-all">
                <c.icon className="h-4 w-4 text-[#2a66b0]" /> {c.title}
              </a>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>

    <section className="py-14 md:py-20 bg-[#f7f8f9] border-t border-border">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl space-y-8">
        {CHECKLISTS.map(c => (
          <AnimatedSection key={c.id}><ChecklistCard c={c} /></AnimatedSection>
        ))}
        <p className="text-xs text-gray-500 text-center leading-relaxed max-w-2xl mx-auto">
          These checklists are general information, not medical advice. Always follow the guidance of your loved one's
          doctors and care team, and call 911 in an emergency.
        </p>
      </div>
    </section>

    <CtaBlock tel={tel} phone={phone} title="Want a professional opinion?" text="A free in-home assessment covers safety, daily needs and the right level of care, with no obligation." />
  </>
);

/* ════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════ */

const FAQ_SCHEMA_ID = "faq-page-schema";

const Resources = () => {
  const { pathname, hash } = useLocation();
  const { contactInfo } = useAdmin();
  const tel = contactInfo.phone.replace(/[^\d+]/g, "");
  const phone = contactInfo.phone;

  // App scrolls to the top on route change; then jump to a #topic if the link had one.
  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" }), 450);
    return () => clearTimeout(t);
  }, [pathname, hash]);

  // FAQPage structured data on /faq (replaces the copy already in the prerendered HTML).
  useEffect(() => {
    document.getElementById(FAQ_SCHEMA_ID)?.remove();
    if (pathname !== "/faq") return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = FAQ_SCHEMA_ID;
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": "https://mintexcare.com/faq#faq",
      "mainEntity": FAQ_GROUPS.flatMap(g => g.items).map(i => ({ "@type": "Question", "name": i.q, "acceptedAnswer": { "@type": "Answer", "text": i.a } })),
    });
    document.head.appendChild(script);
    return () => { document.getElementById(FAQ_SCHEMA_ID)?.remove(); };
  }, [pathname]);

  return (
    <>
      <Header />
      <main className="bg-background overflow-x-clip">
        {pathname === "/how-it-works" ? <HowItWorks tel={tel} phone={phone} />
          : pathname === "/faq" ? <Faq tel={tel} phone={phone} />
          : pathname === "/resources/guides" ? <Guides tel={tel} phone={phone} />
          : <Hub tel={tel} phone={phone} />}
      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
      <AccessibilityButton />
    </>
  );
};

export default Resources;
