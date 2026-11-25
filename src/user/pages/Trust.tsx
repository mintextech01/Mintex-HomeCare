import { WHATSAPP_URL } from "@/config/contact";
import StatsRow from "@/components/StatsRow";
import { FeatureIcon } from "@/components/Feature";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, type ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import AccessibilityButton from "@/components/AccessibilityButton";
import AnimatedSection from "@/components/AnimatedSection";
import { useAdmin } from "@/contexts/AdminContext";
import { storyLabel, initials, displayName, byline } from "@/lib/testimonials";
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
  { icon: Clock, value: "Mon–Fri", label: "Office hours, 9 AM – 5 PM" },
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
          ? <Link to={c.to} className="transition-colors">{c.label}</Link>
          : <span className="text-foreground font-semibold" aria-current="page">{c.label}</span>}
      </React.Fragment>
    ))}
  </nav>
);

const Pill = ({ icon: Icon, children }: { icon: typeof ShieldCheck; children: ReactNode }) => (
  <div className="el-eyebrow mb-3">
    <Icon className="w-3.5 h-3.5 text-primary" />
    {children}
  </div>
);

const Eyebrow = ({ children, onSurface = false }: { children: ReactNode; onSurface?: boolean }) => (
  <div className={`el-eyebrow mb-3`}>{children}</div>
);

const StatsStrip = () => (
  <section className="pb-12 md:pb-14">
    <div className="container mx-auto px-6 md:px-10">
      <StatsRow stats={STATS} />
    </div>
  </section>
);

