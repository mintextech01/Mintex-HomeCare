import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import AnimatedSection from "@/components/AnimatedSection";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/contexts/AdminContext";
import { getIcon } from "@/lib/iconMap";

const Services = () => {
  const { services } = useAdmin();
  const homeServices = services.filter(s => s.category === "home");
  const nursingServices = services.filter(s => s.category === "nursing");

  return (
    <>
      <Header />
      <main>
        <section className="pt-28 pb-12 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <p className="text-sm font-sans text-white/70 mb-2"><Link to="/" className="hover:text-accent">Home</Link> / Services</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold">Our Services</h1>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-foreground mb-3">Home Care Services</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto font-sans">Comprehensive care solutions tailored to your unique needs</p>
            </AnimatedSection>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {homeServices.map((s, i) => {
                const Icon = getIcon(s.icon);
                return (
                  <AnimatedSection key={s.id} delay={i * 0.03}>
                    <div className="group p-6 rounded-lg border border-border bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                      <Icon className="h-10 w-10 text-primary mb-4 group-hover:text-accent transition-colors" />
                      <h3 className="font-serif font-semibold text-foreground mb-2">{s.title}</h3>
                      <p className="text-sm text-muted-foreground font-sans">{s.description}</p>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 bg-hero-bg">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-foreground mb-3">Skilled Nursing Facility Services</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto font-sans">Specialized clinical care for maximum independence and quality of life</p>
            </AnimatedSection>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {nursingServices.map((s, i) => {
                const Icon = getIcon(s.icon);
                return (
                  <AnimatedSection key={s.id} delay={i * 0.05}>
                    <div className="group p-6 rounded-lg bg-card border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                      <Icon className="h-10 w-10 text-primary mb-4 group-hover:text-accent transition-colors" />
                      <h3 className="font-serif font-semibold text-foreground mb-2">{s.title}</h3>
                      <p className="text-sm text-muted-foreground font-sans">{s.description}</p>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 text-center">
            <AnimatedSection>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Need Help Choosing?</h2>
              <p className="text-muted-foreground mb-6 font-sans">Contact us to discuss which services are right for your loved one.</p>
              <Link to="/contact"><Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 font-sans">Contact Us Today</Button></Link>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
    </>
  );
};

export default Services;
