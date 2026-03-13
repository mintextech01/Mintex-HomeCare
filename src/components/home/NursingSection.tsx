import AnimatedSection from "@/components/AnimatedSection";
import { useAdmin } from "@/contexts/AdminContext";
import { getIcon } from "@/lib/iconMap";

const NursingSection = () => {
  const { services } = useAdmin();
  const nursingServices = services.filter(s => s.category === "nursing");

  return (
    <section className="py-16 md:py-20 bg-hero-bg">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-12">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2 font-sans">Specialized Care</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">Skilled Nursing Facility Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-sans">Supporting patients in achieving maximum independence and quality of life through specialized clinical care</p>
        </AnimatedSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {nursingServices.map((s, i) => {
            const Icon = getIcon(s.icon);
            return (
              <AnimatedSection key={s.id} delay={i * 0.1}>
                <div className="group p-6 rounded-xl bg-card border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
                    <Icon className="h-6 w-6 text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <h3 className="font-serif font-semibold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground font-sans leading-relaxed">{s.description}</p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NursingSection;
