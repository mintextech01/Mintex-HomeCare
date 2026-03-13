import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const FloatingCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Desktop: floating bar */}
      <div className="hidden md:block fixed bottom-0 left-0 right-0 z-30 bg-primary/95 backdrop-blur-sm border-t border-white/10 py-3 animate-fade-in">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <p className="text-primary-foreground text-sm font-sans">
            Need compassionate home care? <span className="font-semibold">We're here 24/7.</span>
          </p>
          <div className="flex items-center gap-3">
            <a href="tel:+17322685112" className="text-primary-foreground text-sm font-medium flex items-center gap-1.5 font-sans hover:text-accent transition-colors">
              <Phone className="h-4 w-4" /> (732) 268-5112
            </a>
            <Link to="/contact">
              <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-6 font-sans">
                Request Care
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile: compact bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-primary/95 backdrop-blur-sm border-t border-white/10 p-3 animate-fade-in">
        <div className="flex gap-2">
          <a href="tel:+17322685112" className="flex-1">
            <Button variant="outline" size="sm" className="w-full border-white/30 text-primary-foreground hover:bg-white/10 rounded-full font-sans text-xs">
              <Phone className="h-3.5 w-3.5 mr-1" /> Call Now
            </Button>
          </a>
          <Link to="/contact" className="flex-1">
            <Button size="sm" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-full font-sans text-xs">
              Request Care
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default FloatingCTA;
