import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import AnimatedSection from "@/components/AnimatedSection";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const serviceOptions = ["Personal Care", "Companion Care", "Skilled Nursing", "Post-Surgery Care", "Respite Care", "Live-in Care", "Other"];

const faqs = [
  { q: "What areas do you serve?", a: "We serve communities throughout New Jersey including Middlesex, Monmouth, Somerset, Union, Mercer, and surrounding counties." },
  { q: "How do I get started with home care?", a: "Simply call us or fill out our contact form. We'll schedule a free in-home consultation." },
  { q: "Are your caregivers licensed and insured?", a: "Yes, all our caregivers are fully licensed, bonded, insured, and undergo thorough background checks." },
  { q: "Do you accept insurance?", a: "We work with various insurance providers and can discuss payment options during your consultation." },
  { q: "Can I choose my caregiver?", a: "We carefully match caregivers with clients based on needs, personality, and preferences. Your input is always valued." },
  { q: "What if I need to change my care plan?", a: "Care plans are flexible and can be adjusted anytime as your loved one's needs change." },
];

const Contact = () => {
  const { addSubmission, contactInfo } = useAdmin();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    addSubmission(form);
    toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
    setForm({ name: "", email: "", phone: "", service: "", message: "" });
  };

  const phoneLink = contactInfo.phone.replace(/[^\d+]/g, "");
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(contactInfo.address)}`;

  return (
    <>
      <Header />
      <main>
        <section className="pt-28 pb-12 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <p className="text-sm font-sans text-white/70 mb-2"><Link to="/" className="hover:text-accent">Home</Link> / Contact</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold">Contact Us</h1>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <AnimatedSection>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input placeholder="Full Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className="font-sans" />
                  <Input type="email" placeholder="Email Address *" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required className="font-sans" />
                  <Input type="tel" placeholder="Phone Number *" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required className="font-sans" />
                  <Select value={form.service} onValueChange={v => setForm({ ...form, service: v })}>
                    <SelectTrigger className="font-sans"><SelectValue placeholder="Service Needed" /></SelectTrigger>
                    <SelectContent>{serviceOptions.map(s => <SelectItem key={s} value={s} className="font-sans">{s}</SelectItem>)}</SelectContent>
                  </Select>
                  <Textarea placeholder="Your Message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={5} className="font-sans" />
                  <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-full font-sans">Send Message</Button>
                </form>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Contact Information</h2>
                <ul className="space-y-5 text-muted-foreground font-sans mb-8">
                  <li className="flex items-start gap-3"><Phone className="h-5 w-5 text-primary mt-0.5 shrink-0" /><div><a href={`tel:+1${phoneLink}`} className="text-foreground font-medium hover:text-accent">{contactInfo.phone}</a><br /><span className="text-sm">Fax: {contactInfo.fax}</span></div></li>
                  <li className="flex items-center gap-3"><Mail className="h-5 w-5 text-primary shrink-0" /><a href={`mailto:${contactInfo.email}`} className="hover:text-accent">{contactInfo.email}</a></li>
                  <li className="flex items-center gap-3"><MapPin className="h-5 w-5 text-primary shrink-0" />{contactInfo.address}</li>
                  <li className="flex items-center gap-3"><Clock className="h-5 w-5 text-primary shrink-0" />{contactInfo.hours}</li>
                </ul>
                <div className="rounded-lg overflow-hidden border border-border h-[250px]">
                  <iframe title="MintexCare Location" src={mapSrc} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        <section className="py-16 bg-hero-bg">
          <div className="container mx-auto px-4 max-w-3xl">
            <AnimatedSection className="text-center mb-8">
              <h2 className="text-3xl font-serif font-bold text-foreground">Frequently Asked Questions</h2>
            </AnimatedSection>
            <AnimatedSection>
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border rounded-lg px-4">
                    <AccordionTrigger className="font-sans font-medium text-foreground">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground font-sans">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
    </>
  );
};

export default Contact;
