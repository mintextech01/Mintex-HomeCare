import StatsRow from "@/components/StatsRow";
import { FeatureIcon } from "@/components/Feature";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import AccessibilityButton from "@/components/AccessibilityButton";
import AnimatedSection from "@/components/AnimatedSection";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Star, Users, Clock, ShieldCheck, Phone } from "lucide-react";
import { useEffect } from "react";
import { SERVICE_INDEX, SERVICE_GROUP_LABEL, type ServiceGroup, type ServiceIndexEntry } from "@/data/serviceIndex";

const stats = [
  { value: "500+", label: "Families served",  icon: Users       },
  { value: "99%",  label: "Satisfying care",   icon: Star        },
  { value: "24/7", label: "Always available",  icon: Clock       },
  { value: "10+",  label: "Years of service",  icon: ShieldCheck },
];

/* ── Service card (links to the service's own page) ── */
const ServiceCard = ({ s, i, onSurface }: { s: ServiceIndexEntry; i: number; onSurface: boolean }) => {
  const Icon = s.icon;
  return (
    <AnimatedSection delay={Math.min(i, 4) * 0.06} className="h-full">
      <Link
        to={`/services/${s.slug}`}
        className={`group h-full flex flex-col rounded-[20px] p-7 transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 ${
          onSurface ? "bg-background" : "bg-surface"
        }`}
      >
        <FeatureIcon icon={Icon} className="mb-7" />
        <h3 className="font-bold text-foreground text-lg leading-snug mb-2">{s.name}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">{s.short}</p>
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground mt-6 transition-colors">
          Learn more
          <ArrowRight className="h-4 w-4 transition-transform duration-300" />
        </span>
      </Link>
    </AnimatedSection>
  );
};

/* ── Card rows: 5 cards → 5 across on wide screens; 6 cards → 3 + 3. Rows stay centered below. ── */
const ServiceCardRow = ({ group, onSurface }: { group: ServiceGroup; onSurface: boolean }) => {
  const list = SERVICE_INDEX.filter(s => s.group === group);
  const xl = list.length === 5 ? "xl:w-[calc(20%-16px)]" : "";
  return (
    <div className="flex flex-wrap justify-center gap-5">
      {list.map((s, i) => (
        <div key={s.slug} className={`w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] ${xl}`}>
          <ServiceCard s={s} i={i} onSurface={onSurface} />
        </div>
      ))}
    </div>
  );
};

/* ════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════ */
// Service entities referenced by the OfferCatalog in index.html (same @id values as each
// service page). provider points at the single business entity instead of declaring a second one.
const servicesSchema = {
  "@context": "https://schema.org",
  "@graph": SERVICE_INDEX.map(s => ({
    "@type": "Service",
    "@id": `https://mintexcare.com/services/${s.slug}#service`,
    "name": s.name,
    "description": s.short,
    "provider": { "@id": "https://mintexcare.com/#organization" },
    "areaServed": { "@type": "State", "name": "New Jersey" },
    "url": `https://mintexcare.com/services/${s.slug}`,
  })),
};

