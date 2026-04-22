import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Clock } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import logo from "@/assets/Artboard 133 copy (1).svg";
import AnimatedSection from "@/components/AnimatedSection";

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
              {contactInfo.facebookUrl && <a href={contactInfo.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"><Facebook className="h-4 w-4" /></a>}
              {contactInfo.instagramUrl && <a href={contactInfo.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"><Instagram className="h-4 w-4" /></a>}
              {contactInfo.linkedinUrl && <a href={contactInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"><Linkedin className="h-4 w-4" /></a>}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-5">Quick Links</h3>
            <ul className="space-y-2.5 text-sm text-white/80">
              {[["Home", "/"], ["About Us", "/about"], ["Services", "/services"], ["Careers", "/careers"], ["Contact", "/contact"]].map(([label, href]) => (
                <li key={label}><Link to={href} className="hover:text-accent transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-5">Our Services</h3>
            <ul className="space-y-2.5 text-sm text-white/80">
              {["Personal Care", "Companion Care", "Skilled Nursing", "Post-Surgery Care", "Respite Care", "Meal Preparation"].map(s => (
                <li key={s}><Link to="/services" className="hover:text-accent transition-colors">{s}</Link></li>
              ))}
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
        <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center text-xs text-white/60 gap-2">
          <p>© 2025 MintexCare. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
