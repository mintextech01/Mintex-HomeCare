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
  ArrowRight, Phone, MessageCircle, Check, ShieldCheck, Clock, Award, Send, Loader2, Lock,
  PhoneCall, ClipboardList, UserCheck, HeartPulse, CalendarCheck, Home, MapPin, Stethoscope,
} from "lucide-react";

// /free-consultation (the primary lead form) and /thank-you (shown after any lead form) share this chunk.

const CARE_OPTIONS = [...SERVICE_INDEX.map(s => s.name), "Not sure yet"];
const BEST_TIMES = ["Morning (8am – 12pm)", "Afternoon (12pm – 5pm)", "Evening (5pm – 8pm)", "Any time"];

const NEXT_STEPS = [
  { icon: PhoneCall,     title: "We call you",          text: "A care coordinator calls at the time you chose to listen and answer your questions." },
  { icon: ClipboardList, title: "Free home assessment", text: "We visit to understand your loved one's needs, routines and home, at no cost." },
  { icon: UserCheck,     title: "Your care plan",       text: "We build a personalized plan and match a caregiver or nurse, with no obligation." },
];

const FieldLabel = ({ htmlFor, children, required = false, hint }: { htmlFor: string; children: ReactNode; required?: boolean; hint?: string }) => (
  <label htmlFor={htmlFor} className="flex items-baseline justify-between gap-2 text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-1.5">
    <span>{children}{required && <span className="text-primary"> *</span>}</span>
    {hint && <span className="normal-case tracking-normal font-normal text-muted-foreground">{hint}</span>}
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

  const inputCls = "font-sans h-12 rounded-xl border-border bg-background";

  return (
    <>
      <section className="pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="container mx-auto px-6 md:px-10">
          {/* Three blocks: intro, form, next steps. On phones the form comes straight after the intro;
              on desktop the form sits in the right column next to both. */}
          <div className="grid lg:grid-cols-[1fr_1.05fr] gap-x-12 xl:gap-x-16 gap-y-10 items-start">

            {/* Intro */}
            <AnimatedSection className="lg:pt-6 lg:col-start-1 lg:row-start-1">
              <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-8 flex items-center gap-2">
                <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
                <span className="text-foreground/30">/</span>
                <span className="text-foreground font-semibold" aria-current="page">Free Consultation</span>
              </nav>
              <div className="el-eyebrow mb-6">
                <CalendarCheck className="w-3.5 h-3.5 text-primary" />
                Free · No Obligation
              </div>
              <h1 className="font-bold text-foreground leading-[1.07] mb-6" style={{ fontSize: "clamp(2.3rem, 5vw, 3.5rem)" }}>
                Request a Free<br /><span className="text-primary">Care Consultation</span>
              </h1>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-[520px]">
                Tell us a little about who needs care. A MintexCare care coordinator will call you to talk through
                options, answer questions and arrange a free in-home assessment.
              </p>
            </AnimatedSection>

            {/* Next steps + trust */}
            <AnimatedSection delay={0.05} className="row-start-3 lg:col-start-1 lg:row-start-2">
              <ol className="space-y-3 mb-9 max-w-[520px]">
                {NEXT_STEPS.map(({ icon: I, title, text }, i) => (
                  <li key={title} className="flex gap-4 el-card p-4">
                    <div className="relative w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-accent">
                      <I className="w-5 h-5 text-accent-foreground" />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-foreground text-[10px] font-bold text-background flex items-center justify-center">{i + 1}</span>
                    </div>
                    <div>
                      <p className="font-bold text-foreground">{title}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
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
                  <div key={label} className="flex items-center gap-2 text-sm font-semibold text-foreground/80"><I className="w-4 h-4 text-primary" /><span>{label}</span></div>
                ))}
              </div>
            </AnimatedSection>

            {/* The form */}
            <AnimatedSection delay={0.1} className="row-start-2 lg:col-start-2 lg:row-start-1 lg:row-span-2">
              <div className="el-card rounded-[28px] p-2">
                <div className="rounded-[22px] bg-foreground text-background px-6 sm:px-8 py-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-background/60 mb-1">Takes about 1 minute</p>
                  <h2 className="text-xl sm:text-2xl font-bold">Tell us how we can help</h2>
                </div>

                <form onSubmit={handleSubmit} noValidate className="relative p-5 sm:p-7 space-y-5">
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
                        <SelectTrigger id="fc-care" className={inputCls}><SelectValue placeholder="Select care type" /></SelectTrigger>
                        <SelectContent>{CARE_OPTIONS.map(o => <SelectItem key={o} value={o} className="font-sans">{o}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div>
                      <FieldLabel htmlFor="fc-time">Best time to call</FieldLabel>
                      <Select value={form.bestTime} onValueChange={v => setForm(f => ({ ...f, bestTime: v }))}>
                        <SelectTrigger id="fc-time" className={inputCls}><SelectValue placeholder="Any time" /></SelectTrigger>
                        <SelectContent>{BEST_TIMES.map(o => <SelectItem key={o} value={o} className="font-sans">{o}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <FieldLabel htmlFor="fc-notes" hint="Optional">Anything we should know?</FieldLabel>
                    <Textarea id="fc-notes" rows={3} maxLength={3000} value={form.notes} onChange={set("notes")}
                      placeholder="e.g. Mom is coming home from the hospital on Friday and needs help with bathing."
                      className="font-sans rounded-xl border-border bg-background resize-none" />
                  </div>

                  <button type="submit" disabled={submitting}
                    className="el-btn-primary w-full h-14 text-base disabled:opacity-70 disabled:cursor-not-allowed">
                    {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <><Send className="h-4 w-4" /> Request My Free Consultation</>}
                  </button>
                  <p className="flex items-start justify-center gap-2 text-xs text-center text-muted-foreground">
                    <Lock className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                    <span>Your information is kept confidential and only used to contact you about care. See our{" "}
                      <Link to="/privacy-policy" className="underline hover:text-foreground">Privacy Policy</Link>.</span>
                  </p>
                </form>

                <div className="rounded-[22px] bg-background px-5 sm:px-7 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
                  <span className="text-muted-foreground">Prefer to talk now?</span>
                  <div className="flex flex-wrap justify-center gap-2">
                    <a href={`tel:+1${tel}`} className="inline-flex items-center gap-1.5 font-semibold rounded-full px-4 py-2 bg-accent text-accent-foreground whitespace-nowrap">
                      <Phone className="h-4 w-4" /> {phone}
                    </a>
                    <a href={`https://wa.me/1${tel}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold rounded-full px-4 py-2 border border-border text-foreground">
                      <MessageCircle className="h-4 w-4" /> WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* What we can help with */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="container mx-auto px-6 md:px-10">
          <AnimatedSection className="text-center mb-10">
            <div className="el-eyebrow bg-background mb-4">We can help with</div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Care for every stage</h2>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-5xl mx-auto">
            {SERVICE_INDEX.map((s, i) => (
              <AnimatedSection key={s.slug} delay={Math.min(i, 5) * 0.04} className="h-full">
                <Link to={`/services/${s.slug}`} className="group h-full flex flex-col items-center text-center gap-3 bg-background rounded-2xl px-3 py-5 transition-shadow hover:shadow-md">
                  <span className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center transition-colors group-hover:bg-foreground">
                    <s.icon className="w-5 h-5 text-accent-foreground transition-colors group-hover:text-background" />
                  </span>
                  <span className="text-sm font-semibold text-foreground leading-snug">{s.name}</span>
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
    <section className="pt-32 md:pt-40 pb-24 min-h-[80svh]">
      <div className="container mx-auto px-6 md:px-10">
        <AnimatedSection className="max-w-2xl mx-auto">
          <div className="el-card rounded-[32px] text-center px-6 sm:px-12 py-12 sm:py-14">
            <div className="relative w-24 h-24 mx-auto mb-7">
              <div className="absolute inset-0 rounded-full animate-ping opacity-30 bg-accent" />
              <div className="relative w-24 h-24 rounded-full flex items-center justify-center bg-foreground">
                <Check className="w-11 h-11 text-background" strokeWidth={3} />
              </div>
            </div>
            <div className="el-eyebrow bg-background mb-4">
              Thank you{state?.name ? `, ${state.name}` : ""}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{copy.title}</h1>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto">{copy.text}</p>

            <div className="rounded-2xl bg-background p-5 mb-8 text-left flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 bg-accent">
                <Phone className="w-5 h-5 text-accent-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-foreground">{urgent}, call us now</p>
                <p className="text-sm text-muted-foreground">We're available 24 hours a day, 7 days a week.</p>
              </div>
              <a href={`tel:+1${tel}`} className="el-btn-primary whitespace-nowrap">
                <Phone className="h-4 w-4" /> {phone}
              </a>
            </div>

            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">While you wait</p>
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
                <Link key={label} to={to} className="group flex items-center justify-center gap-2 rounded-2xl bg-background px-4 py-3.5 text-sm font-semibold text-foreground hover:bg-foreground hover:text-background transition-colors">
                  <I className="h-4 w-4" /> {label}
                  <ArrowRight className="h-3.5 w-3.5 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                </Link>
              ))}
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
      <main className="theme-el overflow-x-clip">
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
