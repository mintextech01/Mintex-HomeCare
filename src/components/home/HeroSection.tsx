import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, ShieldCheck, ArrowRight, Star, Users, Award, HeartPulse } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useAdmin } from "@/contexts/AdminContext";
import { useRef } from "react";
import { useMagnetic } from "@/hooks/useScrollAnimations";

/* ─── tiny helpers ─────────────────────────────────────────────────────────── */
const DotGrid = ({ cols, rows, color = "#0891b2" }: { cols: number; rows: number; color?: string }) => (
  <svg width={cols * 18} height={rows * 18} className="opacity-30">
    {Array.from({ length: rows }).map((_, r) =>
      Array.from({ length: cols }).map((_, c) => (
        <circle key={`${r}-${c}`} cx={c * 18 + 9} cy={r * 18 + 9} r={2} fill={color} />
      ))
    )}
  </svg>
);

const PlusShape = ({ size = 14, color = "#0891b2", className = "" }: { size?: number; color?: string; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" className={className}>
    <rect x="5.5" y="0" width="3" height="14" rx="1.5" fill={color} />
    <rect x="0" y="5.5" width="14" height="3" rx="1.5" fill={color} />
  </svg>
);

/* ─── floating stat badge ──────────────────────────────────────────────────── */
const StatBadge = ({
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
    initial={{ opacity: 0, scale: 0.85, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.55, delay, type: "spring", stiffness: 200 }}
    className={`absolute z-20 bg-white rounded-2xl shadow-xl border border-slate-100
                flex items-center gap-3 px-4 py-3 cursor-default
                hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 ${className}`}
  >
    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
      {icon}
    </div>
    <div>
      <p className="text-base font-bold text-foreground leading-none">{value}</p>
      <p className="text-[11px] text-muted-foreground mt-0.5 leading-none">{label}</p>
    </div>
  </motion.div>
);

/* ─── image mosaic (Carenix-style, clean 2-col layout) ────────────────────── */
/*
 * Layout blueprint (600 × 580 px container):
 *
 *  ┌──────────┐  ┌──────────────────┐
 *  │  topLeft │  │                  │
 *  │  (left   │  │   largeCenter    │
 *  │   col)   │  │   (right col,    │
 *  ├──────────┤  │    full height)  │
 *  │ bottomL  │  │                  │
 *  │  (left   │  └──────────────────┘
 *  │   col)   │         ┌──────────┐
 *  └──────────┘         │bottomRight│ ← floats over corner
 *
 * LEFT column  : x=0,   w=42%
 * RIGHT column : x=46%, w=54%
 * GAP between  : 4%
 * bottomRight  : bottom-right, z=10, overlaps both columns
 */
const ImageMosaic = ({
  imgs,
}: {
  imgs: { topLeft: string; bottomLeft: string; largeCenter: string; bottomRight: string };
}) => {
  /* pixel constants that match the container (600 × 580) */
  const W = 600, H = 580;
  const leftW   = Math.round(W * 0.41);   // 246
  const rightX  = Math.round(W * 0.46);   // 276
  const rightW  = W - rightX;             // 324
  const gap     = 12;                     // gap between top & bottom-left
  const topH    = Math.round(H * 0.49);   // 284  — top-left image height
  const botH    = H - topH - gap;         // 284  — bottom-left image height
  const brW     = Math.round(W * 0.40);   // 240  — bottom-right image width
  const brH     = Math.round(H * 0.38);   // 220  — bottom-right image height

  return (
  <div className="relative" style={{ width: W, height: H }}>

    {/* ── decorative circle ring (behind everything) ── */}
    <div
      className="absolute pointer-events-none rounded-full border-[30px] border-accent/8"
      style={{ width: 500, height: 500, top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 0 }}
    />
    <div
      className="absolute pointer-events-none rounded-full border-[2px] border-dashed border-accent/15"
      style={{ width: 560, height: 560, top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 0 }}
    />

    {/* ── dot grids ── */}
    <div className="absolute pointer-events-none" style={{ top: 0, right: -8, zIndex: 0 }}>
      <DotGrid cols={6} rows={5} color="#0891b2" />
    </div>
    <div className="absolute pointer-events-none" style={{ bottom: 30, left: -16, zIndex: 0 }}>
      <DotGrid cols={5} rows={4} color="#0891b2" />
    </div>

    {/* ── accent color frame behind right (large) image ── */}
    <div
      className="absolute rounded-[30px] bg-accent/12"
      style={{ top: 28, left: rightX + 14, width: rightW, height: Math.round(H * 0.82), zIndex: 1 }}
    />

    {/* ══ LEFT COLUMN ══════════════════════════════════════════════════════ */}

    {/* TOP-LEFT image */}
    <div
      className="absolute rounded-[22px] overflow-hidden shadow-xl group cursor-pointer border-4 border-white
                 transition-all duration-400 ease-out hover:-translate-y-2 hover:shadow-2xl"
      style={{ top: 0, left: 0, width: leftW, height: topH, zIndex: 5 }}
    >
      <img
        src={imgs.topLeft}
        alt="Caring professional"
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        loading="eager"
      />
      <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-400" />
    </div>

    {/* BOTTOM-LEFT image */}
    <div
      className="absolute rounded-[22px] overflow-hidden shadow-xl group cursor-pointer border-4 border-white
                 transition-all duration-400 ease-out hover:-translate-y-2 hover:shadow-2xl"
      style={{ top: topH + gap, left: 0, width: leftW, height: botH, zIndex: 5 }}
    >
      <img
        src={imgs.bottomLeft}
        alt="Senior receiving care"
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        loading="eager"
      />
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-400" />
    </div>

    {/* ══ RIGHT COLUMN — large main image ══════════════════════════════════ */}
    <div
      className="absolute rounded-[28px] overflow-hidden shadow-2xl group cursor-pointer
                 transition-all duration-500 ease-out hover:-translate-y-2
                 hover:shadow-[0_32px_64px_rgba(8,145,178,0.22)]"
      style={{ top: 0, left: rightX, width: rightW, height: Math.round(H * 0.78), zIndex: 5 }}
    >
      <img
        src={imgs.largeCenter}
        alt="Caregiver with elderly patient"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="eager"
      />
      <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/8 transition-colors duration-500" />
    </div>

    {/* ══ BOTTOM-RIGHT floating image — overlaps both columns ══════════════ */}
    <div
      className="absolute rounded-[22px] overflow-hidden shadow-2xl group cursor-pointer border-4 border-white
                 transition-all duration-400 ease-out hover:-translate-y-2
                 hover:shadow-[0_24px_48px_rgba(0,0,0,0.22)]"
      style={{ bottom: 0, right: 0, width: brW, height: brH, zIndex: 10 }}
    >
      <img
        src={imgs.bottomRight}
        alt="Compassionate home care"
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        loading="eager"
      />
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-400" />
    </div>

    {/* ══ FLOATING STAT BADGES ════════════════════════════════════════════ */}

    {/* Top-right — Years of experience */}
    <StatBadge
      icon={<Award className="w-5 h-5" />}
      value="10+ Years"
      label="Trusted Experience"
      className="-top-5 right-0"
      delay={0.7}
    />

    {/* Left-center — satisfaction */}
    <StatBadge
      icon={<Star className="w-5 h-5 fill-amber-400 text-amber-400" />}
      value="5.0 ★★★★★"
      label="Client Satisfaction"
      className="left-[38%] top-[44%] -translate-x-1/2 -translate-y-1/2"
      delay={0.9}
    />

    {/* Bottom-right overlap — happy families */}
    <StatBadge
      icon={<Users className="w-5 h-5" />}
      value="2,000+"
      label="Happy Families"
      className="bottom-0 right-[42%]"
      delay={1.05}
    />

    {/* ── pulse dot accent ── */}
    <span className="absolute pointer-events-none" style={{ top: 12, left: leftW + 10, zIndex: 20 }}>
      <span className="relative flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-50" />
        <span className="relative inline-flex rounded-full h-4 w-4 bg-accent" />
      </span>
    </span>

    {/* ── decorative plus shapes ── */}
    <div className="absolute pointer-events-none" style={{ top: 8, right: 56, zIndex: 0 }}>
      <PlusShape size={16} color="#0891b2" className="opacity-45" />
    </div>
    <div className="absolute pointer-events-none" style={{ bottom: 90, right: 8, zIndex: 0 }}>
      <PlusShape size={13} color="#0c4a6e" className="opacity-35" />
    </div>
    <div className="absolute pointer-events-none" style={{ top: "46%", right: -20, zIndex: 0 }}>
      <PlusShape size={18} color="#0891b2" className="opacity-28" />
    </div>

    {/* ── small floating accent dots ── */}
    <div
      className="absolute pointer-events-none rounded-full bg-accent animate-bounce"
      style={{ width: 14, height: 14, top: "28%", right: -10, zIndex: 0, animationDuration: "3s" }}
    />
    <div
      className="absolute pointer-events-none rounded-full bg-primary/50"
      style={{ width: 10, height: 10, bottom: 100, left: leftW - 5, zIndex: 0 }}
    />

  </div>
  );
};

/* ─── Word stagger animation ─────────────────────────────────────────────── */
const wordStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};
const wordChild = {
  hidden: { opacity: 0, y: 40, rotateX: -60, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─── section ──────────────────────────────────────────────────────────────── */
const HeroSection = () => {
  const { siteImages } = useAdmin();
  const sectionRef = useRef<HTMLElement>(null);
  const magneticRef = useMagnetic<HTMLButtonElement>(0.25);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const smoothBgY = useSpring(bgY, { stiffness: 100, damping: 30 });
  const smoothTextY = useSpring(textY, { stiffness: 100, damping: 30 });
  const smoothImageY = useSpring(imageY, { stiffness: 100, damping: 30 });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const imgs = {
    topLeft: siteImages.heroTopLeft,
    bottomLeft: siteImages.heroBottomLeft,
    largeCenter: siteImages.heroLargeCenter,
    bottomRight: siteImages.heroBottomRight,
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-background flex items-center overflow-hidden">

      {/* ════ BACKGROUND LAYER — parallax ════════════════════════════════════ */}
      <motion.div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ y: smoothBgY, scale: bgScale }}
      >
        {/* large gradient blob — top-right */}
        <div
          className="absolute rounded-full"
          style={{
            width: 700, height: 700,
            top: "-22%", right: "-18%",
            background: "radial-gradient(circle, rgba(8,145,178,0.10) 0%, transparent 70%)",
          }}
        />
        {/* large gradient blob — bottom-left */}
        <div
          className="absolute rounded-full"
          style={{
            width: 600, height: 600,
            bottom: "-18%", left: "-14%",
            background: "radial-gradient(circle, rgba(12,74,110,0.09) 0%, transparent 70%)",
          }}
        />
        {/* mid accent blob */}
        <div
          className="absolute rounded-full"
          style={{
            width: 320, height: 320,
            top: "38%", left: "42%",
            background: "radial-gradient(circle, rgba(8,145,178,0.06) 0%, transparent 70%)",
          }}
        />

        {/* ── huge ring outline background (far left) ── */}
        <div
          className="absolute rounded-full border-[40px] border-accent/5"
          style={{ width: 580, height: 580, top: "50%", left: "-16%", transform: "translateY(-50%)" }}
        />
        {/* ── huge ring outline (far right bottom) ── */}
        <div
          className="absolute rounded-full border-[2px] border-accent/8"
          style={{ width: 400, height: 400, bottom: "-12%", right: "20%" }}
        />

        {/* ── wavy dashed ring ── */}
        <div
          className="absolute rounded-full border-[2px] border-dashed border-primary/10"
          style={{ width: 280, height: 280, top: "8%", left: "36%" }}
        />

        {/* ── dot grid — top left ── */}
        <div className="absolute" style={{ top: 60, left: 40 }}>
          <DotGrid cols={8} rows={6} color="#0891b2" />
        </div>
        {/* ── dot grid — bottom right ── */}
        <div className="absolute" style={{ bottom: 60, right: 60 }}>
          <DotGrid cols={7} rows={5} color="#0c4a6e" />
        </div>
        {/* ── dot grid — center-left ── */}
        <div className="absolute" style={{ top: "40%", left: "28%", transform: "translateY(-50%)" }}>
          <DotGrid cols={4} rows={4} color="#0891b2" />
        </div>

        {/* ── background plus shapes ── */}
        <div className="absolute" style={{ top: 120, left: "22%" }}>
          <PlusShape size={20} color="#0891b2" className="opacity-20" />
        </div>
        <div className="absolute" style={{ top: "60%", left: "18%" }}>
          <PlusShape size={14} color="#0c4a6e" className="opacity-15" />
        </div>
        <div className="absolute" style={{ bottom: 140, right: "28%" }}>
          <PlusShape size={18} color="#0891b2" className="opacity-18" />
        </div>
        <div className="absolute" style={{ top: 80, right: "38%" }}>
          <PlusShape size={12} color="#0c4a6e" className="opacity-15" />
        </div>

        {/* ── small floating circles ── */}
        <div className="absolute rounded-full bg-accent/20 animate-pulse" style={{ width: 18, height: 18, top: 200, left: "30%", animationDuration: "4s" }} />
        <div className="absolute rounded-full bg-primary/15" style={{ width: 12, height: 12, top: "70%", left: "22%" }} />
        <div className="absolute rounded-full bg-accent/15 animate-pulse" style={{ width: 22, height: 22, top: "25%", right: "34%", animationDuration: "5s" }} />
        <div className="absolute rounded-full bg-accent/10" style={{ width: 36, height: 36, bottom: 180, left: "40%" }} />
        <div className="absolute rounded-full bg-primary/12 animate-bounce" style={{ width: 14, height: 14, top: 340, left: "48%", animationDuration: "6s" }} />
        <div className="absolute rounded-full bg-accent/20" style={{ width: 10, height: 10, bottom: 220, right: "36%" }} />

        {/* ── horizontal line accent ── */}
        <div className="absolute h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" style={{ width: "60%", top: "72%", left: "5%" }} />
        <div className="absolute h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" style={{ width: "40%", top: "30%", right: "5%" }} />

        {/* ── zigzag/wave SVG element ── */}
        <svg className="absolute opacity-10" style={{ top: "18%", left: "6%", width: 80 }} viewBox="0 0 80 20">
          <polyline points="0,10 10,2 20,18 30,2 40,18 50,2 60,18 70,2 80,10" fill="none" stroke="#0891b2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <svg className="absolute opacity-10" style={{ bottom: "20%", right: "14%", width: 70 }} viewBox="0 0 80 20">
          <polyline points="0,10 10,2 20,18 30,2 40,18 50,2 60,18 70,2 80,10" fill="none" stroke="#0c4a6e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {/* ── heartbeat line SVG ── */}
        <svg className="absolute opacity-8" style={{ bottom: "38%", left: "8%", width: 100 }} viewBox="0 0 100 30">
          <polyline points="0,15 15,15 20,4 28,26 36,4 44,26 50,15 100,15" fill="none" stroke="#0891b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
      {/* ════════════════════════════════════════════════════════════════════ */}

      <motion.div className="container mx-auto px-6 md:px-10 relative z-10" style={{ opacity }}>
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-center py-32 lg:py-0 lg:min-h-screen">

          {/* ── LEFT: Text — with word stagger + parallax ── */}
          <motion.div className="order-2 lg:order-1" style={{ y: smoothTextY }}>

            {/* pill badge — depth push */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-6"
            >
              <HeartPulse className="w-4 h-4 text-accent" />
              <span className="text-xs font-semibold text-accent tracking-widest uppercase">
                Trusted Home Care · New Jersey
              </span>
            </motion.div>

            <motion.h1
              variants={wordStagger}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-5xl md:text-6xl xl:text-[4.25rem] font-serif font-bold text-foreground leading-[1.08] mb-5"
              style={{ perspective: 600 }}
            >
              {["Compassionate"].map((word, i) => (
                <motion.span key={i} variants={wordChild} className="inline-block mr-2">{word}</motion.span>
              ))}
              <br />
              {["Home", "Care"].map((word, i) => (
                <motion.span key={i} variants={wordChild} className="inline-block mr-2">{word}</motion.span>
              ))}
              <br />
              <motion.span variants={wordChild} className="text-accent relative inline-block">
                in New Jersey
                <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 200 6" preserveAspectRatio="none">
                  <motion.path
                    d="M0,5 Q50,0 100,4 Q150,8 200,3"
                    stroke="#0891b2"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />
                </svg>
              </motion.span>
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
              initial={{ opacity: 0, y: 20, rotateX: 10 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-3 mb-7"
              style={{ perspective: 600 }}
            >
              <Link to="/contact">
                <Button
                  ref={magneticRef}
                  size="lg"
                  className="bg-accent text-white hover:bg-accent/90 rounded-full px-7 h-12 text-sm font-sans font-semibold shadow-lg shadow-accent/25 group w-full sm:w-auto"
                >
                  Request a Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href="tel:+17322685112" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-7 h-12 text-sm font-sans border-2 border-border text-foreground transition-all duration-200 w-full hover:bg-accent hover:text-white hover:border-accent hover:shadow-md"
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
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <div className="flex items-center gap-2 text-sm font-sans font-medium text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
                Licensed &amp; Insured
              </div>
              <div className="hidden sm:block w-px h-4 bg-border" />
              <div className="flex items-center gap-2 text-sm font-sans font-medium text-muted-foreground">
                <Star className="h-4 w-4 text-amber-400 fill-amber-400 shrink-0" />
                5-Star Rated Care
              </div>
              <div className="hidden sm:block w-px h-4 bg-border" />
              <div className="text-sm font-sans font-medium text-muted-foreground">
                Serving All of New Jersey
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Image mosaic — 3D perspective + parallax ── */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotateY: -8 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: smoothImageY, perspective: 1000 }}
            className="order-1 lg:order-2 hidden lg:flex justify-center items-center"
          >
            <ImageMosaic imgs={imgs} />
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
