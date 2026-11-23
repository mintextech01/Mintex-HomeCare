import { FeatureIcon } from "@/components/Feature";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "@/lib/motion";
import { PhoneCall, ClipboardCheck, FileText, HeartPulse, ArrowRight } from "lucide-react";

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
    <section ref={ref} className="py-14 md:py-20 bg-surface">
      <div className="container mx-auto px-6 md:px-10">

        {/* ── Header ── */}
        <div className="flex items-end justify-between gap-6 mb-12 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65 }}
          >
            <div className="el-eyebrow mb-3">Our process</div>
            <h2 className="text-3xl md:text-[2.625rem] font-serif font-bold text-foreground leading-tight">
              How to get started
            </h2>
          </motion.div>
        </div>

        {/* ── Steps ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[20px] bg-background p-6 md:p-7"
              >
                <div className="flex items-center justify-between gap-3 mb-6">
                  <FeatureIcon icon={Icon} />
                  <span className="rounded-full bg-accent px-3.5 py-1 text-sm font-bold text-primary">Step {i + 1}</span>
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

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/how-it-works" className="el-btn-soft group">
            See How Home Care Works <ArrowRight className="h-4 w-4 flex-shrink-0 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
