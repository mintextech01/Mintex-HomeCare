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
          {/* Background decorative elements */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Large gradient blobs */}
            <div className="absolute rounded-full deco-drift" style={{ background: "radial-gradient(circle, #bfdbfe 0%, transparent 70%)", width: 700, height: 700, top: "-15%", right: "-10%", opacity: 0.9 }} />
            <div className="absolute rounded-full deco-float-down" style={{ background: "radial-gradient(circle, #a7f3d0 0%, transparent 70%)", width: 500, height: 500, bottom: "-10%", left: "-8%", opacity: 0.8 }} />
            <div className="absolute rounded-full deco-float-up" style={{ background: "radial-gradient(circle, #c7d2fe 0%, transparent 70%)", width: 400, height: 400, top: "15%", left: "25%", opacity: 0.6 }} />
            <div className="absolute rounded-full deco-pulse" style={{ background: "radial-gradient(circle, #fbcfe8 0%, transparent 70%)", width: 300, height: 300, top: "55%", right: "8%", opacity: 0.5 }} />
            <div className="absolute rounded-full deco-float-up" style={{ background: "radial-gradient(circle, #bae6fd 0%, transparent 70%)", width: 250, height: 250, top: "5%", left: "52%", opacity: 0.55 }} />

            {/* Colored block behind image */}
            <div className="absolute top-20 right-0 w-[44%] h-[75%] rounded-3xl bg-[#2a66b0]/[0.04] hidden lg:block" />

            {/* Dot grids — bold */}
            <div className="absolute top-20 left-6 hidden lg:grid grid-cols-8 gap-3">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={`hd1-${i}`} className="w-2 h-2 rounded-full bg-[#2a66b0]/20" />
              ))}
            </div>
            <div className="absolute bottom-12 right-8 hidden lg:grid grid-cols-7 gap-3">
              {Array.from({ length: 35 }).map((_, i) => (
                <div key={`hd2-${i}`} className="w-2.5 h-2.5 rounded-full bg-[#0891b2]/15" />
              ))}
            </div>
            <div className="absolute top-[48%] right-[2%] hidden lg:grid grid-cols-4 gap-2.5">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={`hd3-${i}`} className="w-2 h-2 rounded-full bg-[#14b8a6]/20" />
              ))}
            </div>

            {/* Bold circle outlines */}
            <div className="absolute top-[12%] right-[14%] w-52 h-52 rounded-full border-[3px] border-[#2a66b0]/[0.12] deco-spin-slow hidden lg:block" />
            <div className="absolute bottom-[8%] left-[6%] w-36 h-36 rounded-full border-[4px] border-dashed border-[#2a66b0]/[0.15] deco-spin-slow hidden lg:block" style={{ animationDirection: "reverse" }} />
            <div className="absolute top-[55%] left-[38%] w-24 h-24 rounded-full border-[3px] border-[#0891b2]/[0.1] deco-float-up hidden lg:block" />
            <div className="absolute top-[6%] left-[16%] w-44 h-44 rounded-full border-2 border-[#2a66b0]/[0.08] hidden lg:block" />
            <div className="absolute bottom-[22%] right-[36%] w-20 h-20 rounded-full border-[3px] border-dashed border-[#14b8a6]/[0.12] deco-drift hidden lg:block" />

            {/* Plus shapes — bigger */}
            <div className="absolute top-[38%] left-[4%] hidden lg:block deco-float-up">
              <div className="w-10 h-[3px] bg-[#2a66b0]/25 absolute top-1/2 -translate-y-1/2" />
              <div className="w-[3px] h-10 bg-[#2a66b0]/25 absolute left-1/2 -translate-x-1/2" />
            </div>
            <div className="absolute bottom-[32%] right-[10%] hidden lg:block deco-float-down">
              <div className="w-8 h-[3px] bg-[#0891b2]/20 absolute top-1/2 -translate-y-1/2" />
              <div className="w-[3px] h-8 bg-[#0891b2]/20 absolute left-1/2 -translate-x-1/2" />
            </div>
            <div className="absolute top-[68%] left-[22%] hidden lg:block">
              <div className="w-6 h-[2px] bg-[#14b8a6]/20 absolute top-1/2 -translate-y-1/2" />
              <div className="w-[2px] h-6 bg-[#14b8a6]/20 absolute left-1/2 -translate-x-1/2" />
            </div>

            {/* Diamonds — bolder */}
            <div className="absolute bottom-[18%] right-[24%] w-8 h-8 border-[3px] border-[#0891b2]/20 rotate-45 deco-drift hidden lg:block" />
            <div className="absolute top-[24%] left-[46%] w-6 h-6 border-[3px] border-[#2a66b0]/15 rotate-45 deco-float-up hidden lg:block" />
            <div className="absolute top-[62%] right-[28%] w-5 h-5 bg-[#14b8a6]/10 rotate-45 hidden lg:block" />

            {/* Lines — thicker */}
            <div className="absolute top-[28%] right-0 w-40 h-[3px] bg-gradient-to-l from-[#2a66b0]/20 to-transparent hidden lg:block" />
            <div className="absolute bottom-[12%] left-0 w-32 h-[3px] bg-gradient-to-r from-[#0891b2]/18 to-transparent hidden lg:block" />
            <div className="absolute top-0 left-[60%] w-[3px] h-28 bg-gradient-to-b from-[#2a66b0]/15 to-transparent hidden lg:block" />
            <div className="absolute bottom-0 right-[16%] w-[3px] h-24 bg-gradient-to-t from-[#14b8a6]/12 to-transparent hidden lg:block" />

            {/* Solid circles — bigger */}
            <div className="absolute top-[33%] left-[40%] w-6 h-6 rounded-full bg-[#2a66b0]/12 deco-float-down hidden lg:block" />
            <div className="absolute bottom-[26%] left-[13%] w-5 h-5 rounded-full bg-[#0891b2]/15 deco-float-up hidden lg:block" />
            <div className="absolute top-[16%] right-[33%] w-4 h-4 rounded-full bg-[#14b8a6]/12 hidden lg:block" />
            <div className="absolute top-[73%] right-[4%] w-5 h-5 rounded-full bg-[#2a66b0]/10 deco-pulse hidden lg:block" />

            {/* SVG wave */}
            <svg className="absolute bottom-0 left-0 w-full h-20 opacity-[0.08]" viewBox="0 0 1440 80" preserveAspectRatio="none">
              <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,20 1440,40 L1440,80 L0,80 Z" fill="#2a66b0" />
            </svg>

            {/* Triangles — visible */}
            <div className="absolute top-[20%] right-[7%] hidden lg:block deco-float-up">
              <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[26px] border-b-[#2a66b0]/15" />
            </div>
            <div className="absolute bottom-[38%] left-[33%] hidden lg:block">
              <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[20px] border-b-[#0891b2]/12" />
            </div>
          </div>

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
        <section className="py-6 bg-white border-y border-gray-100 relative overflow-hidden">
          {/* Subtle background accents */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute rounded-full" style={{ background: "radial-gradient(circle, #dbeafe 0%, transparent 70%)", width: 300, height: 300, top: "-50%", left: "10%", opacity: 0.35 }} />
            <div className="absolute rounded-full" style={{ background: "radial-gradient(circle, #ccfbf1 0%, transparent 70%)", width: 250, height: 250, bottom: "-50%", right: "15%", opacity: 0.3 }} />
          </div>
          <div className="container mx-auto px-6 relative z-10">
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
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Bold gradient blobs */}
            <div className="absolute rounded-full deco-float-down" style={{ background: "radial-gradient(circle, #bfdbfe 0%, transparent 70%)", width: 550, height: 550, bottom: "-14%", right: "-10%", opacity: 0.85 }} />
            <div className="absolute rounded-full deco-drift" style={{ background: "radial-gradient(circle, #bae6fd 0%, transparent 70%)", width: 450, height: 450, top: "-12%", left: "-6%", opacity: 0.75 }} />
            <div className="absolute rounded-full deco-float-up" style={{ background: "radial-gradient(circle, #a7f3d0 0%, transparent 70%)", width: 350, height: 350, top: "40%", right: "15%", opacity: 0.6 }} />
            <div className="absolute rounded-full deco-pulse" style={{ background: "radial-gradient(circle, #c7d2fe 0%, transparent 70%)", width: 280, height: 280, top: "8%", left: "42%", opacity: 0.5 }} />

            {/* Colored block */}
            <div className="absolute top-10 left-0 w-[42%] h-[80%] rounded-3xl bg-[#2a66b0]/[0.03] hidden lg:block" />

            {/* Dot grids */}
            <div className="absolute top-10 left-4 hidden lg:grid grid-cols-7 gap-3">
              {Array.from({ length: 42 }).map((_, i) => (
                <div key={`sd-${i}`} className="w-2 h-2 rounded-full bg-[#2a66b0]/15" />
              ))}
            </div>
            <div className="absolute bottom-8 right-6 hidden lg:grid grid-cols-6 gap-3">
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={`sd2-${i}`} className="w-2.5 h-2.5 rounded-full bg-[#0891b2]/12" />
              ))}
            </div>

            {/* Bold circles */}
            <div className="absolute bottom-14 left-[40%] w-40 h-40 rounded-full border-[4px] border-dashed border-[#2a66b0]/[0.15] deco-spin-slow hidden lg:block" />
            <div className="absolute top-16 right-[10%] w-28 h-28 rounded-full border-[3px] border-[#0891b2]/[0.12] deco-float-up hidden lg:block" />
            <div className="absolute top-[60%] left-[6%] w-20 h-20 rounded-full border-[3px] border-[#14b8a6]/[0.1] deco-drift hidden lg:block" />

            {/* Plus shapes */}
            <div className="absolute bottom-[28%] right-[7%] hidden lg:block deco-float-up">
              <div className="w-10 h-[3px] bg-[#2a66b0]/20 absolute top-1/2 -translate-y-1/2" />
              <div className="w-[3px] h-10 bg-[#2a66b0]/20 absolute left-1/2 -translate-x-1/2" />
            </div>

            {/* Diamonds */}
            <div className="absolute top-[32%] left-[46%] w-7 h-7 border-[3px] border-[#14b8a6]/15 rotate-45 deco-drift hidden lg:block" />
            <div className="absolute bottom-[16%] right-[20%] w-6 h-6 border-[3px] border-[#2a66b0]/12 rotate-45 deco-float-up hidden lg:block" />

            {/* Lines */}
            <div className="absolute bottom-[12%] left-0 w-36 h-[3px] bg-gradient-to-r from-[#2a66b0]/18 to-transparent hidden lg:block" />
            <div className="absolute top-[48%] right-0 w-28 h-[3px] bg-gradient-to-l from-[#0891b2]/15 to-transparent hidden lg:block" />
            <div className="absolute top-0 left-[53%] w-[3px] h-24 bg-gradient-to-b from-[#2a66b0]/15 to-transparent hidden lg:block" />

            {/* Solid circles */}
            <div className="absolute top-[22%] left-[36%] w-6 h-6 rounded-full bg-[#2a66b0]/10 deco-float-down hidden lg:block" />
            <div className="absolute bottom-[20%] right-[13%] w-5 h-5 rounded-full bg-[#0891b2]/12 deco-pulse hidden lg:block" />

            {/* Triangles */}
            <div className="absolute top-[13%] right-[5%] hidden lg:block deco-float-up">
              <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-b-[22px] border-b-[#2a66b0]/12" />
            </div>

            {/* SVG wave */}
            <svg className="absolute top-0 left-0 w-full h-16 opacity-[0.07]" viewBox="0 0 1440 64" preserveAspectRatio="none">
              <path d="M0,32 C480,64 960,0 1440,32 L1440,0 L0,0 Z" fill="#0891b2" />
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
        <section className="py-20 bg-gray-50 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Bold gradient blobs */}
            <div className="absolute rounded-full deco-drift" style={{ background: "radial-gradient(circle, #bfdbfe 0%, transparent 70%)", width: 550, height: 550, top: "-16%", left: "-10%", opacity: 0.8 }} />
            <div className="absolute rounded-full deco-float-up" style={{ background: "radial-gradient(circle, #a7f3d0 0%, transparent 70%)", width: 420, height: 420, bottom: "-12%", right: "-6%", opacity: 0.7 }} />
            <div className="absolute rounded-full deco-float-down" style={{ background: "radial-gradient(circle, #c7d2fe 0%, transparent 70%)", width: 300, height: 300, top: "28%", left: "48%", opacity: 0.5 }} />
            <div className="absolute rounded-full deco-pulse" style={{ background: "radial-gradient(circle, #fbcfe8 0%, transparent 70%)", width: 240, height: 240, top: "55%", left: "8%", opacity: 0.4 }} />

            {/* Dot grids */}
            <div className="absolute top-8 right-8 hidden lg:grid grid-cols-8 gap-2.5">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={`wd-${i}`} className="w-2 h-2 rounded-full bg-[#2a66b0]/15" />
              ))}
            </div>
            <div className="absolute bottom-8 left-6 hidden lg:grid grid-cols-6 gap-3">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={`wd2-${i}`} className="w-2.5 h-2.5 rounded-full bg-[#0891b2]/12" />
              ))}
            </div>

            {/* Bold circles */}
            <div className="absolute -top-16 right-[18%] w-64 h-64 rounded-full border-[3px] border-[#2a66b0]/[0.1] deco-spin-slow hidden lg:block" />
            <div className="absolute bottom-10 left-[13%] w-32 h-32 rounded-full border-[4px] border-dashed border-[#0891b2]/[0.15] deco-spin-slow hidden lg:block" style={{ animationDirection: "reverse" }} />
            <div className="absolute top-[48%] right-[6%] w-24 h-24 rounded-full border-[3px] border-[#14b8a6]/[0.1] deco-float-up hidden lg:block" />

            {/* Plus shapes */}
            <div className="absolute top-[42%] left-[5%] hidden lg:block deco-float-up">
              <div className="w-10 h-[3px] bg-[#2a66b0]/22 absolute top-1/2 -translate-y-1/2" />
              <div className="w-[3px] h-10 bg-[#2a66b0]/22 absolute left-1/2 -translate-x-1/2" />
            </div>
            <div className="absolute bottom-[18%] right-[13%] hidden lg:block deco-float-down">
              <div className="w-8 h-[3px] bg-[#0891b2]/18 absolute top-1/2 -translate-y-1/2" />
              <div className="w-[3px] h-8 bg-[#0891b2]/18 absolute left-1/2 -translate-x-1/2" />
            </div>

            {/* Diamonds */}
            <div className="absolute top-[18%] right-[9%] w-8 h-8 border-[3px] border-[#2a66b0]/15 rotate-45 deco-drift hidden lg:block" />
            <div className="absolute bottom-[35%] left-[28%] w-6 h-6 border-[3px] border-[#14b8a6]/12 rotate-45 deco-float-up hidden lg:block" />
            <div className="absolute top-[65%] right-[38%] w-5 h-5 bg-[#0891b2]/8 rotate-45 hidden lg:block" />

            {/* Lines */}
            <div className="absolute top-[58%] left-0 w-32 h-[3px] bg-gradient-to-r from-[#2a66b0]/20 to-transparent hidden lg:block" />
            <div className="absolute top-[28%] right-0 w-28 h-[3px] bg-gradient-to-l from-[#0891b2]/15 to-transparent hidden lg:block" />
            <div className="absolute top-0 left-[68%] w-[3px] h-24 bg-gradient-to-b from-[#2a66b0]/12 to-transparent hidden lg:block" />

            {/* Solid circles */}
            <div className="absolute bottom-[28%] right-[33%] w-6 h-6 rounded-full bg-[#0891b2]/12 deco-float-down hidden lg:block" />
            <div className="absolute top-[13%] left-[23%] w-5 h-5 rounded-full bg-[#2a66b0]/10 deco-pulse hidden lg:block" />

            {/* Triangles */}
            <div className="absolute bottom-[12%] right-[4%] hidden lg:block deco-float-down">
              <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-b-[22px] border-b-[#2a66b0]/12" />
            </div>

            {/* SVG wave */}
            <svg className="absolute bottom-0 left-0 w-full h-18 opacity-[0.06]" viewBox="0 0 1440 72" preserveAspectRatio="none">
              <path d="M0,36 C360,72 720,0 1080,36 C1260,54 1380,18 1440,36 L1440,72 L0,72 Z" fill="#2a66b0" />
            </svg>
          </div>

          <div className="container mx-auto px-6 relative z-10">

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
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Bold gradient blobs */}
            <div className="absolute rounded-full deco-float-up" style={{ background: "radial-gradient(circle, #bfdbfe 0%, transparent 70%)", width: 600, height: 600, top: "-14%", right: "-9%", opacity: 0.85 }} />
            <div className="absolute rounded-full deco-drift" style={{ background: "radial-gradient(circle, #c7d2fe 0%, transparent 70%)", width: 480, height: 480, bottom: "-10%", left: "-6%", opacity: 0.7 }} />
            <div className="absolute rounded-full deco-float-down" style={{ background: "radial-gradient(circle, #a7f3d0 0%, transparent 70%)", width: 360, height: 360, top: "28%", left: "45%", opacity: 0.55 }} />
            <div className="absolute rounded-full deco-pulse" style={{ background: "radial-gradient(circle, #fbcfe8 0%, transparent 70%)", width: 280, height: 280, top: "3%", left: "12%", opacity: 0.45 }} />

            {/* Dot grids */}
            <div className="absolute bottom-12 right-6 hidden lg:grid grid-cols-7 gap-3">
              {Array.from({ length: 35 }).map((_, i) => (
                <div key={`md-${i}`} className="w-2 h-2 rounded-full bg-[#14b8a6]/15" />
              ))}
            </div>
            <div className="absolute top-8 left-8 hidden lg:grid grid-cols-6 gap-2.5">
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={`md2-${i}`} className="w-2.5 h-2.5 rounded-full bg-[#2a66b0]/12" />
              ))}
            </div>

            {/* Bold circles */}
            <div className="absolute -bottom-20 -right-12 w-80 h-80 rounded-full border-[3px] border-[#2a66b0]/[0.1] deco-spin-slow hidden lg:block" />
            <div className="absolute top-[22%] left-[7%] w-24 h-24 rounded-full border-[3px] border-[#14b8a6]/[0.12] deco-float-up hidden lg:block" />
            <div className="absolute top-14 right-[28%] w-36 h-36 rounded-full border-[4px] border-dashed border-[#0891b2]/[0.14] deco-spin-slow hidden lg:block" style={{ animationDirection: "reverse", animationDuration: "25s" }} />

            {/* Plus */}
            <div className="absolute top-[58%] right-[5%] hidden lg:block deco-float-up">
              <div className="w-10 h-[3px] bg-[#14b8a6]/20 absolute top-1/2 -translate-y-1/2" />
              <div className="w-[3px] h-10 bg-[#14b8a6]/20 absolute left-1/2 -translate-x-1/2" />
            </div>
            <div className="absolute bottom-[22%] left-[3%] hidden lg:block deco-float-down">
              <div className="w-8 h-[3px] bg-[#2a66b0]/18 absolute top-1/2 -translate-y-1/2" />
              <div className="w-[3px] h-8 bg-[#2a66b0]/18 absolute left-1/2 -translate-x-1/2" />
            </div>

            {/* Diamonds */}
            <div className="absolute bottom-[13%] right-[16%] w-8 h-8 border-[3px] border-[#2a66b0]/15 rotate-45 deco-drift hidden lg:block" />
            <div className="absolute top-[10%] left-[43%] w-7 h-7 border-[3px] border-[#0891b2]/12 rotate-45 deco-float-up hidden lg:block" />
            <div className="absolute top-[42%] right-[43%] w-5 h-5 bg-[#14b8a6]/8 rotate-45 hidden lg:block" />

            {/* Lines */}
            <div className="absolute top-[43%] right-0 w-36 h-[3px] bg-gradient-to-l from-[#14b8a6]/18 to-transparent hidden lg:block" />
            <div className="absolute bottom-0 left-[38%] w-[3px] h-28 bg-gradient-to-t from-[#2a66b0]/15 to-transparent hidden lg:block" />
            <div className="absolute top-[18%] left-0 w-28 h-[3px] bg-gradient-to-r from-[#0891b2]/15 to-transparent hidden lg:block" />

            {/* Solid circles */}
            <div className="absolute top-[48%] left-[20%] w-6 h-6 rounded-full bg-[#2a66b0]/12 deco-float-down hidden lg:block" />
            <div className="absolute bottom-[38%] right-[40%] w-5 h-5 rounded-full bg-[#0891b2]/14 deco-pulse hidden lg:block" />
            <div className="absolute top-[6%] right-[18%] w-5 h-5 rounded-full bg-[#14b8a6]/10 deco-float-up hidden lg:block" />

            {/* Triangles */}
            <div className="absolute top-[32%] left-[2%] hidden lg:block deco-float-up">
              <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-b-[22px] border-b-[#14b8a6]/12" />
            </div>

            {/* SVG waves */}
            <svg className="absolute top-0 left-0 w-full h-16 opacity-[0.06]" viewBox="0 0 1440 64" preserveAspectRatio="none">
              <path d="M0,32 C240,0 480,64 720,32 C960,0 1200,64 1440,32 L1440,0 L0,0 Z" fill="#14b8a6" />
            </svg>
            <svg className="absolute bottom-0 left-0 w-full h-16 opacity-[0.07]" viewBox="0 0 1440 64" preserveAspectRatio="none">
              <path d="M0,32 C360,64 720,0 1080,32 C1260,48 1380,16 1440,32 L1440,64 L0,64 Z" fill="#2a66b0" />
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
                  <div className="svc-card group relative rounded-2xl p-8 border border-gray-100 h-full flex flex-col bg-[#f4f6f8] overflow-hidden hover:border-transparent hover:shadow-xl transition-all duration-500">
                    {/* Cyan gradient overlay on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl z-0"
                      style={{ background: "linear-gradient(135deg, #0891b2 0%, #066a82 100%)" }} />
                    <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-[#0891b2] z-10" />
                    <span className="pointer-events-none select-none absolute -bottom-4 right-4 text-[120px] font-bold text-gray-200/30 group-hover:text-white/5 leading-none transition-colors duration-500 z-[1]">V</span>
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
                    {/* Teal gradient overlay on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl z-0"
                      style={{ background: "linear-gradient(135deg, #14b8a6 0%, #0d8a7c 100%)" }} />
                    <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-[#14b8a6] z-10" />
                    <span className="pointer-events-none select-none absolute -bottom-4 right-4 text-[120px] font-bold text-gray-200/30 group-hover:text-white/5 leading-none transition-colors duration-500 z-[1]">V</span>
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
            {/* Background decorative elements */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {/* Gradient blobs — animated */}
              <div className="absolute rounded-full deco-float-up" style={{ background: "radial-gradient(circle, #dbeafe 0%, transparent 70%)", width: 480, height: 480, top: "-12%", right: "-7%", opacity: 0.5 }} />
              <div className="absolute rounded-full deco-drift" style={{ background: "radial-gradient(circle, #e0f2fe 0%, transparent 70%)", width: 350, height: 350, bottom: "-8%", left: "-4%", opacity: 0.45 }} />
              <div className="absolute rounded-full deco-float-down" style={{ background: "radial-gradient(circle, #ccfbf1 0%, transparent 70%)", width: 260, height: 260, top: "40%", left: "35%", opacity: 0.3 }} />
              <div className="absolute rounded-full deco-pulse" style={{ background: "radial-gradient(circle, #e0e7ff 0%, transparent 70%)", width: 200, height: 200, top: "10%", left: "50%", opacity: 0.2 }} />

              {/* Dot grids */}
              <div className="absolute bottom-10 right-8 hidden lg:grid grid-cols-6 gap-3 opacity-30">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div key={`td-${i}`} className="w-1.5 h-1.5 rounded-full bg-[#2a66b0]/20" />
                ))}
              </div>
              <div className="absolute top-8 left-6 hidden lg:grid grid-cols-4 gap-2.5 opacity-25">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={`td2-${i}`} className="w-2 h-2 rounded-full bg-[#0891b2]/15" />
                ))}
              </div>

              {/* Circles — animated */}
              <div className="absolute top-14 left-[10%] w-32 h-32 rounded-full border-[3px] border-dashed border-[#2a66b0]/10 deco-spin-slow hidden lg:block" />
              <div className="absolute bottom-[20%] right-[12%] w-24 h-24 rounded-full border-2 border-[#0891b2]/[0.07] deco-float-up hidden lg:block" />
              <div className="absolute top-[60%] left-[45%] w-16 h-16 rounded-full border border-[#14b8a6]/[0.06] deco-drift hidden lg:block" />
              <div className="absolute -top-10 left-[55%] w-44 h-44 rounded-full border border-[#2a66b0]/[0.04] hidden lg:block" />

              {/* Plus shapes */}
              <div className="absolute top-[55%] right-[5%] hidden lg:block opacity-18 deco-float-up">
                <div className="w-6 h-[2px] bg-[#2a66b0] absolute top-1/2 -translate-y-1/2" />
                <div className="w-[2px] h-6 bg-[#2a66b0] absolute left-1/2 -translate-x-1/2" />
              </div>
              <div className="absolute bottom-[15%] left-[8%] hidden lg:block opacity-12 deco-float-down">
                <div className="w-5 h-[2px] bg-[#0891b2] absolute top-1/2 -translate-y-1/2" />
                <div className="w-[2px] h-5 bg-[#0891b2] absolute left-1/2 -translate-x-1/2" />
              </div>

              {/* Diamonds */}
              <div className="absolute top-[30%] left-[5%] w-5 h-5 border-2 border-[#14b8a6]/12 rotate-45 deco-drift hidden lg:block" />
              <div className="absolute bottom-[35%] right-[30%] w-4 h-4 border-2 border-[#2a66b0]/8 rotate-45 deco-float-up hidden lg:block" />

              {/* Lines */}
              <div className="absolute top-[40%] left-0 w-24 h-[2px] bg-gradient-to-r from-[#2a66b0]/12 to-transparent hidden lg:block" />
              <div className="absolute bottom-[25%] right-0 w-20 h-[2px] bg-gradient-to-l from-[#0891b2]/10 to-transparent hidden lg:block" />
              <div className="absolute top-0 right-[20%] w-[2px] h-16 bg-gradient-to-b from-[#2a66b0]/10 to-transparent hidden lg:block" />

              {/* Small circles */}
              <div className="absolute top-[20%] right-[25%] w-3 h-3 rounded-full bg-[#2a66b0]/10 deco-pulse hidden lg:block" />
              <div className="absolute bottom-[45%] left-[20%] w-2.5 h-2.5 rounded-full bg-[#0891b2]/10 deco-float-up hidden lg:block" />

              {/* Triangle */}
              <div className="absolute top-[70%] right-[4%] hidden lg:block opacity-[0.06] deco-float-up">
                <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[14px] border-b-[#0891b2]" />
              </div>

              {/* SVG wave */}
              <svg className="absolute bottom-0 left-0 w-full h-12 opacity-[0.03] hidden lg:block" viewBox="0 0 1440 48" preserveAspectRatio="none">
                <path d="M0,24 C480,48 960,0 1440,24 L1440,48 L0,48 Z" fill="#2a66b0" />
              </svg>
            </div>

            <div className="container mx-auto px-6 relative z-10">

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
        <section className="py-20 bg-white relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Gradient blobs — animated */}
            <div className="absolute rounded-full deco-float-up" style={{ background: "radial-gradient(circle, #dbeafe 0%, transparent 70%)", width: 400, height: 400, top: "-18%", right: "-5%", opacity: 0.5 }} />
            <div className="absolute rounded-full deco-drift" style={{ background: "radial-gradient(circle, #e0f2fe 0%, transparent 70%)", width: 320, height: 320, bottom: "-12%", left: "-4%", opacity: 0.4 }} />
            <div className="absolute rounded-full deco-float-down" style={{ background: "radial-gradient(circle, #ccfbf1 0%, transparent 70%)", width: 200, height: 200, top: "30%", left: "40%", opacity: 0.25 }} />

            {/* Dot grids */}
            <div className="absolute top-6 left-10 hidden lg:grid grid-cols-5 gap-3 opacity-25">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={`cd-${i}`} className="w-1.5 h-1.5 rounded-full bg-[#2a66b0]/20" />
              ))}
            </div>
            <div className="absolute bottom-6 right-8 hidden lg:grid grid-cols-4 gap-2.5 opacity-20">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={`cd2-${i}`} className="w-2 h-2 rounded-full bg-[#0891b2]/15" />
              ))}
            </div>

            {/* Circles */}
            <div className="absolute top-[30%] left-[5%] w-20 h-20 rounded-full border-2 border-[#2a66b0]/[0.06] deco-float-up hidden lg:block" />
            <div className="absolute bottom-[15%] right-[10%] w-24 h-24 rounded-full border-[3px] border-dashed border-[#0891b2]/8 deco-spin-slow hidden lg:block" />

            {/* Diamonds */}
            <div className="absolute bottom-[25%] right-[8%] w-5 h-5 border-2 border-[#0891b2]/10 rotate-45 deco-drift hidden lg:block" />
            <div className="absolute top-[20%] left-[30%] w-4 h-4 border-2 border-[#2a66b0]/8 rotate-45 deco-float-down hidden lg:block" />

            {/* Plus */}
            <div className="absolute top-[50%] left-[3%] hidden lg:block opacity-15 deco-float-up">
              <div className="w-5 h-[2px] bg-[#2a66b0] absolute top-1/2 -translate-y-1/2" />
              <div className="w-[2px] h-5 bg-[#2a66b0] absolute left-1/2 -translate-x-1/2" />
            </div>

            {/* Lines */}
            <div className="absolute top-[40%] right-0 w-20 h-[2px] bg-gradient-to-l from-[#2a66b0]/12 to-transparent hidden lg:block" />
            <div className="absolute bottom-0 left-[55%] w-[2px] h-14 bg-gradient-to-t from-[#0891b2]/10 to-transparent hidden lg:block" />

            {/* Small circles */}
            <div className="absolute top-[15%] right-[30%] w-3 h-3 rounded-full bg-[#2a66b0]/8 deco-pulse hidden lg:block" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
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