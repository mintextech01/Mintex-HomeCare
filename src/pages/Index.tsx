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
