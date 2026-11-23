import PhotoFacts from "@/components/PhotoFacts";
import { FeatureIcon } from "@/components/Feature";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import AccessibilityButton from "@/components/AccessibilityButton";
import AnimatedSection from "@/components/AnimatedSection";
import { BenefitsSection } from "@/components/benefits/BenefitsSection";
import { JobsSection } from "@/components/jobs/JobsSection";
import { Link } from "react-router-dom";
import { Briefcase, Heart, ArrowRight, MapPin, Phone, FileText, PhoneCall, ClipboardCheck, Check } from "lucide-react";
import { usePageImages } from "@/hooks/usePageImages";
import { useAdmin } from "@/contexts/AdminContext";
import { useMemo } from "react";
import { ApplicationForm } from "@/components/careers/ApplicationForm";

const processSteps = [
  { label: "Submit Your Application", icon: FileText },
  { label: "Initial Phone Screen", icon: PhoneCall },
  { label: "In-Person Interview", icon: ClipboardCheck },
  { label: "Welcome to MintexCare", icon: Heart },
];

const Careers = () => {
  const { jobPositions, siteImages, contactInfo } = useAdmin();
  usePageImages("/careers");
  const activePositions = useMemo(() => jobPositions.filter((p) => p.active), [jobPositions]);

  return (
    <>
      <Header />
      <main className="theme-el overflow-x-hidden">

        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section className="pt-32 lg:pt-40 pb-12 md:pb-14">
          <div className="container mx-auto px-6 md:px-10">
            {/* Same hero grid as the other inner pages: text left, photo filling the right column. */}
            <div className="grid lg:grid-cols-[1.1fr_1fr] 2xl:grid-cols-[minmax(0,680px)_minmax(0,1fr)] gap-12 xl:gap-16 items-center">

              {/* Left */}
              <AnimatedSection>
                <p className="text-sm text-muted-foreground font-sans mb-6 flex items-center gap-2">
                  <Link to="/" className="transition-colors">Home</Link>
                  <span className="text-foreground/30">/</span>
                  <span className="text-foreground font-semibold">Careers</span>
                </p>

                <h1 className="font-bold text-foreground leading-[1.07] mb-6" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)" }}>
                  Home care jobs in{" "}<br />
                  Edison, NJ
                </h1>

                <p className="text-muted-foreground font-sans text-base md:text-lg leading-relaxed mb-8 max-w-[560px]">
                  Join the MintexCare team in Edison and help families across Central New Jersey
                  get compassionate care at home.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link to="/careers/jobs" className="el-btn-primary">
                    View Openings
                  </Link>
                  <a href="#apply-section" className="el-btn-soft">
                    Apply Now
                  </a>
                </div>
              </AnimatedSection>

              {/* Right: image card */}
              <AnimatedSection delay={0.1}>
                <div className="relative w-full">
                  <img
                    src={siteImages.careersPageBanner}
                    alt="MintexCare team"
                    className="w-full h-72 md:h-96 lg:h-[460px] 2xl:h-[520px] object-cover rounded-[28px]"
                  />

                  <PhotoFacts facts={[
                    { icon: Briefcase, title: `${activePositions.length} open positions` },
                    { icon: MapPin, title: "New Jersey" },
                  ]} />
                </div>
              </AnimatedSection>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            BENEFITS / WHY JOIN US
        ══════════════════════════════════════ */}
        <BenefitsSection />

        {/* ══════════════════════════════════════
            JOB OPENINGS
        ══════════════════════════════════════ */}
        <div id="positions" className="py-4 md:py-8">
          <JobsSection
            title="Join our healthcare team"
            subtitle="Explore rewarding nursing and care positions in New Jersey"
          />
        </div>

        {/* ══════════════════════════════════════
            YOUR LIFE AT MINTEXCARE
        ══════════════════════════════════════ */}
        <section className="py-14 md:py-20 bg-surface">
          <div className="container mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* Left: image */}
              <AnimatedSection>
                <div className="relative rounded-[28px] overflow-hidden">
                  <img
                    src={siteImages.careersPageBanner}
                    alt="Life at MintexCare"
                    className="w-full h-96 md:h-[460px] object-cover"
                  />
                  <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 bg-background/95 rounded-2xl p-5">
                    <p className="text-sm font-serif font-semibold text-foreground leading-snug">
                      "A place where caregivers are celebrated, not just employed."
                    </p>
                    <p className="text-xs text-muted-foreground font-sans mt-1">— MintexCare Culture</p>
                  </div>
                </div>
              </AnimatedSection>

              {/* Right: text */}
              <AnimatedSection delay={0.1}>
                <div className="el-eyebrow mb-3">Our culture</div>
                <h2 className="text-3xl md:text-[2.625rem] font-serif font-bold text-foreground mb-6 leading-tight">
                  Working at MintexCare
                </h2>
                <p className="text-muted-foreground font-sans leading-relaxed mb-4">
                  At MintexCare we believe in working together and working hard. With our compassionate team
                  of healthcare professionals, we see looking for dynamic and creative individuals who are
                  willing to dedicate themselves to providing innovative care and services for our clients.
                </p>
                <p className="text-muted-foreground font-sans leading-relaxed mb-8">
                  Besides getting the opportunity to unlock your true potential, at MintexCare you can also
                  network with some of the most talented people in the industry, build meaningful connections,
                  and enjoy many other benefits by working with us.
                </p>

                <div className="space-y-3 mb-8">
                  {["Compassionate team culture", "Professional development support", "Making real impact daily"].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="h-5 w-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-accent-foreground" strokeWidth={3} />
                      </span>
                      <span className="text-sm font-semibold text-foreground/85 font-sans">{item}</span>
                    </div>
                  ))}
                </div>

                <a href="#apply-section" className="el-btn-primary group">
                  Learn More <ArrowRight className="h-4 w-4 transition-transform" />
                </a>
              </AnimatedSection>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            RECRUITMENT PROCESS
        ══════════════════════════════════════ */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-6 md:px-10">

            <AnimatedSection className="text-center mb-12 md:mb-14">
              <div className="el-eyebrow mb-3">Hiring steps</div>
              <h2 className="text-3xl md:text-[2.625rem] font-serif font-bold text-foreground leading-tight">
                How hiring works
              </h2>
            </AnimatedSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {processSteps.map((step, i) => {
                const SIcon = step.icon;
                return (
                  <AnimatedSection key={step.label} delay={i * 0.08} className="h-full">
                    <div className="el-card h-full p-6 md:p-7">
                      <div className="flex items-center justify-between gap-3 mb-6">
                        <FeatureIcon icon={SIcon} />
                        <span className="rounded-full bg-accent px-3.5 py-1 text-sm font-bold text-primary">Step {i + 1}</span>
                      </div>
                      <h3 className="font-serif font-semibold text-foreground text-lg leading-snug">{step.label}</h3>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════
            APPLY FORM
        ══════════════════════════════════════ */}
        <section id="apply-section" className="py-14 md:py-20 bg-surface">
          <div className="container mx-auto px-6 md:px-10">

            <AnimatedSection className="text-center mb-12 md:mb-14">
              <div className="el-eyebrow mb-3">Apply now</div>
              <h2 className="text-3xl md:text-[2.625rem] font-serif font-bold text-foreground mb-3 leading-tight">
                Apply now
              </h2>
              <p className="text-muted-foreground font-sans max-w-md mx-auto">
                Fill out the form and we'll review your application within 3–5 business days.
              </p>
            </AnimatedSection>

            <div className="grid lg:grid-cols-[320px_1fr] gap-5 items-start max-w-5xl mx-auto">

              {/* Left: info panel */}
              <AnimatedSection className="lg:sticky lg:top-28">
                <div className="rounded-[28px] bg-foreground text-background p-7">
                  <FeatureIcon icon={Briefcase} size="md" onDark className="mb-6" />
                  <h3 className="text-2xl font-serif font-bold mb-3 leading-snug">
                    Ready to Make<br />a Difference?
                  </h3>
                  <p className="text-sm text-background/70 font-sans leading-relaxed mb-7">
                    Fill out the form and we'll review your application within 3–5 business days.
                  </p>

                  <div className="space-y-3 mb-7">
                    {processSteps.map((step, i) => (
                      <div key={step.label} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-background/15 flex items-center justify-center flex-shrink-0 text-xs font-bold font-sans">
                          {i + 1}
                        </div>
                        <span className="text-sm text-background/80 font-sans">{step.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-5 border-t border-background/15">
                    <p className="text-background/60 text-xs font-sans mb-1 flex items-center gap-1.5">
                      <Phone className="h-3 w-3" /> Questions? Call us:
                    </p>
                    <p className="text-lg font-serif font-bold">{contactInfo.phone}</p>
                  </div>
                </div>
              </AnimatedSection>

              {/* Right: form */}
              <AnimatedSection delay={0.1}>
                <div className="bg-background rounded-[28px] p-7 md:p-10">
                  <div className="mb-7">
                    <div className="el-eyebrow mb-3">Application form</div>
                    <h3 className="text-2xl font-serif font-bold text-foreground">Tell Us About Yourself</h3>
                  </div>

                  <ApplicationForm idPrefix="careers" />
                </div>
              </AnimatedSection>

            </div>
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

export default Careers;
