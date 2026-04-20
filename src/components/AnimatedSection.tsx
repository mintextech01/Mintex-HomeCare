import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: "bottom" | "left" | "right" | "scale" | "depth" | "flip3d" | "rotateUp" | "blur";
  duration?: number;
  once?: boolean;
}

const variants = {
  bottom: { hidden: { opacity: 0, y: 40, scale: 1 }, visible: { opacity: 1, y: 0, scale: 1 } },
  left: { hidden: { opacity: 0, x: -50, y: 0, scale: 1 }, visible: { opacity: 1, x: 0, y: 0, scale: 1 } },
  right: { hidden: { opacity: 0, x: 50, y: 0, scale: 1 }, visible: { opacity: 1, x: 0, y: 0, scale: 1 } },
  scale: { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1 } },
  depth: { hidden: { opacity: 0, scale: 0.8, z: -150, filter: "blur(8px)" }, visible: { opacity: 1, scale: 1, z: 0, filter: "blur(0px)" } },
  flip3d: { hidden: { opacity: 0, rotateY: -35, scale: 0.9 }, visible: { opacity: 1, rotateY: 0, scale: 1 } },
  rotateUp: { hidden: { opacity: 0, y: 60, rotateX: 15 }, visible: { opacity: 1, y: 0, rotateX: 0 } },
  blur: { hidden: { opacity: 0, filter: "blur(12px)", scale: 0.95 }, visible: { opacity: 1, filter: "blur(0px)", scale: 1 } },
};

const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
  from = "bottom",
  duration = 0.7,
  once = true,
}: Props) => {
  const variant = variants[from] || variants.bottom;

  return (
    <motion.div
      initial={variant.hidden}
      whileInView={variant.visible}
      viewport={{ once, margin: "-60px" }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={
        from === "depth" || from === "flip3d" || from === "rotateUp"
          ? { perspective: 800, transformStyle: "preserve-3d" }
          : undefined
      }
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
