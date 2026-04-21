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




const About = () => {
  const { teamMembers, siteImages } = useAdmin();

  return (
    <>
      <Header />
      <main className="bg-background overflow-x-hidden">

        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section className="relative pt-32 pb-20 bg-background overflow-hidden">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Gradient blobs */}
            <div className="absolute rounded-full deco-drift" style={{ background: "radial-gradient(circle, #bfdbfe 0%, transparent 70%)", width: 600, height: 600, top: "-15%", right: "-10%", opacity: 0.7 }} />
            <div className="absolute rounded-full deco-float-down" style={{ background: "radial-gradient(circle, #a7f3d0 0%, transparent 70%)", width: 400, height: 400, bottom: "-10%", left: "-8%", opacity: 0.6 }} />
            <div className="absolute rounded-full deco-float-up" style={{ background: "radial-gradient(circle, #c7d2fe 0%, transparent 70%)", width: 300, height: 300, top: "15%", left: "25%", opacity: 0.4 }} />

            {/* Colored block behind image */}
            <div className="absolute top-20 right-0 w-[44%] h-[75%] rounded-3xl bg-[#2a66b0]/[0.04] hidden lg:block" />

            {/* Dot grid */}
            <div className="absolute top-20 left-6 hidden lg:grid grid-cols-6 gap-3">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={`hd1-${i}`} className="w-1.5 h-1.5 rounded-full bg-[#2a66b0]/15" />
              ))}
            </div>

            {/* Circle outlines */}
            <div className="absolute top-[12%] right-[14%] w-44 h-44 rounded-full border-2 border-[#2a66b0]/[0.08] deco-spin-slow hidden lg:block" />
            <div className="absolute bottom-[8%] left-[6%] w-28 h-28 rounded-full border-[3px] border-dashed border-[#2a66b0]/[0.1] deco-spin-slow hidden lg:block" style={{ animationDirection: "reverse" }} />

            {/* Plus shape */}
            <div className="absolute top-[38%] left-[4%] hidden lg:block deco-float-up">
              <div className="w-8 h-[2px] bg-[#2a66b0]/20 absolute top-1/2 -translate-y-1/2" />
              <div className="w-[2px] h-8 bg-[#2a66b0]/20 absolute left-1/2 -translate-x-1/2" />
            </div>

            {/* Diamond */}
            <div className="absolute bottom-[18%] right-[24%] w-6 h-6 border-2 border-[#0891b2]/15 rotate-45 deco-drift hidden lg:block" />

            {/* SVG wave */}
            <svg className="absolute bottom-0 left-0 w-full h-16 opacity-[0.06]" viewBox="0 0 1440 64" preserveAspectRatio="none">
              <path d="M0,32 C360,64 720,0 1080,32 C1260,48 1380,16 1440,32 L1440,64 L0,64 Z" fill="#2a66b0" />
            </svg>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">

              {/* LEFT: Text */}
              <AnimatedSection from="left">
                <p className="text-sm text-gray-400 mb-8 flex items-center gap-2">
                  <Link to="/" className="hover:text-[#2a66b0] transition-colors">Home</Link>
                  <span className="text-gray-300">/</span>
                  <span className="text-[#2a66b0] font-medium">About Us</span>
                </p>

                <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2a66b0]" />
                  <span className="text-xs font-semibold text-[#2a66b0] uppercase tracking-widest">Who We Are</span>
                </div>

                <h1 className="font-bold text-gray-900 leading-[1.07] mb-5"
                  style={{ fontSize: "clamp(2.4rem, 5vw, 3.5rem)" }}>
                  Caring for NJ Families<br />
                  <span className="text-[#2a66b0]">Since 2014</span>
                </h1>

                <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-8 max-w-[500px]">
                  MintexCare is a trusted home healthcare agency based in New Jersey,
                  dedicated to providing compassionate, high-quality care to individuals
                  in the comfort of their own homes.
                </p>

                <div className="flex flex-wrap gap-3 mb-10">
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
                <div className="relative rounded-3xl overflow-hidden shadow-2xl"
                  style={{ aspectRatio: "4/5", maxHeight: 560 }}>
                  <img
                    src={siteImages.aboutPageHero}
                    alt="MintexCare caregiver with patient"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(10,30,60,0.6) 0%, transparent 50%)" }} />
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <p className="text-white/70 text-xs uppercase tracking-widest mb-1 font-semibold">Our Promise</p>
                    <p className="text-white font-bold text-lg leading-snug">
                      Dignified, personalized care<br />in the comfort of home.
                    </p>
                  </div>
                </div>

                {/* Floating: experience badge */}
                <div className="absolute top-2 right-2 md:-top-5 md:-right-6 bg-card rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3 border border-border z-10">
                  <div className="w-11 h-11 rounded-xl bg-[#2a66b0] flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 leading-none">10+</p>
                    <p className="text-xs text-gray-500 mt-0.5 whitespace-nowrap">Years of Excellence</p>
                  </div>
                </div>

                {/* Floating: families served */}
                <div className="absolute bottom-2 left-2 md:-bottom-5 md:-left-6 bg-card rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3 border border-border z-10">
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
        <section className="py-6 bg-muted/50 border-y border-border">
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
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Gradient blobs */}
            <div className="absolute rounded-full deco-float-down" style={{ background: "radial-gradient(circle, #bfdbfe 0%, transparent 70%)", width: 500, height: 500, bottom: "-14%", right: "-10%", opacity: 0.6 }} />
            <div className="absolute rounded-full deco-drift" style={{ background: "radial-gradient(circle, #bae6fd 0%, transparent 70%)", width: 400, height: 400, top: "-12%", left: "-6%", opacity: 0.5 }} />

            {/* Colored block */}
            <div className="absolute top-10 left-0 w-[42%] h-[80%] rounded-3xl bg-[#2a66b0]/[0.03] hidden lg:block" />

            {/* Dot grid */}
            <div className="absolute bottom-8 right-6 hidden lg:grid grid-cols-5 gap-3">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={`sd2-${i}`} className="w-1.5 h-1.5 rounded-full bg-[#0891b2]/12" />
              ))}
            </div>

            {/* Circle outlines */}
            <div className="absolute bottom-14 left-[40%] w-32 h-32 rounded-full border-[3px] border-dashed border-[#2a66b0]/[0.1] deco-spin-slow hidden lg:block" />
            <div className="absolute top-16 right-[10%] w-24 h-24 rounded-full border-2 border-[#0891b2]/[0.08] deco-float-up hidden lg:block" />

            {/* Plus shape */}
            <div className="absolute bottom-[28%] right-[7%] hidden lg:block deco-float-up">
              <div className="w-8 h-[2px] bg-[#2a66b0]/18 absolute top-1/2 -translate-y-1/2" />
              <div className="w-[2px] h-8 bg-[#2a66b0]/18 absolute left-1/2 -translate-x-1/2" />
            </div>

            {/* Diamond */}
            <div className="absolute top-[32%] left-[46%] w-5 h-5 border-2 border-[#14b8a6]/12 rotate-45 deco-drift hidden lg:block" />

            {/* SVG wave */}
            <svg className="absolute top-0 left-0 w-full h-12 opacity-[0.05]" viewBox="0 0 1440 48" preserveAspectRatio="none">
              <path d="M0,24 C480,48 960,0 1440,24 L1440,0 L0,0 Z" fill="#0891b2" />
            </svg>
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

                <div className="absolute bottom-2 right-2 md:-bottom-5 md:-right-6 bg-card border border-border rounded-2xl shadow-xl p-4 flex items-center gap-3 z-10">
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

                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-5">
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
            MISSION · VISION · VALUES
        ══════════════════════════════════════ */}
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Gradient blobs */}
            <div className="absolute rounded-full deco-float-up" style={{ background: "radial-gradient(circle, #bfdbfe 0%, transparent 70%)", width: 500, height: 500, top: "-14%", right: "-9%", opacity: 0.6 }} />
            <div className="absolute rounded-full deco-drift" style={{ background: "radial-gradient(circle, #c7d2fe 0%, transparent 70%)", width: 380, height: 380, bottom: "-10%", left: "-6%", opacity: 0.45 }} />
            <div className="absolute rounded-full deco-float-down" style={{ background: "radial-gradient(circle, #a7f3d0 0%, transparent 70%)", width: 280, height: 280, top: "28%", left: "45%", opacity: 0.35 }} />

            {/* Dot grid */}
            <div className="absolute bottom-12 right-6 hidden lg:grid grid-cols-5 gap-3">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={`md-${i}`} className="w-1.5 h-1.5 rounded-full bg-[#14b8a6]/12" />
              ))}
            </div>

            {/* Circle outlines */}
            <div className="absolute -bottom-16 -right-10 w-60 h-60 rounded-full border-2 border-[#2a66b0]/[0.07] deco-spin-slow hidden lg:block" />
            <div className="absolute top-14 right-[28%] w-28 h-28 rounded-full border-[3px] border-dashed border-[#0891b2]/[0.1] deco-spin-slow hidden lg:block" style={{ animationDirection: "reverse", animationDuration: "25s" }} />

            {/* Plus shape */}
            <div className="absolute top-[58%] right-[5%] hidden lg:block deco-float-up">
              <div className="w-8 h-[2px] bg-[#14b8a6]/18 absolute top-1/2 -translate-y-1/2" />
              <div className="w-[2px] h-8 bg-[#14b8a6]/18 absolute left-1/2 -translate-x-1/2" />
            </div>

            {/* Diamond */}
            <div className="absolute bottom-[13%] right-[16%] w-6 h-6 border-2 border-[#2a66b0]/12 rotate-45 deco-drift hidden lg:block" />

            {/* Solid circle */}
            <div className="absolute top-[48%] left-[20%] w-4 h-4 rounded-full bg-[#2a66b0]/10 deco-float-down hidden lg:block" />

            {/* SVG waves */}
            <svg className="absolute top-0 left-0 w-full h-12 opacity-[0.04]" viewBox="0 0 1440 48" preserveAspectRatio="none">
              <path d="M0,24 C240,0 480,48 720,24 C960,0 1200,48 1440,24 L1440,0 L0,0 Z" fill="#14b8a6" />
            </svg>
          </div>

          <div className="container mx-auto px-6 relative z-10">

            <AnimatedSection className="mb-14">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2a66b0]" />
                    <span className="text-xs font-semibold text-[#2a66b0] uppercase tracking-widest">What Drives Us</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
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
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl z-0"
                      style={{ background: "linear-gradient(135deg, #2a66b0 0%, #1a4a8a 100%)" }} />
                    <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-[#2a66b0] z-10" />
                    <span className="pointer-events-none select-none absolute -bottom-4 right-4 text-[100px] font-bold text-gray-200/20 group-hover:text-white/5 leading-none transition-colors duration-500 z-[1]">M</span>
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
                  <div className="svc-card group relative rounded-2xl p-8 border border-gray-100 h-full flex flex-col bg-[#f4f6f8] overflow-hidden hover:border-transparent hover:shadow-xl transition-all duration-500">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl z-0"
                      style={{ background: "linear-gradient(135deg, #0891b2 0%, #066a82 100%)" }} />
                    <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-[#0891b2] z-10" />
                    <span className="pointer-events-none select-none absolute -bottom-4 right-4 text-[100px] font-bold text-gray-200/20 group-hover:text-white/5 leading-none transition-colors duration-500 z-[1]">V</span>
                    <div className="svc-icon-box mb-7 relative z-[1]" style={{ "--icon-color": "#0891b2", "--icon-bg": "rgba(8,145,178,0.08)" } as React.CSSProperties}>
                      <Eye className="icon-svg w-7 h-7 text-[#0891b2] group-hover:text-white transition-colors duration-500" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-[17px] leading-snug mb-3 group-hover:text-white transition-colors duration-500 relative z-[1]">Vision</h3>
                    <p className="text-sm text-gray-500 leading-relaxed flex-1 group-hover:text-white/75 transition-colors duration-500 relative z-[1]">
                      To be the most trusted home care provider in New Jersey, known for compassion,
                      reliability, and excellence in care — transforming lives one family at a time.
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              {/* Values */}
              <AnimatedSection delay={0.2}>
                <div className="svc-card-wrapper h-full" style={{ "--icon-color": "#14b8a6" } as React.CSSProperties}>
                  <div className="svc-card group relative rounded-2xl p-8 border border-gray-100 h-full flex flex-col bg-[#f4f6f8] overflow-hidden hover:border-transparent hover:shadow-xl transition-all duration-500">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl z-0"
                      style={{ background: "linear-gradient(135deg, #14b8a6 0%, #0d8a7c 100%)" }} />
                    <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-[#14b8a6] z-10" />
                    <span className="pointer-events-none select-none absolute -bottom-4 right-4 text-[100px] font-bold text-gray-200/20 group-hover:text-white/5 leading-none transition-colors duration-500 z-[1]">V</span>
                    <div className="svc-icon-box mb-7 relative z-[1]" style={{ "--icon-color": "#14b8a6", "--icon-bg": "rgba(20,184,166,0.08)" } as React.CSSProperties}>
                      <Heart className="icon-svg w-7 h-7 text-[#14b8a6] group-hover:text-white transition-colors duration-500" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-[17px] leading-snug mb-5 group-hover:text-white transition-colors duration-500 relative z-[1]">Values</h3>
                    <div className="space-y-3 flex-1 relative z-[1]">
                      {values.map(({ label, desc }) => (
                        <div key={label} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-[#14b8a6]/10 group-hover:bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-500">
                            <CheckCircle className="h-3 w-3 text-[#14b8a6] group-hover:text-white transition-colors duration-500" />
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-gray-900 group-hover:text-white transition-colors duration-500">{label} </span>
                            <span className="text-xs text-gray-500 group-hover:text-white/75 transition-colors duration-500">— {desc}</span>
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
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {/* Gradient blobs */}
              <div className="absolute rounded-full deco-float-up" style={{ background: "radial-gradient(circle, #dbeafe 0%, transparent 70%)", width: 400, height: 400, top: "-12%", right: "-7%", opacity: 0.4 }} />
              <div className="absolute rounded-full deco-drift" style={{ background: "radial-gradient(circle, #e0f2fe 0%, transparent 70%)", width: 300, height: 300, bottom: "-8%", left: "-4%", opacity: 0.35 }} />

              {/* Dot grid */}
              <div className="absolute bottom-10 right-8 hidden lg:grid grid-cols-5 gap-3">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={`td-${i}`} className="w-1.5 h-1.5 rounded-full bg-[#2a66b0]/15" />
                ))}
              </div>

              {/* Circle */}
              <div className="absolute top-14 left-[10%] w-28 h-28 rounded-full border-[3px] border-dashed border-[#2a66b0]/8 deco-spin-slow hidden lg:block" />
              <div className="absolute bottom-[20%] right-[12%] w-20 h-20 rounded-full border-2 border-[#0891b2]/[0.06] deco-float-up hidden lg:block" />

              {/* Plus shape */}
              <div className="absolute top-[55%] right-[5%] hidden lg:block deco-float-up">
                <div className="w-6 h-[2px] bg-[#2a66b0]/15 absolute top-1/2 -translate-y-1/2" />
                <div className="w-[2px] h-6 bg-[#2a66b0]/15 absolute left-1/2 -translate-x-1/2" />
              </div>

              {/* Diamond */}
              <div className="absolute top-[30%] left-[5%] w-4 h-4 border-2 border-[#14b8a6]/10 rotate-45 deco-drift hidden lg:block" />
            </div>

            <div className="container mx-auto px-6 relative z-10">

              <AnimatedSection className="mb-14">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-1.5 mb-5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2a66b0]" />
                      <span className="text-xs font-semibold text-[#2a66b0] uppercase tracking-widest">The People</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
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
                    <div className="group relative rounded-3xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 h-full">
                      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#2a66b0] to-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-10" />

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
        <section className="py-20 bg-background relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute rounded-full deco-float-up" style={{ background: "radial-gradient(circle, #dbeafe 0%, transparent 70%)", width: 300, height: 300, top: "-18%", right: "-5%", opacity: 0.35 }} />
            <div className="absolute rounded-full deco-drift" style={{ background: "radial-gradient(circle, #e0f2fe 0%, transparent 70%)", width: 250, height: 250, bottom: "-12%", left: "-4%", opacity: 0.3 }} />
            {/* Circle */}
            <div className="absolute top-[30%] left-[5%] w-16 h-16 rounded-full border-2 border-[#2a66b0]/[0.06] deco-float-up hidden lg:block" />
            {/* Diamond */}
            <div className="absolute bottom-[25%] right-[8%] w-4 h-4 border-2 border-[#0891b2]/10 rotate-45 deco-drift hidden lg:block" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <AnimatedSection>
              <div className="relative rounded-3xl overflow-hidden px-6 py-12 sm:px-10 sm:py-16 md:px-16"
                style={{ background: "linear-gradient(135deg, #1d4f8c 0%, #2a66b0 55%, #0891b2 100%)" }}>
                <div className="pointer-events-none absolute top-0 right-0 w-72 h-72 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/4" />
                <div className="pointer-events-none absolute bottom-0 left-0 w-52 h-52 rounded-full bg-white/[0.08] translate-y-1/2 -translate-x-1/4" />

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5 mb-4">
                      <Award className="w-3.5 h-3.5 text-white" />
                      <span className="text-xs font-semibold text-white uppercase tracking-widest">Licensed & Insured</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug mb-3">
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