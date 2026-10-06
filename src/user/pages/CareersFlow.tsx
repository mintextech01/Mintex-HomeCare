import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, type ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import AccessibilityButton from "@/components/AccessibilityButton";
import AnimatedSection from "@/components/AnimatedSection";
import { JobsSection } from "@/components/jobs/JobsSection";
import { ApplicationForm, GENERAL_APPLICATION } from "@/components/careers/ApplicationForm";
import { benefitsData } from "@/components/benefits/BenefitsData";
import { useAdmin } from "@/contexts/AdminContext";
import { applyPageMeta } from "@/hooks/usePageTitle";
import { formatPay } from "@/types/job";
import { activeJobsWithSlugs, applyUrl, jobPostingSchema, jobUrl, positionToJob, ORIGINAL_POSTING_DATE } from "@/data/careers";
import {
  ArrowRight, Phone, Briefcase, MapPin, Clock, DollarSign, CalendarDays, CheckCircle2, FileText, PhoneCall,
  ClipboardCheck, Heart, Search, Sparkles, ChevronRight, Loader2, Users, Home,
} from "lucide-react";
import React from "react";

// /careers/jobs, /careers/jobs/{slug}, /careers/apply and /careers/thank-you share this chunk.

const GRADIENT_BTN = {
  background: "linear-gradient(135deg, hsl(214 66% 44%) 0%, hsl(192 91% 37%) 100%)",
  border: "1px solid rgba(255,255,255,0.3)",
  boxShadow: "0 2px 12px rgba(38,104,188,0.30), inset 0 1px 0 rgba(255,255,255,0.25)",
  color: "#fff",
};
const BRAND_GRADIENT = "linear-gradient(135deg, #1d4f8c 0%, #2a66b0 55%, #0891b2 100%)";
// White tints are inline styles: the dark theme overrides bg-white/* classes.
const WHITE_TINT = "rgba(255,255,255,0.15)";

const HIRING_STEPS = [
  { icon: FileText,       label: "Submit your application" },
  { icon: PhoneCall,      label: "Initial phone screen" },
  { icon: ClipboardCheck, label: "In-person interview" },
  { icon: Heart,          label: "Welcome to MintexCare" },
];

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

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

const Pill = ({ icon: Icon, children }: { icon: typeof Briefcase; children: ReactNode }) => (
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
    <div className="absolute top-[24%] right-[40%] w-28 h-28 rounded-full border-[3px] border-dashed border-[#0891b2]/[0.1] deco-spin-slow hidden lg:block" />
    <svg className="absolute bottom-0 left-0 w-full h-16 opacity-[0.06]" viewBox="0 0 1440 64" preserveAspectRatio="none">
      <path d="M0,32 C360,64 720,0 1080,32 C1260,48 1380,16 1440,32 L1440,64 L0,64 Z" fill="#2a66b0" />
    </svg>
  </div>
);

const HiringStepsCard = ({ tel, phone }: { tel: string; phone: string }) => (
  <div className="relative rounded-3xl p-7 overflow-hidden text-white" style={{ background: BRAND_GRADIENT }}>
    <div className="absolute top-0 right-0 w-40 h-40 rounded-full -translate-y-1/2 translate-x-1/3" style={{ background: "rgba(255,255,255,0.10)" }} />
    <div className="relative">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: WHITE_TINT }}>
        <Briefcase className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-xl font-bold mb-2 leading-snug">Our hiring process</h3>
      <div className="w-10 h-[3px] rounded-full mb-5" style={{ background: "rgba(255,255,255,0.5)" }} />
      <ol className="space-y-3.5 mb-7">
        {HIRING_STEPS.map(({ icon: I, label }, i) => (
          <li key={label} className="flex items-center gap-3 text-sm text-white/90">
            <span className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold" style={{ background: WHITE_TINT }}>{i + 1}</span>
            <I className="w-4 h-4 shrink-0" /> {label}
          </li>
        ))}
      </ol>
      <div className="pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.2)" }}>
        <p className="text-white/70 text-xs mb-1">Questions? Call our hiring team</p>
        <a href={`tel:+1${tel}`} className="text-lg font-bold hover:underline">{phone}</a>
      </div>
    </div>
  </div>
);

/* ════════════════════════════════════════════
   /careers/jobs — Open Positions
   ════════════════════════════════════════════ */

