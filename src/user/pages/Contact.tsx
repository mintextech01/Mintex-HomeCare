import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import AccessibilityButton from "@/components/AccessibilityButton";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Phone, Mail, MapPin, Clock, Send, ArrowRight, MessageCircle, ShieldCheck, Star } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

const serviceOptions = [
  "Personal Care", "Companion Care", "Skilled Nursing",
  "Post-Surgery Care", "Respite Care", "Live-in Care", "Other",
];

const faqs = [
  { q: "What areas do you serve?",               a: "We serve communities throughout New Jersey including Middlesex, Monmouth, Somerset, Union, Mercer, and surrounding counties." },
  { q: "How do I get started with home care?",   a: "Simply call us or fill out our contact form. We'll schedule a free in-home consultation within 24 hours." },
  { q: "Are your caregivers licensed and insured?", a: "Yes, all our caregivers are fully licensed, bonded, insured, and undergo thorough background checks." },
  { q: "Do you accept insurance?",               a: "We work with various insurance providers and can discuss payment options during your consultation." },
  { q: "Can I choose my caregiver?",             a: "We carefully match caregivers with clients based on needs, personality, and preferences. Your input is always valued." },
  { q: "What if I need to change my care plan?", a: "Care plans are flexible and can be adjusted anytime as your loved one's needs evolve." },
];

const trustBadges = [
  { icon: ShieldCheck, label: "Licensed & Insured" },
  { icon: Star,        label: "4.9★ Rated" },
  { icon: Clock,       label: "24/7 Available" },
  { icon: MessageCircle, label: "Reply in 24 h" },
];

