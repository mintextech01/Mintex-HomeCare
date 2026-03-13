import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { Target } from "lucide-react";

const AboutSection = () => (
  <section id="about" className="py-16 md:py-20 bg-background">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <AnimatedSection>
          <img
            src="https://images.unsplash.com/photo-1581579438747-104c53d7fbc4?w=600&h=500&fit=crop"
            alt="Caregiver helping elderly person at home"
            className="rounded-xl shadow-xl w-full object-cover h-[400px]"
            loading="lazy"
          />
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2 font-sans">About Us</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-5">About MintexCare</h2>
          <p className="text-muted-foreground leading-relaxed mb-4 font-sans">
            MintexCare is a trusted home healthcare agency based in New Jersey, dedicated to providing compassionate, high-quality care to individuals in the comfort of their own homes. Our team of skilled and certified caregivers is committed to enhancing the quality of life for seniors, individuals recovering from surgery, and those living with chronic conditions.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6 font-sans">
            We believe every person deserves dignified, personalized care — and we deliver exactly that. From hourly companion visits to 24/7 live-in care, our flexible service plans are designed around your family's unique needs.
          </p>
          <Link to="/about" className="text-primary font-semibold hover:text-accent transition-colors font-sans inline-block mb-8">
            Learn More About Us →
          </Link>
          <div className="p-5 bg-hero-bg rounded-xl border border-border">
            <div className="flex items-start gap-3">
              <Target className="h-6 w-6 text-accent mt-0.5 shrink-0" />
              <div>
                <h3 className="font-serif font-semibold text-foreground mb-1">Our Mission</h3>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">To deliver exceptional, client-centered home care services that promote independence, dignity, and peace of mind for our clients and their families.</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  </section>
);

export default AboutSection;
