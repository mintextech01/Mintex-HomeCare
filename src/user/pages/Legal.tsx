import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, type ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import AccessibilityButton from "@/components/AccessibilityButton";
import AnimatedSection from "@/components/AnimatedSection";
import { useAdmin, type ContactInfo } from "@/contexts/AdminContext";
import {
  Phone, Mail, MapPin, CheckCircle2, ShieldCheck, FileText, HeartPulse,
  Accessibility, Scale, CalendarDays, ListOrdered, Info, ArrowRight, type LucideIcon,
} from "lucide-react";

// Privacy, Terms, HIPAA, Accessibility and Non-Discrimination share one layout and one chunk.
// Content is a starting draft: have it reviewed by MintexCare's attorney / compliance officer.

const EFFECTIVE_DATE = "October 6, 2026";

const GRADIENT_BTN = {
  background: "linear-gradient(135deg, hsl(214 66% 44%) 0%, hsl(192 91% 37%) 100%)",
  border: "1px solid rgba(255,255,255,0.3)",
  boxShadow: "0 2px 12px rgba(38,104,188,0.30), inset 0 1px 0 rgba(255,255,255,0.25)",
  color: "#fff",
};

interface LegalDoc {
  title: string;
  crumb: string;
  /** One-line summary shown under the hero heading. */
  subtitle: string;
  intro: ReactNode;
  sections: { heading: string; body: ReactNode }[];
}

const P = ({ children }: { children: ReactNode }) => (
  <p className="text-gray-600 leading-relaxed mb-4 last:mb-0">{children}</p>
);

const List = ({ items }: { items: ReactNode[] }) => (
  <ul className="space-y-3 mb-4 last:mb-0">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-3 text-gray-600 leading-relaxed">
        <CheckCircle2 className="h-5 w-5 text-[#0891b2] shrink-0 mt-0.5" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} className="text-[#2a66b0] font-medium underline decoration-[#2a66b0]/30 underline-offset-2 hover:decoration-[#2a66b0]">{children}</a>
);

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Order and labels of the policy switcher; the icon is shown in the hero card. */
const NAV: { path: string; label: string; icon: LucideIcon }[] = [
  { path: "/privacy-policy",     label: "Privacy Policy",     icon: ShieldCheck },
  { path: "/terms",              label: "Terms of Service",   icon: FileText },
  { path: "/hipaa-notice",       label: "HIPAA Notice",       icon: HeartPulse },
  { path: "/accessibility",      label: "Accessibility",      icon: Accessibility },
  { path: "/non-discrimination", label: "Non-Discrimination", icon: Scale },
];

