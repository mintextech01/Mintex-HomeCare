import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight, Check } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";

const features = [
  "Compassionate, certified caregivers",
  "Personalized care plans for every client",
  "Care available 24/7, including holidays",
  "State-licensed & insured agency in NJ",
];

const AboutSection = () => {
  const { siteImages } = useAdmin();

  return (
    <section id="about" className="py-14 md:py-20">
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* ── LEFT: Image ── */}
          <AnimatedSection className="relative order-2 lg:order-1">
            <div className="relative rounded-[28px] overflow-hidden aspect-[4/5] max-h-[600px] lg:aspect-auto lg:h-[600px]">
              <img
                src={siteImages.about}
                alt="Caregiver providing compassionate home care"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </AnimatedSection>

          {/* ── RIGHT: Text ── */}
          <AnimatedSection delay={0.1} className="order-1 lg:order-2">

            <div className="el-eyebrow mb-3">About MintexCare</div>

            <h2 className="font-bold text-foreground leading-[1.1] mb-5"
              style={{ fontSize: "clamp(2.2rem, 3.8vw, 3.2rem)" }}>
              Trusted home care<br />
              built on compassion
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

            <Link to="/about" className="el-btn-soft group">
              Learn More About Us <ArrowRight className="h-4 w-4 transition-transform" />
            </Link>

          </AnimatedSection>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
