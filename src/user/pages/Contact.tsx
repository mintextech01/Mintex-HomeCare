import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import AccessibilityButton from "@/components/AccessibilityButton";
import AnimatedSection from "@/components/AnimatedSection";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Phone, Mail, MapPin, Clock, Send, ArrowRight, MessageCircle, ShieldCheck } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { useToast } from "@/hooks/use-toast";
import { useSpamGuard } from "@/hooks/useSpamGuard";
import { CONTACT_SERVICE_OPTIONS } from "@/data/serviceIndex";
import { trackLead, type LeadSource } from "@/lib/leads";
import { useNavigate } from "react-router-dom";

const serviceOptions = CONTACT_SERVICE_OPTIONS;

const faqs = [
  { q: "What areas do you serve?",               a: "We serve 12 New Jersey counties: Middlesex, Monmouth, Somerset, Union, Mercer, Essex, Bergen, Hudson, Passaic, Morris, Ocean and Burlington. See our Areas We Serve page to find your town." },
  { q: "How do I get started with home care?",   a: "Simply call us or fill out our contact form. We'll schedule a free in-home consultation within 24 hours." },
  { q: "Are your caregivers licensed and insured?", a: "Yes, all our caregivers are fully licensed, bonded, insured, and undergo thorough background checks." },
  { q: "Do you accept insurance?",               a: "We work with various insurance providers and can discuss payment options during your consultation." },
  { q: "Can I choose my caregiver?",             a: "We carefully match caregivers with clients based on needs, personality, and preferences. Your input is always valued." },
  { q: "What if I need to change my care plan?", a: "Care plans are flexible and can be adjusted anytime as your loved one's needs evolve." },
];

const trustBadges = [
  { icon: ShieldCheck, label: "Licensed & Insured" },
  { icon: MapPin,      label: "Edison, NJ Office" },
  { icon: Clock,       label: "24/7 Available" },
  { icon: MessageCircle, label: "Reply in 24 h" },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(({ q, a }) => ({
    "@type": "Question",
    "name": q,
    "acceptedAnswer": { "@type": "Answer", "text": a },
  })),
};

