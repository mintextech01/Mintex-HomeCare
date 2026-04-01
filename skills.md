# ============================================================================
# MINTEX CARE — REQUIRED SKILLS & TECHNOLOGY STACK (skills.md)
# ============================================================================
# This file lists ALL technical skills, tools, libraries, and technologies
# required to build and maintain the Mintex Care platform.
# 
# Tool Used    : Claude Code in VS Code
# Panels       : 2 (User Panel + Admin Panel)
# ============================================================================


# ╔══════════════════════════════════════════════════════════════════════════╗
# ║                                                                        ║
# ║     SECTION A — USER PANEL: REQUIRED SKILLS & TECHNOLOGIES            ║
# ║                                                                        ║
# ╚══════════════════════════════════════════════════════════════════════════╝


## A1. CORE FRAMEWORK & LANGUAGE
────────────────────────────────────────────────────────────────────────────

┌────────────────────────────────────────────────────────────────────────┐
│ SKILL / TECHNOLOGY        │ PURPOSE                    │ PRIORITY     │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ Next.js 14+ (App Router)  │ Full-stack React framework │ ★★★★★ MUST  │
│                           │ with server/client comps,  │              │
│                           │ API routes, SSR, SSG, ISR  │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ TypeScript                │ Type-safe JavaScript,      │ ★★★★★ MUST  │
│                           │ interfaces, type guards,   │              │
│                           │ generics, enums            │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ React 18+                 │ Component architecture,    │ ★★★★★ MUST  │
│                           │ hooks (useState, useEffect,│              │
│                           │ useContext, useRef, useMemo│              │
│                           │ useCallback, useReducer),  │              │
│                           │ server components, client  │              │
│                           │ components, suspense,      │              │
│                           │ error boundaries           │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ JavaScript (ES6+)         │ Async/await, destructuring,│ ★★★★★ MUST  │
│                           │ spread operator, template  │              │
│                           │ literals, modules,         │              │
│                           │ promises, array methods    │              │
└────────────────────────────────────────────────────────────────────────┘


## A2. STYLING & DESIGN
────────────────────────────────────────────────────────────────────────────

┌────────────────────────────────────────────────────────────────────────┐
│ SKILL / TECHNOLOGY        │ PURPOSE                    │ PRIORITY     │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ Tailwind CSS 3.4+         │ Utility-first CSS,         │ ★★★★★ MUST  │
│                           │ responsive design,         │              │
│                           │ custom theme config,       │              │
│                           │ dark mode, animations,     │              │
│                           │ glass-morphism, gradients, │              │
│                           │ custom colors, shadows,    │              │
│                           │ @apply directives          │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ Framer Motion             │ Page transitions,          │ ★★★★★ MUST  │
│                           │ scroll animations,         │              │
│                           │ hover effects, stagger,    │              │
│                           │ AnimatePresence,           │              │
│                           │ motion components,         │              │
│                           │ useInView, useScroll,      │              │
│                           │ layout animations,         │              │
│                           │ variants, keyframes,       │              │
│                           │ gesture animations,        │              │
│                           │ parallax effects           │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ CSS3 Advanced             │ Grid, Flexbox, transitions,│ ★★★★☆ HIGH  │
│                           │ transforms, clip-path,     │              │
│                           │ backdrop-filter, clamp(),  │              │
│                           │ custom properties,         │              │
│                           │ @keyframes, pseudo-        │              │
│                           │ elements, media queries    │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ Lucide React Icons        │ Beautiful, consistent      │ ★★★★☆ HIGH  │
│                           │ icon library for all UI    │              │
│                           │ icons throughout the site  │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ Google Fonts               │ Plus Jakarta Sans, Inter,  │ ★★★★☆ HIGH  │
│ (next/font)               │ Playfair Display           │              │
│                           │ via next/font for          │              │
│                           │ performance optimization   │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ tailwind-merge            │ Merge Tailwind classes     │ ★★★☆☆ MED   │
│                           │ without conflicts (for     │              │
│                           │ reusable components)       │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ clsx / cn utility         │ Conditional CSS class      │ ★★★☆☆ MED   │
│                           │ names for components       │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ tailwindcss-animate       │ Pre-built animation        │ ★★★☆☆ MED   │
│                           │ utilities for Tailwind     │              │
└────────────────────────────────────────────────────────────────────────┘


## A3. UI COMPONENT LIBRARIES & PLUGINS
────────────────────────────────────────────────────────────────────────────

