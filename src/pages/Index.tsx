import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import NursingSection from "@/components/home/NursingSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ServiceAreasSection from "@/components/home/ServiceAreasSection";
import CareersSection from "@/components/home/CareersSection";
import GallerySection from "@/components/home/GallerySection";
import ContactSection from "@/components/home/ContactSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import FloatingCTA from "@/components/FloatingCTA";

const Index = () => (
  <>
    {/* ── Liquid Glass ambient background ── */}
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Primary blue orb — top-left */}
      <div className="glass-orb glass-orb-blue"  style={{ top: "-180px",  left: "-180px" }} />
      {/* Cyan orb — bottom-right */}
      <div className="glass-orb glass-orb-cyan"  style={{ bottom: "5%",   right: "-140px" }} />
      {/* Teal orb — center */}
      <div className="glass-orb glass-orb-teal"  style={{ top: "42%",     left: "38%" }} />
      {/* Indigo accent — top-right */}
      <div className="glass-orb glass-orb-indigo" style={{ top: "8%",     right: "12%" }} />
      {/* Extra subtle blue — bottom-left */}
      <div className="glass-orb glass-orb-blue"  style={{ bottom: "18%",  left: "5%",   opacity: 0.5, width: "380px", height: "380px" }} />
    </div>

    <Header />
    <main>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ServicesSection />
      <NursingSection />
      <WhyChooseUsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <ServiceAreasSection />
      <GallerySection />
      <CareersSection />
      <ContactSection />
    </main>
    <Footer />
    <FloatingCTA />
    <ScrollToTop />
    <WhatsAppButton />
  </>
);

export default Index;
