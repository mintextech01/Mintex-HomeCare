import { Users, Clock, ShieldCheck, Heart } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { icon: Users, value: 500, suffix: "+", label: "Families Served" },
  { icon: Clock, value: 24, suffix: "/7", label: "Care Available" },
  { icon: ShieldCheck, value: 100, suffix: "%", label: "Licensed & Bonded Caregivers" },
  { icon: Heart, value: 100, suffix: "%", label: "Personalized Care Plans" },
];

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 2000;
        const start = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setCount(Math.floor(progress * target));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <div ref={ref} className="text-3xl md:text-4xl font-bold text-primary font-sans">{count}{suffix}</div>;
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, rotateX: 25, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const StatsSection = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-14 bg-[#e8ebed] border-y border-border" style={{ perspective: 1000 }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="text-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3"
                whileHover={{ scale: 1.2, rotateY: 180 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <stat.icon className="h-6 w-6 text-accent" />
              </motion.div>
              <Counter target={stat.value} suffix={stat.suffix} />
              <p className="text-sm text-black-300 mt-1 font-sans">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
