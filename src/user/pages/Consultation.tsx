import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState, type ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import AccessibilityButton from "@/components/AccessibilityButton";
import AnimatedSection from "@/components/AnimatedSection";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAdmin } from "@/contexts/AdminContext";
import { useSpamGuard } from "@/hooks/useSpamGuard";
import { useToast } from "@/hooks/use-toast";
import { SERVICE_INDEX, serviceBySlug } from "@/data/serviceIndex";
import { trackLead, type LeadSource } from "@/lib/leads";
import {
  ArrowRight, Phone, MessageCircle, CheckCircle2, ShieldCheck, Clock, Award, Send, Loader2, Lock,
  PhoneCall, ClipboardList, UserCheck, HeartPulse, CalendarCheck, Home, MapPin, Stethoscope, Sparkles,
} from "lucide-react";

// /free-consultation (the primary lead form) and /thank-you (shown after any lead form) share this chunk.

const GRADIENT_BTN = {
  background: "linear-gradient(135deg, hsl(214 66% 44%) 0%, hsl(192 91% 37%) 100%)",
  border: "1px solid rgba(255,255,255,0.3)",
  boxShadow: "0 2px 12px rgba(38,104,188,0.30), inset 0 1px 0 rgba(255,255,255,0.25)",
  color: "#fff",
};
const BRAND_GRADIENT = "linear-gradient(135deg, #1d4f8c 0%, #2a66b0 55%, #0891b2 100%)";

const CARE_OPTIONS = [...SERVICE_INDEX.map(s => s.name), "Not sure yet"];
const BEST_TIMES = ["Morning (8am – 12pm)", "Afternoon (12pm – 5pm)", "Evening (5pm – 8pm)", "Any time"];

const NEXT_STEPS = [
  { icon: PhoneCall,     title: "We call you",          text: "A care coordinator calls at the time you chose to listen and answer your questions." },
  { icon: ClipboardList, title: "Free home assessment", text: "We visit to understand your loved one's needs, routines and home, at no cost." },
  { icon: UserCheck,     title: "Your care plan",       text: "We build a personalized plan and match a caregiver or nurse, with no obligation." },
];

const HeroDeco = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="absolute rounded-full deco-drift" style={{ background: "radial-gradient(circle, #bfdbfe 0%, transparent 70%)", width: 620, height: 620, top: "-18%", right: "-10%", opacity: 0.7 }} />
    <div className="absolute rounded-full deco-float-down" style={{ background: "radial-gradient(circle, #a7f3d0 0%, transparent 70%)", width: 420, height: 420, bottom: "-10%", left: "-8%", opacity: 0.5 }} />
    <div className="absolute rounded-full deco-float-up" style={{ background: "radial-gradient(circle, #c7d2fe 0%, transparent 70%)", width: 300, height: 300, top: "12%", left: "28%", opacity: 0.35 }} />
    <div className="absolute top-[30%] left-[40%] w-28 h-28 rounded-full border-[3px] border-dashed border-[#0891b2]/[0.1] deco-spin-slow hidden lg:block" />
  </div>
);

const FieldLabel = ({ htmlFor, children, required = false, hint }: { htmlFor: string; children: ReactNode; required?: boolean; hint?: string }) => (
  <label htmlFor={htmlFor} className="flex items-baseline justify-between gap-2 text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
    <span>{children}{required && <span className="text-[#2a66b0]"> *</span>}</span>
    {hint && <span className="normal-case tracking-normal font-normal text-gray-400">{hint}</span>}
  </label>
);

/* ════════════════════════════════════════════
   /free-consultation
   ════════════════════════════════════════════ */

const EMPTY = { name: "", phone: "", email: "", zip: "", careType: "", bestTime: "", notes: "" };

