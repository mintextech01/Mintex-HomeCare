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
    className={`absolute z-20 bg-card rounded-2xl shadow-xl border border-border
                flex items-center gap-2.5 px-3 py-2.5 cursor-default
                hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 ${className}`}
  >
    <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
      {icon}
    </div>
    <div>
      <p className="text-sm font-bold text-foreground leading-none">{value}</p>
      <p className="text-[10px] text-muted-foreground mt-0.5 leading-none">{label}</p>
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
  /* pixel constants that match the container (540 × 520) */
  const W = 540, H = 520;
  const leftW   = Math.round(W * 0.41);
  const rightX  = Math.round(W * 0.46);
  const rightW  = W - rightX;
  const gap     = 12;
  const topH    = Math.round(H * 0.49);
  const botH    = H - topH - gap;
  const brW     = Math.round(W * 0.40);
  const brH     = Math.round(H * 0.38);

  return (
  <div className="relative" style={{ width: W, height: H }}>

    {/* ── decorative circle ring (behind everything) ── */}
    <div
      className="absolute pointer-events-none rounded-full border-[30px] border-accent/20"
      style={{ width: 500, height: 500, top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 0 }}
    >
      {/* Filled center circle inside ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full"
        style={{ background: "linear-gradient(135deg, rgba(8,145,178,0.30), rgba(42,102,176,0.20))" }}
      />
    </div>
    <div
      className="absolute pointer-events-none rounded-full"
      style={{
        width: 560, height: 560,
        top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        zIndex: 0,
        border: "2px solid",
        borderColor: "rgba(8,145,178,0.28)",
      }}
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
      className="absolute rounded-[22px] overflow-hidden shadow-xl group cursor-pointer border-4 border-background
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
      className="absolute rounded-[22px] overflow-hidden shadow-xl group cursor-pointer border-4 border-background
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
      className="absolute rounded-[22px] overflow-hidden shadow-2xl group cursor-pointer border-4 border-background
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
      className="top-0 right-0"
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
      value="500+"
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
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
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
    <section ref={sectionRef} className="relative min-h-[100svh] flex items-center overflow-hidden">

      {/* ════ BACKGROUND LAYER — parallax ════════════════════════════════════ */}
      <motion.div
        className="pointer-events-none absolute inset-0 overflow-hidden z-[1]"
        style={{ y: smoothBgY, scale: bgScale }}
      >
        {/* ── chrome-tinted ambient blobs ── */}
        <div className="absolute rounded-full hidden sm:block" style={{ width: 700, height: 700, top: "-22%", right: "-18%", background: "radial-gradient(circle, rgba(160,195,255,0.10) 0%, transparent 70%)" }} />
        <div className="absolute rounded-full" style={{ width: "clamp(260px,50vw,600px)", height: "clamp(260px,50vw,600px)", bottom: "-18%", left: "-14%", background: "radial-gradient(circle, rgba(100,140,220,0.08) 0%, transparent 70%)" }} />
        <div className="absolute rounded-full hidden sm:block" style={{ width: 320, height: 320, top: "38%", left: "42%", background: "radial-gradient(circle, rgba(160,200,240,0.06) 0%, transparent 70%)" }} />

        {/* ── decorative static ring outlines ── */}
        <div className="absolute rounded-full hidden sm:block" style={{ width: 480, height: 480, top: "50%", left: "-8%", transform: "translateY(-50%)", border: "1.5px solid rgba(8,145,178,0.10)" }} />
        <div className="absolute rounded-full hidden lg:block" style={{ width: 300, height: 300, top: "8%", right: "20%", border: "1.5px solid rgba(12,74,110,0.08)" }} />
        <div className="absolute rounded-full hidden lg:block" style={{ width: 200, height: 200, bottom: "12%", right: "10%", border: "1px solid rgba(8,145,178,0.07)" }} />

        {/* ── dot grids — desktop only ── */}
        <div className="absolute opacity-40 hidden lg:block" style={{ top: 60, right: 60 }}>
          <DotGrid cols={7} rows={5} color="#0891b2" />
        </div>
        <div className="absolute opacity-30 hidden lg:block" style={{ bottom: 60, right: 80 }}>
          <DotGrid cols={5} rows={4} color="#0c4a6e" />
        </div>

        {/* ── small accent dots — desktop only ── */}
        <div className="absolute rounded-full bg-accent/20 hidden lg:block" style={{ width: 14, height: 14, top: "22%", right: "32%" }} />
        <div className="absolute rounded-full bg-primary/15 hidden lg:block" style={{ width: 10, height: 10, bottom: "28%", right: "24%" }} />
        <div className="absolute rounded-full bg-accent/15 hidden lg:block" style={{ width: 8,  height: 8,  top: "68%", right: "40%" }} />

        {/* ── left-panel decorations — reduced on mobile ── */}
        <div className="absolute pointer-events-none opacity-25 hidden sm:block" style={{ top: "18%", left: "6%" }}>
          <PlusShape size={20} color="#0891b2" />
        </div>
        <div className="absolute pointer-events-none opacity-15 hidden sm:block" style={{ top: "55%", left: "3%" }}>
          <PlusShape size={14} color="#0c4a6e" />
        </div>
        <div className="absolute pointer-events-none opacity-20 hidden sm:block" style={{ bottom: "22%", left: "18%" }}>
          <PlusShape size={16} color="#0891b2" />
        </div>
        {/* dot grid — left panel, desktop only */}
        <div className="absolute pointer-events-none opacity-30 hidden sm:block" style={{ top: "30%", left: "2%" }}>
          <DotGrid cols={5} rows={6} color="#0891b2" />
        </div>
        {/* small accent circles — toned down on mobile */}
        <div className="absolute pointer-events-none rounded-full bg-accent/20 animate-bounce hidden sm:block" style={{ width: 12, height: 12, top: "14%", left: "24%", animationDuration: "4s" }} />
        <div className="absolute pointer-events-none rounded-full bg-primary/20 hidden sm:block" style={{ width: 8, height: 8, top: "72%", left: "12%" }} />
        <div className="absolute pointer-events-none rounded-full bg-accent/15 hidden sm:block" style={{ width: 16, height: 16, bottom: "18%", left: "32%" }} />
        {/* thin decorative arcs — desktop only */}
        <div className="absolute pointer-events-none rounded-full hidden sm:block" style={{ width: 180, height: 180, top: "10%", left: "8%", border: "1.5px solid rgba(8,145,178,0.15)" }} />
        <div className="absolute pointer-events-none rounded-full hidden sm:block" style={{ width: 100, height: 100, bottom: "28%", left: "5%", border: "1px solid rgba(12,74,110,0.12)" }} />

        {/* ── Sonar ripple — desktop only (hidden on mobile via CSS) ── */}
        <div
          className="absolute top-0 bottom-0 left-0 overflow-hidden pointer-events-none"
          style={{ width: "48%" }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={`cw-${i}`}
              className="hero-cw"
              style={{
                width: 1200,
                height: 1200,
                top: "calc(100% - 600px)",
                left: -600,
                animationDelay: `${i * 1.4}s`,
                opacity: 0,
              }}
            />
          ))}
        </div>
      </motion.div>
      {/* ════════════════════════════════════════════════════════════════════ */}

      <motion.div className="container mx-auto px-6 md:px-10 relative z-10" style={{ opacity }}>
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-center py-32 lg:pt-28 lg:pb-10 lg:min-h-[100svh]">

          {/* ── LEFT: Text — with word stagger + parallax ── */}
          <motion.div className="order-2 lg:order-1" style={{ y: smoothTextY }}>

            {/* pill badge — depth push */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 bg-accent/10 border border-accent/25 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm"
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
                  className="rounded-full px-7 h-12 text-sm font-sans border-2 border-primary/40 text-foreground transition-all duration-200 w-full hover:bg-accent hover:text-white hover:border-accent hover:shadow-md"
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
            className="order-1 lg:order-2 hidden lg:flex justify-center items-center
                       scale-[0.75] xl:scale-[0.90] 2xl:scale-100 origin-center"
          >
            <ImageMosaic imgs={imgs} />
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
