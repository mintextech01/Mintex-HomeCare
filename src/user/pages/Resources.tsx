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
  UserCheck, HeartPulse, Pill as PillIcon, Stethoscope, FileText, CalendarDays, Heart, Clock, ChevronRight, ChevronDown,
  MapPin, Building2, Briefcase, Sparkles, Check, ShieldCheck, Printer, RotateCcw, Newspaper, DollarSign,
} from "lucide-react";
import React from "react";

// /resources (hub + site search), /how-it-works and /faq share this chunk.

/* ════════════════════════════════════════════
   SHARED PIECES
   ════════════════════════════════════════════ */

const Breadcrumb = ({ trail }: { trail: { label: string; to?: string }[] }) => (
  <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-8 flex flex-wrap items-center gap-2">
    {trail.map((c, i) => (
      <React.Fragment key={c.label}>
        {i > 0 && <span className="text-foreground/30">/</span>}
        {c.to
          ? <Link to={c.to} className="hover:text-foreground transition-colors">{c.label}</Link>
          : <span className="text-foreground font-semibold" aria-current="page">{c.label}</span>}
      </React.Fragment>
    ))}
  </nav>
);

const Pill = ({ icon: Icon, children }: { icon: typeof BookOpen; children: ReactNode }) => (
  <div className="el-eyebrow mb-6">
    <Icon className="w-3.5 h-3.5 text-primary" />
    {children}
  </div>
);

const PageHero = ({ trail, pill, pillIcon, children }: {
  trail: { label: string; to?: string }[]; pill: string; pillIcon: typeof BookOpen; children: ReactNode;
}) => (
  <section className="pt-32 md:pt-40 pb-16 md:pb-20">
    <div className="container mx-auto px-6 md:px-10">
      <AnimatedSection className="max-w-3xl">
        <Breadcrumb trail={trail} />
        <Pill icon={pillIcon}>{pill}</Pill>
        {children}
      </AnimatedSection>
    </div>
  </section>
);

