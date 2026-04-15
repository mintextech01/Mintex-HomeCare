import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PhoneCall, ClipboardCheck, FileText, HeartPulse } from "lucide-react";

const steps = [
  {
    icon: PhoneCall,
    title: "Contact Us",
    desc: "Call us or fill out our online form to tell us about your care needs.",
  },
  {
    icon: ClipboardCheck,
    title: "Free Consultation",
    desc: "We'll schedule a complimentary in-home assessment to understand your requirements.",
  },
  {
    icon: FileText,
    title: "Custom Care Plan",
    desc: "Our team creates a personalized care plan tailored to your loved one's needs.",
  },
  {
    icon: HeartPulse,
    title: "Care Begins",
    desc: "A matched, qualified caregiver starts providing compassionate care at home.",
  },
];

// Full-width road: enters from left edge at y=240, exits right edge at y=240
// Peaks at y=90, valleys at y=240 — viewBox 1200 × 340
const ROAD_PATH =
  "M 0,240 C 80,240 160,240 240,240 C 340,240 400,90 480,90 C 560,90 620,240 720,240 C 820,240 880,90 960,90 C 1060,90 1140,240 1200,240";

const STOPS = [
  { x: 240,  y: 240, labelSide: "bottom" as const, color: "primary" as const },
  { x: 480,  y: 90,  labelSide: "top"    as const, color: "accent"  as const },
  { x: 720,  y: 240, labelSide: "bottom" as const, color: "primary" as const },
  { x: 960,  y: 90,  labelSide: "top"    as const, color: "accent"  as const },
];

