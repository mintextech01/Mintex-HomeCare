import { useState, useEffect, useRef, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X, ChevronDown, MessageCircle, Briefcase, MapPin, ArrowRight, Clock, Building2, Search, ListChecks, HelpCircle, Mail, ClipboardList, Newspaper, Calculator, Wallet, Receipt, Heart, ShieldCheck, Quote } from "lucide-react";
import logo from "@/assets/Artboard 133 copy (1).svg";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/contexts/ThemeContext";
import { useAdmin } from "@/contexts/AdminContext";
import { SERVICE_INDEX, SERVICE_GROUP_LABEL, type ServiceGroup } from "@/data/serviceIndex";
import { COUNTIES, AREA_REGION_LABEL, type AreaRegion } from "@/data/areas";

// Main navigation from the sitemap.
type MenuId = "services" | "areas" | "costs" | "resources" | "about";
type NavItem =
  // drawerOnly: mobile menu only; on desktop it lives in the utility bar (the sitemap's main bar has no Contact).
  // short: label used on the desktop bar below 1400px, for the same reason.
  | { label: string; href: string; menu?: undefined; drawerOnly?: boolean; short?: string }
  | { label: string; href: string; menu: MenuId; drawerOnly?: boolean; short?: string };

const navItems: NavItem[] = [
  { label: "Care Services",     href: "/services",          menu: "services" },
  { label: "Facility Staffing", href: "/facility-staffing" },
  { label: "Areas We Serve",    href: "/areas-we-serve",    menu: "areas" },
  { label: "Costs & Payment",   href: "/paying-for-care",   menu: "costs", short: "Costs" },
  { label: "Resources",         href: "/resources",         menu: "resources" },
  { label: "About",             href: "/about",             menu: "about" },
  { label: "Careers",           href: "/careers" },
  { label: "Contact",           href: "/contact",           drawerOnly: true },
];

const RESOURCE_LINKS = [
  { to: "/how-it-works",     icon: ListChecks,    title: "How It Works",       text: "From your first call to care at home" },
  { to: "/faq",              icon: HelpCircle,    title: "FAQ",                text: "Answers to common questions" },
  { to: "/resources/guides", icon: ClipboardList, title: "Family Guides",      text: "Printable checklists for families" },
  { to: "/blog",             icon: Newspaper,     title: "Care Articles",      text: "Advice for families planning care" },
  { to: "/resources",        icon: Search,        title: "Search & Resources", text: "Search the whole site" },
];

const CONSULTATION_HREF = "/free-consultation";

const GRADIENT_BTN = {
  background: "linear-gradient(135deg, hsl(214 66% 44%) 0%, hsl(192 91% 37%) 100%)",
  border: "1px solid rgba(255,255,255,0.3)",
  boxShadow: "0 2px 12px rgba(38,104,188,0.30), inset 0 1px 0 rgba(255,255,255,0.25)",
  color: "#fff",
};
const BRAND_GRADIENT = "linear-gradient(135deg, #1d4f8c 0%, #2a66b0 55%, #0891b2 100%)";

