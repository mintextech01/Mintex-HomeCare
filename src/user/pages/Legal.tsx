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
  Phone, Mail, MapPin, Check, ShieldCheck, FileText, HeartPulse,
  Accessibility, Scale, CalendarDays, ListOrdered, Info, ArrowRight, type LucideIcon,
} from "lucide-react";

// Privacy, Terms, HIPAA, Accessibility and Non-Discrimination share one layout and one chunk.
// Content is a starting draft: have it reviewed by MintexCare's attorney / compliance officer.

const EFFECTIVE_DATE = "October 6, 2026";

interface LegalDoc {
  title: string;
  crumb: string;
  /** One-line summary shown under the hero heading. */
  subtitle: string;
  intro: ReactNode;
  sections: { heading: string; body: ReactNode }[];
}

const P = ({ children }: { children: ReactNode }) => (
  <p className="text-muted-foreground leading-relaxed mb-4 last:mb-0">{children}</p>
);

const List = ({ items }: { items: ReactNode[] }) => (
  <ul className="space-y-3 mb-4 last:mb-0">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
        <span className="h-5 w-5 rounded-full bg-accent flex items-center justify-center shrink-0 mt-0.5">
          <Check className="h-3 w-3 text-accent-foreground" strokeWidth={3} />
        </span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} className="text-foreground font-semibold underline decoration-primary/40 underline-offset-2 hover:decoration-primary">{children}</a>
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
        <Link to="/hipaa-notice" className="text-foreground font-semibold underline decoration-primary/40 underline-offset-2 hover:decoration-primary">HIPAA Notice of Privacy Practices</Link>.
      </P>
    ),
    sections: [
      {
        heading: "Information we collect",
        body: (
          <List items={[
            <><strong className="text-foreground">Contact and care requests:</strong> your name, phone number, email address, the type of care you are interested in and any message you send us.</>,
            <><strong className="text-foreground">Job applications:</strong> your name, contact details, the position you apply for, your resume and cover letter if you attach them.</>,
            <><strong className="text-foreground">Website usage:</strong> pages visited, device and browser type, approximate location and referring website, collected through cookies and Google Tag Manager / Google Analytics.</>,
            <><strong className="text-foreground">Phone and WhatsApp:</strong> information you share with us when you call or message us.</>,
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
            condition. <strong className="text-foreground">In an emergency, call 911.</strong>
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
        <strong className="text-foreground">
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
            <><strong className="text-foreground">Treatment:</strong> to provide and coordinate your care, for example sharing information with your physician, nurses and caregivers.</>,
            <><strong className="text-foreground">Payment:</strong> to bill and get payment from you, your insurer, Medicaid or another payer.</>,
            <><strong className="text-foreground">Health care operations:</strong> to run our agency, supervise care quality, train staff and meet licensing requirements.</>,
            <><strong className="text-foreground">Family and caregivers:</strong> with family members or others involved in your care, unless you object.</>,
            <><strong className="text-foreground">As required by law:</strong> including public health reporting, reporting suspected abuse or neglect, health oversight activities, legal proceedings, law enforcement, and to prevent a serious threat to health or safety.</>,
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
      <main className="theme-el overflow-x-clip">

        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section className="pt-32 md:pt-40 pb-14 md:pb-16">
          <div className="container mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
              <AnimatedSection>
                <p className="text-sm text-muted-foreground mb-8 flex items-center gap-2">
                  <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
                  <span className="text-foreground/30">/</span>
                  <span className="text-foreground font-semibold">{doc.crumb}</span>
                </p>

                <div className="el-eyebrow mb-6">Legal &amp; Compliance</div>

                <h1 className="font-bold text-foreground leading-[1.08] mb-6" style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}>
                  {titleStart && <>{titleStart} </>}
                  <span className="text-primary">{titleEnd}</span>
                </h1>

                <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-[600px]">{doc.subtitle}</p>

                <div className="flex flex-wrap items-center gap-2.5">
                  {[
                    { icon: CalendarDays, label: `Effective ${EFFECTIVE_DATE}` },
                    { icon: ListOrdered,  label: `${doc.sections.length} sections` },
                    { icon: ShieldCheck,  label: "NJ Licensed Agency" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground bg-surface rounded-full px-3 sm:px-4 py-2">
                      <Icon className="w-4 h-4 text-primary" />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Icon card */}
              <AnimatedSection delay={0.1} className="hidden lg:block">
                <div className="relative w-64 h-64">
                  <div className="absolute inset-0 rounded-[2.5rem] flex items-center justify-center bg-accent">
                    <div className="w-36 h-36 rounded-[2rem] bg-background flex items-center justify-center shadow-xl">
                      <DocIcon className="w-16 h-16 text-foreground" strokeWidth={1.4} />
                    </div>
                  </div>
                  <div className="el-chip absolute -bottom-5 -left-8 px-4 py-3">
                    <div className="w-9 h-9 rounded-xl bg-foreground flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-background" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground leading-none">MintexCare</p>
                      <p className="text-xs text-muted-foreground mt-1">Care you can believe in</p>
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
        <nav aria-label="Legal pages" className="pb-6">
          <div className="container mx-auto px-6 md:px-10">
            <div className="flex gap-2 overflow-x-auto p-1.5 rounded-full bg-surface w-fit max-w-full" style={{ scrollbarWidth: "none" }}>
              {NAV.map(({ path, label, icon: Icon }) => {
                const active = path === pathname;
                return (
                  <Link key={path} to={path} aria-current={active ? "page" : undefined}
                    className={`shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      active ? "bg-foreground text-background" : "text-foreground/70 hover:text-foreground hover:bg-background"
                    }`}>
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
        <section className="py-14 md:py-20 bg-surface">
          <div className="container mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-[280px_1fr] gap-8 xl:gap-12 items-start max-w-6xl mx-auto">

              {/* Sidebar: on-this-page + contact (sticky on desktop) */}
              <aside className="hidden lg:block sticky top-32 max-h-[calc(100vh-9rem)] overflow-y-auto space-y-4 pb-1" style={{ scrollbarWidth: "thin" }}>
                <div className="bg-background rounded-[24px] p-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 px-3 pt-1">On this page</p>
                  <ol className="space-y-0.5">
                    {doc.sections.map((s, i) => {
                      const active = activeId === ids[i];
                      return (
                        <li key={s.heading}>
                          <a href={`#${ids[i]}`}
                            className={`flex items-start gap-3 rounded-xl px-3 py-2 text-sm leading-snug transition-colors ${
                              active ? "bg-accent text-accent-foreground font-semibold" : "text-foreground/70 hover:text-foreground hover:bg-surface"
                            }`}>
                            <span className={`text-xs font-bold mt-0.5 ${active ? "text-accent-foreground" : "text-muted-foreground"}`}>{String(i + 1).padStart(2, "0")}</span>
                            {s.heading}
                          </a>
                        </li>
                      );
                    })}
                  </ol>
                </div>

                <div className="rounded-[24px] p-5 bg-foreground text-background">
                  <p className="font-bold text-lg mb-1">Have a question?</p>
                  <p className="text-background/70 text-sm mb-4">Our team is available 24/7.</p>
                  <a href={`tel:+1${tel}`} className="flex items-center gap-2 text-sm font-semibold rounded-full px-4 py-2.5 mb-2 bg-accent text-accent-foreground hover:bg-accent/80 transition-colors">
                    <Phone className="h-4 w-4" /> {contactInfo.phone}
                  </a>
                  <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 text-sm font-semibold rounded-full px-4 py-2.5 break-all bg-background/10 hover:bg-background/20 transition-colors">
                    <Mail className="h-4 w-4 shrink-0" /> {contactInfo.email}
                  </a>
                </div>
              </aside>

              {/* Document */}
              <article className="min-w-0">
                <AnimatedSection>
                  <div className="rounded-[24px] bg-accent p-6 md:p-8 mb-5">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center shrink-0">
                        <Info className="h-5 w-5 text-foreground" />
                      </div>
                      <div className="min-w-0 pt-1.5 [&_p]:text-accent-foreground/85">{doc.intro}</div>
                    </div>
                  </div>
                </AnimatedSection>

                <div className="space-y-4">
                  {doc.sections.map((s, i) => (
                    <AnimatedSection key={s.heading} delay={Math.min(i, 3) * 0.04}>
                      <section id={ids[i]} className="scroll-mt-32 bg-background rounded-[24px] p-6 md:p-8">
                        <div className="flex items-center gap-4 mb-5">
                          <span className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold shrink-0 bg-surface text-foreground">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <h2 className="text-xl md:text-2xl font-bold text-foreground leading-snug">{s.heading}</h2>
                        </div>
                        <div className="md:pl-[60px]">{s.body}</div>
                      </section>
                    </AnimatedSection>
                  ))}
                </div>

                {/* Contact details */}
                <AnimatedSection>
                  <div className="mt-5 grid sm:grid-cols-3 gap-4">
                    {[
                      { icon: Phone,  label: "Call 24/7", value: contactInfo.phone,   href: `tel:+1${tel}` },
                      { icon: Mail,   label: "Email",     value: contactInfo.email,   href: `mailto:${contactInfo.email}` },
                      { icon: MapPin, label: "Office",    value: contactInfo.address, href: undefined },
                    ].map(({ icon: Icon, label, value, href }) => {
                      const body = (
                        <>
                          <div className="w-11 h-11 rounded-full bg-accent flex items-center justify-center mb-4">
                            <Icon className="w-5 h-5 text-accent-foreground" />
                          </div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">{label}</p>
                          <p className="text-sm font-semibold text-foreground break-words">{value}</p>
                        </>
                      );
                      const cls = "block bg-background rounded-[20px] p-5 transition-shadow";
                      return href
                        ? <a key={label} href={href} className={`${cls} hover:shadow-md`}>{body}</a>
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
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 md:px-10">
            <AnimatedSection>
              <div className="rounded-[32px] bg-accent px-6 py-12 sm:px-10 sm:py-14 md:px-16 max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                  <div>
                    <div className="el-eyebrow bg-background border-transparent mb-4">
                      <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                      Licensed &amp; Insured
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-accent-foreground leading-snug mb-3">
                      Care you can trust, from people who respect your privacy.
                    </h2>
                    <p className="text-accent-foreground/75 text-sm max-w-md leading-relaxed">
                      Talk to a care coordinator about a personalized plan for your loved one, with no obligation.
                    </p>
                  </div>
                  <Link to="/free-consultation" className="el-btn-primary group shrink-0 whitespace-nowrap">
                    Free Consultation <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
