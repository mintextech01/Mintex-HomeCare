import AnimatedSection from "@/components/AnimatedSection";
import { ClipboardList, UserCheck, Clock, DollarSign, MessageCircle, ShieldCheck } from "lucide-react";

const features = [
  { icon: ClipboardList, title: "Personalized Care Plans", desc: "Every care plan is custom-tailored to match the unique needs, preferences, and goals of each client." },
  { icon: UserCheck, title: "Certified & Compassionate Caregivers", desc: "Our caregivers are thoroughly vetted, trained, licensed, and passionate about providing exceptional care." },
  { icon: Clock, title: "Available 24/7", desc: "We provide round-the-clock care services including holidays and weekends. Help is always just a call away." },
  { icon: DollarSign, title: "Affordable & Transparent Pricing", desc: "No hidden fees. We work with families to create care plans that fit their budget." },
  { icon: MessageCircle, title: "Family Communication", desc: "Regular updates and open communication so families always know how their loved ones are doing." },
  { icon: ShieldCheck, title: "Licensed & Insured", desc: "Fully licensed by the State of New Jersey, bonded, and insured for your complete peace of mind." },
];

const WhyChooseUsSection = () => (
  <section id="why-choose-us" className="py-16 md:py-20 bg-background">
    <div className="container mx-auto px-4">
      <AnimatedSection className="text-center mb-12">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2 font-sans">Why Us</p>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">Why Families Trust MintexCare</h2>
      </AnimatedSection>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <AnimatedSection key={f.title} delay={i * 0.1}>
            <div className="text-center p-6 rounded-xl hover:bg-hero-bg transition-colors duration-300">
              <div className="h-14 w-14 rounded-full bg-hero-bg flex items-center justify-center mx-auto mb-4">
                <f.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-serif font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed">{f.desc}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUsSection;
