import { Link } from "react-router-dom";
import { Phone, ShieldCheck, ArrowRight, Clock, MapPin, Users, Award, CheckCircle2 } from "lucide-react";
import PhotoFacts from "@/components/PhotoFacts";
import { motion } from "@/lib/motion";
import { useAdmin } from "@/contexts/AdminContext";
import { PENDING_IMAGE } from "@/config/siteImageConfig";

const ease = [0.22, 1, 0.36, 1] as const;

/* ─── photo in the band under the hero ───────────────────────────────────────── */
/* The band is hidden below lg: <picture> + media gives smaller screens the 1x1 placeholder
   instead of the photo, so phones don't download it. */
const BandPhoto = ({ src, alt }: { src: string; alt: string }) => (
  <picture>
    <source media="(min-width: 1024px)" srcSet={src} />
    <img
      src={PENDING_IMAGE}
      alt={alt}
      className="w-full h-full object-cover transition-transform duration-700 ease-out"
      width={600}
      height={320}
      loading="lazy"
      decoding="async"
    />
  </picture>
);

/* ─── section ──────────────────────────────────────────────────────────────── */
/*
 * Layout:
 *   ┌──────────────── text ───────────────┐ ┌──── photo card ────┐
 *   │ eyebrow · h1 · copy · CTAs · ticks  │ │  largeCenter       │
 *   └─────────────────────────────────────┘ └────────────────────┘
 *   ┌────────── topLeft (wide) ──────────┐┌ bottomLeft ┐┌ bottomRight ┐   ← photo band
 */
const HeroSection = () => {
  const { siteImages } = useAdmin();

  const imgs = {
    topLeft: siteImages.heroTopLeft,
    bottomLeft: siteImages.heroBottomLeft,
    largeCenter: siteImages.heroLargeCenter,
    bottomRight: siteImages.heroBottomRight,
  };

  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-10 pt-32 lg:pt-36 pb-14 md:pb-20">
        {/* 2xl: equal columns so the photo sits closer to the text on wide screens (no empty band in between). */}
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] 2xl:grid-cols-2 gap-10 xl:gap-16 items-center">

          {/* ── LEFT: Text ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease }}
              className="el-eyebrow mb-5"
            >
              Trusted Home Care · Edison, NJ
            </motion.div>

            <motion.h1
              data-keep-breaks
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-[4.25rem] font-serif font-bold text-foreground leading-[1.08] mb-6"
            >
              Compassionate
              {" "}<br />
              Home Care
              {" "}<br />
              in New Jersey
            </motion.h1>

            {/* Visible from the first frame (slide only, no fade from 0): this paragraph is the
                page's Largest Contentful Paint, and an opacity-0 start delays LCP until the fade ends. */}
            <motion.p
              initial={{ y: 12 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-base md:text-lg font-sans leading-relaxed mb-8 max-w-[480px]"
            >
              MintexCare provides trusted, personalized in-home care that helps
              your loved ones live safely, comfortably, and independently — with
              dignity every step of the way.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
              className="flex flex-col sm:flex-row gap-3 mb-8"
            >
              <Link to="/free-consultation" className="el-btn-primary group w-full sm:w-auto">
                Request a Free Consultation
                <ArrowRight className="h-4 w-4 transition-transform" />
              </Link>
              <a href="tel:+17322685112" className="el-btn-soft w-full sm:w-auto">
                <Phone className="h-4 w-4" />
                Call Us: (732) 268-5112
              </a>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-3"
            >
              <li className="flex items-center gap-2 text-sm font-sans font-semibold text-foreground/80">
                <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                Licensed &amp; Insured
              </li>
              <li className="flex items-center gap-2 text-sm font-sans font-semibold text-foreground/80">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                Based in Edison, NJ
              </li>
              <li className="flex items-center gap-2 text-sm font-sans font-semibold text-foreground/80">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                Serving All of New Jersey
              </li>
            </motion.ul>
          </div>

          {/* ── RIGHT: main photo card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="relative hidden lg:block"
          >
            <div>
              <div className="relative rounded-[28px] overflow-hidden w-full h-[520px] 2xl:h-[560px]">
                {/* Desktop LCP image. <picture> + media: the card is hidden below lg, so smaller
                    screens get the 1x1 placeholder instead of downloading the photo. */}
                <picture>
                  <source media="(min-width: 1024px)" srcSet={imgs.largeCenter} />
                  <img
                    src={PENDING_IMAGE}
                    alt="Caregiver with elderly patient"
                    className="w-full h-full object-cover"
                    width={448}
                    height={560}
                    loading="eager"
                    decoding="async"
                    {...{ fetchpriority: "high" }}
                  />
                </picture>
              </div>
            </div>
            {/* The facts that used to float over the photo, now in a calm row under it (same text). */}
            <PhotoFacts className="mt-5" facts={[
              { icon: Award, title: "10+ Years", text: "Trusted Experience" },
              { icon: Clock, title: "24/7", text: "Care Available" },
              { icon: Users, title: "500+", text: "Happy Families" },
            ]} />
          </motion.div>
        </div>

        {/* ── Photo band ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease }}
          className="hidden lg:grid grid-cols-12 gap-4 mt-14"
        >
          <div className="col-span-6 h-[320px] rounded-[28px] overflow-hidden group">
            <BandPhoto src={imgs.topLeft} alt="Caring professional" />
          </div>
          <div className="col-span-3 h-[320px] rounded-[28px] overflow-hidden group">
            <BandPhoto src={imgs.bottomLeft} alt="Senior receiving care" />
          </div>
          <div className="col-span-3 h-[320px] rounded-[28px] overflow-hidden group">
            <BandPhoto src={imgs.bottomRight} alt="Compassionate home care" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
