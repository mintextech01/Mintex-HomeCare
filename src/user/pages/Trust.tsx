import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, type ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import AccessibilityButton from "@/components/AccessibilityButton";
import AnimatedSection from "@/components/AnimatedSection";
import { useAdmin } from "@/contexts/AdminContext";
import {
  ArrowRight, Phone, MessageCircle, ShieldCheck, HeartPulse, UserCheck, ClipboardList, Clock, MapPin, Award,
  FileSearch, Users, BadgeCheck, FlaskConical, Stethoscope, GraduationCap, MessagesSquare, CheckCircle2, ChevronLeft,
  ChevronRight, Quote, Heart, Star, Brain, ChevronDown,
} from "lucide-react";
import React from "react";

// /about/why-mintexcare and /reviews share this chunk.

const GRADIENT_BTN = {
  background: "linear-gradient(135deg, hsl(214 66% 44%) 0%, hsl(192 91% 37%) 100%)",
  border: "1px solid rgba(255,255,255,0.3)",
  boxShadow: "0 2px 12px rgba(38,104,188,0.30), inset 0 1px 0 rgba(255,255,255,0.25)",
  color: "#fff",
};
const BRAND_GRADIENT = "linear-gradient(135deg, #1d4f8c 0%, #2a66b0 55%, #0891b2 100%)";
// White tints are inline styles: the dark theme overrides bg-white/* classes.
const WHITE_TINT = "rgba(255,255,255,0.15)";

// Figures confirmed by MintexCare (also used on the About page and homepage).
const STATS = [
  { icon: Users, value: "500+", label: "Families served" },
  { icon: Award, value: "10+", label: "Years of care" },
  { icon: Star,  value: "99%", label: "Client satisfaction" },
  { icon: Clock, value: "24/7", label: "Always available" },
];

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

