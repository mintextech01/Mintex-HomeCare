import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import { CheckCircle } from "lucide-react";

const benefits = ["Competitive Compensation", "Flexible Scheduling", "Ongoing Training & Support", "Growth Opportunities"];

const CareersSection = () => (
  <section className="py-16 md:py-20 bg-background">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <AnimatedSection>
          <img
            src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop"
            alt="Healthcare team members"
            className="rounded-xl shadow-xl w-full object-cover h-[350px]"
            loading="lazy"
          />
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2 font-sans">Join Us</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Join the MintexCare Team</h2>
          <p className="text-muted-foreground leading-relaxed mb-6 font-sans">
            Are you a compassionate, dedicated caregiver looking for a rewarding career? MintexCare is always looking for qualified home health aides, certified nursing assistants, and licensed practical nurses to join our growing team.
          </p>
          <ul className="space-y-3 mb-6">
            {benefits.map(b => (
              <li key={b} className="flex items-center gap-2 text-foreground font-sans">
                <CheckCircle className="h-5 w-5 text-accent shrink-0" /> {b}
              </li>
            ))}
          </ul>
          <Link to="/careers">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 font-sans hover-scale">Apply Now</Button>
          </Link>
        </AnimatedSection>
      </div>
    </div>
  </section>
);

export default CareersSection;
