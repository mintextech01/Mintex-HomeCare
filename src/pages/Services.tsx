import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import AnimatedSection from "@/components/AnimatedSection";
import { Link } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import { getIcon } from "@/lib/iconMap";
import { ArrowRight, CheckCircle, Star, Users, Clock, ShieldCheck } from "lucide-react";

const stats = [
  { value: "500+", label: "Families Served", icon: Users },
  { value: "99%",  label: "Satisfying Care",  icon: Star  },
  { value: "24/7", label: "Always Available", icon: Clock },
  { value: "10+",  label: "Years of Service", icon: ShieldCheck },
];

const Services = () => {
  const { services } = useAdmin();
  const homeServices    = services.filter(s => s.category === "home");
  const nursingServices = services.filter(s => s.category === "nursing");

  return (
    <>
      <Header />
      <main className="bg-white overflow-x-hidden">

        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section className="relative pt-32 pb-20 bg-white">
          {/* Soft blobs */}
          <div className="pointer-events-none absolute top-0 right-0 w-[520px] h-[520px] rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, #e0eeff 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
          <div className="pointer-events-none absolute bottom-0 left-0 w-[360px] h-[360px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #d0f5f5 0%, transparent 70%)", transform: "translate(-30%, 30%)" }} />

          <div className="container mx-auto px-6 relative z-10">
            {/* Breadcrumb pill */}
            <div className="flex justify-center mb-10">
              <span className="inline-flex items-center gap-2 border border-[#2a66b0]/20 rounded-full px-4 py-1.5 text-xs font-medium text-[#2a66b0] bg-blue-50">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2a66b0] inline-block" />
                Our Services
              </span>
            </div>

            {/* Headline */}
            <div className="text-center max-w-3xl mx-auto mb-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.05] tracking-tight">
                Trusted Home Care<br />
                <span className="text-[#2a66b0]">Built Around You</span>
              </h1>
            </div>
            <p className="text-center text-gray-500 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              We are dedicated to providing exceptional home care through a compassionate,
              patient-centered approach — every step of the way.
            </p>

            {/* CTA row */}
            <div className="flex items-center justify-center gap-4 mb-16">
              <Link to="/contact"
                className="inline-flex items-center gap-2 bg-[#2a66b0] text-white font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-[#1f4f8a] transition-all hover:scale-105 shadow-lg shadow-[#2a66b0]/25">
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="tel:+17322685112"
                className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 font-semibold text-sm px-7 py-3.5 rounded-full hover:border-[#2a66b0] hover:text-[#2a66b0] transition-all">
                Contact Us
              </a>
            </div>

            {/* Stats row */}
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
            VISUAL BANNER — care image + overlay stats
        ══════════════════════════════════════ */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-6">
            <div className="relative rounded-3xl overflow-hidden min-h-[340px] md:min-h-[420px]"
              style={{ background: "linear-gradient(135deg, #2a66b0 0%, #0be3e3 100%)" }}>

              {/* Decorative circles */}
              <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/10" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/10" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/5" />

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 p-10 md:p-14">
                {/* Left text */}
                <div className="text-white max-w-sm">
                  <span className="inline-block text-xs font-semibold bg-white/20 rounded-full px-3 py-1 mb-4 tracking-wider uppercase">
                    Why Choose Us
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                    Very fast and<br />accurate service with us
                  </h2>
                  <p className="text-white/75 text-sm leading-relaxed mb-6">
                    Connect with our professional caregivers who are ready to help you manage your health with dignity and compassion.
                  </p>
                  <Link to="/contact"
                    className="inline-flex items-center gap-2 bg-white text-[#2a66b0] font-semibold text-sm px-6 py-3 rounded-full hover:bg-white/90 transition-all">
                    Make a Schedule <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* Right: floating stat cards */}
                <div className="flex flex-col gap-4 w-full md:w-auto">
                  <div className="flex items-center gap-4 bg-white rounded-2xl px-6 py-4 shadow-xl">
                    <div className="w-10 h-10 rounded-full bg-[#2a66b0]/10 flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-[#2a66b0]" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-900 leading-none">500+</p>
                      <p className="text-xs text-gray-500 mt-0.5">Happy Families</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white rounded-2xl px-6 py-4 shadow-xl">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                      <Star className="w-5 h-5 text-cyan-500" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-900 leading-none">99%</p>
                      <p className="text-xs text-gray-500 mt-0.5">Satisfying Treatment</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white rounded-2xl px-6 py-4 shadow-xl">
                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-900 leading-none">NJ Licensed</p>
                      <p className="text-xs text-gray-500 mt-0.5">State Certified Agency</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            HOME CARE SERVICES
        ══════════════════════════════════════ */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">

            {/* Section header */}
            <AnimatedSection className="mb-14">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div>
                  <span className="inline-block text-xs font-semibold text-[#2a66b0] uppercase tracking-widest mb-3 bg-blue-50 px-3 py-1 rounded-full">
                    Home Care
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                    Home Care Services
                  </h2>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs md:text-right">
                  Comprehensive care solutions tailored to your unique needs and lifestyle
                </p>
              </div>
              <div className="mt-8 h-px bg-gray-100" />
            </AnimatedSection>

            {/* Cards grid — 3D style */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {homeServices.map((s, i) => {
                const Icon = getIcon(s.icon);
                // Cycle through 4 gradient palettes
                const palettes = [
                  { grad: "from-[#2a66b0] to-[#1a4a8a]", shadow: "rgba(42,102,176,0.45)", iconBg: "bg-white/20", iconColor: "text-white" },
                  { grad: "from-[#0891b2] to-[#0e7490]", shadow: "rgba(8,145,178,0.45)",  iconBg: "bg-white/20", iconColor: "text-white" },
                  { grad: "from-[#0f766e] to-[#0d5c57]", shadow: "rgba(15,118,110,0.45)", iconBg: "bg-white/20", iconColor: "text-white" },
                  { grad: "from-[#1d4ed8] to-[#1e3a8a]", shadow: "rgba(29,78,216,0.45)",  iconBg: "bg-white/20", iconColor: "text-white" },
                ];
                const p = palettes[i % palettes.length];
                return (
                  <AnimatedSection key={s.id} delay={i * 0.04} className="h-full">
                    <div
                      className="group flex flex-col h-full rounded-3xl overflow-hidden cursor-pointer"
                      style={{
                        transition: "transform 0.35s cubic-bezier(.22,.68,0,1.2), box-shadow 0.35s ease",
                        boxShadow: `0 8px 24px ${p.shadow.replace("0.45", "0.18")}`,
                        transform: "perspective(800px) rotateX(0deg) translateY(0px)",
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLDivElement).style.transform = "perspective(800px) rotateX(4deg) translateY(-10px)";
                        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 28px 48px ${p.shadow}`;
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLDivElement).style.transform = "perspective(800px) rotateX(0deg) translateY(0px)";
                        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 24px ${p.shadow.replace("0.45", "0.18")}`;
                      }}
                    >
                      {/* ── Gradient top banner ── */}
                      <div className={`relative bg-gradient-to-br ${p.grad} px-6 pt-8 pb-10 flex flex-col gap-4 overflow-hidden`}>
                        {/* Decorative circles */}
                        <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/10" />
                        <div className="absolute bottom-0 left-4 w-16 h-16 rounded-full bg-white/5" />

                        {/* Index badge */}
                        <span className="self-start text-[10px] font-bold bg-white/15 text-white rounded-full px-2.5 py-0.5 tracking-widest select-none">
                          {String(i + 1).padStart(2, "0")}
                        </span>

                        {/* Floating icon */}
                        <div className={`relative z-10 w-14 h-14 rounded-2xl ${p.iconBg} backdrop-blur-sm flex items-center justify-center shadow-lg ring-1 ring-white/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                          <Icon className={`h-7 w-7 ${p.iconColor}`} />
                        </div>

                        {/* Title on gradient */}
                        <h3 className="relative z-10 font-bold text-white text-base leading-snug pr-4">{s.title}</h3>
                      </div>

                      {/* ── White content area ── */}
                      <div className="flex flex-col flex-1 bg-white px-6 pt-5 pb-6">
                        {/* Connector notch */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`h-0.5 w-8 rounded-full bg-gradient-to-r ${p.grad}`} />
                          <div className={`h-0.5 w-3 rounded-full bg-gradient-to-r ${p.grad} opacity-40`} />
                        </div>

                        <p className="text-xs text-gray-500 leading-relaxed flex-1">{s.description}</p>

                        <Link
                          to="/contact"
                          className="inline-flex items-center gap-1.5 mt-5 text-xs font-bold group-hover:gap-3 transition-all duration-200"
                          style={{ color: p.shadow.includes("42,102") ? "#2a66b0" : p.shadow.includes("8,145") ? "#0891b2" : p.shadow.includes("15,118") ? "#0f766e" : "#1d4ed8" }}
                        >
                          Learn more <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            SKILLED NURSING
        ══════════════════════════════════════ */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">

            {/* Section header */}
            <AnimatedSection className="mb-14">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div>
                  <span className="inline-block text-xs font-semibold text-cyan-600 uppercase tracking-widest mb-3 bg-cyan-50 px-3 py-1 rounded-full">
                    Specialized Care
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                    Skilled Nursing<br />Facility Services
                  </h2>
                </div>
                <div className="flex flex-col items-start md:items-end gap-2">
                  <p className="text-gray-500 text-sm leading-relaxed max-w-xs md:text-right">
                    Specialized clinical care for maximum independence and quality of life
                  </p>
                  {nursingServices.length > 0 && (
                    <span className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-xs font-medium text-gray-700 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-[#2a66b0]" />
                      {nursingServices.length} Specialized Services
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-8 h-px bg-gray-200" />
            </AnimatedSection>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {nursingServices.map((s, i) => {
                const Icon = getIcon(s.icon);
                const accent = i % 2 === 0;
                return (
                  <AnimatedSection key={s.id} delay={i * 0.06} className="h-full">
                    <div className="group relative flex gap-4 p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full overflow-hidden">
                      {/* Top accent bar */}
                      <div className={`absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ${accent ? "bg-[#2a66b0]" : "bg-cyan-500"}`} />
                      {/* Watermark */}
                      <span className="pointer-events-none absolute -bottom-3 -right-1 text-[72px] font-bold leading-none select-none opacity-[0.04] text-gray-900">
                        {i + 1}
                      </span>
                      {/* Icon */}
                      <div className={`h-11 w-11 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-300 ${accent ? "bg-blue-50 group-hover:bg-blue-100" : "bg-cyan-50 group-hover:bg-cyan-100"}`}>
                        <Icon className={`h-5 w-5 ${accent ? "text-[#2a66b0]" : "text-cyan-600"}`} />
                      </div>
                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 mb-1.5 leading-snug text-sm">{s.title}</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">{s.description}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            TRUST STRIP
        ══════════════════════════════════════ */}
        <section className="py-14 bg-white border-y border-gray-100">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { icon: ShieldCheck, title: "Building Trust", desc: "We earn your confidence through consistent, quality care every single day." },
                { icon: Users,       title: "Community Involvement", desc: "Deeply rooted in New Jersey, serving families across our community." },
                { icon: CheckCircle, title: "Security and Privacy", desc: "Your health information is always handled with the highest standards." },
              ].map(({ icon: Icon, title, desc }) => (
                <AnimatedSection key={title} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#2a66b0]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 text-[#2a66b0]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1">{title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            CTA BANNER
        ══════════════════════════════════════ */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <AnimatedSection>
              <div className="relative rounded-3xl overflow-hidden px-10 py-16 md:px-16 text-center"
                style={{ background: "linear-gradient(135deg, #1d4f8c 0%, #2a66b0 50%, #0be3e3 100%)" }}>
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
                    className="inline-flex items-center gap-2 bg-white text-[#2a66b0] font-bold text-sm px-8 py-3.5 rounded-full hover:bg-white/90 transition-all hover:scale-105 shadow-lg">
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
    </>
  );
};

export default Services;