const Services = () => {
  useEffect(() => {
    // Replace (not duplicate) the copy already present in the prerendered HTML.
    document.getElementById("services-schema")?.remove();
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "services-schema";
    script.textContent = JSON.stringify(servicesSchema);
    document.head.appendChild(script);
    return () => { document.getElementById("services-schema")?.remove(); };
  }, []);


  return (
    <>
      <Header />
      <main className="theme-el overflow-x-hidden relative">

        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section className="pt-32 lg:pt-40 pb-12 md:pb-14">
          <div className="container mx-auto px-6 md:px-10">
            <AnimatedSection className="text-center max-w-3xl mx-auto">
              <div className="el-eyebrow mb-3">Our services</div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.05] tracking-tight mb-6">
                Home care services{" "}<br />
                in Edison &amp; Central&nbsp;NJ
              </h1>
              <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                We are dedicated to providing exceptional home care through a compassionate,
                patient-centered approach — every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
                <Link to="/free-consultation" className="el-btn-primary group w-full sm:w-auto">
                  Get Started <ArrowRight className="h-4 w-4 transition-transform" />
                </Link>
                <a href="tel:+17322685112" className="el-btn-soft w-full sm:w-auto">
                  <Phone className="h-4 w-4" /> Call (732) 268-5112
                </a>
              </div>
            </AnimatedSection>
            <StatsRow stats={stats} className="max-w-6xl mx-auto" />
          </div>
        </section>

        {/* ══════════════════════════════════════
            IN-HOME CARE SERVICES
        ══════════════════════════════════════ */}
        <section id="in-home-care" className="py-14 md:py-20 bg-surface">
          <div className="container mx-auto px-6 md:px-10">
            <AnimatedSection className="text-center mb-12 md:mb-14">
              <div className="el-eyebrow mb-3">{SERVICE_GROUP_LABEL["in-home"]}</div>
              <h2 className="text-3xl md:text-[2.625rem] font-bold text-foreground mb-3 leading-tight">
                Home care services
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                Everyday support at home, from a few hours a week to around-the-clock care
              </p>
            </AnimatedSection>
            <ServiceCardRow group="in-home" onSurface />
          </div>
        </section>

        {/* ══════════════════════════════════════
            SPECIALIZED & CLINICAL SERVICES
        ══════════════════════════════════════ */}
        <section id="specialized-care" className="py-14 md:py-20">
          <div className="container mx-auto px-6 md:px-10">
            <AnimatedSection className="text-center mb-12 md:mb-14">
              <div className="el-eyebrow mb-3">Specialized care</div>
              <h2 className="text-3xl md:text-[2.625rem] font-bold text-foreground mb-3 leading-tight">
                Specialized &amp; clinical services
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                Nursing and recovery care at home from licensed RNs and LPNs, following your physician's orders
              </p>
            </AnimatedSection>
            <ServiceCardRow group="clinical" onSurface={false} />
          </div>
        </section>

        {/* ══════════════════════════════════════
            TRUST STRIP
        ══════════════════════════════════════ */}
        <section className="pb-6">
          <div className="container mx-auto px-6 md:px-10">
            {/* Open row between hairlines (no heavy dark box). */}
            <div className="border-y border-border py-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: ShieldCheck, title: "Building Trust",       desc: "We earn your confidence through consistent, quality care every single day." },
                  { icon: Users,       title: "Community Involvement", desc: "Deeply rooted in New Jersey, serving families across our community."       },
                  { icon: CheckCircle, title: "Security and Privacy",  desc: "Your health information is always handled with the highest standards."      },
                ].map(({ icon: Icon, title, desc }) => (
                  <AnimatedSection key={title} className="flex gap-4 items-start">
                    <FeatureIcon icon={Icon} size="sm" className="shrink-0" />
                    <div>
                      <h4 className="font-bold text-foreground text-base mb-1">{title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            CTA BANNER
        ══════════════════════════════════════ */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-6 md:px-10">
            <AnimatedSection>
              <div className="rounded-[28px] bg-accent px-6 py-14 md:px-16 text-center">
                <div className="el-eyebrow mb-3">Let us help</div>
                <h2 className="text-3xl md:text-4xl font-bold text-accent-foreground leading-snug mb-3">
                  Need help choosing a service?
                </h2>
                <p className="text-accent-foreground/75 text-sm mb-8 max-w-md mx-auto leading-relaxed">
                  Our care coordinators are ready to help you find the right service for your loved one — at no obligation.
                </p>
                <Link to="/free-consultation" className="el-btn-primary group">
                  Book a Free Consultation <ArrowRight className="h-4 w-4 transition-transform" />
                </Link>
              </div>
            </AnimatedSection>
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

export default Services;
