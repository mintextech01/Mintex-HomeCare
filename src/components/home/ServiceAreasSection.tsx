import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { COUNTIES } from "@/data/areas";

const MotionLink = motion.create(Link);

const ServiceAreasSection = () => (
  <section className="py-16 md:py-20">
    <div className="container mx-auto px-4">
      <AnimatedSection className="text-center mb-12">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2 font-sans">Coverage</p>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-3">Proudly Serving Communities Across New Jersey</h2>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto font-sans">MintexCare provides home care across 12 New Jersey counties. Choose yours to see the towns we serve:</p>
      </AnimatedSection>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {COUNTIES.map((c, i) => (
          <AnimatedSection key={c.slug} delay={i * 0.05} from="scale">
            <MotionLink
              to={`/areas-we-serve/${c.slug}`}
              className="group flex items-center gap-2 p-3.5 bg-card border border-border rounded-lg transition-all duration-300 hover:bg-primary/5 hover:border-primary/20 hover:shadow-lg dark:hover:bg-primary/10 dark:hover:border-primary/30"
              whileHover={{
                y: -3,
                scale: 1.04,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <motion.div
                whileHover={{ rotate: [0, -15, 15, 0], scale: 1.2 }}
                transition={{ duration: 0.5 }}
              >
                <MapPin className="h-4 w-4 text-accent shrink-0 transition-colors duration-300 group-hover:text-primary dark:group-hover:text-white" />
              </motion.div>
              <span className="text-sm font-medium text-foreground font-sans transition-colors duration-300 group-hover:text-primary dark:group-hover:text-white">
                {c.name} County
              </span>
            </MotionLink>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection delay={0.8} className="text-center mt-8">
        <Link to="/areas-we-serve" className="inline-flex items-center gap-2 text-primary font-semibold font-sans hover:gap-3 transition-all">
          Find your town <ArrowRight className="h-4 w-4" />
        </Link>
        <p className="text-sm text-muted-foreground font-sans mt-3">
          Don't see your area?{" "}
          <Link
            to="/contact"
            className="text-primary font-semibold transition-colors hover:text-[#102a43]"
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