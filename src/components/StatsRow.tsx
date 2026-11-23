import type { LucideIcon } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { FeatureIcon } from "@/components/Feature";

export type Stat = { icon: LucideIcon; value: string; label: string };

/**
 * Key numbers as one calm strip: a single panel split by hairlines (gap-px over the border colour),
 * each item = two-tone icon beside a big number with its label underneath. Replaces four tall separate boxes.
 */
const StatsRow = ({ stats, className = "" }: { stats: Stat[]; className?: string }) => (
  <AnimatedSection className={className}>
    <ul className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border rounded-[20px] overflow-hidden">
      {stats.map(({ icon, value, label }) => (
        <li key={label} className="bg-card flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 px-5 py-6 md:px-7 md:py-7">
          <FeatureIcon icon={icon} size="md" />
          <div className="min-w-0">
            <p className="text-3xl md:text-4xl font-serif font-bold text-foreground leading-none">{value}</p>
            <p className="text-base text-muted-foreground leading-snug mt-1.5">{label}</p>
          </div>
        </li>
      ))}
    </ul>
  </AnimatedSection>
);

export default StatsRow;
