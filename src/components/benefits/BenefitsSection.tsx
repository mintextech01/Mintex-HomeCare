import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import { BenefitCard } from "./BenefitCard";
import { benefitsData } from "./BenefitsData";

interface BenefitsSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

// Floating decorative orb component
function FloatingOrb({ delay, size, position }: { delay: number; size: string; position: string }) {
  return (
    <motion.div
      className={`absolute ${size} rounded-full bg-gradient-to-br from-accent to-accent/50 pointer-events-none ${position}`}
      animate={{
        y: [0, -30, 0],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 12 + delay,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export function BenefitsSection({
  title = "Why Work With",
  subtitle = "MintexCare?",
  description = "Join a team that values compassion, dedication, and professional growth. At MintexCare, you'll make a meaningful difference in people's lives every day.",
}: BenefitsSectionProps) {
  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-background via-background to-background/50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient mesh overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
        
        {/* Floating orbs */}
        <FloatingOrb delay={0} size="w-64 h-64" position="top-10 -left-32" />
        <FloatingOrb delay={2} size="w-48 h-48" position="top-1/2 -right-24" />
        <FloatingOrb delay={4} size="w-40 h-40" position="bottom-10 left-1/4" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <p className="section-label mb-3">
            Why Join Us
          </p>
          <h2 className="heading-h2 mb-4 text-balance">
            {title} <span className="text-primary">{subtitle}</span>
          </h2>
          <p className="body-text text-foreground/70">
            {description}
          </p>
        </AnimatedSection>

        {/* Benefits Grid */}
        <AnimatedSection delay={0.1}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {benefitsData.map((benefit, idx) => (
              <BenefitCard key={benefit.id} benefit={benefit} delay={idx * 0.05} />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