const docs: Record<string, (c: ContactInfo, tel: string) => LegalDoc> = {
  "/privacy-policy": (c, tel) => ({
    title: "Privacy Policy",
    crumb: "Privacy Policy",
    subtitle: "What information we collect through this website, why we collect it, and the choices you have.",
    intro: (
      <P>
        This Privacy Policy explains how MintexCare ("we", "us") collects, uses and protects information
        when you visit mintexcare.com, contact us, request care or apply for a job. Health information we
        receive while providing care is also protected under our{" "}
        <Link to="/hipaa-notice" className="text-[#2a66b0] font-medium underline decoration-[#2a66b0]/30 underline-offset-2 hover:decoration-[#2a66b0]">HIPAA Notice of Privacy Practices</Link>.
      </P>
    ),
    sections: [
      {
        heading: "Information we collect",
        body: (
          <List items={[
            <><strong className="text-gray-900">Contact and care requests:</strong> your name, phone number, email address, the type of care you are interested in and any message you send us.</>,
            <><strong className="text-gray-900">Job applications:</strong> your name, contact details, the position you apply for, your resume and cover letter if you attach them.</>,
            <><strong className="text-gray-900">Website usage:</strong> pages visited, device and browser type, approximate location and referring website, collected through cookies and Google Tag Manager / Google Analytics.</>,
            <><strong className="text-gray-900">Phone and WhatsApp:</strong> information you share with us when you call or message us.</>,
          ]} />
        ),
      },
      {
        heading: "How we use your information",
        body: (
          <List items={[
            "To respond to your inquiry and arrange a free consultation or care services.",
            "To review job applications and contact applicants.",
            "To operate, secure and improve our website and measure how visitors use it.",
            "To meet our legal, licensing and regulatory obligations.",
          ]} />
        ),
      },
      {
        heading: "How we share information",
        body: (
          <>
            <P>We do not sell or rent your personal information. We share it only:</P>
            <List items={[
              "With service providers that help us run our website and business (for example website hosting, form storage and analytics), who may use it only on our behalf.",
              "When required by law, court order or a government or licensing authority.",
              "To protect the safety of our clients, caregivers or the public.",
            ]} />
          </>
        ),
      },
      {
        heading: "Cookies and analytics",
        body: (
          <P>
            Our website uses cookies and similar technologies, including Google Analytics through Google Tag
            Manager, to understand how visitors use the site. You can block or delete cookies in your browser
            settings; the site will still work. You can also opt out of Google Analytics with Google's{" "}
            <A href="https://tools.google.com/dlpage/gaoptout">browser opt-out add-on</A>.
          </P>
        ),
      },
      {
        heading: "Data security and retention",
        body: (
          <P>
            We use reasonable administrative, technical and physical safeguards to protect your information.
            No method of transmission over the internet is completely secure. We keep information only as long
            as needed for the purposes above or as required by law.
          </P>
        ),
      },
      {
        heading: "Your choices",
        body: (
          <P>
            You may ask us to access, correct or delete the personal information you submitted through our
            website, or to stop contacting you, by calling <A href={`tel:+1${tel}`}>{c.phone}</A> or emailing{" "}
            <A href={`mailto:${c.email}`}>{c.email}</A>.
          </P>
        ),
      },
      {
        heading: "Children's privacy",
        body: <P>Our website is not directed to children under 13, and we do not knowingly collect their personal information online.</P>,
      },
      {
        heading: "Changes to this policy",
        body: <P>We may update this policy from time to time. The effective date at the top of this page shows when it was last changed.</P>,
      },
    ],
  }),

  "/terms": (c, tel) => ({
    title: "Terms of Service",
    crumb: "Terms of Service",
    subtitle: "The rules for using mintexcare.com, our online forms and our job listings.",
    intro: <P>By using mintexcare.com you agree to these Terms of Service. If you do not agree, please do not use the website.</P>,
    sections: [
      {
        heading: "About this website",
        body: (
          <P>
            This website provides general information about MintexCare's home care, nursing and facility
            staffing services in New Jersey. Care services are provided only under a separate written service
            agreement after an assessment, not through this website.
          </P>
        ),
      },
      {
        heading: "Not medical advice",
        body: (
          <P>
            Content on this website is for general information only and is not medical advice, diagnosis or
            treatment. Always consult your physician or another qualified health provider about a medical
            condition. <strong className="text-gray-900">In an emergency, call 911.</strong>
          </P>
        ),
      },
      {
        heading: "Forms and communications",
        body: (
          <P>
            When you submit a form you agree to provide accurate information and allow us to contact you by
            phone, text, WhatsApp or email about your request. Submitting a form does not create a client or
            employment relationship. Please do not send detailed medical information through website forms;
            we will collect what we need securely during your consultation.
          </P>
        ),
      },
      {
        heading: "Job listings",
        body: (
          <P>
            Job listings are for information and may change or be withdrawn at any time. Submitting an
            application does not guarantee an interview or employment. MintexCare is an equal opportunity employer.
          </P>
        ),
      },
      {
        heading: "Intellectual property",
        body: (
          <P>
            The MintexCare name, logo, text, images and design of this website belong to MintexCare or its
            licensors and may not be copied or reused without our written permission.
          </P>
        ),
      },
      {
        heading: "Acceptable use",
        body: (
          <List items={[
            "Do not use the website for any unlawful purpose or to send spam or false information.",
            "Do not attempt to interfere with the website's security or operation.",
            "Do not copy or scrape the website's content for commercial use.",
          ]} />
        ),
      },
      {
        heading: "Links to other websites",
        body: <P>Links to third-party websites are provided for convenience. We are not responsible for their content or privacy practices.</P>,
      },
      {
        heading: "Disclaimer and limitation of liability",
        body: (
          <P>
            The website is provided "as is" without warranties of any kind. To the fullest extent permitted by
            law, MintexCare is not liable for any damages arising from your use of the website.
          </P>
        ),
      },
      {
        heading: "Governing law",
        body: <P>These terms are governed by the laws of the State of New Jersey.</P>,
      },
      {
        heading: "Questions",
        body: (
          <P>
            Questions about these terms? Call <A href={`tel:+1${tel}`}>{c.phone}</A> or email{" "}
            <A href={`mailto:${c.email}`}>{c.email}</A>.
          </P>
        ),
      },
    ],
  }),

  "/hipaa-notice": (c, tel) => ({
    title: "HIPAA Notice of Privacy Practices",
    crumb: "HIPAA Notice",
    subtitle: "How your health information is protected while you receive care from MintexCare, and your rights.",
    intro: (
      <P>
        <strong className="text-gray-900">
          This notice describes how medical information about you may be used and disclosed and how you can
          get access to this information. Please review it carefully.
        </strong>
      </P>
    ),
    sections: [
      {
        heading: "Our responsibilities",
        body: (
          <List items={[
            "We are required by law to maintain the privacy and security of your protected health information (PHI).",
            "We will let you know promptly if a breach occurs that may have compromised the privacy or security of your information.",
            "We must follow the duties and privacy practices described in this notice and give you a copy of it.",
            "We will not use or share your information other than as described here unless you tell us we can in writing. You may change your mind at any time by letting us know in writing.",
          ]} />
        ),
      },
      {
        heading: "How we may use and share your health information",
        body: (
          <List items={[
            <><strong className="text-gray-900">Treatment:</strong> to provide and coordinate your care, for example sharing information with your physician, nurses and caregivers.</>,
            <><strong className="text-gray-900">Payment:</strong> to bill and get payment from you, your insurer, Medicaid or another payer.</>,
            <><strong className="text-gray-900">Health care operations:</strong> to run our agency, supervise care quality, train staff and meet licensing requirements.</>,
            <><strong className="text-gray-900">Family and caregivers:</strong> with family members or others involved in your care, unless you object.</>,
            <><strong className="text-gray-900">As required by law:</strong> including public health reporting, reporting suspected abuse or neglect, health oversight activities, legal proceedings, law enforcement, and to prevent a serious threat to health or safety.</>,
          ]} />
        ),
      },
      {
        heading: "Uses that need your written authorization",
        body: (
          <P>
            We will not use or share your information for marketing, sell your information, or share
            psychotherapy notes without your written permission.
          </P>
        ),
      },
      {
        heading: "Your rights",
        body: (
          <List items={[
            "Get an electronic or paper copy of your health record.",
            "Ask us to correct health information you think is incorrect or incomplete.",
            "Request confidential communications, for example contacting you at a different address or phone number.",
            "Ask us to limit what we use or share (we are not required to agree in all cases, but must agree not to share with your health plan for services you paid for in full out of pocket, if you ask).",
            "Get a list of those with whom we have shared your information.",
            "Get a paper copy of this notice at any time, even if you agreed to receive it electronically.",
            "Choose someone, such as a legal guardian or person with medical power of attorney, to act for you.",
          ]} />
        ),
      },
      {
        heading: "Complaints",
        body: (
          <>
            <P>
              If you believe your privacy rights have been violated, you may complain to us by contacting our
              Privacy Officer at <A href={`tel:+1${tel}`}>{c.phone}</A> or{" "}
              <A href={`mailto:${c.email}`}>{c.email}</A>.
            </P>
            <P>
              You may also file a complaint with the U.S. Department of Health and Human Services Office for
              Civil Rights at 200 Independence Avenue S.W., Washington, D.C. 20201, by calling 1-877-696-6775, or
              at <A href="https://www.hhs.gov/ocr/privacy/hipaa/complaints/">hhs.gov/ocr/privacy/hipaa/complaints</A>.
              We will not retaliate against you for filing a complaint.
            </P>
          </>
        ),
      },
      {
        heading: "Changes to this notice",
        body: (
          <P>
            We may change the terms of this notice, and the changes will apply to all information we have about
            you. The new notice will be available on request, in our office and on our website.
          </P>
        ),
      },
    ],
  }),

  "/accessibility": (c, tel) => ({
    title: "Accessibility Statement",
    crumb: "Accessibility",
    subtitle: "Our commitment to a website everyone can use, and how to reach us if something isn't working for you.",
    intro: (
      <P>
        MintexCare is committed to making our website usable by everyone, including people with
        disabilities and older adults who use assistive technology.
      </P>
    ),
    sections: [
      {
        heading: "Our standard",
        body: (
          <P>
            We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. We review the
            website regularly and fix issues as we find them.
          </P>
        ),
      },
      {
        heading: "Accessibility features",
        body: (
          <List items={[
            "An accessibility menu (the button at the bottom of every page) to adjust text size and contrast.",
            "Light and dark display modes.",
            "Keyboard-accessible navigation and labelled form fields.",
            "Text alternatives for meaningful images.",
            "A layout that works on phones, tablets and computers, with large tap targets for call and WhatsApp buttons.",
          ]} />
        ),
      },
      {
        heading: "Known limitations",
        body: (
          <P>
            Some content, such as documents or embedded content from third parties, may not yet be fully
            accessible. We are working to improve these areas.
          </P>
        ),
      },
      {
        heading: "Need help or found a problem?",
        body: (
          <P>
            If you have difficulty using any part of this website, or need information in a different format,
            call us 24/7 at <A href={`tel:+1${tel}`}>{c.phone}</A> or email{" "}
            <A href={`mailto:${c.email}`}>{c.email}</A>. Please tell us the page and the problem, and we will
            respond and provide the information another way.
          </P>
        ),
      },
    ],
  }),

  "/non-discrimination": (c, tel) => ({
    title: "Non-Discrimination Notice",
    crumb: "Non-Discrimination",
    subtitle: "Equal care and equal opportunity for everyone, with free language and communication help.",
    intro: (
      <P>
        MintexCare complies with applicable federal civil rights laws and the New Jersey Law Against
        Discrimination, and does not discriminate on the basis of race, color, national origin, age,
        disability, sex (including sexual orientation and gender identity), religion or creed.
      </P>
    ),
    sections: [
      {
        heading: "Our commitment",
        body: (
          <P>
            MintexCare does not exclude people or treat them differently because of race, color, national
            origin, age, disability or sex, in providing care or in employment.
          </P>
        ),
      },
      {
        heading: "Free aids and services",
        body: (
          <>
            <P>MintexCare provides, free of charge:</P>
            <List items={[
              "Aids and services to people with disabilities to communicate effectively with us, such as qualified sign language interpreters and written information in other formats (large print, accessible electronic formats).",
              "Language services to people whose primary language is not English, such as qualified interpreters and information written in other languages.",
            ]} />
            <P>
              If you need these services, call <A href={`tel:+1${tel}`}>{c.phone}</A>.
            </P>
          </>
        ),
      },
      {
        heading: "How to file a grievance",
        body: (
          <>
            <P>
              If you believe MintexCare has failed to provide these services or discriminated in another way,
              you can file a grievance in person, by mail, phone or email with our Civil Rights Coordinator:
              {" "}{c.address} · <A href={`tel:+1${tel}`}>{c.phone}</A> · <A href={`mailto:${c.email}`}>{c.email}</A>.
            </P>
            <P>
              You can also file a civil rights complaint with the U.S. Department of Health and Human Services,
              Office for Civil Rights, at{" "}
              <A href="https://ocrportal.hhs.gov/ocr/portal/lobby.jsf">ocrportal.hhs.gov</A>, by mail at 200
              Independence Avenue S.W., Room 509F, HHH Building, Washington, D.C. 20201, or by phone at
              1-800-368-1019 (TDD: 1-800-537-7697).
            </P>
          </>
        ),
      },
    ],
  }),
};

