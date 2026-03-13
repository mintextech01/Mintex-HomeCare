import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const pageTitles: Record<string, string> = {
  "/": "MintexCare — Compassionate Home Care Services in New Jersey",
  "/about": "About Us — MintexCare",
  "/services": "Our Services — MintexCare",
  "/careers": "Careers — Join the MintexCare Team",
  "/contact": "Contact Us — MintexCare",
  "/admin": "Admin Login — MintexCare",
  "/admin/dashboard": "Admin Dashboard — MintexCare",
};

const usePageTitle = () => {
  const location = useLocation();
  useEffect(() => {
    document.title = pageTitles[location.pathname] || "MintexCare — Care You Can Believe In";
  }, [location.pathname]);
};

export default usePageTitle;