┌────────────────────────────────────────────────────────────────────────┐
│ SKILL / TECHNOLOGY        │ PURPOSE                    │ PRIORITY     │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ Swiper.js                 │ Testimonials slider, hero  │ ★★★★☆ HIGH  │
│                           │ carousel, doctor cards     │              │
│                           │ carousel, gallery slider   │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ React Hook Form           │ Form handling for          │ ★★★★★ MUST  │
│                           │ appointment booking,       │              │
│                           │ contact form, profile,     │              │
│                           │ login, register — with     │              │
│                           │ validation, error states   │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ Zod                       │ Schema validation for all  │ ★★★★★ MUST  │
│                           │ forms (client + server),   │              │
│                           │ integrates with React Hook │              │
│                           │ Form via @hookform/resolver│              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ React DatePicker          │ Date selection for         │ ★★★★☆ HIGH  │
│ or date-fns + custom      │ appointment booking        │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ React Hot Toast           │ Toast notifications for    │ ★★★★☆ HIGH  │
│ or Sonner                 │ form submissions, errors,  │              │
│                           │ success messages           │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ yet-another-react-        │ Lightbox for gallery       │ ★★★☆☆ MED   │
│ lightbox (YARL)           │ full-screen image viewer   │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ react-countup             │ Animated number counters   │ ★★★☆☆ MED   │
│                           │ for statistics section     │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ react-intersection-       │ Trigger animations when    │ ★★★☆☆ MED   │
│ observer                  │ elements enter viewport    │              │
│ (or custom hook)          │                            │              │
└────────────────────────────────────────────────────────────────────────┘


## A4. SEO & PERFORMANCE (USER PANEL SPECIFIC)
────────────────────────────────────────────────────────────────────────────

┌────────────────────────────────────────────────────────────────────────┐
│ SKILL / TECHNOLOGY        │ PURPOSE                    │ PRIORITY     │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ Next.js Metadata API      │ Dynamic meta tags, Open    │ ★★★★★ MUST  │
│                           │ Graph, Twitter Cards per   │              │
│                           │ page using generateMetadata│              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ next/image                │ Automatic image optimize,  │ ★★★★★ MUST  │
│                           │ lazy loading, responsive   │              │
│                           │ sizes, WebP conversion,    │              │
│                           │ blur placeholder           │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ next/font                 │ Font optimization,         │ ★★★★☆ HIGH  │
│                           │ self-hosting, no layout    │              │
│                           │ shift, variable fonts      │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ JSON-LD Structured Data   │ Schema.org markup for:     │ ★★★★☆ HIGH  │
│                           │ MedicalBusiness, Doctor,   │              │
│                           │ Service, Article, FAQ,     │              │
│                           │ BreadcrumbList — for       │              │
│                           │ rich Google search results │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ Sitemap Generation        │ Auto-generate sitemap.xml  │ ★★★★☆ HIGH  │
│ (next-sitemap)            │ for search engine crawling │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ Core Web Vitals           │ LCP, FID, CLS optimization│ ★★★★☆ HIGH  │
│ Optimization              │ for best Google rankings   │              │
└────────────────────────────────────────────────────────────────────────┘


## A5. MAPS & EXTERNAL INTEGRATIONS (USER PANEL)
────────────────────────────────────────────────────────────────────────────

┌────────────────────────────────────────────────────────────────────────┐
│ SKILL / TECHNOLOGY        │ PURPOSE                    │ PRIORITY     │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ Google Maps Embed         │ Show clinic location on    │ ★★★★☆ HIGH  │
│                           │ contact page               │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ Google reCAPTCHA v3       │ Spam protection on contact │ ★★★★☆ HIGH  │
│                           │ form and appointment form  │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ WhatsApp API              │ Click-to-chat floating     │ ★★★☆☆ MED   │
│ (wa.me link)              │ WhatsApp button            │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ Social Share APIs         │ Share blog posts on        │ ★★★☆☆ MED   │
│                           │ social media platforms     │              │
└────────────────────────────────────────────────────────────────────────┘



# ╔══════════════════════════════════════════════════════════════════════════╗
# ║                                                                        ║
# ║     SECTION B — ADMIN PANEL: REQUIRED SKILLS & TECHNOLOGIES           ║
# ║                                                                        ║
# ╚══════════════════════════════════════════════════════════════════════════╝


## B1. ADMIN-SPECIFIC UI COMPONENTS
────────────────────────────────────────────────────────────────────────────

