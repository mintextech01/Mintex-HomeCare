import { Link, useLocation } from "react-router-dom";
import { useEffect, type ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import AccessibilityButton from "@/components/AccessibilityButton";
import AnimatedSection from "@/components/AnimatedSection";
import { useAdmin } from "@/contexts/AdminContext";
import { BLOG_POSTS, postBySlug, type BlogPost } from "@/data/blog";
import { ArrowRight, ArrowLeft, Phone, Newspaper, Clock, CalendarDays, CheckCircle2, ListChecks, Info, MessageCircle } from "lucide-react";
import React from "react";

// /blog (article list) and /blog/{slug} (article template) share this chunk.

const GRADIENT_BTN = {
  background: "linear-gradient(135deg, hsl(214 66% 44%) 0%, hsl(192 91% 37%) 100%)",
  border: "1px solid rgba(255,255,255,0.3)",
  boxShadow: "0 2px 12px rgba(38,104,188,0.30), inset 0 1px 0 rgba(255,255,255,0.25)",
  color: "#fff",
};
const BRAND_GRADIENT = "linear-gradient(135deg, #1d4f8c 0%, #2a66b0 55%, #0891b2 100%)";
// White tints are inline styles: the dark theme overrides bg-white/* classes.
const WHITE_TINT = "rgba(255,255,255,0.15)";
const AUTHOR = "MintexCare Care Team";

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

const Breadcrumb = ({ trail }: { trail: { label: string; to?: string }[] }) => (
  <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-8 flex flex-wrap items-center gap-2">
    {trail.map((c, i) => (
      <React.Fragment key={c.label}>
        {i > 0 && <span className="text-gray-300">/</span>}
        {c.to
          ? <Link to={c.to} className="hover:text-[#2a66b0] transition-colors">{c.label}</Link>
          : <span className="text-[#2a66b0] font-medium line-clamp-1" aria-current="page">{c.label}</span>}
      </React.Fragment>
    ))}
  </nav>
);

const HeroDeco = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="absolute rounded-full deco-drift" style={{ background: "radial-gradient(circle, #bfdbfe 0%, transparent 70%)", width: 620, height: 620, top: "-18%", right: "-10%", opacity: 0.7 }} />
    <div className="absolute rounded-full deco-float-down" style={{ background: "radial-gradient(circle, #a7f3d0 0%, transparent 70%)", width: 400, height: 400, bottom: "-20%", left: "-8%", opacity: 0.5 }} />
    <svg className="absolute bottom-0 left-0 w-full h-16 opacity-[0.06]" viewBox="0 0 1440 64" preserveAspectRatio="none">
      <path d="M0,32 C360,64 720,0 1080,32 C1260,48 1380,16 1440,32 L1440,64 L0,64 Z" fill="#2a66b0" />
    </svg>
  </div>
);

const Meta = ({ post, light = false }: { post: BlogPost; light?: boolean }) => (
  <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-xs ${light ? "text-white/80" : "text-gray-500"}`}>
    <span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" /> {formatDate(post.date)}</span>
    <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {post.readMinutes} min read</span>
  </div>
);

const PostCard = ({ post, i, big = false }: { post: BlogPost; i: number; big?: boolean }) => (
  <AnimatedSection delay={Math.min(i, 3) * 0.06} className="h-full">
    <Link to={`/blog/${post.slug}`}
      className="group relative h-full flex flex-col bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#2a66b0]/25 transition-all duration-300">
      {/* Designed cover (no stock photos) */}
      <div className={`relative overflow-hidden ${big ? "h-56 md:h-64" : "h-40"}`} style={{ background: BRAND_GRADIENT }}>
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full -translate-y-1/3 translate-x-1/4" style={{ background: "rgba(255,255,255,0.10)" }} />
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full translate-y-1/3 -translate-x-1/4" style={{ background: "rgba(255,255,255,0.08)" }} />
        <span className="absolute top-5 left-5 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-white rounded-full px-3 py-1" style={{ background: WHITE_TINT }}>
          <Newspaper className="h-3.5 w-3.5" /> {post.category}
        </span>
        <Newspaper className="absolute bottom-5 right-6 w-14 h-14 group-hover:scale-110 transition-transform" style={{ color: "rgba(255,255,255,0.35)" }} />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <Meta post={post} />
        <h2 className={`font-bold text-gray-900 group-hover:text-[#2a66b0] transition-colors mt-3 mb-2 leading-snug ${big ? "text-2xl" : "text-lg"}`}>{post.title}</h2>
        <p className="text-sm text-gray-500 leading-relaxed flex-1">{post.description}</p>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2a66b0] mt-5 group-hover:gap-2.5 transition-all">
          Read article <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  </AnimatedSection>
);

