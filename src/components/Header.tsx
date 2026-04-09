import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/Artboard 133 copy (1).svg";

const navLinks = [
  { label: "Home",          href: "/" },
  { label: "About Us",      href: "/about" },
  { label: "Services",      href: "/services" },
  { label: "Why Choose Us", href: "/#why-choose-us" },
  { label: "Careers",       href: "/careers" },
  { label: "Contact",       href: "/contact" },
];

const Header = () => {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    if (href.startsWith("/#") && isHome) {
      const el = document.getElementById(href.substring(2));
      el?.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  const headerClass = scrolled || !isHome
    ? "glass-nav"
    : "bg-transparent backdrop-blur-sm";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerClass}`}>
      {/* Specular top-edge highlight */}
      {(scrolled || !isHome) && (
        <div
          className="absolute inset-x-0 top-0 h-px pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 30%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.9) 70%, transparent 100%)" }}
        />
      )}

      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center flex-shrink-0">
          <img
            src={logo}
            alt="MintexCare"
            className="h-20 md:h-28 w-auto object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map(link => (
            <Link
              key={link.label}
              to={link.href}
              onClick={() => handleNavClick(link.href)}
              className="relative text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-300 rounded-full" />
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:+17322685112"
            className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors glass-btn rounded-full px-4 py-2"
          >
            <Phone className="h-3.5 w-3.5" />
            (732) 268-5112
          </a>
          <Link to="/contact">
            <Button
              className="rounded-full px-6 text-sm font-semibold shadow-none"
              style={{
                background: "linear-gradient(135deg, hsl(214 66% 44%) 0%, hsl(192 91% 37%) 100%)",
                border: "1px solid rgba(255,255,255,0.3)",
                boxShadow: "0 2px 12px rgba(38,104,188,0.30), inset 0 1px 0 rgba(255,255,255,0.25)",
                color: "#fff",
              }}
            >
              Request Care
            </Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded-xl glass transition-all duration-200 flex-shrink-0"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen
            ? <X    className="h-5 w-5 text-foreground" />
            : <Menu className="h-5 w-5 text-foreground" />}
        </button>
      </div>

      {/* ── Mobile Full-Screen Drawer ── */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${
          mobileOpen ? "visible" : "invisible pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className={`absolute right-0 top-0 h-full flex flex-col transition-transform duration-300 ease-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{
            width: "min(85vw, 320px)",
            background: "linear-gradient(160deg, rgba(255,255,255,0.97) 0%, rgba(235,246,255,0.95) 100%)",
            backdropFilter: "blur(40px) saturate(200%)",
            WebkitBackdropFilter: "blur(40px) saturate(200%)",
            borderLeft: "1px solid rgba(255,255,255,0.80)",
            boxShadow: "-12px 0 48px rgba(38,104,188,0.15), inset 1px 0 0 rgba(255,255,255,0.9)",
          }}
        >
          {/* Top shine line */}
          <div
            className="h-px w-full flex-shrink-0"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)" }}
          />

          {/* Drawer header: logo + close */}
          <div
            className="flex items-center justify-between px-5 py-3 flex-shrink-0 border-b"
            style={{ borderColor: "rgba(38,104,188,0.10)" }}
          >
            <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center">
              <img
                src={logo}
                alt="MintexCare"
                className="h-14 w-auto object-contain"
              />
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-xl hover:bg-primary/8 transition-colors"
              aria-label="Close menu"
            >
              <X className="h-5 w-5 text-foreground" />
            </button>
          </div>

          {/* Nav links — scrollable */}
          <nav className="flex-1 overflow-y-auto px-4 py-3">
            <div className="flex flex-col gap-1">
              {navLinks.map(link => {
                const isActive =
                  location.pathname === link.href ||
                  (link.href !== "/" &&
                    !link.href.includes("#") &&
                    location.pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`flex items-center text-sm font-medium px-4 py-3.5 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-foreground hover:bg-primary/6 hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Divider */}
            <div
              className="my-3 h-px w-full"
              style={{ background: "rgba(38,104,188,0.10)" }}
            />

            {/* Phone link */}
            <a
              href="tel:+17322685112"
              className="flex items-center justify-center gap-2.5 w-full text-sm font-semibold text-foreground px-4 py-3.5 rounded-xl border transition-all hover:bg-primary/6 hover:text-primary hover:border-primary/20"
              style={{ borderColor: "rgba(38,104,188,0.15)" }}
            >
              <Phone className="h-4 w-4 text-primary flex-shrink-0" />
              (732) 268-5112
            </a>
          </nav>

          {/* Fixed bottom CTA */}
          <div
            className="flex-shrink-0 px-4 pb-8 pt-3 border-t"
            style={{ borderColor: "rgba(38,104,188,0.10)" }}
          >
            <Link to="/contact" onClick={() => setMobileOpen(false)}>
              <Button
                className="w-full rounded-full font-semibold h-12 text-sm"
                style={{
                  background: "linear-gradient(135deg, hsl(214 66% 44%) 0%, hsl(192 91% 37%) 100%)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  boxShadow: "0 4px 16px rgba(38,104,188,0.30), inset 0 1px 0 rgba(255,255,255,0.25)",
                  color: "#fff",
                }}
              >
                Request Care
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
