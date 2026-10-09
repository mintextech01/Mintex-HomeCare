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
  ArrowRight, Phone, MessageCircle, Check, CheckCircle2, ShieldCheck, Clock, Building2, Users, CalendarDays,
  CalendarClock, CalendarRange, BadgeCheck, FileSearch, HeartPulse, Brain, Home, Activity, Hospital,
  ChevronDown, Send, Loader2, ClipboardCheck, Handshake, UserCheck,
} from "lucide-react";
import React from "react";

// /facility-staffing, /facility-staffing/roles and /facility-staffing/request-staff share this chunk.

const REQUEST_PATH = "/facility-staffing/request-staff";

/* ════════════════════════════════════════════
   SHARED PIECES
   ════════════════════════════════════════════ */

const Eyebrow = ({ children, onSurface = false }: { children: ReactNode; onSurface?: boolean }) => (
  <div className={`el-eyebrow mb-5 ${onSurface ? "bg-background" : ""}`}>{children}</div>
);

const Pill = ({ icon: Icon, children, onSurface = false }: { icon?: typeof Building2; children: ReactNode; onSurface?: boolean }) => (
  <div className={`el-eyebrow mb-6 ${onSurface ? "bg-background" : ""}`}>
    {Icon && <Icon className="w-3.5 h-3.5 text-primary" />}
    {children}
  </div>
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

const CallButton = ({ tel, phone }: { tel: string; phone: string }) => (
  <a href={`tel:+1${tel}`} className="el-btn-soft">
    <Phone className="h-4 w-4" /> Call {phone}
  </a>
);

const CtaBanner = ({ tel, phone, title, text }: { tel: string; phone: string; title: string; text: string }) => (
  <section className="py-16 md:py-20">
    <div className="container mx-auto px-6 md:px-10">
      <AnimatedSection>
        <div className="rounded-[32px] bg-accent px-6 py-12 sm:px-10 sm:py-16 md:px-16 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="el-eyebrow bg-background border-transparent mb-5">
              <Handshake className="w-3.5 h-3.5 text-primary" />
              Partner With MintexCare
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-accent-foreground leading-snug mb-4">{title}</h2>
            <p className="text-accent-foreground/75 text-sm md:text-base leading-relaxed mb-9">{text}</p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <Link to={REQUEST_PATH} className="el-btn-primary">
                Request Staff <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={`tel:+1${tel}`} className="el-btn bg-background text-foreground hover:bg-background/80">
                <Phone className="h-4 w-4" /> Call {phone}
              </a>
              <a href={`https://wa.me/1${tel}`} target="_blank" rel="noopener noreferrer"
                className="el-btn bg-background text-foreground hover:bg-background/80">
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
  const Icon = role.icon;
  return (
    <AnimatedSection delay={i * 0.06} className="h-full">
      <Link to={`/facility-staffing/roles#${role.code.toLowerCase()}`}
        className="group h-full flex flex-col rounded-[24px] bg-background p-7 transition-shadow duration-300 hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4">
        <div className="flex items-start justify-between mb-7">
          <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center transition-colors duration-300 group-hover:bg-foreground">
            <Icon className="w-6 h-6 text-accent-foreground transition-colors duration-300 group-hover:text-background" />
          </div>
          <p className="text-2xl font-extrabold text-foreground">{role.code}</p>
        </div>
        <h3 className="font-bold text-foreground text-lg leading-snug mb-2">{role.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">{role.summary}</p>
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-primary transition-colors mt-6">
          View role <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </span>
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
      <section className="pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 xl:gap-16 items-center">
            <AnimatedSection>
              <Breadcrumb trail={[{ label: "Home", to: "/" }, { label: "Facility Staffing" }]} />
              <Pill icon={Building2}>Facility Staffing</Pill>
              <h1 className="font-bold text-foreground leading-[1.07] mb-6" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)" }}>
                Reliable Staffing for<br />
                <span className="text-primary">NJ Care Facilities</span>
              </h1>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-[560px]">
                Short-staffed? MintexCare provides screened home health aides, CNAs, LPNs and RNs to skilled nursing,
                assisted living, rehab and long-term care facilities across New Jersey, from a single shift to long-term placements.
              </p>
              <div className="flex flex-wrap gap-3 mb-9">
                <Link to={REQUEST_PATH} className="el-btn-primary group">
                  Request Staff <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <CallButton tel={tel} phone={phone} />
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                {[
                  { icon: ShieldCheck, label: "Screened & verified staff" },
                  { icon: Users,       label: "HHA · CNA · LPN · RN" },
                  { icon: Clock,       label: "Available 24/7" },
                ].map(({ icon: I, label }) => (
                  <div key={label} className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
                    <I className="w-4 h-4 text-primary" /><span>{label}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="relative max-w-[520px] w-full mx-auto lg:mx-0 lg:justify-self-end">
              <div className="el-card p-3">
                <div className="relative rounded-[16px] overflow-hidden aspect-[4/4.2]">
                  {hasPhoto ? (
                    <img src={photo} alt="MintexCare nurse staffing a care facility" className="w-full h-full object-cover" loading="eager" />
                  ) : (
                    <div className="w-full h-full relative flex items-center justify-center bg-accent pb-16">
                      <div className="relative grid grid-cols-2 gap-3">
                        {STAFFING_ROLES.map(r => {
                          const I = r.icon;
                          return (
                            <div key={r.code} className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl flex flex-col items-center justify-center gap-1.5 bg-background shadow-lg">
                              <I className="w-8 h-8 text-foreground" strokeWidth={1.6} />
                              <span className="text-foreground font-bold text-sm tracking-wide">{r.code}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-background/95 px-5 py-4">
                    <p className="text-muted-foreground text-xs uppercase tracking-widest mb-1 font-semibold">MintexCare</p>
                    <p className="text-foreground font-bold text-lg leading-snug">Healthcare Staffing</p>
                  </div>
                </div>
              </div>
              <div className="el-chip absolute top-6 -left-2 sm:-left-8 z-10 px-4 py-3">
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shrink-0">
                  <CalendarDays className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground leading-none">Per diem to long-term</p>
                  <p className="text-xs text-muted-foreground mt-1">Flexible coverage</p>
                </div>
              </div>
              <div className="el-chip absolute top-28 -left-2 sm:-left-8 z-10 px-4 py-3 hidden sm:flex">
                <div className="w-10 h-10 rounded-xl bg-foreground flex items-center justify-center shrink-0">
                  <BadgeCheck className="w-5 h-5 text-background" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground leading-none">Credentials verified</p>
                  <p className="text-xs text-muted-foreground mt-1">Before every placement</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="pb-16 md:pb-20">
        <div className="container mx-auto px-6 md:px-10">
          <p className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-5">Facilities we staff</p>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
            {FACILITIES.map(({ icon: I, label }, i) => (
              <AnimatedSection key={label} delay={i * 0.04} className="h-full">
                <div className="el-card flex flex-col gap-4 px-5 py-5 h-full">
                  <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center shrink-0">
                    <I className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm font-semibold text-foreground leading-snug">{label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section className="py-20 md:py-28 bg-surface">
        <div className="container mx-auto px-6 md:px-10">
          <AnimatedSection className="text-center mb-14">
            <Eyebrow onSurface>Roles We Staff</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Aides &amp; <span className="text-primary">Nurses</span></h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">Qualified staff for every level of care on your floor</p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STAFFING_ROLES.map((r, i) => <RoleCard key={r.code} role={r} i={i} />)}
          </div>
        </div>
      </section>

      {/* STAFFING OPTIONS */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-10">
          <AnimatedSection className="text-center mb-14">
            <Eyebrow>Staffing Options</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Coverage That <span className="text-primary">Fits</span></h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">One shift, a few months or long term: tell us what your team needs</p>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-5">
            {OPTIONS.map(({ icon: I, title, text }, i) => (
              <AnimatedSection key={title} delay={i * 0.06} className="h-full">
                <div className="h-full el-card p-7 md:p-8">
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-accent">
                      <I className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <span className="text-4xl font-serif font-bold text-foreground/15 leading-none">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS + SCREENING */}
      <section className="py-20 md:py-28 bg-surface">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 xl:gap-14 items-start">
            <AnimatedSection>
              <Pill onSurface>How It Works</Pill>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-10">
                From request to <span className="text-primary">staff on the floor</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {PROCESS.map(({ icon: I, title, text }, i) => (
                  <div key={title} className="bg-background rounded-[24px] p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-accent">
                        <I className="w-5 h-5 text-accent-foreground" />
                      </div>
                      <span className="text-[11px] font-bold tracking-[0.15em] text-muted-foreground">STEP {i + 1}</span>
                    </div>
                    <p className="font-bold text-foreground mb-1">{title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="lg:sticky lg:top-32">
              <div className="rounded-[28px] p-8 bg-foreground text-background">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-accent">
                  <ShieldCheck className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-6 leading-snug">Every placement is screened</h3>
                <ul className="space-y-4 mb-8">
                  {SCREENING.map(({ icon: I, text }) => (
                    <li key={text} className="flex items-start gap-3 text-sm text-background/85">
                      <I className="w-4 h-4 mt-0.5 shrink-0" />{text}
                    </li>
                  ))}
                </ul>
                <Link to={REQUEST_PATH} className="el-btn bg-accent text-accent-foreground hover:bg-accent/80 w-full">
                  Request Staff <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* PARTNER FAQ */}
      <section id="faq" className="py-20 md:py-28 scroll-mt-28">
        <div className="container mx-auto px-6 md:px-10 max-w-4xl">
          <AnimatedSection className="text-center mb-12">
            <Eyebrow>Partner FAQ</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Questions from <span className="text-primary">facilities</span></h2>
          </AnimatedSection>
          <div className="space-y-3">
            {STAFFING_FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <AnimatedSection key={f.q} delay={Math.min(i, 4) * 0.04}>
                  <div className="el-card rounded-2xl">
                    <button type="button" onClick={() => setOpenFaq(open ? null : i)} aria-expanded={open} aria-controls={`sfaq-${i}`}
                      className="w-full flex items-center gap-4 text-left px-5 md:px-7 py-5">
                      <span className="flex-1 font-semibold text-foreground leading-snug">{f.q}</span>
                      <span className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${open ? "bg-foreground text-background" : "bg-background text-foreground"}`}>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
                      </span>
                    </button>
                    {/* Answer stays in the HTML when closed so search engines can read it. */}
                    <div id={`sfaq-${i}`} className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
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
    <section className="pt-32 md:pt-40 pb-14 md:pb-16">
      <div className="container mx-auto px-6 md:px-10">
        <AnimatedSection className="max-w-3xl">
          <Breadcrumb trail={[{ label: "Home", to: "/" }, { label: "Facility Staffing", to: "/facility-staffing" }, { label: "Roles" }]} />
          <Pill icon={Users}>Roles We Staff</Pill>
          <h1 className="font-bold text-foreground leading-[1.07] mb-6" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)" }}>
            HHA, CNA, LPN &amp; RN<br /><span className="text-primary">Staffing</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-[620px]">
            See what each role covers, the settings we staff and the credentials we verify, then request the staff you need.
          </p>
          <div className="flex flex-wrap gap-3">
            {STAFFING_ROLES.map(r => (
              <a key={r.code} href={`#${r.code.toLowerCase()}`}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-foreground bg-background border border-border hover:bg-foreground hover:text-background hover:border-foreground transition-colors">
                <r.icon className="h-4 w-4" /> {r.code}
              </a>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>

    <section className="py-16 md:py-20 bg-surface">
      <div className="container mx-auto px-6 md:px-10 space-y-5">
        {STAFFING_ROLES.map((r) => {
          const Icon = r.icon;
          return (
            <AnimatedSection key={r.code}>
              <article id={r.code.toLowerCase()} className="scroll-mt-32 bg-background rounded-[28px] overflow-hidden grid lg:grid-cols-[360px_1fr] p-3 gap-3">
                <div className="rounded-[22px] p-7 md:p-9 bg-foreground text-background">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-accent">
                    <Icon className="w-8 h-8 text-accent-foreground" />
                  </div>
                  <p className="text-5xl font-extrabold leading-none mb-2">{r.code}</p>
                  <h2 className="text-xl font-bold mb-4">{r.title}</h2>
                  <p className="text-background/70 text-sm leading-relaxed mb-7">{r.summary}</p>
                  <Link to={`${REQUEST_PATH}?role=${r.code}`} className="el-btn bg-accent text-accent-foreground hover:bg-accent/80">
                    Request {r.code}s <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="p-5 md:p-7 grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Typical duties</p>
                    <ul className="space-y-3">
                      {r.duties.map(d => (
                        <li key={d} className="flex items-start gap-3 text-foreground/85 leading-snug">
                          <span className="w-5 h-5 rounded-full bg-accent flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-accent-foreground" strokeWidth={3} />
                          </span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-7">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Settings</p>
                      <div className="flex flex-wrap gap-2">
                        {r.settings.map(s => (
                          <span key={s} className="text-sm text-foreground/85 bg-surface rounded-full px-3.5 py-1.5">{s}</span>
                        ))}
                      </div>
                    </div>
                    <div className="el-card p-5">
                      <div className="flex items-start gap-3">
                        <BadgeCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-foreground uppercase tracking-widest mb-1">Credential verified</p>
                          <p className="text-sm text-muted-foreground leading-snug">{r.credential}</p>
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
  <label htmlFor={htmlFor} className="block text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-1.5">
    {children}{required && <span className="text-primary"> *</span>}
  </label>
);

const TogglePill = ({ checked, onChange, children }: { checked: boolean; onChange: () => void; children: ReactNode }) => (
  <label className={`cursor-pointer select-none inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold border transition-colors focus-within:ring-2 focus-within:ring-ring/40 ${
    checked ? "bg-foreground text-background border-foreground" : "text-foreground/75 bg-background border-border hover:border-foreground/40 hover:text-foreground"
  }`}>
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

  const inputCls = "font-sans h-12 rounded-xl border-border bg-background";

  return (
    <>
      <section className="pt-32 md:pt-40 pb-12">
        <div className="container mx-auto px-6 md:px-10">
          <AnimatedSection className="max-w-3xl">
            <Breadcrumb trail={[{ label: "Home", to: "/" }, { label: "Facility Staffing", to: "/facility-staffing" }, { label: "Request Staff" }]} />
            <Pill icon={ClipboardCheck}>For Facilities</Pill>
            <h1 className="font-bold text-foreground leading-[1.07] mb-6" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)" }}>
              Request <span className="text-primary">Facility Staff</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-[620px]">
              Tell us about the shifts you need to cover. Our staffing team will follow up to confirm availability, rates and next steps.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-[1fr_340px] gap-5 lg:gap-8 items-start max-w-6xl mx-auto">

            {/* Form (a successful request goes to /thank-you) */}
            <AnimatedSection>
              <div className="el-card rounded-[28px]">
                  <form onSubmit={handleSubmit} className="relative p-6 sm:p-8 md:p-10 space-y-9" noValidate>
                    {spamGuard.honeypotField}

                    {/* Roles */}
                    <fieldset>
                      <legend className="text-lg font-bold text-foreground mb-1">What staff do you need?</legend>
                      <p className="text-sm text-muted-foreground mb-4">Choose one or more roles. <span className="text-primary">*</span></p>
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
                      <legend className="text-lg font-bold text-foreground mb-4">Shifts &amp; schedule</legend>
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
                            <SelectTrigger id="rs-duration" className="font-sans h-12 rounded-xl border-border bg-background"><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>{DURATIONS.map(d => <SelectItem key={d} value={d} className="font-sans">{d}</SelectItem>)}</SelectContent>
                          </Select>
                        </div>
                      </div>
                    </fieldset>

                    {/* Facility */}
                    <fieldset className="space-y-4">
                      <legend className="text-lg font-bold text-foreground mb-4">Your facility</legend>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <FieldLabel htmlFor="rs-facility" required>Facility name</FieldLabel>
                          <Input id="rs-facility" required autoComplete="organization" value={form.facilityName} onChange={set("facilityName")} className={inputCls} />
                        </div>
                        <div>
                          <FieldLabel htmlFor="rs-type">Facility type</FieldLabel>
                          <Select value={form.facilityType} onValueChange={v => setForm(f => ({ ...f, facilityType: v }))}>
                            <SelectTrigger id="rs-type" className="font-sans h-12 rounded-xl border-border bg-background"><SelectValue placeholder="Select facility type" /></SelectTrigger>
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
                      <legend className="text-lg font-bold text-foreground mb-4">Your contact details</legend>
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
                        <Textarea id="rs-notes" rows={4} maxLength={3000} placeholder="Unit, special skills (e.g. dementia care, IV certified), parking, orientation…" value={form.notes} onChange={set("notes")} className="font-sans rounded-xl border-border bg-background resize-none" />
                      </div>
                    </fieldset>

                    <div>
                      <button type="submit" disabled={submitting}
                        className="el-btn-primary w-full h-14 text-base disabled:opacity-70 disabled:cursor-not-allowed">
                        {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <><Send className="h-4 w-4" /> Send Staffing Request</>}
                      </button>
                      <p className="text-xs text-center text-muted-foreground mt-3">
                        We'll only use your details to respond to this request. See our{" "}
                        <Link to="/privacy-policy" className="underline hover:text-foreground">Privacy Policy</Link>.
                      </p>
                    </div>
                  </form>
              </div>
            </AnimatedSection>

            {/* Sidebar */}
            <aside className="space-y-4 lg:sticky lg:top-32">
              <div className="rounded-[28px] p-7 bg-foreground text-background">
                <p className="text-xs font-semibold uppercase tracking-widest text-background/60 mb-2">Urgent shift?</p>
                <p className="text-xl font-bold mb-2 leading-snug">Call our staffing line</p>
                <p className="text-background/70 text-sm mb-6">Available 24/7 for same-day and next-day coverage requests.</p>
                <a href={`tel:+1${tel}`} className="el-btn bg-accent text-accent-foreground hover:bg-accent/80 w-full">
                  <Phone className="h-4 w-4" /> {phone}
                </a>
              </div>
              <div className="el-card rounded-[28px] p-7">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-5">What happens next</p>
                <ol className="space-y-5">
                  {PROCESS.slice(1).map(({ icon: I, title, text }) => (
                    <li key={title} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center shrink-0">
                        <I className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground text-sm">{title}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              <Link to="/facility-staffing#faq" className="flex items-center justify-between gap-3 el-card rounded-2xl px-5 py-4 hover:bg-accent transition-colors text-sm font-semibold text-foreground">
                Partner FAQ <ArrowRight className="h-4 w-4" />
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
      <main className="theme-el overflow-x-clip">
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
