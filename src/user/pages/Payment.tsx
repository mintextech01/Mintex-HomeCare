import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, type ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import AccessibilityButton from "@/components/AccessibilityButton";
import AnimatedSection from "@/components/AnimatedSection";
import { useAdmin, type Pricing } from "@/contexts/AdminContext";
import {
  ArrowRight, Phone, MessageCircle, DollarSign, Calculator, Wallet, Clock, Moon, CalendarDays, Home, Stethoscope,
  HeartHandshake, ClipboardList, FileText, CheckCircle2, ChevronRight, CreditCard, Landmark, Banknote, Smartphone,
  Receipt, PiggyBank, Users, RefreshCw, ShieldCheck, Info, Sparkles,
} from "lucide-react";
import React from "react";

// /paying-for-care (hub), /paying-for-care/cost and /paying-for-care/private-pay share this chunk.
// Only payment types MintexCare has confirmed are described (private pay). Insurance, Medicaid and
// VA pages are intentionally not built until those payers are confirmed.

const GRADIENT_BTN = {
  background: "linear-gradient(135deg, hsl(214 66% 44%) 0%, hsl(192 91% 37%) 100%)",
  border: "1px solid rgba(255,255,255,0.3)",
  boxShadow: "0 2px 12px rgba(38,104,188,0.30), inset 0 1px 0 rgba(255,255,255,0.25)",
  color: "#fff",
};
const BRAND_GRADIENT = "linear-gradient(135deg, #1d4f8c 0%, #2a66b0 55%, #0891b2 100%)";
// White tints are inline styles: the dark theme overrides bg-white/* classes.
const WHITE_TINT = "rgba(255,255,255,0.15)";

const PAYMENT_METHODS = [
  { icon: FileText,   label: "Check" },
  { icon: CreditCard, label: "Credit / debit card" },
  { icon: Landmark,   label: "Bank transfer (ACH)" },
  { icon: Smartphone, label: "Zelle" },
  { icon: Banknote,   label: "Cash" },
];

/** Price lines that should be shown publicly (switch on and an amount entered). */
const visiblePrices = (p: Pricing) => (p.showPrices ? p.items.filter(i => i.label.trim() && i.amount.trim()) : []);
const money = (amount: string) => `$${amount.replace(/^\$\s*/, "")}`;

/* ════════════════════════════════════════════
   SHARED PIECES
   ════════════════════════════════════════════ */

const Breadcrumb = ({ trail }: { trail: { label: string; to?: string }[] }) => (
  <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-8 flex flex-wrap items-center gap-2">
    {trail.map((c, i) => (
      <React.Fragment key={c.label}>
        {i > 0 && <span className="text-gray-300">/</span>}
        {c.to
          ? <Link to={c.to} className="hover:text-[#2a66b0] transition-colors">{c.label}</Link>
          : <span className="text-[#2a66b0] font-medium" aria-current="page">{c.label}</span>}
      </React.Fragment>
    ))}
  </nav>
);

const Pill = ({ icon: Icon, children }: { icon: typeof DollarSign; children: ReactNode }) => (
  <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-6">
    <Icon className="w-3.5 h-3.5 text-[#2a66b0]" />
    <span className="text-xs font-semibold text-[#2a66b0] uppercase tracking-widest">{children}</span>
  </div>
);

const Eyebrow = ({ children, color = "#2a66b0" }: { children: ReactNode; color?: string }) => (
  <div className="inline-flex items-center gap-3 mb-5">
    <span className="h-px w-10 inline-block" style={{ background: color }} />
    <span className="text-xs font-extrabold uppercase tracking-[0.25em]" style={{ color }}>{children}</span>
    <span className="h-px w-10 inline-block" style={{ background: color }} />
  </div>
);