const CtaBlock = ({ tel, phone, title, text }: { tel: string; phone: string; title: string; text: string }) => (
  <section className="py-12 md:py-16">
    <div className="container mx-auto px-6 md:px-10">
      <AnimatedSection>
        <div className="rounded-[28px] bg-accent px-6 py-12 sm:px-10 sm:py-16 md:px-16 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="el-eyebrow mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              Licensed by the state of New Jersey
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-accent-foreground leading-snug mb-3">{title}</h2>
            <p className="text-accent-foreground/75 text-sm md:text-base leading-relaxed mb-9">{text}</p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center gap-3">
              <Link to="/free-consultation" className="el-btn-primary whitespace-nowrap">
                Free Consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={`tel:+1${tel}`} className="el-btn bg-background text-foreground whitespace-nowrap">
                <Phone className="h-4 w-4" /> Call {phone}
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="el-btn bg-background text-foreground whitespace-nowrap">
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
  { icon: Clock, title: "Easy to reach", text: "Call us Monday to Friday, 9 AM – 5 PM." },
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
  "Care available 24 hours a day, 7 days a week",
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
      <section className="pt-32 md:pt-40 pb-12 md:pb-14">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-[1.1fr_1fr] 2xl:grid-cols-[minmax(0,680px)_minmax(0,1fr)] gap-12 xl:gap-16 items-center">
            <AnimatedSection>
              <Breadcrumb trail={[{ label: "Home", to: "/" }, { label: "About", to: "/about" }, { label: "Why MintexCare" }]} />
              <Pill icon={ShieldCheck}>Why MintexCare</Pill>
              <h1 className="font-bold text-foreground leading-[1.07] mb-6" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)" }}>
                Care you can{" "}<br />trust at home
              </h1>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-[580px]">
                Letting someone into your home to care for a person you love takes trust. Here's how MintexCare earns it:
                state licensing, nurse supervision, thorough caregiver screening and care around the clock.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/free-consultation" className="el-btn-primary group">
                  Free Consultation <ArrowRight className="h-4 w-4 transition-transform" />
                </Link>
                <a href={`tel:+1${tel}`} className="el-btn-soft">
                  <Phone className="h-4 w-4" /> Call {phone}
                </a>
              </div>
            </AnimatedSection>

            {/* License card */}
            <AnimatedSection delay={0.1} className="relative max-w-[480px] 2xl:max-w-none w-full mx-auto lg:mx-0 lg:justify-self-end">
              <div className="rounded-[28px] p-8 sm:p-10 bg-foreground text-background text-center">
                <div className="w-24 h-24 rounded-[1.75rem] mx-auto mb-6 flex items-center justify-center bg-accent">
                  <ShieldCheck className="w-12 h-12 text-accent-foreground" strokeWidth={1.5} />
                </div>
                <p className="text-sm text-background/60 font-semibold mb-2">MintexCare is</p>
                <p className="text-2xl font-bold leading-snug mb-7">Licensed by the State<br />of New Jersey</p>
                <ul className="space-y-2.5 text-left max-w-[260px] mx-auto">
                  {["Bonded & insured", "RN-supervised care plans", "7-step caregiver screening", "Office: Mon–Fri, 9–5"].map(t => (
                    <li key={t} className="flex items-center gap-2.5 text-base text-background/85">
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
      <section className="py-14 md:py-20 bg-surface">
        <div className="container mx-auto px-6 md:px-10">
          <AnimatedSection className="text-center mb-10">
            <Eyebrow onSurface>Our standards</Eyebrow>
            <h2 className="text-3xl md:text-[2.625rem] font-bold text-foreground leading-tight">Our standards of care</h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {PILLARS.map(({ icon: I, title, text }, i) => (
              <AnimatedSection key={title} delay={Math.min(i, 4) * 0.05} className="h-full">
                <div className="h-full bg-background rounded-[20px] p-7">
                  <FeatureIcon icon={I} className="mb-8" />
                  <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* SCREENING */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-6 md:px-10">
          <AnimatedSection className="text-center mb-10">
            <Eyebrow>Caregiver screening</Eyebrow>
            <h2 className="text-3xl md:text-[2.625rem] font-bold text-foreground mb-3 leading-tight">Our 7-step screening</h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">Before any caregiver meets your family, they complete every one of these steps.</p>
          </AnimatedSection>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {SCREENING.map(({ icon: I, title, text }, i) => (
              <AnimatedSection key={title} delay={Math.min(i, 4) * 0.05} className="h-full">
                <li className="h-full el-card p-6 list-none">
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <FeatureIcon icon={I} size="sm" />
                    <span className="rounded-full bg-accent px-3.5 py-1 text-sm font-bold text-primary">Step {i + 1}</span>
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
      <section className="py-14 md:py-20 bg-surface">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <AnimatedSection>
              <div className="el-eyebrow mb-3">
                <HeartPulse className="w-3.5 h-3.5 text-primary" />
                Nurse oversight
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-5">Nurse-supervised care</h2>
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
                <div className="rounded-[20px] px-7 py-6 bg-foreground text-background">
                  <p className="text-sm text-background/60 font-semibold mb-1">Choosing an agency?</p>
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
                <div className="rounded-[20px] bg-surface px-7 py-5">
                  <Link to="/resources/guides#agency-questions" className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-all">
                    Printable: questions to ask any agency <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-6 md:px-10 max-w-4xl">
          <AnimatedSection className="text-center mb-12">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">Trust & safety questions</h2>
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
      <section className="pt-32 md:pt-40 pb-10 md:pb-12">
        <div className="container mx-auto px-6 md:px-10">
          <AnimatedSection className="max-w-3xl">
            <Breadcrumb trail={[{ label: "Home", to: "/" }, { label: "About", to: "/about" }, { label: "Reviews" }]} />
            <Pill icon={Heart}>Testimonials</Pill>
            <h1 className="font-bold text-foreground leading-[1.07] mb-6" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)" }}>
              What families{" "}<br />say about us
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-[600px]">
              Real words from the families and clients we've had the privilege of caring for across New Jersey.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <StatsStrip />

      <section className="py-14 md:py-20 bg-surface">
        <div className="container mx-auto px-6 md:px-10">
          <AnimatedSection className="text-center mb-12">
            <Eyebrow onSurface>Testimonials</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">Family reviews</h2>
          </AnimatedSection>

          {count === 0 ? (
            <AnimatedSection>
              <div className="max-w-2xl mx-auto text-center bg-background rounded-[28px] p-10">
                <FeatureIcon icon={Quote} className="mx-auto mb-5" />
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
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <span className="text-sm font-bold text-primary">{storyLabel(t)}</span>
                      <div className="flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < t.rating ? "fill-amber-400 text-amber-400" : "fill-border text-border"}`} />
                        ))}
                      </div>
                    </div>
                    <Quote className="w-6 h-6 text-primary/30 mb-3" />
                    <p className="text-foreground/85 leading-relaxed flex-1 mb-7">"{t.text}"</p>
                    <div className="flex items-center gap-3 pt-5 border-t border-border">
                      <span className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-foreground text-background font-bold">
                        {initials(t.name)}
                      </span>
                      <div className="min-w-0">
                        <p className="font-bold text-foreground leading-tight truncate">{displayName(t)}</p>
                        {byline(t) && <p className="text-sm text-muted-foreground">{byline(t)}</p>}
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {pages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-10">
                  <button type="button" onClick={() => go(page - 1)} aria-label="Previous testimonials"
                    className="h-12 w-12 rounded-full border border-border bg-background flex items-center justify-center text-foreground transition-colors">
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <div className="flex gap-1.5">
                    {Array.from({ length: pages }).map((_, i) => (
                      <button key={i} type="button" onClick={() => go(i)} aria-label={`Show testimonials page ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === page ? "bg-foreground w-8" : "bg-foreground/15 w-1.5"}`} />
                    ))}
                  </div>
                  <button type="button" onClick={() => go(page + 1)} aria-label="Next testimonials"
                    className="h-12 w-12 rounded-full border border-border bg-background flex items-center justify-center text-foreground transition-colors">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </>
          )}

          <AnimatedSection className="mt-14">
            <Link to="/about/why-mintexcare" className="group flex flex-col sm:flex-row sm:items-center gap-4 rounded-[20px] bg-foreground text-background p-6 md:px-8 max-w-4xl mx-auto">
              <FeatureIcon icon={ShieldCheck} size="md" onDark />
              <span className="flex-1">
                <span className="block font-bold">Why families trust MintexCare</span>
                <span className="block text-sm text-background/70">State licensing, nurse supervision and our 7-step caregiver screening.</span>
              </span>
              <ArrowRight className="h-5 w-5 transition-transform" />
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
