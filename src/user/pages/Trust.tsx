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
  FileSearch, Users, BadgeCheck, FlaskConical, Stethoscope, GraduationCap, MessagesSquare, Check, ChevronLeft,
  ChevronRight, Quote, Heart, Star, Brain, ChevronDown,
} from "lucide-react";
import React from "react";

// /about/why-mintexcare and /reviews share this chunk.

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

const Pill = ({ icon: Icon, children }: { icon: typeof ShieldCheck; children: ReactNode }) => (
  <div className="el-eyebrow mb-6">
    <Icon className="w-3.5 h-3.5 text-primary" />
    {children}
  </div>
);

const Eyebrow = ({ children, onSurface = false }: { children: ReactNode; onSurface?: boolean }) => (
  <div className={`el-eyebrow mb-5 ${onSurface ? "bg-background" : ""}`}>{children}</div>
);

const StatsStrip = () => (
  <section className="pb-16 md:pb-20">
    <div className="container mx-auto px-6 md:px-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        {STATS.map(({ icon: I, value, label }, i) => (
          <AnimatedSection key={label} delay={i * 0.06}>
            <div className="el-card flex flex-col justify-between gap-6 p-5 md:p-6 min-h-[140px]">
              <div className="flex items-start justify-between gap-2">
                <p className="text-3xl md:text-4xl font-bold text-foreground leading-none">{value}</p>
                <div className="w-9 h-9 rounded-full bg-background flex items-center justify-center shrink-0">
                  <I className="w-4 h-4 text-primary" />
                </div>
              </div>
              <p className="text-sm font-semibold text-foreground/80">{label}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

const CtaBlock = ({ tel, phone, title, text }: { tel: string; phone: string; title: string; text: string }) => (
  <section className="py-16 md:py-20">
    <div className="container mx-auto px-6 md:px-10">
      <AnimatedSection>
        <div className="rounded-[32px] bg-accent px-6 py-12 sm:px-10 sm:py-16 md:px-16 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="el-eyebrow bg-background border-transparent mb-5">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              Licensed by the State of New Jersey
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-accent-foreground leading-snug mb-4">{title}</h2>
            <p className="text-accent-foreground/75 text-sm md:text-base leading-relaxed mb-9">{text}</p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center gap-3">
              <Link to="/free-consultation" className="el-btn-primary whitespace-nowrap">
                Free Consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={`tel:+1${tel}`} className="el-btn bg-background text-foreground hover:bg-background/80 whitespace-nowrap">
                <Phone className="h-4 w-4" /> Call {phone}
              </a>
              <a href={`https://wa.me/1${tel}`} target="_blank" rel="noopener noreferrer" className="el-btn bg-background text-foreground hover:bg-background/80 whitespace-nowrap">
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
      <section className="pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 items-center">
            <AnimatedSection>
              <Breadcrumb trail={[{ label: "Home", to: "/" }, { label: "About", to: "/about" }, { label: "Why MintexCare" }]} />
              <Pill icon={ShieldCheck}>Why MintexCare</Pill>
              <h1 className="font-bold text-foreground leading-[1.07] mb-6" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)" }}>
                Care You Can<br /><span className="text-primary">Trust at Home</span>
              </h1>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-[580px]">
                Letting someone into your home to care for a person you love takes trust. Here's how MintexCare earns it:
                state licensing, nurse supervision, thorough caregiver screening and support around the clock.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/free-consultation" className="el-btn-primary group">
                  Free Consultation <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href={`tel:+1${tel}`} className="el-btn-soft">
                  <Phone className="h-4 w-4" /> Call {phone}
                </a>
              </div>
            </AnimatedSection>

            {/* License card */}
            <AnimatedSection delay={0.1} className="relative max-w-[480px] w-full mx-auto lg:mx-0 lg:justify-self-end">
              <div className="rounded-[28px] p-8 sm:p-10 bg-foreground text-background text-center">
                <div className="w-24 h-24 rounded-[1.75rem] mx-auto mb-6 flex items-center justify-center bg-accent">
                  <ShieldCheck className="w-12 h-12 text-accent-foreground" strokeWidth={1.5} />
                </div>
                <p className="text-xs uppercase tracking-[0.2em] text-background/60 font-semibold mb-2">MintexCare is</p>
                <p className="text-2xl font-bold leading-snug mb-7">Licensed by the State<br />of New Jersey</p>
                <ul className="space-y-2.5 text-left max-w-[260px] mx-auto">
                  {["Bonded & insured", "RN-supervised care plans", "7-step caregiver screening", "Available 24/7"].map(t => (
                    <li key={t} className="flex items-center gap-2.5 text-sm text-background/85">
                      <span className="w-5 h-5 rounded-full bg-accent flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-accent-foreground" strokeWidth={3} />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <StatsStrip />

      {/* PILLARS */}
      <section className="py-20 md:py-24 bg-surface">
        <div className="container mx-auto px-6 md:px-10">
          <AnimatedSection className="text-center mb-14">
            <Eyebrow onSurface>Our Standards</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Six reasons families <span className="text-primary">choose us</span></h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {PILLARS.map(({ icon: I, title, text }, i) => (
              <AnimatedSection key={title} delay={Math.min(i, 4) * 0.05} className="h-full">
                <div className="h-full bg-background rounded-[24px] p-7">
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-accent">
                      <I className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <span className="text-4xl font-serif font-bold text-foreground/15 leading-none">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* SCREENING */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 md:px-10">
          <AnimatedSection className="text-center mb-14">
            <Eyebrow>Caregiver Screening</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our <span className="text-primary">7-step screening</span></h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">Before any caregiver meets your family, they complete every one of these steps.</p>
          </AnimatedSection>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {SCREENING.map(({ icon: I, title, text }, i) => (
              <AnimatedSection key={title} delay={Math.min(i, 4) * 0.05} className="h-full">
                <li className="h-full el-card p-6 list-none">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-accent">
                      <I className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <span className="text-[11px] font-bold tracking-[0.15em] text-muted-foreground">STEP {i + 1}</span>
                  </div>
                  <p className="font-bold text-foreground mb-1">{title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                </li>
              </AnimatedSection>
            ))}
            <AnimatedSection delay={0.2} className="h-full">
              <li className="h-full rounded-[20px] p-6 bg-foreground text-background flex flex-col justify-center list-none">
                <span className="w-11 h-11 rounded-full bg-accent flex items-center justify-center mb-4">
                  <Check className="w-5 h-5 text-accent-foreground" strokeWidth={3} />
                </span>
                <p className="font-bold text-lg leading-snug">Then matched to your loved one</p>
                <p className="text-sm text-background/70 mt-1">Based on needs, skills and personality.</p>
              </li>
            </AnimatedSection>
          </ol>
        </div>
      </section>

      {/* NURSE OVERSIGHT + CHECKLIST */}
      <section className="py-20 md:py-24 bg-surface">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <AnimatedSection>
              <div className="el-eyebrow bg-background mb-6">
                <HeartPulse className="w-3.5 h-3.5 text-primary" />
                Nurse Oversight
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-5">Registered nurses <span className="text-primary">behind every plan</span></h2>
              <p className="text-muted-foreground leading-relaxed mb-8">Our RNs don't just sign off on paperwork. They stay involved in your loved one's care from the first visit.</p>
              <ul className="space-y-3">
                {[
                  { title: "Assess", text: "An in-home assessment of health, safety and daily routines." },
                  { title: "Plan", text: "A written, personalized care plan the caregiver follows." },
                  { title: "Supervise", text: "Regular oversight of caregivers and check-ins with your family." },
                  { title: "Update", text: "Changes to the plan whenever your loved one's needs change." },
                ].map(({ title, text }, i) => (
                  <li key={title} className="flex gap-4 bg-background rounded-2xl p-5">
                    <span className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-foreground text-background text-sm font-bold">{i + 1}</span>
                    <div>
                      <p className="font-bold text-foreground">{title}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="bg-background rounded-[28px] p-2">
                <div className="rounded-[22px] px-7 py-6 bg-foreground text-background">
                  <p className="text-xs uppercase tracking-widest text-background/60 font-semibold mb-1">Choosing an agency?</p>
                  <h3 className="text-xl font-bold">What to look for, and what you get with MintexCare</h3>
                </div>
                <ul className="divide-y divide-border px-2">
                  {CHECKLIST.map(item => (
                    <li key={item} className="flex items-center justify-between gap-4 px-5 py-3.5">
                      <span className="text-foreground/85 text-sm">{item}</span>
                      <span className="w-6 h-6 rounded-full bg-accent flex items-center justify-center shrink-0" aria-label="Yes">
                        <Check className="w-3.5 h-3.5 text-accent-foreground" strokeWidth={3} />
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="rounded-[22px] bg-surface px-7 py-5">
                  <Link to="/resources/guides#agency-questions" className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary hover:gap-2.5 transition-all">
                    Printable: questions to ask any agency <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 md:px-10 max-w-4xl">
          <AnimatedSection className="text-center mb-12">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Trust & safety questions</h2>
          </AnimatedSection>
          <div className="space-y-3">
            {WHY_FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className="el-card rounded-2xl">
                  <button type="button" onClick={() => setOpenFaq(open ? null : i)} aria-expanded={open} aria-controls={`wfaq-${i}`}
                    className="w-full flex items-center gap-4 text-left px-5 md:px-6 py-5">
                    <span className="flex-1 font-semibold text-foreground leading-snug">{f.q}</span>
                    <span className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${open ? "bg-foreground text-background" : "bg-background text-foreground"}`}>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
                    </span>
                  </button>
                  {/* Answer stays in the HTML when closed so search engines can read it. */}
                  <div id={`wfaq-${i}`} className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
                    <div className="overflow-hidden">
                      <p className="text-muted-foreground leading-relaxed px-5 md:px-6 pb-6">{f.a}</p>
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
      <section className="pt-32 md:pt-40 pb-14 md:pb-16">
        <div className="container mx-auto px-6 md:px-10">
          <AnimatedSection className="max-w-3xl">
            <Breadcrumb trail={[{ label: "Home", to: "/" }, { label: "About", to: "/about" }, { label: "Reviews" }]} />
            <Pill icon={Heart}>Testimonials</Pill>
            <h1 className="font-bold text-foreground leading-[1.07] mb-6" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)" }}>
              What Families<br /><span className="text-primary">Say About Us</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-[600px]">
              Real words from the families and clients we've had the privilege of caring for across New Jersey.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <StatsStrip />

      <section className="py-20 md:py-24 bg-surface">
        <div className="container mx-auto px-6 md:px-10">
          <AnimatedSection className="text-center mb-12">
            <Eyebrow onSurface>Testimonials</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">In their <span className="text-primary">own words</span></h2>
          </AnimatedSection>

          {count === 0 ? (
            <AnimatedSection>
              <div className="max-w-2xl mx-auto text-center bg-background rounded-[28px] p-10">
                <div className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center bg-accent">
                  <Quote className="w-7 h-7 text-accent-foreground" />
                </div>
                <p className="text-xl font-bold text-foreground mb-2">Family stories are on their way</p>
                <p className="text-muted-foreground leading-relaxed mb-6">We're gathering testimonials from the families we care for. In the meantime, we're happy to talk about our care, our nurses and our caregivers.</p>
                <a href={`tel:+1${tel}`} className="el-btn-primary">
                  <Phone className="h-4 w-4" /> Call {phone}
                </a>
              </div>
            </AnimatedSection>
          ) : (
            <>
              <div className={`grid gap-5 ${perView === 3 ? "lg:grid-cols-3" : perView === 2 ? "sm:grid-cols-2" : ""}`}>
                {visible.map(t => (
                  <article key={t.id} className="h-full flex flex-col bg-background rounded-[28px] p-7 md:p-8">
                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-6">
                      <Quote className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <p className="text-foreground/85 leading-relaxed flex-1 mb-7">"{t.text}"</p>
                    <div className="flex items-center gap-3 pt-5 border-t border-border">
                      <span className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-foreground text-background font-bold">
                        {initials(t.name)}
                      </span>
                      <div className="min-w-0">
                        <p className="font-bold text-foreground leading-tight truncate">{t.name}</p>
                        {t.location && <p className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="h-3.5 w-3.5 shrink-0" /> {t.location}</p>}
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {pages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-10">
                  <button type="button" onClick={() => go(page - 1)} aria-label="Previous testimonials"
                    className="h-12 w-12 rounded-full border border-border bg-background flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors">
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <div className="flex gap-1.5">
                    {Array.from({ length: pages }).map((_, i) => (
                      <button key={i} type="button" onClick={() => go(i)} aria-label={`Show testimonials page ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === page ? "bg-foreground w-8" : "bg-foreground/15 w-1.5 hover:bg-foreground/40"}`} />
                    ))}
                  </div>
                  <button type="button" onClick={() => go(page + 1)} aria-label="Next testimonials"
                    className="h-12 w-12 rounded-full border border-border bg-background flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </>
          )}

          <AnimatedSection className="mt-14">
            <Link to="/about/why-mintexcare" className="group flex flex-col sm:flex-row sm:items-center gap-4 rounded-[24px] bg-foreground text-background p-6 md:px-8 max-w-4xl mx-auto">
              <span className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-accent"><ShieldCheck className="w-6 h-6 text-accent-foreground" /></span>
              <span className="flex-1">
                <span className="block font-bold">Why families trust MintexCare</span>
                <span className="block text-sm text-background/70">State licensing, nurse supervision and our 7-step caregiver screening.</span>
              </span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
      <main className="theme-el overflow-x-clip">
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