const Contact = () => {
  const { addSubmission, contactInfo } = useAdmin();
  const { toast } = useToast();
  const { isDark } = useTheme();
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      await addSubmission(form);
      toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
    } catch {
      toast({ title: "Submission failed", description: "Please try again.", variant: "destructive" });
    }
  };

  const phoneLink = contactInfo.phone.replace(/[^\d+]/g, "");
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(contactInfo.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <div
      className="relative"
      style={{
        background: isDark
          ? "linear-gradient(170deg, hsl(214 40% 10%) 0%, hsl(214 40% 9%) 20%, hsl(214 40% 10%) 45%, hsl(214 40% 9%) 70%, hsl(214 40% 10%) 100%)"
          : "linear-gradient(170deg, hsl(200 55% 98.5%) 0%, hsl(180 50% 97%) 20%, hsl(210 50% 97.5%) 45%, hsl(180 45% 97.5%) 70%, hsl(215 45% 98%) 100%)",
      }}
    >
      {/* ── Global floating bubbles ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="gb-1 absolute rounded-full" style={{ width: 580, height: 580, top: "0%",  left: "-10%", background: "radial-gradient(circle, hsl(214 66% 44% / 0.07), transparent 68%)" }} />
        <div className="gb-2 absolute rounded-full" style={{ width: 420, height: 420, top: "5%",  right: "-6%",  background: "radial-gradient(circle, hsl(180 91% 47% / 0.08), transparent 68%)" }} />
        <div className="gb-4 absolute rounded-full" style={{ width: 460, height: 460, top: "35%", left: "-5%",   background: "radial-gradient(circle, hsl(180 91% 47% / 0.06), transparent 68%)" }} />
        <div className="gb-5 absolute rounded-full" style={{ width: 380, height: 380, top: "38%", right: "-4%",  background: "radial-gradient(circle, hsl(214 66% 44% / 0.06), transparent 68%)" }} />
        <div className="gb-3 absolute rounded-full" style={{ width: 320, height: 320, top: "65%", left: "35%",   background: "radial-gradient(circle, hsl(214 66% 44% / 0.05), transparent 68%)" }} />
        <div className="gb-7 absolute rounded-full" style={{ width: 500, height: 500, top: "72%", left: "-8%",   background: "radial-gradient(circle, hsl(214 66% 44% / 0.055), transparent 68%)" }} />
        <div className="gb-6 absolute rounded-full" style={{ width: 360, height: 360, top: "80%", right: "10%",  background: "radial-gradient(circle, hsl(180 91% 47% / 0.06), transparent 68%)" }} />
      </div>

      <div className="relative" style={{ zIndex: 1 }}>
        <Header />

        <main className="overflow-x-hidden">

          {/* ════════════════════════════════════════
              HERO
              ════════════════════════════════════════ */}
          <section className="relative pt-36 pb-24 overflow-hidden">

            {/* Large decorative ring behind heading */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10"
              style={{ width: 700, height: 700 }}
            />
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/8"
              style={{ width: 500, height: 500 }}
            />

            <div className="container mx-auto px-4 relative z-10">
              <div className="grid lg:grid-cols-2 gap-14 items-center">

                {/* LEFT — heading + badges */}
                <AnimatedSection from="left">
                  <span className="inline-flex items-center gap-2 bg-primary/8 border border-primary/15 text-primary text-xs font-sans font-semibold uppercase tracking-[0.18em] rounded-full px-4 py-1.5 mb-6">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    We're here for you
                  </span>

                  <h1 className="text-5xl md:text-6xl xl:text-[4rem] font-serif font-bold text-foreground leading-[1.08] mb-5">
                    Let's Start a<br />
                    <span className="relative inline-block text-primary">
                      Conversation
                      <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 320 10" fill="none">
                        <path d="M0 7 Q80 1 160 5 Q240 9 320 3" stroke="hsl(180 91% 47%)" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    </span>
                  </h1>

                  <p className="text-muted-foreground text-lg font-sans leading-relaxed mb-8 max-w-[440px]">
                    Compassionate care starts with a conversation. Reach out and our dedicated team will respond within 24 hours.
                  </p>

                  {/* Trust badges */}
                  <div className="flex flex-wrap gap-3">
                    {trustBadges.map(({ icon: Icon, label }) => (
                      <div
                        key={label}
                        className={`flex items-center gap-2 border border-border rounded-full px-4 py-2 shadow-sm ${isDark ? "bg-white/5" : "bg-white/70"}`}
                      >
                        <Icon className="h-4 w-4 text-accent" />
                        <span className="text-sm font-sans font-medium text-foreground">{label}</span>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>

                {/* RIGHT — floating contact info card */}
                <AnimatedSection delay={0.2} from="right">
                  <div className="relative">

                    {/* Decorative stacked shadows */}
                    <div className="absolute inset-0 rounded-3xl bg-accent/10 translate-x-4 translate-y-4" />
                    <div className="absolute inset-0 rounded-3xl bg-primary/8 translate-x-2 translate-y-2" />

                    {/* Main card */}
                    <div
                      className="relative rounded-3xl p-8 text-white overflow-hidden"
                      style={{
                        background: "linear-gradient(135deg, hsl(214 66% 30%) 0%, hsl(214 66% 20%) 50%, hsl(200 70% 18%) 100%)",
                      }}
                    >
                      {/* Inner dot grid */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-[0.07]"
                        style={{
                          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                          backgroundSize: "24px 24px",
                        }}
                      />
                      {/* Glow blob */}
                      <div
                        className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none"
                        style={{ background: "radial-gradient(circle, hsl(180 91% 47% / 0.15), transparent 70%)" }}
                      />

                      <h3 className="font-serif font-bold text-xl mb-6 relative z-10">Quick Contact</h3>

                      <ul className="space-y-5 relative z-10">
                        <li>
                          <a
                            href={`tel:+1${phoneLink}`}
                            className="flex items-center gap-4 group"
                          >
                            <div className="h-11 w-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                              <Phone className="h-5 w-5 text-accent" />
                            </div>
                            <div>
                              <p className="text-white/50 text-xs font-sans uppercase tracking-wider">Phone</p>
                              <p className="text-white font-medium font-sans group-hover:text-accent transition-colors">{contactInfo.phone}</p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-white/20 group-hover:text-accent ml-auto transition-colors" />
                          </a>
                        </li>

                        <li className="border-t border-white/10 pt-5">
                          <a
                            href={`mailto:${contactInfo.email}`}
                            className="flex items-center gap-4 group"
                          >
                            <div className="h-11 w-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary/30 transition-colors">
                              <Mail className="h-5 w-5 text-blue-300" />
                            </div>
                            <div>
                              <p className="text-white/50 text-xs font-sans uppercase tracking-wider">Email</p>
                              <p className="text-white font-medium font-sans group-hover:text-blue-300 transition-colors">{contactInfo.email}</p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-white/20 group-hover:text-blue-300 ml-auto transition-colors" />
                          </a>
                        </li>

                        <li className="border-t border-white/10 pt-5">
                          <div className="flex items-start gap-4">
                            <div className="h-11 w-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                              <MapPin className="h-5 w-5 text-rose-300" />
                            </div>
                            <div>
                              <p className="text-white/50 text-xs font-sans uppercase tracking-wider">Address</p>
                              <p className="text-white font-medium font-sans text-sm leading-relaxed">{contactInfo.address}</p>
                            </div>
                          </div>
                        </li>

                        <li className="border-t border-white/10 pt-5">
                          <div className="flex items-center gap-4">
                            <div className="h-11 w-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                              <Clock className="h-5 w-5 text-amber-300" />
                            </div>
                            <div>
                              <p className="text-white/50 text-xs font-sans uppercase tracking-wider">Hours</p>
                              <p className="text-white font-medium font-sans">{contactInfo.hours}</p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </section>

          {/* ════════════════════════════════════════
              FORM + MAP
              ════════════════════════════════════════ */}
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="grid lg:grid-cols-[3fr_2fr] gap-8 items-start">

                {/* ── Contact Form ── */}
                <AnimatedSection from="left">
                  <div className={`rounded-3xl shadow-2xl shadow-primary/8 border border-border overflow-hidden ${isDark ? "bg-[hsl(214_40%_13%)]" : "bg-white"}`}>

                    {/* Top accent bar */}
                    <div
                      className="h-1.5 w-full"
                      style={{ background: "linear-gradient(90deg, hsl(214 66% 44%), hsl(180 91% 47%))" }}
                    />

                    <div className="p-8 md:p-10">
                      <div className="mb-8">
                        <p className="text-xs font-sans font-semibold text-accent uppercase tracking-[0.2em] mb-2">
                          Send a Message
                        </p>
                        <h2 className="text-3xl font-serif font-bold text-foreground">
                          How can we help you?
                        </h2>
                        <p className="text-muted-foreground font-sans text-sm mt-2">
                          Fill out the form and a care specialist will contact you shortly.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <Input
                            placeholder="Full Name *"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            required
                            className="font-sans h-12 rounded-xl border-border focus-visible:ring-primary/30"
                          />
                          <Input
                            type="email"
                            placeholder="Email Address *"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            required
                            className="font-sans h-12 rounded-xl border-border focus-visible:ring-primary/30"
                          />
                        </div>

                        <Input
                          type="tel"
                          placeholder="Phone Number *"
                          value={form.phone}
                          onChange={e => setForm({ ...form, phone: e.target.value })}
                          required
                          className="font-sans h-12 rounded-xl border-border focus-visible:ring-primary/30"
                        />

                        <Select value={form.service} onValueChange={v => setForm({ ...form, service: v })}>
                          <SelectTrigger className="font-sans h-12 rounded-xl border-border">
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
                          className="font-sans rounded-xl border-border resize-none focus-visible:ring-primary/30"
                        />

                        <Button
                          type="submit"
                          size="lg"
                          className="w-full rounded-full font-semibold text-base gap-2"
                          style={{ background: "linear-gradient(135deg, hsl(214 66% 44%) 0%, hsl(192 91% 37%) 100%)", border: "1px solid rgba(255,255,255,0.3)", boxShadow: "0 2px 12px rgba(38,104,188,0.30), inset 0 1px 0 rgba(255,255,255,0.25)", color: "#fff" }}
                        >
                          <Send className="h-4 w-4" />
                          Send Message
                        </Button>

                        <p className="text-xs text-center text-muted-foreground font-sans">
                          We'll respond within 24 hours · All information is kept confidential
                        </p>
                      </form>
                    </div>
                  </div>
                </AnimatedSection>

                {/* ── Right column: stats + map ── */}
                <AnimatedSection delay={0.15} className="flex flex-col gap-5">

                  {/* Response-time promise card */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { val: "24h", label: "Response Time", color: "text-primary" },
                      { val: "4.9★", label: "Average Rating", color: "text-accent" },
                      { val: "500+", label: "Families Served", color: "text-primary" },
                      { val: "100%", label: "Licensed Staff", color: "text-accent" },
                    ].map(stat => (
                      <div
                        key={stat.label}
                        className={`rounded-2xl border border-border p-4 text-center shadow-sm hover:shadow-md transition-shadow ${isDark ? "bg-[hsl(214_40%_13%)]" : "bg-white"}`}
                      >
                        <p className={`text-2xl font-serif font-bold ${stat.color} mb-0.5`}>{stat.val}</p>
                        <p className="text-xs text-muted-foreground font-sans leading-tight">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Map */}
                  <div className="flex-1 rounded-3xl overflow-hidden border border-border shadow-sm" style={{ minHeight: 260 }}>
                    <iframe
                      title="MintexCare Location"
                      src={mapSrc}
                      width="100%"
                      height="100%"
                      style={{ border: 0, minHeight: 260, display: "block" }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>

                  {/* Fax info */}
                  <div className={`rounded-2xl border border-border px-5 py-4 shadow-sm flex items-center gap-3 ${isDark ? "bg-[hsl(214_40%_13%)]" : "bg-white"}`}>
                    <div className="h-10 w-10 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-sans uppercase tracking-wider">Fax</p>
                      <p className="font-sans font-medium text-foreground text-sm">{contactInfo.fax}</p>
                    </div>
                  </div>
                </AnimatedSection>

              </div>
            </div>
          </section>

          {/* ════════════════════════════════════════
              FAQ
              ════════════════════════════════════════ */}
          <section className="py-24">
            <div className="container mx-auto px-4 max-w-4xl">
              <AnimatedSection className="text-center mb-14">
                <p className="text-xs font-sans font-semibold text-accent uppercase tracking-[0.22em] mb-3">
                  Got Questions?
                </p>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight">
                  Frequently Asked<br />Questions
                </h2>
                <p className="text-muted-foreground font-sans text-base mt-4 max-w-lg mx-auto leading-relaxed">
                  Can't find what you're looking for? Feel free to reach out — we're happy to help.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="space-y-4">
                  {faqs.map((faq, i) => (
                    <Accordion type="single" collapsible key={i}>
                      <AccordionItem
                        value={`faq-${i}`}
                        className={`border border-border rounded-2xl px-7 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 border-b-0 ${isDark ? "bg-[hsl(214_40%_13%)]" : "bg-white"}`}
                      >
                        <AccordionTrigger className="font-sans font-semibold text-foreground text-base py-6 hover:no-underline text-left gap-4">
                          <span className="flex items-center gap-4">
                            <span
                              className="h-9 w-9 rounded-xl text-xs font-bold flex items-center justify-center shrink-0 font-sans text-white shadow-md"
                              style={{ background: i % 2 === 0
                                ? "linear-gradient(135deg, hsl(214 66% 44%), hsl(214 66% 36%))"
                                : "linear-gradient(135deg, hsl(180 84% 36%), hsl(180 84% 28%))" }}
                            >
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            {faq.q}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground font-sans text-[15px] pb-6 pl-[52px] leading-relaxed">
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
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-5xl">
              <AnimatedSection>
                <div
                  className="relative rounded-3xl px-8 py-12 overflow-hidden text-white"
                  style={{
                    background: "linear-gradient(130deg, hsl(214 66% 30%) 0%, hsl(214 66% 20%) 50%, hsl(200 70% 16%) 100%)",
                  }}
                >
                  {/* inner dot grid */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-[0.06]"
                    style={{
                      backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                      backgroundSize: "26px 26px",
                    }}
                  />

                  {/* Glow blobs */}
                  <motion.div
                    className="absolute -top-20 -left-20 w-72 h-72 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, hsl(214 66% 44% / 0.25), transparent 70%)" }}
                    animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, hsl(180 91% 47% / 0.18), transparent 70%)" }}
                    animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  />

                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                      <p className="text-xs font-sans font-semibold text-accent uppercase tracking-[0.2em] mb-2">
                        Still have questions?
                      </p>
                      <h3 className="text-2xl md:text-3xl font-serif font-bold mb-2">
                        Our care specialists are ready.
                      </h3>
                      <p className="text-white/60 font-sans text-sm max-w-sm">
                        Call, email, or stop by — we're always happy to talk through your care options.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                      <a href={`tel:+1${phoneLink}`}>
                        <Button
                          className="rounded-full gap-2 w-full sm:w-auto font-semibold hover:scale-105 transition-all"
                          style={{ background: "linear-gradient(135deg, #ffffff 0%, #e8eef5 100%)", border: "1px solid rgba(255,255,255,0.5)", boxShadow: "0 2px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.9)", color: "#1d4f8c" }}
                        >
                          <Phone className="h-4 w-4" /> Call Now
                        </Button>
                      </a>
                      <a href={`mailto:${contactInfo.email}`}>
                        <Button
                          className="rounded-full gap-2 w-full sm:w-auto font-semibold"
                          style={{ background: "linear-gradient(135deg, hsl(214 66% 44%) 0%, hsl(192 91% 37%) 100%)", border: "1px solid rgba(255,255,255,0.3)", boxShadow: "0 2px 12px rgba(38,104,188,0.30), inset 0 1px 0 rgba(255,255,255,0.25)", color: "#fff" }}
                        >
                          <Mail className="h-4 w-4" /> Email Us
                        </Button>
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
      </div>
    </div>
  );
};

export default Contact;