┌────────────────────────────────────────────────────────────────────────┐
│ SKILL / TECHNOLOGY        │ PURPOSE                    │ PRIORITY     │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ Recharts                  │ Dashboard charts:          │ ★★★★★ MUST  │
│ (or Chart.js with         │ - Line charts (trends)     │              │
│  react-chartjs-2)         │ - Bar charts (comparisons) │              │
│                           │ - Pie/Donut charts         │              │
│                           │ - Area charts (revenue)    │              │
│                           │ - Sparkline mini charts    │              │
│                           │ Responsive, animated,      │              │
│                           │ tooltips, legends          │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ TanStack Table            │ Advanced data tables:      │ ★★★★★ MUST  │
│ (React Table v8)          │ - Sorting (multi-column)   │              │
│                           │ - Filtering (column-level) │              │
│                           │ - Pagination               │              │
│                           │ - Row selection             │              │
│                           │ - Column visibility toggle │              │
│                           │ - Column resizing          │              │
│                           │ - Expandable rows          │              │
│                           │ - Virtualization (for      │              │
│                           │   large datasets)          │              │
│                           │ Used in: appointments,     │              │
│                           │ patients, doctors,         │              │
│                           │ services, blog, messages,  │              │
│                           │ testimonials tables        │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ TipTap Editor             │ Rich text editor for:      │ ★★★★★ MUST  │
│ (or Quill / Slate)        │ - Blog post creation       │              │
│                           │ - Service descriptions     │              │
│                           │ - Doctor bio editing       │              │
│                           │ Features: bold, italic,    │              │
│                           │ headings, lists, links,    │              │
│                           │ images, tables, code       │              │
│                           │ blocks, video embeds,      │              │
│                           │ text alignment, undo/redo  │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ react-dropzone            │ Drag-and-drop file upload  │ ★★★★☆ HIGH  │
│                           │ for gallery images, doctor │              │
│                           │ photos, blog cover images, │              │
│                           │ service images             │              │
│                           │ Multi-file upload,         │              │
│                           │ preview, progress bar      │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ FullCalendar              │ Calendar view for          │ ★★★★☆ HIGH  │
│ (or custom calendar)      │ appointment management,    │              │
│                           │ doctor schedule view       │              │
│                           │ Monthly/Weekly/Daily views │              │
│                           │ Event click, drag-to-      │              │
│                           │ reschedule (optional)      │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ @dnd-kit/core             │ Drag-and-drop reordering   │ ★★★☆☆ MED   │
│                           │ for gallery images,        │              │
│                           │ service sort order         │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ Export Libraries:          │ Export reports and data:    │ ★★★☆☆ MED   │
│ - xlsx (SheetJS)          │ - Excel export (.xlsx)     │              │
│ - jspdf                   │ - PDF report generation    │              │
│ - react-csv               │ - CSV export              │              │
│ - html2canvas             │ - Screenshot charts        │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ date-fns or dayjs         │ Date formatting, relative  │ ★★★★☆ HIGH  │
│                           │ dates ("2 hours ago"),     │              │
│                           │ date calculations,         │              │
│                           │ calendar operations        │              │
└────────────────────────────────────────────────────────────────────────┘


## B2. ADMIN STATE MANAGEMENT
────────────────────────────────────────────────────────────────────────────

┌────────────────────────────────────────────────────────────────────────┐
│ SKILL / TECHNOLOGY        │ PURPOSE                    │ PRIORITY     │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ React Context API         │ Auth state, theme state,   │ ★★★★★ MUST  │
│                           │ notification state,        │              │
│                           │ sidebar collapse state     │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ SWR or TanStack Query     │ Server state management:   │ ★★★★☆ HIGH  │
│ (React Query)             │ - Data fetching with cache │              │
│                           │ - Auto-revalidation        │              │
│                           │ - Optimistic updates       │              │
│                           │ - Infinite scrolling       │              │
│                           │ - Mutation handling        │              │
│                           │ - Loading/error states     │              │
│                           │ Used for all admin CRUD    │              │
│                           │ operations                 │              │
└────────────────────────────────────────────────────────────────────────┘


## B3. ADMIN-SPECIFIC FEATURES
────────────────────────────────────────────────────────────────────────────

