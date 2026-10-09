import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", toggle);
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      // Hidden on phones: a third floating bubble there covers page content (WhatsApp and
      // accessibility buttons stay). Desktop keeps it at a 44px tap size.
      className="theme-el fixed bottom-44 right-4 md:right-6 z-40 h-11 w-11 rounded-full bg-foreground text-background shadow-lg hidden md:flex items-center justify-center hover:bg-foreground/85 transition-all animate-fade-in"
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
};

export default ScrollToTop;
