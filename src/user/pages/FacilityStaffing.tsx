import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState, type ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import AccessibilityButton from "@/components/AccessibilityButton";
import AnimatedSection from "@/components/AnimatedSection";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAdmin } from "@/contexts/AdminContext";
import { usePageImages } from "@/hooks/usePageImages";
import { useSpamGuard } from "@/hooks/useSpamGuard";
import { useToast } from "@/hooks/use-toast";
import { PENDING_IMAGE } from "@/config/siteImageConfig";
import { STAFFING_ROLES, STAFFING_FAQS, FACILITY_TYPES, type StaffingRole } from "@/data/staffing";
import { trackLead, type LeadSource } from "@/lib/leads";
import {
  ArrowRight, Phone, MessageCircle, CheckCircle2, ShieldCheck, Clock, Building2, Users, CalendarDays,
  CalendarClock, CalendarRange, BadgeCheck, FileSearch, HeartPulse, Brain, Home, Activity, Hospital,
  ChevronRight, Send, Loader2, ClipboardCheck, Handshake, UserCheck, Sparkles, Plus,
} from "lucide-react";
import React from "react";

// /facility-staffing, /facility-staffing/roles and /facility-staffing/request-staff share this chunk.

const GRADIENT_BTN = {
  background: "linear-gradient(135deg, hsl(214 66% 44%) 0%, hsl(192 91% 37%) 100%)",
  border: "1px solid rgba(255,255,255,0.3)",
  boxShadow: "0 2px 12px rgba(38,104,188,0.30), inset 0 1px 0 rgba(255,255,255,0.25)",
  color: "#fff",
};
const BRAND_GRADIENT = "linear-gradient(135deg, #1d4f8c 0%, #2a66b0 55%, #0891b2 100%)";
// White tints are inline styles: the dark theme overrides bg-white/* classes.
const WHITE_TINT = "rgba(255,255,255,0.15)";

const REQUEST_PATH = "/facility-staffing/request-staff";

const ROLE_PALETTES = [
  { solid: "#2a66b0", bg: "rgba(42,102,176,0.08)" },
  { solid: "#0891b2", bg: "rgba(8,145,178,0.08)" },
  { solid: "#14b8a6", bg: "rgba(20,184,166,0.08)" },
  { solid: "#6366f1", bg: "rgba(99,102,241,0.08)" },
];

/* ════════════════════════════════════════════
   SHARED PIECES
   ════════════════════════════════════════════ */

const Eyebrow = ({ children, color = "#2a66b0" }: { children: ReactNode; color?: string }) => (
  <div className="inline-flex items-center gap-3 mb-5">
    <span className="h-px w-10 inline-block" style={{ background: color }} />
    <span className="text-xs font-extrabold uppercase tracking-[0.25em]" style={{ color }}>{children}</span>
    <span className="h-px w-10 inline-block" style={{ background: color }} />
  </div>
);