const Pill = ({ icon: Icon, children }: { icon: typeof ShieldCheck; children: ReactNode }) => (
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

const StatsStrip = () => (
  <section className="py-6 bg-muted/50 border-y border-border">
    <div className="container mx-auto px-4 md:px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map(({ icon: I, value, label }, i) => (
          <AnimatedSection key={label} delay={i * 0.06}>
            <div className="flex items-center gap-4 bg-card rounded-2xl px-5 py-5 border border-border h-full">
              <div className="w-11 h-11 rounded-xl bg-[#2a66b0]/10 flex items-center justify-center shrink-0">
                <I className="w-5 h-5 text-[#2a66b0]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 leading-none">{value}</p>
                <p className="text-xs text-gray-500 mt-1">{label}</p>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
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
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
              <span className="text-xs font-semibold text-white uppercase tracking-widest">Licensed by the State of New Jersey</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-white leading-snug mb-4">{title}</h2>
            <p className="text-white/80 text-sm md:text-base leading-relaxed mb-9">{text}</p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center gap-3">
              <Link to="/free-consultation" className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold text-sm px-7 py-4 rounded-full shadow-lg transition-all hover:scale-105" style={{ background: "#fff", color: "#1d4f8c" }}>
                Free Consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={`tel:+1${tel}`} className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold text-sm px-7 py-4 rounded-full text-white transition-all hover:scale-105"
                style={{ background: WHITE_TINT, border: "1px solid rgba(255,255,255,0.35)" }}>
                <Phone className="h-4 w-4" /> Call {phone}
              </a>
              <a href={`https://wa.me/1${tel}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold text-sm px-7 py-4 rounded-full text-white transition-all hover:scale-105"
                style={{ background: WHITE_TINT, border: "1px solid rgba(255,255,255,0.35)" }}>
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

/* ════════════════════════════════════════════
   /about/why-mintexcare
   ════════════════════════════════════════════ */

const PILLARS = [
  { icon: ShieldCheck, title: "Licensed by the State of New Jersey", text: "MintexCare is licensed by the State of New Jersey, bonded and insured, so you can trust the people coming into your home." },
  { icon: HeartPulse, title: "Nurse-supervised care", text: "Registered nurses create each care plan, oversee the caregivers who deliver it and update it as needs change." },
  { icon: UserCheck, title: "Thoroughly screened caregivers", text: "Every caregiver goes through a seven-step screening before they ever meet your family." },
  { icon: ClipboardList, title: "Personalized care plans", text: "Care is built around your loved one's needs, routines and preferences, never a one-size-fits-all package." },
  { icon: Brain, title: "Specially trained for memory care", text: "Caregivers supporting clients with Alzheimer's and dementia receive dementia care training." },
  { icon: Clock, title: "Here 24/7", text: "Someone is always available to talk, day or night, every day of the year." },
];

const SCREENING = [
  { icon: MessagesSquare, title: "In-person interview", text: "We get to know each candidate's experience, values and communication." },
  { icon: FileSearch, title: "Criminal background check", text: "Every caregiver is background-checked before placement." },
  { icon: Users, title: "Reference checks", text: "We speak with previous employers about reliability and quality of care." },
  { icon: BadgeCheck, title: "Certification check", text: "We verify certifications and licenses, such as CHHA, CNA, LPN and RN." },
  { icon: FlaskConical, title: "Drug test", text: "Caregivers complete a drug screening." },
  { icon: Stethoscope, title: "TB test", text: "Tuberculosis testing to protect clients' health." },
  { icon: GraduationCap, title: "Orientation", text: "Training on our standards, safety and each client's care plan before care begins." },
];

const CHECKLIST = [
  "Licensed by the State of New Jersey",
  "Bonded and insured",
  "Care plans overseen by registered nurses",
  "Background checks, references and certification checks",
  "Drug and TB testing for caregivers",
  "Dementia-trained caregivers",
  "Free consultation and in-home assessment",
  "Written care plan and clear pricing before care starts",
  "Available 24 hours a day, 7 days a week",
];

const WHY_FAQS = [
  { q: "Is MintexCare licensed?", a: "Yes. MintexCare is licensed by the State of New Jersey, and we are bonded and insured." },
  { q: "How are your caregivers screened?", a: "Every caregiver completes an in-person interview, a criminal background check, reference checks, a certification check, a drug test, a TB test and orientation before care begins." },
  { q: "Who supervises the caregivers?", a: "Our registered nurses create each care plan, oversee the caregivers who deliver it, and update the plan as your loved one's needs change." },
  { q: "What happens if we're not happy with a caregiver?", a: "Tell us. We'll listen, address the concern and, if needed, match a different caregiver." },
];

const WhyMintexCare = ({ tel, phone }: { tel: string; phone: string }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return (
    <>
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-20 overflow-hidden">
        <HeroDeco />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-14 items-center">
            <AnimatedSection from="left">
              <Breadcrumb trail={[{ label: "Home", to: "/" }, { label: "About", to: "/about" }, { label: "Why MintexCare" }]} />
              <Pill icon={ShieldCheck}>Why MintexCare</Pill>
              <h1 className="font-bold text-gray-900 leading-[1.07] mb-5" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)" }}>
                Care You Can<br /><span className="text-[#2a66b0]">Trust at Home</span>
              </h1>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-8 max-w-[580px]">
                Letting someone into your home to care for a person you love takes trust. Here's how MintexCare earns it:
                state licensing, nurse supervision, thorough caregiver screening and support around the clock.
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

            {/* License card */}
            <AnimatedSection from="right" delay={0.15} className="relative max-w-[480px] w-full mx-auto lg:mx-0 lg:justify-self-end">
              <div className="absolute -inset-3 rounded-[2.5rem] rotate-3 bg-[#2a66b0]/[0.06] border border-[#2a66b0]/10 hidden sm:block" />
              <div className="relative rounded-[2rem] p-8 sm:p-10 shadow-2xl overflow-hidden text-white" style={{ background: BRAND_GRADIENT }}>
                <div className="absolute top-0 right-0 w-56 h-56 rounded-full -translate-y-1/3 translate-x-1/4" style={{ background: "rgba(255,255,255,0.10)" }} />
                <div className="absolute inset-14 rounded-full border border-dashed deco-spin-slow" style={{ borderColor: "rgba(255,255,255,0.14)" }} />
                <div className="relative text-center">
                  <div className="w-24 h-24 rounded-[1.75rem] mx-auto mb-6 flex items-center justify-center shadow-xl" style={{ background: WHITE_TINT, border: "1px solid rgba(255,255,255,0.3)" }}>
                    <ShieldCheck className="w-12 h-12 text-white" strokeWidth={1.5} />
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/75 font-semibold mb-2">MintexCare is</p>
                  <p className="text-2xl font-bold leading-snug mb-6">Licensed by the State<br />of New Jersey</p>
                  <ul className="space-y-2.5 text-left max-w-[260px] mx-auto">
                    {["Bonded & insured", "RN-supervised care plans", "7-step caregiver screening", "Available 24/7"].map(t => (
                      <li key={t} className="flex items-center gap-2.5 text-sm text-white/90"><CheckCircle2 className="w-4 h-4 shrink-0" /> {t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <StatsStrip />

      {/* PILLARS */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection className="text-center mb-14">
            <Eyebrow>Our Standards</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Six reasons families <span className="text-[#2a66b0]">choose us</span></h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PILLARS.map(({ icon: I, title, text }, i) => (
              <AnimatedSection key={title} delay={Math.min(i, 4) * 0.06} className="h-full">
                <div className="group relative h-full bg-card border border-border rounded-3xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#2a66b0]/25 transition-all duration-300 overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" style={{ background: BRAND_GRADIENT }} />
                  <span className="absolute top-6 right-7 text-4xl font-extrabold text-[#2a66b0]/[0.07]">{String(i + 1).padStart(2, "0")}</span>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-md" style={{ background: BRAND_GRADIENT }}>
                    <I className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">{text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* SCREENING */}
      <section className="py-20 md:py-24 bg-[#f7f8f9] border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection className="text-center mb-14">
            <Eyebrow color="#0891b2">Caregiver Screening</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our <span className="text-[#0891b2]">7-step screening</span></h2>
            <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">Before any caregiver meets your family, they complete every one of these steps.</p>
          </AnimatedSection>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SCREENING.map(({ icon: I, title, text }, i) => (
              <AnimatedSection key={title} delay={Math.min(i, 4) * 0.05} className="h-full">
                <li className="relative h-full bg-card border border-border rounded-3xl p-6 shadow-sm list-none">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-md" style={{ background: BRAND_GRADIENT }}>
                      <I className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs font-bold text-[#2a66b0]">STEP {i + 1}</span>
                  </div>
                  <p className="font-bold text-gray-900 mb-1">{title}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
                </li>
              </AnimatedSection>
            ))}
            <AnimatedSection delay={0.2} className="h-full">
              <li className="h-full rounded-3xl p-6 text-white flex flex-col justify-center list-none" style={{ background: BRAND_GRADIENT }}>
                <CheckCircle2 className="w-9 h-9 mb-3" />
                <p className="font-bold text-lg leading-snug">Then matched to your loved one</p>
                <p className="text-sm text-white/80 mt-1">Based on needs, skills and personality.</p>
              </li>
            </AnimatedSection>
          </ol>
        </div>
      </section>

      {/* NURSE OVERSIGHT + CHECKLIST */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <AnimatedSection from="left">
              <Pill icon={HeartPulse}>Nurse Oversight</Pill>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-5">Registered nurses <span className="text-[#2a66b0]">behind every plan</span></h2>
              <p className="text-gray-500 leading-relaxed mb-8">Our RNs don't just sign off on paperwork. They stay involved in your loved one's care from the first visit.</p>
              <ul className="space-y-4">
                {[
                  { title: "Assess", text: "An in-home assessment of health, safety and daily routines." },
                  { title: "Plan", text: "A written, personalized care plan the caregiver follows." },
                  { title: "Supervise", text: "Regular oversight of caregivers and check-ins with your family." },
                  { title: "Update", text: "Changes to the plan whenever your loved one's needs change." },
                ].map(({ title, text }, i) => (
                  <li key={title} className="flex gap-4 bg-card border border-border rounded-2xl p-5 shadow-sm">
                    <span className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white text-sm font-bold shadow-md" style={{ background: BRAND_GRADIENT }}>{i + 1}</span>
                    <div>
                      <p className="font-bold text-gray-900">{title}</p>
                      <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
            <AnimatedSection from="right" delay={0.1}>
              <div className="bg-card border border-border rounded-3xl shadow-lg overflow-hidden">
                <div className="px-7 py-6 text-white" style={{ background: BRAND_GRADIENT }}>
                  <p className="text-xs uppercase tracking-widest text-white/75 font-semibold mb-1">Choosing an agency?</p>
                  <h3 className="text-xl font-bold">What to look for, and what you get with MintexCare</h3>
                </div>
                <ul className="divide-y divide-border">
                  {CHECKLIST.map(item => (
                    <li key={item} className="flex items-center justify-between gap-4 px-7 py-3.5">
                      <span className="text-gray-700 text-sm">{item}</span>
                      <CheckCircle2 className="w-5 h-5 text-[#0891b2] shrink-0" aria-label="Yes" />
                    </li>
                  ))}
                </ul>
                <div className="px-7 py-5 bg-muted/40 border-t border-border">
                  <Link to="/resources/guides#agency-questions" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2a66b0] hover:gap-2.5 transition-all">
                    Printable: questions to ask any agency <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-24 bg-[#f7f8f9] border-t border-border">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <AnimatedSection className="text-center mb-12">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Trust & safety questions</h2>
          </AnimatedSection>
          <div className="space-y-4">
            {WHY_FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className={`bg-card border rounded-2xl shadow-sm transition-all duration-300 ${open ? "border-[#2a66b0]/30 shadow-lg" : "border-border hover:shadow-md"}`}>
                  <button type="button" onClick={() => setOpenFaq(open ? null : i)} aria-expanded={open} aria-controls={`wfaq-${i}`}
                    className="w-full flex items-center gap-4 text-left px-5 md:px-6 py-5">
                    <span className="h-9 w-9 rounded-xl text-xs font-bold flex items-center justify-center shrink-0 text-white shadow-md" style={{ background: BRAND_GRADIENT }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 font-semibold text-gray-900 leading-snug">{f.q}</span>
                    <ChevronDown className={`h-5 w-5 text-[#2a66b0] shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
                  </button>
                  {/* Answer stays in the HTML when closed so search engines can read it. */}
                  <div id={`wfaq-${i}`} className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
                    <div className="overflow-hidden">
                      <p className="text-gray-600 leading-relaxed px-5 md:px-6 pb-6 md:pl-[76px]">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBlock tel={tel} phone={phone} title="Meet the team that will care for your family" text="Book a free consultation. We'll answer every question about our licensing, nurses and caregivers." />
    </>
  );
};

/* ════════════════════════════════════════════
   /reviews — testimonial carousel (same pattern as Mintex Staffing)
   ════════════════════════════════════════════ */

const initials = (name: string) =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]!.toUpperCase()).join("") || "?";

