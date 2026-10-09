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
  ChevronRight, ChevronDown, Navigation, HeartPulse, UserCheck, Home, X,
} from "lucide-react";
import React from "react";

// /areas-we-serve (hub with town search) and /areas-we-serve/{county}-county share this chunk.

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
  <div className="el-eyebrow mb-6">
    <Icon className="w-3.5 h-3.5 text-primary" />
    {children}
  </div>
);

const Eyebrow = ({ children, onSurface = false }: { children: ReactNode; onSurface?: boolean }) => (
  <div className={`el-eyebrow mb-5 ${onSurface ? "bg-background" : ""}`}>{children}</div>
);

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

const HeroCtas = ({ tel, phone }: { tel: string; phone: string }) => (
  <div className="flex flex-wrap gap-3">
    <Link to="/free-consultation" className="el-btn-primary group">
      Free Consultation <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
    </Link>
    <a href={`tel:+1${tel}`} className="el-btn-soft">
      <Phone className="h-4 w-4" /> Call {phone}
    </a>
  </div>
);

const TrustRow = () => (
  <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
    {[
      { icon: ShieldCheck, label: "NJ State Licensed" },
      { icon: Award,       label: "Bonded & Insured" },
      { icon: Clock,       label: "Available 24/7" },
    ].map(({ icon: I, label }) => (
      <div key={label} className="flex items-center gap-2 text-sm font-semibold text-foreground/80"><I className="w-4 h-4 text-primary" /><span>{label}</span></div>
    ))}
  </div>
);