┌────────────────────────────────────────────────────────────────────────┐
│ SKILL / TECHNOLOGY        │ PURPOSE                    │ PRIORITY     │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ Admin Layout Building     │ Fixed sidebar + sticky     │ ★★★★★ MUST  │
│                           │ header + content area,     │              │
│                           │ responsive collapse,       │              │
│                           │ breadcrumb navigation      │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ CRUD Operations           │ Create, Read, Update,      │ ★★★★★ MUST  │
│                           │ Delete operations for all  │              │
│                           │ entities with proper       │              │
│                           │ error handling, validation,│              │
│                           │ confirmation dialogs       │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ Bulk Operations           │ Select multiple rows,      │ ★★★☆☆ MED   │
│                           │ perform actions on all:    │              │
│                           │ delete, status change,     │              │
│                           │ export                     │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ Search & Filter UI        │ Search bars, filter        │ ★★★★☆ HIGH  │
│                           │ dropdowns, date range      │              │
│                           │ pickers, status filters    │              │
│                           │ with URL state management  │              │
│                           │ (searchParams)             │              │
└────────────────────────────────────────────────────────────────────────┘



# ╔══════════════════════════════════════════════════════════════════════════╗
# ║                                                                        ║
# ║     SECTION C — SHARED SKILLS (USED BY BOTH PANELS)                   ║
# ║                                                                        ║
# ╚══════════════════════════════════════════════════════════════════════════╝


## C1. BACKEND & API DEVELOPMENT
────────────────────────────────────────────────────────────────────────────

┌────────────────────────────────────────────────────────────────────────┐
│ SKILL / TECHNOLOGY        │ PURPOSE                    │ PRIORITY     │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ Next.js API Routes        │ RESTful API endpoints      │ ★★★★★ MUST  │
│ (App Router - route.ts)   │ for all CRUD operations    │              │
│                           │ GET, POST, PUT, DELETE     │              │
│                           │ handlers in route.ts files │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ MongoDB                   │ Primary database for all   │ ★★★★★ MUST  │
│                           │ data storage               │              │
│                           │ MongoDB Atlas (cloud)      │              │
│                           │ Collections, documents,    │              │
│                           │ indexes, aggregation       │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ Mongoose                  │ MongoDB ODM:               │ ★★★★★ MUST  │
│                           │ - Schema definitions       │              │
│                           │ - Model creation           │              │
│                           │ - Validation               │              │
│                           │ - Middleware (pre/post)     │              │
│                           │ - Population (joins)       │              │
│                           │ - Indexing                 │              │
│                           │ - Virtuals                 │              │
│                           │ - Static methods           │              │
│                           │ - Instance methods         │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ RESTful API Design        │ Proper HTTP methods,       │ ★★★★★ MUST  │
│                           │ status codes (200, 201,    │              │
│                           │ 400, 401, 403, 404, 429,  │              │
│                           │ 500), error responses,     │              │
│                           │ pagination, filtering,     │              │
│                           │ sorting in APIs            │              │
└────────────────────────────────────────────────────────────────────────┘


## C2. AUTHENTICATION & AUTHORIZATION
────────────────────────────────────────────────────────────────────────────

┌────────────────────────────────────────────────────────────────────────┐
│ SKILL / TECHNOLOGY        │ PURPOSE                    │ PRIORITY     │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ jsonwebtoken (JWT)        │ Token creation, signing,   │ ★★★★★ MUST  │
│                           │ verification for access    │              │
│                           │ tokens and refresh tokens  │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ bcryptjs                  │ Password hashing (12+      │ ★★★★★ MUST  │
│                           │ rounds), password          │              │
│                           │ comparison on login        │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ Next.js Middleware        │ Route protection,          │ ★★★★★ MUST  │
│                           │ token verification,        │              │
│                           │ role-based redirects,      │              │
│                           │ security header injection  │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ Cookie Management         │ HttpOnly cookies for       │ ★★★★★ MUST  │
│ (cookies-next or          │ refresh tokens, secure     │              │
│  next/headers)            │ cookie attributes          │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ RBAC (Role-Based          │ user, admin, superadmin    │ ★★★★★ MUST  │
│ Access Control)           │ roles with permission      │              │
│                           │ checking middleware        │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ otplib (TOTP)             │ Two-factor authentication  │ ★★★☆☆ MED   │
│                           │ for admin accounts using   │              │
│                           │ Google Authenticator       │              │
└────────────────────────────────────────────────────────────────────────┘


## C3. SECURITY SKILLS
────────────────────────────────────────────────────────────────────────────

