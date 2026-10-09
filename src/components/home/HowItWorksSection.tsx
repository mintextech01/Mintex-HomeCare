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

const HowItWorksSection = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-surface">
      <div className="container mx-auto px-6 md:px-10">

        {/* ── Header ── */}
        <div className="flex items-end justify-between gap-6 mb-12 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65 }}
          >
            <div className="el-eyebrow bg-background mb-5">Our Process</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight">
              Getting Started<br />
              is{" "}
              <span className="text-primary">Easy</span>
            </h2>
          </motion.div>
          <div
            aria-hidden="true"
            className="hidden md:block text-[100px] lg:text-[140px] font-serif font-bold leading-none select-none pointer-events-none text-foreground/[0.06]"
          >
            04
          </div>
        </div>

        {/* ── Steps ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[24px] bg-background p-6 md:p-7"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="h-14 w-14 rounded-2xl bg-accent flex items-center justify-center">
                    <Icon className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <span className="text-xs font-bold font-sans tracking-[0.2em] uppercase text-muted-foreground">
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-foreground text-xl mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
