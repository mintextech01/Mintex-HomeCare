import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Clock } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import logo from "@/assets/Artboard 133 copy (1).svg";
import AnimatedSection from "@/components/AnimatedSection";
import { serviceBySlug } from "@/data/serviceIndex";

const Footer = () => {
  const { contactInfo } = useAdmin();
  const phoneLink = contactInfo.phone.replace(/[^\d+]/g, "");

  return (
    <footer className="bg-footer-bg text-footer-foreground relative overflow-hidden">
      <div className="container mx-auto px-4 py-14 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <img src={logo} alt="MintexCare" className="h-20 md:h-28 w-auto object-contain transform scale-110 origin-left mb-4" />
            <p className="text-sm italic mb-4 text-white/70">Care you can believe in</p>
            <p className="text-sm text-white/80 leading-relaxed">MintexCare is a trusted home healthcare agency based in New Jersey, providing compassionate, high-quality care to individuals in the comfort of their own homes.</p>
            <div className="flex gap-3 mt-5">
              <a href={contactInfo.facebookUrl || "https://www.facebook.com/profile.php?id=61566851474928"} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"><Facebook className="h-4 w-4" /></a>
              <a href={contactInfo.instagramUrl || "https://www.instagram.com/mintexhomecare/"} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"><Instagram className="h-4 w-4" /></a>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-5">Quick Links</h3>
            <ul className="space-y-2.5 text-sm text-white/80">
              {[["Home", "/"], ["About Us", "/about"], ["Services", "/services"], ["Facility Staffing", "/facility-staffing"], ["Areas We Serve", "/areas-we-serve"], ["How It Works", "/how-it-works"], ["FAQ", "/faq"], ["Careers", "/careers"], ["Contact", "/contact"]].map(([label, href]) => (
                <li key={label}><Link to={href} className="hover:text-accent transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-5">Our Services</h3>
            <ul className="space-y-2.5 text-sm text-white/80">
              {["personal-care", "companion-care", "live-in-24-hour-care", "skilled-nursing", "post-surgery-care", "respite-care"].map(slug => (
                <li key={slug}><Link to={`/services/${slug}`} className="hover:text-accent transition-colors">{serviceBySlug(slug)?.name}</Link></li>
              ))}
              <li><Link to="/services" className="text-accent hover:underline">All services →</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-5">Contact Info</h3>
            <ul className="space-y-4 text-sm text-white/80">
              <li className="flex items-start gap-3"><Phone className="h-4 w-4 mt-0.5 shrink-0" /><div><a href={`tel:+1${phoneLink}`} className="hover:text-accent">{contactInfo.phone}</a><br />Fax: {contactInfo.fax}</div></li>
              <li className="flex items-center gap-3"><Mail className="h-4 w-4 shrink-0" /><a href={`mailto:${contactInfo.email}`} className="hover:text-accent">{contactInfo.email}</a></li>
              <li className="flex items-center gap-3"><MapPin className="h-4 w-4 shrink-0" />{contactInfo.address}</li>
              <li className="flex items-center gap-3"><Clock className="h-4 w-4 shrink-0" />{contactInfo.hours}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        {/* Extra bottom/right padding keeps the links clear of the mobile sticky bar and the floating buttons. */}
        <div className="container mx-auto px-4 pt-5 pb-28 lg:pb-5 lg:pr-24 flex flex-col md:flex-row justify-between items-center text-xs text-white/60 gap-2">
          <p>© 2026 MintexCare. All Rights Reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {[["Privacy Policy", "/privacy-policy"], ["Terms of Service", "/terms"], ["HIPAA Notice", "/hipaa-notice"], ["Accessibility", "/accessibility"], ["Non-Discrimination", "/non-discrimination"]].map(([label, href]) => (
              <Link key={href} to={href} className="hover:text-accent transition-colors">{label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
