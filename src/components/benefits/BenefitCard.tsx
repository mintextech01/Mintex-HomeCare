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
      className="h-full"
    >
      <Card className="h-full rounded-[24px] border-0 shadow-none bg-background hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.15)] transition-shadow duration-300 overflow-hidden group">
        <CardContent className="p-6 md:p-8 flex flex-col h-full">
          {/* Icon Container */}
          <motion.div
            className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-7 group-hover:bg-foreground transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <IconComponent className="h-6 w-6 text-accent-foreground group-hover:text-background transition-colors duration-300" />
          </motion.div>

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