┌────────────────────────────────────────────────────────────────────────┐
│ SKILL / TECHNOLOGY        │ PURPOSE                    │ PRIORITY     │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ Input Validation          │ Server-side validation of  │ ★★★★★ MUST  │
│ (Zod schemas)             │ ALL API inputs — strings,  │              │
│                           │ numbers, emails, dates,    │              │
│                           │ enums, objects, arrays     │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ Input Sanitization        │ Prevent XSS attacks:       │ ★★★★★ MUST  │
│ (DOMPurify / isomorphic-  │ sanitize HTML content,     │              │
│  dompurify)               │ user inputs, rich text     │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ mongo-sanitize            │ Prevent NoSQL injection:   │ ★★★★★ MUST  │
│ (express-mongo-sanitize)  │ strip MongoDB operators    │              │
│                           │ from user input            │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ Rate Limiting             │ Prevent brute force and    │ ★★★★★ MUST  │
│ (upstash/ratelimit or     │ DDoS: limit API requests   │              │
│  custom implementation)   │ per IP/user per time       │              │
│                           │ window                     │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ CSRF Protection           │ Prevent cross-site request │ ★★★★☆ HIGH  │
│ (csrf tokens)             │ forgery on state-changing  │              │
│                           │ endpoints                  │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ Security Headers          │ CSP, HSTS, X-Frame,        │ ★★★★☆ HIGH  │
│ (next.config.js headers)  │ X-Content-Type, Referrer   │              │
│                           │ Policy via Next.js config  │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ CORS Configuration        │ Restrict API access to     │ ★★★★☆ HIGH  │
│                           │ same origin, no wildcard   │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ Helmet-like protection    │ Security best practices    │ ★★★★☆ HIGH  │
│ (custom in Next.js)       │ applied via middleware     │              │
│                           │ and config                 │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ Data Encryption           │ Encrypt sensitive data     │ ★★★☆☆ MED   │
│ (crypto / crypto-js)      │ at rest (medical records,  │              │
│                           │ 2FA secrets)               │              │
└────────────────────────────────────────────────────────────────────────┘


## C4. EMAIL & COMMUNICATION
────────────────────────────────────────────────────────────────────────────

┌────────────────────────────────────────────────────────────────────────┐
│ SKILL / TECHNOLOGY        │ PURPOSE                    │ PRIORITY     │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ Nodemailer                │ Send emails via SMTP:      │ ★★★★★ MUST  │
│                           │ - Appointment confirm      │              │
│                           │ - Password reset           │              │
│                           │ - Email verification       │              │
│                           │ - Contact form replies     │              │
│                           │ - Admin notifications      │              │
│                           │ - Appointment reminders    │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ React Email               │ Build beautiful, responsive│ ★★★☆☆ MED   │
│ (or HTML email templates) │ email templates using      │              │
│                           │ React components           │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ SMTP Provider             │ Email delivery service:    │ ★★★★☆ HIGH  │
│ (Gmail SMTP / SendGrid /  │ reliable email sending     │              │
│  Resend / Mailgun)        │ in production              │              │
└────────────────────────────────────────────────────────────────────────┘


## C5. FILE HANDLING & MEDIA
────────────────────────────────────────────────────────────────────────────

┌────────────────────────────────────────────────────────────────────────┐
│ SKILL / TECHNOLOGY        │ PURPOSE                    │ PRIORITY     │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ Cloudinary                │ Cloud image/media storage: │ ★★★★★ MUST  │
│ (cloudinary npm package)  │ - Upload images            │              │
│                           │ - Auto-optimization        │              │
│                           │ - Resize/crop on-the-fly   │              │
│                           │ - Generate thumbnails      │              │
│                           │ - CDN delivery             │              │
│                           │ - Secure URLs              │              │
│                           │ Used for: doctor photos,   │              │
│                           │ gallery, blog images,      │              │
│                           │ service images, avatars    │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ File Validation           │ Validate file type by      │ ★★★★☆ HIGH  │
│ (file-type npm package)   │ magic bytes (not just      │              │
│                           │ extension), size limits    │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ sharp (optional)          │ Server-side image          │ ★★★☆☆ MED   │
│                           │ processing: resize,        │              │
│                           │ compress, format convert   │              │
│                           │ before upload              │              │
└────────────────────────────────────────────────────────────────────────┘


## C6. DEVELOPMENT TOOLS & WORKFLOW
────────────────────────────────────────────────────────────────────────────

