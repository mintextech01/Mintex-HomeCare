import AnimatedSection from "@/components/AnimatedSection";
import { MapPin } from "lucide-react";

const areas = [
  "Middlesex County", "Monmouth County", "Somerset County", "Union County",
  "Mercer County", "Essex County", "Bergen County", "Hudson County",
  "Passaic County", "Morris County", "Ocean County", "Burlington County",
];

const ServiceAreasSection = () => (
  <section className="py-16 md:py-20 bg-hero-bg">
    <div className="container mx-auto px-4">
      <AnimatedSection className="text-center mb-12">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2 font-sans">Coverage</p>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">Proudly Serving Communities Across New Jersey</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto font-sans">MintexCare provides home care services throughout New Jersey including but not limited to:</p>
      </AnimatedSection>
      <AnimatedSection>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {areas.map(area => (
            <div key={area} className="flex items-center gap-2 p-3.5 bg-card border border-border rounded-lg hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
              <MapPin className="h-4 w-4 text-accent shrink-0" />
              <span className="text-sm font-medium text-foreground font-sans">{area}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground mt-8 font-sans">Don't see your area? <a href="/contact" className="text-primary hover:text-accent font-semibold transition-colors">Contact us</a> — we may still be able to help!</p>
      </AnimatedSection>
    </div>
  </section>
);

export default ServiceAreasSection;
