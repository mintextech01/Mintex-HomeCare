import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight, MapPin } from "lucide-react";
import { COUNTIES } from "@/data/areas";

const ServiceAreasSection = () => (
  <section className="py-14 md:py-20 bg-surface">
    <div className="container mx-auto px-6 md:px-10">
      <AnimatedSection className="text-center mb-12 max-w-3xl mx-auto">
        <div className="el-eyebrow mb-3">Coverage</div>
        <h2 className="text-3xl md:text-[2.625rem] font-serif font-bold text-foreground mb-3 leading-tight">Areas we serve in New Jersey</h2>
        <p className="text-base text-muted-foreground font-sans">MintexCare provides home care across 12 New Jersey counties. Choose yours to see the towns we serve:</p>
      </AnimatedSection>

      {/* Phones: an even 2-column grid (the free wrap left ragged 2-2-1-1-2-1 rows). Wider screens: centred wrap. */}
      <AnimatedSection delay={0.1} className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:justify-center sm:gap-3 max-w-4xl mx-auto">
        {COUNTIES.map((c) => (
          <Link
            key={c.slug}
            to={`/areas-we-serve/${c.slug}`}
            className="group inline-flex items-center gap-2 rounded-full bg-background border border-border px-3.5 sm:px-5 py-3 transition-colors duration-200"
          >
            <MapPin className="h-4 w-4 text-primary shrink-0 transition-colors duration-200" />
            <span className="text-sm font-semibold text-foreground font-sans transition-colors duration-200">
              {c.name} County
            </span>
          </Link>
        ))}
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="text-center mt-10">
        <Link to="/areas-we-serve" className="el-btn-primary group">
          Find your town <ArrowRight className="h-4 w-4 transition-transform" />
        </Link>
        <p className="text-sm text-muted-foreground font-sans mt-5">
          Don't see your area?{" "}
          <Link
            to="/contact"
            className="text-foreground font-semibold underline underline-offset-4 decoration-primary/50 transition-colors"
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
