import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import AccessibilityButton from "@/components/AccessibilityButton";
import AnimatedSection from "@/components/AnimatedSection";
import { Link } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import { getIcon } from "@/lib/iconMap";
import { ArrowRight, ChevronLeft, ChevronRight, CheckCircle, Star, Users, Clock, ShieldCheck } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const stats = [
  { value: "500+", label: "Families Served",  icon: Users       },
  { value: "99%",  label: "Satisfying Care",   icon: Star        },
  { value: "24/7", label: "Always Available",  icon: Clock       },
  { value: "10+",  label: "Years of Service",  icon: ShieldCheck },
];

const palettes = [
  { solid: "#2a66b0", bg: "rgba(42,102,176,0.08)"  },
  { solid: "#0891b2", bg: "rgba(8,145,178,0.08)"   },
  { solid: "#14b8a6", bg: "rgba(20,184,166,0.08)"  },
  { solid: "#6366f1", bg: "rgba(99,102,241,0.08)"  },
];

const nursingPalettes = [
  { solid: "#0891b2", bg: "rgba(8,145,178,0.08)"   },
  { solid: "#2a66b0", bg: "rgba(42,102,176,0.08)"  },
  { solid: "#06b6d4", bg: "rgba(6,182,212,0.08)"   },
  { solid: "#14b8a6", bg: "rgba(20,184,166,0.08)"  },
];

