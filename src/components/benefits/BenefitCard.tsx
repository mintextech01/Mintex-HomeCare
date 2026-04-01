import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Benefit } from "./BenefitsData";

interface BenefitCardProps {
  benefit: Benefit;
  delay?: number;
}

export function BenefitCard({ benefit, delay = 0 }: BenefitCardProps) {
  const IconComponent = benefit.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card className="h-full border-border/50 bg-card hover:border-accent/30 hover:shadow-lg transition-all duration-300 overflow-hidden group">
        <CardContent className="p-6 md:p-8 flex flex-col h-full">
          {/* Icon Container */}
          <motion.div
            className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/15 transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <IconComponent className="h-6 w-6 text-accent" />
          </motion.div>

          {/* Title */}
          <h3 className="text-lg font-bold text-foreground mb-3 leading-tight font-serif">
            {benefit.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-foreground/70 leading-relaxed flex-1 font-body">
            {benefit.description}
          </p>

          {/* Bottom accent line (appears on hover) */}
          <motion.div
            className="h-1 bg-gradient-to-r from-accent to-accent/50 rounded-full mt-5 origin-left"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