const Pill = ({ icon: Icon, children }: { icon?: typeof Building2; children: ReactNode }) => (
  <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-6">
    {Icon ? <Icon className="w-3.5 h-3.5 text-[#2a66b0]" /> : <span className="w-1.5 h-1.5 rounded-full bg-[#2a66b0]" />}
    <span className="text-xs font-semibold text-[#2a66b0] uppercase tracking-widest">{children}</span>
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
    <div className="absolute bottom-[16%] left-[44%] hidden lg:grid grid-cols-5 gap-3">
      {Array.from({ length: 15 }).map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#2a66b0]/15" />)}
    </div>
    <svg className="absolute bottom-0 left-0 w-full h-16 opacity-[0.06]" viewBox="0 0 1440 64" preserveAspectRatio="none">
      <path d="M0,32 C360,64 720,0 1080,32 C1260,48 1380,16 1440,32 L1440,64 L0,64 Z" fill="#2a66b0" />
    </svg>
  </div>
);

const CallButton = ({ tel, phone, light = false }: { tel: string; phone: string; light?: boolean }) => (
  <a href={`tel:+1${tel}`}
    className={light
      ? "inline-flex items-center justify-center gap-2 font-bold text-sm px-7 py-4 rounded-full transition-all hover:scale-105 shadow-lg"
      : "inline-flex items-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-full text-foreground hover:text-primary transition-all glass-btn"}
    style={light ? { background: "#fff", color: "#1d4f8c" } : undefined}>
    <Phone className="h-4 w-4" /> Call {phone}
  </a>
);

const CtaBanner = ({ tel, phone, title, text }: { tel: string; phone: string; title: string; text: string }) => (
  <section className="py-20 bg-background">
    <div className="container mx-auto px-4 md:px-6">
      <AnimatedSection>
        <div className="relative rounded-3xl overflow-hidden px-6 py-12 sm:px-10 sm:py-16 md:px-16 text-center" style={{ background: BRAND_GRADIENT }}>
          <div className="pointer-events-none absolute top-0 right-0 w-72 h-72 rounded-full -translate-y-1/2 translate-x-1/4" style={{ background: "rgba(255,255,255,0.10)" }} />
          <div className="pointer-events-none absolute bottom-0 left-0 w-52 h-52 rounded-full translate-y-1/2 -translate-x-1/4" style={{ background: "rgba(255,255,255,0.08)" }} />
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5" style={{ background: WHITE_TINT }}>
              <Handshake className="w-3.5 h-3.5 text-white" />
              <span className="text-xs font-semibold text-white uppercase tracking-widest">Partner With MintexCare</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-white leading-snug mb-4">{title}</h2>
            <p className="text-white/80 text-sm md:text-base leading-relaxed mb-9">{text}</p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <Link to={REQUEST_PATH}
                className="inline-flex items-center justify-center gap-2 font-bold text-sm px-7 py-4 rounded-full transition-all hover:scale-105 shadow-lg"
                style={{ background: "#fff", color: "#1d4f8c" }}>
                Request Staff <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={`tel:+1${tel}`}
                className="inline-flex items-center justify-center gap-2 font-bold text-sm px-7 py-4 rounded-full text-white transition-all hover:scale-105"
                style={{ background: WHITE_TINT, border: "1px solid rgba(255,255,255,0.35)" }}>
                <Phone className="h-4 w-4" /> Call {phone}
              </a>
              <a href={`https://wa.me/1${tel}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 font-bold text-sm px-7 py-4 rounded-full text-white transition-all hover:scale-105"
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

/** Role card in the same style as the Services page cards. */
const RoleCard = ({ role, i }: { role: StaffingRole; i: number }) => {
  const palette = ROLE_PALETTES[i % ROLE_PALETTES.length];
  const Icon = role.icon;
  return (
    <AnimatedSection delay={i * 0.07} className="h-full">
      <Link to={`/facility-staffing/roles#${role.code.toLowerCase()}`}
        className="svc-card-wrapper h-full block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2a66b0] focus-visible:ring-offset-4"
        style={{ "--icon-color": palette.solid } as React.CSSProperties}>
        <div className="svc-card group relative rounded-2xl p-8 border border-gray-100 h-full flex flex-col items-center text-center bg-[#f4f6f8]">
          <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" style={{ background: palette.solid }} />
          <div className="svc-icon-box mb-6" style={{ "--icon-color": palette.solid, "--icon-bg": palette.bg } as React.CSSProperties}>
            <Icon className="icon-svg w-7 h-7" style={{ color: palette.solid }} />
          </div>
          <p className="text-2xl font-extrabold mb-1" style={{ color: palette.solid }}>{role.code}</p>
          <h3 className="font-bold text-gray-900 text-[17px] leading-snug mb-3">{role.title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed flex-1">{role.summary}</p>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold mt-5 transition-all group-hover:gap-2.5" style={{ color: palette.solid }}>
            View role <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </AnimatedSection>
  );
};

/* ════════════════════════════════════════════
   /facility-staffing (overview + partner FAQ)
   ════════════════════════════════════════════ */

const FACILITIES = [
  { icon: Hospital,  label: "Skilled nursing facilities" },
  { icon: Home,      label: "Assisted living communities" },
  { icon: Activity,  label: "Rehabilitation centers" },
  { icon: Brain,     label: "Memory care communities" },
  { icon: Building2, label: "Long-term care facilities" },
  { icon: Users,     label: "Group homes" },
];

const OPTIONS = [
  { icon: CalendarDays,  title: "Per diem shifts",      text: "Cover call-outs, vacations and busy days, one shift at a time." },
  { icon: CalendarRange, title: "Short-term contracts", text: "Steady coverage for weeks or months during leave, a census increase or a hiring gap." },
  { icon: CalendarClock, title: "Long-term placements", text: "Consistent staff who learn your residents, routines and systems." },
];

const PROCESS = [
  { icon: ClipboardCheck, title: "Send a request",   text: "Tell us the role, shifts, start date and anything staff should know." },
  { icon: UserCheck,      title: "We match staff",   text: "We select screened, qualified staff who fit the role and your setting." },
  { icon: CalendarDays,   title: "Confirm details",  text: "We confirm names, credentials and shift details with your team." },
  { icon: HeartPulse,     title: "Ongoing support",  text: "We check in on every assignment and act quickly on your feedback." },
];

const SCREENING = [
  { icon: BadgeCheck, text: "Licenses and certifications verified" },
  { icon: FileSearch, text: "Background checks and references" },
  { icon: HeartPulse, text: "Required health screenings confirmed" },
  { icon: ShieldCheck, text: "Orientation to your facility's expectations" },
];

const Overview = ({ tel, phone }: { tel: string; phone: string }) => {
  const { siteImages } = useAdmin();
  usePageImages("/facility-staffing", ["staffingHero"]);
  const photo = siteImages.staffingHero;
  const hasPhoto = !!photo && photo !== PENDING_IMAGE;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 md:pt-40 pb-24 md:pb-28 overflow-hidden">
        <HeroDeco />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-14 xl:gap-20 items-center">
            <AnimatedSection from="left">
              <Breadcrumb trail={[{ label: "Home", to: "/" }, { label: "Facility Staffing" }]} />
              <Pill icon={Building2}>Facility Staffing</Pill>
              <h1 className="font-bold text-gray-900 leading-[1.07] mb-5" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)" }}>
                Reliable Staffing for<br />
                <span className="text-[#2a66b0]">NJ Care Facilities</span>
              </h1>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-8 max-w-[560px]">
                Short-staffed? MintexCare provides screened home health aides, CNAs, LPNs and RNs to skilled nursing,
                assisted living, rehab and long-term care facilities across New Jersey, from a single shift to long-term placements.
              </p>
              <div className="flex flex-wrap gap-3 mb-9">
                <Link to={REQUEST_PATH} className="inline-flex items-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-full transition-all hover:scale-105" style={GRADIENT_BTN}>
                  Request Staff <ArrowRight className="h-4 w-4" />
                </Link>
                <CallButton tel={tel} phone={phone} />
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                {[
                  { icon: ShieldCheck, label: "Screened & verified staff" },
                  { icon: Users,       label: "HHA · CNA · LPN · RN" },
                  { icon: Clock,       label: "Available 24/7" },
                ].map(({ icon: I, label }) => (
                  <div key={label} className="flex items-center gap-2 text-sm text-gray-500">
                    <I className="w-4 h-4 text-[#2a66b0]" /><span>{label}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection from="right" delay={0.15} className="relative max-w-[520px] w-full mx-auto lg:mx-0 lg:justify-self-end">
              <div className="absolute -inset-3 rounded-[2.5rem] rotate-3 bg-[#2a66b0]/[0.06] border border-[#2a66b0]/10 hidden sm:block" />
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/4.2]">
                {hasPhoto ? (
                  <>
                    <img src={photo} alt="MintexCare nurse staffing a care facility" className="w-full h-full object-cover" loading="eager" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,30,60,0.55) 0%, transparent 55%)" }} />
                  </>
                ) : (
                  <div className="w-full h-full relative flex items-center justify-center" style={{ background: BRAND_GRADIENT }}>
                    <div className="absolute top-0 right-0 w-56 h-56 rounded-full -translate-y-1/3 translate-x-1/4" style={{ background: "rgba(255,255,255,0.10)" }} />
                    <div className="absolute bottom-0 left-0 w-44 h-44 rounded-full translate-y-1/3 -translate-x-1/4" style={{ background: "rgba(255,255,255,0.08)" }} />
                    <div className="absolute inset-10 rounded-full border border-dashed deco-spin-slow" style={{ borderColor: "rgba(255,255,255,0.18)" }} />
                    <Plus className="absolute top-10 left-10 w-6 h-6 deco-float-up" style={{ color: "rgba(255,255,255,0.35)" }} />
                    <Sparkles className="absolute bottom-16 right-12 w-6 h-6 deco-float-down" style={{ color: "rgba(255,255,255,0.35)" }} />
                    <div className="relative grid grid-cols-2 gap-3">
                      {STAFFING_ROLES.map(r => {
                        const I = r.icon;
                        return (
                          <div key={r.code} className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl flex flex-col items-center justify-center gap-1.5 shadow-xl"
                            style={{ background: WHITE_TINT, border: "1px solid rgba(255,255,255,0.3)", backdropFilter: "blur(6px)" }}>
                            <I className="w-8 h-8 text-white" strokeWidth={1.6} />
                            <span className="text-white font-bold text-sm tracking-wide">{r.code}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-7 pt-6 pb-16">
                  <p className="text-white/75 text-xs uppercase tracking-widest mb-1 font-semibold">MintexCare</p>
                  <p className="text-white font-bold text-lg leading-snug">Healthcare Staffing</p>
                </div>
              </div>
              <div className="absolute top-4 -left-2 sm:-left-8 bg-card rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-border z-10">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: BRAND_GRADIENT }}>
                  <CalendarDays className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 leading-none">Per diem to long-term</p>
                  <p className="text-xs text-gray-500 mt-1">Flexible coverage</p>
                </div>
              </div>
              <div className="absolute -bottom-5 right-2 sm:-right-6 bg-card rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-border z-10">
                <div className="w-10 h-10 rounded-xl bg-[#0891b2]/10 flex items-center justify-center shrink-0">
                  <BadgeCheck className="w-5 h-5 text-[#0891b2]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 leading-none">Credentials verified</p>
                  <p className="text-xs text-gray-500 mt-1">Before every placement</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="py-8 bg-muted/50 border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-center text-xs font-semibold text-gray-500 uppercase tracking-widest mb-5">Facilities we staff</p>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
            {FACILITIES.map(({ icon: I, label }, i) => (
              <AnimatedSection key={label} delay={i * 0.04}>
                <div className="flex items-center gap-3 bg-card rounded-2xl px-4 py-4 border border-border h-full">
                  <div className="w-10 h-10 rounded-xl bg-[#2a66b0]/10 flex items-center justify-center shrink-0">
                    <I className="w-5 h-5 text-[#2a66b0]" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800 leading-snug">{label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section className="py-24 bg-[#f7f8f9] relative overflow-hidden">
        <div className="pointer-events-none select-none absolute inset-0 z-0" aria-hidden="true">
          <svg className="svc-deco-float absolute -top-4 -left-4 w-44 h-44 opacity-[0.15]" viewBox="0 0 100 100" fill="none">
            <rect x="44" y="2" width="12" height="96" rx="5" fill="#2a66b0" /><rect x="2" y="44" width="96" height="12" rx="5" fill="#2a66b0" />
          </svg>
          <svg className="svc-deco-mid absolute top-8 right-0 w-72 h-16 opacity-[0.15]" viewBox="0 0 260 50" fill="none">
            <polyline points="0,25 36,25 52,5 66,45 80,10 94,38 110,25 260,25" stroke="#2a66b0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <AnimatedSection className="text-center mb-14">
            <Eyebrow>Roles We Staff</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Aides &amp; <span className="text-[#2a66b0]">Nurses</span></h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">Qualified staff for every level of care on your floor</p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STAFFING_ROLES.map((r, i) => <RoleCard key={r.code} role={r} i={i} />)}
          </div>
        </div>
      </section>

      {/* STAFFING OPTIONS */}
      <section className="py-24 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute rounded-full deco-float-down" style={{ background: "radial-gradient(circle, #e0f2fe 0%, transparent 70%)", width: 460, height: 460, top: "-10%", right: "-12%", opacity: 0.55 }} />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <AnimatedSection className="text-center mb-14">
            <Eyebrow color="#0891b2">Staffing Options</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Coverage That <span className="text-[#0891b2]">Fits</span></h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">One shift, a few months or long term: tell us what your team needs</p>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6">
            {OPTIONS.map(({ icon: I, title, text }, i) => (
              <AnimatedSection key={title} delay={i * 0.07} className="h-full">
                <div className="group relative h-full bg-card border border-border rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#2a66b0]/25 transition-all duration-300 overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" style={{ background: BRAND_GRADIENT }} />
                  <span className="absolute top-6 right-7 text-5xl font-extrabold text-[#2a66b0]/[0.07]">{String(i + 1).padStart(2, "0")}</span>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-md" style={{ background: BRAND_GRADIENT }}>
                    <I className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-500 leading-relaxed">{text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS + SCREENING */}
      <section className="py-24 bg-[#f7f8f9] relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[14%] right-[6%] w-40 h-40 rounded-full border-2 border-[#2a66b0]/[0.08] deco-spin-slow hidden lg:block" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 xl:gap-14 items-start">
            <AnimatedSection from="left">
              <Pill>How It Works</Pill>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-10">
                From request to <span className="text-[#2a66b0]">staff on the floor</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {PROCESS.map(({ icon: I, title, text }, i) => (
                  <div key={title} className="relative bg-card border border-border rounded-3xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-md" style={{ background: BRAND_GRADIENT }}>
                        <I className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs font-bold text-[#2a66b0]">STEP {i + 1}</span>
                    </div>
                    <p className="font-bold text-gray-900 mb-1">{title}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection from="right" delay={0.1} className="lg:sticky lg:top-32">
              <div className="relative rounded-3xl p-8 overflow-hidden text-white" style={{ background: BRAND_GRADIENT }}>
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full -translate-y-1/2 translate-x-1/3" style={{ background: "rgba(255,255,255,0.10)" }} />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: WHITE_TINT }}>
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 leading-snug">Every placement is screened</h3>
                  <div className="w-10 h-[3px] rounded-full mb-5" style={{ background: "rgba(255,255,255,0.5)" }} />
                  <ul className="space-y-3.5 mb-7">
                    {SCREENING.map(({ icon: I, text }) => (
                      <li key={text} className="flex items-start gap-3 text-sm text-white/90">
                        <I className="w-4 h-4 mt-0.5 shrink-0 text-white" />{text}
                      </li>
                    ))}
                  </ul>
                  <Link to={REQUEST_PATH} className="flex items-center justify-center gap-2 font-bold text-sm px-6 py-3.5 rounded-full transition-all hover:scale-[1.03] shadow-lg" style={{ background: "#fff", color: "#1d4f8c" }}>
                    Request Staff <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* PARTNER FAQ */}
      <section id="faq" className="py-24 scroll-mt-28">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <AnimatedSection className="text-center mb-12">
            <Eyebrow>Partner FAQ</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Questions from <span className="text-[#2a66b0]">facilities</span></h2>
          </AnimatedSection>
          <div className="space-y-4">
            {STAFFING_FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <AnimatedSection key={f.q} delay={Math.min(i, 4) * 0.05}>
                  <div className={`bg-card border rounded-2xl shadow-sm transition-all duration-300 ${open ? "border-[#2a66b0]/30 shadow-lg" : "border-border hover:shadow-md"}`}>
                    <button type="button" onClick={() => setOpenFaq(open ? null : i)} aria-expanded={open} aria-controls={`sfaq-${i}`}
                      className="w-full flex items-center gap-4 text-left px-5 md:px-7 py-5">
                      <span className="h-9 w-9 rounded-xl text-xs font-bold flex items-center justify-center shrink-0 text-white shadow-md" style={{ background: BRAND_GRADIENT }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 font-semibold text-gray-900 leading-snug">{f.q}</span>
                      <ChevronRight className={`h-5 w-5 text-[#2a66b0] shrink-0 transition-transform duration-300 ${open ? "rotate-90" : ""}`} />
                    </button>
                    {/* Answer stays in the HTML when closed so search engines can read it. */}
                    <div id={`sfaq-${i}`} className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
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

      <CtaBanner tel={tel} phone={phone}
        title="Need coverage for an upcoming shift?"
        text="Send us your staffing request and our team will follow up to confirm details, or call us any time for urgent coverage." />
    </>
  );
};

/* ════════════════════════════════════════════
   /facility-staffing/roles
   ════════════════════════════════════════════ */

const Roles = ({ tel, phone }: { tel: string; phone: string }) => (
  <>
    <section className="relative pt-32 md:pt-40 pb-16 md:pb-20 overflow-hidden">
      <HeroDeco />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection className="max-w-3xl">
          <Breadcrumb trail={[{ label: "Home", to: "/" }, { label: "Facility Staffing", to: "/facility-staffing" }, { label: "Roles" }]} />
          <Pill icon={Users}>Roles We Staff</Pill>
          <h1 className="font-bold text-gray-900 leading-[1.07] mb-5" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)" }}>
            HHA, CNA, LPN &amp; RN<br /><span className="text-[#2a66b0]">Staffing</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-8 max-w-[620px]">
            See what each role covers, the settings we staff and the credentials we verify, then request the staff you need.
          </p>
          <div className="flex flex-wrap gap-3">
            {STAFFING_ROLES.map(r => (
              <a key={r.code} href={`#${r.code.toLowerCase()}`}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-gray-700 bg-card border border-border shadow-sm hover:text-[#2a66b0] hover:border-[#2a66b0]/30 transition-all">
                <r.icon className="h-4 w-4 text-[#2a66b0]" /> {r.code}
              </a>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>

    <section className="py-16 md:py-20 bg-[#f7f8f9] border-t border-border">
      <div className="container mx-auto px-4 md:px-6 space-y-8">
        {STAFFING_ROLES.map((r, i) => {
          const palette = ROLE_PALETTES[i % ROLE_PALETTES.length];
          const Icon = r.icon;
          return (
            <AnimatedSection key={r.code}>
              <article id={r.code.toLowerCase()} className="scroll-mt-32 bg-card border border-border rounded-3xl shadow-sm overflow-hidden grid lg:grid-cols-[360px_1fr]">
                <div className="relative p-8 md:p-10 text-white overflow-hidden" style={{ background: BRAND_GRADIENT }}>
                  <div className="absolute top-0 right-0 w-44 h-44 rounded-full -translate-y-1/2 translate-x-1/3" style={{ background: "rgba(255,255,255,0.10)" }} />
                  <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full translate-y-1/2 -translate-x-1/3" style={{ background: "rgba(255,255,255,0.08)" }} />
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ background: WHITE_TINT, border: "1px solid rgba(255,255,255,0.3)" }}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-5xl font-extrabold leading-none mb-2">{r.code}</p>
                    <h2 className="text-xl font-bold mb-4">{r.title}</h2>
                    <p className="text-white/80 text-sm leading-relaxed mb-7">{r.summary}</p>
                    <Link to={`${REQUEST_PATH}?role=${r.code}`}
                      className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-full transition-all hover:scale-105 shadow-lg"
                      style={{ background: "#fff", color: "#1d4f8c" }}>
                      Request {r.code}s <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
                <div className="p-8 md:p-10 grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: palette.solid }}>Typical duties</p>
                    <ul className="space-y-3">
                      {r.duties.map(d => (
                        <li key={d} className="flex items-start gap-3 text-gray-700 leading-snug">
                          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-[#0891b2]" />{d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-7">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: palette.solid }}>Settings</p>
                      <div className="flex flex-wrap gap-2">
                        {r.settings.map(s => (
                          <span key={s} className="text-sm text-gray-700 bg-gray-100 rounded-full px-3.5 py-1.5">{s}</span>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
                      <div className="flex items-start gap-3">
                        <BadgeCheck className="w-5 h-5 text-[#2a66b0] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-[#2a66b0] uppercase tracking-widest mb-1">Credential verified</p>
                          <p className="text-sm text-gray-700 leading-snug">{r.credential}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </AnimatedSection>
          );
        })}
      </div>
    </section>

    <CtaBanner tel={tel} phone={phone}
      title="Tell us which roles you need"
      text="Send one request for any mix of aides and nurses. We'll confirm availability and next steps with your team." />
  </>
);

/* ════════════════════════════════════════════
   /facility-staffing/request-staff
   ════════════════════════════════════════════ */

const SHIFTS = ["Day", "Evening", "Night", "Weekend"];
const DURATIONS = ["Per diem / single shifts", "Short-term contract", "Long-term placement", "Not sure yet"];

const EMPTY_FORM = {
  facilityName: "", facilityType: "", location: "", contactName: "", jobTitle: "",
  email: "", phone: "", staffCount: "", startDate: "", duration: "", notes: "",
  roles: [] as string[], shifts: [] as string[],
};

const FieldLabel = ({ htmlFor, children, required = false }: { htmlFor?: string; children: ReactNode; required?: boolean }) => (
  <label htmlFor={htmlFor} className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
    {children}{required && <span className="text-[#2a66b0]"> *</span>}
  </label>
);

const TogglePill = ({ checked, onChange, children }: { checked: boolean; onChange: () => void; children: ReactNode }) => (
  <label className={`cursor-pointer select-none inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold border transition-all focus-within:ring-2 focus-within:ring-[#2a66b0]/40 ${
    checked ? "text-white border-transparent shadow-md" : "text-gray-600 bg-card border-border hover:border-[#2a66b0]/40 hover:text-[#2a66b0]"
  }`} style={checked ? { background: BRAND_GRADIENT } : undefined}>
    <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
    {checked ? <CheckCircle2 className="h-4 w-4" /> : <span className="h-4 w-4 rounded-full border-2 border-current opacity-50" />}
    {children}
  </label>
);

const RequestStaff = ({ tel, phone }: { tel: string; phone: string }) => {
  const { addSubmission } = useAdmin();
  const { toast } = useToast();
  const spamGuard = useSpamGuard();
  const [params] = useSearchParams();
  const preset = STAFFING_ROLES.find(r => r.code === params.get("role")?.toUpperCase())?.code;
  const [form, setForm] = useState<typeof EMPTY_FORM>({ ...EMPTY_FORM, roles: preset ? [preset] : [] });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const set = (key: keyof typeof EMPTY_FORM) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }));
  const toggle = (key: "roles" | "shifts", value: string) =>
    setForm(f => ({ ...f, [key]: f[key].includes(value) ? f[key].filter(v => v !== value) : [...f[key], value] }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (spamGuard.isSpam()) {
      navigate("/thank-you", { state: { source: "staffing" satisfies LeadSource } });
      return;
    }
    if (!form.facilityName.trim() || !form.contactName.trim() || !form.email.trim() || !form.phone.trim()) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    if (form.roles.length === 0) {
      toast({ title: "Please choose at least one role", variant: "destructive" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      toast({ title: "Please enter a valid email address", variant: "destructive" });
      return;
    }
    if (!/^[\d\s\-+()]{7,}$/.test(form.phone.trim())) {
      toast({ title: "Please enter a valid phone number", variant: "destructive" });
      return;
    }

    // Saved as a "contact" submission (service: Facility Staffing) so it shows in Admin → Submissions
    // without changing the Firestore rules. Details go in the message, one per line.
    const message = [
      `Facility: ${form.facilityName.trim()}${form.facilityType ? ` (${form.facilityType})` : ""}`,
      form.location.trim() && `Location: ${form.location.trim()}`,
      `Contact: ${form.contactName.trim()}${form.jobTitle.trim() ? `, ${form.jobTitle.trim()}` : ""}`,
      `Roles needed: ${form.roles.join(", ")}`,
      form.staffCount.trim() && `Number of staff: ${form.staffCount.trim()}`,
      form.shifts.length > 0 && `Shifts: ${form.shifts.join(", ")}`,
      form.startDate && `Start date: ${form.startDate}`,
      form.duration && `Assignment: ${form.duration}`,
      form.notes.trim() && `\nNotes:\n${form.notes.trim().slice(0, 3000)}`,
    ].filter(Boolean).join("\n");

    setSubmitting(true);
    try {
      await addSubmission({
        type: "contact",
        name: form.contactName.trim().slice(0, 100),
        email: form.email.trim().slice(0, 200),
        phone: form.phone.trim().slice(0, 40),
        service: `Facility Staffing: ${form.roles.join(", ")}`,
        message: message.slice(0, 5000),
      });
      trackLead("staffing", { roles: form.roles.join(",") });
      spamGuard.reset();
      navigate("/thank-you", { state: { source: "staffing" satisfies LeadSource, name: form.contactName.trim().split(" ")[0] } });
    } catch {
      toast({ title: "Request could not be sent", description: `Please try again or call us at ${phone}.`, variant: "destructive" });
      setSubmitting(false);
    }
  };

  const inputCls = "font-sans h-12 rounded-xl border-border focus-visible:ring-[#2a66b0]/30";

  return (
    <>
      <section className="relative pt-32 md:pt-40 pb-14 overflow-hidden">
        <HeroDeco />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <AnimatedSection className="max-w-3xl">
            <Breadcrumb trail={[{ label: "Home", to: "/" }, { label: "Facility Staffing", to: "/facility-staffing" }, { label: "Request Staff" }]} />
            <Pill icon={ClipboardCheck}>For Facilities</Pill>
            <h1 className="font-bold text-gray-900 leading-[1.07] mb-5" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)" }}>
              Request <span className="text-[#2a66b0]">Facility Staff</span>
            </h1>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-[620px]">
              Tell us about the shifts you need to cover. Our staffing team will follow up to confirm availability, rates and next steps.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start max-w-6xl mx-auto">

            {/* Form (a successful request goes to /thank-you) */}
            <AnimatedSection>
              <div className="bg-card rounded-3xl shadow-2xl shadow-primary/5 border border-border overflow-hidden">
                <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg, #2a66b0, #0891b2)" }} />
                  <form onSubmit={handleSubmit} className="relative p-6 sm:p-8 md:p-10 space-y-9" noValidate>
                    {spamGuard.honeypotField}

                    {/* Roles */}
                    <fieldset>
                      <legend className="text-lg font-bold text-gray-900 mb-1">What staff do you need?</legend>
                      <p className="text-sm text-gray-500 mb-4">Choose one or more roles. <span className="text-[#2a66b0]">*</span></p>
                      <div className="flex flex-wrap gap-2.5">
                        {STAFFING_ROLES.map(r => (
                          <TogglePill key={r.code} checked={form.roles.includes(r.code)} onChange={() => toggle("roles", r.code)}>
                            {r.code} <span className="font-normal opacity-80 hidden sm:inline">· {r.title}</span>
                          </TogglePill>
                        ))}
                      </div>
                    </fieldset>

                    {/* Schedule */}
                    <fieldset>
                      <legend className="text-lg font-bold text-gray-900 mb-4">Shifts &amp; schedule</legend>
                      <div className="flex flex-wrap gap-2.5 mb-5">
                        {SHIFTS.map(s => (
                          <TogglePill key={s} checked={form.shifts.includes(s)} onChange={() => toggle("shifts", s)}>{s}</TogglePill>
                        ))}
                      </div>
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div>
                          <FieldLabel htmlFor="rs-count">Number of staff</FieldLabel>
                          <Input id="rs-count" type="number" min={1} max={99} inputMode="numeric" placeholder="e.g. 2" value={form.staffCount} onChange={set("staffCount")} className={inputCls} />
                        </div>
                        <div>
                          <FieldLabel htmlFor="rs-start">Start date</FieldLabel>
                          <Input id="rs-start" type="date" value={form.startDate} onChange={set("startDate")} className={inputCls} />
                        </div>
                        <div>
                          <FieldLabel htmlFor="rs-duration">Assignment</FieldLabel>
                          <Select value={form.duration} onValueChange={v => setForm(f => ({ ...f, duration: v }))}>
                            <SelectTrigger id="rs-duration" className="font-sans h-12 rounded-xl border-border"><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>{DURATIONS.map(d => <SelectItem key={d} value={d} className="font-sans">{d}</SelectItem>)}</SelectContent>
                          </Select>
                        </div>
                      </div>
                    </fieldset>

                    {/* Facility */}
                    <fieldset className="space-y-4">
                      <legend className="text-lg font-bold text-gray-900 mb-4">Your facility</legend>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <FieldLabel htmlFor="rs-facility" required>Facility name</FieldLabel>
                          <Input id="rs-facility" required autoComplete="organization" value={form.facilityName} onChange={set("facilityName")} className={inputCls} />
                        </div>
                        <div>
                          <FieldLabel htmlFor="rs-type">Facility type</FieldLabel>
                          <Select value={form.facilityType} onValueChange={v => setForm(f => ({ ...f, facilityType: v }))}>
                            <SelectTrigger id="rs-type" className="font-sans h-12 rounded-xl border-border"><SelectValue placeholder="Select facility type" /></SelectTrigger>
                            <SelectContent>{FACILITY_TYPES.map(t => <SelectItem key={t} value={t} className="font-sans">{t}</SelectItem>)}</SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <FieldLabel htmlFor="rs-location">City / town</FieldLabel>
                        <Input id="rs-location" placeholder="e.g. Edison, NJ" autoComplete="address-level2" value={form.location} onChange={set("location")} className={inputCls} />
                      </div>
                    </fieldset>

                    {/* Contact */}
                    <fieldset className="space-y-4">
                      <legend className="text-lg font-bold text-gray-900 mb-4">Your contact details</legend>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <FieldLabel htmlFor="rs-name" required>Your name</FieldLabel>
                          <Input id="rs-name" required autoComplete="name" value={form.contactName} onChange={set("contactName")} className={inputCls} />
                        </div>
                        <div>
                          <FieldLabel htmlFor="rs-title">Job title</FieldLabel>
                          <Input id="rs-title" placeholder="e.g. Director of Nursing" autoComplete="organization-title" value={form.jobTitle} onChange={set("jobTitle")} className={inputCls} />
                        </div>
                        <div>
                          <FieldLabel htmlFor="rs-email" required>Work email</FieldLabel>
                          <Input id="rs-email" type="email" required autoComplete="email" value={form.email} onChange={set("email")} className={inputCls} />
                        </div>
                        <div>
                          <FieldLabel htmlFor="rs-phone" required>Phone</FieldLabel>
                          <Input id="rs-phone" type="tel" required autoComplete="tel" value={form.phone} onChange={set("phone")} className={inputCls} />
                        </div>
                      </div>
                      <div>
                        <FieldLabel htmlFor="rs-notes">Anything else we should know?</FieldLabel>
                        <Textarea id="rs-notes" rows={4} maxLength={3000} placeholder="Unit, special skills (e.g. dementia care, IV certified), parking, orientation…" value={form.notes} onChange={set("notes")} className="font-sans rounded-xl border-border resize-none focus-visible:ring-[#2a66b0]/30" />
                      </div>
                    </fieldset>

                    <div>
                      <button type="submit" disabled={submitting}
                        className="w-full inline-flex items-center justify-center gap-2 font-semibold text-base px-8 py-4 rounded-full transition-all hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                        style={GRADIENT_BTN}>
                        {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <><Send className="h-4 w-4" /> Send Staffing Request</>}
                      </button>
                      <p className="text-xs text-center text-gray-500 mt-3">
                        We'll only use your details to respond to this request. See our{" "}
                        <Link to="/privacy-policy" className="underline hover:text-[#2a66b0]">Privacy Policy</Link>.
                      </p>
                    </div>
                  </form>
              </div>
            </AnimatedSection>

            {/* Sidebar */}
            <aside className="space-y-5 lg:sticky lg:top-32">
              <div className="relative rounded-3xl p-7 overflow-hidden text-white" style={{ background: BRAND_GRADIENT }}>
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-1/2 translate-x-1/3" style={{ background: "rgba(255,255,255,0.10)" }} />
                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/75 mb-2">Urgent shift?</p>
                  <p className="text-xl font-bold mb-2 leading-snug">Call our staffing line</p>
                  <p className="text-white/75 text-sm mb-5">Available 24/7 for same-day and next-day coverage requests.</p>
                  <a href={`tel:+1${tel}`} className="flex items-center justify-center gap-2 font-bold text-sm px-5 py-3 rounded-full shadow-lg transition-all hover:scale-[1.03]" style={{ background: "#fff", color: "#1d4f8c" }}>
                    <Phone className="h-4 w-4" /> {phone}
                  </a>
                </div>
              </div>
              <div className="bg-card border border-border rounded-3xl p-7 shadow-sm">
                <p className="text-xs font-semibold text-[#0891b2] uppercase tracking-widest mb-5">What happens next</p>
                <ol className="space-y-5">
                  {PROCESS.slice(1).map(({ icon: I, title, text }) => (
                    <li key={title} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#2a66b0]/10 flex items-center justify-center shrink-0">
                        <I className="w-5 h-5 text-[#2a66b0]" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{title}</p>
                        <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              <Link to="/facility-staffing#faq" className="flex items-center justify-between gap-3 bg-card border border-border rounded-2xl px-5 py-4 shadow-sm hover:border-[#2a66b0]/30 hover:shadow-md transition-all text-sm font-semibold text-gray-700">
                Partner FAQ <ArrowRight className="h-4 w-4 text-[#2a66b0]" />
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

/* ════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════ */

const STAFFING_SCHEMA_ID = "staffing-schema";

const FacilityStaffing = () => {
  const { pathname, hash } = useLocation();
  const { contactInfo } = useAdmin();
  const tel = contactInfo.phone.replace(/[^\d+]/g, "");
  const phone = contactInfo.phone;

  // App scrolls to the top on every route change; then jump to #faq / #cna etc. if the link had one.
  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" }), 450);
    return () => clearTimeout(t);
  }, [pathname, hash]);

  // Service + FAQPage structured data on the overview (replaces the prerendered copy).
  useEffect(() => {
    document.getElementById(STAFFING_SCHEMA_ID)?.remove();
    if (pathname !== "/facility-staffing") return;
    const url = "https://mintexcare.com/facility-staffing";
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = STAFFING_SCHEMA_ID;
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "@id": `${url}#service`,
          "name": "Healthcare Facility Staffing",
          "serviceType": "Healthcare staffing (HHA, CNA, LPN, RN)",
          "description": "Screened home health aides, CNAs, LPNs and RNs for skilled nursing, assisted living, rehab and long-term care facilities in New Jersey.",
          "url": url,
          "provider": { "@id": "https://mintexcare.com/#organization" },
          "areaServed": { "@type": "State", "name": "New Jersey" },
          "audience": { "@type": "BusinessAudience", "audienceType": "Healthcare facilities" },
        },
        {
          "@type": "FAQPage",
          "@id": `${url}#faq`,
          "mainEntity": STAFFING_FAQS.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })),
        },
      ],
    });
    document.head.appendChild(script);
    return () => { document.getElementById(STAFFING_SCHEMA_ID)?.remove(); };
  }, [pathname]);

  return (
    <>
      <Header />
      <main className="bg-background overflow-x-clip">
        {pathname === "/facility-staffing/roles" ? <Roles tel={tel} phone={phone} />
          : pathname === REQUEST_PATH ? <RequestStaff tel={tel} phone={phone} />
          : <Overview tel={tel} phone={phone} />}
      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
      <AccessibilityButton />
    </>
  );
};

export default FacilityStaffing;
