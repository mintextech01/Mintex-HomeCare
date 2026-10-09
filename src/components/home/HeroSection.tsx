import { Link } from "react-router-dom";
import { Phone, ShieldCheck, ArrowRight, Clock, MapPin, Users, Award, HeartPulse, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useAdmin } from "@/contexts/AdminContext";

const ease = [0.22, 1, 0.36, 1] as const;

/* ─── small floating info chip (sits over a photo) ─────────────────────────── */
const InfoChip = ({
  icon,
  value,
  label,
  className = "",
  delay = 0,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease }}
    className={`el-chip absolute z-10 ${className}`}
  >
    <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
      {icon}
    </div>
    <div>
      <p className="text-sm font-bold text-foreground leading-none">{value}</p>
      <p className="text-[11px] text-muted-foreground mt-1 leading-none">{label}</p>
    </div>
  </motion.div>
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
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 xl:gap-16 items-center">

          {/* ── LEFT: Text ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease }}
              className="el-eyebrow mb-6"
            >
              <HeartPulse className="w-4 h-4 text-primary" />
              Trusted Home Care · Edison, NJ
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-[4.25rem] font-serif font-bold text-foreground leading-[1.08] mb-6"
            >
              Compassionate
              <br />
              Home Care
              <br />
              <span className="text-primary">in New Jersey</span>
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
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
            <div className="el-card p-3">
              <div className="relative rounded-[16px] overflow-hidden aspect-[4/5] max-h-[560px]">
                <img
                  src={imgs.largeCenter}
                  alt="Caregiver with elderly patient"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
            <InfoChip
              icon={<Award className="w-5 h-5" />}
              value="10+ Years"
              label="Trusted Experience"
              className="top-8 -left-8"
              delay={0.6}
            />
            <InfoChip
              icon={<Clock className="w-5 h-5" />}
              value="24/7"
              label="Care Available"
              className="bottom-8 -left-8"
              delay={0.75}
            />
          </motion.div>
        </div>

        {/* ── Photo band ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease }}
          className="hidden lg:grid grid-cols-12 gap-4 mt-14"
        >
          <div className="col-span-6 h-[320px] rounded-[24px] overflow-hidden group">
            <img
              src={imgs.topLeft}
              alt="Caring professional"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              loading="eager"
            />
          </div>
          <div className="col-span-3 h-[320px] rounded-[24px] overflow-hidden group">
            <img
              src={imgs.bottomLeft}
              alt="Senior receiving care"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              loading="eager"
            />
          </div>
          <div className="relative col-span-3 h-[320px] rounded-[24px] overflow-hidden group">
            <img
              src={imgs.bottomRight}
              alt="Compassionate home care"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              loading="eager"
            />
            <InfoChip
              icon={<Users className="w-5 h-5" />}
              value="500+"
              label="Happy Families"
              className="bottom-4 left-4"
              delay={0.9}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
