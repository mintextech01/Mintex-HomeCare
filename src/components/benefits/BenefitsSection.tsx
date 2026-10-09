import AnimatedSection from "@/components/AnimatedSection";
import { BenefitCard } from "./BenefitCard";
import { benefitsData } from "./BenefitsData";

interface BenefitsSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

export function BenefitsSection({
  title = "Why Work With",
  subtitle = "MintexCare?",
  description = "Join a team that values compassion, dedication, and professional growth. At MintexCare, you'll make a meaningful difference in people's lives every day.",
}: BenefitsSectionProps) {
  return (
    <section className="py-20 md:py-28 bg-surface">
      <div className="container mx-auto px-6 md:px-10">
        {/* Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <div className="el-eyebrow bg-background mb-5">Why Join Us</div>
          <h2 className="heading-h2 mb-4 text-balance">
            {title} <span className="text-primary">{subtitle}</span>
          </h2>
          <p className="body-text text-muted-foreground">
            {description}
          </p>
        </AnimatedSection>

        {/* Benefits Grid */}
        <AnimatedSection delay={0.1}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {benefitsData.map((benefit, idx) => (
              <BenefitCard key={benefit.id} benefit={benefit} delay={idx * 0.05} />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
