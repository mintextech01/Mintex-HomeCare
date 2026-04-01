import { Link } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight, Clock, Home, Stethoscope, Activity, Dumbbell, Building2 } from "lucide-react";

const SERVICE_META = [
  { icon: Clock,       label: "Hourly Care",           title: "Flexible hourly support",       description: "Flexible hourly visits tailored to your schedule — from a few hours a week to daily support.",              btnClass: "bg-sky-200 hover:bg-sky-300 text-slate-800",       btnLabel: "Learn more",    link: "/services", imgKey: "serviceCard1" as const },
  { icon: Home,        label: "Live-In Care",           title: "Round-the-clock home care",      description: "A dedicated caregiver lives with your loved one for continuous, personalized support.",                    btnClass: "bg-purple-300 hover:bg-purple-400 text-slate-800", btnLabel: "Explore care",  link: "/services", imgKey: "serviceCard2" as const },
  { icon: Activity,    label: "Post-Surgery Recovery",  title: "Recover safely at home",         description: "Medication reminders, mobility assistance, and wound monitoring — all at home.",                          btnClass: "bg-[#d4d56b] hover:bg-[#c4c55b] text-slate-800",  btnLabel: "Get started",   link: "/services", imgKey: "serviceCard3" as const },
  { icon: Stethoscope, label: "Skilled Nursing",        title: "Clinical care at home",          description: "Licensed nurses providing IV therapy, wound treatment, and chronic disease management.",                   btnClass: "bg-sky-200 hover:bg-sky-300 text-slate-800",       btnLabel: "View scope",    link: "/services", imgKey: "serviceCard4" as const },
  { icon: Dumbbell,    label: "Rehab Support",          title: "Regain your independence",       description: "Therapy aides helping clients rebuild mobility and confidence after illness or injury.",                   btnClass: "bg-purple-300 hover:bg-purple-400 text-slate-800", btnLabel: "Learn more",    link: "/services", imgKey: "serviceCard5" as const },
  { icon: Building2,   label: "Facility Staffing",      title: "Reliable facility staffing",     description: "HHA and CNA staffing for assisted living, nursing homes, and rehab centers across NJ.",                  btnClass: "bg-[#d4d56b] hover:bg-[#c4c55b] text-slate-800",  btnLabel: "Partner with us", link: "/services", imgKey: "serviceCard6" as const },
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

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <AnimatedSection key={service.label} delay={i * 0.07}>
                <div
                  className="group relative rounded-2xl overflow-hidden cursor-pointer h-[260px] sm:h-[300px] md:h-[360px]"
                >
                  {/* Background image */}
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Always-on dark overlay */}
                  <div className="absolute inset-0 bg-black/30" />

                  {/* Top gradient for badge readability */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />

                  {/* Badge — top left */}
                  <div className="absolute top-5 left-5 z-10 flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
                    <Icon className="h-5 w-5 text-white flex-shrink-0" />
                    <span className="text-white text-xs font-semibold tracking-wide font-sans leading-none">
                      {service.label}
                    </span>
                  </div>

                  {/* Title — centered, shifted above midpoint via pb-20 */}
                  <div className="absolute inset-0 z-10 flex items-center justify-center px-6 pb-20 pointer-events-none">
                    <h3 className="text-white font-bold text-[1.55rem] text-center leading-snug drop-shadow-lg">
                      {service.title}
                    </h3>
                  </div>

                  {/* Slide-up reveal panel */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0">
                    <div
                      className="px-6 pb-6 pt-12"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.82) 55%, rgba(0,0,0,0) 100%)",
                      }}
                    >
                      <p className="text-white/85 text-sm leading-relaxed font-sans mb-4">
                        {service.description}
                      </p>
                      <Link
                        to={service.link}
                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-sans font-semibold text-sm transition-colors duration-200 ${service.btnClass}`}
                      >
                        {service.btnLabel}
                        <ArrowRight className="h-4 w-4" />
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
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-sans font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:scale-105"
          >
            View All Services <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ServicesSection;
