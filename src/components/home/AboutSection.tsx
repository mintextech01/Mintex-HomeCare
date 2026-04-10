import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight, CheckCircle, Award, Users, Heart, Clock } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { use3DTiltGlow } from "@/hooks/useScrollAnimations";

const features = [
  "Compassionate, certified caregivers",
  "Personalized care plans for every client",
  "Available 24/7 — including holidays",
  "State-licensed & insured agency in NJ",
];

const stats = [
  { value: "500+", label: "Families Served",   icon: Users  },
  { value: "10+",  label: "Years Experience",  icon: Award  },
  { value: "99%",  label: "Client Satisfaction", icon: Heart },
  { value: "24/7", label: "Always Available",  icon: Clock  },
];

const AboutSection = () => {
  const { siteImages } = useAdmin();
  const sectionRef = useRef<HTMLElement>(null);
  const tiltRef = use3DTiltGlow<HTMLDivElement>(10, "38, 104, 188");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} id="about" className="relative py-20 md:py-28 bg-white overflow-hidden">

      {/* Soft background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, #dbeafe 0%, transparent 70%)", width: 500, height: 500, top: "-10%", right: "-8%" }} />
        <div className="absolute rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #ccfbf1 0%, transparent 70%)", width: 300, height: 300, bottom: "0%", left: "-4%" }} />
      </div>

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* ── LEFT: Image column — 3D tilt + parallax ── */}
          <AnimatedSection from="flip3d" className="relative order-2 lg:order-1">

            {/* Main image — with 3D tilt on hover + parallax */}
            <motion.div
              ref={tiltRef}
              className="relative rounded-3xl overflow-hidden shadow-2xl"
              style={{ aspectRatio: "4/5", maxHeight: 560, y: imageY }}
            >
              <img
                src={siteImages.about}
                alt="Caregiver providing compassionate home care"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Gradient overlay at bottom */}
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(10,30,60,0.55) 0%, transparent 55%)" }} />
              {/* Bottom text overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <p className="text-white/80 text-xs uppercase tracking-widest mb-1 font-semibold">Our Mission</p>
                <p className="text-white font-bold text-lg leading-snug">
                  Dignified, compassionate care<br />in the comfort of home.
                </p>
              </div>
            </motion.div>

            {/* Floating experience badge — top-right */}
            <div className="absolute top-2 right-2 md:-top-4 md:right-0 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3 border border-gray-100"
              style={{ zIndex: 10 }}>
              <div className="w-11 h-11 rounded-xl bg-[#2a66b0] flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 leading-none">10+</p>
                <p className="text-xs text-gray-500 mt-0.5 whitespace-nowrap">Years of Excellence</p>
              </div>
            </div>

            {/* Floating family badge — bottom-left */}
            <div className="absolute bottom-2 left-2 md:-bottom-4 md:left-0 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3 border border-gray-100"
              style={{ zIndex: 10 }}>
              <div className="flex -space-x-2">
                {[
                  siteImages.aboutAvatar1,
                  siteImages.aboutAvatar2,
                  siteImages.aboutAvatar3,
                ].map((url, i) => (
                  <img key={i} src={url} alt=""
                    className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-white bg-[#2a66b0] flex items-center justify-center">
                  <span className="text-white text-[9px] font-bold">500+</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 leading-none">Happy Families</p>
                <p className="text-xs text-gray-500 mt-0.5">Across New Jersey</p>
              </div>
            </div>

            {/* Decorative circle accent */}
            <div className="absolute -bottom-10 right-8 w-32 h-32 rounded-full border-2 border-dashed border-[#2a66b0]/20 pointer-events-none" />
          </AnimatedSection>

          {/* ── RIGHT: Text column — depth push reveal ── */}
          <AnimatedSection from="depth" delay={0.15} className="order-1 lg:order-2">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2a66b0]" />
              <span className="text-xs font-semibold text-[#2a66b0] uppercase tracking-widest">
                About MintexCare
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-bold text-gray-900 leading-[1.1] mb-5"
              style={{ fontSize: "clamp(2.2rem, 3.8vw, 3.2rem)" }}>
              Trusted Home Care<br />
              <span className="text-[#2a66b0]">Built on Compassion</span>
            </h2>

            {/* Description */}
            <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-6 max-w-[500px]">
              MintexCare is a New Jersey-based home healthcare agency dedicated to
              providing high-quality, personalized care — so your loved ones can
              thrive in the comfort of their own home.
            </p>

            {/* Feature checklist */}
            <ul className="space-y-3 mb-8">
              {features.map(f => (
                <li key={f} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#2a66b0] flex-shrink-0" />
                  <span className="text-sm text-gray-700 font-medium">{f}</span>
                </li>
              ))}
            </ul>

            {/* Stats grid — 3D hover lift */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {stats.map(({ value, label, icon: Icon }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20, rotateX: 15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4, scale: 1.03, boxShadow: "0 12px 30px rgba(38,104,188,0.12)" }}
                  className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3.5 border border-gray-100 hover-lift-3d"
                  style={{ perspective: 600 }}
                >
                  <motion.div
                    className="w-9 h-9 rounded-xl bg-[#2a66b0]/10 flex items-center justify-center flex-shrink-0"
                    whileHover={{ rotateY: 180, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <Icon className="w-4 h-4 text-[#2a66b0]" />
                  </motion.div>
                  <div>
                    <p className="text-xl font-bold text-gray-900 leading-none">{value}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">{label}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <Link
              to="/about"
              className="inline-flex items-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-full transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, hsl(214 66% 44%) 0%, hsl(192 91% 37%) 100%)", border: "1px solid rgba(255,255,255,0.3)", boxShadow: "0 2px 12px rgba(38,104,188,0.30), inset 0 1px 0 rgba(255,255,255,0.25)", color: "#fff" }}
            >
              Learn More About Us <ArrowRight className="h-4 w-4" />
            </Link>

          </AnimatedSection>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;