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

// Wider viewBox (1200 × 340) gives a longer-feeling road
const ROAD_PATH =
  "M 0,260 C 80,260 120,260 180,260 C 300,260 360,100 460,100 C 560,100 640,260 760,260 C 850,260 920,100 1020,100 C 1100,100 1160,100 1200,100";

// Stop coordinates matched to path peaks/valleys
const STOPS = [
  { x: 180,  y: 260, labelSide: "bottom" as const, color: "primary" as const },
  { x: 460,  y: 100, labelSide: "top"    as const, color: "accent"  as const },
  { x: 760,  y: 260, labelSide: "bottom" as const, color: "primary" as const },
  { x: 1020, y: 100, labelSide: "top"    as const, color: "accent"  as const },
];

const HowItWorksSection = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 overflow-hidden"
    >
      {/* ── subtle dot-grid ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">

        {/* ── Header row ── */}
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

          {/* Ghost step count — top right */}
          <div
            className="hidden md:block text-[100px] lg:text-[150px] font-serif font-bold leading-none select-none pointer-events-none text-foreground/[0.04]"
          >
            04
          </div>
        </div>

        {/* ══════════════════════════════════════
            DESKTOP: Winding Road Infographic
            ══════════════════════════════════════ */}
        <div
          className="hidden lg:block relative w-full"
          style={{ aspectRatio: "1200 / 340" }}
        >
          {/* SVG Road — viewBox 1200×340 for a longer road */}
          <svg
            viewBox="0 0 1200 340"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
            fill="none"
          >
            {/* Soft brand-blue glow around road */}
            <path
              d={ROAD_PATH}
              stroke="hsl(214 66% 44% / 0.12)"
              strokeWidth="84"
              strokeLinecap="round"
            />
            {/* Road edge — dark grey kerb */}
            <path
              d={ROAD_PATH}
              stroke="hsl(220 15% 28%)"
              strokeWidth="64"
              strokeLinecap="round"
            />
            {/* Road body — near-black asphalt */}
            <path
              d={ROAD_PATH}
              stroke="hsl(220 15% 10%)"
              strokeWidth="54"
              strokeLinecap="round"
            />
            {/* Animated white centre dashes */}
            <motion.path
              d={ROAD_PATH}
              stroke="rgba(255,255,255,0.38)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="22 16"
              animate={{ strokeDashoffset: [0, -38] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </svg>

          {/* ── Step markers (hexagons) + labels ── */}
          {STOPS.map((stop, i) => {
            const step = steps[i];
            const Icon = step.icon;
            const isPrimary = stop.color === "primary";

            // Convert SVG coordinates → % of container (viewBox 1200×340)
            const leftPct = (stop.x / 1200) * 100;
            const topPct  = (stop.y / 340)  * 100;

            const hexGrad = isPrimary
              ? "linear-gradient(135deg, hsl(214 66% 50%), hsl(214 66% 36%))"
              : "linear-gradient(135deg, hsl(180 84% 42%), hsl(180 84% 28%))";
            const glowColor = isPrimary
              ? "hsl(214 66% 44% / 0.4)"
              : "hsl(180 84% 39% / 0.4)";
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
                {/* Pulse ring */}
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    width: 56, height: 56,
                    top: "50%", left: "50%",
                    marginLeft: -28, marginTop: -28,
                    background: glowColor,
                  }}
                  animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }}
                />

                {/* Hexagon icon */}
                <div
                  className="relative z-10 w-14 h-14 flex items-center justify-center cursor-default"
                  style={{
                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    background: hexGrad,
                    filter: `drop-shadow(0 0 10px ${glowColor})`,
                  }}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>

                {/* Label — above or below */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 w-44 text-center ${
                    stop.labelSide === "top"
                      ? "bottom-full mb-7"
                      : "top-full mt-7"
                  }`}
                >
                  <p
                    className="text-xs font-bold font-sans tracking-[0.28em] mb-1.5"
                    style={{ color: stepNumColor }}
                  >
                    STEP {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-serif font-semibold text-foreground text-base mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ══════════════════════════════════════
            MOBILE: Vertical Timeline
            ══════════════════════════════════════ */}
        <div className="lg:hidden relative pl-12">
          {/* Animated vertical line */}
          <div className="absolute left-5 top-4 bottom-4 w-px overflow-hidden">
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

          {/* Traveling dot */}
          <motion.span
            className="absolute left-[17px] w-[6px] h-[6px] rounded-full bg-accent"
            style={{ boxShadow: "0 0 8px hsl(180 84% 39%)" }}
            initial={{ top: "0%" }}
            animate={inView ? { top: ["0%", "100%"] } : {}}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 0.8 }}
          />

          <div className="space-y-6">
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
                  className="relative"
                  initial={{ opacity: 0, x: 24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.18 }}
                >
                  {/* Hexagon dot on timeline */}
                  <div
                    className="absolute -left-[2.6rem] top-3 h-10 w-10 flex items-center justify-center z-10"
                    style={{
                      clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                      background: hexGrad,
                    }}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>

                  {/* Card — light style */}
                  <div className="bg-white/80 border border-border rounded-xl px-5 py-4 shadow-sm">
                    <p
                      className="text-xs font-bold font-sans tracking-[0.22em] mb-1"
                      style={{ color: stepNumColor }}
                    >
                      STEP {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="font-serif font-semibold text-foreground text-lg mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                      {step.desc}
                    </p>
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