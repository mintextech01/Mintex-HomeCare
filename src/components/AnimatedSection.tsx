import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: "bottom" | "left" | "right" | "scale";
}

const AnimatedSection = ({ children, className = "", delay = 0, from = "bottom" }: Props) => {
  const initial =
    from === "left"  ? { opacity: 0, x: -40, y: 0, scale: 1 } :
    from === "right" ? { opacity: 0, x:  40, y: 0, scale: 1 } :
    from === "scale" ? { opacity: 0, x: 0,   y: 0, scale: 0.92 } :
                       { opacity: 0, x: 0,   y: 32, scale: 1 };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
