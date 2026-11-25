import StatsRow from "@/components/StatsRow";
import PhotoFacts from "@/components/PhotoFacts";
import { FeatureIcon } from "@/components/Feature";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import AccessibilityButton from "@/components/AccessibilityButton";
import AnimatedSection from "@/components/AnimatedSection";
import { useAdmin } from "@/contexts/AdminContext";
import { usePageImages } from "@/hooks/usePageImages";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import {
  Target, Eye, Heart, Check, Users, MapPin, Award,
  ArrowRight, ShieldCheck, Clock, Star,
} from "lucide-react";

const stats = [
  { value: "500+", label: "Families served",     icon: Users       },
  { value: "10+",  label: "Years of experience", icon: Award       },
  { value: "99%",  label: "Client satisfaction", icon: Star        },
  { value: "Mon–Fri", label: "Office hours, 9 AM – 5 PM", icon: Clock },
];

const values = [
  { label: "Compassion",     desc: "We treat every client like family."           },
  { label: "Integrity",      desc: "Honest, transparent care you can count on."   },
  { label: "Excellence",     desc: "High standards in every service we deliver."  },
  { label: "Respect",        desc: "Dignity and privacy for every individual."    },
  { label: "Accountability", desc: "We take ownership of outcomes."               },
];

const About = () => {
  const { teamMembers, siteImages, requestTeamMembers } = useAdmin();
  usePageImages("/about", ["aboutPageHero"]);
  useEffect(() => { requestTeamMembers(); }, [requestTeamMembers]);

  return (
    <>
      <Header />
      <main className="theme-el overflow-x-hidden">

        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section className="pt-32 lg:pt-40 pb-12 md:pb-14">
          <div className="container mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] 2xl:grid-cols-[minmax(0,680px)_minmax(0,1fr)] gap-12 xl:gap-16 items-center">

              {/* LEFT: Text */}
              <AnimatedSection>
                <p className="text-sm text-muted-foreground mb-8 flex items-center gap-2">
                  <Link to="/" className="transition-colors">Home</Link>
                  <span className="text-foreground/30">/</span>
                  <span className="text-foreground font-semibold">About Us</span>
                </p>

                <div className="el-eyebrow mb-3">Who we are</div>

                <h1 className="font-bold text-foreground leading-[1.07] mb-6"
                  style={{ fontSize: "clamp(2.4rem, 5vw, 3.5rem)" }}>
                  Caring for NJ families{" "}<br />
                  since 2014
                </h1>

                <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-[520px]">
                  MintexCare is a trusted home healthcare agency based in Edison, New Jersey,
                  dedicated to providing compassionate, high-quality care to individuals
                  in the comfort of their own homes.
                </p>

                <div className="flex flex-wrap gap-3 mb-10">
                  <Link to="/contact" className="el-btn-primary group">
                    Get in Touch <ArrowRight className="h-4 w-4 transition-transform" />
                  </Link>
                  <Link to="/services" className="el-btn-soft">
                    Our Services
                  </Link>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  {[
                    { icon: ShieldCheck, label: "NJ State Licensed" },
                    { icon: Award,       label: "Bonded & Insured"  },
                    { icon: MapPin,      label: "Serving 12 NJ Counties" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
                      <Icon className="w-4 h-4 text-primary" />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* RIGHT: Image card with info chips */}
              <AnimatedSection delay={0.1} className="relative">
                <div>
                  <div className="relative rounded-[28px] overflow-hidden aspect-[4/5] max-h-[560px] lg:aspect-auto lg:h-[560px]">
                    <img
                      src={siteImages.aboutPageHero}
                      alt="MintexCare caregiver with patient"
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-sm font-semibold text-muted-foreground mb-1">Our promise</p>
                  <p className="text-lg font-bold text-foreground leading-snug">Dignified, personalized care in the comfort of home.</p>
                </div>
              </AnimatedSection>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            STATS
        ══════════════════════════════════════ */}
        <section className="pb-12 md:pb-14">
          <div className="container mx-auto px-6 md:px-10">
            <StatsRow stats={stats} />
          </div>
        </section>

        {/* ══════════════════════════════════════
            OUR STORY
        ══════════════════════════════════════ */}
        <section className="py-14 md:py-20 bg-surface">
          <div className="container mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* Image */}
              <AnimatedSection className="relative">
                <div className="relative rounded-[28px] overflow-hidden">
                  <img
                    src={siteImages.aboutPageStory}
                    alt="MintexCare team providing home care"
                    className="w-full h-[420px] md:h-[520px] object-cover"
                    loading="lazy"
                  />
                </div>

                <PhotoFacts facts={[{ icon: ShieldCheck, title: "NJ State Licensed", text: "Bonded & insured" }]} />
              </AnimatedSection>

              {/* Text */}
              <AnimatedSection delay={0.1}>
                <div className="el-eyebrow mb-3">Our story</div>

                <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-7">
                  Who we are
                </h2>

                <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base mb-8">
                  <p>
                    MintexCare was founded with a simple yet powerful vision: to provide compassionate,
                    high-quality home care services that allow individuals to age with dignity in
                    the comfort of their own homes.
                  </p>
                  <p>
                    Based in New Jersey, we have grown from a small team of dedicated caregivers into a
                    trusted healthcare agency serving families across the state. Our commitment to
                    excellence, personalized attention, and genuine compassion sets us apart.
                  </p>
                  <p>
                    Every member of our team shares a deep passion for improving lives and supporting
                    families through life's most challenging moments.
                  </p>
                </div>

                <div className="inline-flex items-center gap-3 rounded-full bg-background px-5 py-3">
                  <Heart className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">
                    Trusted by NJ Families Since 2014
                  </span>
                </div>
              </AnimatedSection>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            MISSION · VISION · VALUES
        ══════════════════════════════════════ */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-6 md:px-10">

            <AnimatedSection className="text-center mb-10">
              <div className="el-eyebrow mb-3">What drives us</div>
              <h2 className="text-3xl md:text-[2.625rem] font-bold text-foreground leading-tight mb-3">
                Mission, vision & values
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                The principles that guide every interaction and decision at MintexCare.
              </p>
            </AnimatedSection>

            {/* Original 3-card layout (Mission | Vision | Values); all three light cards, no dark card. */}
            <AnimatedSection className="grid md:grid-cols-3 gap-5">
              <div className="el-card h-full flex flex-col p-7 md:p-8">
                <FeatureIcon icon={Target} className="mb-8" />
                <h3 className="font-bold text-foreground text-xl leading-snug mb-3">Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To deliver exceptional, client-centered home care services that promote independence,
                  dignity, and peace of mind for our clients and their families.
                </p>
              </div>

              <div className="el-card h-full flex flex-col p-7 md:p-8">
                <FeatureIcon icon={Eye} className="mb-8" />
                <h3 className="font-bold text-foreground text-xl leading-snug mb-3">Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be the most trusted home care provider in New Jersey, known for compassion,
                  reliability, and excellence in care — transforming lives one family at a time.
                </p>
              </div>

              <div className="el-card h-full flex flex-col p-7 md:p-8">
                <FeatureIcon icon={Heart} className="mb-8" />
                <h3 className="font-bold text-foreground text-xl leading-snug mb-4">Values</h3>
                <ul className="space-y-3">
                  {values.map(({ label, desc }) => (
                    <li key={label} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" strokeWidth={2.5} />
                      <p className="text-muted-foreground leading-snug">
                        <span className="font-bold text-foreground">{label}</span> — {desc}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ══════════════════════════════════════
            MEET OUR TEAM
        ══════════════════════════════════════ */}
        {teamMembers.length > 0 && (
          <section className="py-14 md:py-20 bg-surface">
            <div className="container mx-auto px-6 md:px-10">

              <AnimatedSection className="text-center mb-10">
                <div className="el-eyebrow mb-3">The people</div>
                <h2 className="text-3xl md:text-[2.625rem] font-bold text-foreground leading-tight mb-3">
                  Meet our team
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                  Dedicated professionals who bring expertise and heart to every interaction.
                </p>
              </AnimatedSection>

              {/* items-start: opening one long bio grows only that card, not the whole row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start gap-6 max-w-5xl mx-auto">
                {teamMembers.map(m => (
                  <div key={m.id}>
                    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
                      <div className="relative aspect-[4/5] w-full bg-muted">
                        {m.photoUrl ? (
                          <img
                            src={m.photoUrl}
                            alt={m.role ? `${m.name}, ${m.role} at MintexCare` : m.name}
                            className="absolute inset-0 w-full h-full object-cover object-top"
                            loading="lazy"
                          />
                        ) : (
                          <span className="flex h-full w-full items-center justify-center text-3xl font-semibold text-muted-foreground">
                            {m.name.split(/\s+/).map(p => p[0]).slice(0, 2).join("").toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <h3 className="text-lg font-bold text-foreground leading-snug">{m.name}</h3>
                        <p className="text-sm font-semibold text-primary">{m.role}</p>
                        {m.bio && (
                          <details className="group mt-3">
                            <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                              <span className="line-clamp-4 text-[15px] leading-relaxed text-muted-foreground group-open:line-clamp-none">
                                {m.bio}
                              </span>
                              <span className="mt-1.5 block text-[13.5px] font-semibold text-primary group-open:hidden">Read more</span>
                              <span className="mt-1.5 hidden text-[13.5px] font-semibold text-primary group-open:block">Read less</span>
                            </summary>
                          </details>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════
            CTA BANNER
        ══════════════════════════════════════ */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-6 md:px-10">
            <AnimatedSection>
              <div className="rounded-[28px] bg-accent px-6 py-12 sm:px-10 sm:py-14 md:px-16">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                  <div>
                    <div className="el-eyebrow mb-3">
                      <Award className="w-3.5 h-3.5 text-primary" />
                      Licensed & insured
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-accent-foreground leading-snug mb-3">
                      Talk to our care team
                    </h2>
                    <p className="text-accent-foreground/75 text-sm max-w-md leading-relaxed">
                      Our care coordinators are ready to build a personalized plan for your loved one — at no obligation.
                    </p>
                  </div>
                  <Link to="/contact" className="el-btn-primary group shrink-0 whitespace-nowrap">
                    Get in Touch <ArrowRight className="h-4 w-4 transition-transform" />
                  </Link>
                </div>
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

export default About;