const HowItWorksSection = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-20 md:py-28 overflow-hidden">
      {/* subtle dot-grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* ── Header ── */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-start justify-between mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65 }}
          >
            <p className="text-xs font-semibold text-accent uppercase tracking-[0.3em] mb-3 font-sans">
              Our Process
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight">
              Getting Started<br />
              is{" "}
              <span className="text-primary">Easy</span>
            </h2>
          </motion.div>
          <div className="hidden md:block text-[100px] lg:text-[150px] font-serif font-bold leading-none select-none pointer-events-none text-foreground/[0.04]">
            04
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          DESKTOP: Full-Width Winding Road
          ══════════════════════════════════════ */}
      <div
        className="hidden lg:block relative w-full"
        style={{ aspectRatio: "1200 / 340" }}
      >
        {/* Road SVG — spans 100% width, no container padding */}
        <svg
          viewBox="0 0 1200 340"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          fill="none"
        >
          {/* Glow halo */}
          <path
            d={ROAD_PATH}
            stroke="hsl(214 66% 44% / 0.15)"
            strokeWidth="90"
            strokeLinecap="butt"
          />
          {/* Kerb / edge */}
          <path
            d={ROAD_PATH}
            stroke="hsl(220 15% 28%)"
            strokeWidth="62"
            strokeLinecap="butt"
          />
          {/* Asphalt body */}
          <path
            d={ROAD_PATH}
            stroke="hsl(220 15% 12%)"
            strokeWidth="50"
            strokeLinecap="butt"
          />
          {/* Animated centre dashes */}
          <motion.path
            d={ROAD_PATH}
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="22 16"
            animate={{ strokeDashoffset: [0, -38] }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </svg>

        {/* ── Step markers + label cards ── */}
        {STOPS.map((stop, i) => {
          const step = steps[i];
          const Icon = step.icon;
          const isPrimary = stop.color === "primary";

          const leftPct = (stop.x / 1200) * 100;
          const topPct  = (stop.y / 340)  * 100;

          const hexGrad = isPrimary
            ? "linear-gradient(135deg, hsl(214 66% 50%), hsl(214 66% 36%))"
            : "linear-gradient(135deg, hsl(180 84% 42%), hsl(180 84% 28%))";
          const glowColor = isPrimary
            ? "hsl(214 66% 44% / 0.45)"
            : "hsl(180 84% 39% / 0.45)";
          const stepNumColor = isPrimary
            ? "hsl(214 66% 44%)"
            : "hsl(180 60% 36%)";

          return (
            <motion.div
              key={step.title}
              className="absolute"
              style={{
                left: `${leftPct}%`,
                top:  `${topPct}%`,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.2, type: "spring", stiffness: 200 }}
            >
              {/* Animated pulse glow */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: 40, height: 40,
                  top: "50%", left: "50%",
                  marginLeft: -20, marginTop: -20,
                  background: glowColor,
                }}
                animate={{ scale: [1, 2.2], opacity: [0.45, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }}
              />

              {/* Solid filled circle marker */}
              <motion.div
                className="relative z-10 rounded-full flex items-center justify-center"
                style={{
                  width: 36, height: 36,
                  background: hexGrad,
                  boxShadow: `0 0 18px ${glowColor}, 0 3px 10px rgba(0,0,0,0.2)`,
                }}
                whileHover={{ scale: 1.25 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                {/* White inner ring */}
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{
                    width: 22, height: 22,
                    border: "2px solid rgba(255,255,255,0.5)",
                  }}
                >
                  {/* Center white dot */}
                  <div
                    className="rounded-full bg-white"
                    style={{ width: 8, height: 8 }}
                  />
                </div>
              </motion.div>

              {/* Label card — above or below */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 w-52 ${
                  stop.labelSide === "top"
                    ? "bottom-full mb-5"
                    : "top-full mt-5"
                }`}
              >
                {/* Connector line */}
                {stop.labelSide === "top" ? (
                  <div className="flex justify-center mb-1">
                    <div className="w-px h-6" style={{ background: stepNumColor, opacity: 0.4 }} />
                  </div>
                ) : (
                  <div className="flex justify-center mb-1">
                    <div className="w-px h-6" style={{ background: stepNumColor, opacity: 0.4 }} />
                  </div>
                )}

                <div className="glass-card rounded-2xl px-4 py-3.5 text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1.5">
                    <Icon className="h-3.5 w-3.5" style={{ color: stepNumColor }} />
                    <p
                      className="text-[10px] font-bold font-sans tracking-[0.25em] uppercase"
                      style={{ color: stepNumColor }}
                    >
                      Step {String(i + 1).padStart(2, "0")}
                    </p>
                  </div>
                  <h3 className="font-serif font-bold text-foreground text-[15px] mb-1.5 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {stop.labelSide === "bottom" && (
                  <div className="flex justify-center mt-1.5">
                    <div className="w-px h-4" style={{ background: stepNumColor, opacity: 0.5 }} />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ══════════════════════════════════════
          MOBILE: Vertical Timeline
          ══════════════════════════════════════ */}
      <div className="lg:hidden container mx-auto px-4 mt-2">
        <div className="relative">
          {/* Animated vertical line — at left-5 (20px) = center of w-10 icon column */}
          <div className="absolute left-5 top-2 bottom-2 w-0.5 overflow-hidden">
            <motion.div
              className="w-full h-full"
              style={{
                background: "linear-gradient(180deg, hsl(214 66% 44%), hsl(180 84% 39%))",
                transformOrigin: "top",
              }}
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>

          {/* Traveling dot — centered on the line (left: 20px - 3px = 17px) */}
          <motion.span
            className="absolute w-[6px] h-[6px] rounded-full bg-accent z-10"
            style={{ left: "calc(1.25rem - 3px)", boxShadow: "0 0 8px hsl(180 84% 39%)" }}
            initial={{ top: "0%" }}
            animate={inView ? { top: ["0%", "100%"] } : {}}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 0.8 }}
          />

          <div className="flex flex-col gap-5">
            {steps.map((step, i) => {
              const isPrimary = i % 2 === 0;
              const Icon = step.icon;
              const hexGrad = isPrimary
                ? "linear-gradient(135deg, hsl(214 66% 50%), hsl(214 66% 36%))"
                : "linear-gradient(135deg, hsl(180 84% 42%), hsl(180 84% 28%))";
              const stepNumColor = isPrimary
                ? "hsl(214 66% 44%)"
                : "hsl(180 60% 36%)";

              return (
                <motion.div
                  key={step.title}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: 24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.18 }}
                >
                  {/* Dot column — small colored dot on the timeline line */}
                  <div className="flex-shrink-0 w-10 flex items-center justify-center relative z-10 pt-3">
                    <div
                      className="rounded-full flex items-center justify-center"
                      style={{
                        width: 18, height: 18,
                        border: `3px solid ${isPrimary ? "hsl(214 66% 50%)" : "hsl(180 84% 42%)"}`,
                        boxShadow: `0 0 8px ${isPrimary ? "hsl(214 66% 44% / 0.3)" : "hsl(180 84% 39% / 0.3)"}`,
                      }}
                    >
                      <div
                        className="rounded-full"
                        style={{
                          width: 8, height: 8,
                          background: hexGrad,
                        }}
                      />
                    </div>
                  </div>

                  {/* Card */}
                  <div className="flex-1 pb-1">
                    <div className="glass-card rounded-2xl px-5 py-4">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Icon className="h-3.5 w-3.5" style={{ color: stepNumColor }} />
                        <p
                          className="text-[10px] font-bold font-sans tracking-[0.22em] uppercase"
                          style={{ color: stepNumColor }}
                        >
                          Step {String(i + 1).padStart(2, "0")}
                        </p>
                      </div>
                      <h3 className="font-serif font-bold text-foreground text-lg mb-1.5">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