/** Ink info card shown on the right of county / town heroes. */
const PlaceCard = ({ name, facts, cta }: {
  name: string;
  facts: { icon: typeof MapPin; k: string; v: string }[];
  cta: { href: string; label: string };
}) => (
  <div className="rounded-[28px] p-7 sm:p-9 bg-foreground text-background">
    <div className="flex items-center gap-4 mb-7">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 bg-accent">
        <MapPin className="w-8 h-8 text-accent-foreground" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest text-background/60 font-semibold">MintexCare serves</p>
        <p className="text-2xl font-bold leading-tight">{name}</p>
      </div>
    </div>
    <dl className="grid grid-cols-2 gap-3 mb-6">
      {facts.map(({ icon: I, k, v }) => (
        <div key={k} className="rounded-2xl p-4 bg-background/10">
          <I className="w-4 h-4 text-background/70 mb-2" />
          <dt className="text-[11px] uppercase tracking-widest text-background/60">{k}</dt>
          <dd className="font-bold leading-snug">{v}</dd>
        </div>
      ))}
    </dl>
    <a href={cta.href} className="el-btn bg-accent text-accent-foreground hover:bg-accent/80 w-full">
      {cta.label} <ArrowRight className="h-4 w-4" />
    </a>
  </div>
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

/** County card used on the hub and in "nearby counties". */
const CountyCard = ({ c, i, onSurface = false }: { c: CountyArea; i: number; onSurface?: boolean }) => (
  <AnimatedSection delay={Math.min(i, 5) * 0.05} className="h-full">
    <Link to={`/areas-we-serve/${c.slug}`}
      className={`group h-full flex flex-col rounded-[24px] p-6 transition-shadow duration-300 hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.15)] ${onSurface ? "bg-background" : "bg-surface"}`}>
      <div className="flex items-start justify-between gap-3 mb-5">
        <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center transition-colors duration-300 group-hover:bg-foreground">
          <MapPin className="w-5 h-5 text-accent-foreground transition-colors duration-300 group-hover:text-background" />
        </div>
        <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest text-right leading-tight">Seat: {c.seat}</span>
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2">{c.name} County</h3>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">{c.towns.slice(0, 4).join(", ")} and more</p>
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground group-hover:text-primary transition-colors mt-5">
        Home care in {c.name} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </span>
    </Link>
  </AnimatedSection>
);

/** "Why MintexCare" list used on county and town pages. */
const PromiseList = () => (
  <ul className="space-y-3">
    {PROMISES.map(({ icon: I, title, text }) => (
      <li key={title} className="flex gap-4 bg-background rounded-2xl p-5">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-accent">
          <I className="w-5 h-5 text-accent-foreground" />
        </div>
        <div>
          <p className="font-bold text-foreground">{title}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
        </div>
      </li>
    ))}
  </ul>
);

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
      <section className="pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 xl:gap-16 items-center">
            <AnimatedSection>
              <Breadcrumb trail={[{ label: "Home", to: "/" }, { label: "Areas We Serve" }]} />
              <Pill icon={MapPin}>Areas We Serve</Pill>
              <h1 className="font-bold text-foreground leading-[1.07] mb-6" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)" }}>
                Home Care Across<br /><span className="text-primary">12 New Jersey Counties</span>
              </h1>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-[560px]">
                From our office in Edison, MintexCare provides in-home care, skilled nursing and facility staffing
                across Central and North New Jersey and the Jersey Shore. Find your town below.
              </p>
              <HeroCtas tel={tel} phone={phone} />
            </AnimatedSection>

            {/* Town finder */}
            <AnimatedSection delay={0.1} className="relative max-w-[520px] w-full mx-auto lg:mx-0 lg:justify-self-end">
              <div className="rounded-[28px] p-7 sm:p-9 bg-foreground text-background">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-accent">
                  <Navigation className="w-7 h-7 text-accent-foreground" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Is my town covered?</h2>
                <p className="text-background/70 text-sm mb-6">Type your town or county to see the page for your area.</p>
                <label htmlFor="town-search" className="sr-only">Search for your town or county</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input id="town-search" type="search" autoComplete="off" value={query} onChange={e => setQuery(e.target.value)}
                    placeholder="e.g. Woodbridge, Toms River…"
                    className="w-full h-14 rounded-2xl pl-12 pr-11 bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-4 focus:ring-accent/60 [&::-webkit-search-cancel-button]:appearance-none" />
                  {query && (
                    <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-muted-foreground hover:text-foreground">
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <div aria-live="polite" className="mt-3 min-h-[3rem]">
                  {q.length >= 2 && matches.length > 0 && (
                    <ul className="rounded-2xl overflow-hidden shadow-xl bg-background text-foreground">
                      {matches.map(({ town, county, to }) => (
                        <li key={`${county.slug}-${town}`}>
                          <Link to={to} className="flex items-center justify-between gap-3 px-4 py-3 text-sm hover:bg-surface transition-colors">
                            <span className="flex items-center gap-2 font-semibold"><MapPin className="h-4 w-4 text-primary" /> {town}</span>
                            <span className="text-xs text-muted-foreground">
                              {town === `${county.name} County` ? "County page" : `${county.name} County`} <ChevronRight className="inline h-3.5 w-3.5" />
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                  {q.length >= 2 && matches.length === 0 && (
                    <p className="text-sm text-background/90 rounded-2xl px-4 py-3 bg-background/10">
                      We didn't find "{query.trim()}" on our list, but we may still be able to help.{" "}
                      <a href={`tel:+1${tel}`} className="font-bold underline">Call {phone}</a>.
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 text-sm text-background/75">
                  <span className="flex items-center gap-1.5"><Landmark className="h-4 w-4" /> 12 counties</span>
                  <span className="flex items-center gap-1.5"><Building2 className="h-4 w-4" /> Office in Edison</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> 24/7</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* COUNTIES BY REGION */}
      <section className="py-20 md:py-24 bg-surface">
        <div className="container mx-auto px-6 md:px-10">
          <AnimatedSection className="text-center mb-14">
            <Eyebrow onSurface>Our Counties</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Choose Your <span className="text-primary">County</span></h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">See the towns we serve and the care available near you</p>
          </AnimatedSection>
          {regions.map(region => (
            <div key={region} className="mb-12 last:mb-0">
              <AnimatedSection className="flex items-center gap-4 mb-6">
                <h3 className="text-sm font-bold uppercase tracking-widest whitespace-nowrap text-foreground">{AREA_REGION_LABEL[region]}</h3>
                <span className="h-px flex-1 bg-border" />
              </AnimatedSection>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {COUNTIES.filter(c => c.region === region).map((c, i) => <CountyCard key={c.slug} c={c} i={i} onSurface />)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 md:px-10">
          <AnimatedSection className="text-center mb-14">
            <Eyebrow>Wherever You Are</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">The same standard of care <span className="text-primary">in every county</span></h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROMISES.map(({ icon: I, title, text }, i) => (
              <AnimatedSection key={title} delay={i * 0.06} className="h-full">
                <div className="h-full el-card p-6 md:p-7">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-8 bg-accent">
                    <I className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <p className="font-bold text-foreground text-lg mb-1">{title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
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
  <section className="py-20 md:py-24">
    <div className="container mx-auto px-6 md:px-10">
      <AnimatedSection className="text-center mb-14">
        <Eyebrow>Care Available</Eyebrow>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our services in <span className="text-primary">{place}</span></h2>
        <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">Every MintexCare service is available to families in {place}</p>
      </AnimatedSection>
      <div className="grid lg:grid-cols-2 gap-5">
        {(["in-home", "clinical"] as ServiceGroup[]).map(group => (
          <AnimatedSection key={group}>
            <div className="el-card rounded-[28px] p-6 md:p-8 h-full">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">{SERVICE_GROUP_LABEL[group]}</p>
              <ul className="space-y-2">
                {SERVICE_INDEX.filter(s => s.group === group).map(s => (
                  <li key={s.slug}>
                    <Link to={`/services/${s.slug}`} className="group flex items-center gap-4 rounded-2xl bg-background p-4 transition-shadow hover:shadow-md">
                      <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center shrink-0 transition-colors group-hover:bg-foreground">
                        <s.icon className="w-5 h-5 text-accent-foreground transition-colors group-hover:text-background" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-foreground group-hover:text-primary transition-colors">{s.name}</p>
                        <p className="text-sm text-muted-foreground leading-snug">{s.short}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-foreground/30 group-hover:text-foreground group-hover:translate-x-0.5 transition-all shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        ))}
      </div>
      <AnimatedSection className="mt-5">
        <Link to="/facility-staffing" className="group flex flex-col sm:flex-row sm:items-center gap-4 rounded-[24px] bg-foreground text-background p-6 md:px-8">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-accent">
            <Building2 className="w-6 h-6 text-accent-foreground" />
          </div>
          <div className="flex-1">
            <p className="font-bold">Run a care facility in {place}?</p>
            <p className="text-sm text-background/70">We also provide HHAs, CNAs, LPNs and RNs to nursing homes, assisted living and rehab facilities.</p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all">Facility staffing <ArrowRight className="h-4 w-4" /></span>
        </Link>
      </AnimatedSection>
    </div>
  </section>
);

/** FAQ accordion; answers stay in the HTML when closed so search engines can read them. */
const AreaFaqList = ({ faqs }: { faqs: { q: string; a: string }[] }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {faqs.map((f, i) => {
        const open = openFaq === i;
        return (
          <div key={f.q} className="bg-background rounded-2xl">
            <button type="button" onClick={() => setOpenFaq(open ? null : i)} aria-expanded={open} aria-controls={`afaq-${i}`}
              className="w-full flex items-center gap-4 text-left px-5 md:px-6 py-5">
              <span className="flex-1 font-semibold text-foreground leading-snug">{f.q}</span>
              <span className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${open ? "bg-foreground text-background" : "bg-surface text-foreground"}`}>
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
              </span>
            </button>
            <div id={`afaq-${i}`} className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
              <div className="overflow-hidden">
                <p className="text-muted-foreground leading-relaxed px-5 md:px-6 pb-6">{f.a}</p>
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
      <section className="pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 xl:gap-16 items-center">
            <AnimatedSection>
              <Breadcrumb trail={[{ label: "Home", to: "/" }, { label: "Areas We Serve", to: "/areas-we-serve" }, { label: `${c.name} County` }]} />
              <Pill icon={MapPin}>{AREA_REGION_LABEL[c.region]}</Pill>
              <h1 className="font-bold text-foreground leading-[1.07] mb-6" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)" }}>
                Home Care in<br /><span className="text-primary">{c.name} County, NJ</span>
              </h1>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-[580px]">{c.intro}</p>
              <div className="mb-9"><HeroCtas tel={tel} phone={phone} /></div>
              <TrustRow />
            </AnimatedSection>

            {/* County card */}
            <AnimatedSection delay={0.1} className="relative max-w-[500px] w-full mx-auto lg:mx-0 lg:justify-self-end">
              <PlaceCard
                name={`${c.name} County`}
                facts={[
                  { icon: Landmark, k: "County seat", v: c.seat },
                  { icon: Home,     k: "Towns listed", v: `${c.towns.length}+` },
                  { icon: Building2, k: "Our office", v: "Edison, NJ" },
                  { icon: Clock,    k: "Availability", v: "24/7" },
                ]}
                cta={{ href: "#towns", label: "See towns we serve" }}
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* TOWNS */}
      <section id="towns" className="py-16 md:py-20 bg-surface scroll-mt-24">
        <div className="container mx-auto px-6 md:px-10">
          <AnimatedSection className="text-center mb-10">
            <Eyebrow onSurface>Towns We Serve</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Communities in <span className="text-primary">{c.name} County</span></h2>
          </AnimatedSection>
          <AnimatedSection>
            <ul className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
              {c.towns.map(t => {
                // Towns with their own page are links (highlighted); the rest are plain chips.
                const page = townPageFor(t);
                return page ? (
                  <li key={t}>
                    <Link to={`/areas-we-serve/${page.slug}`} className="flex items-center gap-2 bg-accent rounded-full pl-3 pr-4 py-2.5 text-sm font-semibold text-accent-foreground hover:bg-foreground hover:text-background transition-colors">
                      <MapPin className="h-4 w-4" /> {t} <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </li>
                ) : (
                  <li key={t} className="flex items-center gap-2 bg-background border border-border rounded-full pl-3 pr-4 py-2.5 text-sm font-medium text-foreground/85">
                    <MapPin className="h-4 w-4 text-primary" /> {t}
                  </li>
                );
              })}
            </ul>
            <p className="text-center text-sm text-muted-foreground mt-8">
              Don't see your town? We serve all of {c.name} County.{" "}
              <a href={`tel:+1${tel}`} className="text-foreground font-semibold underline underline-offset-4 hover:text-primary">Call {phone}</a> to confirm.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <ServicesInArea place={`${c.name} County`} />

      {/* WHY + FAQ */}
      <section className="py-20 md:py-24 bg-surface">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10 xl:gap-14 items-start">
            <AnimatedSection>
              <Eyebrow onSurface>Why MintexCare</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-8">
                Care {c.name} County <span className="text-primary">families trust</span>
              </h2>
              <PromiseList />
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <Eyebrow onSurface>FAQ</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Home care in {c.name} County</h2>
              <AreaFaqList key={c.slug} faqs={countyFaqs(c)} />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* NEARBY COUNTIES */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 md:px-10">
          <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <Eyebrow>Nearby</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Neighboring counties we serve</h2>
            </div>
            <Link to="/areas-we-serve" className="el-btn-outline group self-start md:self-auto">
              All 12 counties <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
      <section className="pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 xl:gap-16 items-center">
            <AnimatedSection>
              <Breadcrumb trail={[
                { label: "Home", to: "/" },
                { label: "Areas We Serve", to: "/areas-we-serve" },
                { label: `${county.name} County`, to: `/areas-we-serve/${county.slug}` },
                { label: t.name },
              ]} />
              <Pill icon={MapPin}>{county.name} County · {t.kind}</Pill>
              <h1 className="font-bold text-foreground leading-[1.07] mb-6" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)" }}>
                Home Care in<br /><span className="text-primary">{t.name}, NJ</span>
              </h1>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-[580px]">{t.intro}</p>
              <div className="mb-9"><HeroCtas tel={tel} phone={phone} /></div>
              <TrustRow />
            </AnimatedSection>

            {/* Town card */}
            <AnimatedSection delay={0.1} className="relative max-w-[500px] w-full mx-auto lg:mx-0 lg:justify-self-end">
              <PlaceCard
                name={`${t.name}, NJ`}
                facts={[
                  { icon: Landmark,  k: "County",       v: county.name },
                  { icon: Home,      k: t.zips.length > 1 ? "ZIP codes" : "ZIP code", v: t.zips.length > 3 ? `${t.zips.slice(0, 3).join(", ")}…` : t.zips.join(", ") },
                  { icon: Building2, k: "Our office",   v: isOfficeTown ? "Right here in Edison" : "Edison, NJ" },
                  { icon: Clock,     k: "Availability", v: "24/7" },
                ]}
                cta={{ href: "#local-area", label: `Areas we cover in ${t.name}` }}
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* LOCAL NOTES */}
      <section className="pb-16 md:pb-20">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-3 gap-4 md:gap-5">
            {t.notes.map((n, i) => (
              <AnimatedSection key={n.title} delay={i * 0.06} className="h-full">
                <div className="el-card h-full p-6 md:p-7">
                  <p className="text-4xl font-serif font-bold text-foreground/15 leading-none mb-6">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="font-bold text-foreground text-lg leading-snug">{n.title}</p>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{n.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* SECTIONS + ZIPS */}
      <section id="local-area" className="py-16 md:py-20 bg-surface scroll-mt-24">
        <div className="container mx-auto px-6 md:px-10">
          <AnimatedSection className="text-center mb-10">
            <Eyebrow onSurface>Where We Help</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Home care across <span className="text-primary">{t.name}</span></h2>
          </AnimatedSection>
          <AnimatedSection>
            <ul className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
              {t.sections.map(s => (
                <li key={s} className="flex items-center gap-2 bg-background border border-border rounded-full pl-3 pr-4 py-2.5 text-sm font-medium text-foreground/85">
                  <MapPin className="h-4 w-4 text-primary" /> {s}
                </li>
              ))}
            </ul>
            <p className="text-center text-sm text-muted-foreground mt-8">
              ZIP {t.zips.length > 1 ? "codes" : "code"}: <span className="font-semibold text-foreground">{t.zips.join(", ")}</span>
              {" · "}Part of <Link to={`/areas-we-serve/${county.slug}`} className="text-foreground font-semibold underline underline-offset-4 hover:text-primary">{county.name} County</Link>
            </p>
          </AnimatedSection>
        </div>
      </section>

      <ServicesInArea place={t.name} />

      {/* WHY + FAQ */}
      <section className="py-20 md:py-24 bg-surface">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10 xl:gap-14 items-start">
            <AnimatedSection>
              <Eyebrow onSurface>Why MintexCare</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-8">
                Care {t.name} <span className="text-primary">families trust</span>
              </h2>
              <PromiseList />
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <Eyebrow onSurface>FAQ</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Home care in {t.name}</h2>
              <AreaFaqList key={t.slug} faqs={townFaqs(t)} />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* NEARBY TOWNS */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 md:px-10">
          <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <Eyebrow>Nearby</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Nearby towns we serve</h2>
            </div>
            <Link to={`/areas-we-serve/${county.slug}`} className="el-btn-outline group self-start md:self-auto">
              All of {county.name} County <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {nearby.map((n, i) => (
              <AnimatedSection key={n.slug} delay={i * 0.05} className="h-full">
                <Link to={`/areas-we-serve/${n.slug}`}
                  className="group h-full flex flex-col el-card rounded-[24px] p-6 transition-shadow duration-300 hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.15)]">
                  <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-foreground">
                    <MapPin className="w-5 h-5 text-accent-foreground transition-colors duration-300 group-hover:text-background" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1">{n.name}, NJ</h3>
                  <p className="text-sm text-muted-foreground flex-1">{n.kind} · ZIP {n.zips[0]}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground group-hover:text-primary transition-colors mt-5">
                    Home care in {n.name} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
      <main className="theme-el overflow-x-clip">
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
