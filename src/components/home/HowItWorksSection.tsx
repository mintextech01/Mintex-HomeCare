import AnimatedSection from "@/components/AnimatedSection";
import { PhoneCall, ClipboardCheck, FileText, HeartPulse } from "lucide-react";

const steps = [
  { icon: PhoneCall, title: "Contact Us", desc: "Call us or fill out our online form to tell us about your care needs." },
  { icon: ClipboardCheck, title: "Free Consultation", desc: "We'll schedule a complimentary in-home assessment to understand your requirements." },
  { icon: FileText, title: "Custom Care Plan", desc: "Our team creates a personalized care plan tailored to your loved one's needs." },
  { icon: HeartPulse, title: "Care Begins", desc: "A matched, qualified caregiver starts providing compassionate care at home." },
];

const HowItWorksSection = () => (
  <section className="py-16 md:py-20 bg-hero-bg">
    <div className="container mx-auto px-4">
      <AnimatedSection className="text-center mb-12">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2 font-sans">Our Process</p>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Getting Started is Easy</h2>
      </AnimatedSection>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, i) => (
          <AnimatedSection key={step.title} delay={i * 0.15} className="relative">
            <div className="text-center">
              <div className="relative mx-auto mb-5">
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto shadow-lg">
                  <step.icon className="h-7 w-7" />
                </div>
                <div className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center font-sans shadow">
                  {i + 1}
                </div>
              </div>
              <h3 className="font-serif font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed">{step.desc}</p>
            </div>
            {i < 3 && (
              <div className="hidden lg:block absolute top-8 -right-4 w-8 text-border">
                <svg viewBox="0 0 24 8" fill="none" className="w-full"><path d="M0 4h20M16 0l4 4-4 4" stroke="currentColor" strokeWidth="1.5" /></svg>
              </div>
            )}
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
