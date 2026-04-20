import AnimatedSection from "@/components/AnimatedSection";
import { ClipboardList, UserCheck, Clock, DollarSign, MessageCircle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: ClipboardList, title: "Personalized Care Plans", desc: "Every care plan is custom-tailored to match the unique needs, preferences, and goals of each client.", accent: "primary" },
  { icon: UserCheck, title: "Certified & Compassionate Caregivers", desc: "Our caregivers are thoroughly vetted, trained, licensed, and passionate about providing exceptional care.", accent: "accent" },
  { icon: Clock, title: "Available 24/7", desc: "We provide round-the-clock care services including holidays and weekends. Help is always just a call away.", accent: "primary" },
  { icon: DollarSign, title: "Affordable & Transparent Pricing", desc: "No hidden fees. We work with families to create care plans that fit their budget.", accent: "accent" },
  { icon: MessageCircle, title: "Family Communication", desc: "Regular updates and open communication so families always know how their loved ones are doing.", accent: "primary" },
  { icon: ShieldCheck, title: "Licensed & Insured", desc: "Fully licensed by the State of New Jersey, bonded, and insured for your complete peace of mind.", accent: "accent" },
];

const WhyChooseUsSection = () => (
  <section id="why-choose-us" className="relative py-16 md:py-24 overflow-hidden">

    {/* Subtle dot-grid background */}
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    />

    {/* Decorative blobs */}
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute rounded-full bg-accent/6" style={{ width: 360, height: 360, top: "-10%", left: "-6%" }} />
      <div className="absolute rounded-full bg-primary/5" style={{ width: 280, height: 280, bottom: "-8%", right: "-5%" }} />
    </div>

    <div className="container mx-auto px-4">

      {/* ── Editorial header ── */}
      <AnimatedSection className="mb-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-xs font-sans font-semibold text-accent uppercase tracking-[0.22em] mb-3">
              Why Us
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight">
              Why Families Trust<br className="hidden md:block" /> MintexCare
            </h2>
          </div>
          <p className="text-muted-foreground font-sans text-base leading-relaxed max-w-xs md:text-right">
            Six pillars that make us the trusted choice for families across New Jersey.
          </p>
        </div>
        <div className="mt-8 h-px bg-border" />
      </AnimatedSection>

      {/* ── Feature grid — 3D hover + icon spin ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <AnimatedSection key={f.title} delay={i * 0.08} from={i % 3 === 0 ? "depth" : i % 3 === 1 ? "rotateUp" : "flip3d"}>
            <motion.div
              className="group relative flex gap-4 p-6 rounded-2xl border border-border bg-card h-full overflow-hidden bg-[#e8ebed]"
              whileHover={{
                y: -6,
                scale: 1.02,
                rotateX: -1,
                rotateY: 2,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1), 0 0 20px rgba(38,104,188,0.06)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ transformStyle: "preserve-3d", perspective: 800 }}
            >

              {/* Animated top accent bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ${f.accent === "accent" ? "bg-accent" : "bg-primary"
                  }`}
              />

              {/* Large background number watermark */}
              <span className="pointer-events-none absolute -bottom-4 -right-1 text-[88px] font-serif font-bold leading-none select-none opacity-[0.06] text-foreground">
                {i + 1}
              </span>

              {/* Icon — 3D flip on hover */}
              <motion.div
                className={`h-11 w-11 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5 ${f.accent === "accent"
                    ? "bg-accent/10 group-hover:bg-accent/15"
                    : "bg-primary/10 group-hover:bg-primary/15"
                  }`}
                whileHover={{ rotateY: 180, scale: 1.15 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <f.icon
                  className={`h-5 w-5 transition-colors ${f.accent === "accent" ? "text-accent" : "text-primary"
                    }`}
                />
              </motion.div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <h3 className="font-serif font-semibold text-foreground text-lg mb-1.5 leading-snug pr-2">
                  {f.title}
                </h3>
                <p className="text-base text-muted-foreground font-sans leading-relaxed">
                  {f.desc}
                </p>
              </div>

            </motion.div>
          </AnimatedSection>
        ))}
      </div>

    </div>
  </section>
);

export default WhyChooseUsSection;
