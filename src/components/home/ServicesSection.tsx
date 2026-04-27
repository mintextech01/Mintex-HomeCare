import { Link } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight, Clock, Home, Stethoscope, Activity, Dumbbell, Building2 } from "lucide-react";


const SERVICE_META = [
  { icon: Clock,       label: "Hourly Care",           title: "Flexible hourly support",       description: "Flexible hourly visits tailored to your schedule — from a few hours a week to daily support.",              btnLabel: "Learn more",    link: "/services", imgKey: "serviceCard1" as const },
  { icon: Home,        label: "Live-In Care",           title: "Round-the-clock home care",      description: "A dedicated caregiver lives with your loved one for continuous, personalized support.",                    btnLabel: "Explore care",  link: "/services", imgKey: "serviceCard2" as const },
  { icon: Activity,    label: "Post-Surgery Recovery",  title: "Recover safely at home",         description: "Medication reminders, mobility assistance, and wound monitoring — all at home.",                          btnLabel: "Get started",   link: "/services", imgKey: "serviceCard3" as const },
  { icon: Stethoscope, label: "Skilled Nursing",        title: "Clinical care at home",          description: "Licensed nurses providing IV therapy, wound treatment, and chronic disease management.",                   btnLabel: "View scope",    link: "/services", imgKey: "serviceCard4" as const },
  { icon: Dumbbell,    label: "Rehab Support",          title: "Regain your independence",       description: "Therapy aides helping clients rebuild mobility and confidence after illness or injury.",                   btnLabel: "Learn more",    link: "/services", imgKey: "serviceCard5" as const },
  { icon: Building2,   label: "Facility Staffing",      title: "Reliable facility staffing",     description: "HHA and CNA staffing for assisted living, nursing homes, and rehab centers across NJ.",                  btnLabel: "Partner with us", link: "/services", imgKey: "serviceCard6" as const },
];

const ServicesSection = () => {
  const { siteImages } = useAdmin();
  const services = SERVICE_META.map(s => ({ ...s, image: siteImages[s.imgKey] }));
  return (
    <section id="services" className="py-16 md:py-20">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <AnimatedSection className="text-center mb-12">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2 font-sans">
            What We Offer
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-3">
            Our Home Care Services
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto font-sans">
            Comprehensive care solutions designed to improve your general health and well-being
          </p>
        </AnimatedSection>

        {/* Cards grid — 3D tilt on hover */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <AnimatedSection key={service.label} delay={i * 0.07} from={i % 2 === 0 ? "rotateUp" : "flip3d"}>
                <div
                  className="group relative rounded-2xl overflow-hidden cursor-pointer h-[260px] sm:h-[300px] md:h-[360px] transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(38,104,188,0.18),0_0_0_1px_rgba(38,104,188,0.10)]"
                >
                  {/* Background image */}
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Dark overlay — darkens more on hover */}
                  <div className="absolute inset-0 bg-black/30 transition-colors duration-500 group-hover:bg-black/50" />

                  {/* Top gradient for badge readability */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />

                  {/* Blue accent border glow on hover */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-500 group-hover:border-[#2a66b0]/40 group-hover:shadow-[inset_0_0_20px_rgba(38,104,188,0.08)]" />

                  {/* Badge — top left */}
                  <div className="absolute top-5 left-5 z-10 flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 transition-all duration-500 group-hover:bg-[#2a66b0]/70 group-hover:border-[#2a66b0]/40">
                    <Icon className="h-5 w-5 text-white flex-shrink-0" />
                    <span className="text-white text-xs font-semibold tracking-wide font-sans leading-none">
                      {service.label}
                    </span>
                  </div>

                  {/* Title — moves up on hover to make room for description */}
                  <div className="absolute inset-0 z-10 flex items-center justify-center px-6 pb-20 pointer-events-none transition-all duration-500 group-hover:pb-32">
                    <h3 className="text-white font-bold text-[1.55rem] text-center leading-snug drop-shadow-lg">
                      {service.title}
                    </h3>
                  </div>

                  {/* Bottom reveal — slides up on hover */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 translate-y-full opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                    <div
                      className="px-6 pb-6 pt-14"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(42,102,176,0.92) 0%, rgba(42,102,176,0.70) 50%, rgba(0,0,0,0) 100%)",
                      }}
                    >
                      <p className="text-white/90 text-sm leading-relaxed font-sans mb-4">
                        {service.description}
                      </p>
                      <Link
                        to={service.link}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-sans font-semibold text-sm bg-white text-[#2a66b0] transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      >
                        {service.btnLabel}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* View all CTA */}
        <AnimatedSection className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-sans font-semibold transition-all duration-200 hover:scale-105"
            style={{ background: "linear-gradient(135deg, hsl(214 66% 44%) 0%, hsl(192 91% 37%) 100%)", border: "1px solid rgba(255,255,255,0.3)", boxShadow: "0 2px 12px rgba(38,104,188,0.30), inset 0 1px 0 rgba(255,255,255,0.25)", color: "#fff" }}
          >
            View All Services <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ServicesSection;