const Reviews = ({ tel, phone }: { tel: string; phone: string }) => {
  const { testimonials } = useAdmin();
  const [start, setStart] = useState(0);
  const [perView, setPerView] = useState(3);

  // Cards per slide follow the screen width.
  useEffect(() => {
    const update = () => setPerView(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const count = testimonials.length;
  const pages = Math.max(1, Math.ceil(count / perView));
  const page = Math.min(Math.floor(start / perView), pages - 1);
  const visible = testimonials.slice(page * perView, page * perView + perView);
  const go = (p: number) => setStart((((p % pages) + pages) % pages) * perView);

  return (
    <>
      <section className="relative pt-32 md:pt-40 pb-16 overflow-hidden">
        <HeroDeco />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <AnimatedSection className="max-w-3xl">
            <Breadcrumb trail={[{ label: "Home", to: "/" }, { label: "About", to: "/about" }, { label: "Reviews" }]} />
            <Pill icon={Heart}>Testimonials</Pill>
            <h1 className="font-bold text-gray-900 leading-[1.07] mb-5" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)" }}>
              What Families<br /><span className="text-[#2a66b0]">Say About Us</span>
            </h1>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-[600px]">
              Real words from the families and clients we've had the privilege of caring for across New Jersey.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <StatsStrip />

      <section className="py-20 md:py-24 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute rounded-full deco-float-down" style={{ background: "radial-gradient(circle, #e0f2fe 0%, transparent 70%)", width: 460, height: 460, top: "-10%", right: "-12%", opacity: 0.55 }} />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <AnimatedSection className="text-center mb-12">
            <Eyebrow>Testimonials</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">In their <span className="text-[#2a66b0]">own words</span></h2>
          </AnimatedSection>

          {count === 0 ? (
            <AnimatedSection>
              <div className="max-w-2xl mx-auto text-center bg-card border border-border rounded-3xl p-10 shadow-sm">
                <div className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center shadow-md" style={{ background: BRAND_GRADIENT }}>
                  <Quote className="w-8 h-8 text-white" />
                </div>
                <p className="text-xl font-bold text-gray-900 mb-2">Family stories are on their way</p>
                <p className="text-gray-500 leading-relaxed mb-6">We're gathering testimonials from the families we care for. In the meantime, we're happy to talk about our care, our nurses and our caregivers.</p>
                <a href={`tel:+1${tel}`} className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-3 rounded-full" style={GRADIENT_BTN}>
                  <Phone className="h-4 w-4" /> Call {phone}
                </a>
              </div>
            </AnimatedSection>
          ) : (
            <>
              <div className={`grid gap-6 ${perView === 3 ? "lg:grid-cols-3" : perView === 2 ? "sm:grid-cols-2" : ""}`}>
                {visible.map(t => (
                  <article key={t.id} className="relative h-full flex flex-col bg-card border border-border rounded-3xl p-7 md:p-8 shadow-sm hover:shadow-xl transition-shadow overflow-hidden">
                    <span className="absolute -top-3 right-5 text-[120px] font-serif leading-none text-[#2a66b0]/[0.06] select-none pointer-events-none" aria-hidden="true">"</span>
                    <Quote className="w-8 h-8 text-[#0891b2] mb-5" />
                    <p className="text-gray-700 leading-relaxed flex-1 mb-7">"{t.text}"</p>
                    <div className="flex items-center gap-3 pt-5 border-t border-border">
                      <span className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-white font-bold shadow-md" style={{ background: BRAND_GRADIENT }}>
                        {initials(t.name)}
                      </span>
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900 leading-tight truncate">{t.name}</p>
                        {t.location && <p className="text-sm text-gray-500 flex items-center gap-1"><MapPin className="h-3.5 w-3.5 shrink-0" /> {t.location}</p>}
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {pages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-10">
                  <button type="button" onClick={() => go(page - 1)} aria-label="Previous testimonials"
                    className="h-11 w-11 rounded-full glass-btn flex items-center justify-center text-foreground hover:text-primary transition-colors">
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <div className="flex gap-1.5">
                    {Array.from({ length: pages }).map((_, i) => (
                      <button key={i} type="button" onClick={() => go(i)} aria-label={`Show testimonials page ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === page ? "bg-[#2a66b0] w-8" : "bg-border w-1.5 hover:bg-[#2a66b0]/40"}`} />
                    ))}
                  </div>
                  <button type="button" onClick={() => go(page + 1)} aria-label="Next testimonials"
                    className="h-11 w-11 rounded-full glass-btn flex items-center justify-center text-foreground hover:text-primary transition-colors">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </>
          )}

          <AnimatedSection className="mt-14">
            <Link to="/about/why-mintexcare" className="group flex flex-col sm:flex-row sm:items-center gap-4 rounded-3xl border border-blue-100 bg-blue-50 p-6 hover:shadow-md transition-all max-w-4xl mx-auto">
              <span className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md" style={{ background: BRAND_GRADIENT }}><ShieldCheck className="w-6 h-6 text-white" /></span>
              <span className="flex-1">
                <span className="block font-bold text-gray-900">Why families trust MintexCare</span>
                <span className="block text-sm text-gray-600">State licensing, nurse supervision and our 7-step caregiver screening.</span>
              </span>
              <ArrowRight className="h-5 w-5 text-[#2a66b0] group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <CtaBlock tel={tel} phone={phone} title="Experience the MintexCare difference" text="Talk to a care coordinator today and arrange a free in-home assessment, with no obligation." />
    </>
  );
};

/* ════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════ */

const WHY_SCHEMA_ID = "why-faq-schema";

const Trust = () => {
  const { pathname } = useLocation();
  const { contactInfo } = useAdmin();
  const tel = contactInfo.phone.replace(/[^\d+]/g, "");
  const phone = contactInfo.phone;

  // FAQPage structured data on /about/why-mintexcare (replaces the prerendered copy).
  useEffect(() => {
    document.getElementById(WHY_SCHEMA_ID)?.remove();
    if (pathname !== "/about/why-mintexcare") return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = WHY_SCHEMA_ID;
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": "https://mintexcare.com/about/why-mintexcare#faq",
      "mainEntity": WHY_FAQS.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })),
    });
    document.head.appendChild(script);
    return () => { document.getElementById(WHY_SCHEMA_ID)?.remove(); };
  }, [pathname]);

  return (
    <>
      <Header />
      <main className="bg-background overflow-x-clip">
        {pathname === "/reviews" ? <Reviews tel={tel} phone={phone} /> : <WhyMintexCare tel={tel} phone={phone} />}
      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
      <AccessibilityButton />
    </>
  );
};

export default Trust;
