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
import { ArrowRight, ArrowLeft, Phone, Newspaper, Clock, CalendarDays, Check, ListChecks, Info, MessageCircle } from "lucide-react";
import React from "react";

// /blog (article list) and /blog/{slug} (article template) share this chunk.

const AUTHOR = "MintexCare Care Team";

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

const Breadcrumb = ({ trail }: { trail: { label: string; to?: string }[] }) => (
  <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-8 flex flex-wrap items-center gap-2">
    {trail.map((c, i) => (
      <React.Fragment key={c.label}>
        {i > 0 && <span className="text-foreground/30">/</span>}
        {c.to
          ? <Link to={c.to} className="hover:text-foreground transition-colors">{c.label}</Link>
          : <span className="text-foreground font-semibold line-clamp-1" aria-current="page">{c.label}</span>}
      </React.Fragment>
    ))}
  </nav>
);

const Meta = ({ post }: { post: BlogPost }) => (
  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
    <span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" /> {formatDate(post.date)}</span>
    <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {post.readMinutes} min read</span>
  </div>
);

const PostCard = ({ post, i, big = false }: { post: BlogPost; i: number; big?: boolean }) => (
  <AnimatedSection delay={Math.min(i, 3) * 0.06} className="h-full">
    <Link to={`/blog/${post.slug}`}
      className="group h-full flex flex-col bg-background rounded-[24px] p-3 transition-shadow duration-300 hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.15)]">
      {/* Designed cover (no stock photos) */}
      <div className={`relative overflow-hidden rounded-[18px] bg-accent ${big ? "h-56 md:h-72" : "h-40"}`}>
        <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full border border-accent-foreground/10" />
        <div className="absolute -bottom-4 -right-4 w-28 h-28 rounded-full border border-accent-foreground/10" />
        <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-foreground bg-background rounded-full px-3 py-1.5">
          <Newspaper className="h-3.5 w-3.5" /> {post.category}
        </span>
        <Newspaper className="absolute bottom-5 right-6 w-12 h-12 text-accent-foreground/40 group-hover:scale-110 transition-transform" />
      </div>
      <div className="px-3 pt-5 pb-3 flex flex-col flex-1">
        <Meta post={post} />
        <h2 className={`font-bold text-foreground group-hover:text-primary transition-colors mt-3 mb-2 leading-snug ${big ? "text-2xl" : "text-lg"}`}>{post.title}</h2>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">{post.description}</p>
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground mt-5">
          Read article <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  </AnimatedSection>
);

const CtaBlock = ({ tel, phone, title, text }: { tel: string; phone: string; title: string; text: ReactNode }) => (
  <div className="rounded-[32px] bg-accent px-6 py-10 sm:px-10 text-center">
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-accent-foreground leading-snug mb-3">{title}</h2>
      <p className="text-accent-foreground/75 text-sm md:text-base leading-relaxed mb-7">{text}</p>
      <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center gap-3">
        <Link to="/free-consultation" className="el-btn-primary whitespace-nowrap">
          Free Consultation <ArrowRight className="h-4 w-4" />
        </Link>
        <a href={`tel:+1${tel}`} className="el-btn bg-background text-foreground hover:bg-background/80 whitespace-nowrap">
          <Phone className="h-4 w-4" /> {phone}
        </a>
        <a href={`https://wa.me/1${tel}`} target="_blank" rel="noopener noreferrer" className="el-btn bg-background text-foreground hover:bg-background/80 whitespace-nowrap">
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
      <section className="pt-32 md:pt-40 pb-14 md:pb-16">
        <div className="container mx-auto px-6 md:px-10">
          <AnimatedSection className="max-w-3xl">
            <Breadcrumb trail={[{ label: "Home", to: "/" }, { label: "Resources", to: "/resources" }, { label: "Care Articles" }]} />
            <div className="el-eyebrow mb-6">
              <Newspaper className="w-3.5 h-3.5 text-primary" />
              Blog
            </div>
            <h1 className="font-bold text-foreground leading-[1.07] mb-6" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)" }}>
              Care <span className="text-primary">Articles</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-[600px]">
              Practical advice for families caring for an aging parent or a loved one recovering at home.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-surface">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-5 mb-5">
            <PostCard post={featured} i={0} big />
            <div className="grid gap-5">
              {rest.map((p, i) => <PostCard key={p.slug} post={p} i={i + 1} />)}
            </div>
          </div>
          <AnimatedSection className="mt-10">
            <Link to="/resources/guides" className="group flex flex-col sm:flex-row sm:items-center gap-4 rounded-[24px] bg-foreground text-background p-6 md:px-8">
              <span className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-accent"><ListChecks className="w-6 h-6 text-accent-foreground" /></span>
              <span className="flex-1">
                <span className="block font-bold">Family Guides & Checklists</span>
                <span className="block text-sm text-background/70">Printable checklists for home safety, hospital discharge and choosing a home care agency.</span>
              </span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 md:px-10">
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
      <section className="pt-32 md:pt-40 pb-12 md:pb-14">
        <div className="container mx-auto px-6 md:px-10">
          <AnimatedSection className="max-w-3xl mx-auto">
            <Breadcrumb trail={[{ label: "Home", to: "/" }, { label: "Care Articles", to: "/blog" }, { label: post.title }]} />
            <div className="el-eyebrow mb-5">
              <Newspaper className="h-3.5 w-3.5 text-primary" /> {post.category}
            </div>
            <h1 className="font-bold text-foreground leading-[1.1] mb-6" style={{ fontSize: "clamp(2rem, 4.6vw, 3.2rem)" }}>{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <span className="w-8 h-8 rounded-full flex items-center justify-center bg-foreground text-background text-xs font-bold">M</span>
                {AUTHOR}
              </span>
              <Meta post={post} />
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="container mx-auto px-6 md:px-10">
          <article className="max-w-3xl mx-auto">
            <AnimatedSection>
              <p className="text-lg md:text-xl text-foreground/85 leading-relaxed el-card p-6 md:p-8 mb-12">{post.intro}</p>
            </AnimatedSection>

            <div className="space-y-10">
              {post.sections.map(s => (
                <section key={s.heading}>
                  <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">{s.heading}</h2>
                  {s.paragraphs?.map(para => <p key={para.slice(0, 40)} className="text-muted-foreground leading-[1.8] mb-4 last:mb-0">{para}</p>)}
                  {s.list && (
                    <ul className="space-y-3 mt-4">
                      {s.list.map(item => (
                        <li key={item} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
                          <span className="h-5 w-5 rounded-full bg-accent flex items-center justify-center shrink-0 mt-1">
                            <Check className="h-3 w-3 text-accent-foreground" strokeWidth={3} />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            <div className="mt-12 flex gap-3 el-card p-5 text-sm text-muted-foreground leading-relaxed">
              <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p>This article is general information and isn't medical advice. Talk to your loved one's doctor about their specific situation, and call 911 in an emergency.</p>
            </div>

            {/* Related */}
            <div className="mt-10">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">Related</p>
              <div className="flex flex-wrap gap-3">
                {post.related.map(r => (
                  <Link key={r.to} to={r.to} className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-foreground bg-background border border-border hover:bg-foreground hover:text-background hover:border-foreground transition-colors">
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
        <section className="py-16 md:py-20 bg-surface">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">More articles</h2>
              <Link to="/blog" className="el-btn-outline self-start sm:self-auto">
                <ArrowLeft className="h-4 w-4" /> All articles
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
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
      <main className="theme-el overflow-x-clip">
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
