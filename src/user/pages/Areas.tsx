import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import AccessibilityButton from "@/components/AccessibilityButton";
import AnimatedSection from "@/components/AnimatedSection";
import { useAdmin } from "@/contexts/AdminContext";
import {
  COUNTIES, AREA_REGION_LABEL, countyBySlug, townBySlug, townPageFor, type AreaRegion, type CountyArea, type TownArea,
} from "@/data/areas";
import { SERVICE_INDEX, SERVICE_GROUP_LABEL, type ServiceGroup } from "@/data/serviceIndex";
import {
  ArrowRight, Phone, MessageCircle, MapPin, Search, ShieldCheck, Clock, Award, Building2, Landmark,
  ChevronRight, Navigation, HeartPulse, UserCheck, Home, X,
} from "lucide-react";
import React from "react";

// /areas-we-serve (hub with town search) and /areas-we-serve/{county}-county share this chunk.

const GRADIENT_BTN = {
  background: "linear-gradient(135deg, hsl(214 66% 44%) 0%, hsl(192 91% 37%) 100%)",
  border: "1px solid rgba(255,255,255,0.3)",
  boxShadow: "0 2px 12px rgba(38,104,188,0.30), inset 0 1px 0 rgba(255,255,255,0.25)",
  color: "#fff",
};
const BRAND_GRADIENT = "linear-gradient(135deg, #1d4f8c 0%, #2a66b0 55%, #0891b2 100%)";
// White tints are inline styles: the dark theme overrides bg-white/* classes.
const WHITE_TINT = "rgba(255,255,255,0.15)";

const REGION_COLOR: Record<AreaRegion, string> = { central: "#2a66b0", north: "#0891b2", shore: "#14b8a6" };

const PROMISES = [
  { icon: ShieldCheck, title: "Licensed & insured", text: "A New Jersey licensed agency, bonded and insured." },
  { icon: UserCheck,   title: "Screened caregivers", text: "Background-checked, trained and supervised by our nurses." },
  { icon: HeartPulse,  title: "Personalized plans", text: "Care built around your loved one's needs and routines." },
  { icon: Clock,       title: "Here 24/7",          text: "Someone to talk to day or night, every day of the year." },
];

/* ════════════════════════════════════════════
   SHARED PIECES
   ════════════════════════════════════════════ */

const Pill = ({ icon: Icon, children }: { icon: typeof MapPin; children: ReactNode }) => (
  <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-6">
    <Icon className="w-3.5 h-3.5 text-[#2a66b0]" />
    <span className="text-xs font-semibold text-[#2a66b0] uppercase tracking-widest">{children}</span>
  </div>
);

const Eyebrow = ({ children, color = "#2a66b0" }: { children: ReactNode; color?: string }) => (
  <div className="inline-flex items-center gap-3 mb-5">
    <span className="h-px w-10 inline-block" style={{ background: color }} />
    <span className="text-xs font-extrabold uppercase tracking-[0.25em]" style={{ color }}>{children}</span>
    <span className="h-px w-10 inline-block" style={{ background: color }} />
  </div>
);

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

const HeroDeco = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="absolute rounded-full deco-drift" style={{ background: "radial-gradient(circle, #bfdbfe 0%, transparent 70%)", width: 620, height: 620, top: "-18%", right: "-10%", opacity: 0.7 }} />
    <div className="absolute rounded-full deco-float-down" style={{ background: "radial-gradient(circle, #a7f3d0 0%, transparent 70%)", width: 400, height: 400, bottom: "-20%", left: "-8%", opacity: 0.5 }} />
    <div className="absolute rounded-full deco-float-up" style={{ background: "radial-gradient(circle, #c7d2fe 0%, transparent 70%)", width: 300, height: 300, top: "12%", left: "28%", opacity: 0.35 }} />
    <div className="absolute top-[22%] right-[42%] w-28 h-28 rounded-full border-[3px] border-dashed border-[#0891b2]/[0.1] deco-spin-slow hidden lg:block" />
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

