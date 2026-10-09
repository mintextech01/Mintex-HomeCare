import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AnimatedSection from "@/components/AnimatedSection";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { useToast } from "@/hooks/use-toast";
import { useSpamGuard } from "@/hooks/useSpamGuard";
import { CONTACT_SERVICE_OPTIONS as serviceOptions } from "@/data/serviceIndex";
import { trackLead, type LeadSource } from "@/lib/leads";
import { useNavigate } from "react-router-dom";

const ContactSection = () => {
  const { addSubmission, contactInfo } = useAdmin();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const spamGuard = useSpamGuard();

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email format";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    else if (!/^[\d\s\-\+\(\)]{7,}$/.test(form.phone)) errs.phone = "Invalid phone format";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (spamGuard.isSpam()) {
      navigate("/thank-you", { state: { source: "contact" satisfies LeadSource } });
      return;
    }
    if (!validate()) return;
    try {
      await addSubmission({ ...form, type: "contact" });
      trackLead("contact", { care_type: form.service });
      spamGuard.reset();
      navigate("/thank-you", { state: { source: "contact" satisfies LeadSource, name: form.name.trim().split(" ")[0] } });
    } catch (err: any) {
      console.error("Contact submission error:", err);
      toast({ title: "Submission failed", description: err?.message ?? "Please try again.", variant: "destructive" });
    }
  };

  const phoneLink = contactInfo.phone.replace(/[^\d+]/g, "");

  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-10">
        <AnimatedSection className="text-center mb-12 max-w-2xl mx-auto">
          <div className="el-eyebrow mb-5">{contactInfo.sectionEyebrow || "Get In Touch"}</div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">{contactInfo.sectionHeading || "Ready to Get Started?"}</h2>
          <p className="text-base text-muted-foreground font-sans">{contactInfo.sectionDescription || "Contact us today for a free, no-obligation consultation. Let us show you why families across New Jersey trust MintexCare."}</p>
        </AnimatedSection>
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-5 max-w-6xl mx-auto">
          <AnimatedSection>
            <form onSubmit={handleSubmit} className="relative h-full space-y-4 el-card rounded-[28px] p-6 md:p-10">
              {spamGuard.honeypotField}
              <div>
                <Input placeholder="Full Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={`h-12 rounded-xl bg-background font-sans ${errors.name ? "border-destructive" : ""}`} />
                {errors.name && <p className="text-xs text-destructive mt-1 font-sans">{errors.name}</p>}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Input type="email" placeholder="Email Address *" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={`h-12 rounded-xl bg-background font-sans ${errors.email ? "border-destructive" : ""}`} />
                  {errors.email && <p className="text-xs text-destructive mt-1 font-sans">{errors.email}</p>}
                </div>
                <div>
                  <Input type="tel" placeholder="Phone Number *" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className={`h-12 rounded-xl bg-background font-sans ${errors.phone ? "border-destructive" : ""}`} />
                  {errors.phone && <p className="text-xs text-destructive mt-1 font-sans">{errors.phone}</p>}
                </div>
              </div>
              <Select value={form.service} onValueChange={v => setForm({ ...form, service: v })}>
                <SelectTrigger className="h-12 rounded-xl bg-background font-sans"><SelectValue placeholder="Service Needed" /></SelectTrigger>
                <SelectContent>
                  {serviceOptions.map(s => <SelectItem key={s} value={s} className="font-sans">{s}</SelectItem>)}
                </SelectContent>
              </Select>
              <Textarea placeholder="Your Message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={5} className="rounded-xl bg-background font-sans" />
              <button type="submit" className="el-btn-primary w-full">Send Message</button>
            </form>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="h-full rounded-[28px] bg-foreground text-background p-6 md:p-10 flex flex-col">
              <h3 className="font-serif text-2xl font-semibold mb-8">Contact Information</h3>
              <ul className="space-y-6 font-sans text-background/75">
                <li className="flex items-start gap-4">
                  <span className="h-11 w-11 rounded-full bg-accent flex items-center justify-center shrink-0"><Phone className="h-5 w-5 text-accent-foreground" /></span>
                  <div className="pt-0.5"><a href={`tel:+1${phoneLink}`} className="text-background font-semibold hover:underline underline-offset-4">{contactInfo.phone}</a><br /><span className="text-sm">Fax: {contactInfo.fax}</span></div>
                </li>
                <li className="flex items-center gap-4">
                  <span className="h-11 w-11 rounded-full bg-background/10 flex items-center justify-center shrink-0"><Mail className="h-5 w-5 text-background" /></span>
                  <a href={`mailto:${contactInfo.email}`} className="break-all hover:text-background hover:underline underline-offset-4 transition-colors">{contactInfo.email}</a>
                </li>
                <li className="flex items-center gap-4">
                  <span className="h-11 w-11 rounded-full bg-background/10 flex items-center justify-center shrink-0"><MapPin className="h-5 w-5 text-background" /></span>
                  {contactInfo.address}
                </li>
                <li className="flex items-center gap-4">
                  <span className="h-11 w-11 rounded-full bg-background/10 flex items-center justify-center shrink-0"><Clock className="h-5 w-5 text-background" /></span>
                  {contactInfo.hours}
                </li>
              </ul>
              <div className="mt-auto pt-10">
                <h3 className="font-serif text-xl font-semibold mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  <a href={contactInfo.facebookUrl || "https://www.facebook.com/profile.php?id=61566851474928"} target="_blank" rel="noopener noreferrer" className="h-11 w-11 rounded-full bg-background/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors" aria-label="Facebook"><Facebook className="h-5 w-5" /></a>
                  <a href={contactInfo.instagramUrl || "https://www.instagram.com/mintexhomecare/"} target="_blank" rel="noopener noreferrer" className="h-11 w-11 rounded-full bg-background/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
