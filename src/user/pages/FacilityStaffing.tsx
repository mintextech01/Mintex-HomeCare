import PhotoFacts from "@/components/PhotoFacts";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState, type ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import AccessibilityButton from "@/components/AccessibilityButton";
import AnimatedSection from "@/components/AnimatedSection";
import { FeatureIcon } from "@/components/Feature";
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
  <div className={`el-eyebrow mb-3`}>{children}</div>
);

const Pill = ({ icon: Icon, children, onSurface = false }: { icon?: typeof Building2; children: ReactNode; onSurface?: boolean }) => (
  <div className={`el-eyebrow mb-3`}>
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
          ? <Link to={c.to} className="transition-colors">{c.label}</Link>
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
  <section className="py-12 md:py-16">
    <div className="container mx-auto px-6 md:px-10">
      <AnimatedSection>
        <div className="rounded-[28px] bg-accent px-6 py-12 sm:px-10 sm:py-16 md:px-16 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="el-eyebrow mb-3">
              <Handshake className="w-3.5 h-3.5 text-primary" />
              Partner with MintexCare
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-accent-foreground leading-snug mb-3">{title}</h2>
            <p className="text-accent-foreground/75 text-sm md:text-base leading-relaxed mb-9">{text}</p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <Link to={REQUEST_PATH} className="el-btn-primary">
                Request Staff <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={`tel:+1${tel}`} className="el-btn bg-background text-foreground">
                <Phone className="h-4 w-4" /> Call {phone}
              </a>
              <a href={`https://wa.me/1${tel}`} target="_blank" rel="noopener noreferrer"
                className="el-btn bg-background text-foreground">
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
        className="group h-full flex flex-col rounded-[20px] bg-background p-7 transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4">
        {/* Icon left, role code as a small tag on the right, vertically centred with the icon. */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <FeatureIcon icon={Icon} />
          <span className="rounded-full bg-accent px-3.5 py-1 text-sm font-bold text-primary">{role.code}</span>
        </div>
        <h3 className="font-bold text-foreground text-lg leading-snug mb-2">{role.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">{role.summary}</p>
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors mt-6">
          View role <ArrowRight className="h-4 w-4 transition-transform" />
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
      <section className="pt-32 md:pt-40 pb-12 md:pb-14">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-[1.1fr_1fr] 2xl:grid-cols-[minmax(0,680px)_minmax(0,1fr)] gap-12 xl:gap-16 items-center">
            <AnimatedSection>
              <Breadcrumb trail={[{ label: "Home", to: "/" }, { label: "Facility Staffing" }]} />
              <Pill icon={Building2}>Facility staffing</Pill>
              <h1 className="font-bold text-foreground leading-[1.07] mb-6" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)" }}>
                Reliable staffing for{" "}<br />
                NJ care facilities
              </h1>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-[560px]">
                Short-staffed? MintexCare provides screened home health aides, CNAs, LPNs and RNs to skilled nursing,
                assisted living, rehab and long-term care facilities across New Jersey, from a single shift to long-term placements.
              </p>
              <div className="flex flex-wrap gap-3 mb-9">
                <Link to={REQUEST_PATH} className="el-btn-primary group">
                  Request Staff <ArrowRight className="h-4 w-4 transition-transform" />
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

            <AnimatedSection delay={0.1} className="relative max-w-[520px] 2xl:max-w-none w-full mx-auto lg:mx-0 lg:justify-self-end">
              <div>
                <div className="relative rounded-[28px] overflow-hidden aspect-[4/4.2] 2xl:aspect-auto 2xl:h-[560px]">
                  {hasPhoto ? (
                    <img src={photo} alt="MintexCare nurse staffing a care facility" className="w-full h-full object-cover" loading="eager" />
                  ) : (
                    <div className="w-full h-full relative flex items-center justify-center bg-accent">
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
                </div>
              </div>
              <PhotoFacts facts={[
                { icon: CalendarDays, title: "Per diem to long-term", text: "Flexible coverage" },
                { icon: BadgeCheck, title: "Credentials verified", text: "Before every placement" },
              ]} />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="pb-12 md:pb-14">
        <div className="container mx-auto px-6 md:px-10">
          <AnimatedSection>
            <div className="text-center mb-10">
              <Eyebrow>Who we serve</Eyebrow>
              <h2 className="text-3xl md:text-[2.625rem] font-bold text-foreground leading-tight">Facilities we staff</h2>
            </div>
            <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-x-8 gap-y-10">
              {FACILITIES.map(({ icon: I, label }) => (
                <li key={label} className="flex flex-col items-center text-center">
                  <FeatureIcon icon={I} className="mb-5" />
                  <p className="text-lg font-bold text-foreground leading-snug max-w-[12rem]">{label}</p>
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </section>

      {/* ROLES */}
      <section className="py-14 md:py-20 bg-surface">
        <div className="container mx-auto px-6 md:px-10">
          <AnimatedSection className="text-center mb-10">
            <Eyebrow onSurface>Roles we staff</Eyebrow>
            <h2 className="text-3xl md:text-[2.625rem] font-bold text-foreground mb-3 leading-tight">Aides &amp; nurses</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">Qualified staff for every level of care on your floor</p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STAFFING_ROLES.map((r, i) => <RoleCard key={r.code} role={r} i={i} />)}
          </div>
        </div>
      </section>

      {/* STAFFING OPTIONS */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-6 md:px-10">
          <AnimatedSection className="text-center mb-10">
            <Eyebrow>Staffing options</Eyebrow>
            <h2 className="text-3xl md:text-[2.625rem] font-bold text-foreground mb-3 leading-tight">Per diem, short-term or long-term</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">One shift, a few months or long term: tell us what your team needs</p>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-5">
            {OPTIONS.map(({ icon: I, title, text }, i) => (
              <AnimatedSection key={title} delay={i * 0.06} className="h-full">
                <div className="h-full el-card p-7 md:p-8">
                  <FeatureIcon icon={I} className="mb-8" />
                  <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS + SCREENING */}
      <section className="py-14 md:py-20 bg-surface">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 xl:gap-14 items-start">
            <AnimatedSection>
              <Pill onSurface>How it works</Pill>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-10">
                How facility staffing works
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {PROCESS.map(({ icon: I, title, text }, i) => (
                  <div key={title} className="bg-background rounded-[20px] p-6">
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <FeatureIcon icon={I} size="md" />
                      <span className="rounded-full bg-accent px-3.5 py-1 text-sm font-bold text-primary">Step {i + 1}</span>
                    </div>
                    <p className="font-bold text-foreground mb-1">{title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="lg:sticky lg:top-32">
              <div className="rounded-[28px] p-8 bg-foreground text-background">
                <FeatureIcon icon={ShieldCheck} size="md" onDark className="mb-6" />
                <h3 className="text-xl font-bold mb-6 leading-snug">Every placement is screened</h3>
                <ul className="space-y-4 mb-8">
                  {SCREENING.map(({ icon: I, text }) => (
                    <li key={text} className="flex items-start gap-3 text-base text-background/85">
                      <I className="w-4 h-4 mt-0.5 shrink-0" />{text}
                    </li>
                  ))}
                </ul>
                <Link to={REQUEST_PATH} className="el-btn bg-accent text-accent-foreground w-full">
                  Request Staff <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* PARTNER FAQ */}
      <section id="faq" className="py-14 md:py-20 scroll-mt-28">
        <div className="container mx-auto px-6 md:px-10 max-w-4xl">
          <AnimatedSection className="text-center mb-12">
            <Eyebrow>Partner FAQ</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">Facility staffing FAQ</h2>
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
    <section className="pt-32 md:pt-40 pb-10 md:pb-12">
      <div className="container mx-auto px-6 md:px-10">
        <AnimatedSection className="max-w-3xl">
          <Breadcrumb trail={[{ label: "Home", to: "/" }, { label: "Facility Staffing", to: "/facility-staffing" }, { label: "Roles" }]} />
          <Pill icon={Users}>Roles we staff</Pill>
          <h1 className="font-bold text-foreground leading-[1.07] mb-6" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)" }}>
            HHA, CNA, LPN &amp; RN{" "}<br />staffing
          </h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-[620px]">
            See what each role covers, the settings we staff and the credentials we verify, then request the staff you need.
          </p>
          <div className="flex flex-wrap gap-3">
            {STAFFING_ROLES.map(r => (
              <a key={r.code} href={`#${r.code.toLowerCase()}`}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-foreground bg-background border border-border transition-colors">
                <r.icon className="h-4 w-4" /> {r.code}
              </a>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>

    <section className="py-12 md:py-16 bg-surface">
      <div className="container mx-auto px-6 md:px-10 space-y-5">
        {STAFFING_ROLES.map((r) => {
          const Icon = r.icon;
          return (
            <AnimatedSection key={r.code}>
              <article id={r.code.toLowerCase()} className="scroll-mt-32 bg-background rounded-[28px] overflow-hidden grid lg:grid-cols-[360px_1fr] p-3 gap-3">
                <div className="rounded-[20px] p-7 md:p-9 bg-foreground text-background">
                  <FeatureIcon icon={Icon} onDark className="mb-6" />
                  <p className="text-5xl font-extrabold leading-none mb-2">{r.code}</p>
                  <h2 className="text-xl font-bold mb-4">{r.title}</h2>
                  <p className="text-background/70 text-sm leading-relaxed mb-7">{r.summary}</p>
                  <Link to={`${REQUEST_PATH}?role=${r.code}`} className="el-btn bg-accent text-accent-foreground">
                    Request {r.code}s <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="p-5 md:p-7 grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-4">Typical duties</p>
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
                      <p className="text-sm font-semibold text-muted-foreground mb-4">Settings</p>
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
                          <p className="text-sm font-semibold text-foreground mb-1">Credential verified</p>
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
  <label htmlFor={htmlFor} className="block text-sm font-semibold text-foreground/70 mb-1.5">
    {children}{required && <span className="text-primary"> *</span>}
  </label>
);

const TogglePill = ({ checked, onChange, children }: { checked: boolean; onChange: () => void; children: ReactNode }) => (
  <label className={`cursor-pointer select-none inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold border transition-colors focus-within:ring-2 focus-within:ring-ring/40 ${
    checked ? "bg-foreground text-background border-foreground" : "text-foreground/75 bg-background border-border"
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
            <Pill icon={ClipboardCheck}>For facilities</Pill>
            <h1 className="font-bold text-foreground leading-[1.07] mb-6" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)" }}>
              Request facility staff
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-[620px]">
              Tell us about the shifts you need to cover. Our staffing team will follow up to confirm availability, rates and next steps.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
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
                        <Link to="/privacy-policy" className="underline">Privacy Policy</Link>.
                      </p>
                    </div>
                  </form>
              </div>
            </AnimatedSection>

            {/* Sidebar */}
            <aside className="space-y-4 lg:sticky lg:top-32">
              <div className="rounded-[28px] p-7 bg-foreground text-background">
                <p className="text-sm font-semibold text-background/60 mb-2">Urgent shift?</p>
                <p className="text-xl font-bold mb-2 leading-snug">Call our staffing line</p>
                <p className="text-background/70 text-sm mb-6">Available 24/7 for same-day and next-day coverage requests.</p>
                <a href={`tel:+1${tel}`} className="el-btn bg-accent text-accent-foreground w-full">
                  <Phone className="h-4 w-4" /> {phone}
                </a>
              </div>
              <div className="el-card rounded-[28px] p-7">
                <p className="text-sm font-semibold text-muted-foreground mb-5">What happens next</p>
                <ol className="space-y-5">
                  {PROCESS.slice(1).map(({ icon: I, title, text }) => (
                    <li key={title} className="flex gap-4">
                      <FeatureIcon icon={I} size="sm" className="shrink-0" />
                      <div>
                        <p className="font-bold text-foreground text-sm">{title}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              <Link to="/facility-staffing#faq" className="flex items-center justify-between gap-3 el-card rounded-2xl px-5 py-4 transition-colors text-sm font-semibold text-foreground">
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
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView(), 450);
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
