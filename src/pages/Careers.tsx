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
import { CheckCircle, Briefcase, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAdmin } from "@/contexts/AdminContext";
import { useState } from "react";

const benefits = ["Competitive Compensation", "Flexible Scheduling", "Ongoing Training & Development", "Supportive Work Environment", "Growth & Advancement Opportunities", "Making a Real Difference"];

const Careers = () => {
  const { toast } = useToast();
  const { jobPositions } = useAdmin();
  const activePositions = jobPositions.filter(p => p.active);
  const [form, setForm] = useState({ name: "", email: "", phone: "", position: "", coverLetter: "" });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.position) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    toast({ title: "Application submitted!", description: "We'll review your application and get back to you soon." });
    setForm({ name: "", email: "", phone: "", position: "", coverLetter: "" });
  };

  return (
    <>
      <Header />
      <main>
        <section className="pt-28 pb-12 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <p className="text-sm font-sans text-white/70 mb-2"><Link to="/" className="hover:text-accent">Home</Link> / Careers</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold">Join Our Team</h1>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <AnimatedSection>
                <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Why Work With MintexCare?</h2>
                <p className="text-muted-foreground leading-relaxed mb-6 font-sans">Join a team that values compassion, dedication, and professional growth. At MintexCare, you'll make a meaningful difference in people's lives every day.</p>
                <ul className="space-y-3">
                  {benefits.map(b => (
                    <li key={b} className="flex items-center gap-2 text-foreground font-sans">
                      <CheckCircle className="h-5 w-5 text-accent shrink-0" /> {b}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop" alt="Healthcare professional smiling" className="rounded-lg shadow-lg w-full object-cover h-[350px]" loading="lazy" />
              </AnimatedSection>
            </div>
          </div>
        </section>

        <section className="py-16 bg-hero-bg">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-foreground mb-3">Open Positions</h2>
              <p className="text-muted-foreground font-sans">Explore current opportunities at MintexCare — click a position to see the full job description</p>
            </AnimatedSection>
            <div className="max-w-3xl mx-auto space-y-4">
              {activePositions.length === 0 && (
                <p className="text-center text-muted-foreground font-sans py-8">No open positions at this time. Check back soon!</p>
              )}
              {activePositions.map((p, i) => (
                <AnimatedSection key={p.id} delay={i * 0.1}>
                  <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                    <button
                      onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}
                      className="w-full flex items-center justify-between p-6 text-left"
                    >
                      <div className="flex items-center gap-4">
                        <Briefcase className="h-8 w-8 text-primary shrink-0" />
                        <div>
                          <h3 className="font-serif font-semibold text-foreground">{p.title}</h3>
                          <p className="text-sm text-muted-foreground font-sans">{p.type}</p>
                        </div>
                      </div>
                      {expandedId === p.id ? <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" /> : <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />}
                    </button>
                    {expandedId === p.id && (
                      <div className="px-6 pb-6 border-t border-border pt-4 space-y-4">
                        <div>
                          <h4 className="font-sans font-semibold text-foreground text-sm mb-2">Job Description</h4>
                          <p className="text-muted-foreground font-sans text-sm leading-relaxed">{p.description}</p>
                        </div>
                        {p.requirements && (
                          <div>
                            <h4 className="font-sans font-semibold text-foreground text-sm mb-2">Requirements</h4>
                            <p className="text-muted-foreground font-sans text-sm leading-relaxed">{p.requirements}</p>
                          </div>
                        )}
                        <Button
                          onClick={() => {
                            setForm({ ...form, position: p.title });
                            document.getElementById("apply-section")?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full font-sans"
                        >
                          Apply for this Position
                        </Button>
                      </div>
                    )}
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <section id="apply-section" className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-2xl">
            <AnimatedSection className="text-center mb-8">
              <h2 className="text-3xl font-serif font-bold text-foreground mb-3">Apply Now</h2>
              <p className="text-muted-foreground font-sans">Fill out the form below to start your application</p>
            </AnimatedSection>
            <AnimatedSection>
              <form onSubmit={handleSubmit} className="space-y-4 bg-card border border-border rounded-xl p-6 md:p-8">
                <Input placeholder="Full Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className="font-sans" />
                <Input type="email" placeholder="Email Address *" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required className="font-sans" />
                <Input type="tel" placeholder="Phone Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="font-sans" />
                <Select value={form.position} onValueChange={v => setForm({ ...form, position: v })}>
                  <SelectTrigger className="font-sans"><SelectValue placeholder="Position Applied For *" /></SelectTrigger>
                  <SelectContent>
                    {activePositions.map(p => <SelectItem key={p.id} value={p.title} className="font-sans">{p.title}</SelectItem>)}
                  </SelectContent>
                </Select>
                <div>
                  <label className="text-sm font-medium text-foreground font-sans block mb-2">Resume Upload</label>
                  <Input type="file" accept=".pdf,.doc,.docx" className="font-sans" />
                </div>
                <Textarea placeholder="Cover Letter (optional)" value={form.coverLetter} onChange={e => setForm({ ...form, coverLetter: e.target.value })} rows={5} className="font-sans" />
                <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-full font-sans">Submit Application</Button>
              </form>
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

export default Careers;
