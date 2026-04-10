import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import AnimatedSection from "@/components/AnimatedSection";
import { useAdmin } from "@/contexts/AdminContext";
import { Link } from "react-router-dom";
import React from "react";
import {
  Target, Eye, Heart, CheckCircle, Users, MapPin, Award,
  ArrowRight, ShieldCheck, Clock, Star, Stethoscope, Phone,
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

const whyUs = [
  { icon: ShieldCheck, title: "NJ Licensed & Insured",   desc: "Fully certified, bonded, and insured by the state of New Jersey." },
  { icon: Stethoscope, title: "Skilled Care Team",        desc: "Trained caregivers and nurses matched to each client's needs."    },
  { icon: Heart,        title: "Personalized Plans",      desc: "Every care plan is built around your family's unique situation."  },
  { icon: Phone,        title: "Always Reachable",        desc: "Our coordinators are available 24/7 — no voicemail runaround."   },
];

const About = () => {
  const { teamMembers, siteImages } = useAdmin();

  return (
    <>
      <Header />
      <main className="bg-white overflow-x-hidden">

        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section className="relative pt-32 pb-20 bg-white overflow-hidden">
          {/* Soft background blobs */}
          <div className="pointer-events-none absolute top-0 right-0 w-[560px] h-[560px] rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, #dbeafe 0%, transparent 70%)", transform: "translate(30%,-30%)" }} />
          <div className="pointer-events-none absolute bottom-0 left-0 w-[380px] h-[380px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #ccfbf1 0%, transparent 70%)", transform: "translate(-30%,30%)" }} />

          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">

              {/* LEFT: Text */}
              <AnimatedSection from="left">
                {/* Breadcrumb */}
                <p className="text-sm text-gray-400 mb-8 flex items-center gap-2">
                  <Link to="/" className="hover:text-[#2a66b0] transition-colors">Home</Link>
                  <span className="text-gray-300">/</span>
                  <span className="text-[#2a66b0] font-medium">About Us</span>
                </p>

                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2a66b0]" />
                  <span className="text-xs font-semibold text-[#2a66b0] uppercase tracking-widest">Who We Are</span>
                </div>

                <h1 className="font-bold text-gray-900 leading-[1.07] mb-5"
                  style={{ fontSize: "clamp(2.6rem, 5vw, 4rem)" }}>
                  Caring for NJ Families<br />
                  <span className="text-[#2a66b0]">Since 2014</span>
                </h1>

                <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-8 max-w-[500px]">
                  MintexCare is a trusted home healthcare agency based in New Jersey,
                  dedicated to providing compassionate, high-quality care to individuals
                  in the comfort of their own homes.
                </p>

                <div className="flex flex-wrap gap-3 mb-12">
                  <Link to="/contact"
                    className="inline-flex items-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-full transition-all hover:scale-105"
                    style={{ background: "linear-gradient(135deg, hsl(214 66% 44%) 0%, hsl(192 91% 37%) 100%)", border: "1px solid rgba(255,255,255,0.3)", boxShadow: "0 2px 12px rgba(38,104,188,0.30), inset 0 1px 0 rgba(255,255,255,0.25)", color: "#fff" }}>
                    Get in Touch <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/services"
                    className="inline-flex items-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-full text-foreground hover:text-primary transition-all glass-btn">
                    Our Services
                  </Link>
                </div>

                {/* Inline trust badges */}
                <div className="flex flex-wrap items-center gap-5">
                  {[
                    { icon: ShieldCheck, label: "NJ State Licensed" },
                    { icon: Award,       label: "Bonded & Insured"  },
                    { icon: MapPin,      label: "Serving All of NJ" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2 text-sm text-gray-500">
                      <Icon className="w-4 h-4 text-[#2a66b0]" />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* RIGHT: Image with floating cards */}
              <AnimatedSection from="right" delay={0.15} className="relative">
                {/* Main image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl"
                  style={{ aspectRatio: "4/5", maxHeight: 560 }}>
                  <img
                    src={siteImages.aboutPageHero}
                    alt="MintexCare caregiver with patient"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  {/* Bottom gradient */}
                  <div className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(10,30,60,0.6) 0%, transparent 50%)" }} />
                  {/* Bottom overlay text */}
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <p className="text-white/70 text-xs uppercase tracking-widest mb-1 font-semibold">Our Promise</p>
                    <p className="text-white font-bold text-lg leading-snug">
                      Dignified, personalized care<br />in the comfort of home.
                    </p>
                  </div>
                </div>

                {/* Floating: experience badge (top-right) */}
                <div className="absolute top-2 right-2 md:-top-5 md:-right-6 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3 border border-gray-100 z-10">
                  <div className="w-11 h-11 rounded-xl bg-[#2a66b0] flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 leading-none">10+</p>
                    <p className="text-xs text-gray-500 mt-0.5 whitespace-nowrap">Years of Excellence</p>
                  </div>
                </div>

                {/* Floating: families served (bottom-left) */}
                <div className="absolute bottom-2 left-2 md:-bottom-5 md:-left-6 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3 border border-gray-100 z-10">
                  <div className="flex -space-x-2">
                    {[
                      siteImages.aboutPageAvatar1,
                      siteImages.aboutPageAvatar2,
                      siteImages.aboutPageAvatar3,
                    ].map((url, i) => (
                      <img key={i} src={url} alt=""
                        className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-[#2a66b0] flex items-center justify-center">
                      <span className="text-white text-[9px] font-bold">500+</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 leading-none">Happy Families</p>
                    <p className="text-xs text-gray-500 mt-0.5">Across New Jersey</p>
                  </div>
                </div>

                {/* Decorative dashed ring */}
                <div className="absolute -bottom-12 right-6 w-36 h-36 rounded-full border-2 border-dashed border-[#2a66b0]/15 pointer-events-none" />
              </AnimatedSection>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            STATS STRIP
        ══════════════════════════════════════ */}
        <section className="py-6 bg-white border-y border-gray-100">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map(({ value, label, icon: Icon }, i) => (
                <AnimatedSection key={label} delay={i * 0.07}>
                  <div className="flex items-center gap-4 bg-gray-50 rounded-2xl px-5 py-5 border border-gray-100">
                    <div className="w-11 h-11 rounded-xl bg-[#2a66b0]/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#2a66b0]" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 leading-none">{value}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            OUR STORY
        ══════════════════════════════════════ */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute rounded-full opacity-30"
              style={{ background: "radial-gradient(circle, #dbeafe 0%, transparent 70%)", width: 400, height: 400, bottom: "-8%", right: "-5%" }} />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">

              {/* Image */}
              <AnimatedSection from="left" className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={siteImages.aboutPageStory}
                    alt="MintexCare team providing home care"
                    className="w-full h-[480px] object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(10,30,60,0.55) 0%, transparent 50%)" }} />
                  {/* Stat chips */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { v: "500+", l: "Families" },
                        { v: "10+",  l: "Years"    },
                        { v: "24/7", l: "Available"},
                      ].map(({ v, l }) => (
                        <div key={l} className="text-center bg-white/90 backdrop-blur-sm rounded-xl py-3 px-2">
                          <p className="text-lg font-bold text-[#2a66b0]">{v}</p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">{l}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute bottom-2 right-2 md:-bottom-5 md:-right-6 bg-white border border-gray-100 rounded-2xl shadow-xl p-4 flex items-center gap-3 z-10">
                  <div className="w-10 h-10 rounded-full bg-[#2a66b0]/10 flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5 text-[#2a66b0]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">NJ State Licensed</p>
                    <p className="text-[10px] text-gray-500">Bonded & Insured</p>
                  </div>
                </div>
              </AnimatedSection>

              {/* Text */}
              <AnimatedSection from="right" delay={0.15}>
                <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2a66b0]" />
                  <span className="text-xs font-semibold text-[#2a66b0] uppercase tracking-widest">Our Story</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-5">
                  Care You Can<br />
                  <span className="text-[#2a66b0]">Believe In</span>
                </h2>

                <div className="w-12 h-1 rounded-full bg-[#2a66b0] mb-7" />

                <div className="space-y-4 text-gray-500 leading-relaxed text-sm md:text-base mb-8">
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

                <div className="flex items-center gap-3">
                  <div className="h-1 w-10 bg-[#2a66b0] rounded-full" />
                  <span className="text-xs font-semibold text-[#2a66b0] uppercase tracking-widest">
                    Trusted by NJ Families Since 2014
                  </span>
                </div>
              </AnimatedSection>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            WHY CHOOSE US
        ══════════════════════════════════════ */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">

            <AnimatedSection className="text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-white border border-blue-100 rounded-full px-4 py-1.5 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2a66b0]" />
                <span className="text-xs font-semibold text-[#2a66b0] uppercase tracking-widest">Why MintexCare</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                What Makes Us Different
              </h2>
              <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                We go beyond basic care to provide a complete support system for your family.
              </p>
            </AnimatedSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {whyUs.map(({ icon: Icon, title, desc }, i) => (
                <AnimatedSection key={title} delay={i * 0.08}>
                  <div className="group bg-white rounded-3xl p-7 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                    <div className="w-12 h-12 rounded-2xl bg-[#2a66b0]/10 flex items-center justify-center mb-5 group-hover:bg-[#2a66b0] transition-colors duration-300">
                      <Icon className="w-5 h-5 text-[#2a66b0] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-base mb-2">{title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            MISSION · VISION · VALUES
        ══════════════════════════════════════ */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute rounded-full opacity-20"
              style={{ background: "radial-gradient(circle, #dbeafe 0%, transparent 70%)", width: 500, height: 500, top: "-10%", right: "-5%" }} />
          </div>

          <div className="container mx-auto px-6 relative z-10">

            <AnimatedSection className="mb-14">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2a66b0]" />
                    <span className="text-xs font-semibold text-[#2a66b0] uppercase tracking-widest">What Drives Us</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                    Mission, Vision<br className="hidden md:block" /> & Values
                  </h2>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs md:text-right">
                  The principles that guide every interaction and decision at MintexCare.
                </p>
              </div>
              <div className="mt-8 h-px bg-gray-100" />
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-6">

              {/* Mission */}
              <AnimatedSection delay={0}>
                <div className="svc-card-wrapper h-full" style={{ "--icon-color": "#2a66b0" } as React.CSSProperties}>
                  <div className="svc-card group relative rounded-2xl p-8 border border-gray-100 h-full flex flex-col bg-[#f4f6f8] overflow-hidden hover:border-transparent hover:shadow-xl transition-all duration-500">
                    {/* Blue gradient overlay on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl z-0"
                      style={{ background: "linear-gradient(135deg, #2a66b0 0%, #1a4a8a 100%)" }} />
                    <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-[#2a66b0] z-10" />
                    <span className="pointer-events-none select-none absolute -bottom-4 right-4 text-[120px] font-bold text-gray-200/30 group-hover:text-white/5 leading-none transition-colors duration-500 z-[1]">M</span>
                    <div className="svc-icon-box mb-7 relative z-[1]" style={{ "--icon-color": "#2a66b0", "--icon-bg": "rgba(42,102,176,0.08)" } as React.CSSProperties}>
                      <Target className="icon-svg w-7 h-7 text-[#2a66b0] group-hover:text-white transition-colors duration-500" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-[17px] leading-snug mb-3 group-hover:text-white transition-colors duration-500 relative z-[1]">Mission</h3>
                    <p className="text-sm text-gray-500 leading-relaxed flex-1 group-hover:text-white/75 transition-colors duration-500 relative z-[1]">
                      To deliver exceptional, client-centered home care services that promote independence,
                      dignity, and peace of mind for our clients and their families.
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              {/* Vision */}
              <AnimatedSection delay={0.1}>
                <div className="svc-card-wrapper h-full" style={{ "--icon-color": "#0891b2" } as React.CSSProperties}>
                  <div className="svc-card group relative rounded-2xl p-8 border border-gray-100 h-full flex flex-col bg-[#f4f6f8] overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-[#0891b2]" />
                    <span className="pointer-events-none select-none absolute -bottom-4 right-4 text-[120px] font-bold text-gray-200/30 leading-none">V</span>
                    <div className="svc-icon-box mb-7" style={{ "--icon-color": "#0891b2", "--icon-bg": "rgba(8,145,178,0.08)" } as React.CSSProperties}>
                      <Eye className="icon-svg w-7 h-7" style={{ color: "#0891b2" }} />
                    </div>
                    <h3 className="font-bold text-gray-900 text-[17px] leading-snug mb-3">Vision</h3>
                    <p className="text-sm text-gray-500 leading-relaxed flex-1">
                      To be the most trusted home care provider in New Jersey, known for compassion,
                      reliability, and excellence in care — transforming lives one family at a time.
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              {/* Values */}
              <AnimatedSection delay={0.2}>
                <div className="svc-card-wrapper h-full" style={{ "--icon-color": "#14b8a6" } as React.CSSProperties}>
                  <div className="svc-card group relative rounded-2xl p-8 border border-gray-100 h-full flex flex-col bg-[#f4f6f8] overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-[#14b8a6]" />
                    <span className="pointer-events-none select-none absolute -bottom-4 right-4 text-[120px] font-bold text-gray-200/30 leading-none">V</span>
                    <div className="svc-icon-box mb-7" style={{ "--icon-color": "#14b8a6", "--icon-bg": "rgba(20,184,166,0.08)" } as React.CSSProperties}>
                      <Heart className="icon-svg w-7 h-7" style={{ color: "#14b8a6" }} />
                    </div>
                    <h3 className="font-bold text-gray-900 text-[17px] leading-snug mb-5">Values</h3>
                    <div className="space-y-3 flex-1">
                      {values.map(({ label, desc }) => (
                        <div key={label} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-[#2a66b0]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle className="h-3 w-3 text-[#2a66b0]" />
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-gray-900">{label} </span>
                            <span className="text-xs text-gray-500">— {desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
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
          <section className="py-24 bg-gray-50 relative overflow-hidden">
            <div className="container mx-auto px-6">

              <AnimatedSection className="mb-14">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-white border border-blue-100 rounded-full px-4 py-1.5 mb-5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2a66b0]" />
                      <span className="text-xs font-semibold text-[#2a66b0] uppercase tracking-widest">The People</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                      Meet Our Team
                    </h2>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-xs md:text-right">
                    Dedicated professionals who bring expertise and heart to every interaction.
                  </p>
                </div>
                <div className="mt-8 h-px bg-gray-200" />
              </AnimatedSection>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {teamMembers.map((m, i) => (
                  <AnimatedSection key={m.id} delay={i * 0.1} className="h-full">
                    <div className="group relative rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 h-full">
                      {/* Top accent bar */}
                      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#2a66b0] to-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-10" />

                      {/* Image */}
                      <div className="relative overflow-hidden h-60">
                        <img
                          src={m.photoUrl}
                          alt={m.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0"
                          style={{ background: "linear-gradient(to top, rgba(255,255,255,0.85) 0%, transparent 50%)" }} />
                      </div>

                      {/* Content */}
                      <div className="p-6 relative">
                        <div className="absolute -top-6 right-5 w-12 h-12 rounded-full bg-[#2a66b0] flex items-center justify-center shadow-lg border-2 border-white">
                          <Users className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="font-bold text-gray-900 text-lg leading-snug">{m.name}</h3>
                        <p className="text-sm text-[#2a66b0] font-semibold mb-3">{m.role}</p>
                        <div className="h-px bg-gray-100 mb-3" />
                        <p className="text-sm text-gray-500 leading-relaxed">{m.bio}</p>
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
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <AnimatedSection>
              <div className="relative rounded-3xl overflow-hidden px-6 py-12 sm:px-10 sm:py-16 md:px-16"
                style={{ background: "linear-gradient(135deg, #1d4f8c 0%, #2a66b0 55%, #0891b2 100%)" }}>
                <div className="pointer-events-none absolute top-0 right-0 w-72 h-72 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/4" />
                <div className="pointer-events-none absolute bottom-0 left-0 w-52 h-52 rounded-full bg-white/8 translate-y-1/2 -translate-x-1/4" />

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5 mb-4">
                      <Award className="w-3.5 h-3.5 text-white" />
                      <span className="text-xs font-semibold text-white uppercase tracking-widest">Licensed & Insured</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug mb-3">
                      Ready to Experience the<br className="hidden md:block" /> MintexCare Difference?
                    </h2>
                    <p className="text-white/75 text-sm max-w-md leading-relaxed">
                      Our care coordinators are ready to build a personalized plan for your loved one — at no obligation.
                    </p>
                  </div>
                  <Link to="/contact"
                    className="shrink-0 inline-flex items-center gap-2 font-bold text-sm px-9 py-4 rounded-full transition-all hover:scale-105 whitespace-nowrap"
                    style={{ background: "linear-gradient(135deg, hsl(214 66% 44%) 0%, hsl(192 91% 37%) 100%)", border: "1px solid rgba(255,255,255,0.3)", boxShadow: "0 2px 12px rgba(38,104,188,0.30), inset 0 1px 0 rgba(255,255,255,0.25)", color: "#fff" }}>
                    Get in Touch <ArrowRight className="h-4 w-4" />
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
    </>
  );
};

export default About;