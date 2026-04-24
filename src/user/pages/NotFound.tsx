import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // 404 tracking: integrate with error monitoring service (e.g. Sentry) if needed
  }, [location.pathname]);

  return (
    <>
      <Header />
      <div className="flex min-h-[100svh] items-center justify-center bg-hero-bg pt-28">
        <div className="text-center px-4">
          <h1 className="text-8xl font-serif font-bold text-primary mb-4">404</h1>
          <p className="text-xl text-foreground font-serif mb-2">Page Not Found</p>
          <p className="text-muted-foreground font-sans mb-8 max-w-md mx-auto">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <Button className="rounded-full px-8 font-semibold" style={{ background: "linear-gradient(135deg, hsl(214 66% 44%) 0%, hsl(192 91% 37%) 100%)", border: "1px solid rgba(255,255,255,0.3)", boxShadow: "0 2px 12px rgba(38,104,188,0.30), inset 0 1px 0 rgba(255,255,255,0.25)", color: "#fff" }}>
              <Home className="h-4 w-4 mr-2" /> Back to Home
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
