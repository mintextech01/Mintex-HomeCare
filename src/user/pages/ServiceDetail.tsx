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
  ArrowRight, Phone, MessageCircle, CheckCircle2, ShieldCheck, Award, Clock, Plus,
  ClipboardList, UserCheck, HeartPulse, CalendarCheck, Sparkles, ChevronRight,
} from "lucide-react";

// One template for every /services/{slug} page: content from servicePages.ts,
// name / icon / SEO from serviceIndex.ts.

const GRADIENT_BTN = {
  background: "linear-gradient(135deg, hsl(214 66% 44%) 0%, hsl(192 91% 37%) 100%)",
  border: "1px solid rgba(255,255,255,0.3)",
  boxShadow: "0 2px 12px rgba(38,104,188,0.30), inset 0 1px 0 rgba(255,255,255,0.25)",
  color: "#fff",
};
const BRAND_GRADIENT = "linear-gradient(135deg, #1d4f8c 0%, #2a66b0 55%, #0891b2 100%)";
// White tints are arbitrary values / inline styles: the dark theme overrides bg-white/* classes.
const WHITE_TINT = "rgba(255,255,255,0.15)";

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
      <main className="bg-background overflow-x-clip">

        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section className="relative pt-32 md:pt-40 pb-24 md:pb-28 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute rounded-full deco-drift" style={{ background: "radial-gradient(circle, #bfdbfe 0%, transparent 70%)", width: 620, height: 620, top: "-18%", right: "-10%", opacity: 0.7 }} />
            <div className="absolute rounded-full deco-float-down" style={{ background: "radial-gradient(circle, #a7f3d0 0%, transparent 70%)", width: 400, height: 400, bottom: "-20%", left: "-8%", opacity: 0.5 }} />
            <div className="absolute rounded-full deco-float-up" style={{ background: "radial-gradient(circle, #c7d2fe 0%, transparent 70%)", width: 300, height: 300, top: "12%", left: "28%", opacity: 0.35 }} />
            <div className="absolute top-[22%] right-[42%] w-28 h-28 rounded-full border-[3px] border-dashed border-[#0891b2]/[0.1] deco-spin-slow hidden lg:block" />
            <div className="absolute bottom-[18%] left-[44%] hidden lg:grid grid-cols-5 gap-3">
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={`hd-${i}`} className="w-1.5 h-1.5 rounded-full bg-[#2a66b0]/15" />
              ))}
            </div>
            <svg className="absolute bottom-0 left-0 w-full h-16 opacity-[0.06]" viewBox="0 0 1440 64" preserveAspectRatio="none">
              <path d="M0,32 C360,64 720,0 1080,32 C1260,48 1380,16 1440,32 L1440,64 L0,64 Z" fill="#2a66b0" />
            </svg>
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid lg:grid-cols-[1.1fr_1fr] gap-14 xl:gap-20 items-center">

              {/* Text */}
              <AnimatedSection from="left">
                <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-8 flex flex-wrap items-center gap-2">
                  <Link to="/" className="hover:text-[#2a66b0] transition-colors">Home</Link>
                  <span className="text-gray-300">/</span>
                  <Link to="/services" className="hover:text-[#2a66b0] transition-colors">Services</Link>
                  <span className="text-gray-300">/</span>
                  <span className="text-[#2a66b0] font-medium" aria-current="page">{svc.name}</span>
                </nav>

                <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-6">
                  <Icon className="w-3.5 h-3.5 text-[#2a66b0]" />
                  <span className="text-xs font-semibold text-[#2a66b0] uppercase tracking-widest">{SERVICE_GROUP_LABEL[svc.group]}</span>
                </div>

                <h1 className="font-bold text-gray-900 leading-[1.07] mb-5" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)" }}>
                  {page.heading[0]}<br />
                  <span className="text-[#2a66b0]">{page.heading[1]}</span>
                </h1>

                <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-8 max-w-[560px]">{page.intro}</p>

                <div className="flex flex-wrap gap-3 mb-9">
                  <Link to={`/free-consultation?service=${svc.slug}`}
                    className="inline-flex items-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-full transition-all hover:scale-105"
                    style={GRADIENT_BTN}>
                    Free Consultation <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a href={`tel:+1${tel}`}
                    className="inline-flex items-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-full text-foreground hover:text-primary transition-all glass-btn">
                    <Phone className="h-4 w-4" /> Call {contactInfo.phone}
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  {[
                    { icon: ShieldCheck, label: "NJ State Licensed" },
                    { icon: Award,       label: "Bonded & Insured" },
                    { icon: Clock,       label: "Available 24/7" },
                  ].map(({ icon: I, label }) => (
                    <div key={label} className="flex items-center gap-2 text-sm text-gray-500">
                      <I className="w-4 h-4 text-[#2a66b0]" />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Visual: admin photo if uploaded, otherwise a designed illustration */}
              <AnimatedSection from="right" delay={0.15} className="relative max-w-[520px] w-full mx-auto lg:mx-0 lg:justify-self-end">
                <div className="absolute -inset-3 rounded-[2.5rem] rotate-3 bg-[#2a66b0]/[0.06] border border-[#2a66b0]/10 hidden sm:block" />
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/4.2]">
                  {hasPhoto ? (
                    <>
                      <img src={photo} alt={`MintexCare ${svc.name.toLowerCase()} at home`} className="w-full h-full object-cover" loading="eager" />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,30,60,0.55) 0%, transparent 55%)" }} />
                    </>
                  ) : (
                    <div className="w-full h-full relative flex items-center justify-center" style={{ background: BRAND_GRADIENT }}>
                      <div className="absolute top-0 right-0 w-56 h-56 rounded-full -translate-y-1/3 translate-x-1/4" style={{ background: "rgba(255,255,255,0.10)" }} />
                      <div className="absolute bottom-0 left-0 w-44 h-44 rounded-full translate-y-1/3 -translate-x-1/4" style={{ background: "rgba(255,255,255,0.08)" }} />
                      <div className="absolute inset-10 rounded-full border border-dashed deco-spin-slow" style={{ borderColor: "rgba(255,255,255,0.18)" }} />
                      <div className="absolute inset-24 rounded-full border" style={{ borderColor: "rgba(255,255,255,0.14)" }} />
                      <Plus className="absolute top-10 left-10 w-6 h-6 deco-float-up" style={{ color: "rgba(255,255,255,0.35)" }} />
                      <Sparkles className="absolute bottom-14 right-12 w-6 h-6 deco-float-down" style={{ color: "rgba(255,255,255,0.35)" }} />
                      <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-[2rem] flex items-center justify-center shadow-2xl"
                        style={{ background: WHITE_TINT, border: "1px solid rgba(255,255,255,0.3)", backdropFilter: "blur(6px)" }}>
                        <Icon className="w-16 h-16 sm:w-20 sm:h-20 text-white" strokeWidth={1.4} />
                      </div>
                    </div>
                  )}
                  {/* Bottom padding keeps the name clear of the floating card that overlaps the bottom edge. */}
                  <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-7 pt-6 pb-16">
                    <p className="text-white/75 text-xs uppercase tracking-widest mb-1 font-semibold">MintexCare</p>
                    <p className="text-white font-bold text-lg leading-snug">{svc.name}</p>
                  </div>
                </div>

                {/* Floating cards */}
                <div className="absolute top-4 -left-2 sm:-left-8 bg-card rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-border z-10">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: BRAND_GRADIENT }}>
                    <CalendarCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 leading-none">Free assessment</p>
                    <p className="text-xs text-gray-500 mt-1">In your home</p>
                  </div>
                </div>
                <div className="absolute -bottom-5 right-2 sm:-right-6 bg-card rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-border z-10">
                  <div className="w-10 h-10 rounded-xl bg-[#0891b2]/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-[#0891b2]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 leading-none">{page.highlights[0].title}</p>
                    <p className="text-xs text-gray-500 mt-1">Care you can believe in</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            HIGHLIGHTS STRIP
        ══════════════════════════════════════ */}
        <section className="py-6 bg-muted/50 border-y border-border">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-3 gap-4">
              {page.highlights.map((h, i) => (
                <AnimatedSection key={h.title} delay={i * 0.07}>
                  <div className="flex items-start gap-4 bg-card rounded-2xl px-5 py-5 border border-border h-full">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-white text-sm font-bold" style={{ background: BRAND_GRADIENT }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 leading-snug">{h.title}</p>
                      <p className="text-sm text-gray-500 mt-1 leading-relaxed">{h.text}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            WHAT'S INCLUDED
        ══════════════════════════════════════ */}
        <section className="py-20 md:py-24 relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute rounded-full deco-float-down" style={{ background: "radial-gradient(circle, #e0f2fe 0%, transparent 70%)", width: 460, height: 460, top: "-10%", left: "-12%", opacity: 0.55 }} />
            <div className="absolute bottom-10 right-8 hidden lg:grid grid-cols-5 gap-3">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={`wd-${i}`} className="w-1.5 h-1.5 rounded-full bg-[#0891b2]/12" />
              ))}
            </div>
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid lg:grid-cols-[1fr_360px] gap-10 xl:gap-14 items-start">
              <div>
                <AnimatedSection>
                  <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2a66b0]" />
                    <span className="text-xs font-semibold text-[#2a66b0] uppercase tracking-widest">What's Included</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                    How we help with <span className="text-[#2a66b0]">{svc.name.split(" (")[0].toLowerCase()}</span>
                  </h2>
                  <p className="text-gray-500 leading-relaxed mb-10 max-w-2xl">
                    Every plan is personalized. These are the most common ways we help, and we'll tailor the
                    details to your loved one during the free in-home assessment.
                  </p>
                </AnimatedSection>

                <div className="grid sm:grid-cols-2 gap-4">
                  {page.included.map((item, i) => (
                    <AnimatedSection key={item} delay={Math.min(i, 5) * 0.05} className="h-full">
                      <div className="group h-full flex items-start gap-3 bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-lg hover:border-[#2a66b0]/25 hover:-translate-y-0.5 transition-all duration-300">
                        <div className="w-9 h-9 rounded-xl bg-[#0891b2]/10 flex items-center justify-center shrink-0 group-hover:bg-[#0891b2] transition-colors">
                          <CheckCircle2 className="w-5 h-5 text-[#0891b2] group-hover:text-white transition-colors" />
                        </div>
                        <p className="text-gray-700 leading-snug pt-1.5">{item}</p>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>

              {/* Promise card */}
              <AnimatedSection from="right" className="lg:sticky lg:top-32">
                <div className="relative rounded-3xl p-7 overflow-hidden text-white" style={{ background: BRAND_GRADIENT }}>
                  <div className="absolute top-0 right-0 w-40 h-40 rounded-full -translate-y-1/2 translate-x-1/3" style={{ background: "rgba(255,255,255,0.10)" }} />
                  <div className="absolute bottom-0 left-0 w-28 h-28 rounded-full translate-y-1/2 -translate-x-1/3" style={{ background: "rgba(255,255,255,0.08)" }} />
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: WHITE_TINT }}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 leading-snug">Every MintexCare plan includes</h3>
                    <div className="w-10 h-[3px] rounded-full mb-5" style={{ background: "rgba(255,255,255,0.5)" }} />
                    <ul className="space-y-3.5 mb-7">
                      {PROMISES.map(({ icon: I, text }) => (
                        <li key={text} className="flex items-start gap-3 text-sm text-white/90">
                          <I className="w-4 h-4 mt-0.5 shrink-0 text-white" />
                          {text}
                        </li>
                      ))}
                    </ul>
                    <Link to={`/free-consultation?service=${svc.slug}`}
                      className="flex items-center justify-center gap-2 font-bold text-sm px-6 py-3.5 rounded-full transition-all hover:scale-[1.03] shadow-lg"
                      style={{ background: "#fff", color: "#1d4f8c" }}>
                      Book a Free Consultation <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            RIGHT FOR YOU + HOW IT WORKS
        ══════════════════════════════════════ */}
        <section className="py-20 md:py-24 bg-[#f7f8f9] relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute top-[14%] right-[6%] w-40 h-40 rounded-full border-2 border-[#2a66b0]/[0.08] deco-spin-slow hidden lg:block" />
            <div className="absolute bottom-[10%] left-[4%] w-6 h-6 border-2 border-[#0891b2]/15 rotate-45 deco-drift hidden lg:block" />
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 xl:gap-16">

              {/* Is it right for you */}
              <AnimatedSection from="left">
                <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2a66b0]" />
                  <span className="text-xs font-semibold text-[#2a66b0] uppercase tracking-widest">Is It Right for You?</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                  Signs it may be <span className="text-[#2a66b0]">time for help</span>
                </h2>
                <p className="text-gray-500 leading-relaxed mb-8">
                  {svc.name} may be a good fit if any of these sound familiar. Not sure? Call us and we'll talk it
                  through, with no obligation.
                </p>
                <ul className="space-y-3">
                  {page.rightFor.map(item => (
                    <li key={item} className="flex items-center gap-4 bg-card border border-border rounded-2xl px-5 py-4 shadow-sm">
                      <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: BRAND_GRADIENT }}>
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </span>
                      <span className="text-gray-700 leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </AnimatedSection>

              {/* How it works */}
              <AnimatedSection from="right" delay={0.1}>
                <div className="bg-card border border-border rounded-3xl p-7 md:p-9 shadow-sm h-full">
                  <p className="text-xs font-semibold text-[#0891b2] uppercase tracking-widest mb-2">How It Works</p>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-8">Getting started is simple</h2>
                  <div className="relative">
                  <div className="absolute left-[21px] top-3 bottom-3 w-px bg-gradient-to-b from-[#2a66b0]/40 to-[#0891b2]/10" aria-hidden="true" />
                  <ol className="relative space-y-7">
                    {STEPS.map(({ icon: I, title, text }, i) => (
                      <li key={title} className="relative flex gap-5">
                        <div className="relative z-10 w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-md" style={{ background: BRAND_GRADIENT }}>
                          <I className="w-5 h-5 text-white" />
                        </div>
                        <div className="pt-0.5">
                          <p className="text-xs font-bold text-[#2a66b0] mb-0.5">STEP {i + 1}</p>
                          <p className="font-bold text-gray-900 mb-1">{title}</p>
                          <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            FAQ
        ══════════════════════════════════════ */}
        <section className="py-20 md:py-24 relative">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <AnimatedSection className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-[#2a66b0] inline-block" />
                <span className="text-xs font-extrabold text-[#2a66b0] uppercase tracking-[0.25em]">FAQ</span>
                <span className="h-px w-10 bg-[#2a66b0] inline-block" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Questions about <span className="text-[#2a66b0]">{svc.name.split(" (")[0]}</span>
              </h2>
            </AnimatedSection>

            <div className="space-y-4">
              {page.faqs.map((f, i) => {
                const open = openFaq === i;
                return (
                  <AnimatedSection key={f.q} delay={i * 0.05}>
                    <div className={`bg-card border rounded-2xl shadow-sm transition-all duration-300 ${open ? "border-[#2a66b0]/30 shadow-lg" : "border-border hover:shadow-md"}`}>
                      <button
                        type="button"
                        onClick={() => setOpenFaq(open ? null : i)}
                        aria-expanded={open}
                        aria-controls={`faq-${i}`}
                        className="w-full flex items-center gap-4 text-left px-5 md:px-7 py-5"
                      >
                        <span className="h-9 w-9 rounded-xl text-xs font-bold flex items-center justify-center shrink-0 text-white shadow-md" style={{ background: BRAND_GRADIENT }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1 font-semibold text-gray-900 leading-snug">{f.q}</span>
                        <ChevronRight className={`h-5 w-5 text-[#2a66b0] shrink-0 transition-transform duration-300 ${open ? "rotate-90" : ""}`} />
                      </button>
                      {/* Answer stays in the HTML when closed so search engines can read it. */}
                      <div id={`faq-${i}`} className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
                        <div className="overflow-hidden">
                          <p className="text-gray-600 leading-relaxed px-5 md:px-7 pb-6 md:pl-[80px]">{f.a}</p>
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
        <section className="py-20 md:py-24 bg-[#f7f8f9]">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-xs font-semibold text-[#0891b2] uppercase tracking-widest mb-2">Related Services</p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Often combined with</h2>
              </div>
              <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-[#2a66b0] hover:gap-3 transition-all">
                View all services <ArrowRight className="h-4 w-4" />
              </Link>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-6">
              {related.map((r, i) => {
                const RIcon = r.icon;
                return (
                  <AnimatedSection key={r.slug} delay={i * 0.07} className="h-full">
                    <Link to={`/services/${r.slug}`}
                      className="group relative h-full flex flex-col bg-card border border-border rounded-3xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#2a66b0]/25 transition-all duration-300 overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" style={{ background: BRAND_GRADIENT }} />
                      <div className="w-14 h-14 rounded-2xl bg-[#2a66b0]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                        <RIcon className="w-7 h-7 text-[#2a66b0]" />
                      </div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">{SERVICE_GROUP_LABEL[r.group]}</p>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{r.name}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed flex-1">{r.short}</p>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#2a66b0] mt-5">
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
                  <h2 className="text-2xl md:text-4xl font-bold text-white leading-snug mb-4">
                    Talk to us about {svc.name.split(" (")[0].toLowerCase()} for your loved one
                  </h2>
                  <p className="text-white/80 text-sm md:text-base leading-relaxed mb-9">
                    A care coordinator will answer your questions and arrange a free in-home assessment, with no obligation.
                  </p>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
                    <a href={`tel:+1${tel}`}
                      className="inline-flex items-center justify-center gap-2 font-bold text-sm px-7 py-4 rounded-full transition-all hover:scale-105 shadow-lg"
                      style={{ background: "#fff", color: "#1d4f8c" }}>
                      <Phone className="h-4 w-4" /> Call {contactInfo.phone}
                    </a>
                    <a href={`https://wa.me/1${tel}`} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 font-bold text-sm px-7 py-4 rounded-full text-white transition-all hover:scale-105"
                      style={{ background: WHITE_TINT, border: "1px solid rgba(255,255,255,0.35)" }}>
                      <MessageCircle className="h-4 w-4" /> WhatsApp Us
                    </a>
                    <Link to={`/free-consultation?service=${svc.slug}`}
                      className="inline-flex items-center justify-center gap-2 font-bold text-sm px-7 py-4 rounded-full text-white transition-all hover:scale-105"
                      style={{ background: WHITE_TINT, border: "1px solid rgba(255,255,255,0.35)" }}>
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