const Legal = () => {
  const { pathname } = useLocation();
  const { contactInfo } = useAdmin();
  const tel = contactInfo.phone.replace(/[^\d+]/g, "");
  const doc = (docs[pathname] ?? docs["/privacy-policy"])(contactInfo, tel);
  const DocIcon = (NAV.find(n => n.path === pathname) ?? NAV[0]).icon;
  const ids = doc.sections.map(s => slug(s.heading));

  // Highlight the section currently being read in the "On this page" list.
  const [activeId, setActiveId] = useState(ids[0]);
  useEffect(() => {
    setActiveId(ids[0]);
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-130px 0px -55% 0px" },
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const [titleStart, titleEnd] = (() => {
    const words = doc.title.split(" ");
    return words.length > 1 ? [words.slice(0, -1).join(" "), words[words.length - 1]] : ["", doc.title];
  })();

  return (
    <>
      <Header />
      {/* overflow-x-clip (not hidden) so the sidebar's position: sticky still works. */}
      <main className="bg-background overflow-x-clip">

        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section className="relative pt-32 md:pt-40 pb-16 md:pb-20 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute rounded-full deco-drift" style={{ background: "radial-gradient(circle, #bfdbfe 0%, transparent 70%)", width: 560, height: 560, top: "-20%", right: "-8%", opacity: 0.7 }} />
            <div className="absolute rounded-full deco-float-down" style={{ background: "radial-gradient(circle, #a7f3d0 0%, transparent 70%)", width: 380, height: 380, bottom: "-25%", left: "-8%", opacity: 0.5 }} />
            <div className="absolute rounded-full deco-float-up" style={{ background: "radial-gradient(circle, #c7d2fe 0%, transparent 70%)", width: 280, height: 280, top: "10%", left: "30%", opacity: 0.35 }} />

            <div className="absolute bottom-20 left-[48%] hidden lg:grid grid-cols-6 gap-3">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={`ld-${i}`} className="w-1.5 h-1.5 rounded-full bg-[#2a66b0]/15" />
              ))}
            </div>
            <div className="absolute top-[18%] right-[8%] w-44 h-44 rounded-full border-2 border-[#2a66b0]/[0.08] deco-spin-slow hidden lg:block" />
            <div className="absolute bottom-[12%] right-[30%] w-24 h-24 rounded-full border-[3px] border-dashed border-[#0891b2]/[0.1] deco-spin-slow hidden lg:block" style={{ animationDirection: "reverse" }} />
            <div className="absolute bottom-[22%] right-[6%] w-6 h-6 border-2 border-[#0891b2]/15 rotate-45 deco-drift hidden lg:block" />
            <svg className="absolute bottom-0 left-0 w-full h-16 opacity-[0.06]" viewBox="0 0 1440 64" preserveAspectRatio="none">
              <path d="M0,32 C360,64 720,0 1080,32 C1260,48 1380,16 1440,32 L1440,64 L0,64 Z" fill="#2a66b0" />
            </svg>
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
              <AnimatedSection from="left">
                <p className="text-sm text-gray-500 mb-8 flex items-center gap-2">
                  <Link to="/" className="hover:text-[#2a66b0] transition-colors">Home</Link>
                  <span className="text-gray-300">/</span>
                  <span className="text-[#2a66b0] font-medium">{doc.crumb}</span>
                </p>

                <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2a66b0]" />
                  <span className="text-xs font-semibold text-[#2a66b0] uppercase tracking-widest">Legal &amp; Compliance</span>
                </div>

                <h1 className="font-bold text-gray-900 leading-[1.08] mb-5" style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}>
                  {titleStart && <>{titleStart} </>}
                  <span className="text-[#2a66b0]">{titleEnd}</span>
                </h1>

                <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-8 max-w-[600px]">{doc.subtitle}</p>

                <div className="flex flex-wrap items-center gap-3">
                  {[
                    { icon: CalendarDays, label: `Effective ${EFFECTIVE_DATE}` },
                    { icon: ListOrdered,  label: `${doc.sections.length} sections` },
                    { icon: ShieldCheck,  label: "NJ Licensed Agency" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 bg-card border border-border rounded-full px-3 sm:px-4 py-2 shadow-sm">
                      <Icon className="w-4 h-4 text-[#2a66b0]" />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Icon card */}
              <AnimatedSection from="right" delay={0.15} className="hidden lg:block">
                <div className="relative w-64 h-64">
                  <div className="absolute inset-0 rounded-[2.5rem] rotate-6 bg-[#2a66b0]/[0.06] border border-[#2a66b0]/10" />
                  <div className="absolute inset-0 rounded-[2.5rem] flex items-center justify-center shadow-2xl"
                    style={{ background: "linear-gradient(135deg, #1d4f8c 0%, #2a66b0 55%, #0891b2 100%)" }}>
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[rgba(255,255,255,0.10)] -translate-y-1/3 translate-x-1/4" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-[rgba(255,255,255,0.08)] translate-y-1/3 -translate-x-1/4" />
                    <DocIcon className="relative w-24 h-24 text-white" strokeWidth={1.4} />
                  </div>
                  <div className="absolute -bottom-5 -left-8 bg-card rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-border">
                    <div className="w-9 h-9 rounded-xl bg-[#0891b2]/10 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-[#0891b2]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 leading-none">MintexCare</p>
                      <p className="text-xs text-gray-500 mt-0.5">Care you can believe in</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            POLICY SWITCHER
        ══════════════════════════════════════ */}
        <nav aria-label="Legal pages" className="border-y border-border bg-muted/40">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex gap-2 overflow-x-auto py-3 -mx-1 px-1" style={{ scrollbarWidth: "none" }}>
              {NAV.map(({ path, label, icon: Icon }) => {
                const active = path === pathname;
                return (
                  <Link key={path} to={path} aria-current={active ? "page" : undefined}
                    className={`shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      active ? "text-white" : "text-gray-600 hover:text-[#2a66b0] glass-btn"
                    }`}
                    style={active ? GRADIENT_BTN : undefined}>
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* ══════════════════════════════════════
            CONTENT
        ══════════════════════════════════════ */}
        <section className="relative py-14 md:py-20">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute rounded-full deco-float-down" style={{ background: "radial-gradient(circle, #e0f2fe 0%, transparent 70%)", width: 420, height: 420, top: "30%", right: "-12%", opacity: 0.5 }} />
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid lg:grid-cols-[280px_1fr] gap-10 xl:gap-14 items-start max-w-6xl mx-auto">

              {/* Sidebar: on-this-page + contact (sticky on desktop) */}
              <aside className="hidden lg:block sticky top-32 max-h-[calc(100vh-9rem)] overflow-y-auto space-y-5 pb-1" style={{ scrollbarWidth: "thin" }}>
                <div className="bg-card border border-border rounded-3xl p-5 shadow-sm">
                  <p className="text-xs font-semibold text-[#2a66b0] uppercase tracking-widest mb-3 px-3">On this page</p>
                  <ol className="space-y-0.5">
                    {doc.sections.map((s, i) => {
                      const active = activeId === ids[i];
                      return (
                        <li key={s.heading}>
                          <a href={`#${ids[i]}`}
                            className={`flex items-start gap-3 rounded-xl px-3 py-1.5 text-sm leading-snug transition-colors ${
                              active ? "bg-blue-50 text-[#2a66b0] font-semibold" : "text-gray-500 hover:text-[#2a66b0]"
                            }`}>
                            <span className={`text-xs font-bold mt-0.5 ${active ? "text-[#2a66b0]" : "text-gray-400"}`}>{String(i + 1).padStart(2, "0")}</span>
                            {s.heading}
                          </a>
                        </li>
                      );
                    })}
                  </ol>
                </div>

                {/* White tints are inline styles: the dark theme overrides bg-white/* utility classes. */}
                <div className="relative rounded-3xl p-5 overflow-hidden text-white"
                  style={{ background: "linear-gradient(135deg, #1d4f8c 0%, #2a66b0 55%, #0891b2 100%)" }}>
                  <div className="absolute top-0 right-0 w-28 h-28 rounded-full -translate-y-1/2 translate-x-1/3" style={{ background: "rgba(255,255,255,0.10)" }} />
                  <p className="relative font-bold text-lg mb-1">Have a question?</p>
                  <p className="relative text-white/75 text-sm mb-4">Our team is available 24/7.</p>
                  <a href={`tel:+1${tel}`} className="relative flex items-center gap-2 text-sm font-semibold hover:opacity-90 transition-opacity rounded-full px-4 py-2.5 mb-2" style={{ background: "rgba(255,255,255,0.16)" }}>
                    <Phone className="h-4 w-4" /> {contactInfo.phone}
                  </a>
                  <a href={`mailto:${contactInfo.email}`} className="relative flex items-center gap-2 text-sm font-semibold hover:opacity-90 transition-opacity rounded-full px-4 py-2.5 break-all" style={{ background: "rgba(255,255,255,0.16)" }}>
                    <Mail className="h-4 w-4 shrink-0" /> {contactInfo.email}
                  </a>
                </div>
              </aside>

              {/* Document */}
              <article className="min-w-0">
                <AnimatedSection>
                  <div className="relative rounded-3xl border border-blue-100 bg-blue-50 p-6 md:p-8 mb-8 overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: "linear-gradient(180deg, #2a66b0 0%, #0891b2 100%)" }} />
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#2a66b0] flex items-center justify-center shrink-0">
                        <Info className="h-5 w-5 text-white" />
                      </div>
                      <div className="min-w-0 pt-1.5">{doc.intro}</div>
                    </div>
                  </div>
                </AnimatedSection>

                <div className="space-y-6">
                  {doc.sections.map((s, i) => (
                    <AnimatedSection key={s.heading} delay={Math.min(i, 3) * 0.04}>
                      <section id={ids[i]} className="group relative scroll-mt-32 bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-lg hover:border-[#2a66b0]/25 transition-all duration-300 overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
                          style={{ background: "linear-gradient(90deg, #2a66b0 0%, #0891b2 100%)" }} />
                        <div className="flex items-center gap-4 mb-5">
                          <span className="w-11 h-11 rounded-2xl flex items-center justify-center text-sm font-bold shrink-0 text-white shadow-md"
                            style={{ background: "linear-gradient(135deg, #2a66b0 0%, #0891b2 100%)" }}>
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug">{s.heading}</h2>
                        </div>
                        <div className="md:pl-[60px]">{s.body}</div>
                      </section>
                    </AnimatedSection>
                  ))}
                </div>

                {/* Contact details */}
                <AnimatedSection>
                  <div className="mt-8 grid sm:grid-cols-3 gap-4">
                    {[
                      { icon: Phone,  label: "Call 24/7", value: contactInfo.phone,   href: `tel:+1${tel}` },
                      { icon: Mail,   label: "Email",     value: contactInfo.email,   href: `mailto:${contactInfo.email}` },
                      { icon: MapPin, label: "Office",    value: contactInfo.address, href: undefined },
                    ].map(({ icon: Icon, label, value, href }) => {
                      const body = (
                        <>
                          <div className="w-11 h-11 rounded-xl bg-[#2a66b0]/10 flex items-center justify-center mb-3">
                            <Icon className="w-5 h-5 text-[#2a66b0]" />
                          </div>
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
                          <p className="text-sm font-semibold text-gray-900 break-words">{value}</p>
                        </>
                      );
                      const cls = "block bg-card border border-border rounded-2xl p-5 shadow-sm transition-all";
                      return href
                        ? <a key={label} href={href} className={`${cls} hover:shadow-lg hover:border-[#2a66b0]/25`}>{body}</a>
                        : <div key={label} className={cls}>{body}</div>;
                    })}
                  </div>
                </AnimatedSection>
              </article>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            CTA BANNER
        ══════════════════════════════════════ */}
        <section className="pb-20 bg-background relative">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection>
              <div className="relative rounded-3xl overflow-hidden px-6 py-12 sm:px-10 sm:py-14 md:px-16 max-w-6xl mx-auto"
                style={{ background: "linear-gradient(135deg, #1d4f8c 0%, #2a66b0 55%, #0891b2 100%)" }}>
                <div className="pointer-events-none absolute top-0 right-0 w-72 h-72 rounded-full bg-[rgba(255,255,255,0.10)] -translate-y-1/2 translate-x-1/4" />
                <div className="pointer-events-none absolute bottom-0 left-0 w-52 h-52 rounded-full bg-[rgba(255,255,255,0.08)] translate-y-1/2 -translate-x-1/4" />
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-[rgba(255,255,255,0.15)] rounded-full px-4 py-1.5 mb-4">
                      <ShieldCheck className="w-3.5 h-3.5 text-white" />
                      <span className="text-xs font-semibold text-white uppercase tracking-widest">Licensed &amp; Insured</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug mb-3">
                      Care you can trust, from people who respect your privacy.
                    </h2>
                    <p className="text-white/75 text-sm max-w-md leading-relaxed">
                      Talk to a care coordinator about a personalized plan for your loved one, with no obligation.
                    </p>
                  </div>
                  <Link to="/free-consultation"
                    className="shrink-0 inline-flex items-center gap-2 font-bold text-sm px-9 py-4 rounded-full hover:scale-105 transition-all whitespace-nowrap shadow-lg"
                    style={{ background: "#fff", color: "#1d4f8c" }}>
                    Free Consultation <ArrowRight className="h-4 w-4" />
                  </Link>
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

export default Legal;
