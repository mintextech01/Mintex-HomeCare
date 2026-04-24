import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import NursingSection from "@/components/home/NursingSection";

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


      <Header />
      <main className="overflow-x-hidden">
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <ServicesSection />
        <NursingSection />

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
