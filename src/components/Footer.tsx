import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Clock, ShieldCheck } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import logo from "@/assets/Artboard 133 copy (1).svg";
import { serviceBySlug } from "@/data/serviceIndex";
import { COUNTIES } from "@/data/areas";

const Footer = () => {
  const { contactInfo } = useAdmin();
  const phoneLink = contactInfo.phone.replace(/[^\d+]/g, "");

  return (
    <footer className="theme-el bg-surface text-foreground relative overflow-hidden border-t border-border">
      <div className="container mx-auto px-6 md:px-10 py-14 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] gap-10">
          <div>
            <img src={logo} alt="MintexCare" className="h-20 md:h-28 w-auto object-contain transform scale-110 origin-left mb-4" />
            <p className="text-sm italic mb-4 text-muted-foreground">Care you can believe in</p>
            <p className="text-sm text-foreground/75 leading-relaxed">MintexCare is a trusted home healthcare agency based in New Jersey, providing compassionate, high-quality care to individuals in the comfort of their own homes.</p>
            <Link to="/about/why-mintexcare" className="mt-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold bg-background border border-border text-foreground hover:border-foreground/30 transition-colors">
              <ShieldCheck className="h-4 w-4 shrink-0 text-primary" /> Licensed by the State of New Jersey
            </Link>
            <div className="flex gap-3 mt-5">
              <a href={contactInfo.facebookUrl || "https://www.facebook.com/profile.php?id=61566851474928"} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="h-10 w-10 rounded-full bg-background border border-border flex items-center justify-center hover:bg-foreground hover:text-background hover:border-foreground transition-colors"><Facebook className="h-4 w-4" /></a>
              <a href={contactInfo.instagramUrl || "https://www.instagram.com/mintexhomecare/"} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="h-10 w-10 rounded-full bg-background border border-border flex items-center justify-center hover:bg-foreground hover:text-background hover:border-foreground transition-colors"><Instagram className="h-4 w-4" /></a>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-5">Quick Links</h3>
            <ul className="space-y-2.5 text-sm text-foreground/75">
              {[["Home", "/"], ["About Us", "/about"], ["Services", "/services"], ["Facility Staffing", "/facility-staffing"], ["Areas We Serve", "/areas-we-serve"], ["How It Works", "/how-it-works"], ["FAQ", "/faq"], ["Careers", "/careers"], ["Contact", "/contact"]].map(([label, href]) => (
                <li key={label}><Link to={href} className="hover:text-foreground hover:underline underline-offset-4 transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-5">Our Services</h3>
            <ul className="space-y-2.5 text-sm text-foreground/75">
              {["personal-care", "companion-care", "live-in-24-hour-care", "skilled-nursing", "post-surgery-care", "respite-care"].map(slug => (
                <li key={slug}><Link to={`/services/${slug}`} className="hover:text-foreground hover:underline underline-offset-4 transition-colors">{serviceBySlug(slug)?.name}</Link></li>
              ))}
              <li><Link to="/services" className="font-semibold text-primary hover:underline underline-offset-4">All services →</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-5">Contact Info</h3>
            <ul className="space-y-4 text-sm text-foreground/75">
              <li className="flex items-start gap-3">
                <span className="h-9 w-9 rounded-full bg-accent flex items-center justify-center shrink-0"><Phone className="h-4 w-4 text-accent-foreground" /></span>
                <div className="pt-1"><a href={`tel:+1${phoneLink}`} className="font-semibold text-foreground hover:underline underline-offset-4">{contactInfo.phone}</a><br />Fax: {contactInfo.fax}</div>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-9 w-9 rounded-full bg-background flex items-center justify-center shrink-0"><Mail className="h-4 w-4" /></span>
                <a href={`mailto:${contactInfo.email}`} className="break-all hover:text-foreground hover:underline underline-offset-4">{contactInfo.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-9 w-9 rounded-full bg-background flex items-center justify-center shrink-0"><MapPin className="h-4 w-4" /></span>
                {contactInfo.address}
              </li>
              <li className="flex items-center gap-3">
                <span className="h-9 w-9 rounded-full bg-background flex items-center justify-center shrink-0"><Clock className="h-4 w-4" /></span>
                {contactInfo.hours}
              </li>
            </ul>
          </div>
        </div>

        {/* Service area: every county page, one click from any page. */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
            <Link to="/areas-we-serve" className="inline-flex items-center gap-2 font-serif text-base font-semibold shrink-0 hover:text-primary transition-colors">
              <MapPin className="h-4 w-4 text-primary" /> Serving 12 NJ Counties
            </Link>
            <ul className="flex flex-wrap gap-2">
              {COUNTIES.map(c => (
                <li key={c.slug}>
                  <Link to={`/areas-we-serve/${c.slug}`} className="inline-block rounded-full px-3 py-1 text-xs font-medium bg-background border border-border text-foreground/80 hover:bg-foreground hover:text-background hover:border-foreground transition-colors">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        {/* Extra bottom/right padding keeps the links clear of the mobile sticky bar and the floating buttons. */}
        <div className="container mx-auto px-6 md:px-10 pt-5 pb-28 lg:pb-5 lg:pr-24 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground gap-2">
          <p>© 2026 MintexCare. All Rights Reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {[["Privacy Policy", "/privacy-policy"], ["Terms of Service", "/terms"], ["HIPAA Notice", "/hipaa-notice"], ["Accessibility", "/accessibility"], ["Non-Discrimination", "/non-discrimination"]].map(([label, href]) => (
              <Link key={href} to={href} className="hover:text-foreground transition-colors">{label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
