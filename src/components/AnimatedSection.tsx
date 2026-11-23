import { motion } from "@/lib/motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  /** Kept for call-site compatibility; ignored so cards in a row appear together, not one by one. */
  delay?: number;
  /** Kept for call-site compatibility; every block uses the same gentle fade-up. */
  from?: "bottom" | "left" | "right" | "scale" | "depth" | "flip3d" | "rotateUp" | "blur";
  duration?: number;
  once?: boolean;
}

/**
 * One calm reveal for the whole site: a short fade with a small 12px lift.
 * (Staggered delays and flip/blur/zoom effects were removed: they made the site feel like a template.)
 */
const hidden = { opacity: 0, y: 12 };
const visible = { opacity: 1, y: 0 };

const AnimatedSection = ({ children, className = "", duration = 0.5, once = true }: Props) => (
  <motion.div
    initial={hidden}
    whileInView={visible}
    viewport={{ once, margin: "-60px" }}
    transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default AnimatedSection;
