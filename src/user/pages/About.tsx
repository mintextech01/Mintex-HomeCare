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
  { value: "500+", label: "Families Served",    icon: Users       },
  { value: "10+",  label: "Years Experience",   icon: Award       },
  { value: "99%",  label: "Client Satisfaction",icon: Star        },
  { value: "24/7", label: "Always Available",   icon: Clock       },
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
        <section className="pt-32 lg:pt-40 pb-16 md:pb-20">
          <div className="container mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 xl:gap-16 items-center">

              {/* LEFT: Text */}
              <AnimatedSection>
                <p className="text-sm text-muted-foreground mb-8 flex items-center gap-2">
                  <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
                  <span className="text-foreground/30">/</span>
                  <span className="text-foreground font-semibold">About Us</span>
                </p>

                <div className="el-eyebrow mb-6">Who We Are</div>

                <h1 className="font-bold text-foreground leading-[1.07] mb-6"
                  style={{ fontSize: "clamp(2.4rem, 5vw, 3.5rem)" }}>
                  Caring for NJ Families<br />
                  <span className="text-primary">Since 2014</span>
                </h1>

                <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-[520px]">
                  MintexCare is a trusted home healthcare agency based in Edison, New Jersey,
                  dedicated to providing compassionate, high-quality care to individuals
                  in the comfort of their own homes.
                </p>

                <div className="flex flex-wrap gap-3 mb-10">
                  <Link to="/contact" className="el-btn-primary group">
                    Get in Touch <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
                <div className="el-card p-3">
                  <div className="relative rounded-[16px] overflow-hidden" style={{ aspectRatio: "4/5", maxHeight: 560 }}>
                    <img
                      src={siteImages.aboutPageHero}
                      alt="MintexCare caregiver with patient"
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                    <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-background/95 p-5">
                      <p className="text-muted-foreground text-xs uppercase tracking-widest mb-1 font-semibold">Our Promise</p>
                      <p className="text-foreground font-bold text-lg leading-snug">
                        Dignified, personalized care<br />in the comfort of home.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating: experience badge */}
                <div className="el-chip absolute top-6 left-2 md:-left-8 z-10 px-5 py-4">
                  <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground leading-none">10+</p>
                    <p className="text-xs text-muted-foreground mt-1 whitespace-nowrap">Years of Excellence</p>
                  </div>
                </div>

                {/* Floating: families served */}
                <div className="el-chip absolute top-32 left-2 md:-left-8 z-10 px-5 py-4 hidden sm:flex">
                  <div className="flex -space-x-2">
                    {[
                      siteImages.aboutPageAvatar1,
                      siteImages.aboutPageAvatar2,
                      siteImages.aboutPageAvatar3,
                    ].map((url, i) => (
                      <img key={i} src={url} alt="Happy MintexCare family"
                        className="w-8 h-8 rounded-full border-2 border-background object-cover" />
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-background bg-foreground flex items-center justify-center">
                      <span className="text-background text-[9px] font-bold">500+</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground leading-none">Happy Families</p>
                    <p className="text-xs text-muted-foreground mt-1">Across New Jersey</p>
                  </div>
                </div>
              </AnimatedSection>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            STATS
        ══════════════════════════════════════ */}
        <section className="pb-16 md:pb-20">
          <div className="container mx-auto px-6 md:px-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
              {stats.map(({ value, label, icon: Icon }, i) => (
                <AnimatedSection key={label} delay={i * 0.06}>
                  <div className="el-card flex flex-col justify-between gap-8 p-5 md:p-7 min-h-[160px] md:min-h-[190px]">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-none">{value}</p>
                      <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <p className="text-sm md:text-base font-semibold text-foreground/80">{label}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            OUR STORY
        ══════════════════════════════════════ */}
        <section className="py-20 md:py-28 bg-surface">
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
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                    <div className="grid grid-cols-3 gap-2 md:gap-3">
                      {[
                        { v: "500+", l: "Families" },
                        { v: "10+",  l: "Years"    },
                        { v: "24/7", l: "Available"},
                      ].map(({ v, l }) => (
                        <div key={l} className="text-center bg-background/95 rounded-2xl py-3 px-2">
                          <p className="text-lg font-bold text-foreground">{v}</p>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">{l}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="el-chip absolute top-4 right-4 md:top-6 md:-right-6 z-10 p-4">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">NJ State Licensed</p>
                    <p className="text-[10px] text-muted-foreground">Bonded & Insured</p>
                  </div>
                </div>
              </AnimatedSection>

              {/* Text */}
              <AnimatedSection delay={0.1}>
                <div className="el-eyebrow bg-background mb-6">Our Story</div>

                <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-7">
                  Care You Can<br />
                  <span className="text-primary">Believe In</span>
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
                  <span className="text-xs font-semibold text-foreground uppercase tracking-widest">
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
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-10">

            <AnimatedSection className="mb-12 md:mb-14">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <div className="el-eyebrow mb-5">What Drives Us</div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                    Mission, Vision<br className="hidden md:block" /> & Values
                  </h2>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs md:text-right">
                  The principles that guide every interaction and decision at MintexCare.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-5">

              {/* Mission */}
              <AnimatedSection delay={0} className="h-full">
                <div className="el-card h-full flex flex-col p-7 md:p-8">
                  <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-8">
                    <Target className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <h3 className="font-bold text-foreground text-xl leading-snug mb-3">Mission</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    To deliver exceptional, client-centered home care services that promote independence,
                    dignity, and peace of mind for our clients and their families.
                  </p>
                </div>
              </AnimatedSection>

              {/* Vision */}
              <AnimatedSection delay={0.08} className="h-full">
                <div className="el-card h-full flex flex-col p-7 md:p-8">
                  <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-8">
                    <Eye className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <h3 className="font-bold text-foreground text-xl leading-snug mb-3">Vision</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    To be the most trusted home care provider in New Jersey, known for compassion,
                    reliability, and excellence in care — transforming lives one family at a time.
                  </p>
                </div>
              </AnimatedSection>

              {/* Values */}
              <AnimatedSection delay={0.16} className="h-full">
                <div className="h-full flex flex-col rounded-[20px] bg-foreground text-background p-7 md:p-8">
                  <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-8">
                    <Heart className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <h3 className="font-bold text-xl leading-snug mb-5">Values</h3>
                  <div className="space-y-3 flex-1">
                    {values.map(({ label, desc }) => (
                      <div key={label} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-accent-foreground" strokeWidth={3} />
                        </div>
                        <div>
                          <span className="text-sm font-semibold">{label} </span>
                          <span className="text-xs text-background/70">— {desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            MEET OUR TEAM
        ══════════════════════════════════════ */}
        {teamMembers.length > 0 && (
          <section className="py-20 md:py-28 bg-surface">
            <div className="container mx-auto px-6 md:px-10">

              <AnimatedSection className="mb-12 md:mb-14">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                  <div>
                    <div className="el-eyebrow bg-background mb-5">The People</div>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                      Meet Our Team
                    </h2>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs md:text-right">
                    Dedicated professionals who bring expertise and heart to every interaction.
                  </p>
                </div>
              </AnimatedSection>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
                {teamMembers.map((m, i) => (
                  <AnimatedSection key={m.id} delay={i * 0.08} className="h-full">
                    <div className="group h-full rounded-[24px] bg-background p-3 transition-shadow duration-300 hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.15)]">
                      <div className="relative overflow-hidden h-64 rounded-[18px]">
                        <img
                          src={m.photoUrl}
                          alt={m.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                      </div>
                      <div className="px-3 pt-5 pb-3">
                        <h3 className="font-bold text-foreground text-lg leading-snug">{m.name}</h3>
                        <p className="text-sm text-primary font-semibold mb-3">{m.role}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{m.bio}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════
            CTA BANNER
        ══════════════════════════════════════ */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 md:px-10">
            <AnimatedSection>
              <div className="rounded-[32px] bg-accent px-6 py-12 sm:px-10 sm:py-14 md:px-16">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                  <div>
                    <div className="el-eyebrow bg-background border-transparent mb-5">
                      <Award className="w-3.5 h-3.5 text-primary" />
                      Licensed & Insured
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-accent-foreground leading-snug mb-3">
                      Ready to Experience the<br className="hidden md:block" /> MintexCare Difference?
                    </h2>
                    <p className="text-accent-foreground/75 text-sm max-w-md leading-relaxed">
                      Our care coordinators are ready to build a personalized plan for your loved one — at no obligation.
                    </p>
                  </div>
                  <Link to="/contact" className="el-btn-primary group shrink-0 whitespace-nowrap">
                    Get in Touch <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
