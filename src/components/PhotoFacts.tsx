import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { FeatureIcon } from "@/components/Feature";

export type PhotoFact = { icon: LucideIcon; title: ReactNode; text?: ReactNode };

/**
 * Short facts shown in a calm row UNDER a photo (two-tone icon + bold title + small text),
 * instead of floating badge cards overlapping the image.
 */
// `className` replaces the default top margin (mt-6) when given.
const PhotoFacts = ({ facts, className = "mt-6" }: { facts: PhotoFact[]; className?: string }) => (
  <ul className={`flex flex-wrap gap-x-8 gap-y-4 ${className}`}>
    {facts.map(({ icon, title, text }, i) => (
      <li key={i} className="flex items-center gap-3">
        <FeatureIcon icon={icon} size="sm" />
        <div>
          <p className="text-base font-bold text-foreground leading-snug">{title}</p>
          {text && <p className="text-sm text-muted-foreground leading-snug">{text}</p>}
        </div>
      </li>
    ))}
  </ul>
);

export default PhotoFacts;
