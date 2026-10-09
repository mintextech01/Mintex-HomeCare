import { useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { ArrowRight, Loader2, Paperclip } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useSpamGuard } from "@/hooks/useSpamGuard";
import { useAdmin } from "@/contexts/AdminContext";
import { db } from "@/lib/firebase";
import { trackLead } from "@/lib/leads";

/**
 * Job application form, used on /careers and /careers/apply. Saves a "career" submission
 * (Admin → Submissions → Applications), with an optional resume stored in resumeData, then
 * sends the applicant to /careers/thank-you.
 */

// Resumes are stored as base64 inside one Firestore document (1 MB limit), so cap the file size.
const MAX_RESUME_BYTES = 700 * 1024;
export const GENERAL_APPLICATION = "General application (any open role)";

const labelCls = "block text-xs font-semibold text-foreground/70 font-sans uppercase tracking-wider mb-1.5";
const inputCls = "font-sans h-12 rounded-xl border-border bg-background";

export const ApplicationForm = ({ initialPosition = "", idPrefix = "app" }: { initialPosition?: string; idPrefix?: string }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { jobPositions, addSubmission } = useAdmin();
  const positions = useMemo(() => [...jobPositions.filter(p => p.active).map(p => p.title), GENERAL_APPLICATION], [jobPositions]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", position: initialPosition, coverLetter: "" });
  const [resumeFileName, setResumeFileName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const spamGuard = useSpamGuard();
  const id = (field: string) => `${idPrefix}-${field}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (spamGuard.isSpam()) {
      navigate("/careers/thank-you");
      return;
    }
    // Phone is required: it is how the hiring team actually reaches caregivers.
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.position) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      toast({ title: "Please enter a valid email address", variant: "destructive" });
      return;
    }
    if (!/^[\d\s\-+()]{7,}$/.test(form.phone.trim())) {
      toast({ title: "Please enter a valid phone number", variant: "destructive" });
      return;
    }

    // Resume is optional (many caregivers apply from their phone), but if attached it must be valid.
    const resumeFile = fileInputRef.current?.files?.[0];
    if (resumeFile && !/\.(pdf|docx?)$/i.test(resumeFile.name)) {
      toast({ title: "Unsupported file type", description: "Please upload a PDF, DOC or DOCX file.", variant: "destructive" });
      return;
    }
    if (resumeFile && resumeFile.size > MAX_RESUME_BYTES) {
      toast({ title: "Resume is too large", description: "Please upload a file under 700 KB, or apply without it.", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      let resumeName: string | undefined;
      let resumeDataId: string | undefined;

      if (resumeFile) {
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve((reader.result as string).split(",")[1]);
          reader.onerror = reject;
          reader.readAsDataURL(resumeFile);
        });
        const resumeDoc = await addDoc(collection(db, "resumeData"), {
          fileName: resumeFile.name,
          base64,
          uploadedAt: new Date().toISOString(),
        });
        resumeName = resumeFile.name;
        resumeDataId = resumeDoc.id;
      }

      await addSubmission({
        type: "career",
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        service: form.position,
        message: form.coverLetter,
        position: form.position,
        coverLetter: form.coverLetter,
        resumeName,
        resumeDataId,
      });
      trackLead("application", { position: form.position });
      spamGuard.reset();
      navigate("/careers/thank-you", { state: { name: form.name.trim().split(" ")[0], position: form.position } });
    } catch (err: unknown) {
      console.error("Career submission error:", err);
      toast({
        title: "Submission failed",
        description: (err as { message?: string })?.message ?? "Please try again.",
        variant: "destructive",
      });
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="relative space-y-5">
      {spamGuard.honeypotField}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor={id("name")} className={labelCls}>Full name <span className="text-primary">*</span></label>
          <Input id={id("name")} autoComplete="name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputCls} />
        </div>
        <div>
          <label htmlFor={id("email")} className={labelCls}>Email <span className="text-primary">*</span></label>
          <Input id={id("email")} type="email" autoComplete="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inputCls} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor={id("phone")} className={labelCls}>Phone <span className="text-primary">*</span></label>
          <Input id={id("phone")} type="tel" autoComplete="tel" required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className={inputCls} />
        </div>
        <div>
          <label htmlFor={id("position")} className={labelCls}>Position <span className="text-primary">*</span></label>
          <Select value={form.position} onValueChange={v => setForm({ ...form, position: v })}>
            <SelectTrigger id={id("position")} className="font-sans h-12 rounded-xl border-border bg-background">
              <SelectValue placeholder="Select a position" />
            </SelectTrigger>
            <SelectContent>
              {positions.map(t => <SelectItem key={t} value={t} className="font-sans">{t}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label htmlFor={id("resume")} className={labelCls}>
          Resume <span className="normal-case tracking-normal font-normal text-muted-foreground">(optional, speeds up your application)</span>
        </label>
        <label htmlFor={id("resume")}
          className="flex items-center gap-3 rounded-xl border border-dashed border-foreground/25 bg-background px-4 py-3.5 cursor-pointer hover:border-foreground/50 transition-colors">
          <span className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center shrink-0">
            <Paperclip className="h-4 w-4 text-accent-foreground" />
          </span>
          <span className="text-sm min-w-0">
            <span className="block font-semibold text-foreground truncate">{resumeFileName || "Choose a file"}</span>
            <span className="block text-xs text-muted-foreground">PDF, DOC or DOCX, up to 700 KB</span>
          </span>
        </label>
        <input id={id("resume")} ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" className="sr-only"
          onChange={e => setResumeFileName(e.target.files?.[0]?.name ?? "")} />
      </div>

      <div>
        <label htmlFor={id("cover")} className={labelCls}>
          Cover letter <span className="normal-case tracking-normal font-normal text-muted-foreground">(optional)</span>
        </label>
        <Textarea id={id("cover")} rows={5} maxLength={5000} placeholder="Tell us about your experience and why you'd be a great fit for MintexCare..."
          value={form.coverLetter} onChange={e => setForm({ ...form, coverLetter: e.target.value })}
          className="font-sans rounded-xl border-border bg-background resize-none" />
      </div>

      <div className="pt-1">
        <button type="submit" disabled={submitting}
          className="el-btn-primary w-full h-14 text-base disabled:opacity-70 disabled:cursor-not-allowed">
          {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</> : <>Submit Application <ArrowRight className="h-4 w-4" /></>}
        </button>
        <p className="text-center text-xs text-muted-foreground font-sans mt-3">
          We respond to all applications within 3–5 business days. See our{" "}
          <Link to="/privacy-policy" className="underline hover:text-foreground">Privacy Policy</Link>.
        </p>
      </div>
    </form>
  );
};
