import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight, MapPin } from "lucide-react";
import { COUNTIES } from "@/data/areas";

const ServiceAreasSection = () => (
  <section className="py-20 md:py-24 bg-surface">
    <div className="container mx-auto px-6 md:px-10">
      <AnimatedSection className="text-center mb-12 max-w-3xl mx-auto">
        <div className="el-eyebrow bg-background mb-5">Coverage</div>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Proudly Serving Communities Across New Jersey</h2>
        <p className="text-base text-muted-foreground font-sans">MintexCare provides home care across 12 New Jersey counties. Choose yours to see the towns we serve:</p>
      </AnimatedSection>

      <AnimatedSection delay={0.1} className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
        {COUNTIES.map((c) => (
          <Link
            key={c.slug}
            to={`/areas-we-serve/${c.slug}`}
            className="group inline-flex items-center gap-2 rounded-full bg-background border border-border px-5 py-3 transition-colors duration-200 hover:bg-foreground hover:border-foreground"
          >
            <MapPin className="h-4 w-4 text-primary shrink-0 transition-colors duration-200 group-hover:text-background" />
            <span className="text-sm font-semibold text-foreground font-sans transition-colors duration-200 group-hover:text-background">
              {c.name} County
            </span>
          </Link>
        ))}
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="text-center mt-10">
        <Link to="/areas-we-serve" className="el-btn-primary group">
          Find your town <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
        <p className="text-sm text-muted-foreground font-sans mt-5">
          Don't see your area?{" "}
          <Link
            to="/contact"
            className="text-foreground font-semibold underline underline-offset-4 decoration-primary/50 transition-colors hover:text-primary"
          >
            Contact us
          </Link>
          {" "}— we may still be able to help!
        </p>
      </AnimatedSection>
    </div>
  </section>
);

export default ServiceAreasSection;
