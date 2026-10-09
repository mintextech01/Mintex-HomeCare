import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AccessibilityButton from "@/components/AccessibilityButton";
import { useAdmin } from "@/contexts/AdminContext";
import { Home, Stethoscope, MapPin, CalendarCheck, Phone, ArrowRight } from "lucide-react";

// Shown for unknown routes in the app, and prerendered to dist/404.html, which Firebase Hosting
// serves (with a 404 status) for any URL that has no page.

const LINKS = [
  { to: "/services",          icon: Stethoscope,   label: "Care Services",     text: "Personal care, nursing, live-in care and more" },
  { to: "/areas-we-serve",    icon: MapPin,        label: "Areas We Serve",    text: "Find home care in your county or town" },
  { to: "/free-consultation", icon: CalendarCheck, label: "Free Consultation", text: "Talk to a care coordinator, at no cost" },
];

const NotFound = () => {
  const { contactInfo } = useAdmin();
  const tel = contactInfo.phone.replace(/[^\d+]/g, "");

  return (
    <>
      <Header />
      <main className="theme-el flex min-h-[100svh] items-center justify-center pt-28 lg:pt-36 pb-20">
        <div className="container mx-auto px-6 md:px-10 text-center max-w-3xl">
          <p className="font-extrabold leading-none mb-4 text-foreground/10" style={{ fontSize: "clamp(6rem, 18vw, 10rem)" }}>
            404
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">We couldn't find that page</h1>
          <p className="text-muted-foreground mb-10 max-w-md mx-auto leading-relaxed">
            The page may have moved or the link may be out of date. These pages might help, or call us any time.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-10 text-left">
            {LINKS.map(({ to, icon: I, label, text }) => (
              <Link key={to} to={to} className="group el-card p-5 transition-shadow hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.15)]">
                <span className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center mb-4 transition-colors group-hover:bg-foreground">
                  <I className="w-5 h-5 text-accent-foreground transition-colors group-hover:text-background" />
                </span>
                <span className="block font-bold text-foreground mb-1">{label}</span>
                <span className="block text-sm text-muted-foreground leading-snug">{text}</span>
              </Link>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="el-btn-primary">
              <Home className="h-4 w-4" /> Back to Home
            </Link>
            <a href={`tel:+1${tel}`} className="el-btn-soft">
              <Phone className="h-4 w-4" /> Call {contactInfo.phone}
            </a>
            <Link to="/contact" className="el-btn text-foreground hover:text-primary">
              Contact us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
      <AccessibilityButton />
    </>
  );
};

export default NotFound;
