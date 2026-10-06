import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AccessibilityButton from "@/components/AccessibilityButton";
import { useAdmin } from "@/contexts/AdminContext";
import { Home, Stethoscope, MapPin, CalendarCheck, Phone, ArrowRight } from "lucide-react";

// Shown for unknown routes in the app, and prerendered to dist/404.html, which Firebase Hosting
// serves (with a 404 status) for any URL that has no page.

const GRADIENT_BTN = {
  background: "linear-gradient(135deg, hsl(214 66% 44%) 0%, hsl(192 91% 37%) 100%)",
  border: "1px solid rgba(255,255,255,0.3)",
  boxShadow: "0 2px 12px rgba(38,104,188,0.30), inset 0 1px 0 rgba(255,255,255,0.25)",
  color: "#fff",
};

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
      <main className="relative flex min-h-[100svh] items-center justify-center bg-background pt-28 lg:pt-36 pb-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute rounded-full deco-drift" style={{ background: "radial-gradient(circle, #bfdbfe 0%, transparent 70%)", width: 560, height: 560, top: "-10%", right: "-10%", opacity: 0.7 }} />
          <div className="absolute rounded-full deco-float-down" style={{ background: "radial-gradient(circle, #a7f3d0 0%, transparent 70%)", width: 400, height: 400, bottom: "-12%", left: "-8%", opacity: 0.5 }} />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center max-w-3xl">
          <p className="font-extrabold leading-none mb-4 bg-clip-text text-transparent" style={{ fontSize: "clamp(6rem, 18vw, 10rem)", backgroundImage: "linear-gradient(135deg, #1d4f8c 0%, #2a66b0 55%, #0891b2 100%)" }}>
            404
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">We couldn't find that page</h1>
          <p className="text-gray-500 mb-10 max-w-md mx-auto leading-relaxed">
            The page may have moved or the link may be out of date. These pages might help, or call us any time.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-10 text-left">
            {LINKS.map(({ to, icon: I, label, text }) => (
              <Link key={to} to={to} className="group bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-lg hover:border-[#2a66b0]/25 hover:-translate-y-0.5 transition-all">
                <span className="w-11 h-11 rounded-xl bg-[#2a66b0]/10 flex items-center justify-center mb-3 group-hover:bg-[#2a66b0] transition-colors">
                  <I className="w-5 h-5 text-[#2a66b0] group-hover:text-white transition-colors" />
                </span>
                <span className="block font-bold text-gray-900 mb-1">{label}</span>
                <span className="block text-sm text-gray-500 leading-snug">{text}</span>
              </Link>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-8 py-3.5 rounded-full transition-all hover:scale-105" style={GRADIENT_BTN}>
              <Home className="h-4 w-4" /> Back to Home
            </Link>
            <a href={`tel:+1${tel}`} className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-8 py-3.5 rounded-full text-foreground hover:text-primary transition-all glass-btn">
              <Phone className="h-4 w-4" /> Call {contactInfo.phone}
            </a>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-6 py-3.5 text-[#2a66b0] hover:gap-3 transition-all">
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