const HeroDeco = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="absolute rounded-full deco-drift" style={{ background: "radial-gradient(circle, #bfdbfe 0%, transparent 70%)", width: 620, height: 620, top: "-18%", right: "-10%", opacity: 0.7 }} />
    <div className="absolute rounded-full deco-float-down" style={{ background: "radial-gradient(circle, #a7f3d0 0%, transparent 70%)", width: 400, height: 400, bottom: "-20%", left: "-8%", opacity: 0.5 }} />
    <div className="absolute rounded-full deco-float-up" style={{ background: "radial-gradient(circle, #c7d2fe 0%, transparent 70%)", width: 300, height: 300, top: "12%", left: "28%", opacity: 0.35 }} />
    <div className="absolute top-[24%] right-[40%] w-28 h-28 rounded-full border-[3px] border-dashed border-[#0891b2]/[0.1] deco-spin-slow hidden lg:block" />
    <svg className="absolute bottom-0 left-0 w-full h-16 opacity-[0.06]" viewBox="0 0 1440 64" preserveAspectRatio="none">
      <path d="M0,32 C360,64 720,0 1080,32 C1260,48 1380,16 1440,32 L1440,64 L0,64 Z" fill="#2a66b0" />
    </svg>
  </div>
);

const Hero = ({ trail, pill, pillIcon, title, highlight, intro, children }: {
  trail: { label: string; to?: string }[]; pill: string; pillIcon: typeof DollarSign; title: string; highlight: string; intro: string; children?: ReactNode;
}) => (
  <section className="relative pt-32 md:pt-40 pb-16 md:pb-20 overflow-hidden">
    <HeroDeco />
    <div className="container mx-auto px-4 md:px-6 relative z-10">
      <AnimatedSection className="max-w-3xl">
        <Breadcrumb trail={trail} />
        <Pill icon={pillIcon}>{pill}</Pill>
        <h1 className="font-bold text-gray-900 leading-[1.07] mb-5" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)" }}>
          {title}<br /><span className="text-[#2a66b0]">{highlight}</span>
        </h1>
        <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-8 max-w-[620px]">{intro}</p>
        {children}
      </AnimatedSection>
    </div>
  </section>
);

const HeroButtons = ({ tel, phone, primary = "Get a Free Quote" }: { tel: string; phone: string; primary?: string }) => (
  <div className="flex flex-wrap gap-3">
    <Link to="/free-consultation" className="inline-flex items-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-full transition-all hover:scale-105" style={GRADIENT_BTN}>
      {primary} <ArrowRight className="h-4 w-4" />
    </Link>
    <a href={`tel:+1${tel}`} className="inline-flex items-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-full text-foreground hover:text-primary transition-all glass-btn">
      <Phone className="h-4 w-4" /> Call {phone}
    </a>
  </div>
);

