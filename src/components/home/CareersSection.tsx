import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight, Check } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";

const benefits = ["Competitive Compensation", "Flexible Scheduling", "Ongoing Training & Support", "Growth Opportunities"];

const CareersSection = () => {
  const { siteImages } = useAdmin();
  return (
  <section className="py-16 md:py-20">
    <div className="container mx-auto px-6 md:px-10">
      <AnimatedSection>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-14 items-center rounded-[32px] bg-accent p-4 md:p-6 lg:p-8">
          <img
            src={siteImages.careers}
            alt="Healthcare team members"
            className="rounded-[24px] w-full object-cover h-[280px] md:h-[420px]"
            loading="lazy"
          />
          <div className="px-2 pb-4 md:pb-0 md:pr-4">
            <div className="el-eyebrow bg-background border-transparent mb-5">Join Us</div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-accent-foreground mb-4">Join the MintexCare Team</h2>
            <p className="text-base text-accent-foreground/80 leading-relaxed mb-6 font-sans">
              Are you a compassionate, dedicated caregiver looking for a rewarding career? MintexCare is always looking for qualified home health aides, certified nursing assistants, and licensed practical nurses to join our growing team.
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 mb-8">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-sm font-semibold text-accent-foreground font-sans">
                  <span className="h-5 w-5 rounded-full bg-background flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 text-foreground" strokeWidth={3} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <Link to="/careers" className="el-btn-primary group">
              Apply Now <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
  );
};

export default CareersSection;
