import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import AccessibilityButton from "@/components/AccessibilityButton";
import AnimatedSection from "@/components/AnimatedSection";
import { useAdmin } from "@/contexts/AdminContext";
import { usePageImages } from "@/hooks/usePageImages";
import { PENDING_IMAGE } from "@/config/siteImageConfig";
import { SERVICE_INDEX, SERVICE_GROUP_LABEL, serviceBySlug } from "@/data/serviceIndex";
import { SERVICE_PAGES } from "@/data/servicePages";
import {
  ArrowRight, Phone, MessageCircle, Check, ShieldCheck, Award, Clock,
  ClipboardList, UserCheck, HeartPulse, CalendarCheck, ChevronDown,
} from "lucide-react";

// One template for every /services/{slug} page: content from servicePages.ts,
// name / icon / SEO from serviceIndex.ts.

const STEPS = [
  { icon: Phone,         title: "Free consultation",   text: "Call or message us. We listen, answer questions and explain your options." },
  { icon: ClipboardList, title: "In-home assessment",  text: "A care coordinator visits to understand needs, routines and the home." },
  { icon: UserCheck,     title: "Your care plan",      text: "We build a personalized plan and match a caregiver or nurse to your loved one." },
  { icon: HeartPulse,    title: "Ongoing support",     text: "Nurses supervise care, check in regularly and update the plan as needs change." },
];

const PROMISES = [
  { icon: ShieldCheck, text: "NJ licensed, bonded & insured" },
  { icon: UserCheck,   text: "Background-checked, trained caregivers" },
  { icon: HeartPulse,  text: "Care plans overseen by registered nurses" },
  { icon: Clock,       text: "Someone to talk to 24/7" },
];

const SERVICE_SCHEMA_ID = "service-schema";