const isActive = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`) || (href === "/about" && pathname === "/reviews");

/* ── Mega-menu panels (always in the HTML so the links are crawlable; hidden when closed) ── */

const ServicesPanel = ({ tel, phone }: { tel: string; phone: string }) => (
  <div className="grid grid-cols-[1fr_1fr_280px] gap-8">
    {(["in-home", "clinical"] as ServiceGroup[]).map(group => (
      <div key={group}>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2a66b0] mb-3 px-3">{SERVICE_GROUP_LABEL[group]}</p>
        <ul className="space-y-0.5">
          {SERVICE_INDEX.filter(s => s.group === group).map(s => (
            <li key={s.slug}>
              <Link to={`/services/${s.slug}`} className="group flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-[#2a66b0]/[0.06] transition-colors">
                <span className="w-9 h-9 rounded-lg bg-[#2a66b0]/10 flex items-center justify-center shrink-0 group-hover:bg-[#2a66b0] transition-colors">
                  <s.icon className="w-[18px] h-[18px] text-[#2a66b0] group-hover:text-white transition-colors" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-foreground group-hover:text-[#2a66b0] transition-colors">{s.name}</span>
                  <span className="text-xs text-muted-foreground leading-snug line-clamp-1">{s.short}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ))}
    <div className="relative rounded-2xl p-6 overflow-hidden text-white flex flex-col" style={{ background: BRAND_GRADIENT }}>
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-1/2 translate-x-1/3" style={{ background: "rgba(255,255,255,0.10)" }} />
      <p className="relative text-xs font-semibold uppercase tracking-widest text-white/75 mb-2">Not sure what you need?</p>
      <p className="relative text-lg font-bold leading-snug mb-4">Talk to a care coordinator. It's free.</p>
      <div className="relative mt-auto space-y-2">
        <Link to={CONSULTATION_HREF} className="flex items-center justify-center gap-2 text-sm font-bold rounded-full px-4 py-2.5 shadow-md" style={{ background: "#fff", color: "#1d4f8c" }}>
          Free Consultation <ArrowRight className="h-4 w-4" />
        </Link>
        <a href={`tel:+1${tel}`} className="flex items-center justify-center gap-2 text-sm font-semibold rounded-full px-4 py-2.5" style={{ background: "rgba(255,255,255,0.15)" }}>
          <Phone className="h-4 w-4" /> {phone}
        </a>
      </div>
    </div>
    <div className="col-span-3 flex items-center justify-between border-t border-border pt-4 -mb-1 text-sm">
      <Link to="/services" className="inline-flex items-center gap-2 font-semibold text-[#2a66b0] hover:gap-3 transition-all">
        View all care services <ArrowRight className="h-4 w-4" />
      </Link>
      <Link to="/facility-staffing" className="inline-flex items-center gap-2 font-medium text-muted-foreground hover:text-[#2a66b0] transition-colors">
        <Building2 className="h-4 w-4" /> Staffing for care facilities
      </Link>
    </div>
  </div>
);

const AreasPanel = () => (
  <div className="grid grid-cols-[1fr_1fr_1fr_280px] gap-8">
    {(["central", "north", "shore"] as AreaRegion[]).map(region => (
      <div key={region}>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2a66b0] mb-3 px-3">{AREA_REGION_LABEL[region]}</p>
        <ul className="space-y-0.5">
          {COUNTIES.filter(c => c.region === region).map(c => (
            <li key={c.slug}>
              <Link to={`/areas-we-serve/${c.slug}`} className="group flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-foreground hover:bg-[#2a66b0]/[0.06] hover:text-[#2a66b0] transition-colors">
                <MapPin className="h-4 w-4 text-[#0891b2] shrink-0" /> {c.name} County
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ))}
    <div className="relative rounded-2xl p-6 overflow-hidden text-white flex flex-col" style={{ background: BRAND_GRADIENT }}>
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-1/2 translate-x-1/3" style={{ background: "rgba(255,255,255,0.10)" }} />
      <p className="relative text-xs font-semibold uppercase tracking-widest text-white/75 mb-2">12 NJ counties</p>
      <p className="relative text-lg font-bold leading-snug mb-4">Is my town covered?</p>
      <Link to="/areas-we-serve" className="relative mt-auto flex items-center justify-center gap-2 text-sm font-bold rounded-full px-4 py-2.5 shadow-md" style={{ background: "#fff", color: "#1d4f8c" }}>
        <Search className="h-4 w-4" /> Find your town
      </Link>
    </div>
  </div>
);

const COST_LINKS = [
  { to: "/paying-for-care/cost",        icon: Calculator, title: "Cost of Home Care in NJ", text: "What affects the price and typical care plans" },
  { to: "/paying-for-care/private-pay", icon: Wallet,     title: "Private Pay",             text: "Check, card, ACH, Zelle or cash" },
  { to: "/paying-for-care",             icon: Receipt,    title: "Costs & Payment overview", text: "How pricing works, from first call to quote" },
];

const CostsPanel = () => (
  <div className="grid grid-cols-[1fr_1fr_1fr_280px] gap-5">
    {COST_LINKS.map(({ to, icon: I, title, text }) => (
      <Link key={to} to={to} className="group flex flex-col rounded-2xl border border-border p-5 hover:border-[#2a66b0]/30 hover:bg-[#2a66b0]/[0.04] transition-colors">
        <span className="w-11 h-11 rounded-xl bg-[#2a66b0]/10 flex items-center justify-center mb-4 group-hover:bg-[#2a66b0] transition-colors">
          <I className="w-5 h-5 text-[#2a66b0] group-hover:text-white transition-colors" />
        </span>
        <span className="font-semibold text-foreground group-hover:text-[#2a66b0] transition-colors">{title}</span>
        <span className="text-xs text-muted-foreground mt-1 leading-snug">{text}</span>
      </Link>
    ))}
    <div className="relative rounded-2xl p-6 overflow-hidden text-white flex flex-col" style={{ background: BRAND_GRADIENT }}>
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-1/2 translate-x-1/3" style={{ background: "rgba(255,255,255,0.10)" }} />
      <p className="relative text-xs font-semibold uppercase tracking-widest text-white/75 mb-2">Free, no obligation</p>
      <p className="relative text-lg font-bold leading-snug mb-4">Get a clear, written quote</p>
      <Link to={CONSULTATION_HREF} className="relative mt-auto flex items-center justify-center gap-2 text-sm font-bold rounded-full px-4 py-2.5 shadow-md" style={{ background: "#fff", color: "#1d4f8c" }}>
        Get a Free Quote <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  </div>
);

const ABOUT_LINKS = [
  { to: "/about",                icon: Heart,       title: "Our Story",      text: "Who we are and why we care" },
  { to: "/about/why-mintexcare", icon: ShieldCheck, title: "Why MintexCare", text: "Licensing, RN oversight and caregiver screening" },
  { to: "/reviews",              icon: Quote,       title: "Reviews",        text: "What families say about us" },
];

const AboutPanel = () => (
  <div className="grid grid-cols-[1fr_1fr_1fr_280px] gap-5">
    {ABOUT_LINKS.map(({ to, icon: I, title, text }) => (
      <Link key={to} to={to} className="group flex flex-col rounded-2xl border border-border p-5 hover:border-[#2a66b0]/30 hover:bg-[#2a66b0]/[0.04] transition-colors">
        <span className="w-11 h-11 rounded-xl bg-[#2a66b0]/10 flex items-center justify-center mb-4 group-hover:bg-[#2a66b0] transition-colors">
          <I className="w-5 h-5 text-[#2a66b0] group-hover:text-white transition-colors" />
        </span>
        <span className="font-semibold text-foreground group-hover:text-[#2a66b0] transition-colors">{title}</span>
        <span className="text-xs text-muted-foreground mt-1 leading-snug">{text}</span>
      </Link>
    ))}
    <div className="relative rounded-2xl p-6 overflow-hidden text-white flex flex-col" style={{ background: BRAND_GRADIENT }}>
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-1/2 translate-x-1/3" style={{ background: "rgba(255,255,255,0.10)" }} />
      <ShieldCheck className="relative w-8 h-8 mb-3" />
      <p className="relative text-lg font-bold leading-snug">Licensed by the State of New Jersey</p>
      <p className="relative text-xs text-white/80 mt-1">Bonded, insured and RN-supervised</p>
    </div>
  </div>
);

const ResourcesPanel = ({ tel, phone }: { tel: string; phone: string }) => (
  <div className="grid grid-cols-[1fr_280px] gap-5">
    <div className="grid grid-cols-3 gap-3">
      {RESOURCE_LINKS.map(({ to, icon: I, title, text }) => (
        <Link key={to} to={to} className="group flex items-start gap-3 rounded-2xl border border-border p-4 hover:border-[#2a66b0]/30 hover:bg-[#2a66b0]/[0.04] transition-colors">
          <span className="w-10 h-10 rounded-xl bg-[#2a66b0]/10 flex items-center justify-center shrink-0 group-hover:bg-[#2a66b0] transition-colors">
            <I className="w-5 h-5 text-[#2a66b0] group-hover:text-white transition-colors" />
          </span>
          <span className="min-w-0">
            <span className="block font-semibold text-sm text-foreground group-hover:text-[#2a66b0] transition-colors">{title}</span>
            <span className="block text-xs text-muted-foreground mt-0.5 leading-snug">{text}</span>
          </span>
        </Link>
      ))}
    </div>
    <div className="relative rounded-2xl p-6 overflow-hidden text-white flex flex-col" style={{ background: BRAND_GRADIENT }}>
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-1/2 translate-x-1/3" style={{ background: "rgba(255,255,255,0.10)" }} />
      <p className="relative text-xs font-semibold uppercase tracking-widest text-white/75 mb-2">Still have questions?</p>
      <p className="relative text-lg font-bold leading-snug mb-4">We're here 24/7</p>
      <a href={`tel:+1${tel}`} className="relative mt-auto flex items-center justify-center gap-2 text-sm font-bold rounded-full px-4 py-2.5 shadow-md" style={{ background: "#fff", color: "#1d4f8c" }}>
        <Phone className="h-4 w-4" /> {phone}
      </a>
    </div>
  </div>
);

/* ── Mobile drawer accordion section ── */
const DrawerSection = ({ label, open, onToggle, children, isDark }: {
  label: string; open: boolean; onToggle: () => void; children: ReactNode; isDark: boolean;
}) => (
  <div className="mb-1">
    <button type="button" onClick={onToggle} aria-expanded={open}
      className="w-full flex items-center justify-between text-sm font-medium px-4 py-3.5 rounded-xl transition-colors"
      style={{ background: open ? (isDark ? "rgba(38,104,188,0.15)" : "rgba(38,104,188,0.08)") : "transparent" }}>
      {label}
      <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
    </button>
    <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
      <div className="overflow-hidden">
        <div className="pl-3 pr-1 pt-1 pb-2">{children}</div>
      </div>
    </div>
  </div>
);

const Header = () => {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menu, setMenu]             = useState<MenuId | null>(null);
  const [drawerSection, setDrawerSection] = useState<MenuId | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { isDark } = useTheme();
  const { contactInfo } = useAdmin();
  const phoneLink = contactInfo.phone.replace(/[^\d+]/g, "");
  const whatsapp = `https://wa.me/1${phoneLink}`;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setMenu(null); }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close the mega menu on Escape or a click outside the header.
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenu(null); };
    const onClick = (e: MouseEvent) => { if (!navRef.current?.contains(e.target as Node)) setMenu(null); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onClick); };
  }, [menu]);

  const openMenu = (id: MenuId) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenu(id);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenu(null), 160);
  };

  const solid = scrolled || !isHome || menu !== null;
  const headerClass = solid ? "glass-nav" : "bg-transparent backdrop-blur-sm";

  return (
    <>
      {/* ── Fixed header: utility bar (desktop) + main bar + mega menus ── */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerClass}`}
        onMouseLeave={scheduleClose}
      >
        {/* Utility bar — collapses once the page is scrolled */}
        <div
          className="hidden lg:block overflow-hidden transition-[max-height] duration-300"
          style={{ background: BRAND_GRADIENT, maxHeight: scrolled ? 0 : 36 }}
        >
          <div className="container mx-auto px-4 h-9 flex items-center justify-between text-xs text-white/90">
            <Link to="/areas-we-serve" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <MapPin className="h-3.5 w-3.5" /> Serving 12 NJ counties
            </Link>
            <div className="flex items-center gap-5">
              <a href={`tel:+1${phoneLink}`} className="flex items-center gap-1.5 font-semibold hover:text-white transition-colors">
                <Clock className="h-3.5 w-3.5" /> 24/7: {contactInfo.phone}
              </a>
              <span className="h-3.5 w-px" style={{ background: "rgba(255,255,255,0.3)" }} />
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
              </a>
              <span className="h-3.5 w-px" style={{ background: "rgba(255,255,255,0.3)" }} />
              <Link to="/careers/jobs" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Briefcase className="h-3.5 w-3.5" /> Caregiver Jobs
              </Link>
              <span className="h-3.5 w-px" style={{ background: "rgba(255,255,255,0.3)" }} />
              <Link to="/contact" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Mail className="h-3.5 w-3.5" /> Contact
              </Link>
              <ThemeToggle compact />
            </div>
          </div>
        </div>

        {/* Specular top-edge highlight */}
        {solid && (
          <div
            className="absolute inset-x-0 top-0 h-px pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 30%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.9) 70%, transparent 100%)" }}
          />
        )}

        <div ref={navRef}>
          <div className="container mx-auto px-4 flex items-center justify-between h-20 md:h-28 lg:h-24">
            {/* Logo */}
            <Link to="/" className="flex items-center flex-shrink-0" aria-label="MintexCare home">
              <img src={logo} alt="MintexCare" className="h-20 md:h-28 lg:h-16 xl:h-24 w-auto object-contain" />
            </Link>

            {/* Desktop nav */}
            <nav aria-label="Main" className="hidden lg:flex items-center xl:gap-2">
              {navItems.map(item => {
                const active = isActive(location.pathname, item.href);
                const cls = `relative flex items-center gap-1 whitespace-nowrap text-[13px] min-[1400px]:text-sm font-medium px-1.5 min-[1400px]:px-3 py-2 rounded-full transition-colors duration-200 ${
                  active ? "text-[#2a66b0] dark:text-[hsl(214_66%_68%)]" : "text-foreground hover:text-[#2a66b0] dark:hover:text-[hsl(214_66%_68%)]"
                }`;
                if (!item.menu) {
                  return (
                    <Link key={item.label} to={item.href} className={`${cls} ${item.drawerOnly ? "hidden" : ""}`} aria-current={location.pathname === item.href ? "page" : undefined}
                      onMouseEnter={scheduleClose}>
                      {item.label}
                      {active && <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-[#2a66b0]" />}
                    </Link>
                  );
                }
                // Hover opens the dropdown; clicking the label goes to the section page.
                // The chevron is a separate button so keyboard and touch users can open the dropdown too.
                const open = menu === item.menu;
                return (
                  <div key={item.label} className="flex items-center" onMouseEnter={() => openMenu(item.menu)}>
                    <Link to={item.href} className={`${cls} pr-1 min-[1400px]:pr-1`} aria-current={location.pathname === item.href ? "page" : undefined}>
                      {item.short
                        ? <><span className="min-[1400px]:hidden" aria-hidden="true">{item.short}</span><span className="hidden min-[1400px]:inline">{item.label}</span><span className="sr-only min-[1400px]:hidden">{item.label}</span></>
                        : item.label}
                      {active && <span className="absolute left-3 right-1 -bottom-0.5 h-0.5 rounded-full bg-[#2a66b0]" />}
                    </Link>
                    <button type="button"
                      className={`h-7 w-5 min-[1400px]:w-6 -ml-0.5 flex items-center justify-center rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#2a66b0]/40 ${
                        open || active ? "text-[#2a66b0] dark:text-[hsl(214_66%_68%)]" : "text-foreground hover:text-[#2a66b0]"
                      }`}
                      aria-label={`${open ? "Hide" : "Show"} ${item.label} menu`}
                      aria-expanded={open} aria-controls={`mega-${item.menu}`}
                      onClick={() => setMenu(open ? null : item.menu)}>
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3">
              {/* The light/dark switch is in the utility bar on desktop, to keep this row on one line. */}
              {/* Compact call button (the full number is in the utility bar), so the row never overflows. */}
              <a href={`tel:+1${phoneLink}`} aria-label={`Call MintexCare at ${contactInfo.phone}`} title={contactInfo.phone}
                className="hidden xl:flex h-10 w-10 items-center justify-center rounded-full glass-btn text-foreground hover:text-primary transition-colors">
                <Phone className="h-4 w-4" />
              </a>
              <Link to={CONSULTATION_HREF} className="inline-flex items-center rounded-full px-4 xl:px-6 py-2.5 text-[13px] xl:text-sm font-semibold whitespace-nowrap transition-transform hover:scale-[1.03]" style={GRADIENT_BTN}>
                Free Consultation
              </Link>
            </div>

            {/* Mobile: tap-to-call + theme + hamburger (all ≥ 44px tap targets) */}
            <div className="flex lg:hidden items-center gap-2">
              <a
                href={`tel:+1${phoneLink}`}
                className="h-11 w-11 rounded-full flex items-center justify-center flex-shrink-0 text-white"
                style={{ background: "linear-gradient(135deg, hsl(214 66% 44%) 0%, hsl(192 91% 37%) 100%)", boxShadow: "0 2px 10px rgba(38,104,188,0.30)" }}
                aria-label={`Call MintexCare at ${contactInfo.phone}`}
              >
                <Phone className="h-5 w-5" />
              </a>
              <ThemeToggle />
              <button
                className="h-11 w-11 flex items-center justify-center rounded-xl glass transition-all duration-200 flex-shrink-0"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
              >
                <Menu className="h-5 w-5 text-foreground" />
              </button>
            </div>
          </div>

          {/* Mega menus (desktop) */}
          {(["services", "areas", "costs", "resources", "about"] as const).map(id => {
            const open = menu === id;
            return (
              <div key={id} id={`mega-${id}`}
                className={`hidden lg:block absolute left-0 right-0 top-full transition-all duration-200 ${open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"}`}
                onMouseEnter={() => openMenu(id)}>
                <div className="container mx-auto px-4 pt-2">
                  <div className="rounded-3xl border border-border bg-card shadow-2xl p-6 xl:p-7">
                    {id === "services" ? <ServicesPanel tel={phoneLink} phone={contactInfo.phone} />
                      : id === "areas" ? <AreasPanel />
                      : id === "costs" ? <CostsPanel />
                      : id === "about" ? <AboutPanel />
                      : <ResourcesPanel tel={phoneLink} phone={contactInfo.phone} />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.header>

      {/* ── Mobile sticky bar: Call · WhatsApp · Free Consultation ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur-md px-3 pt-2.5"
        style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))", boxShadow: "0 -6px 24px rgba(15,40,80,0.10)" }}>
        <div className="grid grid-cols-[auto_auto_1fr] gap-2 max-w-xl mx-auto">
          {/* Icon-only below 420px so "Free Consultation" always fits. */}
          <a href={`tel:+1${phoneLink}`} aria-label="Call" className="flex items-center justify-center gap-1.5 h-11 px-4 rounded-full text-[13px] font-semibold text-foreground glass-btn">
            <Phone className="h-4 w-4 text-[#2a66b0]" /> <span className="hidden min-[420px]:inline">Call</span>
          </a>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="flex items-center justify-center gap-1.5 h-11 px-4 rounded-full text-[13px] font-semibold text-foreground glass-btn">
            <MessageCircle className="h-4 w-4 text-[#0891b2]" /> <span className="hidden min-[420px]:inline">WhatsApp</span>
          </a>
          <Link to={CONSULTATION_HREF} className="flex items-center justify-center gap-1.5 h-11 px-3 rounded-full text-[13px] font-bold whitespace-nowrap" style={GRADIENT_BTN}>
            Free Consultation
          </Link>
        </div>
      </div>

      {/* ── Mobile Drawer — rendered OUTSIDE header to avoid z-index conflicts ── */}
      {/* Backdrop */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Slide-in panel. When closed it is hidden (after the slide-out) and has no shadow,
          otherwise the off-screen panel's shadow shows as a grey strip on the right edge. */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full z-[70] flex flex-col ease-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!mobileOpen}
        style={{
          width: "min(88vw, 340px)",
          visibility: mobileOpen ? "visible" : "hidden",
          transition: `transform 300ms ease-out, box-shadow 300ms ease-out, visibility 0s linear ${mobileOpen ? "0s" : "300ms"}`,
          background: isDark
            ? "linear-gradient(160deg, rgba(16,28,52,0.98) 0%, rgba(12,22,42,0.96) 100%)"
            : "linear-gradient(160deg, rgba(255,255,255,0.98) 0%, rgba(235,246,255,0.96) 100%)",
          boxShadow: !mobileOpen
            ? "none"
            : isDark
              ? "-8px 0 40px rgba(0,0,0,0.40)"
              : "-8px 0 40px rgba(0,0,0,0.18)",
          borderLeft: isDark
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid rgba(255,255,255,0.7)",
        }}
      >
        {/* Drawer header: logo + close */}
        <div
          className="flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(38,104,188,0.10)" }}
        >
          <Link to="/" onClick={() => setMobileOpen(false)}>
            <img src={logo} alt="MintexCare" className="h-12 w-auto object-contain" />
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-xl transition-colors"
            style={{ background: isDark ? "rgba(255,255,255,0.06)" : "rgba(38,104,188,0.06)" }}
            aria-label="Close menu"
          >
            <X className="h-5 w-5 text-foreground" />
          </button>
        </div>

        {/* Nav links — scrollable */}
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-3 text-foreground">
          <Link to="/" className="flex items-center text-sm font-medium px-4 py-3.5 rounded-xl mb-1"
            style={{ color: isHome ? (isDark ? "hsl(214 66% 65%)" : "hsl(214 66% 44%)") : "inherit", fontWeight: isHome ? 600 : 500 }}>
            Home
          </Link>
          {navItems.map(item => {
            if (item.menu === "services") {
              return (
                <DrawerSection key={item.label} label={item.label} isDark={isDark}
                  open={drawerSection === "services"} onToggle={() => setDrawerSection(s => (s === "services" ? null : "services"))}>
                  {(["in-home", "clinical"] as ServiceGroup[]).map(group => (
                    <div key={group} className="mb-2">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#2a66b0] px-3 py-1.5">{SERVICE_GROUP_LABEL[group]}</p>
                      {SERVICE_INDEX.filter(s => s.group === group).map(s => (
                        <Link key={s.slug} to={`/services/${s.slug}`} className="flex items-center gap-2.5 text-sm px-3 py-2.5 rounded-lg hover:bg-[#2a66b0]/[0.06]">
                          <s.icon className="h-4 w-4 text-[#2a66b0] shrink-0" /> {s.name}
                        </Link>
                      ))}
                    </div>
                  ))}
                  <Link to="/services" className="flex items-center gap-2 text-sm font-semibold text-[#2a66b0] px-3 py-2.5">
                    All care services <ArrowRight className="h-4 w-4" />
                  </Link>
                </DrawerSection>
              );
            }
            if (item.menu === "areas") {
              return (
                <DrawerSection key={item.label} label={item.label} isDark={isDark}
                  open={drawerSection === "areas"} onToggle={() => setDrawerSection(s => (s === "areas" ? null : "areas"))}>
                  <div className="grid grid-cols-2 gap-x-1">
                    {COUNTIES.map(c => (
                      <Link key={c.slug} to={`/areas-we-serve/${c.slug}`} className="flex items-center gap-1.5 text-sm px-3 py-2.5 rounded-lg hover:bg-[#2a66b0]/[0.06]">
                        <MapPin className="h-3.5 w-3.5 text-[#0891b2] shrink-0" /> {c.name}
                      </Link>
                    ))}
                  </div>
                  <Link to="/areas-we-serve" className="flex items-center gap-2 text-sm font-semibold text-[#2a66b0] px-3 py-2.5">
                    Find your town <ArrowRight className="h-4 w-4" />
                  </Link>
                </DrawerSection>
              );
            }
            if (item.menu === "about") {
              return (
                <DrawerSection key={item.label} label={item.label} isDark={isDark}
                  open={drawerSection === "about"} onToggle={() => setDrawerSection(s => (s === "about" ? null : "about"))}>
                  {ABOUT_LINKS.map(({ to, icon: I, title }) => (
                    <Link key={to} to={to} className="flex items-center gap-2.5 text-sm px-3 py-2.5 rounded-lg hover:bg-[#2a66b0]/[0.06]">
                      <I className="h-4 w-4 text-[#2a66b0] shrink-0" /> {title}
                    </Link>
                  ))}
                </DrawerSection>
              );
            }
            if (item.menu === "costs") {
              return (
                <DrawerSection key={item.label} label={item.label} isDark={isDark}
                  open={drawerSection === "costs"} onToggle={() => setDrawerSection(s => (s === "costs" ? null : "costs"))}>
                  {COST_LINKS.map(({ to, icon: I, title }) => (
                    <Link key={to} to={to} className="flex items-center gap-2.5 text-sm px-3 py-2.5 rounded-lg hover:bg-[#2a66b0]/[0.06]">
                      <I className="h-4 w-4 text-[#2a66b0] shrink-0" /> {title}
                    </Link>
                  ))}
                </DrawerSection>
              );
            }
            if (item.menu === "resources") {
              return (
                <DrawerSection key={item.label} label={item.label} isDark={isDark}
                  open={drawerSection === "resources"} onToggle={() => setDrawerSection(s => (s === "resources" ? null : "resources"))}>
                  {RESOURCE_LINKS.map(({ to, icon: I, title }) => (
                    <Link key={to} to={to} className="flex items-center gap-2.5 text-sm px-3 py-2.5 rounded-lg hover:bg-[#2a66b0]/[0.06]">
                      <I className="h-4 w-4 text-[#2a66b0] shrink-0" /> {title}
                    </Link>
                  ))}
                </DrawerSection>
              );
            }
            const active = isActive(location.pathname, item.href);
            return (
              <Link
                key={item.label}
                to={item.href}
                className="flex items-center text-sm font-medium px-4 py-3.5 rounded-xl mb-1 transition-all duration-200"
                style={{
                  color: active ? (isDark ? "hsl(214 66% 65%)" : "hsl(214 66% 44%)") : "inherit",
                  background: active ? (isDark ? "rgba(38,104,188,0.15)" : "rgba(38,104,188,0.08)") : "transparent",
                  fontWeight: active ? 600 : 500,
                }}
              >
                {item.label}
              </Link>
            );
          })}

          {/* Divider */}
          <div className="my-2 h-px mx-1" style={{ background: "rgba(38,104,188,0.10)" }} />

          {/* Phone + WhatsApp */}
          <div className="grid grid-cols-2 gap-2">
            <a
              href={`tel:+1${phoneLink}`}
              className="flex items-center justify-center gap-2 text-sm font-semibold px-3 py-3.5 rounded-xl"
              style={{
                border: isDark ? "1px solid rgba(255,255,255,0.10)" : "1px solid rgba(38,104,188,0.15)",
                color: isDark ? "hsl(214 66% 65%)" : "hsl(214 66% 44%)",
              }}
            >
              <Phone className="h-4 w-4 flex-shrink-0" /> Call 24/7
            </a>
            <a
              href={whatsapp} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-sm font-semibold px-3 py-3.5 rounded-xl"
              style={{
                border: isDark ? "1px solid rgba(255,255,255,0.10)" : "1px solid rgba(38,104,188,0.15)",
                color: isDark ? "hsl(192 91% 55%)" : "hsl(192 91% 32%)",
              }}
            >
              <MessageCircle className="h-4 w-4 flex-shrink-0" /> WhatsApp
            </a>
          </div>
          <Link to="/careers/jobs" className="flex items-center justify-center gap-2 text-sm font-medium px-4 py-3 mt-2 rounded-xl text-muted-foreground">
            <Briefcase className="h-4 w-4" /> Looking for work? Caregiver Jobs
          </Link>
        </nav>

        {/* Bottom CTA */}
        <div
          className="flex-shrink-0 px-4 pb-8 pt-3"
          style={{ borderTop: "1px solid rgba(38,104,188,0.10)" }}
        >
          <Link to={CONSULTATION_HREF} className="flex items-center justify-center w-full rounded-full font-semibold h-12 text-sm" style={GRADIENT_BTN}>
            Free Consultation
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