┌────────────────────────────────────────────────────────────────────────┐
│ SKILL / TECHNOLOGY        │ PURPOSE                    │ PRIORITY     │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ VS Code                   │ Primary code editor with   │ ★★★★★ MUST  │
│                           │ Claude Code extension      │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ Claude Code (AI)          │ AI-assisted development,   │ ★★★★★ MUST  │
│                           │ code generation, debugging,│              │
│                           │ problem solving            │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ Git & GitHub              │ Version control,           │ ★★★★★ MUST  │
│                           │ branching, commits,        │              │
│                           │ pull requests, .gitignore  │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ ESLint                    │ Code quality, error        │ ★★★★☆ HIGH  │
│                           │ detection, consistent      │              │
│                           │ coding style               │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ Prettier                  │ Code formatting,           │ ★★★★☆ HIGH  │
│                           │ consistent style across    │              │
│                           │ all files                  │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ npm / pnpm / yarn         │ Package manager for        │ ★★★★★ MUST  │
│                           │ dependency management      │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ dotenv                    │ Environment variable       │ ★★★★★ MUST  │
│ (.env.local)              │ management for secrets     │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ Postman / Thunder Client  │ API testing during         │ ★★★☆☆ MED   │
│                           │ development                │              │
└────────────────────────────────────────────────────────────────────────┘


## C7. DEPLOYMENT & INFRASTRUCTURE
────────────────────────────────────────────────────────────────────────────

┌────────────────────────────────────────────────────────────────────────┐
│ SKILL / TECHNOLOGY        │ PURPOSE                    │ PRIORITY     │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ Vercel                    │ Deployment platform:       │ ★★★★★ MUST  │
│                           │ - Auto-deploy from GitHub  │              │
│                           │ - Environment variables    │              │
│                           │ - Preview deployments      │              │
│                           │ - Serverless functions     │              │
│                           │ - Edge middleware          │              │
│                           │ - Analytics                │              │
│                           │ - Custom domain            │              │
│                           │ - SSL/TLS (automatic)      │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ MongoDB Atlas             │ Cloud-hosted MongoDB:      │ ★★★★★ MUST  │
│                           │ - Free tier (M0) or paid   │              │
│                           │ - Auto-scaling             │              │
│                           │ - Encryption at rest       │              │
│                           │ - IP whitelist             │              │
│                           │ - Automated backups        │              │
│                           │ - Monitoring               │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ Cloudinary (Cloud)        │ Media CDN & storage        │ ★★★★★ MUST  │
│                           │ for all uploaded images    │              │
├───────────────────────────┼────────────────────────────┼──────────────┤
│ Domain & DNS              │ Custom domain setup,       │ ★★★☆☆ MED   │
│                           │ DNS configuration          │              │
└────────────────────────────────────────────────────────────────────────┘



# ╔══════════════════════════════════════════════════════════════════════════╗
# ║                                                                        ║
# ║     SECTION D — COMPLETE NPM PACKAGES LIST                            ║
# ║                                                                        ║
# ╚══════════════════════════════════════════════════════════════════════════╝

## D1. PRODUCTION DEPENDENCIES
────────────────────────────────────────────────────────────────────────────

# Core Framework
next                        → Next.js framework
react                       → React library
react-dom                   → React DOM renderer

# Database
mongoose                    → MongoDB ODM

# Authentication & Security
jsonwebtoken                → JWT token handling
bcryptjs                    → Password hashing
cookie                      → Cookie parsing
jose                        → JWT for Edge middleware (works in Edge runtime)

# Validation
zod                         → Schema validation
@hookform/resolvers         → Zod resolver for React Hook Form

# Forms
react-hook-form             → Form management

# UI & Animations
framer-motion               → Animations & transitions
lucide-react                → Icons
swiper                      → Carousel/slider
clsx                        → Conditional classnames
tailwind-merge              → Merge Tailwind classes

# Charts (Admin)
recharts                    → Charts & graphs

# Data Tables (Admin)
@tanstack/react-table       → Advanced data tables

# Rich Text Editor (Admin)
@tiptap/react               → Rich text editor
@tiptap/starter-kit         → TipTap base extensions
@tiptap/extension-image     → Image support in editor
@tiptap/extension-link      → Link support in editor
@tiptap/extension-text-align → Text alignment
@tiptap/extension-underline → Underline support
@tiptap/extension-placeholder → Placeholder text

# Date & Time
date-fns                    → Date manipulation & formatting

# File Upload & Media
cloudinary                  → Cloud image upload
react-dropzone              → Drag & drop file upload

