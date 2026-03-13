import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=1920&q=80')" }}
    />
    <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/55 to-primary/30" />

    <div className="relative z-10 container mx-auto px-4 text-center text-white max-w-4xl pt-20">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6"
      >
        Compassionate Home Care Services in New Jersey
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto font-sans leading-relaxed"
      >
        MintexCare provides trusted, personalized in-home care services that help your loved ones live safely, comfortably, and independently at home. Care you can believe in.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
      >
        <Link to="/contact">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 text-base font-sans shadow-lg hover-scale">
            Request a Free Consultation
          </Button>
        </Link>
        <a href="tel:+17322685112">
          <Button size="lg" className="bg-white/20 backdrop-blur-sm text-white border-2 border-white/60 hover:bg-white/30 rounded-full px-8 text-base font-sans">
            <Phone className="h-4 w-4 mr-2" /> Call Us: (732) 268-5112
          </Button>
        </a>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2.5 text-sm font-sans"
      >
        <ShieldCheck className="h-4 w-4 text-accent" />
        Licensed & Insured | Serving All of New Jersey
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
