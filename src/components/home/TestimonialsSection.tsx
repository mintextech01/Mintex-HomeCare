import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { useAdmin } from "@/contexts/AdminContext";

const TestimonialsSection = () => {
  const { testimonials } = useAdmin();
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((current + 1) % testimonials.length);
  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);

  if (testimonials.length === 0) return null;
  const t = testimonials[current];

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-12">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2 font-sans">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">What Families Say About Us</h2>
        </AnimatedSection>
        <AnimatedSection className="max-w-3xl mx-auto">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center shadow-sm">
            <Quote className="h-10 w-10 text-primary/20 mx-auto mb-4" />
            <div className="flex justify-center gap-1 mb-5">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-lg text-foreground italic mb-6 font-sans leading-relaxed">"{t.text}"</p>
            <p className="font-semibold text-foreground font-sans">— {t.name}</p>
            <p className="text-sm text-muted-foreground font-sans">{t.location}</p>

            <div className="flex justify-center gap-4 mt-8">
              <button onClick={prev} className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors" aria-label="Previous testimonial">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)} className={`h-2.5 rounded-full transition-all ${i === current ? "bg-primary w-6" : "bg-border w-2.5"}`} aria-label={`Go to testimonial ${i + 1}`} />
                ))}
              </div>
              <button onClick={next} className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors" aria-label="Next testimonial">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default TestimonialsSection;