# Email
nodemailer                  → Email sending

# Toast Notifications
sonner                      → Toast notifications (or react-hot-toast)

# Calendar (Admin)
@fullcalendar/react         → Calendar component
@fullcalendar/daygrid       → Month view
@fullcalendar/timegrid      → Week/day view
@fullcalendar/interaction   → Click & drag events

# Drag & Drop (Admin)
@dnd-kit/core               → Drag and drop
@dnd-kit/sortable           → Sortable lists

# Counter Animation
react-countup               → Animated number counting

# Gallery
yet-another-react-lightbox  → Image lightbox

# Export (Admin)
xlsx                        → Excel export
jspdf                       → PDF generation

# Security
isomorphic-dompurify        → HTML sanitization (XSS prevention)
express-mongo-sanitize      → NoSQL injection prevention
@upstash/ratelimit          → Rate limiting
@upstash/redis              → Redis for rate limiting (or custom)

# SEO
next-sitemap                → Sitemap generation

# reCAPTCHA
react-google-recaptcha-v3   → Google reCAPTCHA

# 2FA (Optional)
otplib                      → TOTP generation for 2FA
qrcode                      → QR code generation for 2FA setup

# Utilities
nanoid                      → Unique ID generation (appointment IDs)
slugify                     → URL slug generation


## D2. DEVELOPMENT DEPENDENCIES
────────────────────────────────────────────────────────────────────────────

# TypeScript
typescript                  → TypeScript compiler
@types/react                → React type definitions
@types/node                 → Node.js type definitions
@types/jsonwebtoken         → JWT type definitions
@types/bcryptjs             → bcrypt type definitions
@types/cookie               → Cookie type definitions
@types/nodemailer           → Nodemailer type definitions

# Tailwind CSS
tailwindcss                 → Tailwind CSS framework
postcss                     → CSS processing
autoprefixer                → CSS vendor prefixes
tailwindcss-animate         → Animation utilities

# Linting & Formatting
eslint                      → Linter
eslint-config-next          → Next.js ESLint config
prettier                    → Code formatter
prettier-plugin-tailwindcss → Sort Tailwind classes

# Other
encoding                    → Required for some packages


## D3. INSTALLATION COMMANDS
────────────────────────────────────────────────────────────────────────────

### Create Project:
npx create-next-app@latest mintex-care --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

### Install Production Dependencies:
npm install mongoose jsonwebtoken bcryptjs cookie jose zod @hookform/resolvers react-hook-form framer-motion lucide-react swiper clsx tailwind-merge recharts @tanstack/react-table @tiptap/react @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-link @tiptap/extension-text-align @tiptap/extension-underline @tiptap/extension-placeholder date-fns cloudinary react-dropzone nodemailer sonner react-countup yet-another-react-lightbox isomorphic-dompurify nanoid slugify next-sitemap

### Install Admin-Specific:
npm install @fullcalendar/react @fullcalendar/daygrid @fullcalendar/timegrid @fullcalendar/interaction @dnd-kit/core @dnd-kit/sortable xlsx jspdf

### Install Security:
npm install @upstash/ratelimit @upstash/redis express-mongo-sanitize react-google-recaptcha-v3

### Install 2FA (Optional):
npm install otplib qrcode @types/qrcode

### Install Dev Dependencies:
npm install -D @types/jsonwebtoken @types/bcryptjs @types/cookie @types/nodemailer tailwindcss-animate prettier prettier-plugin-tailwindcss



# ╔══════════════════════════════════════════════════════════════════════════╗
# ║                                                                        ║
# ║     SECTION E — SKILL PROFICIENCY REQUIRED                            ║
# ║                                                                        ║
# ╚══════════════════════════════════════════════════════════════════════════╝


## E1. USER PANEL — SKILL PROFICIENCY MAP
────────────────────────────────────────────────────────────────────────────

  CATEGORY                    │ SKILL LEVEL NEEDED
  ────────────────────────────┼─────────────────────
  Next.js App Router          │ ████████░░ Advanced
  React Components & Hooks    │ ████████░░ Advanced
  TypeScript                  │ ███████░░░ Intermediate-Advanced
  Tailwind CSS                │ ████████░░ Advanced
  Framer Motion Animations    │ ███████░░░ Intermediate-Advanced
  Responsive Design           │ ████████░░ Advanced
  CSS3 (Grid, Flex, etc.)     │ ███████░░░ Intermediate-Advanced
  Form Handling (RHF + Zod)   │ ███████░░░ Intermediate-Advanced
  SEO Optimization            │ ██████░░░░ Intermediate
  Accessibility (a11y)        │ ██████░░░░ Intermediate
  Performance Optimization    │ ██████░░░░ Intermediate


