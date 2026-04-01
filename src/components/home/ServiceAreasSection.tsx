import AnimatedSection from "@/components/AnimatedSection";
import { MapPin } from "lucide-react";

const areas = [
  "Middlesex County", "Monmouth County", "Somerset County", "Union County",
  "Mercer County", "Essex County", "Bergen County", "Hudson County",
  "Passaic County", "Morris County", "Ocean County", "Burlington County",
];

const ServiceAreasSection = () => (
  <section className="py-16 md:py-20">
    <div className="container mx-auto px-4">
      <AnimatedSection className="text-center mb-12">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2 font-sans">Coverage</p>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-3">Proudly Serving Communities Across New Jersey</h2>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto font-sans">MintexCare provides home care services throughout New Jersey including but not limited to:</p>
      </AnimatedSection>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {areas.map((area, i) => (
          <AnimatedSection key={area} delay={i * 0.06} from="scale">
            {/* HOVER CHANGES:
               - Border changes to #102a43
               - Shadow becomes #102a43 with 15% opacity
               - Background gets a very light tint of #102a43
            */}
            <div 
              className="group flex items-center gap-2 p-3.5 bg-card border border-border rounded-lg transition-all duration-300 cursor-default
                         hover:-translate-y-0.5"
              style={{
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#102a43';
                e.currentTarget.style.backgroundColor = 'rgba(16, 42, 67, 0.03)';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(16, 42, 67, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '';
                e.currentTarget.style.backgroundColor = '';
                e.currentTarget.style.boxShadow = '';
              }}
            >
              <MapPin 
                className="h-4 w-4 text-accent shrink-0 transition-colors duration-300 group-hover:text-[#102a43]" 
                style={{ transition: 'color 0.3s' }}
              />
              <span 
                className="text-sm font-medium text-foreground font-sans transition-colors duration-300 group-hover:text-[#102a43]"
              >
                {area}
              </span>
            </div>
          </AnimatedSection>
        ))}
      </div>
      
      <AnimatedSection delay={0.8} className="text-center mt-8">
        <p className="text-sm text-muted-foreground font-sans">
          Don't see your area?{" "}
          <a 
            href="/contact" 
            className="text-primary font-semibold transition-colors hover:text-[#102a43]"
          >
            Contact us
          </a>
          {" "}— we may still be able to help!
        </p>
      </AnimatedSection>
    </div>
  </section>
);

export default ServiceAreasSection; 