import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useAdmin } from "@/contexts/AdminContext";

/**
 * Z-index layering — matches reference image exactly:
 *
 *  TL (z:1) ──── peeks out LEFT from behind large image
 *  BL (z:1) ──── peeks out LEFT from behind large image
 *  LARGE (z:5) ─ sits ON TOP of TL and BL, covers their right/inner portions
 *  BR (z:10) ─── floats ON TOP of large image at its bottom-right corner
 *
 * Container: 680 × 580  (bigger images as requested)
 */
const ImageMosaic = ({ imgs }: { imgs: { topLeft: string; bottomLeft: string; largeCenter: string; bottomRight: string } }) => (
  <div className="relative w-full max-w-[680px]" style={{ aspectRatio: "680/580" }}>

    {/* ── TOP-LEFT — z:1, peeks behind large; hover: lift + zoom ── */}
    <div
      className="absolute rounded-[26px] overflow-hidden shadow-xl group cursor-pointer
                 transition-[transform,box-shadow] duration-300 ease-out
                 hover:-translate-y-2 hover:shadow-2xl"
      style={{ top: 0, left: 0, width: "40%", height: "47%", zIndex: 1 }}
    >
      <img
        src={imgs.topLeft}
        alt="Caring professional"
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        loading="eager"
      />
    </div>

    {/* ── BOTTOM-LEFT — z:1, peeks behind large; hover: lift + zoom ── */}
    <div
      className="absolute rounded-[26px] overflow-hidden shadow-xl group cursor-pointer
                 transition-[transform,box-shadow] duration-300 ease-out
                 hover:-translate-y-2 hover:shadow-2xl"
      style={{ bottom: 0, left: 0, width: "35%", height: "46%", zIndex: 1 }}
    >
      <img
        src={imgs.bottomLeft}
        alt="Senior receiving care"
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        loading="eager"
      />
    </div>

    {/* ── LARGE CENTER — z:5, on top of TL/BL; hover: subtle zoom ── */}
    <div
      className="absolute rounded-[32px] overflow-hidden group cursor-pointer
                 transition-transform duration-300 ease-out hover:-translate-y-1"
      style={{
        top: "7%", left: "26%", width: "64%", height: "86%",
        zIndex: 5,
        boxShadow: "0 8px 32px rgba(0,0,0,0.16)",
      }}
    >
      <img
        src={imgs.largeCenter}
        alt="Caregiver with elderly patient"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="eager"
      />
    </div>

    {/* ── BOTTOM-RIGHT — z:10, on top of large; hover: lift + zoom ── */}
    <div
      className="absolute rounded-[26px] overflow-hidden group cursor-pointer
                 transition-[transform,box-shadow] duration-300 ease-out
                 hover:-translate-y-2 hover:shadow-2xl"
      style={{
        bottom: 0, right: 0, width: "32%", height: "46%",
        zIndex: 10,
        boxShadow: "0 14px 48px rgba(0,0,0,0.26), 0 4px 14px rgba(0,0,0,0.12)",
      }}
    >
      <img
        src={imgs.bottomRight}
        alt="Compassionate home care"
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        loading="eager"
      />
    </div>

  </div>
);

const HeroSection = () => {
  const { siteImages } = useAdmin();
  const imgs = {
    topLeft: siteImages.heroTopLeft,
    bottomLeft: siteImages.heroBottomLeft,
    largeCenter: siteImages.heroLargeCenter,
    bottomRight: siteImages.heroBottomRight,
  };
  return (
  <section className="relative min-h-screen bg-background flex items-center overflow-hidden">

    {/* ── Decorative background circles ── */}
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute rounded-full bg-accent/10"  style={{ width: 340, height: 340, top: "-8%",  left: "-6%" }} />
      <div className="absolute rounded-full bg-primary/8" style={{ width: 180, height: 180, top: "55%",  left: "3%" }} />
      <div className="absolute rounded-full bg-accent/8"  style={{ width: 220, height: 220, top: "10%",  right: "-4%" }} />
      <div className="absolute rounded-full bg-primary/10" style={{ width: 120, height: 120, bottom: "12%", right: "28%" }} />
      <div className="absolute rounded-full bg-accent/12" style={{ width: 90,  height: 90,  top: "42%",  right: "42%" }} />
      <div className="absolute rounded-full bg-primary/7" style={{ width: 260, height: 260, bottom: "-5%", left: "30%" }} />
    </div>

    <div className="container mx-auto px-6 md:px-10">
      <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center py-32 lg:py-0 lg:min-h-screen">

        {/* LEFT: Text */}
        <div className="order-2 lg:order-1">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm font-sans font-semibold text-accent uppercase tracking-[0.15em] mb-5"
          >
            Trusted Home Care · New Jersey
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl xl:text-[4.25rem] font-serif font-bold text-foreground leading-[1.08] mb-5"
          >
            Compassionate<br />
            Home Care<br />
            <span className="text-accent">in New Jersey</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.33 }}
            className="text-muted-foreground text-base md:text-lg font-sans leading-relaxed mb-8 max-w-[420px]"
          >
            MintexCare provides trusted, personalized in-home care that helps
            your loved ones live safely, comfortably, and independently — with
            dignity every step of the way.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-3 mb-7"
          >
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-7 h-12 text-sm font-sans font-semibold shadow-md group w-full sm:w-auto"
              >
                Request a Free Consultation
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="tel:+17322685112" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-7 h-12 text-sm font-sans border border-border text-foreground transition-colors duration-200 w-full hover:bg-[#0891b2] hover:text-white hover:border-[#0891b2] hover:font-bold"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Us: (732) 268-5112
              </Button>
            </a>
          </motion.div>

          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.58 }}
             className="inline-flex items-center justify-center gap-2 text-sm font-sans font-bold text-muted-foreground text-center w-full"
           > 
            <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
              Licensed &amp; Insured | Serving All of New Jersey
          </motion.div>
        </div>

        {/* RIGHT: Image mosaic — desktop only */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="order-1 lg:order-2 hidden lg:flex justify-end items-center"
        >
          <ImageMosaic imgs={imgs} />
        </motion.div>

      </div>
    </div>
  </section>
  );
};

export default HeroSection;