const CtaBlock = ({ tel, phone, title, text }: { tel: string; phone: string; title: string; text: string }) => (
  <section className="py-16 md:py-20">
    <div className="container mx-auto px-6 md:px-10">
      <AnimatedSection>
        <div className="rounded-[32px] bg-accent px-6 py-12 sm:px-10 sm:py-16 md:px-16 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="el-eyebrow bg-background border-transparent mb-5">
              <Clock className="w-3.5 h-3.5 text-primary" />
              We're here 24/7
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-accent-foreground leading-snug mb-4">{title}</h2>
            <p className="text-accent-foreground/75 text-sm md:text-base leading-relaxed mb-9">{text}</p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <a href={`tel:+1${tel}`} className="el-btn-primary">
                <Phone className="h-4 w-4" /> Call {phone}
              </a>
              <a href={`https://wa.me/1${tel}`} target="_blank" rel="noopener noreferrer"
                className="el-btn bg-background text-foreground hover:bg-background/80">
                <MessageCircle className="h-4 w-4" /> WhatsApp Us
              </a>
              <Link to="/free-consultation" className="el-btn bg-background text-foreground hover:bg-background/80">
                Free Consultation <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

/** Ink panel linking to a related page. */
const LinkBanner = ({ to, icon: I, title, text }: { to: string; icon: typeof BookOpen; title: string; text: string }) => (
  <Link to={to} className="group flex items-center gap-4 rounded-[24px] bg-foreground text-background p-6">
    <span className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-accent"><I className="w-6 h-6 text-accent-foreground" /></span>
    <span className="flex-1"><span className="block font-bold">{title}</span><span className="block text-sm text-background/70">{text}</span></span>
    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
  </Link>
);

/** Accordion item whose answer stays in the HTML when closed (readable by search engines). */
const FaqRow = ({ item, index, open, onToggle, idPrefix }: { item: FaqItem; index: number; open: boolean; onToggle: () => void; idPrefix: string }) => (
  <div className="bg-background rounded-2xl">
    <button type="button" onClick={onToggle} aria-expanded={open} aria-controls={`${idPrefix}-${index}`}
      className="w-full flex items-center gap-4 text-left px-5 md:px-6 py-5">
      <span className="flex-1 font-semibold text-foreground leading-snug">{item.q}</span>
      <span className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${open ? "bg-foreground text-background" : "bg-surface text-foreground"}`}>
        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </span>
    </button>
    <div id={`${idPrefix}-${index}`} className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
      <div className="overflow-hidden">
        <div className="px-5 md:px-6 pb-6">
          <p className="text-muted-foreground leading-relaxed">{item.a}</p>
          {item.link && (
            <Link to={item.link.to} className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary mt-3 hover:gap-2.5 transition-all">
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
      <section className="pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="container mx-auto px-6 md:px-10">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center"><Breadcrumb trail={[{ label: "Home", to: "/" }, { label: "Resources" }]} /></div>
            <Pill icon={BookOpen}>Family Resources</Pill>
            <h1 className="font-bold text-foreground leading-[1.07] mb-6" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)" }}>
              Help &amp; <span className="text-primary">Resources</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-9 max-w-[600px] mx-auto">
              Clear answers for families planning care at home. Search the site, or start with one of the guides below.
            </p>

            {/* Site search */}
            <div className="relative max-w-2xl mx-auto text-left">
              <label htmlFor="site-search" className="sr-only">Search the MintexCare website</label>
              <Search className="absolute left-5 top-[30px] -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input id="site-search" type="search" autoComplete="off" value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Search services, towns, questions…"
                className="w-full h-[60px] rounded-full pl-14 pr-12 bg-surface border border-border text-foreground placeholder:text-muted-foreground outline-none focus:ring-4 focus:ring-accent focus:border-foreground/30 [&::-webkit-search-cancel-button]:appearance-none" />
              {query && (
                <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-4 top-[30px] -translate-y-1/2 p-1.5 rounded-full text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              )}
              <div aria-live="polite">
                {searching && (
                  <div className="mt-3 bg-background border border-border rounded-[24px] shadow-2xl overflow-hidden">
                    {results.length > 0 ? (
                      <ul className="divide-y divide-border">
                        {results.map(r => (
                          <li key={r.to + r.title}>
                            <Link to={r.to} className="group flex items-center gap-4 px-5 py-4 hover:bg-surface transition-colors">
                              <span className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shrink-0">
                                <r.icon className="w-5 h-5 text-accent-foreground" />
                              </span>
                              <span className="flex-1 min-w-0">
                                <span className="block font-semibold text-foreground group-hover:text-primary truncate">{r.title}</span>
                                <span className="block text-xs text-muted-foreground truncate">{r.text}</span>
                              </span>
                              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground shrink-0">{r.kind}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="px-5 py-5 text-sm text-muted-foreground">
                        No results for "{query.trim()}". Try another word, or{" "}
                        <a href={`tel:+1${tel}`} className="font-semibold text-foreground underline underline-offset-4">call us at {phone}</a>, we're happy to help.
                      </p>
                    )}
                  </div>
                )}
              </div>
              {!searching && (
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {["live-in care", "skilled nursing", "Edison", "cost", "caregivers"].map(s => (
                    <button key={s} type="button" onClick={() => setQuery(s)}
                      className="text-xs font-semibold text-foreground/75 bg-background border border-border rounded-full px-3.5 py-1.5 hover:bg-foreground hover:text-background hover:border-foreground transition-colors">
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-surface">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {HUB_CARDS.map(({ to, icon: I, title, text }, i) => (
              <AnimatedSection key={to} delay={i * 0.05} className="h-full">
                <Link to={to} className="group h-full flex flex-col bg-background rounded-[24px] p-7 transition-shadow duration-300 hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.15)]">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-7 bg-accent transition-colors duration-300 group-hover:bg-foreground">
                    <I className="w-6 h-6 text-accent-foreground transition-colors duration-300 group-hover:text-background" />
                  </div>
                  <h2 className="text-lg font-bold text-foreground mb-2">{title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{text}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-primary transition-colors mt-6">
                    Read more <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          {/* Popular questions */}
          <AnimatedSection className="mt-14">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Popular questions</h2>
              <Link to="/faq" className="el-btn-outline group self-start md:self-auto">All FAQs <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" /></Link>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {FAQ_GROUPS.slice(0, 4).map(g => g.items[0]).map(item => (
                <Link key={item.q} to="/faq" className="group flex items-center gap-4 bg-background rounded-2xl px-5 py-4 transition-shadow hover:shadow-md">
                  <HelpCircle className="h-5 w-5 text-primary shrink-0" />
                  <span className="flex-1 font-semibold text-foreground group-hover:text-primary">{item.q}</span>
                  <ChevronRight className="h-4 w-4 text-foreground/30 group-hover:text-foreground" />
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
    <PageHero trail={[{ label: "Home", to: "/" }, { label: "Resources", to: "/resources" }, { label: "How It Works" }]} pill="Getting Started" pillIcon={ListChecks}>
      <h1 className="font-bold text-foreground leading-[1.07] mb-6" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)" }}>
        How Home Care<br /><span className="text-primary">With MintexCare Works</span>
      </h1>
      <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-[600px]">
        Arranging care for someone you love can feel overwhelming. We keep it simple: four steps from your first
        call to a caregiver at the door, with a care coordinator guiding you the whole way.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link to="/free-consultation" className="el-btn-primary group">
          Start with a Free Consultation <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
        <a href={`tel:+1${tel}`} className="el-btn-soft">
          <Phone className="h-4 w-4" /> Call {phone}
        </a>
      </div>
    </PageHero>

    {/* Steps */}
    <section className="py-20 md:py-24 bg-surface">
      <div className="container mx-auto px-6 md:px-10">
        <ol className="grid md:grid-cols-2 gap-4 md:gap-5 max-w-5xl mx-auto">
          {STEPS.map(({ icon: I, title, time, text }, i) => (
            <AnimatedSection key={title} delay={i * 0.06} className="h-full">
              <li className="h-full bg-background rounded-[28px] p-7 md:p-8 list-none">
                <div className="flex items-start justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-accent">
                    <I className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <span className="text-5xl font-serif font-bold text-foreground/15 leading-none">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[11px] font-bold tracking-[0.15em] text-muted-foreground">STEP {i + 1}</span>
                  <span className="text-[11px] font-semibold text-foreground bg-surface rounded-full px-2.5 py-0.5">{time}</span>
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">{title}</h2>
                <p className="text-muted-foreground leading-relaxed">{text}</p>
              </li>
            </AnimatedSection>
          ))}
        </ol>
      </div>
    </section>

    {/* Prepare + promises */}
    <section className="py-20 md:py-24">
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
          <AnimatedSection>
            <Pill icon={ListChecks}>Before the Assessment</Pill>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">What to <span className="text-primary">have ready</span></h2>
            <p className="text-muted-foreground leading-relaxed mb-8">You don't need everything, but these help us build an accurate plan at the first visit.</p>
            <ul className="grid sm:grid-cols-2 gap-3">
              {PREPARE.map(({ icon: I, text }) => (
                <li key={text} className="flex items-center gap-4 el-card rounded-2xl p-4">
                  <span className="w-10 h-10 rounded-full bg-background flex items-center justify-center shrink-0"><I className="w-5 h-5 text-primary" /></span>
                  <span className="text-foreground/85 leading-snug">{text}</span>
                </li>
              ))}
            </ul>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="rounded-[28px] p-8 bg-foreground text-background">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-accent">
                <Sparkles className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-6">Our promise to your family</h3>
              <ul className="space-y-3.5 mb-8">
                {[
                  "Free consultation and assessment, no obligation",
                  "Clear pricing before care starts",
                  "Background-checked, trained caregivers",
                  "Care plans overseen by registered nurses",
                  "Change hours or services any time",
                  "Someone to talk to 24/7",
                ].map(t => (
                  <li key={t} className="flex items-start gap-3 text-sm text-background/85">
                    <span className="w-5 h-5 rounded-full bg-accent flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-accent-foreground" strokeWidth={3} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <Link to="/free-consultation" className="el-btn bg-accent text-accent-foreground hover:bg-accent/80 w-full">
                Book a Free Consultation <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection className="mt-12">
          <div className="grid md:grid-cols-2 gap-4">
            <LinkBanner to="/faq" icon={HelpCircle} title="Have more questions?" text="Read our frequently asked questions." />
            <LinkBanner to="/facility-staffing" icon={Building2} title="Staffing a care facility?" text="See how facility staffing works." />
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
      <PageHero trail={[{ label: "Home", to: "/" }, { label: "Resources", to: "/resources" }, { label: "FAQ" }]} pill="FAQ" pillIcon={HelpCircle}>
        <h1 className="font-bold text-foreground leading-[1.07] mb-6" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)" }}>
          Frequently Asked<br /><span className="text-primary">Questions</span>
        </h1>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-[600px]">
          Answers to the questions families ask us most. Can't find yours? Call us any time at{" "}
          <a href={`tel:+1${tel}`} className="font-semibold text-foreground underline underline-offset-4">{phone}</a>.
        </p>
      </PageHero>

      <section className="py-14 md:py-20 bg-surface">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-10 items-start max-w-6xl mx-auto">
            {/* Topic list */}
            <nav aria-label="FAQ topics" className="lg:sticky lg:top-32 bg-background rounded-[24px] p-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 px-3 pt-1">Topics</p>
              <ul className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible -mx-1 px-1" style={{ scrollbarWidth: "none" }}>
                {FAQ_GROUPS.map(g => (
                  <li key={g.id} className="shrink-0">
                    <a href={`#${g.id}`} className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-surface hover:text-foreground transition-colors whitespace-nowrap">
                      {g.title} <span className="text-xs text-muted-foreground">{g.items.length}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="space-y-12 min-w-0">
              {FAQ_GROUPS.map(g => (
                <section key={g.id} id={g.id} className="scroll-mt-32">
                  <h2 className="text-2xl font-bold text-foreground mb-5">{g.title}</h2>
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
    <article id={c.id} className="scroll-mt-32 bg-background rounded-[28px] p-2">
      <div className="rounded-[22px] px-6 md:px-9 py-7 bg-foreground text-background">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 bg-accent">
            <Icon className="w-7 h-7 text-accent-foreground" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-bold">{c.title}</h2>
            <p className="text-background/70 text-sm mt-1 leading-relaxed">{c.intro}</p>
          </div>
        </div>
        {/* Progress */}
        <div className="mt-6 flex items-center gap-4" data-print-hide>
          <div className="flex-1 h-2 rounded-full overflow-hidden bg-background/15">
            <div className="h-full rounded-full transition-all duration-500 bg-accent" style={{ width: `${(ticks.length / total) * 100}%` }} />
          </div>
          <span className="text-sm font-semibold whitespace-nowrap">{ticks.length} of {total} done</span>
        </div>
      </div>

      <div className="p-5 md:p-8 grid md:grid-cols-2 gap-x-10 gap-y-7">
        {c.groups.map(g => (
          <div key={g.heading}>
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">{g.heading}</h3>
            <ul className="space-y-1.5">
              {g.items.map(item => {
                const checked = ticks.includes(item);
                return (
                  <li key={item}>
                    <label className={`flex items-start gap-3 rounded-xl px-3 py-2.5 cursor-pointer transition-colors ${checked ? "bg-accent/50" : "hover:bg-surface"}`}>
                      <input type="checkbox" checked={checked} onChange={() => toggle(item)}
                        className="mt-0.5 h-5 w-5 shrink-0 rounded border-border accent-[hsl(var(--foreground))] cursor-pointer" />
                      <span className={`leading-snug ${checked ? "text-muted-foreground line-through" : "text-foreground/85"}`}>{item}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="px-5 md:px-8 pb-6 flex flex-wrap items-center gap-3" data-print-hide>
        <button type="button" onClick={() => printChecklist(c.id)} className="el-btn-primary h-11">
          <Printer className="h-4 w-4" /> Print checklist
        </button>
        {ticks.length > 0 && (
          <button type="button" onClick={() => { setTicks([]); saveTicks(c.id, []); }} className="el-btn-outline h-11">
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
        )}
        {c.related && (
          <Link to={c.related.to} className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary ml-auto hover:gap-2.5 transition-all">
            {c.related.label} <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </article>
  );
};

const Guides = ({ tel, phone }: { tel: string; phone: string }) => (
  <>
    <PageHero trail={[{ label: "Home", to: "/" }, { label: "Resources", to: "/resources" }, { label: "Family Guides" }]} pill="Free Checklists" pillIcon={ListChecks}>
      <h1 className="font-bold text-foreground leading-[1.07] mb-6" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)" }}>
        Family Guides<br /><span className="text-primary">&amp; Checklists</span>
      </h1>
      <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-[600px]">
        Practical checklists for families caring for an older parent or loved one. Tick items off as you go,
        or print a checklist to keep on the fridge.
      </p>
      <div className="flex flex-wrap gap-2">
        {CHECKLISTS.map(c => (
          <a key={c.id} href={`#${c.id}`} className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-foreground bg-background border border-border hover:bg-foreground hover:text-background hover:border-foreground transition-colors">
            <c.icon className="h-4 w-4" /> {c.title}
          </a>
        ))}
      </div>
    </PageHero>

    <section className="py-14 md:py-20 bg-surface">
      <div className="container mx-auto px-6 md:px-10 max-w-5xl space-y-5">
        {CHECKLISTS.map(c => (
          <AnimatedSection key={c.id}><ChecklistCard c={c} /></AnimatedSection>
        ))}
        <p className="text-xs text-muted-foreground text-center leading-relaxed max-w-2xl mx-auto pt-3">
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
      <main className="theme-el overflow-x-clip">
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
