import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight, CheckCircle, Award, Users, Heart, Clock } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";

const features = [
  "Compassionate, certified caregivers",
  "Personalized care plans for every client",
  "Available 24/7 — including holidays",
  "State-licensed & insured agency in NJ",
];

const stats = [
  { value: "500+", label: "Families Served",   icon: Users  },
  { value: "10+",  label: "Years Experience",  icon: Award  },
  { value: "99%",  label: "Client Satisfaction", icon: Heart },
  { value: "24/7", label: "Always Available",  icon: Clock  },
];

const AboutSection = () => {
  const { siteImages } = useAdmin();
  const { isDark } = useTheme();

  return (
    <section id="about" className="relative py-20 md:py-28 bg-white overflow-hidden">

      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Large blue tinted block behind image */}
        <div className="absolute top-12 left-0 w-[42%] h-[80%] rounded-3xl bg-[#2a66b0]/[0.06] hidden lg:block" />

        {/* Top-left dot grid */}
        <div className="absolute top-6 left-6 hidden lg:grid grid-cols-6 gap-2.5 opacity-50">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#2a66b0]/25" />
          ))}
        </div>

        {/* Bottom-right dot grid */}
        <div className="absolute bottom-10 right-10 hidden lg:grid grid-cols-5 gap-3 opacity-40">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-[#2a66b0]/20" />
          ))}
        </div>

        {/* Top-right large gradient blob */}
        <div className="absolute rounded-full"
          style={{ background: isDark ? "radial-gradient(circle, rgba(38,104,188,0.06) 0%, transparent 70%)" : "radial-gradient(circle, #dbeafe 0%, transparent 70%)", width: 500, height: 500, top: "-10%", right: "-6%", opacity: 0.7 }} />

        {/* Bottom-left gradient blob */}
        <div className="absolute rounded-full"
          style={{ background: isDark ? "radial-gradient(circle, rgba(38,104,188,0.04) 0%, transparent 70%)" : "radial-gradient(circle, #e0f2fe 0%, transparent 70%)", width: 400, height: 400, bottom: "-8%", left: "-4%", opacity: 0.6 }} />

        {/* Mid-right teal accent blob */}
        <div className="absolute rounded-full"
          style={{ background: isDark ? "radial-gradient(circle, rgba(8,145,178,0.05) 0%, transparent 70%)" : "radial-gradient(circle, #ccfbf1 0%, transparent 70%)", width: 300, height: 300, top: "40%", right: "5%", opacity: 0.45 }} />

        {/* Decorative circle — center bottom: outer ring + filled inner */}
        <div className="absolute bottom-20 left-[38%] w-32 h-32 rounded-full hidden lg:block"
          style={{
            border: "3px solid",
            borderColor: isDark ? "rgba(8,145,178,0.2)" : "rgba(42,102,176,0.12)",
          }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full"
            style={{
              background: isDark
                ? "linear-gradient(135deg, rgba(8,145,178,0.35), rgba(42,102,176,0.25))"
                : "linear-gradient(135deg, rgba(42,102,176,0.18), rgba(8,145,178,0.12))",
              boxShadow: isDark
                ? "0 0 20px rgba(8,145,178,0.15)"
                : "0 0 15px rgba(42,102,176,0.08)",
            }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
            style={{
              background: isDark
                ? "linear-gradient(135deg, #0891b2, #2a66b0)"
                : "linear-gradient(135deg, #2a66b0, #0891b2)",
            }}
          />
        </div>

        {/* Decorative circle — top right: filled dot with ring */}
        <div className="absolute top-16 right-[20%] w-20 h-20 rounded-full hidden lg:block"
          style={{
            border: "2px solid",
            borderColor: isDark ? "rgba(8,145,178,0.15)" : "rgba(42,102,176,0.1)",
          }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full"
            style={{
              background: isDark
                ? "linear-gradient(135deg, rgba(42,102,176,0.4), rgba(8,145,178,0.3))"
                : "linear-gradient(135deg, rgba(42,102,176,0.2), rgba(8,145,178,0.15))",
            }}
          />
        </div>

        {/* Small solid filled dot accent */}
        <div className="absolute top-[30%] left-[44%] w-5 h-5 rounded-full hidden lg:block"
          style={{
            background: isDark
              ? "linear-gradient(135deg, #0891b2, #2a66b0)"
              : "linear-gradient(135deg, #2a66b0, #0891b2)",
            opacity: isDark ? 0.4 : 0.25,
            boxShadow: isDark ? "0 0 12px rgba(8,145,178,0.3)" : "0 0 8px rgba(42,102,176,0.15)",
          }}
        />

        {/* Cross / plus shape accent */}
        <div className="absolute top-[60%] right-[12%] hidden lg:block opacity-20">
          <div className="w-6 h-[2px] bg-[#2a66b0] absolute top-1/2 left-0 -translate-y-1/2" />
          <div className="w-[2px] h-6 bg-[#2a66b0] absolute left-1/2 top-0 -translate-x-1/2" />
        </div>

        {/* Diamond shape */}
        <div className="absolute top-[15%] left-[48%] w-5 h-5 border-2 border-[#2a66b0]/12 rotate-45 hidden lg:block" />

        {/* Large faint circle outline */}
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full border border-[#2a66b0]/[0.07] hidden lg:block" />

      </div>

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* ── LEFT: Image column — 3D tilt + parallax ── */}
          <AnimatedSection from="flip3d" className="relative order-2 lg:order-1">

            {/* Main image */}
            <div
              className="relative rounded-3xl overflow-hidden shadow-2xl"
              style={{ aspectRatio: "4/5", maxHeight: 560 }}
            >
              <img
                src={siteImages.about}
                alt="Caregiver providing compassionate home care"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>


            {/* Floating family badge — bottom-left */}
            <div className="absolute bottom-2 left-2 md:-bottom-4 md:left-0 bg-card rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3 border border-border"
              style={{ zIndex: 10 }}>
              <div className="flex -space-x-2">
                {[
                  siteImages.aboutAvatar1,
                  siteImages.aboutAvatar2,
                  siteImages.aboutAvatar3,
                ].map((url, i) => (
                  <img key={i} src={url} alt=""
                    className="w-8 h-8 rounded-full border-2 border-background object-cover" />
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-background bg-[#2a66b0] flex items-center justify-center">
                  <span className="text-white text-[9px] font-bold">500+</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-foreground leading-none">Happy Families</p>
                <p className="text-xs text-muted-foreground mt-0.5">Across New Jersey</p>
              </div>
            </div>

          </AnimatedSection>

          {/* ── RIGHT: Text column — depth push reveal ── */}
          <AnimatedSection from="depth" delay={0.15} className="order-1 lg:order-2">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2a66b0]" />
              <span className="text-xs font-semibold text-[#2a66b0] uppercase tracking-widest">
                About MintexCare
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-bold text-foreground leading-[1.1] mb-5"
              style={{ fontSize: "clamp(2.2rem, 3.8vw, 3.2rem)" }}>
              Trusted Home Care<br />
              <span className="text-[#2a66b0]">Built on Compassion</span>
            </h2>

            {/* Description */}
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6 max-w-[500px]">
              MintexCare is a New Jersey-based home healthcare agency dedicated to
              providing high-quality, personalized care — so your loved ones can
              thrive in the comfort of their own home.
            </p>

            {/* Feature checklist */}
            <ul className="space-y-3 mb-8">
              {features.map(f => (
                <li key={f} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#2a66b0] flex-shrink-0" />
                  <span className="text-sm text-foreground/80 font-medium">{f}</span>
                </li>
              ))}
            </ul>

            {/* Stats grid — vibrant filled icons */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {stats.map(({ value, label, icon: Icon }, i) => {
                const colors = [
                  { bg: "linear-gradient(135deg, #2a66b0, #1d4e8a)", shadow: "rgba(42,102,176,0.3)" },
                  { bg: "linear-gradient(135deg, #0891b2, #0e7490)", shadow: "rgba(8,145,178,0.3)" },
                  { bg: "linear-gradient(135deg, #e11d48, #be123c)", shadow: "rgba(225,29,72,0.3)" },
                  { bg: "linear-gradient(135deg, #0891b2, #06b6d4)", shadow: "rgba(8,145,178,0.3)" },
                ];
                const c = colors[i % colors.length];
                return (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20, rotateX: 15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4, scale: 1.03, boxShadow: `0 12px 30px ${c.shadow}` }}
                  className="flex items-center gap-3 bg-card rounded-2xl px-4 py-3.5 border border-border hover-lift-3d"
                  style={{ perspective: 600 }}
                >
                  <motion.div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: c.bg, boxShadow: `0 4px 12px ${c.shadow}` }}
                    whileHover={{ rotateY: 180, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </motion.div>
                  <div>
                    <p className="text-xl font-bold text-foreground leading-none">{value}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-tight">{label}</p>
                  </div>
                </motion.div>
              );
              })}
            </div>

            {/* CTA */}
            <Link
              to="/about"
              className="inline-flex items-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-full transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, hsl(214 66% 44%) 0%, hsl(192 91% 37%) 100%)", border: "1px solid rgba(255,255,255,0.3)", boxShadow: "0 2px 12px rgba(38,104,188,0.30), inset 0 1px 0 rgba(255,255,255,0.25)", color: "#fff" }}
            >
              Learn More About Us <ArrowRight className="h-4 w-4" />
            </Link>

          </AnimatedSection>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;