/** County card used on the hub and in "nearby counties". */
const CountyCard = ({ c, i }: { c: CountyArea; i: number }) => {
  const color = REGION_COLOR[c.region];
  return (
    <AnimatedSection delay={Math.min(i, 5) * 0.05} className="h-full">
      <Link to={`/areas-we-serve/${c.slug}`}
        className="group relative h-full flex flex-col bg-card border border-border rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#2a66b0]/25 transition-all duration-300 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" style={{ background: color }} />
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform" style={{ background: `${color}14` }}>
            <MapPin className="w-6 h-6" style={{ color }} />
          </div>
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest text-right leading-tight">Seat: {c.seat}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{c.name} County</h3>
        <p className="text-sm text-gray-500 leading-relaxed flex-1">{c.towns.slice(0, 4).join(", ")} and more</p>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold mt-4 transition-all group-hover:gap-2.5" style={{ color }}>
          Home care in {c.name} <ArrowRight className="h-4 w-4" />
        </span>
      </Link>
    </AnimatedSection>
  );
};

/* ════════════════════════════════════════════
   /areas-we-serve
   ════════════════════════════════════════════ */

// Search entries; towns with their own page link there, the rest link to their county.
const ALL_TOWNS = COUNTIES.flatMap(c => [
  { town: `${c.name} County`, county: c, to: `/areas-we-serve/${c.slug}` },
  ...c.towns.map(town => {
    const page = townPageFor(town);
    return { town, county: c, to: `/areas-we-serve/${page ? page.slug : c.slug}` };
  }),
]);