## E2. ADMIN PANEL — SKILL PROFICIENCY MAP
────────────────────────────────────────────────────────────────────────────

  CATEGORY                    │ SKILL LEVEL NEEDED
  ────────────────────────────┼─────────────────────
  Next.js API Routes          │ ████████░░ Advanced
  MongoDB / Mongoose          │ ████████░░ Advanced
  CRUD Operations             │ ████████░░ Advanced
  Data Table Implementation   │ ███████░░░ Intermediate-Advanced
  Charts & Data Visualization │ ██████░░░░ Intermediate
  Rich Text Editor Setup      │ ██████░░░░ Intermediate
  File Upload System          │ ███████░░░ Intermediate-Advanced
  Dashboard Layout Building   │ ███████░░░ Intermediate-Advanced
  State Management            │ ███████░░░ Intermediate-Advanced
  Email System                │ ██████░░░░ Intermediate


## E3. SHARED SKILLS — PROFICIENCY MAP
────────────────────────────────────────────────────────────────────────────

  CATEGORY                    │ SKILL LEVEL NEEDED
  ────────────────────────────┼─────────────────────
  JWT Authentication          │ ████████░░ Advanced
  Password Hashing (bcrypt)   │ ███████░░░ Intermediate-Advanced
  Security (XSS, CSRF, etc.)  │ ████████░░ Advanced
  Rate Limiting               │ ██████░░░░ Intermediate
  Input Validation (Zod)      │ ███████░░░ Intermediate-Advanced
  Error Handling              │ ███████░░░ Intermediate-Advanced
  Git Version Control         │ ██████░░░░ Intermediate
  Vercel Deployment           │ ██████░░░░ Intermediate
  MongoDB Atlas Setup         │ ██████░░░░ Intermediate
  Cloudinary Setup            │ █████░░░░░ Basic-Intermediate
  Environment Variables       │ ██████░░░░ Intermediate
  REST API Design             │ ████████░░ Advanced



# ╔══════════════════════════════════════════════════════════════════════════╗
# ║                                                                        ║
# ║     SECTION F — CLAUDE CODE SPECIFIC INSTRUCTIONS                     ║
# ║                                                                        ║
# ╚══════════════════════════════════════════════════════════════════════════╝


## F1. HOW TO USE THESE FILES WITH CLAUDE CODE
────────────────────────────────────────────────────────────────────────────

When working with Claude Code in VS Code, reference these files:

1. Start by telling Claude Code:
   "Read the program.md and skills.md files in my project root.
    These contain the complete blueprint for my Mintex Care project."

2. Work phase by phase (as outlined in program.md Section G1).

3. For each component/page, reference the specific section:
   "Build the Homepage hero section as described in program.md
    Section B2.1, Section 3 (Hero Section)."

4. For security, always reference:
   "Implement security measures as outlined in program.md Section D."

5. For styling, reference:
   "Use the design system from program.md Section B1 (Design Philosophy)."

6. For admin features, reference:
   "Build the admin dashboard as described in program.md Section C2.2."


## F2. KEY REMINDERS FOR CLAUDE CODE
────────────────────────────────────────────────────────────────────────────

  ✅ ALWAYS use TypeScript (never plain JavaScript)
  ✅ ALWAYS add "use client" directive for client components
  ✅ ALWAYS validate inputs on BOTH client and server side
  ✅ ALWAYS use proper error handling (try/catch)
  ✅ ALWAYS hash passwords before storing
  ✅ ALWAYS verify JWT tokens on protected routes
  ✅ ALWAYS sanitize user inputs
  ✅ ALWAYS use environment variables for secrets
  ✅ NEVER expose sensitive data in client-side code
  ✅ NEVER trust client-side data — always validate server-side
  ✅ NEVER store passwords in plain text
  ✅ NEVER commit .env files to git
  ✅ FOLLOW the folder structure in program.md Section A2
  ✅ FOLLOW the design system in program.md Section B1
  ✅ USE the color palette, typography, and spacing defined


# ═══════════════════════════════════════════════════════════════════════════
# END OF skills.md
# ═══════════════════════════════════════════════════════════════════════════