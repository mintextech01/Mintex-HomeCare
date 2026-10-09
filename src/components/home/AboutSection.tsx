import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight, Check, Award, Users, Heart, Clock } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";

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

  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* ── LEFT: Image ── */}
          <AnimatedSection className="relative order-2 lg:order-1">
            <div
              className="relative rounded-[28px] overflow-hidden"
              style={{ aspectRatio: "4/5", maxHeight: 600 }}
            >
              <img
                src={siteImages.about}
                alt="Caregiver providing compassionate home care"
                className="w-full h-full object-cover"
                loading="lazy"
              />

              {/* Families badge — sits inside the photo, bottom-left */}
              <div className="el-chip absolute bottom-4 left-4 md:bottom-6 md:left-6 pr-5">
                <div className="flex -space-x-2">
                  {[
                    siteImages.aboutAvatar1,
                    siteImages.aboutAvatar2,
                    siteImages.aboutAvatar3,
                  ].map((url, i) => (
                    <img key={i} src={url} alt="Happy MintexCare client"
                      className="w-8 h-8 rounded-full border-2 border-background object-cover" />
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-background bg-accent flex items-center justify-center">
                    <span className="text-accent-foreground text-[9px] font-bold">500+</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground leading-none">Happy Families</p>
                  <p className="text-xs text-muted-foreground mt-1">Across New Jersey</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* ── RIGHT: Text ── */}
          <AnimatedSection delay={0.1} className="order-1 lg:order-2">

            <div className="el-eyebrow mb-6">About MintexCare</div>

            <h2 className="font-bold text-foreground leading-[1.1] mb-5"
              style={{ fontSize: "clamp(2.2rem, 3.8vw, 3.2rem)" }}>
              Trusted Home Care<br />
              <span className="text-primary">Built on Compassion</span>
            </h2>

            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-7 max-w-[520px]">
              MintexCare is a New Jersey-based home healthcare agency dedicated to
              providing high-quality, personalized care — so your loved ones can
              thrive in the comfort of their own home.
            </p>

            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-8">
              {features.map(f => (
                <li key={f} className="flex items-start gap-3">
                  <span className="mt-0.5 h-5 w-5 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-accent-foreground" strokeWidth={3} />
                  </span>
                  <span className="text-sm text-foreground/85 font-medium leading-snug">{f}</span>
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-2 gap-3 mb-9">
              {stats.map(({ value, label, icon: Icon }) => (
                <div key={label} className="el-card flex items-center gap-3 px-4 py-4">
                  <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground leading-none">{value}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-tight">{label}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/about" className="el-btn-soft group">
              Learn More About Us <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>

          </AnimatedSection>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
