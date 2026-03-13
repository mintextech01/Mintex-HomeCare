import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/mintexcare-logo.svg";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Why Choose Us", href: "/#why-choose-us" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    if (href.startsWith("/#")) {
      if (isHome) {
        const el = document.getElementById(href.substring(2));
        el?.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMobileOpen(false);
  };

  const headerBg = scrolled || !isHome
    ? "bg-background/95 backdrop-blur-md shadow-sm"
    : "bg-transparent";

  const textColor = scrolled || !isHome ? "text-foreground" : "text-white";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img
            src={logo}
            alt="MintexCare logo"
            className={`h-16 md:h-20 w-auto transition-all ${scrolled || !isHome ? "" : "brightness-0 invert"}`}
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map(link => (
            <Link
              key={link.label}
              to={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`text-sm font-medium hover:text-accent transition-colors ${textColor}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+17322685112" className={`flex items-center gap-1.5 text-sm font-medium ${textColor}`}>
            <Phone className="h-4 w-4" /> (732) 268-5112
          </a>
          <Link to="/contact">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-6">
              Request Care
            </Button>
          </Link>
        </div>

        <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen
            ? <X className={`h-6 w-6 ${scrolled || !isHome ? "text-foreground" : "text-white"}`} />
            : <Menu className={`h-6 w-6 ${scrolled || !isHome ? "text-foreground" : "text-white"}`} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`lg:hidden fixed inset-0 top-16 z-40 transition-all duration-300 ${mobileOpen ? "visible" : "invisible"}`}>
        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setMobileOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-72 bg-background shadow-xl transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}>
          <nav className="p-6 flex flex-col gap-1">
            {navLinks.map(link => (
              <Link key={link.label} to={link.href} onClick={() => handleNavClick(link.href)} className="text-sm font-medium text-foreground hover:text-accent py-3 border-b border-border transition-colors">
                {link.label}
              </Link>
            ))}
            <a href="tel:+17322685112" className="flex items-center gap-2 text-sm font-medium text-foreground py-3 border-b border-border">
              <Phone className="h-4 w-4" /> (732) 268-5112
            </a>
            <Link to="/contact" onClick={() => setMobileOpen(false)} className="mt-4">
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-full">Request Care</Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
