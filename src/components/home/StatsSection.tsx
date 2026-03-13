import { Users, Clock, ShieldCheck, Heart } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { useEffect, useState, useRef } from "react";

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

const StatsSection = () => (
  <section className="py-14 bg-hero-bg border-y border-border">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <AnimatedSection key={stat.label} delay={i * 0.1} className="text-center">
            <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
              <stat.icon className="h-6 w-6 text-accent" />
            </div>
            <Counter target={stat.value} suffix={stat.suffix} />
            <p className="text-sm text-muted-foreground mt-1 font-sans">{stat.label}</p>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