const OpenPositions = () => {
  const { jobPositions, jobsLoaded } = useAdmin();
  const count = jobPositions.filter(p => p.active).length;

  return (
    <>
      <section className="relative pt-32 md:pt-40 pb-14 md:pb-16 overflow-hidden">
        <HeroDeco />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <AnimatedSection className="max-w-3xl">
            <Breadcrumb trail={[{ label: "Home", to: "/" }, { label: "Careers", to: "/careers" }, { label: "Open Positions" }]} />
            <Pill icon={Briefcase}>Now Hiring</Pill>
            <h1 className="font-bold text-gray-900 leading-[1.07] mb-5" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)" }}>
              Caregiver &amp; Nursing<br /><span className="text-[#2a66b0]">Jobs in New Jersey</span>
            </h1>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-8 max-w-[600px]">
              Join a team that treats caregivers with respect. See our current openings for home health aides,
              CNAs, nurses and caregivers, and apply online in a few minutes.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 shadow-sm text-sm text-gray-700">
                <Briefcase className="h-4 w-4 text-[#2a66b0]" />
                {jobsLoaded ? <><strong className="text-gray-900">{count}</strong> open {count === 1 ? "position" : "positions"}</> : "Loading openings…"}
              </span>
              <span className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 shadow-sm text-sm text-gray-700">
                <MapPin className="h-4 w-4 text-[#2a66b0]" /> Edison office · Clients across NJ
              </span>
              <Link to="/careers/apply" className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-2.5 rounded-full transition-all hover:scale-105" style={GRADIENT_BTN}>
                Apply Online <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="border-t border-border">
        <JobsSection title="Current Openings" subtitle="Search by role or filter by schedule, then open a job to see the details" />
      </div>

      {/* Why join */}
      <section className="py-20 bg-[#f7f8f9] border-t border-border">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold text-[#0891b2] uppercase tracking-widest mb-2">Why MintexCare</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What you can expect</h2>
            </div>
            <Link to="/careers" className="inline-flex items-center gap-2 text-sm font-semibold text-[#2a66b0] hover:gap-3 transition-all">
              Why work with us <ArrowRight className="h-4 w-4" />
            </Link>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefitsData.map(({ id, icon: I, title, description }, i) => (
              <AnimatedSection key={id} delay={Math.min(i, 4) * 0.05} className="h-full">
                <div className="h-full flex gap-4 bg-card border border-border rounded-2xl p-6 shadow-sm">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-md" style={{ background: BRAND_GRADIENT }}>
                    <I className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-1">{title}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

/* ════════════════════════════════════════════
   /careers/jobs/{slug} — Job Detail
   ════════════════════════════════════════════ */

const JOB_SCHEMA_ID = "job-schema";

const JobDetail = ({ tel, phone }: { tel: string; phone: string }) => {
  const { slug = "" } = useParams();
  const { jobPositions, jobsLoaded } = useAdmin();
  const jobs = useMemo(() => activeJobsWithSlugs(jobPositions), [jobPositions]);
  const match = jobs.find(j => j.slug === slug);
  const others = jobs.filter(j => j.slug !== slug).slice(0, 3);
  const canonical = `https://mintexcare.com${jobUrl(slug)}`;
  const crumbs = [
    { name: "Careers", url: "https://mintexcare.com/careers" },
    { name: "Open Positions", url: "https://mintexcare.com/careers/jobs" },
  ];

  // Tags + JobPosting come from live Admin data. A closed or unknown job is kept out of search results.
  useEffect(() => {
    document.getElementById(JOB_SCHEMA_ID)?.remove();
    if (!jobsLoaded) return;
    if (!match) {
      applyPageMeta({
        title: "Position No Longer Open | MintexCare Careers",
        description: "This position is no longer open. See current caregiver and nursing jobs at MintexCare.",
        canonical, crumb: "Position closed", parent: crumbs, noindex: true,
      });
      return;
    }
    const p = match.position;
    applyPageMeta({
      title: `${p.title} Job in New Jersey | MintexCare Careers`,
      description: `${p.description.slice(0, 150).trim()}${p.description.length > 150 ? "…" : ""}`,
      canonical, crumb: p.title, parent: crumbs,
    });
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = JOB_SCHEMA_ID;
    script.textContent = JSON.stringify(jobPostingSchema(p, match.slug));
    document.head.appendChild(script);
    return () => { document.getElementById(JOB_SCHEMA_ID)?.remove(); };
    // crumbs is static
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobsLoaded, match, canonical]);

  if (!jobsLoaded) {
    return (
      <section className="pt-40 pb-32 min-h-[70svh] flex items-center justify-center">
        <p className="flex items-center gap-3 text-gray-500"><Loader2 className="h-5 w-5 animate-spin text-[#2a66b0]" /> Loading job details…</p>
      </section>
    );
  }

  if (!match) {
    return (
      <section className="relative pt-32 md:pt-40 pb-24 overflow-hidden min-h-[70svh]">
        <HeroDeco />
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-3xl text-center">
          <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center bg-[#2a66b0]/10">
            <Search className="w-9 h-9 text-[#2a66b0]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">This position is no longer open</h1>
          <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
            It may have been filled or removed. Take a look at our current openings, or send a general application
            and we'll contact you when a matching role opens.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/careers/jobs" className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-full" style={GRADIENT_BTN}>
              See open positions <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to={applyUrl()} className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-full text-foreground hover:text-primary glass-btn">
              General application
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const p = match.position;
  const job = positionToJob(p);
  const pay = job.salaryRange ? formatPay(job.salaryRange) : null;
  const posted = formatDate(p.postedAt ?? ORIGINAL_POSTING_DATE);
  const facts = [
    { icon: Clock,        label: "Schedule", value: p.type },
    { icon: MapPin,       label: "Location", value: "Clients' homes across NJ · Edison office" },
    ...(pay ? [{ icon: DollarSign, label: "Pay", value: pay }] : []),
    { icon: CalendarDays, label: "Posted",   value: posted },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-20 overflow-hidden">
        <HeroDeco />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <AnimatedSection className="max-w-4xl">
            <Breadcrumb trail={[{ label: "Home", to: "/" }, { label: "Careers", to: "/careers" }, { label: "Open Positions", to: "/careers/jobs" }, { label: p.title }]} />
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 rounded-full px-3.5 py-1.5 text-xs font-semibold text-[#2a66b0]">
                <Clock className="h-3.5 w-3.5" /> {p.type}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-cyan-50 border border-cyan-100 rounded-full px-3.5 py-1.5 text-xs font-semibold text-[#0891b2]">
                <MapPin className="h-3.5 w-3.5" /> New Jersey
              </span>
              {pay && (
                <span className="inline-flex items-center gap-1.5 bg-card border border-border rounded-full px-3.5 py-1.5 text-xs font-semibold text-gray-700">
                  <DollarSign className="h-3.5 w-3.5 text-[#2a66b0]" /> {pay}
                </span>
              )}
            </div>
            <h1 className="font-bold text-gray-900 leading-[1.08] mb-4" style={{ fontSize: "clamp(2.1rem, 4.6vw, 3.3rem)" }}>{p.title}</h1>
            <p className="text-gray-500 mb-8">MintexCare · Posted {posted}</p>
            <div className="flex flex-wrap gap-3">
              <Link to={applyUrl(match.slug)} className="inline-flex items-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-full transition-all hover:scale-105" style={GRADIENT_BTN}>
                Apply for this job <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={`tel:+1${tel}`} className="inline-flex items-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-full text-foreground hover:text-primary transition-all glass-btn">
                <Phone className="h-4 w-4" /> Call {phone}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* BODY */}
      <section className="py-14 md:py-20 bg-[#f7f8f9] border-t border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-[1fr_360px] gap-8 xl:gap-12 items-start">
            <div className="space-y-6 min-w-0">
              <AnimatedSection>
                <article className="bg-card border border-border rounded-3xl p-6 md:p-9 shadow-sm">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">About the role</h2>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">{p.description}</p>
                </article>
              </AnimatedSection>
              <AnimatedSection>
                <article className="bg-card border border-border rounded-3xl p-6 md:p-9 shadow-sm">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-5">Requirements</h2>
                  <ul className="space-y-3">
                    {job.requirements.map(r => (
                      <li key={r} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                        <CheckCircle2 className="h-5 w-5 text-[#0891b2] shrink-0 mt-0.5" /> {r}
                      </li>
                    ))}
                  </ul>
                </article>
              </AnimatedSection>
              <AnimatedSection>
                <article className="bg-card border border-border rounded-3xl p-6 md:p-9 shadow-sm">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Why work at MintexCare</h2>
                  <div className="grid sm:grid-cols-2 gap-5">
                    {benefitsData.map(({ id, icon: I, title, description }) => (
                      <div key={id} className="flex gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#2a66b0]/10 flex items-center justify-center shrink-0">
                          <I className="w-5 h-5 text-[#2a66b0]" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{title}</p>
                          <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              </AnimatedSection>
            </div>

            {/* Sticky summary */}
            <aside className="space-y-5 lg:sticky lg:top-32">
              <div className="bg-card border border-border rounded-3xl shadow-lg overflow-hidden">
                <div className="h-1.5" style={{ background: "linear-gradient(90deg, #2a66b0, #0891b2)" }} />
                <div className="p-6">
                  <p className="text-xs font-semibold text-[#0891b2] uppercase tracking-widest mb-1">Job summary</p>
                  <p className="text-lg font-bold text-gray-900 mb-5 leading-snug">{p.title}</p>
                  <dl className="space-y-4 mb-6">
                    {facts.map(({ icon: I, label, value }) => (
                      <div key={label} className="flex gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#2a66b0]/10 flex items-center justify-center shrink-0">
                          <I className="w-4 h-4 text-[#2a66b0]" />
                        </div>
                        <div>
                          <dt className="text-[11px] uppercase tracking-widest text-gray-400">{label}</dt>
                          <dd className="text-sm font-semibold text-gray-800">{value}</dd>
                        </div>
                      </div>
                    ))}
                  </dl>
                  <Link to={applyUrl(match.slug)} className="flex items-center justify-center gap-2 font-bold text-sm px-6 py-3.5 rounded-full transition-all hover:scale-[1.02]" style={GRADIENT_BTN}>
                    Apply for this job <ArrowRight className="h-4 w-4" />
                  </Link>
                  <p className="text-center text-xs text-gray-500 mt-3">Takes a few minutes · resume optional</p>
                </div>
              </div>
              <HiringStepsCard tel={tel} phone={phone} />
            </aside>
          </div>
        </div>
      </section>

      {/* OTHER OPENINGS */}
      {others.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Other open positions</h2>
              <Link to="/careers/jobs" className="inline-flex items-center gap-2 text-sm font-semibold text-[#2a66b0] hover:gap-3 transition-all">
                All open positions <ArrowRight className="h-4 w-4" />
              </Link>
            </AnimatedSection>
            <div className="grid md:grid-cols-3 gap-5">
              {others.map(({ position: o, slug: s }, i) => (
                <AnimatedSection key={s} delay={i * 0.06} className="h-full">
                  <Link to={jobUrl(s)} className="group h-full flex flex-col bg-card border border-border rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#2a66b0]/25 transition-all">
                    <span className="text-xs font-semibold text-[#0891b2] mb-2">{o.type}</span>
                    <span className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#2a66b0] transition-colors">{o.title}</span>
                    <span className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1">{o.description}</span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2a66b0] mt-4">
                      View job <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

/* ════════════════════════════════════════════
   /careers/apply — Apply Online
   ════════════════════════════════════════════ */

const Apply = ({ tel, phone }: { tel: string; phone: string }) => {
  const [params] = useSearchParams();
  const { jobPositions, jobsLoaded } = useAdmin();
  const slug = params.get("position") ?? "";
  const preset = activeJobsWithSlugs(jobPositions).find(j => j.slug === slug)?.position.title ?? "";

  return (
    <>
      <section className="relative pt-32 md:pt-40 pb-12 overflow-hidden">
        <HeroDeco />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <AnimatedSection className="max-w-3xl">
            <Breadcrumb trail={[{ label: "Home", to: "/" }, { label: "Careers", to: "/careers" }, { label: "Apply Online" }]} />
            <Pill icon={FileText}>Apply Online</Pill>
            <h1 className="font-bold text-gray-900 leading-[1.07] mb-5" style={{ fontSize: "clamp(2.3rem, 5vw, 3.5rem)" }}>
              Join the <span className="text-[#2a66b0]">MintexCare Team</span>
            </h1>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-[600px]">
              {preset
                ? <>You're applying for <strong className="text-gray-900">{preset}</strong>. It takes a few minutes, and a resume is optional.</>
                : "Choose a position, or send a general application. It takes a few minutes, and a resume is optional."}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start max-w-6xl mx-auto">
            <AnimatedSection>
              <div className="bg-card rounded-3xl shadow-2xl shadow-primary/5 border border-border overflow-hidden">
                <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg, #2a66b0, #0891b2)" }} />
                <div className="p-6 sm:p-8 md:p-10">
                  <p className="text-xs font-semibold text-[#0891b2] uppercase tracking-[0.22em] mb-2">Application form</p>
                  <h2 className="text-2xl font-bold text-gray-900 mb-7">Tell us about yourself</h2>
                  {/* Wait for the live job list so a ?position= link selects the right job. */}
                  {jobsLoaded
                    ? <ApplicationForm key={preset} initialPosition={preset} idPrefix="apply" />
                    : <p className="flex items-center gap-3 text-gray-500 py-10"><Loader2 className="h-5 w-5 animate-spin text-[#2a66b0]" /> Loading positions…</p>}
                </div>
              </div>
            </AnimatedSection>
            <aside className="space-y-5 lg:sticky lg:top-32">
              <HiringStepsCard tel={tel} phone={phone} />
              <Link to="/careers/jobs" className="flex items-center justify-between gap-3 bg-card border border-border rounded-2xl px-5 py-4 shadow-sm hover:border-[#2a66b0]/30 hover:shadow-md transition-all text-sm font-semibold text-gray-700">
                <span className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-[#2a66b0]" /> See all open positions</span>
                <ArrowRight className="h-4 w-4 text-[#2a66b0]" />
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

/* ════════════════════════════════════════════
   /careers/thank-you — Application received
   ════════════════════════════════════════════ */

const Thanks = ({ tel, phone }: { tel: string; phone: string }) => {
  const { state } = useLocation() as { state: { name?: string; position?: string } | null };
  const position = state?.position && state.position !== GENERAL_APPLICATION ? state.position : null;

  return (
    <section className="relative pt-32 md:pt-40 pb-24 overflow-hidden min-h-[80svh]">
      <HeroDeco />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection className="max-w-2xl mx-auto">
          <div className="bg-card border border-border rounded-3xl shadow-2xl shadow-primary/10 overflow-hidden text-center">
            <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg, #2a66b0, #0891b2)" }} />
            <div className="px-6 sm:px-12 py-12 sm:py-14">
              <div className="relative w-24 h-24 mx-auto mb-7">
                <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: BRAND_GRADIENT }} />
                <div className="relative w-24 h-24 rounded-full flex items-center justify-center shadow-xl" style={{ background: BRAND_GRADIENT }}>
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
                <Sparkles className="absolute -top-1 -right-3 w-6 h-6 text-[#0891b2]" />
              </div>
              <p className="text-xs font-semibold text-[#0891b2] uppercase tracking-widest mb-2">Thank you{state?.name ? `, ${state.name}` : ""}</p>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Application received</h1>
              <p className="text-gray-500 leading-relaxed mb-8 max-w-md mx-auto">
                {position ? <>Thanks for applying for <strong className="text-gray-800">{position}</strong>. </> : "Thanks for applying. "}
                Our hiring team reviews every application and responds within 3–5 business days.
              </p>

              <div className="text-left rounded-2xl border border-border bg-muted/40 p-5 sm:p-6 mb-8">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">What happens next</p>
                <ol className="grid sm:grid-cols-3 gap-4">
                  {HIRING_STEPS.slice(1).map(({ icon: I, label }, i) => (
                    <li key={label} className="flex sm:flex-col items-center sm:items-start gap-3">
                      <span className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-md" style={{ background: BRAND_GRADIENT }}>
                        <I className="w-5 h-5 text-white" />
                      </span>
                      <span className="text-sm font-semibold text-gray-800"><span className="text-[#2a66b0]">{i + 1}.</span> {label}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/careers/jobs" className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-full" style={GRADIENT_BTN}>
                  <Users className="h-4 w-4" /> See other openings
                </Link>
                <Link to="/" className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-full text-foreground hover:text-primary glass-btn">
                  <Home className="h-4 w-4" /> Back to home
                </Link>
              </div>
              <p className="text-sm text-gray-500 mt-8">
                Questions about your application? Call <a href={`tel:+1${tel}`} className="font-semibold text-[#2a66b0]">{phone}</a>.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════ */

const CareersFlow = () => {
  const { pathname } = useLocation();
  const { contactInfo } = useAdmin();
  const tel = contactInfo.phone.replace(/[^\d+]/g, "");
  const phone = contactInfo.phone;

  return (
    <>
      <Header />
      <main className="bg-background overflow-x-clip">
        {pathname === "/careers/jobs" ? <OpenPositions />
          : pathname === "/careers/apply" ? <Apply tel={tel} phone={phone} />
          : pathname === "/careers/thank-you" ? <Thanks tel={tel} phone={phone} />
          : <JobDetail tel={tel} phone={phone} />}
      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
      <AccessibilityButton />
    </>
  );
};

export default CareersFlow;
