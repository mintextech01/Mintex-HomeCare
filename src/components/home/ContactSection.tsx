import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AnimatedSection from "@/components/AnimatedSection";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { useToast } from "@/hooks/use-toast";

const serviceOptions = ["Personal Care", "Companion Care", "Skilled Nursing", "Post-Surgery Care", "Respite Care", "Live-in Care", "Other"];

const ContactSection = () => {
  const { addSubmission, contactInfo } = useAdmin();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    addSubmission(form);
    toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
    setForm({ name: "", email: "", phone: "", service: "", message: "" });
    setErrors({});
  };

  const phoneLink = contactInfo.phone.replace(/[^\d+]/g, "");

  return (
    <section id="contact" className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-12">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2 font-sans">Get In Touch</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-3">Ready to Get Started?</h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto font-sans">Contact us today for a free, no-obligation consultation. Let us show you why families across New Jersey trust MintexCare.</p>
        </AnimatedSection>
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <AnimatedSection>
            <form onSubmit={handleSubmit} className="space-y-4 bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
              <div>
                <Input placeholder="Full Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={`font-sans ${errors.name ? "border-destructive" : ""}`} />
                {errors.name && <p className="text-xs text-destructive mt-1 font-sans">{errors.name}</p>}
              </div>
              <div>
                <Input type="email" placeholder="Email Address *" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={`font-sans ${errors.email ? "border-destructive" : ""}`} />
                {errors.email && <p className="text-xs text-destructive mt-1 font-sans">{errors.email}</p>}
              </div>
              <div>
                <Input type="tel" placeholder="Phone Number *" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className={`font-sans ${errors.phone ? "border-destructive" : ""}`} />
                {errors.phone && <p className="text-xs text-destructive mt-1 font-sans">{errors.phone}</p>}
              </div>
              <Select value={form.service} onValueChange={v => setForm({ ...form, service: v })}>
                <SelectTrigger className="font-sans"><SelectValue placeholder="Service Needed" /></SelectTrigger>
                <SelectContent>
                  {serviceOptions.map(s => <SelectItem key={s} value={s} className="font-sans">{s}</SelectItem>)}
                </SelectContent>
              </Select>
              <Textarea placeholder="Your Message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={4} className="font-sans" />
              <Button type="submit" size="lg" className="w-full rounded-full font-semibold" style={{ background: "linear-gradient(135deg, hsl(214 66% 44%) 0%, hsl(192 91% 37%) 100%)", border: "1px solid rgba(255,255,255,0.3)", boxShadow: "0 2px 12px rgba(38,104,188,0.30), inset 0 1px 0 rgba(255,255,255,0.25)", color: "#fff" }}>Send Message</Button>
            </form>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-5">Contact Information</h3>
                <ul className="space-y-4 text-muted-foreground font-sans">
                  <li className="flex items-start gap-3"><Phone className="h-5 w-5 text-primary mt-0.5 shrink-0" /><div><a href={`tel:+1${phoneLink}`} className="text-foreground font-medium hover:text-accent transition-colors">{contactInfo.phone}</a><br /><span className="text-sm">Fax: {contactInfo.fax}</span></div></li>
                  <li className="flex items-center gap-3"><Mail className="h-5 w-5 text-primary shrink-0" /><a href={`mailto:${contactInfo.email}`} className="hover:text-accent transition-colors">{contactInfo.email}</a></li>
                  <li className="flex items-center gap-3"><MapPin className="h-5 w-5 text-primary shrink-0" />{contactInfo.address}</li>
                  <li className="flex items-center gap-3"><Clock className="h-5 w-5 text-primary shrink-0" />{contactInfo.hours}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">Follow Us</h3>
                <div className="flex gap-3">
                  <a href="#" className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors" aria-label="Facebook"><Facebook className="h-5 w-5" /></a>
                  <a href="#" className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
                  <a href="#" className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></a>
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
