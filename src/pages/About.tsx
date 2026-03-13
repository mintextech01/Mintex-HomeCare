import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import AnimatedSection from "@/components/AnimatedSection";
import { useAdmin } from "@/contexts/AdminContext";
import { Link } from "react-router-dom";
import { Target, Eye, Heart, CheckCircle } from "lucide-react";

const values = ["Compassion", "Integrity", "Excellence", "Respect", "Accountability"];

const About = () => {
  const { teamMembers } = useAdmin();

  return (
    <>
      <Header />
      <main>
        <section className="pt-28 pb-12 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <p className="text-sm font-sans text-white/70 mb-2"><Link to="/" className="hover:text-accent">Home</Link> / About</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold">About MintexCare</h1>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <AnimatedSection>
                <img src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&h=500&fit=crop" alt="MintexCare team providing home care" className="rounded-lg shadow-lg w-full object-cover h-[400px]" loading="lazy" />
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Our Story</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 font-sans">MintexCare was founded with a simple yet powerful vision: to provide compassionate, high-quality home care services that allow individuals to age with dignity in the comfort of their own homes.</p>
                <p className="text-muted-foreground leading-relaxed mb-4 font-sans">Based in New Jersey, we have grown from a small team of dedicated caregivers into a trusted healthcare agency serving families across the state. Our commitment to excellence, personalized attention, and genuine compassion sets us apart.</p>
                <p className="text-muted-foreground leading-relaxed font-sans">Every member of our team shares a deep passion for improving lives and supporting families through life's most challenging moments.</p>
              </AnimatedSection>
            </div>
          </div>
        </section>

        <section className="py-16 bg-hero-bg">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-foreground">Our Mission, Vision & Values</h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-3 gap-8">
              <AnimatedSection>
                <div className="bg-card border border-border rounded-xl p-8 text-center h-full">
                  <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">Mission</h3>
                  <p className="text-sm text-muted-foreground font-sans">To deliver exceptional, client-centered home care services that promote independence, dignity, and peace of mind for our clients and their families.</p>
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.1}>
                <div className="bg-card border border-border rounded-xl p-8 text-center h-full">
                  <Eye className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">Vision</h3>
                  <p className="text-sm text-muted-foreground font-sans">To be the most trusted home care provider in New Jersey, known for compassion, reliability, and excellence in care.</p>
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <div className="bg-card border border-border rounded-xl p-8 text-center h-full">
                  <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">Values</h3>
                  <div className="space-y-2">
                    {values.map(v => (
                      <div key={v} className="flex items-center gap-2 justify-center text-sm text-muted-foreground font-sans">
                        <CheckCircle className="h-4 w-4 text-accent shrink-0" /> {v}
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-foreground">Meet Our Team</h2>
            </AnimatedSection>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {teamMembers.map((m, i) => (
                <AnimatedSection key={m.id} delay={i * 0.1}>
                  <div className="bg-card border border-border rounded-xl overflow-hidden text-center">
                    <img src={m.photoUrl} alt={m.name} className="w-full h-56 object-cover" loading="lazy" />
                    <div className="p-5">
                      <h3 className="font-serif font-semibold text-foreground">{m.name}</h3>
                      <p className="text-sm text-accent font-medium font-sans mb-2">{m.role}</p>
                      <p className="text-sm text-muted-foreground font-sans">{m.bio}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
    </>
  );
};

export default About;