const ServiceDetail = () => {
  const { pathname } = useLocation();
  const slug = pathname.split("/")[2] ?? "";
  const svc = serviceBySlug(slug) ?? SERVICE_INDEX[0];
  const page = SERVICE_PAGES[svc.slug];
  const Icon = svc.icon;
  const url = `https://mintexcare.com/services/${svc.slug}`;

  const { contactInfo, siteImages } = useAdmin();
  const tel = contactInfo.phone.replace(/[^\d+]/g, "");
  usePageImages(pathname, [page.imageKey]);
  const photo = siteImages[page.imageKey];
  const hasPhoto = !!photo && photo !== PENDING_IMAGE;

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  useEffect(() => { setOpenFaq(0); }, [slug]);

  // Service + FAQPage structured data (replaces the copy already in the prerendered HTML).
  useEffect(() => {
    document.getElementById(SERVICE_SCHEMA_ID)?.remove();
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = SERVICE_SCHEMA_ID;
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "@id": `${url}#service`,
          "name": svc.name,
          "description": page.intro,
          "url": url,
          "provider": { "@id": "https://mintexcare.com/#organization" },
          "areaServed": { "@type": "State", "name": "New Jersey" },
        },
        {
          "@type": "FAQPage",
          "@id": `${url}#faq`,
          "mainEntity": page.faqs.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a },
          })),
        },
      ],
    });
    document.head.appendChild(script);
    return () => { document.getElementById(SERVICE_SCHEMA_ID)?.remove(); };
  }, [svc, page, url]);

  const related = page.related.map(serviceBySlug).filter((s): s is NonNullable<typeof s> => !!s);

  return (
    <>
      <Header />
      <main className="theme-el overflow-x-clip">

        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section className="pt-32 md:pt-40 pb-16 md:pb-20">
          <div className="container mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 xl:gap-16 items-center">

              {/* Text */}
              <AnimatedSection>
                <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-8 flex flex-wrap items-center gap-2">
                  <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
                  <span className="text-foreground/30">/</span>
                  <Link to="/services" className="hover:text-foreground transition-colors">Services</Link>
                  <span className="text-foreground/30">/</span>
                  <span className="text-foreground font-semibold" aria-current="page">{svc.name}</span>
                </nav>

                <div className="el-eyebrow mb-6">
                  <Icon className="w-3.5 h-3.5 text-primary" />
                  {SERVICE_GROUP_LABEL[svc.group]}
                </div>

                <h1 className="font-bold text-foreground leading-[1.07] mb-6" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)" }}>
                  {page.heading[0]}<br />
                  <span className="text-primary">{page.heading[1]}</span>
                </h1>

                <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-[560px]">{page.intro}</p>

                <div className="flex flex-wrap gap-3 mb-9">
                  <Link to={`/free-consultation?service=${svc.slug}`} className="el-btn-primary group">
                    Free Consultation <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a href={`tel:+1${tel}`} className="el-btn-soft">
                    <Phone className="h-4 w-4" /> Call {contactInfo.phone}
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  {[
                    { icon: ShieldCheck, label: "NJ State Licensed" },
                    { icon: Award,       label: "Bonded & Insured" },
                    { icon: Clock,       label: "Available 24/7" },
                  ].map(({ icon: I, label }) => (
                    <div key={label} className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
                      <I className="w-4 h-4 text-primary" />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Visual: admin photo if uploaded, otherwise a calm icon panel */}
              <AnimatedSection delay={0.1} className="relative max-w-[520px] w-full mx-auto lg:mx-0 lg:justify-self-end">
                <div className="el-card p-3">
                  <div className="relative rounded-[16px] overflow-hidden aspect-[4/4.2]">
                    {hasPhoto ? (
                      <img src={photo} alt={`MintexCare ${svc.name.toLowerCase()} at home`} className="w-full h-full object-cover" loading="eager" />
                    ) : (
                      <div className="w-full h-full relative flex items-center justify-center bg-accent">
                        <div className="absolute inset-12 rounded-full border border-accent-foreground/10" />
                        <div className="absolute inset-24 rounded-full border border-accent-foreground/10" />
                        <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-[2rem] flex items-center justify-center bg-background shadow-xl">
                          <Icon className="w-16 h-16 sm:w-20 sm:h-20 text-foreground" strokeWidth={1.4} />
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-background/95 px-5 py-4">
                      <p className="text-muted-foreground text-xs uppercase tracking-widest mb-1 font-semibold">MintexCare</p>
                      <p className="text-foreground font-bold text-lg leading-snug">{svc.name}</p>
                    </div>
                  </div>
                </div>

                {/* Floating cards */}
                <div className="el-chip absolute top-6 -left-2 sm:-left-8 z-10 px-4 py-3">
                  <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shrink-0">
                    <CalendarCheck className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground leading-none">Free assessment</p>
                    <p className="text-xs text-muted-foreground mt-1">In your home</p>
                  </div>
                </div>
                <div className="el-chip absolute top-28 -left-2 sm:-left-8 z-10 px-4 py-3 hidden sm:flex">
                  <div className="w-10 h-10 rounded-xl bg-foreground flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-background" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground leading-none">{page.highlights[0].title}</p>
                    <p className="text-xs text-muted-foreground mt-1">Care you can believe in</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            HIGHLIGHTS
        ══════════════════════════════════════ */}
        <section className="pb-16 md:pb-20">
          <div className="container mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-3 gap-4 md:gap-5">
              {page.highlights.map((h, i) => (
                <AnimatedSection key={h.title} delay={i * 0.06} className="h-full">
                  <div className="el-card h-full p-6 md:p-7">
                    <p className="text-4xl font-serif font-bold text-foreground/15 leading-none mb-6">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="font-bold text-foreground text-lg leading-snug">{h.title}</p>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{h.text}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            WHAT'S INCLUDED
        ══════════════════════════════════════ */}
        <section className="py-20 md:py-24 bg-surface">
          <div className="container mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-[1fr_360px] gap-10 xl:gap-14 items-start">
              <div>
                <AnimatedSection>
                  <div className="el-eyebrow bg-background mb-5">What's Included</div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
                    How we help with <span className="text-primary">{svc.name.split(" (")[0].toLowerCase()}</span>
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-10 max-w-2xl">
                    Every plan is personalized. These are the most common ways we help, and we'll tailor the
                    details to your loved one during the free in-home assessment.
                  </p>
                </AnimatedSection>

                <div className="grid sm:grid-cols-2 gap-3">
                  {page.included.map((item, i) => (
                    <AnimatedSection key={item} delay={Math.min(i, 5) * 0.04} className="h-full">
                      <div className="h-full flex items-start gap-3 bg-background rounded-2xl p-5">
                        <span className="w-6 h-6 rounded-full bg-accent flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-accent-foreground" strokeWidth={3} />
                        </span>
                        <p className="text-foreground/85 leading-snug">{item}</p>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>

              {/* Promise card */}
              <AnimatedSection className="lg:sticky lg:top-32">
                <div className="rounded-[28px] p-7 bg-foreground text-background">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-accent">
                    <Icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-6 leading-snug">Every MintexCare plan includes</h3>
                  <ul className="space-y-4 mb-8">
                    {PROMISES.map(({ icon: I, text }) => (
                      <li key={text} className="flex items-start gap-3 text-sm text-background/85">
                        <I className="w-4 h-4 mt-0.5 shrink-0" />
                        {text}
                      </li>
                    ))}
                  </ul>
                  <Link to={`/free-consultation?service=${svc.slug}`}
                    className="el-btn bg-accent text-accent-foreground hover:bg-accent/80 w-full">
                    Book a Free Consultation <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            RIGHT FOR YOU + HOW IT WORKS
        ══════════════════════════════════════ */}
        <section className="py-20 md:py-24">
          <div className="container mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-2 gap-12 xl:gap-16">

              {/* Is it right for you */}
              <AnimatedSection>
                <div className="el-eyebrow mb-5">Is It Right for You?</div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
                  Signs it may be <span className="text-primary">time for help</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {svc.name} may be a good fit if any of these sound familiar. Not sure? Call us and we'll talk it
                  through, with no obligation.
                </p>
                <ul className="space-y-3">
                  {page.rightFor.map(item => (
                    <li key={item} className="flex items-center gap-4 el-card px-5 py-4">
                      <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-foreground">
                        <Check className="w-4 h-4 text-background" strokeWidth={3} />
                      </span>
                      <span className="text-foreground/85 leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </AnimatedSection>

              {/* How it works */}
              <AnimatedSection delay={0.1}>
                <div className="el-card rounded-[28px] p-7 md:p-9 h-full">
                  <div className="el-eyebrow bg-background mb-4">How It Works</div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-8">Getting started is simple</h2>
                  <ol className="space-y-3">
                    {STEPS.map(({ icon: I, title, text }, i) => (
                      <li key={title} className="flex gap-4 bg-background rounded-2xl p-4">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-accent">
                          <I className="w-5 h-5 text-accent-foreground" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold tracking-[0.15em] text-muted-foreground mb-0.5">STEP {i + 1}</p>
                          <p className="font-bold text-foreground mb-1">{title}</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            FAQ
        ══════════════════════════════════════ */}
        <section className="py-20 md:py-24 bg-surface">
          <div className="container mx-auto px-6 md:px-10 max-w-4xl">
            <AnimatedSection className="text-center mb-12">
              <div className="el-eyebrow bg-background mb-5">FAQ</div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Questions about <span className="text-primary">{svc.name.split(" (")[0]}</span>
              </h2>
            </AnimatedSection>

            <div className="space-y-3">
              {page.faqs.map((f, i) => {
                const open = openFaq === i;
                return (
                  <AnimatedSection key={f.q} delay={i * 0.04}>
                    <div className="bg-background rounded-2xl">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(open ? null : i)}
                        aria-expanded={open}
                        aria-controls={`faq-${i}`}
                        className="w-full flex items-center gap-4 text-left px-5 md:px-7 py-5"
                      >
                        <span className="flex-1 font-semibold text-foreground leading-snug">{f.q}</span>
                        <span className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${open ? "bg-foreground text-background" : "bg-surface text-foreground"}`}>
                          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
                        </span>
                      </button>
                      {/* Answer stays in the HTML when closed so search engines can read it. */}
                      <div id={`faq-${i}`} className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
                        <div className="overflow-hidden">
                          <p className="text-muted-foreground leading-relaxed px-5 md:px-7 pb-6">{f.a}</p>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            RELATED SERVICES
        ══════════════════════════════════════ */}
        <section className="py-20 md:py-24">
          <div className="container mx-auto px-6 md:px-10">
            <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <div className="el-eyebrow mb-4">Related Services</div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Often combined with</h2>
              </div>
              <Link to="/services" className="el-btn-outline group self-start md:self-auto">
                View all services <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-5">
              {related.map((r, i) => {
                const RIcon = r.icon;
                return (
                  <AnimatedSection key={r.slug} delay={i * 0.06} className="h-full">
                    <Link to={`/services/${r.slug}`}
                      className="group h-full flex flex-col el-card rounded-[24px] p-7 transition-shadow duration-300 hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.15)]">
                      <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-foreground">
                        <RIcon className="w-6 h-6 text-accent-foreground transition-colors duration-300 group-hover:text-background" />
                      </div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">{SERVICE_GROUP_LABEL[r.group]}</p>
                      <h3 className="text-xl font-bold text-foreground mb-2">{r.name}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">{r.short}</p>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-primary transition-colors mt-6">
                        Learn more <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            CTA BLOCK (call · WhatsApp · free consultation)
        ══════════════════════════════════════ */}
        <section className="pb-20">
          <div className="container mx-auto px-6 md:px-10">
            <AnimatedSection>
              <div className="rounded-[32px] bg-accent px-6 py-12 sm:px-10 sm:py-16 md:px-16 text-center">
                <div className="max-w-2xl mx-auto">
                  <div className="el-eyebrow bg-background border-transparent mb-5">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    We're here 24/7
                  </div>
                  <h2 className="text-2xl md:text-4xl font-bold text-accent-foreground leading-snug mb-4">
                    Talk to us about {svc.name.split(" (")[0].toLowerCase()} for your loved one
                  </h2>
                  <p className="text-accent-foreground/75 text-sm md:text-base leading-relaxed mb-9">
                    A care coordinator will answer your questions and arrange a free in-home assessment, with no obligation.
                  </p>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
                    <a href={`tel:+1${tel}`} className="el-btn-primary">
                      <Phone className="h-4 w-4" /> Call {contactInfo.phone}
                    </a>
                    <a href={`https://wa.me/1${tel}`} target="_blank" rel="noopener noreferrer"
                      className="el-btn bg-background text-foreground hover:bg-background/80">
                      <MessageCircle className="h-4 w-4" /> WhatsApp Us
                    </a>
                    <Link to={`/free-consultation?service=${svc.slug}`}
                      className="el-btn bg-background text-foreground hover:bg-background/80">
                      Free Consultation <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
      <AccessibilityButton />
    </>
  );
};

export default ServiceDetail;
