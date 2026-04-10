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
import { usePageScrollProgress } from "@/hooks/useScrollAnimations";
import { motion } from "framer-motion";

const Index = () => {
  const scrollProgress = usePageScrollProgress();

  return (
    <>
      {/* ── Scroll progress bar ── */}
      <motion.div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* ── Liquid Glass ambient background — morphing blobs ── */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Primary blue orb — top-left — morphing */}
        <div
          className="glass-orb glass-orb-blue animate-morph-blob"
          style={{ top: "-180px", left: "-180px" }}
        />
        {/* Cyan orb — bottom-right — morphing */}
        <div
          className="glass-orb glass-orb-cyan animate-morph-blob"
          style={{ bottom: "5%", right: "-140px", animationDelay: "-5s" }}
        />
        {/* Teal orb — center — morphing */}
        <div
          className="glass-orb glass-orb-teal animate-morph-blob"
          style={{ top: "42%", left: "38%", animationDelay: "-10s" }}
        />
        {/* Indigo accent — top-right */}
        <div
          className="glass-orb glass-orb-indigo animate-morph-blob"
          style={{ top: "8%", right: "12%", animationDelay: "-3s" }}
        />
        {/* Extra subtle blue — bottom-left */}
        <div
          className="glass-orb glass-orb-blue animate-morph-blob"
          style={{ bottom: "18%", left: "5%", opacity: 0.5, width: "380px", height: "380px", animationDelay: "-8s" }}
        />
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
      <ScrollToTop />
      <WhatsAppButton />
    </>
  );
};

export default Index;