const FaqList = ({ faqs }: { faqs: { q: string; a: string }[] }) => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-4">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className={`bg-card border rounded-2xl shadow-sm transition-all duration-300 ${isOpen ? "border-[#2a66b0]/30 shadow-lg" : "border-border hover:shadow-md"}`}>
            <button type="button" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} aria-controls={`pfaq-${i}`}
              className="w-full flex items-center gap-4 text-left px-5 md:px-6 py-5">
              <span className="h-9 w-9 rounded-xl text-xs font-bold flex items-center justify-center shrink-0 text-white shadow-md" style={{ background: BRAND_GRADIENT }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 font-semibold text-gray-900 leading-snug">{f.q}</span>
              <ChevronRight className={`h-5 w-5 text-[#2a66b0] shrink-0 transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`} />
            </button>
            {/* Answer stays in the HTML when closed so search engines can read it. */}
            <div id={`pfaq-${i}`} className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
              <div className="overflow-hidden">
                <p className="text-gray-600 leading-relaxed px-5 md:px-6 pb-6 md:pl-[76px]">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const FaqSection = ({ title, faqs }: { title: string; faqs: { q: string; a: string }[] }) => (
  <section className="py-20 md:py-24 bg-[#f7f8f9] border-t border-border">
    <div className="container mx-auto px-4 md:px-6 max-w-4xl">
      <AnimatedSection className="text-center mb-12">
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>
      </AnimatedSection>
      <AnimatedSection><FaqList faqs={faqs} /></AnimatedSection>
    </div>
  </section>
);

const CtaBlock = ({ tel, phone, title, text }: { tel: string; phone: string; title: string; text: string }) => (
  <section className="py-20 bg-background">
    <div className="container mx-auto px-4 md:px-6">
      <AnimatedSection>
        <div className="relative rounded-3xl overflow-hidden px-6 py-12 sm:px-10 sm:py-16 md:px-16 text-center" style={{ background: BRAND_GRADIENT }}>
          <div className="pointer-events-none absolute top-0 right-0 w-72 h-72 rounded-full -translate-y-1/2 translate-x-1/4" style={{ background: "rgba(255,255,255,0.10)" }} />
          <div className="pointer-events-none absolute bottom-0 left-0 w-52 h-52 rounded-full translate-y-1/2 -translate-x-1/4" style={{ background: "rgba(255,255,255,0.08)" }} />
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5" style={{ background: WHITE_TINT }}>
              <Receipt className="w-3.5 h-3.5 text-white" />
              <span className="text-xs font-semibold text-white uppercase tracking-widest">Free, no-obligation quote</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-white leading-snug mb-4">{title}</h2>
            <p className="text-white/80 text-sm md:text-base leading-relaxed mb-9">{text}</p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center gap-3">
              <Link to="/free-consultation" className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold text-sm px-7 py-4 rounded-full shadow-lg transition-all hover:scale-105" style={{ background: "#fff", color: "#1d4f8c" }}>
                Get a Free Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={`tel:+1${tel}`} className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold text-sm px-7 py-4 rounded-full text-white transition-all hover:scale-105"
                style={{ background: WHITE_TINT, border: "1px solid rgba(255,255,255,0.35)" }}>
                <Phone className="h-4 w-4" /> Call {phone}
              </a>
              <a href={`https://wa.me/1${tel}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold text-sm px-7 py-4 rounded-full text-white transition-all hover:scale-105"
                style={{ background: WHITE_TINT, border: "1px solid rgba(255,255,255,0.35)" }}>
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

const QUOTE_STEPS = [
  { icon: Phone,         title: "Free consultation",   text: "Tell us what's going on. We'll explain options and typical schedules." },
  { icon: ClipboardList, title: "Free home assessment", text: "We visit to understand needs, routines and the right number of hours." },
  { icon: Receipt,       title: "Clear written quote",  text: "You get the rate and schedule in writing before anything starts." },
  { icon: HeartHandshake, title: "Care begins",         text: "Start on the agreed day, and change hours any time as needs change." },
];

/* ════════════════════════════════════════════
   /paying-for-care
   ════════════════════════════════════════════ */

const HUB_FAQS = [
  { q: "How much does home care cost?", a: "It depends on the type of care, the number of hours and the schedule. We'll give you clear pricing after a free consultation and assessment, before care starts." },
  { q: "How can we pay for care?", a: "Families pay MintexCare directly (private pay) by check, credit or debit card, bank transfer (ACH), Zelle or cash. If you have other coverage, tell us during your consultation and we'll talk through your situation." },
  { q: "Is the consultation free?", a: "Yes. The consultation and the in-home assessment are free, and there's no obligation to start care." },
  { q: "Can we start with a few hours and add more later?", a: "Yes. Many families start small and adjust hours or services as needs change." },
];

const Hub = ({ tel, phone }: { tel: string; phone: string }) => (
  <>
    <Hero trail={[{ label: "Home", to: "/" }, { label: "Costs & Payment" }]} pill="Costs & Payment" pillIcon={Wallet}
      title="Paying for" highlight="Home Care in New Jersey"
      intro="Clear answers about what home care costs and how families pay for it. Start with a free consultation; you'll get a written quote before care begins, with no obligation.">
      <HeroButtons tel={tel} phone={phone} />
    </Hero>

    <section className="py-20 md:py-24 bg-[#f7f8f9] border-t border-border">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { to: "/paying-for-care/cost", icon: Calculator, title: "Cost of Home Care in NJ", text: "What affects the price, example care plans, and how to get a clear quote." },
            { to: "/paying-for-care/private-pay", icon: Wallet, title: "Private Pay", text: "How paying directly works, the payment methods we accept, and what to expect." },
          ].map(({ to, icon: I, title, text }, i) => (
            <AnimatedSection key={to} delay={i * 0.07} className="h-full">
              <Link to={to} className="group relative h-full flex flex-col bg-card border border-border rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#2a66b0]/25 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" style={{ background: BRAND_GRADIENT }} />
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform" style={{ background: BRAND_GRADIENT }}>
                  <I className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
                <p className="text-gray-500 leading-relaxed flex-1">{text}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2a66b0] mt-6 group-hover:gap-2.5 transition-all">
                  Read more <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-3xl border border-blue-100 bg-blue-50 p-6">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md" style={{ background: BRAND_GRADIENT }}>
              <Info className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900">Have insurance or other benefits?</p>
              <p className="text-sm text-gray-600">Tell us about any coverage during your free consultation and we'll talk through your situation honestly.</p>
            </div>
            <a href={`tel:+1${tel}`} className="inline-flex items-center gap-2 text-sm font-semibold text-[#2a66b0] whitespace-nowrap">
              <Phone className="h-4 w-4" /> {phone}
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>

    <section className="py-20 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection className="text-center mb-14">
          <Eyebrow color="#0891b2">How Pricing Works</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">From first call to <span className="text-[#0891b2]">a clear quote</span></h2>
        </AnimatedSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {QUOTE_STEPS.map(({ icon: I, title, text }, i) => (
            <AnimatedSection key={title} delay={i * 0.06} className="h-full">
              <div className="relative h-full bg-card border border-border rounded-3xl p-6 shadow-sm">
                <span className="absolute top-5 right-6 text-4xl font-extrabold text-[#2a66b0]/[0.08]">{String(i + 1).padStart(2, "0")}</span>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-md" style={{ background: BRAND_GRADIENT }}>
                  <I className="w-6 h-6 text-white" />
                </div>
                <p className="font-bold text-gray-900 mb-1">{title}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    <FaqSection title="Questions about paying for care" faqs={HUB_FAQS} />
    <CtaBlock tel={tel} phone={phone} title="Get a clear, free quote" text="Tell us what your loved one needs. We'll explain the options and put the price in writing before care starts." />
  </>
);

/* ════════════════════════════════════════════
   /paying-for-care/cost
   ════════════════════════════════════════════ */

const COST_FACTORS = [
  { icon: HeartHandshake, title: "Type of care", text: "Companionship and help around the house, hands-on personal care, or skilled nursing from an RN or LPN." },
  { icon: Clock, title: "Hours per week", text: "A few hours a week, daily visits, or longer shifts. More hours usually means a more predictable schedule." },
  { icon: Moon, title: "Time of day", text: "Daytime, evenings, overnight or weekends. Some times may be priced differently." },
  { icon: Home, title: "Live-in or 24-hour care", text: "A live-in caregiver and round-the-clock shift care are arranged and priced differently." },
  { icon: Stethoscope, title: "Clinical needs", text: "Nurse visits for wound care, IV therapy or medication management are priced per visit or shift." },
  { icon: CalendarDays, title: "How long care is needed", text: "Short-term help after a hospital stay, regular ongoing care, or occasional respite." },
];

const EXAMPLE_PLANS = [
  { title: "A few hours, a few days a week", text: "Companionship, meals, light housekeeping and errands.", for: "Someone mostly independent who needs some help" },
  { title: "Daily morning or evening help", text: "Bathing, dressing, breakfast or bedtime routine and medication reminders.", for: "Someone who needs hands-on help at set times" },
  { title: "Live-in or 24-hour care", text: "A caregiver there day and night, with nurse oversight.", for: "Someone who shouldn't be alone" },
  { title: "Nurse visits", text: "Skilled visits for wound care, IV therapy or medication management, as ordered.", for: "Someone with clinical needs at home" },
];

const COST_FAQS = [
  { q: "Do you charge for the consultation or assessment?", a: "No. The consultation and the in-home assessment are free, with no obligation." },
  { q: "Will we know the price before care starts?", a: "Yes. After the assessment you get the rate and schedule in writing, before care begins." },
  { q: "Can we change the number of hours later?", a: "Yes. You can increase or reduce hours as your loved one's needs change. Just let your care coordinator know." },
  { q: "Is skilled nursing priced the same as other care?", a: "No. Nurse visits are priced separately from caregiver hours because they're provided by licensed RNs and LPNs." },
];

const Cost = ({ tel, phone }: { tel: string; phone: string }) => {
  const { pricing } = useAdmin();
  const prices = visiblePrices(pricing);
  const showTable = prices.length > 0;
  const lines = pricing.items.filter(i => i.label.trim());

  return (
    <>
      <Hero trail={[{ label: "Home", to: "/" }, { label: "Costs & Payment", to: "/paying-for-care" }, { label: "Cost of Home Care" }]} pill="Cost of Care" pillIcon={Calculator}
        title="Cost of Home Care" highlight="in New Jersey"
        intro="Every family's needs are different, so every care plan is too. Here's what affects the cost of home care, typical care plans, and how to get a clear price for your loved one.">
        <HeroButtons tel={tel} phone={phone} />
      </Hero>

      {/* PRICES */}
      <section className="py-16 md:py-20 bg-[#f7f8f9] border-t border-border">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <AnimatedSection>
            <div className="bg-card border border-border rounded-3xl shadow-lg overflow-hidden">
              <div className="relative px-6 md:px-9 py-7 text-white overflow-hidden" style={{ background: BRAND_GRADIENT }}>
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full -translate-y-1/2 translate-x-1/4" style={{ background: "rgba(255,255,255,0.10)" }} />
                <div className="relative flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: WHITE_TINT, border: "1px solid rgba(255,255,255,0.3)" }}>
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold">{showTable ? "Our rates" : "Get your price"}</h2>
                    <p className="text-white/80 text-sm">{showTable ? "Starting rates. Your exact rate is confirmed in writing after your free assessment." : "Prices depend on your care plan. Call or request a free quote and we'll give you clear pricing."}</p>
                  </div>
                </div>
              </div>
              <ul className="divide-y divide-border">
                {lines.map(item => {
                  const shown = showTable && item.amount.trim();
                  return (
                    <li key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-6 md:px-9 py-5">
                      <div>
                        <p className="font-bold text-gray-900">{item.label}</p>
                        {item.note && <p className="text-sm text-gray-500">{item.note}</p>}
                      </div>
                      {shown ? (
                        <p className="text-2xl font-extrabold text-[#2a66b0] whitespace-nowrap">
                          {money(item.amount)} <span className="text-sm font-semibold text-gray-500">{item.unit}</span>
                        </p>
                      ) : (
                        <Link to="/free-consultation" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2a66b0] whitespace-nowrap hover:gap-2.5 transition-all">
                          Call for a free quote <ArrowRight className="h-4 w-4" />
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
              {(showTable && (pricing.minimumHours || pricing.note)) && (
                <div className="px-6 md:px-9 py-5 bg-muted/40 border-t border-border text-sm text-gray-600 space-y-1">
                  {pricing.minimumHours && <p className="flex items-center gap-2"><Clock className="h-4 w-4 text-[#2a66b0]" /> Minimum: {pricing.minimumHours}</p>}
                  {pricing.note && <p className="flex items-start gap-2"><Info className="h-4 w-4 text-[#2a66b0] shrink-0 mt-0.5" /> {pricing.note}</p>}
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FACTORS */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection className="text-center mb-14">
            <Eyebrow color="#0891b2">What Affects the Cost</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Six things that <span className="text-[#0891b2]">shape your price</span></h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {COST_FACTORS.map(({ icon: I, title, text }, i) => (
              <AnimatedSection key={title} delay={Math.min(i, 4) * 0.05} className="h-full">
                <div className="h-full flex gap-4 bg-card border border-border rounded-3xl p-6 shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-[#2a66b0]/10 flex items-center justify-center shrink-0">
                    <I className="w-6 h-6 text-[#2a66b0]" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-1">{title}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* EXAMPLE PLANS */}
      <section className="py-20 md:py-24 bg-[#f7f8f9] border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection className="text-center mb-14">
            <Eyebrow>Typical Care Plans</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Examples of <span className="text-[#2a66b0]">how families use care</span></h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {EXAMPLE_PLANS.map((p, i) => (
              <AnimatedSection key={p.title} delay={i * 0.06} className="h-full">
                <div className="group relative h-full flex flex-col bg-card border border-border rounded-3xl p-6 shadow-sm hover:shadow-lg hover:border-[#2a66b0]/25 transition-all">
                  <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" style={{ background: BRAND_GRADIENT }} />
                  <span className="text-xs font-bold text-[#2a66b0] mb-2">PLAN {i + 1}</span>
                  <p className="font-bold text-gray-900 mb-2 leading-snug">{p.title}</p>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1">{p.text}</p>
                  <p className="text-xs text-[#0891b2] font-semibold mt-4 flex items-start gap-1.5"><Users className="h-3.5 w-3.5 mt-0.5 shrink-0" /> {p.for}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE STEPS + TIPS */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 items-start">
            <AnimatedSection from="left">
              <Pill icon={Receipt}>Your Quote</Pill>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-8">How you get <span className="text-[#2a66b0]">a clear price</span></h2>
              <ol className="space-y-4">
                {QUOTE_STEPS.map(({ icon: I, title, text }, i) => (
                  <li key={title} className="flex gap-4 bg-card border border-border rounded-2xl p-5 shadow-sm">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-md" style={{ background: BRAND_GRADIENT }}>
                      <I className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#2a66b0]">STEP {i + 1}</p>
                      <p className="font-bold text-gray-900">{title}</p>
                      <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </AnimatedSection>
            <AnimatedSection from="right" delay={0.1}>
              <div className="relative rounded-3xl p-8 overflow-hidden text-white" style={{ background: BRAND_GRADIENT }}>
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full -translate-y-1/2 translate-x-1/3" style={{ background: "rgba(255,255,255,0.10)" }} />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: WHITE_TINT }}>
                    <PiggyBank className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Tips for planning your budget</h3>
                  <div className="w-10 h-[3px] rounded-full mb-5" style={{ background: "rgba(255,255,255,0.5)" }} />
                  <ul className="space-y-3.5">
                    {[
                      "Start with the hours that matter most, such as mornings or bedtime",
                      "Combine professional care with help from family",
                      "Use respite care so family caregivers can keep going",
                      "Review the plan every few months as needs change",
                      "Ask what's included so you can compare fairly",
                    ].map(t => <li key={t} className="flex items-start gap-3 text-sm text-white/90"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /> {t}</li>)}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <FaqSection title="Questions about cost" faqs={COST_FAQS} />
      <CtaBlock tel={tel} phone={phone} title="Find out what care will cost" text="A free consultation and assessment give you a clear, written price, with no obligation." />
    </>
  );
};

/* ════════════════════════════════════════════
   /paying-for-care/private-pay
   ════════════════════════════════════════════ */

const PRIVATE_BENEFITS = [
  { icon: Sparkles, title: "Start quickly", text: "No approvals or waiting periods; care can begin as soon as the plan is agreed." },
  { icon: RefreshCw, title: "Full flexibility", text: "Choose the hours, days and services you want, and change them any time." },
  { icon: HeartHandshake, title: "Care that fits", text: "The plan is built around your loved one, not around what a program will cover." },
];

const PRIVATE_FAQS = [
  { q: "Which payment methods do you accept?", a: "Check, credit or debit card, bank transfer (ACH), Zelle and cash." },
  { q: "Do we need a doctor's referral to start?", a: "Not for non-medical care such as companionship and personal care. Skilled nursing tasks follow a physician's orders, and we can help coordinate with your doctor." },
  { q: "Will we have a written agreement?", a: "Yes. Before care starts you'll receive a written service agreement with the care plan, schedule and rate." },
  { q: "Can we change or stop care later?", a: "Yes. You can adjust hours or services as needs change. Talk to your care coordinator about any changes." },
];

const PrivatePay = ({ tel, phone }: { tel: string; phone: string }) => (
  <>
    <Hero trail={[{ label: "Home", to: "/" }, { label: "Costs & Payment", to: "/paying-for-care" }, { label: "Private Pay" }]} pill="Private Pay" pillIcon={Wallet}
      title="Paying Privately" highlight="for Home Care"
      intro="Many families pay for home care directly. Private pay is simple and flexible: you choose the care, the hours and the schedule, and you can change them as needs change.">
      <HeroButtons tel={tel} phone={phone} />
    </Hero>

    <section className="py-16 md:py-20 bg-[#f7f8f9] border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-5">
          {PRIVATE_BENEFITS.map(({ icon: I, title, text }, i) => (
            <AnimatedSection key={title} delay={i * 0.06} className="h-full">
              <div className="h-full bg-card border border-border rounded-3xl p-7 shadow-sm">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-md" style={{ background: BRAND_GRADIENT }}>
                  <I className="w-6 h-6 text-white" />
                </div>
                <p className="font-bold text-gray-900 text-lg mb-1">{title}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <AnimatedSection from="left">
            <Pill icon={CreditCard}>Payment Methods</Pill>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">Ways you <span className="text-[#2a66b0]">can pay</span></h2>
            <p className="text-gray-500 leading-relaxed mb-8">Pay the way that's easiest for your family.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {PAYMENT_METHODS.map(({ icon: I, label }) => (
                <div key={label} className="flex items-center gap-3 bg-card border border-border rounded-2xl px-5 py-4 shadow-sm">
                  <span className="w-10 h-10 rounded-xl bg-[#0891b2]/10 flex items-center justify-center shrink-0"><I className="w-5 h-5 text-[#0891b2]" /></span>
                  <span className="font-semibold text-gray-800">{label}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
          <AnimatedSection from="right" delay={0.1}>
            <div className="bg-card border border-border rounded-3xl p-7 md:p-9 shadow-sm">
              <p className="text-xs font-semibold text-[#0891b2] uppercase tracking-widest mb-2">How It Works</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Simple from the start</h2>
              <ol className="space-y-6">
                {[
                  { icon: Phone, title: "Free consultation", text: "Talk to a care coordinator about what your loved one needs." },
                  { icon: ClipboardList, title: "Free assessment & quote", text: "We visit, then give you the care plan and rate in writing." },
                  { icon: FileText, title: "Service agreement", text: "You review and sign the written agreement before care starts." },
                  { icon: Receipt, title: "Care & invoices", text: "Care begins on the agreed day, and you receive clear invoices for the care provided." },
                ].map(({ icon: I, title, text }, i) => (
                  <li key={title} className="flex gap-4">
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-md" style={{ background: BRAND_GRADIENT }}>
                      <I className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#2a66b0]">STEP {i + 1}</p>
                      <p className="font-bold text-gray-900">{title}</p>
                      <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection className="mt-10">
          <Link to="/paying-for-care/cost" className="group flex flex-col sm:flex-row sm:items-center gap-4 rounded-3xl border border-blue-100 bg-blue-50 p-6 hover:shadow-md transition-all">
            <span className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md" style={{ background: BRAND_GRADIENT }}><Calculator className="w-6 h-6 text-white" /></span>
            <span className="flex-1">
              <span className="block font-bold text-gray-900">What will care cost?</span>
              <span className="block text-sm text-gray-600">See what affects the price and typical care plans.</span>
            </span>
            <ArrowRight className="h-5 w-5 text-[#2a66b0] group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>
      </div>
    </section>

    <FaqSection title="Questions about private pay" faqs={PRIVATE_FAQS} />
    <CtaBlock tel={tel} phone={phone} title="Ready to talk about care?" text="Get a free consultation and a clear, written quote before anything starts." />
  </>
);

/* ════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════ */

const FAQS_BY_PATH: Record<string, { q: string; a: string }[]> = {
  "/paying-for-care": HUB_FAQS,
  "/paying-for-care/cost": COST_FAQS,
  "/paying-for-care/private-pay": PRIVATE_FAQS,
};
const PAYMENT_SCHEMA_ID = "payment-faq-schema";

const Payment = () => {
  const { pathname } = useLocation();
  const { contactInfo } = useAdmin();
  const tel = contactInfo.phone.replace(/[^\d+]/g, "");
  const phone = contactInfo.phone;

  // FAQPage structured data for the current page (replaces the prerendered copy).
  useEffect(() => {
    document.getElementById(PAYMENT_SCHEMA_ID)?.remove();
    const faqs = FAQS_BY_PATH[pathname];
    if (!faqs) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = PAYMENT_SCHEMA_ID;
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `https://mintexcare.com${pathname}#faq`,
      "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })),
    });
    document.head.appendChild(script);
    return () => { document.getElementById(PAYMENT_SCHEMA_ID)?.remove(); };
  }, [pathname]);

  return (
    <>
      <Header />
      <main className="bg-background overflow-x-clip">
        {pathname === "/paying-for-care/cost" ? <Cost tel={tel} phone={phone} />
          : pathname === "/paying-for-care/private-pay" ? <PrivatePay tel={tel} phone={phone} />
          : <Hub tel={tel} phone={phone} />}
      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
      <AccessibilityButton />
    </>
  );
};

export default Payment;
