import { Link } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight, Clock, Home, Stethoscope, Activity, Dumbbell, Building2 } from "lucide-react";


const SERVICE_META = [
  { icon: Clock,       label: "Hourly Care",           title: "Flexible hourly support",       description: "Flexible hourly visits tailored to your schedule — from a few hours a week to daily support.",              btnLabel: "Learn more",    link: "/services/hourly-care", imgKey: "serviceCard1" as const },
  { icon: Home,        label: "Live-In Care",           title: "Round-the-clock home care",      description: "A dedicated caregiver lives with your loved one for continuous, personalized support.",                    btnLabel: "Explore care",  link: "/services/live-in-24-hour-care", imgKey: "serviceCard2" as const },
  { icon: Activity,    label: "Post-Surgery Recovery",  title: "Recover safely at home",         description: "Medication reminders, mobility assistance, and wound monitoring — all at home.",                          btnLabel: "Get started",   link: "/services/post-surgery-care", imgKey: "serviceCard3" as const },
  { icon: Stethoscope, label: "Skilled Nursing",        title: "Clinical care at home",          description: "Licensed nurses providing IV therapy, wound treatment, and chronic disease management.",                   btnLabel: "View scope",    link: "/services/skilled-nursing", imgKey: "serviceCard4" as const },
  { icon: Dumbbell,    label: "Rehab Support",          title: "Regain your independence",       description: "Therapy aides helping clients rebuild mobility and confidence after illness or injury.",                   btnLabel: "Learn more",    link: "/services/therapy-support", imgKey: "serviceCard5" as const },
  { icon: Building2,   label: "Facility Staffing",      title: "Reliable facility staffing",     description: "HHA and CNA staffing for assisted living, nursing homes, and rehab centers across NJ.",                  btnLabel: "Partner with us", link: "/facility-staffing", imgKey: "serviceCard6" as const },
];

const ServicesSection = () => {
  const { siteImages } = useAdmin();
  const services = SERVICE_META.map(s => ({ ...s, image: siteImages[s.imgKey] }));
  return (
    <section id="services" className="py-20 md:py-24 bg-surface">
      <div className="container mx-auto px-6 md:px-10">

        {/* Heading — left, with "View all" on the right */}
        <AnimatedSection className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="el-eyebrow bg-background mb-5">What We Offer</div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              Our Home Care Services
            </h2>
            <p className="text-muted-foreground text-base font-sans">
              Comprehensive care solutions designed to improve your general health and well-being
            </p>
          </div>
          <Link to="/services" className="el-btn-primary group shrink-0 self-start md:self-auto">
            View All Services <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <AnimatedSection key={service.label} delay={i * 0.06} className="h-full">
                <Link
                  to={service.link}
                  className="group flex flex-col h-full rounded-[24px] bg-background p-3 transition-shadow duration-300 hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.15)]"
                >
                  <div className="relative h-[220px] md:h-[240px] rounded-[18px] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2 rounded-full bg-background/95 px-3.5 py-1.5 shadow-sm">
                      <Icon className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-foreground text-xs font-semibold font-sans leading-none">
                        {service.label}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 px-3 pt-5 pb-3">
                    <h3 className="text-foreground font-bold text-xl leading-snug mb-2">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed font-sans mb-5 flex-1">
                      {service.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold font-sans text-foreground group-hover:text-primary transition-colors">
                      {service.btnLabel}
                      <span className="h-8 w-8 rounded-full bg-accent flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowRight className="h-4 w-4 text-accent-foreground" />
                      </span>
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