/* ── Reusable service card ── */
const ServiceCard = ({
  s, i, palette,
}: {
  s: { id: string; title: string; description: string; icon: string };
  i: number;
  palette: { solid: string; bg: string };
}) => {
  const Icon = getIcon(s.icon);
  return (
    <AnimatedSection delay={i * 0.07} className="h-full">
      <div
        className="svc-card-wrapper h-full"
        style={{ "--icon-color": palette.solid } as React.CSSProperties}
      >
        <div
          className="svc-card group relative rounded-2xl p-8 border border-gray-100 h-full flex flex-col items-center text-center bg-[#f4f6f8]"
        >
          <div
            className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
            style={{ background: palette.solid }}
          />
          <div
            className="svc-icon-box mb-7"
            style={{ "--icon-color": palette.solid, "--icon-bg": palette.bg } as React.CSSProperties}
          >
            <Icon className="icon-svg w-7 h-7" style={{ color: palette.solid }} />
          </div>
          <h3 className="font-bold text-gray-900 text-[17px] leading-snug mb-3">{s.title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed flex-1">{s.description}</p>
        </div>
      </div>
    </AnimatedSection>
  );
};

/* ── Paginated home-care slider (8 cards per page) ── */
const CARDS_PER_PAGE = 8;

const HomeCareSlider = ({
  services,
}: {
  services: { id: string; title: string; description: string; icon: string }[];
}) => {
  const totalPages = Math.max(1, Math.ceil(services.length / CARDS_PER_PAGE));
  const [page, setPage] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [slideDir, setSlideDir] = useState<"left" | "right">("left");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const goTo = (next: number, dir: "left" | "right") => {
    if (isSliding || next === page) return;
    setSlideDir(dir);
    setIsSliding(true);
    timeoutRef.current = setTimeout(() => {
      setPage(next);
      setIsSliding(false);
    }, 400);
  };

  const pageServices = services.slice(
    page * CARDS_PER_PAGE,
    page * CARDS_PER_PAGE + CARDS_PER_PAGE
  );

  return (
    <div>
      {/* slider viewport */}
      <div className="overflow-hidden">
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-400"
          style={{
            opacity: isSliding ? 0 : 1,
            transform: isSliding
              ? `translateX(${slideDir === "left" ? "-60px" : "60px"})`
              : "translateX(0)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
          }}
        >
          {pageServices.map((s, i) => (
            <ServiceCard
              key={s.id}
              s={s}
              i={i}
              palette={palettes[i % palettes.length]}
            />
          ))}
        </div>
      </div>

      {/* pagination controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => goTo(page - 1, "right")}
            disabled={page === 0 || isSliding}
            className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:bg-[#2a66b0] hover:text-white hover:border-[#2a66b0] transition-all disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > page ? "left" : "right")}
                disabled={isSliding}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === page
                    ? "bg-[#2a66b0] scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => goTo(page + 1, "left")}
            disabled={page === totalPages - 1 || isSliding}
            className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:bg-[#2a66b0] hover:text-white hover:border-[#2a66b0] transition-all disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

/* ════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════ */
const Services = () => {
  const { services } = useAdmin();
  const homeServices    = services.filter(s => s.category === "home");
  const nursingServices = services.filter(s => s.category === "nursing");

  return (
    <>
      <Header />
      <main className="bg-background overflow-x-hidden relative">

        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          {/* hero soft blobs */}
          <div className="pointer-events-none absolute top-0 right-0 w-[520px] h-[520px] rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, #e0eeff 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
          <div className="pointer-events-none absolute bottom-0 left-0 w-[360px] h-[360px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #d0f5f5 0%, transparent 70%)", transform: "translate(-30%, 30%)" }} />
          {/* hero deco */}
          <div className="pointer-events-none select-none absolute inset-0 z-0" aria-hidden="true">
            <svg className="svc-deco-float absolute top-10 left-6 w-36 h-36 opacity-[0.13]" viewBox="0 0 100 100" fill="none">
              <rect x="44" y="2" width="12" height="96" rx="5" fill="#2a66b0"/>
              <rect x="2" y="44" width="96" height="12" rx="5" fill="#2a66b0"/>
            </svg>
            <svg className="svc-deco-mid absolute top-16 right-8 w-64 h-16 opacity-[0.13]" viewBox="0 0 240 50" fill="none">
              <polyline points="0,25 34,25 48,5 60,45 74,12 88,36 102,25 240,25" stroke="#2a66b0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <svg className="svc-deco-mid absolute bottom-10 left-1/3 w-28 h-14 opacity-[0.10]" viewBox="0 0 100 44" fill="none">
              <rect x="2" y="2" width="96" height="40" rx="20" stroke="#2a66b0" strokeWidth="3"/>
              <line x1="50" y1="2" x2="50" y2="42" stroke="#2a66b0" strokeWidth="3"/>
            </svg>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="flex justify-center mb-10">
              <span className="inline-flex items-center gap-2 border border-[#2a66b0]/20 rounded-full px-4 py-1.5 text-xs font-medium text-[#2a66b0] bg-blue-50">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2a66b0] inline-block" />
                Our Services
              </span>
            </div>
            <div className="text-center max-w-3xl mx-auto mb-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.05] tracking-tight">
                Trusted Home Care<br />
                <span className="text-[#2a66b0]">Built Around You</span>
              </h1>
            </div>
            <p className="text-center text-gray-500 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              We are dedicated to providing exceptional home care through a compassionate,
              patient-centered approach — every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
              <Link to="/contact"
                className="inline-flex items-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-full transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, hsl(214 66% 44%) 0%, hsl(192 91% 37%) 100%)", border: "1px solid rgba(255,255,255,0.3)", boxShadow: "0 2px 12px rgba(38,104,188,0.30), inset 0 1px 0 rgba(255,255,255,0.25)", color: "#fff" }}>
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="tel:+17322685112"
                className="inline-flex items-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-full text-foreground hover:text-primary transition-all glass-btn">
                Contact Us
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {stats.map(({ value, label, icon: Icon }) => (
                <div key={label} className="flex flex-col items-center gap-2 bg-gray-50 rounded-2xl px-5 py-5 border border-gray-100">
                  <div className="w-9 h-9 rounded-full bg-[#2a66b0]/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#2a66b0]" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900 leading-none">{value}</p>
                  <p className="text-xs text-gray-500 text-center leading-snug">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>




        {/* ══════════════════════════════════════
            HOME CARE SERVICES
        ══════════════════════════════════════ */}
        <section className="py-24 bg-[#f7f8f9] relative overflow-hidden">
          <div className="pointer-events-none select-none absolute inset-0 z-0" aria-hidden="true">
            {/* cross top-left */}
            <svg className="svc-deco-float absolute -top-4 -left-4 w-44 h-44 opacity-[0.15]" viewBox="0 0 100 100" fill="none">
              <rect x="44" y="2" width="12" height="96" rx="5" fill="#2a66b0"/>
              <rect x="2" y="44" width="96" height="12" rx="5" fill="#2a66b0"/>
            </svg>
            {/* ECG top-right */}
            <svg className="svc-deco-mid absolute top-8 right-0 w-72 h-16 opacity-[0.15]" viewBox="0 0 260 50" fill="none">
              <polyline points="0,25 36,25 52,5 66,45 80,10 94,38 110,25 260,25" stroke="#2a66b0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {/* stethoscope left */}
            <svg className="svc-deco-float absolute top-1/2 -translate-y-1/2 -left-2 w-32 h-32 opacity-[0.15]" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="70" r="13" stroke="#2a66b0" strokeWidth="3.5"/>
              <path d="M24 18 Q24 50 50 50 Q76 50 76 18" stroke="#2a66b0" strokeWidth="3.5" strokeLinecap="round"/>
              <circle cx="24" cy="18" r="5" fill="#2a66b0"/>
              <circle cx="76" cy="18" r="5" fill="#2a66b0"/>
              <circle cx="50" cy="70" r="5" fill="#2a66b0"/>
            </svg>
            {/* pill right */}
            <svg className="svc-deco-mid absolute top-1/2 -translate-y-1/2 -right-2 w-28 h-14 opacity-[0.15]" viewBox="0 0 100 44" fill="none">
              <rect x="2" y="2" width="96" height="40" rx="20" stroke="#2a66b0" strokeWidth="3"/>
              <line x1="50" y1="2" x2="50" y2="42" stroke="#2a66b0" strokeWidth="3"/>
            </svg>
            {/* dot grid bottom-left */}
            <svg className="absolute bottom-8 left-8 w-32 h-14 opacity-[0.15]" viewBox="0 0 120 50">
              {[0,1,2,3,4,5].map(col=>[0,1,2].map(row=>(
                <circle key={`${col}-${row}`} cx={col*22+10} cy={row*22+6} r="4" fill="#2a66b0"/>
              )))}
            </svg>
            {/* DNA bottom-right */}
            <svg className="svc-deco-float absolute bottom-4 right-8 w-20 h-40 opacity-[0.15]" viewBox="0 0 50 120">
              {Array.from({length:8}).map((_,i)=>{
                const y=i*14+4,x1=8+Math.sin(i*0.9)*14,x2=42-Math.sin(i*0.9)*14;
                return(<g key={i}><circle cx={x1} cy={y} r="3.5" fill="#2a66b0"/><circle cx={x2} cy={y} r="3.5" fill="#0891b2"/><line x1={x1} y1={y} x2={x2} y2={y} stroke="#2a66b0" strokeWidth="1.5" strokeDasharray="3 2"/></g>);
              })}
            </svg>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <AnimatedSection className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-[#2a66b0] inline-block" />
                <span className="text-xs font-extrabold text-[#2a66b0] uppercase tracking-[0.25em]">Home Care</span>
                <span className="h-px w-10 bg-[#2a66b0] inline-block" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Home Care <span className="text-[#2a66b0]">Services</span>
              </h2>
              <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
                Comprehensive care solutions tailored to your unique needs and lifestyle
              </p>
            </AnimatedSection>
            <HomeCareSlider services={homeServices} />
          </div>
        </section>

        {/* ══════════════════════════════════════
            SKILLED NURSING SERVICES
        ══════════════════════════════════════ */}
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="pointer-events-none select-none absolute inset-0 z-0" aria-hidden="true">
            {/* cross top-right */}
            <svg className="svc-deco-float absolute -top-4 -right-4 w-40 h-40 opacity-[0.15]" viewBox="0 0 100 100" fill="none">
              <rect x="44" y="2" width="12" height="96" rx="5" fill="#0891b2"/>
              <rect x="2" y="44" width="96" height="12" rx="5" fill="#0891b2"/>
            </svg>
            {/* ECG top-left */}
            <svg className="svc-deco-mid absolute top-8 left-0 w-72 h-16 opacity-[0.15]" viewBox="0 0 260 50" fill="none">
              <polyline points="0,25 36,25 52,5 66,45 80,10 94,38 110,25 260,25" stroke="#0891b2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {/* shield right */}
            <svg className="svc-deco-float absolute top-1/2 -translate-y-1/2 -right-2 w-28 h-32 opacity-[0.15]" viewBox="0 0 80 90" fill="none">
              <path d="M40 4 L72 18 L72 52 Q72 74 40 88 Q8 74 8 52 L8 18 Z" stroke="#0891b2" strokeWidth="3"/>
              <rect x="36" y="32" width="8" height="26" rx="2" fill="#0891b2"/>
              <rect x="27" y="41" width="26" height="8" rx="2" fill="#0891b2"/>
            </svg>
            {/* IV drip left */}
            <svg className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-52 opacity-[0.15]" viewBox="0 0 16 180">
              <line x1="8" y1="0" x2="8" y2="180" stroke="#0891b2" strokeWidth="2" strokeDasharray="5 5"/>
              {[0,36,72,108,144,180].map((y,i)=>(<circle key={i} cx="8" cy={y} r="4" fill="#0891b2"/>))}
            </svg>
            {/* dot grid bottom-right */}
            <svg className="absolute bottom-8 right-8 w-32 h-14 opacity-[0.15]" viewBox="0 0 120 50">
              {[0,1,2,3,4,5].map(col=>[0,1,2].map(row=>(
                <circle key={`${col}-${row}`} cx={col*22+10} cy={row*22+6} r="4" fill="#0891b2"/>
              )))}
            </svg>
            {/* DNA bottom-left */}
            <svg className="svc-deco-float absolute bottom-4 left-8 w-20 h-40 opacity-[0.15]" viewBox="0 0 50 120">
              {Array.from({length:8}).map((_,i)=>{
                const y=i*14+4,x1=8+Math.sin(i*0.9)*14,x2=42-Math.sin(i*0.9)*14;
                return(<g key={i}><circle cx={x1} cy={y} r="3.5" fill="#0891b2"/><circle cx={x2} cy={y} r="3.5" fill="#2a66b0"/><line x1={x1} y1={y} x2={x2} y2={y} stroke="#0891b2" strokeWidth="1.5" strokeDasharray="3 2"/></g>);
              })}
            </svg>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <AnimatedSection className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-[#0891b2] inline-block" />
                <span className="text-xs font-extrabold text-[#0891b2] uppercase tracking-[0.25em]">Specialized Care</span>
                <span className="h-px w-10 bg-[#0891b2] inline-block" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Skilled Nursing <span className="text-[#0891b2]">Facility Services</span>
              </h2>
              <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
                Specialized clinical care for maximum independence and quality of life
              </p>
              {nursingServices.length > 0 && (
                <span className="inline-flex items-center gap-2 mt-4 bg-cyan-50 border border-cyan-100 rounded-full px-4 py-1.5 text-xs font-medium text-cyan-700">
                  <span className="w-2 h-2 rounded-full bg-[#0891b2]" />
                  {nursingServices.length} Specialized Services
                </span>
              )}
            </AnimatedSection>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {nursingServices.map((s, i) => (
                <ServiceCard key={s.id} s={s} i={i} palette={nursingPalettes[i % nursingPalettes.length]} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            TRUST STRIP
        ══════════════════════════════════════ */}
        <section className="py-14 bg-[#5c8aa6] border-y border-gray-100">
  <div className="container mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
      {[
        { icon: ShieldCheck, title: "Building Trust",       desc: "We earn your confidence through consistent, quality care every single day." },
        { icon: Users,       title: "Community Involvement", desc: "Deeply rooted in New Jersey, serving families across our community."       },
        { icon: CheckCircle, title: "Security and Privacy",  desc: "Your health information is always handled with the highest standards."      },
      ].map(({ icon: Icon, title, desc }) => (
        <AnimatedSection key={title} className="flex gap-4 items-start">
          {/* Note: I kept the icon background light for contrast, but adjusted it to white/20 for better visibility on blue */}
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            {/* Changed text colors to white for better readability on the new blue background */}
            <h4 className="font-bold text-white text-sm mb-1">{title}</h4>
            <p className="text-xs text-blue-50 leading-relaxed">{desc}</p>
          </div>
        </AnimatedSection>
      ))}
    </div>
  </div>
</section>

        {/* ══════════════════════════════════════
            CTA BANNER
        ══════════════════════════════════════ */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <AnimatedSection>
              <div className="relative rounded-3xl overflow-hidden px-10 py-16 md:px-16 text-center"
                style={{ background: "linear-gradient(135deg, #1d4f8c 0%, #2a66b0 50%, #0891b2 100%)" }}>
                <div className="pointer-events-none absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/4" />
                <div className="pointer-events-none absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/10 translate-y-1/2 -translate-x-1/4" />
                <div className="relative z-10">
                  <span className="inline-block text-xs font-semibold bg-white/20 text-white rounded-full px-3 py-1 mb-4 tracking-wider uppercase">
                    Let Us Help
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug mb-3">
                    Need Help Choosing a Service?
                  </h2>
                  <p className="text-white/75 text-sm mb-8 max-w-md mx-auto leading-relaxed">
                    Our care coordinators are ready to help you find the right service for your loved one — at no obligation.
                  </p>
                  <Link to="/contact"
                    className="inline-flex items-center gap-2 font-bold text-sm px-8 py-3.5 rounded-full transition-all hover:scale-105"
                    style={{ background: "linear-gradient(135deg, hsl(214 66% 44%) 0%, hsl(192 91% 37%) 100%)", border: "1px solid rgba(255,255,255,0.3)", boxShadow: "0 2px 12px rgba(38,104,188,0.30), inset 0 1px 0 rgba(255,255,255,0.25)", color: "#fff" }}>
                    Contact Us Today <ArrowRight className="h-4 w-4" />
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

export default Services;