const FreeConsultation = ({ tel, phone }: { tel: string; phone: string }) => {
  const { addSubmission } = useAdmin();
  const { toast } = useToast();
  const spamGuard = useSpamGuard();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  // Service pages link here with ?service={slug} so the care type is already chosen.
  const preset = serviceBySlug(params.get("service") ?? "")?.name ?? "";
  const [form, setForm] = useState({ ...EMPTY, careType: preset });
  const [submitting, setSubmitting] = useState(false);

  const set = (key: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (spamGuard.isSpam()) {
      navigate("/thank-you", { state: { source: "consultation" satisfies LeadSource } });
      return;
    }
    const name = form.name.trim(), email = form.email.trim(), phoneNum = form.phone.trim(), zip = form.zip.trim();
    if (!name || !phoneNum || !email || !zip || !form.careType) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    if (!/^[\d\s\-+()]{7,}$/.test(phoneNum)) {
      toast({ title: "Please enter a valid phone number", variant: "destructive" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({ title: "Please enter a valid email address", variant: "destructive" });
      return;
    }
    if (!/^\d{5}$/.test(zip)) {
      toast({ title: "Please enter a 5-digit ZIP code", variant: "destructive" });
      return;
    }

    const message = [
      "Free consultation request",
      `ZIP code: ${zip}`,
      form.bestTime && `Best time to call: ${form.bestTime}`,
      form.notes.trim() && `\nNotes:\n${form.notes.trim().slice(0, 3000)}`,
    ].filter(Boolean).join("\n");

    setSubmitting(true);
    try {
      // Saved like the contact form (type "contact") so it appears in Admin → Submissions.
      await addSubmission({
        type: "contact",
        name: name.slice(0, 100),
        email: email.slice(0, 200),
        phone: phoneNum.slice(0, 40),
        service: form.careType.slice(0, 100),
        message: message.slice(0, 5000),
      });
      trackLead("consultation", { care_type: form.careType });
      spamGuard.reset();
      navigate("/thank-you", { state: { source: "consultation" satisfies LeadSource, name: name.split(" ")[0] } });
    } catch {
      toast({ title: "Request could not be sent", description: `Please try again or call us at ${phone}.`, variant: "destructive" });
      setSubmitting(false);
    }
  };

  const inputCls = "font-sans h-12 rounded-xl border-border focus-visible:ring-[#2a66b0]/30";

  return (
    <>
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-24 overflow-hidden">
        <HeroDeco />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          {/* Three blocks: intro, form, next steps. On phones the form comes straight after the intro;
              on desktop the form sits in the right column next to both. */}
          <div className="grid lg:grid-cols-[1fr_1.05fr] gap-x-12 xl:gap-x-16 gap-y-10 items-start">

            {/* Intro */}
            <AnimatedSection from="left" className="lg:pt-6 lg:col-start-1 lg:row-start-1">
              <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-8 flex items-center gap-2">
                <Link to="/" className="hover:text-[#2a66b0] transition-colors">Home</Link>
                <span className="text-gray-300">/</span>
                <span className="text-[#2a66b0] font-medium" aria-current="page">Free Consultation</span>
              </nav>
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-6">
                <CalendarCheck className="w-3.5 h-3.5 text-[#2a66b0]" />
                <span className="text-xs font-semibold text-[#2a66b0] uppercase tracking-widest">Free · No Obligation</span>
              </div>
              <h1 className="font-bold text-gray-900 leading-[1.07] mb-5" style={{ fontSize: "clamp(2.3rem, 5vw, 3.5rem)" }}>
                Request a Free<br /><span className="text-[#2a66b0]">Care Consultation</span>
              </h1>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-[520px]">
                Tell us a little about who needs care. A MintexCare care coordinator will call you to talk through
                options, answer questions and arrange a free in-home assessment.
              </p>
            </AnimatedSection>

            {/* Next steps + trust */}
            <AnimatedSection from="left" delay={0.05} className="row-start-3 lg:col-start-1 lg:row-start-2">
              <ol className="space-y-4 mb-9 max-w-[520px]">
                {NEXT_STEPS.map(({ icon: I, title, text }, i) => (
                  <li key={title} className="flex gap-4 bg-card border border-border rounded-2xl p-4 shadow-sm">
                    <div className="relative w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-md" style={{ background: BRAND_GRADIENT }}>
                      <I className="w-5 h-5 text-white" />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-card border border-border text-[10px] font-bold text-[#2a66b0] flex items-center justify-center">{i + 1}</span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{title}</p>
                      <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                {[
                  { icon: ShieldCheck, label: "NJ State Licensed" },
                  { icon: Award,       label: "Bonded & Insured" },
                  { icon: Clock,       label: "Available 24/7" },
                ].map(({ icon: I, label }) => (
                  <div key={label} className="flex items-center gap-2 text-sm text-gray-500"><I className="w-4 h-4 text-[#2a66b0]" /><span>{label}</span></div>
                ))}
              </div>
            </AnimatedSection>

            {/* The form */}
            <AnimatedSection from="right" delay={0.1} className="row-start-2 lg:col-start-2 lg:row-start-1 lg:row-span-2">
              <div className="relative">
                <div className="absolute -inset-3 rounded-[2.25rem] rotate-1 bg-[#2a66b0]/[0.05] border border-[#2a66b0]/10 hidden sm:block" />
                <div className="relative bg-card rounded-3xl shadow-2xl shadow-primary/10 border border-border overflow-hidden">
                  <div className="relative px-6 sm:px-8 py-6 text-white overflow-hidden" style={{ background: BRAND_GRADIENT }}>
                    <div className="absolute top-0 right-0 w-40 h-40 rounded-full -translate-y-1/2 translate-x-1/4" style={{ background: "rgba(255,255,255,0.10)" }} />
                    <p className="relative text-xs font-semibold uppercase tracking-widest text-white/75 mb-1">Takes about 1 minute</p>
                    <h2 className="relative text-xl sm:text-2xl font-bold">Tell us how we can help</h2>
                  </div>

                  <form onSubmit={handleSubmit} noValidate className="relative p-6 sm:p-8 space-y-5">
                    {spamGuard.honeypotField}
                    <div>
                      <FieldLabel htmlFor="fc-name" required>Your name</FieldLabel>
                      <Input id="fc-name" autoComplete="name" required value={form.name} onChange={set("name")} className={inputCls} />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <FieldLabel htmlFor="fc-phone" required>Phone</FieldLabel>
                        <Input id="fc-phone" type="tel" inputMode="tel" autoComplete="tel" required value={form.phone} onChange={set("phone")} className={inputCls} />
                      </div>
                      <div>
                        <FieldLabel htmlFor="fc-zip" required>ZIP code</FieldLabel>
                        <Input id="fc-zip" inputMode="numeric" autoComplete="postal-code" maxLength={5} required placeholder="e.g. 08820"
                          value={form.zip} onChange={e => setForm(f => ({ ...f, zip: e.target.value.replace(/\D/g, "").slice(0, 5) }))} className={inputCls} />
                      </div>
                    </div>
                    <div>
                      <FieldLabel htmlFor="fc-email" required hint="So we can follow up">Email</FieldLabel>
                      <Input id="fc-email" type="email" autoComplete="email" required value={form.email} onChange={set("email")} className={inputCls} />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <FieldLabel htmlFor="fc-care" required>Type of care</FieldLabel>
                        <Select value={form.careType} onValueChange={v => setForm(f => ({ ...f, careType: v }))}>
                          <SelectTrigger id="fc-care" className="font-sans h-12 rounded-xl border-border"><SelectValue placeholder="Select care type" /></SelectTrigger>
                          <SelectContent>{CARE_OPTIONS.map(o => <SelectItem key={o} value={o} className="font-sans">{o}</SelectItem>)}</SelectContent>
                        </Select>
                      </div>
                      <div>
                        <FieldLabel htmlFor="fc-time">Best time to call</FieldLabel>
                        <Select value={form.bestTime} onValueChange={v => setForm(f => ({ ...f, bestTime: v }))}>
                          <SelectTrigger id="fc-time" className="font-sans h-12 rounded-xl border-border"><SelectValue placeholder="Any time" /></SelectTrigger>
                          <SelectContent>{BEST_TIMES.map(o => <SelectItem key={o} value={o} className="font-sans">{o}</SelectItem>)}</SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <FieldLabel htmlFor="fc-notes" hint="Optional">Anything we should know?</FieldLabel>
                      <Textarea id="fc-notes" rows={3} maxLength={3000} value={form.notes} onChange={set("notes")}
                        placeholder="e.g. Mom is coming home from the hospital on Friday and needs help with bathing."
                        className="font-sans rounded-xl border-border resize-none focus-visible:ring-[#2a66b0]/30" />
                    </div>

                    <button type="submit" disabled={submitting}
                      className="w-full inline-flex items-center justify-center gap-2 font-semibold text-base px-8 py-4 rounded-full transition-all hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                      style={GRADIENT_BTN}>
                      {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <><Send className="h-4 w-4" /> Request My Free Consultation</>}
                    </button>
                    <p className="flex items-start justify-center gap-2 text-xs text-center text-gray-500">
                      <Lock className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                      <span>Your information is kept confidential and only used to contact you about care. See our{" "}
                        <Link to="/privacy-policy" className="underline hover:text-[#2a66b0]">Privacy Policy</Link>.</span>
                    </p>
                  </form>

                  <div className="border-t border-border bg-muted/40 px-6 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
                    <span className="text-gray-500">Prefer to talk now?</span>
                    <div className="flex flex-wrap justify-center gap-2">
                      <a href={`tel:+1${tel}`} className="inline-flex items-center gap-1.5 font-semibold text-[#2a66b0] rounded-full px-4 py-2 glass-btn whitespace-nowrap">
                        <Phone className="h-4 w-4" /> {phone}
                      </a>
                      <a href={`https://wa.me/1${tel}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-[#0891b2] rounded-full px-4 py-2 glass-btn">
                        <MessageCircle className="h-4 w-4" /> WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* What we can help with */}
      <section className="py-16 md:py-20 bg-[#f7f8f9] border-t border-border">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection className="text-center mb-10">
            <p className="text-xs font-extrabold text-[#2a66b0] uppercase tracking-[0.25em] mb-3">We can help with</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Care for every stage</h2>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-5xl mx-auto">
            {SERVICE_INDEX.map((s, i) => (
              <AnimatedSection key={s.slug} delay={Math.min(i, 5) * 0.04} className="h-full">
                <Link to={`/services/${s.slug}`} className="group h-full flex flex-col items-center text-center gap-2 bg-card border border-border rounded-2xl px-3 py-5 shadow-sm hover:shadow-lg hover:border-[#2a66b0]/25 hover:-translate-y-0.5 transition-all">
                  <span className="w-11 h-11 rounded-xl bg-[#2a66b0]/10 flex items-center justify-center group-hover:bg-[#2a66b0] transition-colors">
                    <s.icon className="w-5 h-5 text-[#2a66b0] group-hover:text-white transition-colors" />
                  </span>
                  <span className="text-sm font-semibold text-gray-800 leading-snug">{s.name}</span>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

/* ════════════════════════════════════════════
   /thank-you
   ════════════════════════════════════════════ */

const THANKS: Record<LeadSource, { title: string; text: string }> = {
  consultation: { title: "Your request is in", text: "A care coordinator will call you soon, at the time you chose where possible, to talk through your options and arrange a free in-home assessment." },
  contact:      { title: "Message received", text: "Thank you for reaching out. A member of our team will get back to you shortly." },
  staffing:     { title: "Staffing request received", text: "Thank you. Our staffing team will contact you shortly to confirm availability and the details of your request." },
};

const ThankYou = ({ tel, phone }: { tel: string; phone: string }) => {
  const { state } = useLocation() as { state: { source?: LeadSource; name?: string } | null };
  const source: LeadSource = state?.source && THANKS[state.source] ? state.source : "contact";
  const copy = THANKS[source];
  const urgent = source === "staffing" ? "For urgent shifts" : "If you need care urgently";

  return (
    <section className="relative pt-32 md:pt-40 pb-24 overflow-hidden min-h-[80svh]">
      <HeroDeco />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection className="max-w-2xl mx-auto">
          <div className="relative bg-card border border-border rounded-3xl shadow-2xl shadow-primary/10 overflow-hidden text-center">
            <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg, #2a66b0, #0891b2)" }} />
            <div className="px-6 sm:px-12 py-12 sm:py-14">
              <div className="relative w-24 h-24 mx-auto mb-7">
                <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: BRAND_GRADIENT }} />
                <div className="relative w-24 h-24 rounded-full flex items-center justify-center shadow-xl" style={{ background: BRAND_GRADIENT }}>
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
                <Sparkles className="absolute -top-1 -right-3 w-6 h-6 text-[#0891b2]" />
              </div>
              <p className="text-xs font-semibold text-[#0891b2] uppercase tracking-widest mb-2">
                Thank you{state?.name ? `, ${state.name}` : ""}
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{copy.title}</h1>
              <p className="text-gray-500 leading-relaxed mb-8 max-w-md mx-auto">{copy.text}</p>

              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 mb-8 text-left flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-md" style={{ background: BRAND_GRADIENT }}>
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">{urgent}, call us now</p>
                  <p className="text-sm text-gray-600">We're available 24 hours a day, 7 days a week.</p>
                </div>
                <a href={`tel:+1${tel}`} className="inline-flex items-center justify-center gap-2 font-bold text-sm px-5 py-3 rounded-full whitespace-nowrap" style={GRADIENT_BTN}>
                  <Phone className="h-4 w-4" /> {phone}
                </a>
              </div>

              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">While you wait</p>
              <div className="grid sm:grid-cols-3 gap-3">
                {(source === "staffing"
                  ? [
                      { to: "/facility-staffing/roles", icon: UserCheck, label: "Roles we staff" },
                      { to: "/facility-staffing#faq", icon: ClipboardList, label: "Partner FAQ" },
                      { to: "/", icon: Home, label: "Back to home" },
                    ]
                  : [
                      { to: "/services", icon: Stethoscope, label: "Our services" },
                      { to: "/areas-we-serve", icon: MapPin, label: "Areas we serve" },
                      { to: "/about", icon: HeartPulse, label: "About MintexCare" },
                    ]
                ).map(({ to, icon: I, label }) => (
                  <Link key={label} to={to} className="group flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-4 py-3.5 text-sm font-semibold text-gray-700 hover:border-[#2a66b0]/30 hover:text-[#2a66b0] hover:shadow-md transition-all">
                    <I className="h-4 w-4 text-[#2a66b0]" /> {label}
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════ */

const Consultation = () => {
  const { pathname } = useLocation();
  const { contactInfo } = useAdmin();
  const tel = contactInfo.phone.replace(/[^\d+]/g, "");
  const phone = contactInfo.phone;

  // The thank-you page should open at the top, even after a smooth-scrolled form.
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  return (
    <>
      <Header />
      <main className="bg-background overflow-x-clip">
        {pathname === "/thank-you" ? <ThankYou tel={tel} phone={phone} /> : <FreeConsultation tel={tel} phone={phone} />}
      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
      <AccessibilityButton />
    </>
  );
};

export default Consultation;