const Contact = () => {
  useEffect(() => {
    // Replace (not duplicate) the copy already present in the prerendered HTML.
    document.getElementById("faq-schema")?.remove();
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "faq-schema";
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);
    return () => { document.getElementById("faq-schema")?.remove(); };
  }, []);

  const { addSubmission, contactInfo } = useAdmin();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const spamGuard = useSpamGuard();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (spamGuard.isSpam()) {
      navigate("/thank-you", { state: { source: "contact" satisfies LeadSource } });
      return;
    }
    if (!form.name || !form.email || !form.phone) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast({ title: "Please enter a valid email address", variant: "destructive" });
      return;
    }
    if (!/^[\d\s\-\+\(\)]{7,}$/.test(form.phone)) {
      toast({ title: "Please enter a valid phone number", variant: "destructive" });
      return;
    }
    try {
      await addSubmission({ ...form, type: "contact" });
      trackLead("contact", { care_type: form.service });
      spamGuard.reset();
      navigate("/thank-you", { state: { source: "contact" satisfies LeadSource, name: form.name.trim().split(" ")[0] } });
    } catch {
      toast({ title: "Submission failed", description: "Please try again.", variant: "destructive" });
    }
  };

  const phoneLink = contactInfo.phone.replace(/[^\d+]/g, "");
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(contactInfo.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
  const inputCls = "font-sans h-12 rounded-xl border-border bg-background";

  return (
    <>
      <Header />

      <main className="theme-el overflow-x-hidden">

        {/* ════════════════════════════════════════
            HERO
            ════════════════════════════════════════ */}
        <section className="pt-36 lg:pt-44 pb-16 md:pb-20">
          <div className="container mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* LEFT — heading + badges */}
              <AnimatedSection>
                <div className="el-eyebrow mb-6">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  We're here for you
                </div>

                <h1 className="text-5xl md:text-6xl xl:text-[4rem] font-serif font-bold text-foreground leading-[1.08] mb-6">
                  Contact Our<br />
                  <span className="text-primary">Edison Team</span>
                </h1>

                <p className="text-muted-foreground text-lg font-sans leading-relaxed mb-8 max-w-[460px]">
                  Compassionate care starts with a conversation. Reach out and our dedicated team will respond within 24 hours.
                </p>

                <div className="flex flex-wrap gap-2.5">
                  {trustBadges.map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2 bg-surface rounded-full px-4 py-2">
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="text-sm font-sans font-semibold text-foreground">{label}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* RIGHT — contact info card */}
              <AnimatedSection delay={0.1}>
                <div className="rounded-[28px] p-8 bg-foreground text-background">
                  <h3 className="font-serif font-bold text-xl mb-6">Quick Contact</h3>

                  <ul className="space-y-5">
                    <li>
                      <a href={`tel:+1${phoneLink}`} className="flex items-center gap-4 group">
                        <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center shrink-0">
                          <Phone className="h-5 w-5 text-accent-foreground" />
                        </div>
                        <div>
                          <p className="text-background/55 text-xs font-sans uppercase tracking-wider">Phone</p>
                          <p className="font-semibold font-sans group-hover:underline underline-offset-4">{contactInfo.phone}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-background/30 group-hover:text-background ml-auto transition-colors" />
                      </a>
                    </li>

                    <li className="border-t border-background/10 pt-5">
                      <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-4 group">
                        <div className="h-12 w-12 rounded-full bg-background/10 flex items-center justify-center shrink-0">
                          <Mail className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-background/55 text-xs font-sans uppercase tracking-wider">Email</p>
                          <p className="font-semibold font-sans break-all group-hover:underline underline-offset-4">{contactInfo.email}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-background/30 group-hover:text-background ml-auto transition-colors shrink-0" />
                      </a>
                    </li>

                    <li className="border-t border-background/10 pt-5">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-full bg-background/10 flex items-center justify-center shrink-0">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-background/55 text-xs font-sans uppercase tracking-wider">Address</p>
                          <p className="font-semibold font-sans text-sm leading-relaxed">{contactInfo.address}</p>
                        </div>
                      </div>
                    </li>

                    <li className="border-t border-background/10 pt-5">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-background/10 flex items-center justify-center shrink-0">
                          <Clock className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-background/55 text-xs font-sans uppercase tracking-wider">Hours</p>
                          <p className="font-semibold font-sans">{contactInfo.hours}</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            FORM + MAP
            ════════════════════════════════════════ */}
        <section className="py-16 md:py-20 bg-surface">
          <div className="container mx-auto px-6 md:px-10 max-w-6xl">
            <div className="grid lg:grid-cols-[3fr_2fr] gap-5 items-stretch">

              {/* ── Contact Form ── */}
              <AnimatedSection>
                <div className="rounded-[28px] bg-background p-7 md:p-10 h-full">
                  <div className="mb-8">
                    <div className="el-eyebrow mb-4">Send a Message</div>
                    <h2 className="text-3xl font-serif font-bold text-foreground">
                      How can we help you?
                    </h2>
                    <p className="text-muted-foreground font-sans text-sm mt-2">
                      Fill out the form and a care specialist will contact you shortly.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="relative space-y-4">
                    {spamGuard.honeypotField}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input
                        placeholder="Full Name *"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        required
                        className={inputCls}
                      />
                      <Input
                        type="email"
                        placeholder="Email Address *"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        required
                        className={inputCls}
                      />
                    </div>

                    <Input
                      type="tel"
                      placeholder="Phone Number *"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      required
                      className={inputCls}
                    />

                    <Select value={form.service} onValueChange={v => setForm({ ...form, service: v })}>
                      <SelectTrigger className={inputCls}>
                        <SelectValue placeholder="Select Service Needed" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceOptions.map(s => (
                          <SelectItem key={s} value={s} className="font-sans">{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Textarea
                      placeholder="Tell us about your needs..."
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      rows={5}
                      className="font-sans rounded-xl border-border bg-background resize-none"
                    />

                    <button type="submit" className="el-btn-primary w-full h-14 text-base">
                      <Send className="h-4 w-4" />
                      Send Message
                    </button>

                    <p className="text-xs text-center text-muted-foreground font-sans">
                      We'll respond within 24 hours · All information is kept confidential
                    </p>
                  </form>
                </div>
              </AnimatedSection>

              {/* ── Right column: stats + map ── */}
              <AnimatedSection delay={0.1} className="flex flex-col gap-4">

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { val: "24h", label: "Response Time" },
                    { val: "24/7", label: "Care Available" },
                    { val: "500+", label: "Families Served" },
                    { val: "100%", label: "Licensed Staff" },
                  ].map(stat => (
                    <div key={stat.label} className="rounded-2xl bg-background p-5">
                      <p className="text-3xl font-serif font-bold text-foreground mb-1 leading-none">{stat.val}</p>
                      <p className="text-xs text-muted-foreground font-sans leading-tight">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Map */}
                <div className="flex-1 rounded-[24px] overflow-hidden bg-background p-2" style={{ minHeight: 260 }}>
                  <iframe
                    title="MintexCare Location"
                    src={mapSrc}
                    width="100%"
                    height="100%"
                    className="rounded-[18px]"
                    style={{ border: 0, minHeight: 244, display: "block" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                {/* Fax info */}
                <div className="rounded-2xl bg-background px-5 py-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-sans uppercase tracking-wider">Fax</p>
                    <p className="font-sans font-semibold text-foreground text-sm">{contactInfo.fax}</p>
                  </div>
                </div>
              </AnimatedSection>

            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            FAQ
            ════════════════════════════════════════ */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-10 max-w-4xl">
            <AnimatedSection className="text-center mb-14">
              <div className="el-eyebrow mb-5">Got Questions?</div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight">
                Frequently Asked<br />Questions
              </h2>
              <p className="text-muted-foreground font-sans text-base mt-4 max-w-lg mx-auto leading-relaxed">
                Can't find what you're looking for? Feel free to reach out — we're happy to help.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <Accordion type="single" collapsible key={i}>
                    <AccordionItem
                      value={`faq-${i}`}
                      className="el-card rounded-2xl px-6 md:px-7 border-b-0"
                    >
                      <AccordionTrigger className="font-sans font-semibold text-foreground text-base py-5 hover:no-underline text-left gap-4">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground font-sans text-[15px] pb-6 leading-relaxed">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ════════════════════════════════════════
            BOTTOM CTA STRIP
            ════════════════════════════════════════ */}
        <section className="pb-20">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <AnimatedSection>
              <div className="rounded-[32px] bg-accent px-8 py-12">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                  <div>
                    <div className="el-eyebrow bg-background border-transparent mb-4">Still have questions?</div>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-accent-foreground mb-2">
                      Our care specialists are ready.
                    </h3>
                    <p className="text-accent-foreground/75 font-sans text-sm max-w-sm">
                      Call, email, or stop by — we're always happy to talk through your care options.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
                    <a href={`tel:+1${phoneLink}`} className="el-btn-primary">
                      <Phone className="h-4 w-4" /> Call Now
                    </a>
                    <a href={`mailto:${contactInfo.email}`} className="el-btn bg-background text-foreground hover:bg-background/80">
                      <Mail className="h-4 w-4" /> Email Us
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

      </main>

      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
      <AccessibilityButton />
    </>
  );
};

export default Contact;
