import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Users, Award, ThumbsUp } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { useAdmin } from "@/contexts/AdminContext";
import { motion, AnimatePresence } from "framer-motion";

const stats = [
  { icon: Star,     value: "4.9",  unit: "★", label: "Average Rating"   },
  { icon: Users,    value: "200",  unit: "+", label: "Families Served"   },
  { icon: Award,    value: "10",   unit: "+", label: "Years of Care"     },
  { icon: ThumbsUp, value: "98",   unit: "%", label: "Satisfaction Rate" },
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
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[5fr_7fr] gap-12 lg:gap-20 items-center">

          {/* ── LEFT: label + heading + stats + nav ── */}
          <AnimatedSection from="left">

            <h1 className="text-xs font-bold text-accent uppercase tracking-[0.22em] mb-3 font-sans">
              Testimonials
            </h1>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-snug mb-3">
              What Families Say About Us
            </h2>
            <p className="text-base text-muted-foreground font-sans leading-relaxed mb-10 max-w-xs">
              Real stories from the families we have had the privilege of serving every day.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-border hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <s.icon className="h-4 w-4 text-accent" />
                    <span className="text-xl font-serif font-bold text-foreground">
                      {s.value}
                      <span className="text-accent text-base">{s.unit}</span>
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
                className="h-11 w-11 rounded-full bg-white border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 shadow-sm"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-sm font-sans text-muted-foreground tabular-nums">
                {current + 1} / {testimonials.length}
              </span>
              <button
                onClick={() => go(current + 1)}
                className="h-11 w-11 rounded-full bg-white border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 shadow-sm"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </AnimatedSection>

          {/* ── RIGHT: stacked testimonial card ── */}
          <AnimatedSection from="right">
            <div className="relative">

              {/* Stacked shadow cards */}
              <div className="absolute inset-0 bg-accent/15  rounded-3xl translate-x-2 translate-y-2 sm:translate-x-4 sm:translate-y-4" />
              <div className="absolute inset-0 bg-primary/8 rounded-3xl translate-x-1 translate-y-1 sm:translate-x-2 sm:translate-y-2" />

              {/* Main card */}
              <div className="relative bg-white rounded-3xl p-8 md:p-10 shadow-xl overflow-hidden">

                {/* Giant decorative quote watermark */}
                <span className="absolute -top-4 right-4 text-[160px] font-serif leading-none text-primary/[0.05] select-none pointer-events-none">
                  "
                </span>

                {/* Stars — outside animation so they don't flash */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 transition-colors duration-300 ${
                        i < t.rating ? "fill-accent text-accent" : "fill-border text-border"
                      }`}
                    />
                  ))}
                </div>

                {/* Animated content */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, x: direction * 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -50 }}
                    transition={{ duration: 0.38, ease: "easeInOut" }}
                  >
                    {/* Quote text */}
                    <p className="text-foreground text-lg md:text-xl font-sans italic leading-relaxed mb-8">
                      "{t.text}"
                    </p>

                    {/* Author row */}
                    <div className="flex items-center gap-4">
                      {/* Avatar initial */}
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 text-white font-serif font-bold text-xl shadow-md">
                        {t.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="font-serif font-semibold text-foreground text-base leading-none mb-1">
                          {t.name}
                        </p>
                        <p className="text-sm text-muted-foreground font-sans">{t.location}</p>
                      </div>
                      {/* Verified pill */}
                      <div className="flex items-center gap-1.5 bg-accent/10 text-accent text-xs font-sans font-semibold px-3 py-1 rounded-full">
                        <svg viewBox="0 0 12 12" className="h-3 w-3 flex-shrink-0" fill="none">
                          <circle cx="6" cy="6" r="5.5" fill="hsl(160 84% 39%)" />
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
                          ? "bg-primary w-8"
                          : "bg-border w-1.5 hover:bg-primary/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
