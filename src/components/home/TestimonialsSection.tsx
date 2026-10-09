import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Users, Award, ThumbsUp, Clock, Quote } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { useAdmin } from "@/contexts/AdminContext";
import { motion, AnimatePresence } from "framer-motion";

const stats = [
  { icon: Clock,    value: "24",   unit: "/7", label: "Care Available"   },
  { icon: Users,    value: "500",  unit: "+", label: "Families Served"   },
  { icon: Award,    value: "10",   unit: "+", label: "Years of Care"     },
  { icon: ThumbsUp, value: "99",   unit: "%", label: "Client Satisfaction" },
];

const TestimonialsSection = () => {
  const { testimonials } = useAdmin();
  const [current, setCurrent]     = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (next: number) => {
    setDirection(next > current ? 1 : -1);
    setCurrent((next + testimonials.length) % testimonials.length);
  };

  if (testimonials.length === 0) return null;
  const t = testimonials[current];

  return (
    <section className="py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-[5fr_7fr] gap-12 lg:gap-16 items-center">

          {/* ── LEFT: label + heading + stats + nav ── */}
          <AnimatedSection>
            <div className="el-eyebrow mb-5">Testimonials</div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-snug mb-4">
              What Families Say About Us
            </h2>
            <p className="text-base text-muted-foreground font-sans leading-relaxed mb-10 max-w-sm">
              Real stories from the families we have had the privilege of serving every day.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-10">
              {stats.map((s) => (
                <div key={s.label} className="el-card px-5 py-4">
                  <div className="flex items-center gap-2 mb-1">
                    <s.icon className="h-4 w-4 text-primary" />
                    <span className="text-xl font-serif font-bold text-foreground">
                      {s.value}{s.unit}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground font-sans">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => go(current - 1)}
                className="h-12 w-12 rounded-full border border-border bg-background flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors duration-200"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-sm font-sans font-semibold text-muted-foreground tabular-nums">
                {current + 1} / {testimonials.length}
              </span>
              <button
                onClick={() => go(current + 1)}
                className="h-12 w-12 rounded-full border border-border bg-background flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors duration-200"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </AnimatedSection>

          {/* ── RIGHT: testimonial card ── */}
          <AnimatedSection delay={0.1}>
            <div className="relative el-card rounded-[28px] p-8 md:p-12 overflow-hidden">

              <div className="flex items-center justify-between mb-8">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < t.rating ? "fill-amber-400 text-amber-400" : "fill-border text-border"
                      }`}
                    />
                  ))}
                </div>
                <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center">
                  <Quote className="h-5 w-5 text-accent-foreground" />
                </div>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: direction * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -40 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                  <p className="text-foreground text-lg md:text-xl font-sans leading-relaxed mb-10">
                    "{t.text}"
                  </p>

                  <div className="flex items-center gap-4 pt-6 border-t border-border">
                    <div className="h-12 w-12 rounded-full bg-foreground flex items-center justify-center flex-shrink-0 text-background font-serif font-bold text-xl">
                      {t.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-serif font-semibold text-foreground text-base leading-none mb-1">
                        {t.name}
                      </p>
                      <p className="text-sm text-muted-foreground font-sans">{t.location}</p>
                    </div>
                    <div className="flex items-center gap-1.5 bg-background text-foreground text-xs font-sans font-semibold px-3 py-1.5 rounded-full">
                      <svg viewBox="0 0 12 12" className="h-3 w-3 flex-shrink-0" fill="none">
                        <circle cx="6" cy="6" r="5.5" fill="hsl(160 84% 34%)" />
                        <path d="M3 6l2 2 4-4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Verified
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress dots */}
              <div className="flex gap-1.5 mt-8">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === current
                        ? "bg-foreground w-8"
                        : "bg-foreground/15 w-1.5 hover:bg-foreground/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
