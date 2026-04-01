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
      <div className="flex min-h-screen items-center justify-center bg-hero-bg pt-20">
        <div className="text-center px-4">
          <h1 className="text-8xl font-serif font-bold text-primary mb-4">404</h1>
          <p className="text-xl text-foreground font-serif mb-2">Page Not Found</p>
          <p className="text-muted-foreground font-sans mb-8 max-w-md mx-auto">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 font-sans">
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
