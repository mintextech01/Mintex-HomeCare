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
  ArrowRight, Phone, Briefcase, MapPin, Clock, DollarSign, CalendarDays, Check, FileText, PhoneCall,
  ClipboardCheck, Heart, Search, ChevronRight, Loader2, Users, Home,
} from "lucide-react";
import React from "react";

// /careers/jobs, /careers/jobs/{slug}, /careers/apply and /careers/thank-you share this chunk.

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

const Pill = ({ icon: Icon, children }: { icon: typeof Briefcase; children: ReactNode }) => (
  <div className="el-eyebrow mb-6">
    <Icon className="w-3.5 h-3.5 text-primary" />
    {children}
  </div>
);

const HiringStepsCard = ({ tel, phone }: { tel: string; phone: string }) => (
  <div className="rounded-[28px] p-7 bg-foreground text-background">
    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-accent">
      <Briefcase className="h-6 w-6 text-accent-foreground" />
    </div>
    <h3 className="text-xl font-bold mb-5 leading-snug">Our hiring process</h3>
    <ol className="space-y-3.5 mb-7">
      {HIRING_STEPS.map(({ icon: I, label }, i) => (
        <li key={label} className="flex items-center gap-3 text-sm text-background/85">
          <span className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold bg-background/15">{i + 1}</span>
          <I className="w-4 h-4 shrink-0" /> {label}
        </li>
      ))}
    </ol>
    <div className="pt-5 border-t border-background/15">
      <p className="text-background/60 text-xs mb-1">Questions? Call our hiring team</p>
      <a href={`tel:+1${tel}`} className="text-lg font-bold hover:underline">{phone}</a>
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
      <section className="pt-32 md:pt-40 pb-8 md:pb-10">
        <div className="container mx-auto px-6 md:px-10">
          <AnimatedSection className="max-w-3xl">
            <Breadcrumb trail={[{ label: "Home", to: "/" }, { label: "Careers", to: "/careers" }, { label: "Open Positions" }]} />
            <Pill icon={Briefcase}>Now Hiring</Pill>
            <h1 className="font-bold text-foreground leading-[1.07] mb-6" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)" }}>
              Caregiver &amp; Nursing<br /><span className="text-primary">Jobs in New Jersey</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-[600px]">
              Join a team that treats caregivers with respect. See our current openings for home health aides,
              CNAs, nurses and caregivers, and apply online in a few minutes.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 bg-surface rounded-full px-4 py-2.5 text-sm text-foreground/85">
                <Briefcase className="h-4 w-4 text-primary" />
                {jobsLoaded ? <><strong className="text-foreground">{count}</strong> open {count === 1 ? "position" : "positions"}</> : "Loading openings…"}
              </span>
              <span className="inline-flex items-center gap-2 bg-surface rounded-full px-4 py-2.5 text-sm text-foreground/85">
                <MapPin className="h-4 w-4 text-primary" /> Edison office · Clients across NJ
              </span>
              <Link to="/careers/apply" className="el-btn-primary h-11 group">
                Apply Online <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <JobsSection title="Current Openings" subtitle="Search by role or filter by schedule, then open a job to see the details" />

      {/* Why join */}
      <section className="py-20 md:py-24 bg-surface">
        <div className="container mx-auto px-6 md:px-10">
          <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="el-eyebrow bg-background mb-4">Why MintexCare</div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">What you can expect</h2>
            </div>
            <Link to="/careers" className="el-btn-outline group self-start md:self-auto">
              Why work with us <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {benefitsData.map(({ id, icon: I, title, description }, i) => (
              <AnimatedSection key={id} delay={Math.min(i, 4) * 0.05} className="h-full">
                <div className="h-full flex gap-4 bg-background rounded-[24px] p-6">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-accent">
                    <I className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground mb-1">{title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
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
        <p className="flex items-center gap-3 text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin text-primary" /> Loading job details…</p>
      </section>
    );
  }

  if (!match) {
    return (
      <section className="pt-32 md:pt-40 pb-24 min-h-[70svh]">
        <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center">
          <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center bg-accent">
            <Search className="w-9 h-9 text-accent-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">This position is no longer open</h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
            It may have been filled or removed. Take a look at our current openings, or send a general application
            and we'll contact you when a matching role opens.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/careers/jobs" className="el-btn-primary">
              See open positions <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to={applyUrl()} className="el-btn-soft">
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
      <section className="pt-32 md:pt-40 pb-14 md:pb-16">
        <div className="container mx-auto px-6 md:px-10">
          <AnimatedSection className="max-w-4xl">
            <Breadcrumb trail={[{ label: "Home", to: "/" }, { label: "Careers", to: "/careers" }, { label: "Open Positions", to: "/careers/jobs" }, { label: p.title }]} />
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 bg-accent rounded-full px-3.5 py-1.5 text-xs font-semibold text-accent-foreground">
                <Clock className="h-3.5 w-3.5" /> {p.type}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-surface rounded-full px-3.5 py-1.5 text-xs font-semibold text-foreground">
                <MapPin className="h-3.5 w-3.5" /> New Jersey
              </span>
              {pay && (
                <span className="inline-flex items-center gap-1.5 bg-surface rounded-full px-3.5 py-1.5 text-xs font-semibold text-foreground">
                  <DollarSign className="h-3.5 w-3.5" /> {pay}
                </span>
              )}
            </div>
            <h1 className="font-bold text-foreground leading-[1.08] mb-4" style={{ fontSize: "clamp(2.1rem, 4.6vw, 3.3rem)" }}>{p.title}</h1>
            <p className="text-muted-foreground mb-8">MintexCare · Posted {posted}</p>
            <div className="flex flex-wrap gap-3">
              <Link to={applyUrl(match.slug)} className="el-btn-primary group">
                Apply for this job <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href={`tel:+1${tel}`} className="el-btn-soft">
                <Phone className="h-4 w-4" /> Call {phone}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* BODY */}
      <section className="py-14 md:py-20 bg-surface">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-[1fr_360px] gap-5 xl:gap-8 items-start">
            <div className="space-y-4 min-w-0">
              <AnimatedSection>
                <article className="bg-background rounded-[28px] p-6 md:p-9">
                  <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">About the role</h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{p.description}</p>
                </article>
              </AnimatedSection>
              <AnimatedSection>
                <article className="bg-background rounded-[28px] p-6 md:p-9">
                  <h2 className="text-xl md:text-2xl font-bold text-foreground mb-5">Requirements</h2>
                  <ul className="space-y-3">
                    {job.requirements.map(r => (
                      <li key={r} className="flex items-start gap-3 text-foreground/85 leading-relaxed">
                        <span className="h-5 w-5 rounded-full bg-accent flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-accent-foreground" strokeWidth={3} />
                        </span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </article>
              </AnimatedSection>
              <AnimatedSection>
                <article className="bg-background rounded-[28px] p-6 md:p-9">
                  <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">Why work at MintexCare</h2>
                  <div className="grid sm:grid-cols-2 gap-5">
                    {benefitsData.map(({ id, icon: I, title, description }) => (
                      <div key={id} className="flex gap-3">
                        <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shrink-0">
                          <I className="w-5 h-5 text-accent-foreground" />
                        </div>
                        <div>
                          <p className="font-bold text-foreground text-sm">{title}</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              </AnimatedSection>
            </div>

            {/* Sticky summary */}
            <aside className="space-y-4 lg:sticky lg:top-32">
              <div className="bg-background rounded-[28px] p-6">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">Job summary</p>
                <p className="text-lg font-bold text-foreground mb-5 leading-snug">{p.title}</p>
                <dl className="space-y-4 mb-6">
                  {facts.map(({ icon: I, label, value }) => (
                    <div key={label} className="flex gap-3">
                      <div className="w-9 h-9 rounded-full bg-surface flex items-center justify-center shrink-0">
                        <I className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <dt className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</dt>
                        <dd className="text-sm font-semibold text-foreground">{value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
                <Link to={applyUrl(match.slug)} className="el-btn-primary w-full">
                  Apply for this job <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="text-center text-xs text-muted-foreground mt-3">Takes a few minutes · resume optional</p>
              </div>
              <HiringStepsCard tel={tel} phone={phone} />
            </aside>
          </div>
        </div>
      </section>

      {/* OTHER OPENINGS */}
      {others.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 md:px-10">
            <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Other open positions</h2>
              <Link to="/careers/jobs" className="el-btn-outline group self-start md:self-auto">
                All open positions <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </AnimatedSection>
            <div className="grid md:grid-cols-3 gap-5">
              {others.map(({ position: o, slug: s }, i) => (
                <AnimatedSection key={s} delay={i * 0.06} className="h-full">
                  <Link to={jobUrl(s)} className="group h-full flex flex-col el-card rounded-[24px] p-6 transition-shadow duration-300 hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.15)]">
                    <span className="self-start text-xs font-semibold bg-accent text-accent-foreground rounded-full px-3 py-1 mb-4">{o.type}</span>
                    <span className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{o.title}</span>
                    <span className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">{o.description}</span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground mt-5">
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
      <section className="pt-32 md:pt-40 pb-12">
        <div className="container mx-auto px-6 md:px-10">
          <AnimatedSection className="max-w-3xl">
            <Breadcrumb trail={[{ label: "Home", to: "/" }, { label: "Careers", to: "/careers" }, { label: "Apply Online" }]} />
            <Pill icon={FileText}>Apply Online</Pill>
            <h1 className="font-bold text-foreground leading-[1.07] mb-6" style={{ fontSize: "clamp(2.3rem, 5vw, 3.5rem)" }}>
              Join the <span className="text-primary">MintexCare Team</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-[600px]">
              {preset
                ? <>You're applying for <strong className="text-foreground">{preset}</strong>. It takes a few minutes, and a resume is optional.</>
                : "Choose a position, or send a general application. It takes a few minutes, and a resume is optional."}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-[1fr_340px] gap-5 lg:gap-8 items-start max-w-6xl mx-auto">
            <AnimatedSection>
              <div className="el-card rounded-[28px] p-6 sm:p-8 md:p-10">
                <div className="el-eyebrow bg-background mb-4">Application form</div>
                <h2 className="text-2xl font-bold text-foreground mb-7">Tell us about yourself</h2>
                {/* Wait for the live job list so a ?position= link selects the right job. */}
                {jobsLoaded
                  ? <ApplicationForm key={preset} initialPosition={preset} idPrefix="apply" />
                  : <p className="flex items-center gap-3 text-muted-foreground py-10"><Loader2 className="h-5 w-5 animate-spin text-primary" /> Loading positions…</p>}
              </div>
            </AnimatedSection>
            <aside className="space-y-4 lg:sticky lg:top-32">
              <HiringStepsCard tel={tel} phone={phone} />
              <Link to="/careers/jobs" className="flex items-center justify-between gap-3 el-card rounded-2xl px-5 py-4 hover:bg-accent transition-colors text-sm font-semibold text-foreground">
                <span className="flex items-center gap-2"><Briefcase className="h-4 w-4" /> See all open positions</span>
                <ArrowRight className="h-4 w-4" />
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
    <section className="pt-32 md:pt-40 pb-24 min-h-[80svh]">
      <div className="container mx-auto px-6 md:px-10">
        <AnimatedSection className="max-w-2xl mx-auto">
          <div className="el-card rounded-[32px] text-center px-6 sm:px-12 py-12 sm:py-14">
            <div className="relative w-24 h-24 mx-auto mb-7">
              <div className="absolute inset-0 rounded-full animate-ping opacity-30 bg-accent" />
              <div className="relative w-24 h-24 rounded-full flex items-center justify-center bg-foreground">
                <Check className="w-11 h-11 text-background" strokeWidth={3} />
              </div>
            </div>
            <div className="el-eyebrow bg-background mb-4">Thank you{state?.name ? `, ${state.name}` : ""}</div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Application received</h1>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto">
              {position ? <>Thanks for applying for <strong className="text-foreground">{position}</strong>. </> : "Thanks for applying. "}
              Our hiring team reviews every application and responds within 3–5 business days.
            </p>

            <div className="text-left rounded-2xl bg-background p-5 sm:p-6 mb-8">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">What happens next</p>
              <ol className="grid sm:grid-cols-3 gap-4">
                {HIRING_STEPS.slice(1).map(({ icon: I, label }, i) => (
                  <li key={label} className="flex sm:flex-col items-center sm:items-start gap-3">
                    <span className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-accent">
                      <I className="w-5 h-5 text-accent-foreground" />
                    </span>
                    <span className="text-sm font-semibold text-foreground"><span className="text-primary">{i + 1}.</span> {label}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/careers/jobs" className="el-btn-primary">
                <Users className="h-4 w-4" /> See other openings
              </Link>
              <Link to="/" className="el-btn bg-background text-foreground hover:bg-background/80">
                <Home className="h-4 w-4" /> Back to home
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-8">
              Questions about your application? Call <a href={`tel:+1${tel}`} className="font-semibold text-foreground underline underline-offset-4">{phone}</a>.
            </p>
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
      <main className="theme-el overflow-x-clip">
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