const CtaBlock = ({ tel, phone, title, text }: { tel: string; phone: string; title: string; text: ReactNode }) => (
  <div className="relative rounded-3xl overflow-hidden px-6 py-10 sm:px-10 text-center" style={{ background: BRAND_GRADIENT }}>
    <div className="pointer-events-none absolute top-0 right-0 w-64 h-64 rounded-full -translate-y-1/2 translate-x-1/4" style={{ background: "rgba(255,255,255,0.10)" }} />
    <div className="relative z-10 max-w-xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug mb-3">{title}</h2>
      <p className="text-white/80 text-sm md:text-base leading-relaxed mb-7">{text}</p>
      <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center gap-3">
        <Link to="/free-consultation" className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold text-sm px-7 py-3.5 rounded-full shadow-lg transition-all hover:scale-105" style={{ background: "#fff", color: "#1d4f8c" }}>
          Free Consultation <ArrowRight className="h-4 w-4" />
        </Link>
        <a href={`tel:+1${tel}`} className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold text-sm px-7 py-3.5 rounded-full text-white transition-all hover:scale-105"
          style={{ background: WHITE_TINT, border: "1px solid rgba(255,255,255,0.35)" }}>
          <Phone className="h-4 w-4" /> {phone}
        </a>
        <a href={`https://wa.me/1${tel}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold text-sm px-7 py-3.5 rounded-full text-white transition-all hover:scale-105"
          style={{ background: WHITE_TINT, border: "1px solid rgba(255,255,255,0.35)" }}>
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
      </div>
    </div>
  </div>
);

/* ════════════════════════════════════════════
   /blog
   ════════════════════════════════════════════ */

const BlogIndex = ({ tel, phone }: { tel: string; phone: string }) => {
  const [featured, ...rest] = BLOG_POSTS;
  return (
    <>
      <section className="relative pt-32 md:pt-40 pb-14 overflow-hidden">
        <HeroDeco />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <AnimatedSection className="max-w-3xl">
            <Breadcrumb trail={[{ label: "Home", to: "/" }, { label: "Resources", to: "/resources" }, { label: "Care Articles" }]} />
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-6">
              <Newspaper className="w-3.5 h-3.5 text-[#2a66b0]" />
              <span className="text-xs font-semibold text-[#2a66b0] uppercase tracking-widest">Blog</span>
            </div>
            <h1 className="font-bold text-gray-900 leading-[1.07] mb-5" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)" }}>
              Care <span className="text-[#2a66b0]">Articles</span>
            </h1>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-[600px]">
              Practical advice for families caring for an aging parent or a loved one recovering at home.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-[#f7f8f9] border-t border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6 mb-6">
            <PostCard post={featured} i={0} big />
            <div className="grid gap-6">
              {rest.map((p, i) => <PostCard key={p.slug} post={p} i={i + 1} />)}
            </div>
          </div>
          <AnimatedSection className="mt-10">
            <Link to="/resources/guides" className="group flex flex-col sm:flex-row sm:items-center gap-4 rounded-3xl border border-blue-100 bg-blue-50 p-6 hover:shadow-md transition-all">
              <span className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md" style={{ background: BRAND_GRADIENT }}><ListChecks className="w-6 h-6 text-white" /></span>
              <span className="flex-1">
                <span className="block font-bold text-gray-900">Family Guides & Checklists</span>
                <span className="block text-sm text-gray-600">Printable checklists for home safety, hospital discharge and choosing a home care agency.</span>
              </span>
              <ArrowRight className="h-5 w-5 text-[#2a66b0] group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection>
            <CtaBlock tel={tel} phone={phone} title="Have a question about care?" text="Our care coordinators are happy to talk through your situation, day or night." />
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

/* ════════════════════════════════════════════
   /blog/{slug} — article template
   ════════════════════════════════════════════ */

const Article = ({ post, tel, phone }: { post: BlogPost; tel: string; phone: string }) => {
  const others = BLOG_POSTS.filter(p => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <section className="relative pt-32 md:pt-40 pb-14 overflow-hidden">
        <HeroDeco />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <AnimatedSection className="max-w-3xl mx-auto">
            <Breadcrumb trail={[{ label: "Home", to: "/" }, { label: "Care Articles", to: "/blog" }, { label: post.title }]} />
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#0891b2] mb-4">
              <Newspaper className="h-3.5 w-3.5" /> {post.category}
            </span>
            <h1 className="font-bold text-gray-900 leading-[1.1] mb-5" style={{ fontSize: "clamp(2rem, 4.6vw, 3.2rem)" }}>{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: BRAND_GRADIENT }}>M</span>
                {AUTHOR}
              </span>
              <Meta post={post} />
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <article className="max-w-3xl mx-auto">
            <AnimatedSection>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed border-l-4 border-[#0891b2] pl-5 mb-12">{post.intro}</p>
            </AnimatedSection>

            <div className="space-y-10">
              {post.sections.map(s => (
                <section key={s.heading}>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">{s.heading}</h2>
                  {s.paragraphs?.map(para => <p key={para.slice(0, 40)} className="text-gray-600 leading-[1.8] mb-4 last:mb-0">{para}</p>)}
                  {s.list && (
                    <ul className="space-y-3 mt-4">
                      {s.list.map(item => (
                        <li key={item} className="flex items-start gap-3 text-gray-600 leading-relaxed">
                          <CheckCircle2 className="h-5 w-5 text-[#0891b2] shrink-0 mt-0.5" /> {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            <div className="mt-12 flex gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-5 text-sm text-gray-600 leading-relaxed">
              <Info className="h-5 w-5 text-[#2a66b0] shrink-0 mt-0.5" />
              <p>This article is general information and isn't medical advice. Talk to your loved one's doctor about their specific situation, and call 911 in an emergency.</p>
            </div>

            {/* Related */}
            <div className="mt-10">
              <p className="text-xs font-semibold text-[#0891b2] uppercase tracking-widest mb-4">Related</p>
              <div className="flex flex-wrap gap-3">
                {post.related.map(r => (
                  <Link key={r.to} to={r.to} className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-gray-700 bg-card border border-border shadow-sm hover:text-[#2a66b0] hover:border-[#2a66b0]/30 transition-all">
                    {r.label} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <CtaBlock tel={tel} phone={phone} title="Talk to a care coordinator" text="Get answers about your loved one's situation and arrange a free in-home assessment, with no obligation." />
            </div>
          </article>
        </div>
      </section>

      {others.length > 0 && (
        <section className="py-16 md:py-20 bg-[#f7f8f9] border-t border-border">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="flex items-end justify-between gap-4 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">More articles</h2>
              <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-[#2a66b0] hover:gap-3 transition-all">
                <ArrowLeft className="h-4 w-4" /> All articles
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {others.map((p, i) => <PostCard key={p.slug} post={p} i={i} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

/* ════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════ */

const ARTICLE_SCHEMA_ID = "article-schema";

const Blog = () => {
  const { pathname } = useLocation();
  const { contactInfo } = useAdmin();
  const tel = contactInfo.phone.replace(/[^\d+]/g, "");
  const phone = contactInfo.phone;
  const post = postBySlug(pathname.split("/")[2] ?? "");

  // BlogPosting structured data on article pages (replaces the prerendered copy).
  useEffect(() => {
    document.getElementById(ARTICLE_SCHEMA_ID)?.remove();
    if (!post) return;
    const url = `https://mintexcare.com/blog/${post.slug}`;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = ARTICLE_SCHEMA_ID;
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      "headline": post.title,
      "description": post.description,
      "datePublished": post.date,
      "dateModified": post.date,
      "url": url,
      "mainEntityOfPage": url,
      "author": { "@type": "Organization", "name": AUTHOR, "url": "https://mintexcare.com/about" },
      "publisher": { "@id": "https://mintexcare.com/#organization" },
      "image": "https://mintexcare.com/favicon-512.png",
      "articleSection": post.category,
      "inLanguage": "en-US",
    });
    document.head.appendChild(script);
    return () => { document.getElementById(ARTICLE_SCHEMA_ID)?.remove(); };
  }, [post]);

  return (
    <>
      <Header />
      <main className="bg-background overflow-x-clip">
        {post ? <Article post={post} tel={tel} phone={phone} /> : <BlogIndex tel={tel} phone={phone} />}
      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
      <AccessibilityButton />
    </>
  );
};

export default Blog;
