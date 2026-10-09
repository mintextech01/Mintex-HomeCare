import { Users, Clock, ShieldCheck, Heart } from "lucide-react";
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

  return <div ref={ref} className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-none">{count}{suffix}</div>;
};

const StatsSection = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="pb-16 md:pb-20">
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="el-card flex flex-col justify-between gap-8 p-5 md:p-7 min-h-[170px] md:min-h-[200px]"
            >
              <div className="flex items-start justify-between gap-3">
                <Counter target={stat.value} suffix={stat.suffix} />
                <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center shrink-0">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <p className="text-sm md:text-base font-semibold text-foreground/80 font-sans leading-snug">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