const Hub = ({ tel, phone }: { tel: string; phone: string }) => {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const matches = useMemo(
    () => (q.length < 2 ? [] : ALL_TOWNS.filter(t => t.town.toLowerCase().includes(q)).slice(0, 8)),
    [q],
  );
  const regions: AreaRegion[] = ["central", "north", "shore"];

  return (
    <>
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-24 overflow-hidden">
        <HeroDeco />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-14 xl:gap-20 items-center">
            <AnimatedSection from="left">
              <Breadcrumb trail={[{ label: "Home", to: "/" }, { label: "Areas We Serve" }]} />
              <Pill icon={MapPin}>Areas We Serve</Pill>
              <h1 className="font-bold text-gray-900 leading-[1.07] mb-5" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)" }}>
                Home Care Across<br /><span className="text-[#2a66b0]">12 New Jersey Counties</span>
              </h1>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-8 max-w-[560px]">
                From our office in Edison, MintexCare provides in-home care, skilled nursing and facility staffing
                across Central and North New Jersey and the Jersey Shore. Find your town below.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/free-consultation" className="inline-flex items-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-full transition-all hover:scale-105" style={GRADIENT_BTN}>
                  Free Consultation <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={`tel:+1${tel}`} className="inline-flex items-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-full text-foreground hover:text-primary transition-all glass-btn">
                  <Phone className="h-4 w-4" /> Call {phone}
                </a>
              </div>
            </AnimatedSection>

            {/* Town finder */}
            <AnimatedSection from="right" delay={0.15} className="relative max-w-[520px] w-full mx-auto lg:mx-0 lg:justify-self-end">
              <div className="absolute -inset-3 rounded-[2.5rem] rotate-2 bg-[#2a66b0]/[0.06] border border-[#2a66b0]/10 hidden sm:block" />
              <div className="relative rounded-[2rem] p-7 sm:p-9 shadow-2xl overflow-hidden text-white" style={{ background: BRAND_GRADIENT }}>
                <div className="absolute top-0 right-0 w-56 h-56 rounded-full -translate-y-1/3 translate-x-1/4" style={{ background: "rgba(255,255,255,0.10)" }} />
                <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full translate-y-1/3 -translate-x-1/4" style={{ background: "rgba(255,255,255,0.08)" }} />
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: WHITE_TINT, border: "1px solid rgba(255,255,255,0.3)" }}>
                    <Navigation className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Is my town covered?</h2>
                  <p className="text-white/80 text-sm mb-6">Type your town or county to see the page for your area.</p>
                  <label htmlFor="town-search" className="sr-only">Search for your town or county</label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input id="town-search" type="search" autoComplete="off" value={query} onChange={e => setQuery(e.target.value)}
                      placeholder="e.g. Woodbridge, Toms River…"
                      className="w-full h-14 rounded-2xl pl-12 pr-11 text-gray-900 placeholder:text-gray-400 outline-none focus:ring-4 focus:ring-white/30 [&::-webkit-search-cancel-button]:appearance-none"
                      style={{ background: "#fff" }} />
                    {query && (
                      <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-gray-400 hover:text-gray-700">
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <div aria-live="polite" className="mt-3 min-h-[3rem]">
                    {q.length >= 2 && matches.length > 0 && (
                      <ul className="rounded-2xl overflow-hidden shadow-xl" style={{ background: "#fff" }}>
                        {matches.map(({ town, county, to }) => (
                          <li key={`${county.slug}-${town}`}>
                            <Link to={to} className="flex items-center justify-between gap-3 px-4 py-3 text-sm hover:bg-blue-50 transition-colors" style={{ color: "#1f2937" }}>
                              <span className="flex items-center gap-2 font-semibold"><MapPin className="h-4 w-4" style={{ color: "#2a66b0" }} /> {town}</span>
                              <span className="text-xs" style={{ color: "#6b7280" }}>
                                {town === `${county.name} County` ? "County page" : `${county.name} County`} <ChevronRight className="inline h-3.5 w-3.5" />
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                    {q.length >= 2 && matches.length === 0 && (
                      <p className="text-sm text-white/90 rounded-2xl px-4 py-3" style={{ background: WHITE_TINT }}>
                        We didn't find "{query.trim()}" on our list, but we may still be able to help.{" "}
                        <a href={`tel:+1${tel}`} className="font-bold underline">Call {phone}</a>.
                      </p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 text-sm text-white/85">
                    <span className="flex items-center gap-1.5"><Landmark className="h-4 w-4" /> 12 counties</span>
                    <span className="flex items-center gap-1.5"><Building2 className="h-4 w-4" /> Office in Edison</span>
                    <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> 24/7</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* COUNTIES BY REGION */}
      <section className="py-20 md:py-24 bg-[#f7f8f9] border-t border-border relative overflow-hidden">
        <div className="pointer-events-none select-none absolute inset-0 z-0" aria-hidden="true">
          <svg className="svc-deco-float absolute -top-4 -left-4 w-44 h-44 opacity-[0.15]" viewBox="0 0 100 100" fill="none">
            <rect x="44" y="2" width="12" height="96" rx="5" fill="#2a66b0" /><rect x="2" y="44" width="96" height="12" rx="5" fill="#2a66b0" />
          </svg>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <AnimatedSection className="text-center mb-14">
            <Eyebrow>Our Counties</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Choose Your <span className="text-[#2a66b0]">County</span></h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">See the towns we serve and the care available near you</p>
          </AnimatedSection>
          {regions.map(region => (
            <div key={region} className="mb-12 last:mb-0">
              <AnimatedSection className="flex items-center gap-4 mb-6">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: REGION_COLOR[region] }} />
                <h3 className="text-sm font-bold uppercase tracking-widest whitespace-nowrap" style={{ color: REGION_COLOR[region] }}>{AREA_REGION_LABEL[region]}</h3>
                <span className="h-px flex-1 bg-border" />
              </AnimatedSection>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {COUNTIES.filter(c => c.region === region).map((c, i) => <CountyCard key={c.slug} c={c} i={i} />)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection className="text-center mb-14">
            <Eyebrow color="#0891b2">Wherever You Are</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">The same standard of care <span className="text-[#0891b2]">in every county</span></h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROMISES.map(({ icon: I, title, text }, i) => (
              <AnimatedSection key={title} delay={i * 0.06} className="h-full">
                <div className="h-full bg-card border border-border rounded-3xl p-6 shadow-sm">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-md" style={{ background: BRAND_GRADIENT }}>
                    <I className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-bold text-gray-900 mb-1">{title}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CtaBlock tel={tel} phone={phone}
        title="Not sure if we cover your area?"
        text="Call or message us. If your town isn't listed, we'll tell you honestly whether we can help or point you to someone who can." />
    </>
  );
};

/* ════════════════════════════════════════════
   /areas-we-serve/{county}-county
   ════════════════════════════════════════════ */

/** All 10 services as a two-column linked list, plus the facility staffing note. */
const ServicesInArea = ({ place }: { place: string }) => (
  <section className="py-20 md:py-24 relative overflow-hidden">
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute rounded-full deco-float-down" style={{ background: "radial-gradient(circle, #e0f2fe 0%, transparent 70%)", width: 460, height: 460, top: "-10%", right: "-12%", opacity: 0.55 }} />
    </div>
    <div className="container mx-auto px-4 md:px-6 relative z-10">
      <AnimatedSection className="text-center mb-14">
        <Eyebrow color="#0891b2">Care Available</Eyebrow>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our services in <span className="text-[#0891b2]">{place}</span></h2>
        <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">Every MintexCare service is available to families in {place}</p>
      </AnimatedSection>
      <div className="grid lg:grid-cols-2 gap-8">
        {(["in-home", "clinical"] as ServiceGroup[]).map(group => (
          <AnimatedSection key={group}>
            <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm h-full">
              <p className="text-xs font-bold uppercase tracking-widest text-[#2a66b0] mb-5">{SERVICE_GROUP_LABEL[group]}</p>
              <ul className="divide-y divide-border">
                {SERVICE_INDEX.filter(s => s.group === group).map(s => (
                  <li key={s.slug}>
                    <Link to={`/services/${s.slug}`} className="group flex items-center gap-4 py-4">
                      <div className="w-11 h-11 rounded-xl bg-[#2a66b0]/10 flex items-center justify-center shrink-0 group-hover:bg-[#2a66b0] transition-colors">
                        <s.icon className="w-5 h-5 text-[#2a66b0] group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 group-hover:text-[#2a66b0] transition-colors">{s.name}</p>
                        <p className="text-sm text-gray-500 leading-snug">{s.short}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-[#2a66b0] group-hover:translate-x-0.5 transition-all shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        ))}
      </div>
      <AnimatedSection className="mt-8">
        <Link to="/facility-staffing" className="group flex flex-col sm:flex-row sm:items-center gap-4 rounded-3xl border border-blue-100 bg-blue-50 p-6 hover:shadow-md transition-all">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md" style={{ background: BRAND_GRADIENT }}>
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-900">Run a care facility in {place}?</p>
            <p className="text-sm text-gray-600">We also provide HHAs, CNAs, LPNs and RNs to nursing homes, assisted living and rehab facilities.</p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2a66b0] group-hover:gap-2.5 transition-all">Facility staffing <ArrowRight className="h-4 w-4" /></span>
        </Link>
      </AnimatedSection>
    </div>
  </section>
);

/** FAQ accordion; answers stay in the HTML when closed so search engines can read them. */
const AreaFaqList = ({ faqs }: { faqs: { q: string; a: string }[] }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return (
    <div className="space-y-4">
      {faqs.map((f, i) => {
        const open = openFaq === i;
        return (
          <div key={f.q} className={`bg-card border rounded-2xl shadow-sm transition-all duration-300 ${open ? "border-[#2a66b0]/30 shadow-lg" : "border-border hover:shadow-md"}`}>
            <button type="button" onClick={() => setOpenFaq(open ? null : i)} aria-expanded={open} aria-controls={`afaq-${i}`}
              className="w-full flex items-center gap-4 text-left px-5 md:px-6 py-5">
              <span className="h-9 w-9 rounded-xl text-xs font-bold flex items-center justify-center shrink-0 text-white shadow-md" style={{ background: BRAND_GRADIENT }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 font-semibold text-gray-900 leading-snug">{f.q}</span>
              <ChevronRight className={`h-5 w-5 text-[#2a66b0] shrink-0 transition-transform duration-300 ${open ? "rotate-90" : ""}`} />
            </button>
            <div id={`afaq-${i}`} className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
              <div className="overflow-hidden">
                <p className="text-gray-600 leading-relaxed px-5 md:px-6 pb-6 md:pl-[76px]">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const County = ({ c, tel, phone }: { c: CountyArea; tel: string; phone: string }) => {
  const neighbors = c.neighbors.map(countyBySlug).filter((n): n is CountyArea => !!n);

  return (
    <>
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-24 overflow-hidden">
        <HeroDeco />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-14 xl:gap-20 items-center">
            <AnimatedSection from="left">
              <Breadcrumb trail={[{ label: "Home", to: "/" }, { label: "Areas We Serve", to: "/areas-we-serve" }, { label: `${c.name} County` }]} />
              <Pill icon={MapPin}>{AREA_REGION_LABEL[c.region]}</Pill>
              <h1 className="font-bold text-gray-900 leading-[1.07] mb-5" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)" }}>
                Home Care in<br /><span className="text-[#2a66b0]">{c.name} County, NJ</span>
              </h1>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-8 max-w-[580px]">{c.intro}</p>
              <div className="flex flex-wrap gap-3 mb-9">
                <Link to="/free-consultation" className="inline-flex items-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-full transition-all hover:scale-105" style={GRADIENT_BTN}>
                  Free Consultation <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={`tel:+1${tel}`} className="inline-flex items-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-full text-foreground hover:text-primary transition-all glass-btn">
                  <Phone className="h-4 w-4" /> Call {phone}
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                {[
                  { icon: ShieldCheck, label: "NJ State Licensed" },
                  { icon: Award,       label: "Bonded & Insured" },
                  { icon: Clock,       label: "Available 24/7" },
                ].map(({ icon: I, label }) => (
                  <div key={label} className="flex items-center gap-2 text-sm text-gray-500"><I className="w-4 h-4 text-[#2a66b0]" /><span>{label}</span></div>
                ))}
              </div>
            </AnimatedSection>

            {/* County card */}
            <AnimatedSection from="right" delay={0.15} className="relative max-w-[500px] w-full mx-auto lg:mx-0 lg:justify-self-end">
              <div className="absolute -inset-3 rounded-[2.5rem] rotate-3 bg-[#2a66b0]/[0.06] border border-[#2a66b0]/10 hidden sm:block" />
              <div className="relative rounded-[2rem] p-7 sm:p-9 shadow-2xl overflow-hidden text-white" style={{ background: BRAND_GRADIENT }}>
                <div className="absolute top-0 right-0 w-56 h-56 rounded-full -translate-y-1/3 translate-x-1/4" style={{ background: "rgba(255,255,255,0.10)" }} />
                <div className="absolute inset-12 rounded-full border border-dashed deco-spin-slow" style={{ borderColor: "rgba(255,255,255,0.14)" }} />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-7">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0" style={{ background: WHITE_TINT, border: "1px solid rgba(255,255,255,0.3)" }}>
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-white/70 font-semibold">MintexCare serves</p>
                      <p className="text-2xl font-bold leading-tight">{c.name} County</p>
                    </div>
                  </div>
                  <dl className="grid grid-cols-2 gap-3 mb-6">
                    {[
                      { icon: Landmark, k: "County seat", v: c.seat },
                      { icon: Home,     k: "Towns listed", v: `${c.towns.length}+` },
                      { icon: Building2, k: "Our office", v: "Edison, NJ" },
                      { icon: Clock,    k: "Availability", v: "24/7" },
                    ].map(({ icon: I, k, v }) => (
                      <div key={k} className="rounded-2xl p-4" style={{ background: WHITE_TINT }}>
                        <I className="w-4 h-4 text-white/80 mb-2" />
                        <dt className="text-[11px] uppercase tracking-widest text-white/70">{k}</dt>
                        <dd className="font-bold text-white">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <a href="#towns" className="flex items-center justify-center gap-2 font-bold text-sm px-6 py-3.5 rounded-full shadow-lg transition-all hover:scale-[1.03]" style={{ background: "#fff", color: "#1d4f8c" }}>
                    See towns we serve <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* TOWNS */}
      <section id="towns" className="py-16 md:py-20 bg-muted/50 border-y border-border scroll-mt-24">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection className="text-center mb-10">
            <Eyebrow>Towns We Serve</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Communities in <span className="text-[#2a66b0]">{c.name} County</span></h2>
          </AnimatedSection>
          <AnimatedSection>
            <ul className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
              {c.towns.map(t => {
                // Towns with their own page are links (highlighted); the rest are plain chips.
                const page = townPageFor(t);
                return page ? (
                  <li key={t}>
                    <Link to={`/areas-we-serve/${page.slug}`} className="flex items-center gap-2 bg-blue-50 border border-[#2a66b0]/25 rounded-full pl-3 pr-4 py-2.5 shadow-sm text-sm font-semibold text-[#2a66b0] hover:bg-[#2a66b0] hover:text-white transition-colors">
                      <MapPin className="h-4 w-4" /> {t} <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </li>
                ) : (
                  <li key={t} className="flex items-center gap-2 bg-card border border-border rounded-full pl-3 pr-4 py-2.5 shadow-sm text-sm font-medium text-gray-700">
                    <MapPin className="h-4 w-4 text-[#0891b2]" /> {t}
                  </li>
                );
              })}
            </ul>
            <p className="text-center text-sm text-gray-500 mt-8">
              Don't see your town? We serve all of {c.name} County.{" "}
              <a href={`tel:+1${tel}`} className="text-[#2a66b0] font-semibold hover:underline">Call {phone}</a> to confirm.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <ServicesInArea place={`${c.name} County`} />

      {/* WHY + FAQ */}
      <section className="py-20 md:py-24 bg-[#f7f8f9]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10 xl:gap-14 items-start">
            <AnimatedSection from="left">
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2a66b0]" />
                <span className="text-xs font-semibold text-[#2a66b0] uppercase tracking-widest">Why MintexCare</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-8">
                Care {c.name} County <span className="text-[#2a66b0]">families trust</span>
              </h2>
              <ul className="space-y-4">
                {PROMISES.map(({ icon: I, title, text }) => (
                  <li key={title} className="flex gap-4 bg-card border border-border rounded-2xl p-5 shadow-sm">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-md" style={{ background: BRAND_GRADIENT }}>
                      <I className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{title}</p>
                      <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection from="right" delay={0.1}>
              <p className="text-xs font-semibold text-[#0891b2] uppercase tracking-widest mb-2">FAQ</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Home care in {c.name} County</h2>
              <AreaFaqList key={c.slug} faqs={countyFaqs(c)} />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* NEARBY COUNTIES */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold text-[#0891b2] uppercase tracking-widest mb-2">Nearby</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Neighboring counties we serve</h2>
            </div>
            <Link to="/areas-we-serve" className="inline-flex items-center gap-2 text-sm font-semibold text-[#2a66b0] hover:gap-3 transition-all">
              All 12 counties <ArrowRight className="h-4 w-4" />
            </Link>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {neighbors.map((n, i) => <CountyCard key={n.slug} c={n} i={i} />)}
          </div>
        </div>
      </section>

      <CtaBlock tel={tel} phone={phone}
        title={`Arrange home care in ${c.name} County`}
        text="A care coordinator will answer your questions and set up a free in-home assessment, with no obligation." />
    </>
  );
};

/* ════════════════════════════════════════════
   /areas-we-serve/{town}-nj  (Phase 2 town pages)
   ════════════════════════════════════════════ */

const townFaqs = (t: TownArea) => [
  t.faq,
  {
    q: `How quickly can home care start in ${t.name}?`,
    a: `After a free phone consultation we arrange an in-home assessment in ${t.name}. In many cases care can begin within a few days, and sooner when it's urgent, such as a hospital discharge.`,
  },
  {
    q: `What kinds of care do you provide in ${t.name}?`,
    a: `Everything from companionship and help around the house to personal care, live-in and 24-hour care, respite care, and skilled nursing from licensed RNs and LPNs, all at home in ${t.name}.`,
  },
  {
    q: "Can I meet the caregiver before care starts?",
    a: "We match caregivers to each client's needs and personality and are happy to introduce them before or at the first visit. If it isn't the right fit, tell us and we'll make a change.",
  },
];

const Town = ({ t, tel, phone }: { t: TownArea; tel: string; phone: string }) => {
  const county = countyBySlug(t.countySlug)!;
  const nearby = t.nearby.map(townBySlug).filter((n): n is TownArea => !!n);
  const isOfficeTown = t.slug === "edison-nj";

  return (
    <>
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-24 overflow-hidden">
        <HeroDeco />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-14 xl:gap-20 items-center">
            <AnimatedSection from="left">
              <Breadcrumb trail={[
                { label: "Home", to: "/" },
                { label: "Areas We Serve", to: "/areas-we-serve" },
                { label: `${county.name} County`, to: `/areas-we-serve/${county.slug}` },
                { label: t.name },
              ]} />
              <Pill icon={MapPin}>{county.name} County · {t.kind}</Pill>
              <h1 className="font-bold text-gray-900 leading-[1.07] mb-5" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)" }}>
                Home Care in<br /><span className="text-[#2a66b0]">{t.name}, NJ</span>
              </h1>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-8 max-w-[580px]">{t.intro}</p>
              <div className="flex flex-wrap gap-3 mb-9">
                <Link to="/free-consultation" className="inline-flex items-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-full transition-all hover:scale-105" style={GRADIENT_BTN}>
                  Free Consultation <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={`tel:+1${tel}`} className="inline-flex items-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-full text-foreground hover:text-primary transition-all glass-btn">
                  <Phone className="h-4 w-4" /> Call {phone}
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                {[
                  { icon: ShieldCheck, label: "NJ State Licensed" },
                  { icon: Award,       label: "Bonded & Insured" },
                  { icon: Clock,       label: "Available 24/7" },
                ].map(({ icon: I, label }) => (
                  <div key={label} className="flex items-center gap-2 text-sm text-gray-500"><I className="w-4 h-4 text-[#2a66b0]" /><span>{label}</span></div>
                ))}
              </div>
            </AnimatedSection>

            {/* Town card */}
            <AnimatedSection from="right" delay={0.15} className="relative max-w-[500px] w-full mx-auto lg:mx-0 lg:justify-self-end">
              <div className="absolute -inset-3 rounded-[2.5rem] rotate-3 bg-[#2a66b0]/[0.06] border border-[#2a66b0]/10 hidden sm:block" />
              <div className="relative rounded-[2rem] p-7 sm:p-9 shadow-2xl overflow-hidden text-white" style={{ background: BRAND_GRADIENT }}>
                <div className="absolute top-0 right-0 w-56 h-56 rounded-full -translate-y-1/3 translate-x-1/4" style={{ background: "rgba(255,255,255,0.10)" }} />
                <div className="absolute inset-12 rounded-full border border-dashed deco-spin-slow" style={{ borderColor: "rgba(255,255,255,0.14)" }} />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-7">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0" style={{ background: WHITE_TINT, border: "1px solid rgba(255,255,255,0.3)" }}>
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-white/70 font-semibold">MintexCare serves</p>
                      <p className="text-2xl font-bold leading-tight">{t.name}, NJ</p>
                    </div>
                  </div>
                  <dl className="grid grid-cols-2 gap-3 mb-6">
                    {[
                      { icon: Landmark,  k: "County",       v: county.name },
                      { icon: Home,      k: t.zips.length > 1 ? "ZIP codes" : "ZIP code", v: t.zips.length > 3 ? `${t.zips.slice(0, 3).join(", ")}…` : t.zips.join(", ") },
                      { icon: Building2, k: "Our office",   v: isOfficeTown ? "Right here in Edison" : "Edison, NJ" },
                      { icon: Clock,     k: "Availability", v: "24/7" },
                    ].map(({ icon: I, k, v }) => (
                      <div key={k} className="rounded-2xl p-4" style={{ background: WHITE_TINT }}>
                        <I className="w-4 h-4 text-white/80 mb-2" />
                        <dt className="text-[11px] uppercase tracking-widest text-white/70">{k}</dt>
                        <dd className="font-bold text-white leading-snug">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <a href="#local-area" className="flex items-center justify-center gap-2 font-bold text-sm px-6 py-3.5 rounded-full shadow-lg transition-all hover:scale-[1.03]" style={{ background: "#fff", color: "#1d4f8c" }}>
                    Areas we cover in {t.name} <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* LOCAL NOTES */}
      <section className="py-6 bg-muted/50 border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-4">
            {t.notes.map((n, i) => (
              <AnimatedSection key={n.title} delay={i * 0.07}>
                <div className="flex items-start gap-4 bg-card rounded-2xl px-5 py-5 border border-border h-full">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-white text-sm font-bold" style={{ background: BRAND_GRADIENT }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 leading-snug">{n.title}</p>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">{n.text}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* SECTIONS + ZIPS */}
      <section id="local-area" className="py-16 md:py-20 scroll-mt-24">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection className="text-center mb-10">
            <Eyebrow>Where We Help</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Home care across <span className="text-[#2a66b0]">{t.name}</span></h2>
          </AnimatedSection>
          <AnimatedSection>
            <ul className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
              {t.sections.map(s => (
                <li key={s} className="flex items-center gap-2 bg-card border border-border rounded-full pl-3 pr-4 py-2.5 shadow-sm text-sm font-medium text-gray-700">
                  <MapPin className="h-4 w-4 text-[#0891b2]" /> {s}
                </li>
              ))}
            </ul>
            <p className="text-center text-sm text-gray-500 mt-8">
              ZIP {t.zips.length > 1 ? "codes" : "code"}: <span className="font-semibold text-gray-700">{t.zips.join(", ")}</span>
              {" · "}Part of <Link to={`/areas-we-serve/${county.slug}`} className="text-[#2a66b0] font-semibold hover:underline">{county.name} County</Link>
            </p>
          </AnimatedSection>
        </div>
      </section>

      <ServicesInArea place={t.name} />

      {/* WHY + FAQ */}
      <section className="py-20 md:py-24 bg-[#f7f8f9]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10 xl:gap-14 items-start">
            <AnimatedSection from="left">
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2a66b0]" />
                <span className="text-xs font-semibold text-[#2a66b0] uppercase tracking-widest">Why MintexCare</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-8">
                Care {t.name} <span className="text-[#2a66b0]">families trust</span>
              </h2>
              <ul className="space-y-4">
                {PROMISES.map(({ icon: I, title, text }) => (
                  <li key={title} className="flex gap-4 bg-card border border-border rounded-2xl p-5 shadow-sm">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-md" style={{ background: BRAND_GRADIENT }}>
                      <I className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{title}</p>
                      <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
            <AnimatedSection from="right" delay={0.1}>
              <p className="text-xs font-semibold text-[#0891b2] uppercase tracking-widest mb-2">FAQ</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Home care in {t.name}</h2>
              <AreaFaqList key={t.slug} faqs={townFaqs(t)} />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* NEARBY TOWNS */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold text-[#0891b2] uppercase tracking-widest mb-2">Nearby</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Nearby towns we serve</h2>
            </div>
            <Link to={`/areas-we-serve/${county.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-[#2a66b0] hover:gap-3 transition-all">
              All of {county.name} County <ArrowRight className="h-4 w-4" />
            </Link>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {nearby.map((n, i) => (
              <AnimatedSection key={n.slug} delay={i * 0.05} className="h-full">
                <Link to={`/areas-we-serve/${n.slug}`}
                  className="group relative h-full flex flex-col bg-card border border-border rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#2a66b0]/25 transition-all duration-300 overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" style={{ background: BRAND_GRADIENT }} />
                  <div className="w-12 h-12 rounded-2xl bg-[#2a66b0]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6 text-[#2a66b0]" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{n.name}, NJ</h3>
                  <p className="text-sm text-gray-500 flex-1">{n.kind} · ZIP {n.zips[0]}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2a66b0] mt-4 group-hover:gap-2.5 transition-all">
                    Home care in {n.name} <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CtaBlock tel={tel} phone={phone}
        title={`Arrange home care in ${t.name}`}
        text="A care coordinator will answer your questions and set up a free in-home assessment, with no obligation." />
    </>
  );
};

const countyFaqs = (c: CountyArea) => [
  {
    q: `Which towns in ${c.name} County do you serve?`,
    a: `We serve all of ${c.name} County, including ${c.towns.slice(0, -1).join(", ")} and ${c.towns[c.towns.length - 1]}. If you don't see your town, call us and we'll confirm.`,
  },
  {
    q: `How quickly can home care start in ${c.name} County?`,
    a: "After a free phone consultation we arrange an in-home assessment. In many cases care can begin within a few days, and sooner when it's urgent, such as a hospital discharge.",
  },
  {
    q: `Do you provide skilled nursing at home in ${c.name} County?`,
    a: `Yes. Our licensed RNs and LPNs provide skilled nursing, wound care, IV therapy and medication management at home in ${c.name} County, following your physician's orders.`,
  },
  {
    q: "Can I meet the caregiver before care starts?",
    a: "We match caregivers to each client's needs and personality and are happy to introduce them before or at the first visit. If it isn't the right fit, tell us and we'll make a change.",
  },
];

/* ════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════ */

const AREA_SCHEMA_ID = "area-schema";

const Areas = () => {
  const { pathname } = useLocation();
  const { contactInfo } = useAdmin();
  const tel = contactInfo.phone.replace(/[^\d+]/g, "");
  const phone = contactInfo.phone;
  const slug = pathname.split("/")[2] ?? "";
  const county = countyBySlug(slug);
  const town = townBySlug(slug);

  // County and town pages: a Service limited to that area + their FAQ (replaces the prerendered copy).
  useEffect(() => {
    document.getElementById(AREA_SCHEMA_ID)?.remove();
    const area = county
      ? { slug: county.slug, name: `${county.name} County, NJ`, type: "AdministrativeArea", faqs: countyFaqs(county) }
      : town
        ? { slug: town.slug, name: `${town.name}, NJ`, type: "City", faqs: townFaqs(town) }
        : null;
    if (!area) return;
    const url = `https://mintexcare.com/areas-we-serve/${area.slug}`;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = AREA_SCHEMA_ID;
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "@id": `${url}#service`,
          "name": `Home Care in ${area.name}`,
          "serviceType": "In-home care and skilled nursing",
          "url": url,
          "provider": { "@id": "https://mintexcare.com/#organization" },
          "areaServed": { "@type": area.type, "name": area.name },
        },
        {
          "@type": "FAQPage",
          "@id": `${url}#faq`,
          "mainEntity": area.faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })),
        },
      ],
    });
    document.head.appendChild(script);
    return () => { document.getElementById(AREA_SCHEMA_ID)?.remove(); };
  }, [county, town]);

  return (
    <>
      <Header />
      <main className="bg-background overflow-x-clip">
        {county ? <County c={county} tel={tel} phone={phone} />
          : town ? <Town t={town} tel={tel} phone={phone} />
          : <Hub tel={tel} phone={phone} />}
      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
      <AccessibilityButton />
    </>
  );
};

export default Areas;
