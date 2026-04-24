import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import AnimatedSection from "@/components/AnimatedSection";
import { BenefitsSection } from "@/components/benefits/BenefitsSection";
import { JobsSection } from "@/components/jobs/JobsSection";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Briefcase, Heart, ArrowRight, MapPin, Phone,
  FileText, PhoneCall, ClipboardCheck, CheckCircle, Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAdmin } from "@/contexts/AdminContext";
import { useState, useRef } from "react";
import { getAppStorage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const processSteps = [
  { label: "Submit Your Application", icon: FileText },
  { label: "Initial Phone Screen", icon: PhoneCall },
  { label: "In-Person Interview", icon: ClipboardCheck },
  { label: "Welcome to MintexCare", icon: Heart },
];

const stats = [
  { value: "500+", label: "Clients Served" },
  { value: "10+", label: "Years Experience" },
  { value: "NJ", label: "Licensed & Insured" },
  { value: "24/7", label: "Care Available" },
];

const Careers = () => {
  const { toast } = useToast();
  const { jobPositions, siteImages, contactInfo, addSubmission } = useAdmin();
  const activePositions = jobPositions.filter((p) => p.active);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", position: "", coverLetter: "",
  });
  const [resumeFileName, setResumeFileName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.position) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast({ title: "Please enter a valid email address", variant: "destructive" });
      return;
    }
    if (form.phone && !/^[\d\s\-\+\(\)]{7,}$/.test(form.phone)) {
      toast({ title: "Please enter a valid phone number", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      let resumeName: string | undefined;
      let resumeUrl: string | undefined;
      let resumeStoragePath: string | undefined;

      const resumeFile = fileInputRef.current?.files?.[0];
      if (resumeFile) {
        try {
          const storage = await getAppStorage();
          const uniqueName = `${Date.now()}_${resumeFile.name}`;
          resumeStoragePath = `resumes/${uniqueName}`;
          const storageRef = ref(storage, resumeStoragePath);
          await uploadBytes(storageRef, resumeFile);
          resumeUrl = await getDownloadURL(storageRef);
          resumeName = resumeFile.name;
        } catch (uploadErr: any) {
          console.error("Resume upload error:", uploadErr);
          toast({
            title: "Resume could not be uploaded",
            description: "Your application will still be submitted without the resume. Please email your resume separately.",
          });
          resumeUrl = undefined;
          resumeName = undefined;
          resumeStoragePath = undefined;
        }
      }

      await addSubmission({
        type: "career",
        name: form.name,
        email: form.email,
        phone: form.phone,
        service: form.position,
        message: form.coverLetter,
        position: form.position,
        coverLetter: form.coverLetter,
        resumeName,
        resumeUrl,
        resumeStoragePath,
      } as any);

      toast({
        title: "Application submitted!",
        description: "We'll review your application and get back to you soon.",
      });
      setForm({ name: "", email: "", phone: "", position: "", coverLetter: "" });
      setResumeFileName("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: any) {
      console.error("Career submission error:", err);
      toast({
        title: "Submission failed",
        description: err?.message ?? "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main>

        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section className="bg-[#e8ebed] pt-28 pb-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row lg:items-center gap-12">

              {/* Left */}
              <AnimatedSection className="flex-1 max-w-xl">
                <p className="text-sm text-gray-400 font-sans mb-6 flex items-center gap-2">
                  <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                  <span>/</span>
                  <span className="text-gray-600">Careers</span>
                </p>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-gray-900 leading-[1.1] mb-5">
                  Join Our<br />Team At<br />
                  <span className="text-primary">MintexCare</span>
                </h1>

                <p className="text-gray-500 font-sans leading-relaxed mb-8 max-w-sm">
                  Work at the most compassionate and dedicated home care agency in New Jersey.
                </p>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="#positions"
                    className="inline-flex items-center gap-2 font-sans font-semibold px-8 py-3.5 rounded-full transition-all hover:scale-105"
                    style={{ background: "linear-gradient(135deg, hsl(214 66% 44%) 0%, hsl(192 91% 37%) 100%)", border: "1px solid rgba(255,255,255,0.3)", boxShadow: "0 2px 12px rgba(38,104,188,0.30), inset 0 1px 0 rgba(255,255,255,0.25)", color: "#fff" }}
                  >
                    View Openings
                  </a>
                  <a
                    href="#apply-section"
                    className="inline-flex items-center gap-2 font-sans font-medium px-8 py-3.5 rounded-full text-foreground hover:text-primary transition-all glass-btn"
                  >
                    Apply Now
                  </a>
                </div>
              </AnimatedSection>

              {/* Right: image / decorative */}
              <AnimatedSection delay={0.15} className="flex-1 relative flex justify-center items-center">
                <div className="relative w-full max-w-md">
                  {/* Decorative blobs */}
                  <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-accent/10 pointer-events-none" />
                  <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-primary/10 pointer-events-none" />

                  <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 border border-white">
                    <img
                      src={siteImages.careersPageBanner}
                      alt="MintexCare team"
                      className="w-full h-72 md:h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                  </div>

                  {/* Floating chip */}
                  <div className="absolute -bottom-5 -left-5 bg-card rounded-2xl shadow-xl px-5 py-3 flex items-center gap-3 border border-border">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xl font-serif font-bold text-gray-900 leading-none">{activePositions.length}</p>
                      <p className="text-xs text-gray-400 font-sans mt-0.5">Open Positions</p>
                    </div>
                  </div>

                  {/* NJ chip */}
                  <div className="absolute -top-5 -right-3 bg-card rounded-2xl shadow-xl px-5 py-3 flex items-center gap-2 border border-border">
                    <MapPin className="h-4 w-4 text-primary" />
                    <p className="text-sm font-sans font-semibold text-gray-700">New Jersey</p>
                  </div>
                </div>
              </AnimatedSection>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            BENEFITS / WHY JOIN US — REDESIGNED
        ══════════════════════════════════════ */}
        <BenefitsSection />

        {/* ══════════════════════════════════════
            JOB OPENINGS — REDESIGNED
        ══════════════════════════════════════ */}
        <section id="positions" className="py-24 bg-background">
          <JobsSection 
            title="Join Our Healthcare Team"
            subtitle="Explore rewarding nursing and care positions in New Jersey"
          />
        </section>

        {/* ══════════════════════════════════════
            STATS BAR
        ══════════════════════════════════════ 
        <section className="bg-primary py-14">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((s, i) => (
                <AnimatedSection key={s.label} delay={i * 0.08}>
                  <div>
                    <p className="text-4xl md:text-5xl font-serif font-bold text-white mb-1">{s.value}</p>
                    <p className="text-sm text-white/65 font-sans uppercase tracking-widest">{s.label}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>*/}

        {/* ══════════════════════════════════════
            YOUR LIFE AT MINTEXCARE
        ══════════════════════════════════════ */}
        <section className="py-24 bg-background overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Left: image */}
              <AnimatedSection>
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-accent/8 pointer-events-none" />
                  <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-full bg-primary/6 pointer-events-none" />
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
                    <img
                      src={siteImages.careersPageBanner}
                      alt="Life at MintexCare"
                      className="w-full h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent" />
                  </div>
                  {/* Floating quote */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white">
                    <p className="text-sm font-serif font-semibold text-gray-800 leading-snug">
                      "A place where caregivers are celebrated, not just employed."
                    </p>
                    <p className="text-xs text-gray-400 font-sans mt-1">— MintexCare Culture</p>
                  </div>
                </div>
              </AnimatedSection>

              {/* Right: text */}
              <AnimatedSection delay={0.15}>
                <p className="text-xs font-sans font-semibold text-accent uppercase tracking-[0.25em] mb-4">Our Culture</p>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                  Your Life At <span className="text-primary">MintexCare</span>
                </h2>
                <div className="w-10 h-[3px] rounded-full bg-accent mb-6" />
                <p className="text-gray-500 font-sans leading-relaxed mb-4">
                  At MintexCare we believe in working together and working hard. With our compassionate team
                  of healthcare professionals, we see looking for dynamic and creative individuals who are
                  willing to dedicate themselves to providing innovative care and services for our clients.
                </p>
                <p className="text-gray-500 font-sans leading-relaxed mb-8">
                  Besides getting the opportunity to unlock your true potential, at MintexCare you can also
                  network with some of the most talented people in the industry, build meaningful connections,
                  and enjoy many other benefits by working with us.
                </p>

                <div className="space-y-3 mb-8">
                  {["Compassionate team culture", "Professional development support", "Making real impact daily"].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-sm text-gray-700 font-sans">{item}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="#apply-section"
                  className="inline-flex items-center gap-2 font-sans font-semibold px-7 py-3.5 rounded-full transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, hsl(214 66% 44%) 0%, hsl(192 91% 37%) 100%)", border: "1px solid rgba(255,255,255,0.3)", boxShadow: "0 2px 12px rgba(38,104,188,0.30), inset 0 1px 0 rgba(255,255,255,0.25)", color: "#fff" }}
                >
                  Learn More <ArrowRight className="h-4 w-4" />
                </a>
              </AnimatedSection>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            RECRUITMENT PROCESS
        ══════════════════════════════════════ */}
        <section className="py-24 bg-[#e8ebed]">
          <div className="container mx-auto px-4">

            <AnimatedSection className="text-center mb-14">
              <p className="text-xs font-sans font-semibold text-accent uppercase tracking-[0.25em] mb-3">Hiring Steps</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">
                Learn Our <span className="text-primary">Recruitment</span> Process
              </h2>
            </AnimatedSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {/* Connecting line (desktop) */}
              <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-primary/15 pointer-events-none" />

              {processSteps.map((step, i) => {
                const SIcon = step.icon;
                return (
                  <AnimatedSection key={step.label} delay={i * 0.1}>
                    <div className="relative flex flex-col items-center text-center group">
                      {/* Step number */}
                      <div className="relative mb-5">
                        <div className="w-20 h-20 rounded-2xl bg-card border border-border shadow-md flex items-center justify-center group-hover:border-primary/30 group-hover:shadow-lg transition-all duration-300">
                          <SIcon className="h-7 w-7 text-primary" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold font-sans shadow-md">
                          {i + 1}
                        </div>
                      </div>
                      <h3 className="font-serif font-semibold text-gray-900 text-sm leading-snug">{step.label}</h3>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════
            APPLY FORM
        ══════════════════════════════════════ */}
        <section id="apply-section" className="py-24 bg-background overflow-hidden">
          <div className="absolute rounded-full bg-primary/4 pointer-events-none" style={{ width: 420, height: 420, bottom: "-10%", right: "-6%" }} />

          <div className="container mx-auto px-4">

            <AnimatedSection className="text-center mb-14">
              <p className="text-xs font-sans font-semibold text-accent uppercase tracking-[0.25em] mb-3">Apply Now</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
                Start Your Journey <span className="text-primary">With Us</span>
              </h2>
              <p className="text-gray-500 font-sans max-w-md mx-auto">
                Fill out the form and we'll review your application within 3–5 business days.
              </p>
            </AnimatedSection>

            <div className="grid lg:grid-cols-[320px_1fr] gap-8 items-start max-w-5xl mx-auto">

              {/* Left: info panel */}
              <AnimatedSection className="lg:sticky lg:top-28">
                <div className="relative rounded-3xl bg-primary p-7 overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-accent/10 translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-5">
                      <Briefcase className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-white mb-3 leading-snug">
                      Ready to Make<br />a Difference?
                    </h3>
                    <div className="w-8 h-[2px] rounded-full bg-accent/60 mb-5" />
                    <p className="text-sm text-white/65 font-sans leading-relaxed mb-7">
                      Fill out the form and we'll review your application within 3–5 business days.
                    </p>

                    <div className="space-y-3 mb-7">
                      {processSteps.map((step, i) => (
                        <div key={step.label} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0 text-xs font-bold font-sans text-white">
                            {i + 1}
                          </div>
                          <span className="text-sm text-white/75 font-sans">{step.label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-5 border-t border-white/15">
                      <p className="text-white/50 text-xs font-sans mb-1 flex items-center gap-1.5">
                        <Phone className="h-3 w-3 text-accent" /> Questions? Call us:
                      </p>
                      <p className="text-lg font-serif font-bold text-white">{contactInfo.phone}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Right: form */}
              <AnimatedSection delay={0.15}>
                <div className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-sm">
                  <div className="mb-7">
                    <p className="text-xs font-sans font-semibold text-accent uppercase tracking-[0.22em] mb-2">Application Form</p>
                    <h3 className="text-2xl font-serif font-bold text-gray-900">Tell Us About Yourself</h3>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-500 font-sans uppercase tracking-wider">
                          Full Name *
                        </label>
                        <Input
                          placeholder="Jane Smith"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          required
                          className="font-sans rounded-xl border-gray-200 focus:border-primary"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-500 font-sans uppercase tracking-wider">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          placeholder="jane@email.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          required
                          className="font-sans rounded-xl border-gray-200 focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-500 font-sans uppercase tracking-wider">
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          placeholder="(732) 000-0000"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="font-sans rounded-xl border-gray-200 focus:border-primary"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-500 font-sans uppercase tracking-wider">
                          Position Applied For *
                        </label>
                        <Select
                          value={form.position}
                          onValueChange={(v) => setForm({ ...form, position: v })}
                        >
                          <SelectTrigger className="font-sans rounded-xl border-gray-200">
                            <SelectValue placeholder="Select a position" />
                          </SelectTrigger>
                          <SelectContent>
                            {activePositions.map((p) => (
                              <SelectItem key={p.id} value={p.title} className="font-sans">
                                {p.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-500 font-sans uppercase tracking-wider">
                        Resume Upload
                      </label>
                      <Input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="font-sans rounded-xl border-gray-200"
                        onChange={(e) => setResumeFileName(e.target.files?.[0]?.name ?? "")}
                      />
                      <p className="text-[11px] text-gray-400 font-sans">Accepted: PDF, DOC, DOCX</p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-500 font-sans uppercase tracking-wider">
                        Cover Letter <span className="normal-case font-normal">(optional)</span>
                      </label>
                      <Textarea
                        placeholder="Tell us why you'd be a great fit for MintexCare..."
                        value={form.coverLetter}
                        onChange={(e) => setForm({ ...form, coverLetter: e.target.value })}
                        rows={5}
                        className="font-sans rounded-xl border-gray-200 resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        size="lg"
                        disabled={submitting}
                        className="w-full rounded-full font-semibold hover:scale-[1.02] transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                        style={{ background: "linear-gradient(135deg, hsl(214 66% 44%) 0%, hsl(192 91% 37%) 100%)", border: "1px solid rgba(255,255,255,0.3)", boxShadow: "0 2px 12px rgba(38,104,188,0.30), inset 0 1px 0 rgba(255,255,255,0.25)", color: "#fff" }}
                      >
                        {submitting ? (
                          <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Submitting…</>
                        ) : (
                          <>Submit Application <ArrowRight className="h-4 w-4 ml-1" /></>
                        )}
                      </Button>
                      <p className="text-center text-xs text-gray-400 font-sans mt-3">
                        We respond to all applications within 3–5 business days.
                      </p>
                    </div>
                  </form>
                </div>
              </AnimatedSection>

            </div>
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