import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import { CheckCircle } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";

const benefits = ["Competitive Compensation", "Flexible Scheduling", "Ongoing Training & Support", "Growth Opportunities"];

const CareersSection = () => {
  const { siteImages } = useAdmin();
  return (
  <section className="py-16 md:py-20">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <AnimatedSection from="left">
          <img
            src={siteImages.careers}
            alt="Healthcare team members"
            className="rounded-xl shadow-xl w-full object-cover h-[350px] transition-transform duration-500 hover:scale-[1.02]"
            loading="lazy"
          />
        </AnimatedSection>
        <AnimatedSection delay={0.2} from="right">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2 font-sans">Join Us</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Join the MintexCare Team</h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-6 font-sans">
            Are you a compassionate, dedicated caregiver looking for a rewarding career? MintexCare is always looking for qualified home health aides, certified nursing assistants, and licensed practical nurses to join our growing team.
          </p>
          <ul className="space-y-3 mb-6">
            {benefits.map((b, i) => (
              <AnimatedSection key={b} delay={0.3 + i * 0.08} from="left">
                <li className="flex items-center gap-2 text-foreground font-sans">
                  <CheckCircle className="h-5 w-5 text-accent shrink-0" /> {b}
                </li>
              </AnimatedSection>
            ))}
          </ul>
          <Link to="/careers">
            <Button size="lg" className="rounded-full px-8 font-semibold hover-scale" style={{ background: "linear-gradient(135deg, hsl(214 66% 44%) 0%, hsl(192 91% 37%) 100%)", border: "1px solid rgba(255,255,255,0.3)", boxShadow: "0 2px 12px rgba(38,104,188,0.30), inset 0 1px 0 rgba(255,255,255,0.25)", color: "#fff" }}>Apply Now</Button>
          </Link>
        </AnimatedSection>
      </div>
    </div>
  </section>
  );
};

export default CareersSection;
