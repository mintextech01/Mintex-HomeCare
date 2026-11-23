import { motion } from "@/lib/motion";
import { Card, CardContent } from "@/components/ui/card";
import { FeatureIcon } from "@/components/Feature";
import { Benefit } from "./BenefitsData";

interface BenefitCardProps {
  benefit: Benefit;
  delay?: number;
}

// `delay` stays in the props for callers, but cards no longer appear one by one.
export function BenefitCard({ benefit }: BenefitCardProps) {
  const IconComponent = benefit.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-full"
    >
      <Card className="h-full rounded-[24px] border-0 shadow-none bg-background transition-shadow duration-300 overflow-hidden group">
        <CardContent className="p-6 md:p-8 flex flex-col h-full">
          {/* Icon Container */}
          <FeatureIcon icon={IconComponent} className="mb-7" />

          {/* Title */}
          <h3 className="text-lg font-bold text-foreground mb-3 leading-tight font-serif">
            {benefit.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed flex-1 font-body">
            {benefit.description}
          </p>

        </CardContent>
      </Card>
    </motion.div>
  );
}
