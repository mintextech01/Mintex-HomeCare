import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import { useAdmin } from "@/contexts/AdminContext";
import { getIcon } from "@/lib/iconMap";

const ServicesSection = () => {
  const { services } = useAdmin();
  const homeServices = services.filter(s => s.category === "home");

  return (
    <section id="services" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-12">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2 font-sans">What We Offer</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">Our Home Care Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-sans">Comprehensive care solutions designed to improve your general health and well-being</p>
        </AnimatedSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {homeServices.slice(0, 8).map((service, i) => {
            const Icon = getIcon(service.icon);
            return (
              <AnimatedSection key={service.id} delay={i * 0.05}>
                <div className="group p-6 rounded-xl border border-border bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="h-12 w-12 rounded-lg bg-hero-bg flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
                    <Icon className="h-6 w-6 text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <h3 className="font-serif font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground font-sans leading-relaxed">{service.description}</p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
        <AnimatedSection className="text-center mt-10">
          <Link to="/services">
            <Button size="lg" className="rounded-full px-8 font-sans hover-scale">View All Services</Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ServicesSection;
