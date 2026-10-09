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
        <section className="pt-32 lg:pt-40 pb-16 md:pb-20">
          <div className="container mx-auto px-6 md:px-10">
            <div className="flex flex-col lg:flex-row lg:items-center gap-12">

              {/* Left */}
              <AnimatedSection className="flex-1 max-w-xl">
                <p className="text-sm text-muted-foreground font-sans mb-6 flex items-center gap-2">
                  <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
                  <span className="text-foreground/30">/</span>
                  <span className="text-foreground font-semibold">Careers</span>
                </p>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-[1.1] mb-6">
                  Home Care<br />Jobs in<br />
                  <span className="text-primary">Edison, NJ</span>
                </h1>

                <p className="text-muted-foreground font-sans leading-relaxed mb-8 max-w-sm">
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
              <AnimatedSection delay={0.1} className="flex-1 relative flex justify-center items-center">
                <div className="relative w-full max-w-md">
                  <div className="el-card p-3">
                    <img
                      src={siteImages.careersPageBanner}
                      alt="MintexCare team"
                      className="w-full h-72 md:h-96 object-cover rounded-[16px]"
                    />
                  </div>

                  {/* Floating chips */}
                  <div className="el-chip absolute bottom-6 -left-4 sm:-left-8 px-5 py-3">
                    <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="text-xl font-serif font-bold text-foreground leading-none">{activePositions.length}</p>
                      <p className="text-xs text-muted-foreground font-sans mt-1">Open Positions</p>
                    </div>
                  </div>

                  <div className="el-chip absolute top-6 -right-3 sm:-right-6 px-5 py-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <p className="text-sm font-sans font-semibold text-foreground">New Jersey</p>
                  </div>
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
            title="Join Our Healthcare Team"
            subtitle="Explore rewarding nursing and care positions in New Jersey"
          />
        </div>

        {/* ══════════════════════════════════════
            YOUR LIFE AT MINTEXCARE
        ══════════════════════════════════════ */}
        <section className="py-20 md:py-28 bg-surface">
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
                <div className="el-eyebrow bg-background mb-5">Our Culture</div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
                  Your Life At <span className="text-primary">MintexCare</span>
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
                  Learn More <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </AnimatedSection>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            RECRUITMENT PROCESS
        ══════════════════════════════════════ */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-10">

            <AnimatedSection className="text-center mb-12 md:mb-14">
              <div className="el-eyebrow mb-5">Hiring Steps</div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
                Learn Our <span className="text-primary">Recruitment</span> Process
              </h2>
            </AnimatedSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {processSteps.map((step, i) => {
                const SIcon = step.icon;
                return (
                  <AnimatedSection key={step.label} delay={i * 0.08} className="h-full">
                    <div className="el-card h-full p-6 md:p-7">
                      <div className="flex items-center justify-between mb-10">
                        <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center">
                          <SIcon className="h-6 w-6 text-accent-foreground" />
                        </div>
                        <span className="text-4xl font-serif font-bold text-foreground/15 leading-none">
                          {String(i + 1).padStart(2, "0")}
                        </span>
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
        <section id="apply-section" className="py-20 md:py-28 bg-surface">
          <div className="container mx-auto px-6 md:px-10">

            <AnimatedSection className="text-center mb-12 md:mb-14">
              <div className="el-eyebrow bg-background mb-5">Apply Now</div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
                Start Your Journey <span className="text-primary">With Us</span>
              </h2>
              <p className="text-muted-foreground font-sans max-w-md mx-auto">
                Fill out the form and we'll review your application within 3–5 business days.
              </p>
            </AnimatedSection>

            <div className="grid lg:grid-cols-[320px_1fr] gap-5 items-start max-w-5xl mx-auto">

              {/* Left: info panel */}
              <AnimatedSection className="lg:sticky lg:top-28">
                <div className="rounded-[28px] bg-foreground text-background p-7">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-6">
                    <Briefcase className="h-6 w-6 text-accent-foreground" />
                  </div>
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
                    <div className="el-eyebrow mb-4">Application Form</div>
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
