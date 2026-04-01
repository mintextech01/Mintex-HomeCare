# ============================================================================
# MINTEX CARE — COMPLETE PROJECT BLUEPRINT (program.md)
# ============================================================================
# Project      : Mintex Care — Healthcare & Wellness Platform
# Version      : 2.0 (Complete Redesign)
# Deployment   : Vercel (https://mintex-care-sigma.vercel.app/)
# Tool Used    : Claude Code in VS Code
# Panels       : 2 (User Panel + Admin Panel)
# Architecture : Linked panels with shared authentication & database
# ============================================================================


# ╔══════════════════════════════════════════════════════════════════════════╗
# ║                                                                        ║
# ║               SECTION A — PROJECT OVERVIEW & ARCHITECTURE              ║
# ║                                                                        ║
# ╚══════════════════════════════════════════════════════════════════════════╝


## A1. PROJECT SUMMARY
────────────────────────────────────────────────────────────────────────────

Mintex Care is a modern, luxury healthcare and wellness platform that connects
patients/users with healthcare services. The platform consists of TWO linked
panels:

  • USER PANEL   → Public-facing website for patients/users
  • ADMIN PANEL  → Dashboard for administrators to manage the entire platform

Both panels share a single database and authentication system, ensuring
seamless data flow and real-time synchronization between them.


## A2. FOLDER STRUCTURE
────────────────────────────────────────────────────────────────────────────

mintex-care/
│
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── services/
│   │   ├── doctors/
│   │   ├── testimonials/
│   │   ├── gallery/
│   │   ├── icons/
│   │   └── og/                          # Open Graph images for SEO
│   ├── fonts/
│   ├── videos/
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
│
├── src/
│   ├── app/
│   │   ├── (user)/                      # ── USER PANEL ROUTES ──
│   │   │   ├── layout.tsx               # User layout wrapper
│   │   │   ├── page.tsx                 # Homepage
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── services/
│   │   │   │   ├── page.tsx             # All services listing
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx         # Individual service detail
│   │   │   ├── doctors/
│   │   │   │   ├── page.tsx             # All doctors listing
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx         # Individual doctor profile
│   │   │   ├── appointments/
│   │   │   │   ├── page.tsx             # Book appointment
│   │   │   │   └── confirmation/
│   │   │   │       └── page.tsx         # Booking confirmation
│   │   │   ├── contact/
│   │   │   │   └── page.tsx
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx             # Blog listing
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx         # Blog post detail
│   │   │   ├── gallery/
│   │   │   │   └── page.tsx
│   │   │   ├── testimonials/
│   │   │   │   └── page.tsx
│   │   │   ├── faq/
│   │   │   │   └── page.tsx
│   │   │   ├── privacy-policy/
│   │   │   │   └── page.tsx
│   │   │   ├── terms/
│   │   │   │   └── page.tsx
│   │   │   └── profile/
│   │   │       ├── page.tsx             # User profile/dashboard
│   │   │       ├── appointments/
│   │   │       │   └── page.tsx         # My appointments
│   │   │       ├── medical-records/
│   │   │       │   └── page.tsx         # My medical records
│   │   │       └── settings/
│   │   │           └── page.tsx         # Account settings
│   │   │
│   │   ├── admin/                       # ── ADMIN PANEL ROUTES ──
│   │   │   ├── layout.tsx               # Admin layout wrapper
│   │   │   ├── login/
│   │   │   │   └── page.tsx             # Admin login
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx             # Main dashboard
│   │   │   ├── appointments/
│   │   │   │   ├── page.tsx             # All appointments management
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx         # Single appointment detail
│   │   │   ├── patients/
│   │   │   │   ├── page.tsx             # All patients
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx         # Patient detail
│   │   │   ├── doctors/
│   │   │   │   ├── page.tsx             # Manage doctors
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx         # Doctor detail/edit
│   │   │   ├── services/
│   │   │   │   ├── page.tsx             # Manage services
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx         # Service detail/edit
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx             # Manage blog posts
│   │   │   │   ├── create/
│   │   │   │   │   └── page.tsx         # Create new post
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx         # Edit post
│   │   │   ├── messages/
│   │   │   │   ├── page.tsx             # Contact form submissions
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx         # Message detail
│   │   │   ├── gallery/
│   │   │   │   └── page.tsx             # Manage gallery
│   │   │   ├── testimonials/
│   │   │   │   └── page.tsx             # Manage testimonials
│   │   │   ├── reports/
│   │   │   │   └── page.tsx             # Analytics & reports
│   │   │   ├── settings/
│   │   │   │   └── page.tsx             # Site settings
│   │   │   └── notifications/
│   │   │       └── page.tsx             # All notifications
│   │   │
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── page.tsx             # User login
│   │   │   ├── register/
│   │   │   │   └── page.tsx             # User registration
│   │   │   ├── forgot-password/
│   │   │   │   └── page.tsx
│   │   │   ├── reset-password/
│   │   │   │   └── page.tsx
│   │   │   └── verify-email/
│   │   │       └── page.tsx
│   │   │
│   │   ├── api/                         # ── API ROUTES ──
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── register/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── logout/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── forgot-password/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── reset-password/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── verify-email/
│   │   │   │   │   └── route.ts
│   │   │   │   └── refresh-token/
│   │   │   │       └── route.ts
│   │   │   ├── appointments/
│   │   │   │   ├── route.ts             # GET all, POST create
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts         # GET, PUT, DELETE single
│   │   │   ├── doctors/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts
│   │   │   ├── services/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts
│   │   │   ├── patients/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts
│   │   │   ├── blog/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts
│   │   │   ├── contact/
│   │   │   │   └── route.ts
│   │   │   ├── gallery/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts
│   │   │   ├── testimonials/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts
│   │   │   ├── upload/
│   │   │   │   └── route.ts             # File upload handler
│   │   │   ├── reports/
│   │   │   │   └── route.ts
│   │   │   ├── notifications/
│   │   │   │   └── route.ts
│   │   │   └── settings/
│   │   │       └── route.ts
│   │   │
│   │   ├── layout.tsx                   # Root layout
│   │   ├── globals.css                  # Global styles
│   │   ├── loading.tsx                  # Global loading state
│   │   ├── error.tsx                    # Global error boundary
│   │   └── not-found.tsx               # 404 page
│   │
│   ├── components/
│   │   ├── user/                        # ── USER COMPONENTS ──
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── MobileMenu.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── TopBar.tsx           # Contact info bar above navbar
│   │   │   │   └── ScrollToTop.tsx
│   │   │   ├── home/
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── ServicesSection.tsx
│   │   │   │   ├── AboutPreview.tsx
│   │   │   │   ├── DoctorsSection.tsx
│   │   │   │   ├── StatsCounter.tsx
│   │   │   │   ├── TestimonialsSlider.tsx
│   │   │   │   ├── GalleryPreview.tsx
│   │   │   │   ├── BlogPreview.tsx
│   │   │   │   ├── CTASection.tsx
│   │   │   │   ├── WhyChooseUs.tsx
│   │   │   │   ├── AppointmentCTA.tsx
│   │   │   │   └── PartnersLogos.tsx
│   │   │   ├── services/
│   │   │   │   ├── ServiceCard.tsx
│   │   │   │   ├── ServiceDetail.tsx
│   │   │   │   └── ServiceFilter.tsx
│   │   │   ├── doctors/
│   │   │   │   ├── DoctorCard.tsx
│   │   │   │   ├── DoctorProfile.tsx
│   │   │   │   └── DoctorFilter.tsx
│   │   │   ├── appointments/
│   │   │   │   ├── AppointmentForm.tsx
│   │   │   │   ├── DateTimePicker.tsx
│   │   │   │   ├── DoctorSelector.tsx
│   │   │   │   └── ConfirmationCard.tsx
│   │   │   ├── blog/
│   │   │   │   ├── BlogCard.tsx
│   │   │   │   ├── BlogDetail.tsx
│   │   │   │   └── BlogSidebar.tsx
│   │   │   ├── gallery/
│   │   │   │   ├── GalleryGrid.tsx
│   │   │   │   └── LightboxModal.tsx
│   │   │   ├── testimonials/
│   │   │   │   ├── TestimonialCard.tsx
│   │   │   │   └── TestimonialSlider.tsx
│   │   │   ├── contact/
│   │   │   │   ├── ContactForm.tsx
│   │   │   │   ├── ContactInfo.tsx
│   │   │   │   └── GoogleMap.tsx
│   │   │   └── profile/
│   │   │       ├── ProfileSidebar.tsx
│   │   │       ├── ProfileForm.tsx
│   │   │       ├── AppointmentHistory.tsx
│   │   │       └── MedicalRecords.tsx
│   │   │
│   │   ├── admin/                       # ── ADMIN COMPONENTS ──
│   │   │   ├── layout/
│   │   │   │   ├── AdminSidebar.tsx
│   │   │   │   ├── AdminHeader.tsx
│   │   │   │   ├── AdminFooter.tsx
│   │   │   │   ├── BreadcrumbNav.tsx
│   │   │   │   └── NotificationBell.tsx
│   │   │   ├── dashboard/
│   │   │   │   ├── StatsCards.tsx
│   │   │   │   ├── RevenueChart.tsx
│   │   │   │   ├── AppointmentChart.tsx
│   │   │   │   ├── RecentAppointments.tsx
│   │   │   │   ├── RecentPatients.tsx
│   │   │   │   ├── RecentMessages.tsx
│   │   │   │   ├── QuickActions.tsx
│   │   │   │   └── CalendarWidget.tsx
│   │   │   ├── appointments/
│   │   │   │   ├── AppointmentTable.tsx
│   │   │   │   ├── AppointmentDetail.tsx
│   │   │   │   ├── AppointmentFilters.tsx
│   │   │   │   ├── StatusBadge.tsx
│   │   │   │   └── AppointmentCalendar.tsx
│   │   │   ├── patients/
│   │   │   │   ├── PatientTable.tsx
│   │   │   │   ├── PatientDetail.tsx
│   │   │   │   ├── PatientForm.tsx
│   │   │   │   └── PatientHistory.tsx
│   │   │   ├── doctors/
│   │   │   │   ├── DoctorTable.tsx
│   │   │   │   ├── DoctorForm.tsx
│   │   │   │   └── DoctorSchedule.tsx
│   │   │   ├── services/
│   │   │   │   ├── ServiceTable.tsx
│   │   │   │   └── ServiceForm.tsx
│   │   │   ├── blog/
│   │   │   │   ├── BlogTable.tsx
│   │   │   │   ├── BlogEditor.tsx
│   │   │   │   └── BlogForm.tsx
│   │   │   ├── messages/
│   │   │   │   ├── MessageTable.tsx
│   │   │   │   └── MessageDetail.tsx
│   │   │   ├── gallery/
│   │   │   │   ├── GalleryManager.tsx
│   │   │   │   └── ImageUploader.tsx
│   │   │   ├── testimonials/
│   │   │   │   ├── TestimonialTable.tsx
│   │   │   │   └── TestimonialForm.tsx
│   │   │   ├── reports/
│   │   │   │   ├── ReportCharts.tsx
│   │   │   │   ├── ReportFilters.tsx
│   │   │   │   └── ExportButton.tsx
│   │   │   └── settings/
│   │   │       ├── GeneralSettings.tsx
│   │   │       ├── SEOSettings.tsx
│   │   │       ├── EmailSettings.tsx
│   │   │       └── SecuritySettings.tsx
│   │   │
│   │   └── shared/                      # ── SHARED COMPONENTS ──
│   │       ├── ui/
│   │       │   ├── Button.tsx
│   │       │   ├── Input.tsx
│   │       │   ├── Select.tsx
│   │       │   ├── Textarea.tsx
│   │       │   ├── Modal.tsx
│   │       │   ├── Dropdown.tsx
│   │       │   ├── Badge.tsx
│   │       │   ├── Card.tsx
│   │       │   ├── Table.tsx
│   │       │   ├── Pagination.tsx
│   │       │   ├── Tabs.tsx
│   │       │   ├── Accordion.tsx
│   │       │   ├── Toast.tsx
│   │       │   ├── Tooltip.tsx
│   │       │   ├── Skeleton.tsx
│   │       │   ├── Spinner.tsx
│   │       │   ├── Avatar.tsx
│   │       │   ├── FileUpload.tsx
│   │       │   ├── SearchBar.tsx
│   │       │   ├── DatePicker.tsx
│   │       │   ├── TimePicker.tsx
│   │       │   ├── ConfirmDialog.tsx
│   │       │   └── EmptyState.tsx
│   │       ├── animations/
│   │       │   ├── FadeIn.tsx
│   │       │   ├── SlideIn.tsx
│   │       │   ├── ScaleIn.tsx
│   │       │   ├── ParallaxWrapper.tsx
│   │       │   ├── CounterAnimation.tsx
│   │       │   ├── TextReveal.tsx
│   │       │   ├── StaggerChildren.tsx
│   │       │   ├── MagneticButton.tsx
│   │       │   ├── SmoothScroll.tsx
│   │       │   └── PageTransition.tsx
│   │       ├── SectionHeading.tsx
│   │       ├── Breadcrumb.tsx
│   │       ├── SEOHead.tsx
│   │       ├── WhatsAppButton.tsx
│   │       ├── CookieConsent.tsx
│   │       └── ErrorBoundary.tsx
│   │
│   ├── lib/
│   │   ├── db.ts                        # Database connection (MongoDB)
│   │   ├── auth.ts                      # Authentication utilities
│   │   ├── jwt.ts                       # JWT token handling
│   │   ├── bcrypt.ts                    # Password hashing
│   │   ├── email.ts                     # Email sending utilities
│   │   ├── upload.ts                    # File upload utilities
│   │   ├── validation.ts               # Input validation schemas (Zod)
│   │   ├── rate-limiter.ts             # API rate limiting
│   │   ├── csrf.ts                      # CSRF protection
│   │   ├── sanitize.ts                 # Input sanitization
│   │   ├── encryption.ts              # Data encryption utilities
│   │   ├── logger.ts                    # Application logging
│   │   ├── constants.ts               # App constants
│   │   ├── utils.ts                     # Helper functions
│   │   └── formatters.ts              # Date, currency formatters
│   │
│   ├── models/                          # ── DATABASE MODELS ──
│   │   ├── User.ts
│   │   ├── Admin.ts
│   │   ├── Doctor.ts
│   │   ├── Appointment.ts
│   │   ├── Service.ts
│   │   ├── BlogPost.ts
│   │   ├── ContactMessage.ts
│   │   ├── Testimonial.ts
│   │   ├── GalleryImage.ts
│   │   ├── Notification.ts
│   │   ├── AuditLog.ts
│   │   └── SiteSettings.ts
│   │
│   ├── hooks/                           # ── CUSTOM HOOKS ──
│   │   ├── useAuth.ts
│   │   ├── useAdmin.ts
│   │   ├── useFetch.ts
│   │   ├── useDebounce.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useMediaQuery.ts
│   │   ├── useIntersectionObserver.ts
│   │   ├── useScrollPosition.ts
│   │   ├── useClickOutside.ts
│   │   ├── useToast.ts
│   │   ├── usePagination.ts
│   │   └── useForm.ts
│   │
│   ├── context/                         # ── CONTEXT PROVIDERS ──
│   │   ├── AuthContext.tsx
│   │   ├── ThemeContext.tsx
│   │   ├── ToastContext.tsx
│   │   └── NotificationContext.tsx
│   │
│   ├── middleware.ts                    # Next.js middleware (auth, routes)
│   │
│   ├── types/                           # ── TYPESCRIPT TYPES ──
│   │   ├── user.ts
│   │   ├── admin.ts
│   │   ├── doctor.ts
│   │   ├── appointment.ts
│   │   ├── service.ts
│   │   ├── blog.ts
│   │   ├── contact.ts
│   │   ├── testimonial.ts
│   │   ├── gallery.ts
│   │   ├── notification.ts
│   │   ├── api.ts
│   │   └── common.ts
│   │
│   └── styles/
│       ├── globals.css
│       ├── animations.css
│       └── admin.css
│
├── .env.local                           # Environment variables
├── .env.example                         # Example env file
├── .gitignore
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── middleware.ts
├── program.md                           # This file
└── skills.md                            # Skills file


## A3. DATABASE ARCHITECTURE (SHARED BETWEEN BOTH PANELS)
────────────────────────────────────────────────────────────────────────────

Database: MongoDB (via MongoDB Atlas)
ODM: Mongoose

### Collections & Their Schemas:

┌─────────────────────────────────────────────────────────┐
│  COLLECTION: users                                       │
├─────────────────────────────────────────────────────────┤
│  _id              : ObjectId (auto)                      │
│  firstName        : String (required, trimmed)           │
│  lastName         : String (required, trimmed)           │
│  email            : String (required, unique, indexed)   │
│  password         : String (hashed with bcrypt, min 8)   │
│  phone            : String (validated format)            │
│  dateOfBirth      : Date                                 │
│  gender           : Enum [male, female, other]           │
│  address          : Object { street, city, state, zip }  │
│  avatar           : String (URL)                         │
│  role             : Enum [user] (default: user)          │
│  isEmailVerified  : Boolean (default: false)             │
│  verifyToken      : String                               │
│  resetToken       : String                               │
│  resetTokenExpiry : Date                                 │
│  refreshToken     : String                               │
│  lastLogin        : Date                                 │
│  loginAttempts    : Number (default: 0)                  │
│  isLocked         : Boolean (default: false)             │
│  lockUntil        : Date                                 │
│  isActive         : Boolean (default: true)              │
│  createdAt        : Date (auto)                          │
│  updatedAt        : Date (auto)                          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  COLLECTION: admins                                      │
├─────────────────────────────────────────────────────────┤
│  _id              : ObjectId (auto)                      │
│  name             : String (required)                    │
│  email            : String (required, unique, indexed)   │
│  password         : String (hashed with bcrypt)          │
│  phone            : String                               │
│  avatar           : String (URL)                         │
│  role             : Enum [admin, superadmin]              │
│  permissions      : Array of Strings                     │
│  isActive         : Boolean (default: true)              │
│  lastLogin        : Date                                 │
│  loginAttempts    : Number (default: 0)                  │
│  isLocked         : Boolean (default: false)             │
│  lockUntil        : Date                                 │
│  refreshToken     : String                               │
│  twoFactorEnabled : Boolean (default: false)             │
│  twoFactorSecret  : String (encrypted)                   │
│  createdAt        : Date (auto)                          │
│  updatedAt        : Date (auto)                          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  COLLECTION: doctors                                     │
├─────────────────────────────────────────────────────────┤
│  _id              : ObjectId (auto)                      │
│  name             : String (required)                    │
│  email            : String (required, unique)            │
│  phone            : String                               │
│  photo            : String (URL)                         │
│  specialization   : String (required)                    │
│  qualification    : String                               │
│  experience       : Number (years)                       │
│  bio              : String (rich text)                   │
│  services         : Array of ObjectId (ref: services)    │
│  availability     : Object {                             │
│                       monday: { start, end, isAvail },   │
│                       tuesday: { start, end, isAvail },  │
│                       ... (all 7 days)                   │
│                     }                                    │
│  consultationFee  : Number                               │
│  rating           : Number (1-5, calculated avg)         │
│  totalReviews     : Number                               │
│  isActive         : Boolean (default: true)              │
│  isFeatured       : Boolean (default: false)             │
│  slug             : String (auto-generated, unique)      │
│  socialLinks      : Object { linkedin, twitter, etc }    │
│  createdAt        : Date (auto)                          │
│  updatedAt        : Date (auto)                          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  COLLECTION: appointments                                │
├─────────────────────────────────────────────────────────┤
│  _id              : ObjectId (auto)                      │
│  appointmentId    : String (unique, auto: "APT-XXXXX")   │
│  patient          : ObjectId (ref: users, required)      │
│  doctor           : ObjectId (ref: doctors, required)    │
│  service          : ObjectId (ref: services, required)   │
│  date             : Date (required)                      │
│  timeSlot         : String (required, e.g. "10:00 AM")   │
│  status           : Enum [pending, confirmed, completed, │
│                          cancelled, no-show]              │
│  type             : Enum [in-person, online]             │
│  notes            : String (patient notes)               │
│  adminNotes       : String (internal notes)              │
│  prescription     : String                               │
│  followUpDate     : Date                                 │
│  paymentStatus    : Enum [pending, paid, refunded]       │
│  paymentAmount    : Number                               │
│  cancellationReason: String                              │
│  cancelledBy      : Enum [patient, admin, doctor]        │
│  reminderSent     : Boolean (default: false)             │
│  createdAt        : Date (auto)                          │
│  updatedAt        : Date (auto)                          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  COLLECTION: services                                    │
├─────────────────────────────────────────────────────────┤
│  _id              : ObjectId (auto)                      │
│  name             : String (required)                    │
│  slug             : String (unique, auto-generated)      │
│  shortDescription : String (max 200 chars)               │
│  fullDescription  : String (rich text)                   │
│  icon             : String (icon name or URL)            │
│  image            : String (URL)                         │
│  bannerImage      : String (URL)                         │
│  price            : Number                               │
│  priceRange       : Object { min, max }                  │
│  duration         : String (e.g., "30 mins")             │
│  category         : String                               │
│  features         : Array of Strings                     │
│  benefits         : Array of Strings                     │
│  faqs             : Array of { question, answer }        │
│  doctors          : Array of ObjectId (ref: doctors)     │
│  isActive         : Boolean (default: true)              │
│  isFeatured       : Boolean (default: false)             │
│  sortOrder        : Number (for custom ordering)         │
│  metaTitle        : String (SEO)                         │
│  metaDescription  : String (SEO)                         │
│  createdAt        : Date (auto)                          │
│  updatedAt        : Date (auto)                          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  COLLECTION: blogposts                                   │
├─────────────────────────────────────────────────────────┤
│  _id              : ObjectId (auto)                      │
│  title            : String (required)                    │
│  slug             : String (unique, auto-generated)      │
│  excerpt          : String (max 300 chars)               │
│  content          : String (rich text / HTML)            │
│  coverImage       : String (URL)                         │
│  author           : ObjectId (ref: admins)               │
│  category         : String                               │
│  tags             : Array of Strings                     │
│  status           : Enum [draft, published, archived]    │
│  publishedAt      : Date                                 │
│  views            : Number (default: 0)                  │
│  isFeatured       : Boolean (default: false)             │
│  metaTitle        : String (SEO)                         │
│  metaDescription  : String (SEO)                         │
│  createdAt        : Date (auto)                          │
│  updatedAt        : Date (auto)                          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  COLLECTION: contactmessages                             │
├─────────────────────────────────────────────────────────┤
│  _id              : ObjectId (auto)                      │
│  name             : String (required)                    │
│  email            : String (required)                    │
│  phone            : String                               │
│  subject          : String (required)                    │
│  message          : String (required)                    │
│  status           : Enum [unread, read, replied,         │
│                          archived]                       │
│  adminReply       : String                               │
│  repliedAt        : Date                                 │
│  repliedBy        : ObjectId (ref: admins)               │
│  isSpam           : Boolean (default: false)             │
│  ipAddress        : String                               │
│  createdAt        : Date (auto)                          │
│  updatedAt        : Date (auto)                          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  COLLECTION: testimonials                                │
├─────────────────────────────────────────────────────────┤
│  _id              : ObjectId (auto)                      │
│  patientName      : String (required)                    │
│  patientPhoto     : String (URL)                         │
│  designation      : String                               │
│  rating           : Number (1-5, required)               │
│  review           : String (required)                    │
│  service          : ObjectId (ref: services)             │
│  doctor           : ObjectId (ref: doctors)              │
│  isApproved       : Boolean (default: false)             │
│  isFeatured       : Boolean (default: false)             │
│  createdAt        : Date (auto)                          │
│  updatedAt        : Date (auto)                          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  COLLECTION: galleryimages                               │
├─────────────────────────────────────────────────────────┤
│  _id              : ObjectId (auto)                      │
│  title            : String                               │
│  description      : String                               │
│  imageUrl         : String (required)                    │
│  thumbnailUrl     : String                               │
│  category         : String (e.g., clinic, staff, events) │
│  altText          : String                               │
│  sortOrder        : Number                               │
│  isActive         : Boolean (default: true)              │
│  createdAt        : Date (auto)                          │
│  updatedAt        : Date (auto)                          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  COLLECTION: notifications                               │
├─────────────────────────────────────────────────────────┤
│  _id              : ObjectId (auto)                      │
│  recipient        : ObjectId (ref: admins or users)      │
│  recipientModel   : Enum [Admin, User]                   │
│  title            : String (required)                    │
│  message          : String (required)                    │
│  type             : Enum [appointment, message, system,  │
│                          alert, reminder]                │
│  link             : String (optional redirect URL)       │
│  isRead           : Boolean (default: false)             │
│  createdAt        : Date (auto)                          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  COLLECTION: auditlogs                                   │
├─────────────────────────────────────────────────────────┤
│  _id              : ObjectId (auto)                      │
│  action           : String (e.g., "CREATE_APPOINTMENT")  │
│  performedBy      : ObjectId (ref: admins or users)      │
│  performerModel   : Enum [Admin, User]                   │
│  targetModel      : String (e.g., "Appointment")        │
│  targetId         : ObjectId                             │
│  changes          : Object (before/after data)           │
│  ipAddress        : String                               │
│  userAgent        : String                               │
│  createdAt        : Date (auto)                          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  COLLECTION: sitesettings                                │
├─────────────────────────────────────────────────────────┤
│  _id              : ObjectId (auto)                      │
│  siteName         : String                               │
│  tagline          : String                               │
│  logo             : String (URL)                         │
│  favicon          : String (URL)                         │
│  contactEmail     : String                               │
│  contactPhone     : String                               │
│  contactPhone2    : String                               │
│  address          : String                               │
│  googleMapsEmbed  : String                               │
│  socialLinks      : Object { facebook, twitter,          │
│                      instagram, linkedin, youtube }      │
│  workingHours     : Object { weekdays, saturday,         │
│                      sunday }                            │
│  seoTitle         : String                               │
│  seoDescription   : String                               │
│  seoKeywords      : Array of Strings                     │
│  googleAnalytics  : String (GA tracking ID)              │
│  maintenanceMode  : Boolean (default: false)             │
│  whatsappNumber   : String                               │
│  emergencyNumber  : String                               │
│  updatedAt        : Date (auto)                          │
└─────────────────────────────────────────────────────────┘


## A4. HOW BOTH PANELS ARE LINKED
────────────────────────────────────────────────────────────────────────────

┌──────────────────┐       ┌─────────────────────┐
│                  │       │                     │
│   USER PANEL     │◄─────►│    SHARED DATABASE   │◄─────►│   ADMIN PANEL    │
│                  │       │    (MongoDB Atlas)   │       │                  │
│  - Books appts   │       │                     │       │  - Manages appts │
│  - Views services│       │  • users            │       │  - CRUD all data │
│  - Reads blog    │       │  • admins           │       │  - Views reports │
│  - Contacts      │       │  • doctors          │       │  - Sends emails  │
│  - Views doctors │       │  • appointments     │       │  - Moderates     │
│  - Reads gallery │       │  • services         │       │  - Settings      │
│                  │       │  • blogposts        │       │                  │
└──────────────────┘       │  • contactmessages  │       └──────────────────┘
                           │  • testimonials     │
                           │  • galleryimages    │
                           │  • notifications    │
                           │  • auditlogs        │
                           │  • sitesettings     │
                           └─────────────────────┘

LINKING MECHANISM:
  1. Shared MongoDB database — both panels read/write to the same DB
  2. Shared API routes — /api/* routes serve both panels
  3. Shared authentication system — JWT tokens with role-based access
  4. Real-time sync — When admin updates anything, user panel reflects
     changes immediately (via revalidation / ISR)
  5. Shared middleware — Route protection based on user role
  6. Notifications — Admin actions trigger user notifications & vice versa



# ╔══════════════════════════════════════════════════════════════════════════╗
# ║                                                                        ║
# ║         SECTION B — USER PANEL (COMPLETE DETAILED BLUEPRINT)           ║
# ║                                                                        ║
# ╚══════════════════════════════════════════════════════════════════════════╝


## B1. DESIGN PHILOSOPHY — USER PANEL
────────────────────────────────────────────────────────────────────────────

THEME         : Modern Luxury Healthcare
FEEL          : Premium, Trustworthy, Calming, Professional
INSPIRATION   : 5-star hospital websites, luxury wellness brands

### Color Palette:
  • Primary       : #0D9488 (Teal — Trust, Health, Calm)
  • Primary Dark  : #0F766E
  • Primary Light : #99F6E4
  • Secondary     : #1E293B (Dark Navy — Authority, Professionalism)
  • Accent        : #F59E0B (Gold — Luxury, Premium)
  • Accent Alt    : #8B5CF6 (Purple — for highlights)
  • Background    : #FFFFFF (White)
  • Surface       : #F8FAFC (Light Gray)
  • Surface Alt   : #F1F5F9
  • Text Primary  : #0F172A
  • Text Secondary: #64748B
  • Text Muted    : #94A3B8
  • Success       : #10B981
  • Warning       : #F59E0B
  • Error         : #EF4444
  • Info          : #3B82F6
  • Border        : #E2E8F0
  • Gradient 1    : linear-gradient(135deg, #0D9488, #0F766E)
  • Gradient 2    : linear-gradient(135deg, #1E293B, #334155)
  • Gradient 3    : linear-gradient(135deg, #0D9488, #3B82F6)

### Typography:
  • Headings      : "Plus Jakarta Sans" (Google Fonts) — Bold, Modern
  • Body          : "Inter" (Google Fonts) — Clean, Readable
  • Accent/Logo   : "Playfair Display" (Google Fonts) — Luxury Feel
  • Sizes         : Fluid typography using clamp()
    - H1 : clamp(2.5rem, 5vw, 4rem)
    - H2 : clamp(2rem, 4vw, 3rem)
    - H3 : clamp(1.5rem, 3vw, 2rem)
    - H4 : clamp(1.25rem, 2.5vw, 1.5rem)
    - Body: 1rem (16px)
    - Small: 0.875rem (14px)

### Spacing System (Tailwind):
  • Section padding : py-20 lg:py-28
  • Container       : max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
  • Card padding    : p-6 lg:p-8
  • Element gaps    : gap-6 lg:gap-8

### Border Radius:
  • Buttons   : rounded-xl (12px)
  • Cards     : rounded-2xl (16px)
  • Images    : rounded-2xl or rounded-3xl
  • Modals    : rounded-3xl (24px)
  • Badges    : rounded-full

### Shadows:
  • Card hover    : shadow-xl shadow-teal-500/10
  • Elevated      : shadow-2xl
  • Subtle        : shadow-sm
  • Navbar        : shadow-lg shadow-black/5

### Animation Principles:
  • Page transitions with Framer Motion
  • Scroll-triggered animations (fade up, slide in)
  • Smooth hover effects on all interactive elements
  • Parallax effects on hero section
  • Counter animations for statistics
  • Text reveal animations for headings
  • Stagger animations for card grids
  • Magnetic effect on CTA buttons
  • Smooth scroll behavior
  • Loading skeleton animations
  • Micro-interactions on form elements


## B2. USER PANEL — PAGE-BY-PAGE BLUEPRINT
────────────────────────────────────────────────────────────────────────────


### ═══════════════════════════════════════════
### PAGE B2.1: HOMEPAGE ( / )
### ═══════════════════════════════════════════

ROUTE: /
FILE: src/app/(user)/page.tsx

SECTIONS (in order from top to bottom):

───────────────────────────────────────
SECTION 1: TOP BAR
───────────────────────────────────────
  • Thin bar at the very top (dark background #1E293B)
  • Left side: Phone number + Email with icons
  • Right side: Working hours + Social media icons
  • Hides on scroll down, shows on scroll up
  • On mobile: simplified or hidden

───────────────────────────────────────
SECTION 2: NAVIGATION BAR
───────────────────────────────────────
  • Sticky navbar with glass-morphism effect (backdrop-blur)
  • Left: Mintex Care logo (text + icon)
  • Center: Navigation links:
    - Home
    - About Us
    - Services (with mega dropdown showing service categories)
    - Our Doctors
    - Gallery
    - Blog
    - Contact Us
  • Right: 
    - Search icon (opens search overlay)
    - "Book Appointment" CTA button (teal gradient, rounded, glow effect)
    - User avatar/login button
  • On scroll: navbar becomes more opaque with subtle shadow
  • Mobile: Hamburger menu → full-screen overlay menu with animations
  • Active link indicator: animated underline effect

───────────────────────────────────────
SECTION 3: HERO SECTION
───────────────────────────────────────
  • STYLE: Full-screen hero (100vh) with split layout
  • LEFT SIDE (60%):
    - Small animated badge: "🏥 Trusted Healthcare Since 20XX"
    - Main heading with text reveal animation:
      "Your Health, Our Priority" (line 1)
      "Excellence in Every Care" (line 2)
    - Subtitle paragraph (fade in with delay)
    - Two CTA buttons:
      → "Book Appointment" (primary, filled, with arrow icon)
      → "Explore Services" (outlined, with play/arrow icon)
    - Quick stats row below buttons:
      → "15+ Years Experience"
      → "50+ Expert Doctors"
      → "10K+ Happy Patients"
      (each with animated counter)
  • RIGHT SIDE (40%):
    - Hero image/video with decorative elements
    - Floating cards with animations:
      → "24/7 Emergency Care" (floating top-right)
      → "Online Consultation Available" (floating bottom-left)
    - Decorative shapes: circles, dots pattern, gradient blobs
  • Background: Subtle gradient overlay or pattern
  • Parallax scrolling effect on background
  • Particle/dot animation in background (subtle)

───────────────────────────────────────
SECTION 4: TRUSTED BY / PARTNERS LOGOS
───────────────────────────────────────
  • Heading: "Trusted by Leading Organizations"
  • Auto-scrolling logo marquee (infinite scroll)
  • Grayscale logos that get colored on hover
  • Subtle divider lines above and below

───────────────────────────────────────
SECTION 5: ABOUT US PREVIEW
───────────────────────────────────────
  • LAYOUT: Two columns
  • LEFT: Image collage (2-3 overlapping images with decorative border)
    - Main image: clinic/team photo
    - Smaller overlapping image: doctor caring for patient
    - Experience badge overlay: "15+ Years of Excellence"
  • RIGHT:
    - Section label: "ABOUT MINTEX CARE" (small, uppercase, teal)
    - Heading: "Providing Compassionate Healthcare Solutions"
    - Description paragraph (2-3 lines)
    - Feature list with checkmark icons:
      → "Board-Certified Specialists"
      → "State-of-the-Art Facilities"
      → "Patient-Centered Approach"
      → "24/7 Emergency Services"
    - "Learn More About Us" link/button
  • Animation: Slide in from left (image) and right (text)

───────────────────────────────────────
SECTION 6: SERVICES SECTION
───────────────────────────────────────
  • Section label: "OUR SERVICES"
  • Heading: "Comprehensive Healthcare Services"
  • Subtitle: "We provide a wide range of medical services..."
  • SERVICE CARDS GRID: 3 columns (desktop), 2 (tablet), 1 (mobile)
  • EACH CARD:
    - Icon (custom or Lucide icon) in a teal gradient circle
    - Service name (bold heading)
    - Short description (2-3 lines)
    - "Learn More →" link
    - Hover effect: card lifts up, shadow increases,
      icon scales, border-left with teal gradient
    - Subtle background pattern on hover
  • Show 6 services max, with "View All Services" button
  • Stagger animation on scroll (cards appear one by one)

───────────────────────────────────────
SECTION 7: WHY CHOOSE US
───────────────────────────────────────
  • LAYOUT: Full-width with dark/teal gradient background
  • Heading: "Why Choose Mintex Care?"
  • 4 columns grid with feature cards:
    → "Expert Doctors" — icon + description
    → "Modern Equipment" — icon + description
    → "Affordable Care" — icon + description
    → "24/7 Support" — icon + description
  • Each card: glass-morphism effect, white text, icon animation on hover
  • Background: subtle wave/curve pattern

───────────────────────────────────────
SECTION 8: STATISTICS COUNTER
───────────────────────────────────────
  • Background: Parallax image with dark overlay
  • 4 stat counters in a row:
    → Happy Patients: 10,000+
    → Expert Doctors: 50+
    → Years Experience: 15+
    → Awards Won: 25+
  • Each counter: Large animated number (counts up on scroll into view),
    label below, icon above
  • Counter animation triggers only once on intersection

───────────────────────────────────────
SECTION 9: OUR DOCTORS SECTION
───────────────────────────────────────
  • Section label: "MEET OUR TEAM"
  • Heading: "Our Expert Doctors"
  • DOCTOR CARDS: Horizontal scrollable or grid (4 columns)
  • EACH CARD:
    - Doctor photo (rounded-2xl, with teal border on hover)
    - Name (bold)
    - Specialization
    - Rating stars
    - Social links (appear on hover with slide-up animation)
    - "View Profile" button
    - Hover: image zoom, overlay gradient, social links slide up
  • "View All Doctors" button at bottom
  • Smooth carousel/swiper on mobile

───────────────────────────────────────
SECTION 10: APPOINTMENT CTA SECTION
───────────────────────────────────────
  • LAYOUT: Split — Left content, Right mini appointment form
  • LEFT:
    - Heading: "Book Your Appointment Today"
    - Description: "Take the first step towards better health..."
    - Phone number with click-to-call
    - Emergency badge
  • RIGHT:
    - Quick appointment form (compact):
      → Full Name input
      → Phone input
      → Service dropdown
      → Doctor dropdown
      → Date picker
      → Time slot selector
      → "Book Now" button (full-width, animated)
  • Background: Gradient or pattern
  • Form has validation and success animation

───────────────────────────────────────
SECTION 11: TESTIMONIALS SECTION
───────────────────────────────────────
  • Section label: "TESTIMONIALS"
  • Heading: "What Our Patients Say"
  • SWIPER/CAROUSEL with auto-play:
  • EACH TESTIMONIAL CARD:
    - Large quotation mark icon (decorative)
    - Review text
    - Star rating (★★★★★)
    - Patient photo (avatar)
    - Patient name
    - Service used
  • Navigation dots + arrows
  • Fade/slide transition

───────────────────────────────────────
SECTION 12: GALLERY PREVIEW
───────────────────────────────────────
  • Section label: "OUR GALLERY"
  • Heading: "Tour Our Facilities"
  • Masonry grid layout (6-8 images)
  • Each image: hover zoom effect with overlay text
  • Lightbox on click (full-screen image viewer)
  • "View Full Gallery" button
  • Filter tabs: All | Clinic | Staff | Events | Equipment

───────────────────────────────────────
SECTION 13: BLOG PREVIEW
───────────────────────────────────────
  • Section label: "LATEST NEWS"
  • Heading: "Health Tips & Articles"
  • 3 latest blog posts in a grid:
  • EACH BLOG CARD:
    - Cover image with category badge overlay
    - Date + Author
    - Title (bold, 2-line clamp)
    - Excerpt (2-line clamp)
    - "Read More →" link
    - Hover: image zoom, shadow lift
  • "View All Posts" button

───────────────────────────────────────
SECTION 14: FAQ PREVIEW
───────────────────────────────────────
  • Heading: "Frequently Asked Questions"
  • 5-6 most common questions in accordion style
  • Smooth expand/collapse animation
  • Icon rotates on open (chevron or plus/minus)
  • "View All FAQs" link

───────────────────────────────────────
SECTION 15: NEWSLETTER / CTA
───────────────────────────────────────
  • Full-width section with teal gradient background
  • Heading: "Stay Updated with Health Tips"
  • Subtitle: "Subscribe to our newsletter..."
  • Email input + "Subscribe" button (inline on desktop)
  • Privacy note below
  • Decorative elements (medical icons pattern)

───────────────────────────────────────
SECTION 16: FOOTER
───────────────────────────────────────
  • Dark background (#1E293B)
  • 4 columns:
    → Column 1: Logo, description, social media icons
    → Column 2: Quick Links (Home, About, Services, etc.)
    → Column 3: Our Services (list of top services)
    → Column 4: Contact Info (address, phone, email, hours)
  • Newsletter signup (repeated or just here)
  • Bottom bar: Copyright + Privacy Policy + Terms links
  • Back to top button (fixed, bottom-right)
  • WhatsApp floating button (fixed, bottom-right)


### ═══════════════════════════════════════════
### PAGE B2.2: ABOUT US ( /about )
### ═══════════════════════════════════════════

ROUTE: /about
FILE: src/app/(user)/about/page.tsx

SECTIONS:
  1. Page Hero Banner
     - Breadcrumb: Home > About Us
     - Title: "About Mintex Care"
     - Subtitle
     - Background: Gradient + pattern

  2. Our Story Section
     - Two columns: Image + Text
     - Detailed description of Mintex Care history
     - Mission statement

  3. Vision & Mission
     - Two elegant cards side by side
     - Vision card with icon
     - Mission card with icon
     - Animated border/glow effect

  4. Our Values
     - Grid of 4-6 value cards with icons:
       → Compassion, Excellence, Innovation,
         Integrity, Patient-First, Teamwork

  5. Team Overview
     - Key leadership team members
     - Photo, name, role, brief bio
     - Link to full doctors page

  6. Achievements / Milestones Timeline
     - Vertical timeline with year markers
     - Each milestone: year, event, description
     - Scroll animation (items fade in as you scroll)

  7. Certifications & Accreditations
     - Logos/badges of certifications
     - Brief description of each

  8. CTA Section
     - "Ready to experience the Mintex Care difference?"
     - Book Appointment button


### ═══════════════════════════════════════════
### PAGE B2.3: SERVICES ( /services )
### ═══════════════════════════════════════════

ROUTE: /services
FILE: src/app/(user)/services/page.tsx

SECTIONS:
  1. Page Hero Banner
     - Title: "Our Services"
     - Breadcrumb

  2. Service Filter Tabs
     - Category filters: All | General | Specialty | Diagnostic | etc.
     - Animated active tab indicator

  3. Services Grid
     - Cards with all service details
     - Filter animation (layout shift with Framer Motion)
     - Each card links to /services/[slug]

  4. CTA: Book Appointment


### ═══════════════════════════════════════════
### PAGE B2.4: SERVICE DETAIL ( /services/[slug] )
### ═══════════════════════════════════════════

ROUTE: /services/[slug]
FILE: src/app/(user)/services/[slug]/page.tsx

SECTIONS:
  1. Service Hero
     - Service name, banner image
     - Breadcrumb: Home > Services > Service Name

  2. Service Overview
     - Full description (rich text)
     - Key features list
     - Benefits

  3. Related Doctors
     - Doctors who offer this service
     - Mini doctor cards

  4. Pricing Information
     - Price or price range
     - Duration

  5. Service FAQs
     - Accordion with service-specific questions

  6. Book This Service
     - Inline appointment form pre-filled with service

  7. Related Services
     - 3-4 related service cards


### ═══════════════════════════════════════════
### PAGE B2.5: DOCTORS ( /doctors )
### ═══════════════════════════════════════════

ROUTE: /doctors
FILE: src/app/(user)/doctors/page.tsx

SECTIONS:
  1. Page Hero
  2. Filter/Search
     - Search by name
     - Filter by specialization
     - Filter by service
  3. Doctors Grid
     - Doctor cards with photo, name, specialty, rating
     - Click → /doctors/[id]
  4. CTA


### ═══════════════════════════════════════════
### PAGE B2.6: DOCTOR PROFILE ( /doctors/[id] )
### ═══════════════════════════════════════════

ROUTE: /doctors/[id]
FILE: src/app/(user)/doctors/[id]/page.tsx

SECTIONS:
  1. Doctor Hero Section
     - Large photo, name, specialization
     - Rating, experience, qualification
     - "Book with this Doctor" button

  2. About the Doctor
     - Detailed bio

  3. Services Offered
     - List of services this doctor provides

  4. Availability Schedule
     - Weekly availability table
     - Available time slots

  5. Patient Reviews
     - Testimonials from patients who visited this doctor

  6. Book Appointment Form
     - Pre-filled with doctor selection


### ═══════════════════════════════════════════
### PAGE B2.7: BOOK APPOINTMENT ( /appointments )
### ═══════════════════════════════════════════

ROUTE: /appointments
FILE: src/app/(user)/appointments/page.tsx

MULTI-STEP FORM:

  STEP 1: Select Service
    - Service cards to choose from
    - Search/filter

  STEP 2: Select Doctor
    - Available doctors for selected service
    - Doctor cards with availability info

  STEP 3: Select Date & Time
    - Calendar date picker (disable past dates, holidays)
    - Available time slots grid
    - Slot availability indicator

  STEP 4: Patient Information
    - Name, Email, Phone
    - Date of Birth, Gender
    - Notes/symptoms
    - Appointment type (in-person / online)

  STEP 5: Review & Confirm
    - Summary of all selections
    - Terms checkbox
    - "Confirm Booking" button

  STEP 6: Confirmation
    - Success animation (checkmark)
    - Appointment ID
    - Details summary
    - "Download/Print" button
    - "Add to Calendar" button
    - Email confirmation sent

FEATURES:
  - Progress bar showing current step
  - Step navigation (back/next)
  - Form validation at each step
  - Smooth step transitions
  - Auto-save draft
  - Mobile responsive


### ═══════════════════════════════════════════
### PAGE B2.8: CONTACT US ( /contact )
### ═══════════════════════════════════════════

ROUTE: /contact
FILE: src/app/(user)/contact/page.tsx

SECTIONS:
  1. Page Hero

  2. Contact Information Cards (3 cards)
     - Phone / Call Us
     - Email / Write to Us
     - Location / Visit Us
     Each card: icon, title, details, action button/link

  3. Contact Form + Map (split layout)
     LEFT: Contact Form
       - Name, Email, Phone, Subject, Message
       - reCAPTCHA / honeypot spam protection
       - Submit button with loading state
       - Success/error toast notification
     RIGHT: Google Maps embed
       - Interactive map
       - Clinic location pinned

  4. Working Hours
     - Table/card showing working hours per day

  5. Emergency Contact
     - Highlighted emergency number
     - "Available 24/7" badge


### ═══════════════════════════════════════════
### PAGE B2.9: BLOG ( /blog )
### ═══════════════════════════════════════════

ROUTE: /blog
FILE: src/app/(user)/blog/page.tsx

SECTIONS:
  1. Page Hero
  2. Featured Post (large card at top)
  3. Category Filter Tabs
  4. Blog Posts Grid (3 columns)
     - Paginated (12 per page)
     - Each card: image, category, date, title, excerpt
  5. Sidebar (on desktop):
     - Search
     - Categories list
     - Recent posts
     - Tags cloud
  6. Pagination


### ═══════════════════════════════════════════
### PAGE B2.10: BLOG POST ( /blog/[slug] )
### ═══════════════════════════════════════════

ROUTE: /blog/[slug]
FILE: src/app/(user)/blog/[slug]/page.tsx

SECTIONS:
  1. Post Header
     - Category badge, Date, Author
     - Title (large)
     - Cover image (full-width)
  2. Post Content (rich text rendered)
     - Proper heading hierarchy
     - Images, lists, quotes styled
  3. Tags
  4. Social Share Buttons
  5. Author Bio Card
  6. Related Posts (3 cards)
  7. Navigation (Previous/Next post)


### ═══════════════════════════════════════════
### PAGE B2.11: GALLERY ( /gallery )
### ═══════════════════════════════════════════

ROUTE: /gallery
FILE: src/app/(user)/gallery/page.tsx

SECTIONS:
  1. Page Hero
  2. Category Filter: All | Clinic | Staff | Events | Equipment
  3. Masonry Grid Layout
     - Lightbox on click
     - Image title on hover overlay
     - Smooth filter animation
  4. Load More / Pagination


### ═══════════════════════════════════════════
### PAGE B2.12: TESTIMONIALS ( /testimonials )
### ═══════════════════════════════════════════

ROUTE: /testimonials
FILE: src/app/(user)/testimonials/page.tsx

SECTIONS:
  1. Page Hero
  2. Overall Rating Summary (average + total reviews)
  3. Testimonial Cards Grid
     - Quote, rating, patient info
  4. Video Testimonials (if any)
  5. Submit Your Review CTA (for logged-in patients)


### ═══════════════════════════════════════════
### PAGE B2.13: FAQ ( /faq )
### ═══════════════════════════════════════════

ROUTE: /faq
FILE: src/app/(user)/faq/page.tsx

SECTIONS:
  1. Page Hero
  2. Search FAQs input
  3. Category tabs (General, Appointments, Services, etc.)
  4. Accordion FAQ list
  5. "Still have questions?" CTA → Contact page


### ═══════════════════════════════════════════
### PAGE B2.14: USER AUTH PAGES
### ═══════════════════════════════════════════

LOGIN ( /auth/login ):
  - Email + Password inputs
  - "Remember me" checkbox
  - "Forgot Password?" link
  - Login button
  - "Don't have an account? Register" link
  - Social login options (Google, etc.)
  - Form validation
  - Error handling
  - Rate limiting on login attempts

REGISTER ( /auth/register ):
  - First Name, Last Name
  - Email, Phone
  - Password (with strength indicator)
  - Confirm Password
  - Terms & Conditions checkbox
  - Register button
  - "Already have an account? Login" link
  - Email verification sent on register

FORGOT PASSWORD ( /auth/forgot-password ):
  - Email input
  - "Send Reset Link" button
  - Success message

RESET PASSWORD ( /auth/reset-password ):
  - New Password + Confirm
  - Password strength indicator
  - "Reset Password" button


### ═══════════════════════════════════════════
### PAGE B2.15: USER PROFILE DASHBOARD ( /profile )
### ═══════════════════════════════════════════

ROUTE: /profile
FILE: src/app/(user)/profile/page.tsx

LAYOUT:
  - Sidebar with navigation:
    → My Profile
    → My Appointments
    → Medical Records
    → Account Settings
    → Logout

MY PROFILE:
  - Profile photo upload
  - Personal info (editable)
  - Save changes button

MY APPOINTMENTS ( /profile/appointments ):
  - Tab filters: Upcoming | Past | Cancelled
  - Appointment cards with status, date, doctor, service
  - Actions: Cancel, Reschedule, View Details
  - Pagination

MEDICAL RECORDS ( /profile/medical-records ):
  - Past appointment history
  - Prescriptions
  - Download options

ACCOUNT SETTINGS ( /profile/settings ):
  - Change password
  - Email preferences
  - Notification settings
  - Delete account option


### ═══════════════════════════════════════════
### PAGE B2.16: UTILITY PAGES
### ═══════════════════════════════════════════

PRIVACY POLICY ( /privacy-policy ):
  - Standard privacy policy page
  - Clean typography, proper headings

TERMS & CONDITIONS ( /terms ):
  - Standard T&C page

404 NOT FOUND:
  - Custom design with illustration
  - "Back to Home" button
  - Search bar
  - Quick links

ERROR PAGE:
  - Custom error boundary
  - Retry button
  - Contact support link

LOADING:
  - Custom loading animation
  - Mintex Care logo pulse animation
  - Skeleton screens for content


## B3. USER PANEL — GLOBAL FEATURES
────────────────────────────────────────────────────────────────────────────

  1. RESPONSIVE DESIGN
     - Mobile-first approach
     - Breakpoints: sm(640) md(768) lg(1024) xl(1280) 2xl(1536)
     - Touch-friendly interfaces
     - Mobile navigation (hamburger → overlay)

  2. ANIMATIONS (Framer Motion)
     - Page transition animations
     - Scroll-triggered animations (fade, slide, scale)
     - Hover animations on cards and buttons
     - Loading skeleton animations
     - Counter animations for statistics
     - Parallax scrolling effects
     - Stagger animations for grids
     - Text reveal animations for headings
     - Magnetic button effects
     - Smooth scroll behavior

  3. ACCESSIBILITY (WCAG 2.1 AA)
     - Proper heading hierarchy
     - Alt text on all images
     - ARIA labels on interactive elements
     - Keyboard navigation support
     - Focus indicators
     - Color contrast compliance
     - Screen reader friendly
     - Skip to content link

  4. SEO OPTIMIZATION
     - Dynamic meta tags per page
     - Open Graph tags
     - Twitter Card tags
     - Structured data (JSON-LD) for:
       → Organization
       → Medical Business
       → Doctors (Person schema)
       → Services
       → Blog posts (Article schema)
       → FAQ (FAQPage schema)
       → Breadcrumbs
     - Sitemap.xml (auto-generated)
     - Robots.txt
     - Canonical URLs
     - Proper heading hierarchy
     - Image optimization (next/image)
     - Core Web Vitals optimization

  5. PERFORMANCE
     - Image optimization with next/image
     - Lazy loading for images and components
     - Code splitting
     - Font optimization
     - Prefetching critical routes
     - Service Worker for offline support (optional)
     - Bundle size optimization

  6. WHATSAPP INTEGRATION
     - Floating WhatsApp button (bottom-right)
     - Click to open WhatsApp with pre-filled message
     - Pulse animation on button

  7. COOKIE CONSENT
     - GDPR compliant cookie consent banner
     - Accept/Decline options
     - Cookie preferences management



# ╔══════════════════════════════════════════════════════════════════════════╗
# ║                                                                        ║
# ║         SECTION C — ADMIN PANEL (COMPLETE DETAILED BLUEPRINT)          ║
# ║                                                                        ║
# ╚══════════════════════════════════════════════════════════════════════════╝


## C1. DESIGN PHILOSOPHY — ADMIN PANEL
────────────────────────────────────────────────────────────────────────────

THEME         : Clean, Professional, Data-Dense Dashboard
FEEL          : Efficient, Organized, Powerful, Modern

### Color Palette:
  • Primary       : #0D9488 (Teal — same as user panel for brand consistency)
  • Sidebar BG    : #0F172A (Very Dark Navy)
  • Sidebar Text  : #94A3B8 (Muted Gray)
  • Sidebar Active : #0D9488 (Teal highlight)
  • Header BG     : #FFFFFF
  • Page BG       : #F1F5F9 (Light Gray)
  • Card BG       : #FFFFFF
  • Text Primary  : #0F172A
  • Text Secondary : #64748B
  • Border        : #E2E8F0
  • Status Colors:
    → Pending    : #F59E0B (Amber)
    → Confirmed  : #3B82F6 (Blue)
    → Completed  : #10B981 (Green)
    → Cancelled  : #EF4444 (Red)
    → No-Show    : #6B7280 (Gray)

### Typography:
  • Same as user panel for consistency
  • Slightly smaller base font in data tables (14px)

### Layout:
  • Fixed sidebar (260px width) — collapsible on mobile
  • Top header bar (64px height) — sticky
  • Content area with padding
  • Cards for grouping content
  • Responsive data tables


## C2. ADMIN PANEL — PAGE-BY-PAGE BLUEPRINT
────────────────────────────────────────────────────────────────────────────


### ═══════════════════════════════════════════
### PAGE C2.1: ADMIN LOGIN ( /admin/login )
### ═══════════════════════════════════════════

ROUTE: /admin/login
FILE: src/app/admin/login/page.tsx

  • Full-page centered login form
  • Mintex Care admin logo
  • Title: "Admin Panel Login"
  • Email input
  • Password input (with show/hide toggle)
  • "Remember me" checkbox
  • "Login" button (full width)
  • "Forgot Password?" link
  • Error messages for invalid credentials
  • Account lockout after 5 failed attempts (30 min)
  • Two-Factor Authentication (optional):
    - After email/password, show 2FA code input
    - Verify TOTP code
  • CSRF token protection
  • No "register" option (admin accounts created by superadmin only)
  • Background: subtle pattern or gradient


### ═══════════════════════════════════════════
### PAGE C2.2: DASHBOARD ( /admin/dashboard )
### ═══════════════════════════════════════════

ROUTE: /admin/dashboard
FILE: src/app/admin/dashboard/page.tsx

LAYOUT:
  ┌─────────────────────────────────────────────────────┐
  │ SIDEBAR │            HEADER BAR                      │
  │         │  ┌──────────────────────────────────────┐  │
  │ Logo    │  │ Breadcrumb    Search   Notifications │  │
  │         │  │                        Profile Menu  │  │
  │ ─────── │  └──────────────────────────────────────┘  │
  │ Nav     │                                            │
  │ Links   │  MAIN CONTENT AREA                         │
  │         │                                            │
  │ Dashboard│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────┐ │
  │ Appoint. │  │ Total  │ │ Today  │ │ Active │ │New │ │
  │ Patients │  │Patients│ │ Appts  │ │Doctors │ │Msgs│ │
  │ Doctors  │  └────────┘ └────────┘ └────────┘ └────┘ │
  │ Services │                                           │
  │ Blog     │  ┌──────────────────┐ ┌────────────────┐  │
  │ Messages │  │                  │ │                │  │
  │ Gallery  │  │ Appointment      │ │   Revenue      │  │
  │ Reviews  │  │ Chart (Line/Bar) │ │   Chart        │  │
  │ Reports  │  │                  │ │                │  │
  │ Settings │  └──────────────────┘ └────────────────┘  │
  │          │                                           │
  │ ─────── │  ┌──────────────────┐ ┌────────────────┐  │
  │ Logout   │  │ Recent           │ │ Recent         │  │
  │          │  │ Appointments     │ │ Messages       │  │
  │          │  │ (Table)          │ │ (List)         │  │
  │          │  └──────────────────┘ └────────────────┘  │
  └─────────────────────────────────────────────────────┘

COMPONENTS IN DETAIL:

  ROW 1: STATS CARDS (4 cards)
  ────────────────────────────
    Card 1: Total Patients
      - Icon: Users
      - Count: animated number
      - Trend: +12% from last month (green arrow up)
      - Mini sparkline chart
    Card 2: Today's Appointments
      - Icon: Calendar
      - Count: e.g., 24
      - Pending vs Completed breakdown
    Card 3: Active Doctors
      - Icon: Stethoscope
      - Count
    Card 4: New Messages
      - Icon: Mail
      - Count of unread messages
      - Badge if urgent
    * Each card: white bg, subtle shadow, left accent border,
      hover lift effect

  ROW 2: CHARTS (2 charts side by side)
  ────────────────────────────────────────
    Chart 1: Appointments Overview (Line/Bar Chart)
      - Time period selector: Week | Month | Year
      - Shows appointment trends
      - Color-coded by status
      - Powered by Recharts or Chart.js
    Chart 2: Revenue Overview (Area Chart)
      - Monthly revenue trend
      - Total revenue display
      - Comparison with previous period

  ROW 3: RECENT DATA (2 columns)
  ────────────────────────────────
    Left: Recent Appointments Table
      - Columns: ID, Patient, Doctor, Service, Date, Status, Actions
      - 5 most recent
      - Status badges (color-coded)
      - Quick action buttons (view, confirm, cancel)
      - "View All" link
    Right: Recent Messages
      - List of latest contact messages
      - Unread indicator
      - Name, subject, preview, time
      - Click to view full message
      - "View All" link

  ROW 4: ADDITIONAL WIDGETS
  ──────────────────────────
    - Calendar Widget (mini calendar showing today's appointments)
    - Quick Actions Panel:
      → Add New Doctor
      → Create Blog Post
      → View Reports
      → Site Settings
    - Recent Patient Registrations


### ═══════════════════════════════════════════
### PAGE C2.3: APPOINTMENTS MANAGEMENT
###            ( /admin/appointments )
### ═══════════════════════════════════════════

ROUTE: /admin/appointments
FILE: src/app/admin/appointments/page.tsx

FEATURES:

  HEADER:
    - Title: "Appointments Management"
    - "Add Appointment" button (manual booking by admin)

  FILTERS BAR:
    - Date range picker (from - to)
    - Status filter dropdown: All | Pending | Confirmed | Completed |
      Cancelled | No-Show
    - Doctor filter dropdown
    - Service filter dropdown
    - Search by patient name or appointment ID
    - "Reset Filters" button

  VIEW TOGGLE:
    - Table View (default)
    - Calendar View (full calendar with appointments as events)

  TABLE VIEW:
    ┌──────────────────────────────────────────────────────────────┐
    │ # │ Appt ID   │ Patient  │ Doctor  │ Service │ Date     │   │
    │   │           │          │         │         │ & Time   │   │
    │───┼───────────┼──────────┼─────────┼─────────┼──────────┼───│
    │ 1 │ APT-00124 │ John Doe │ Dr.Smith│ General │ 25 Jan   │ ● │
    │   │           │          │         │ Checkup │ 10:00 AM │   │
    │───┼───────────┼──────────┼─────────┼─────────┼──────────┼───│
    │   │           │          │         │         │          │   │
    └──────────────────────────────────────────────────────────────┘
    
    Additional columns:
    - Status (color-coded badge)
    - Payment Status
    - Actions dropdown:
      → View Details
      → Confirm Appointment
      → Mark as Completed
      → Cancel Appointment
      → Add Notes
      → Send Reminder Email
      → Delete (with confirmation)

  CALENDAR VIEW:
    - Monthly/Weekly/Daily view
    - Appointments shown as color-coded events
    - Click event to view details
    - Drag to reschedule (optional)

  APPOINTMENT DETAIL PAGE ( /admin/appointments/[id] ):
    - Full appointment details
    - Patient information
    - Doctor information
    - Service details
    - Status update controls
    - Admin notes (add/edit)
    - Prescription field
    - Follow-up date setter
    - Communication history
    - Audit log (who changed what, when)

  PAGINATION:
    - Items per page selector (10, 25, 50, 100)
    - Page navigation
    - Showing "X of Y results"

  BULK ACTIONS:
    - Select multiple appointments
    - Bulk status change
    - Bulk delete
    - Export selected to CSV/Excel


### ═══════════════════════════════════════════
### PAGE C2.4: PATIENTS MANAGEMENT
###            ( /admin/patients )
### ═══════════════════════════════════════════

ROUTE: /admin/patients
FILE: src/app/admin/patients/page.tsx

FEATURES:
  - Patient list table:
    → Name, Email, Phone, Registration Date, Total Appointments, Status
  - Search by name/email/phone
  - Filter by status (active/inactive)
  - Sort by any column
  - Patient Detail Page ( /admin/patients/[id] ):
    → Full profile information
    → Appointment history (with doctor, service, status, dates)
    → Medical records
    → Communication history
    → Notes
    → Account status toggle (active/deactive)
  - Export patient list (CSV/Excel)
  - Pagination


### ═══════════════════════════════════════════
### PAGE C2.5: DOCTORS MANAGEMENT
###            ( /admin/doctors )
### ═══════════════════════════════════════════

ROUTE: /admin/doctors
FILE: src/app/admin/doctors/page.tsx

FEATURES:
  - Doctor list table:
    → Photo, Name, Specialization, Experience, Rating, Status, Actions
  - "Add New Doctor" button → Opens form modal or dedicated page
  - Search & filter
  - DOCTOR FORM (Add/Edit):
    → Photo upload (with crop/resize)
    → Name, Email, Phone
    → Specialization (dropdown)
    → Qualification
    → Experience (years)
    → Bio (rich text editor)
    → Consultation Fee
    → Availability Schedule:
      - Monday through Sunday
      - Start time, End time, Is Available toggle for each day
    → Services they offer (multi-select)
    → Social Links
    → Is Featured toggle
    → Is Active toggle
  - Doctor Detail Page ( /admin/doctors/[id] ):
    → Full profile
    → Appointment history with this doctor
    → Performance metrics (total patients, rating, etc.)
    → Schedule management
  - Delete doctor (with confirmation + reassign appointments)


### ═══════════════════════════════════════════
### PAGE C2.6: SERVICES MANAGEMENT
###            ( /admin/services )
### ═══════════════════════════════════════════

ROUTE: /admin/services
FILE: src/app/admin/services/page.tsx

FEATURES:
  - Service list table:
    → Icon, Name, Category, Price, Status, Sort Order, Actions
  - "Add New Service" button
  - Drag-and-drop reorder (sort order)
  - SERVICE FORM (Add/Edit):
    → Service name
    → Slug (auto-generated, editable)
    → Short description
    → Full description (rich text editor with image support)
    → Icon selector
    → Image upload
    → Banner image upload
    → Price / Price range
    → Duration
    → Category
    → Features (dynamic add/remove list)
    → Benefits (dynamic add/remove list)
    → FAQs (dynamic add/remove Q&A pairs)
    → Assign doctors (multi-select)
    → Is Featured toggle
    → Is Active toggle
    → SEO: Meta title, Meta description
  - Delete service (with confirmation)


### ═══════════════════════════════════════════
### PAGE C2.7: BLOG MANAGEMENT
###            ( /admin/blog )
### ═══════════════════════════════════════════

ROUTE: /admin/blog
FILE: src/app/admin/blog/page.tsx

FEATURES:
  - Blog posts table:
    → Cover Image, Title, Category, Status, Views, Date, Actions
  - Filter by status: All | Draft | Published | Archived
  - "Create New Post" button → /admin/blog/create
  - BLOG EDITOR ( /admin/blog/create or /admin/blog/[id] ):
    → Title input
    → Slug (auto-generated from title)
    → Rich text editor (TipTap or similar):
      - Bold, Italic, Underline, Strikethrough
      - Headings (H1-H6)
      - Bullet lists, Numbered lists
      - Blockquote
      - Code block
      - Image upload/embed
      - Video embed
      - Links
      - Tables
      - Text alignment
    → Cover image upload
    → Excerpt / Summary
    → Category selector
    → Tags input (multi-tag, comma-separated)
    → Status: Draft / Published
    → Is Featured toggle
    → SEO: Meta title, Meta description
    → Preview button (opens in new tab)
    → Save as Draft / Publish button
    → Auto-save feature
  - Delete post (with confirmation)
  - Duplicate post


### ═══════════════════════════════════════════
### PAGE C2.8: MESSAGES MANAGEMENT
###            ( /admin/messages )
### ═══════════════════════════════════════════

ROUTE: /admin/messages
FILE: src/app/admin/messages/page.tsx

FEATURES:
  - Messages list/table:
    → Read/Unread indicator
    → Name, Email, Subject, Date, Status, Actions
  - Filter by status: All | Unread | Read | Replied | Archived
  - Search
  - MESSAGE DETAIL ( /admin/messages/[id] ):
    → Full message content
    → Sender details
    → Reply form (sends email to sender)
    → Mark as read/unread
    → Archive
    → Mark as spam
    → Delete
  - Bulk actions: Mark as read, Archive, Delete
  - Unread count badge in sidebar


### ═══════════════════════════════════════════
### PAGE C2.9: GALLERY MANAGEMENT
###            ( /admin/gallery )
### ═══════════════════════════════════════════

ROUTE: /admin/gallery
FILE: src/app/admin/gallery/page.tsx

FEATURES:
  - Gallery images grid (admin view)
  - Upload images:
    → Drag and drop zone
    → Multiple file upload
    → Progress indicator
    → Image preview before upload
  - For each image:
    → Edit title, description, category, alt text
    → Reorder (drag and drop)
    → Toggle active/inactive
    → Delete (with confirmation)
  - Filter by category
  - Bulk upload
  - Bulk delete


### ═══════════════════════════════════════════
### PAGE C2.10: TESTIMONIALS MANAGEMENT
###             ( /admin/testimonials )
### ═══════════════════════════════════════════

ROUTE: /admin/testimonials
FILE: src/app/admin/testimonials/page.tsx

FEATURES:
  - Testimonials list/table:
    → Patient Name, Rating, Review Preview, Approved, Featured, Actions
  - "Add Testimonial" button (admin can add manually)
  - TESTIMONIAL FORM (Add/Edit):
    → Patient Name
    → Patient Photo (upload)
    → Designation
    → Rating (1-5 star selector)
    → Review text
    → Associated service (dropdown)
    → Associated doctor (dropdown)
    → Is Approved toggle
    → Is Featured toggle
  - Approve/reject incoming reviews
  - Delete (with confirmation)


### ═══════════════════════════════════════════
### PAGE C2.11: REPORTS & ANALYTICS
###             ( /admin/reports )
### ═══════════════════════════════════════════

ROUTE: /admin/reports
FILE: src/app/admin/reports/page.tsx

FEATURES:
  - Date range selector
  - REPORT SECTIONS:

    1. Appointment Reports:
       → Total appointments (with trend)
       → Appointments by status (pie chart)
       → Appointments by service (bar chart)
       → Appointments by doctor (bar chart)
       → Daily/Weekly/Monthly trends (line chart)
       → Peak hours analysis

    2. Patient Reports:
       → New registrations over time
       → Patient demographics
       → Repeat patient rate
       → Top patients by visits

    3. Doctor Performance:
       → Appointments per doctor
       → Ratings per doctor
       → Patient satisfaction scores

    4. Service Analytics:
       → Most popular services
       → Revenue per service
       → Service trends

    5. Revenue Reports:
       → Total revenue
       → Revenue by service
       → Revenue by doctor
       → Monthly comparison

    6. Website Analytics:
       → Page views
       → Blog post views
       → Contact form submissions

  - Export reports (PDF, CSV, Excel)
  - Print report
  - Scheduled email reports (weekly/monthly)


### ═══════════════════════════════════════════
### PAGE C2.12: SITE SETTINGS
###             ( /admin/settings )
### ═══════════════════════════════════════════

ROUTE: /admin/settings
FILE: src/app/admin/settings/page.tsx

TABS:

  TAB 1: GENERAL SETTINGS
    - Site Name
    - Tagline / Slogan
    - Logo upload
    - Favicon upload
    - Contact Email
    - Contact Phone (primary + secondary)
    - Address
    - Google Maps embed code
    - WhatsApp Number
    - Emergency Number
    - Working Hours (per day)
    - Social Media Links (Facebook, Instagram, Twitter, LinkedIn, YouTube)

  TAB 2: SEO SETTINGS
    - Default Meta Title
    - Default Meta Description
    - Meta Keywords
    - Google Analytics Tracking ID
    - Google Search Console verification
    - Open Graph default image

  TAB 3: EMAIL SETTINGS
    - SMTP Configuration
    - Email templates for:
      → Appointment confirmation
      → Appointment reminder
      → Appointment cancellation
      → Welcome email (new user)
      → Password reset
      → Contact form auto-reply
    - Test email button

  TAB 4: SECURITY SETTINGS
    - Change admin password
    - Two-Factor Authentication setup
    - Session timeout duration
    - Login attempt limits
    - IP whitelist/blacklist
    - View login history
    - View audit logs

  TAB 5: MAINTENANCE
    - Maintenance mode toggle
    - Maintenance message customization
    - Database backup (manual trigger)
    - Clear cache

  TAB 6: ADMIN MANAGEMENT (superadmin only)
    - List of admin accounts
    - Add new admin
    - Edit admin permissions
    - Deactivate/delete admin
    - Role assignment (admin / superadmin)


### ═══════════════════════════════════════════
### PAGE C2.13: NOTIFICATIONS
###             ( /admin/notifications )
### ═══════════════════════════════════════════

ROUTE: /admin/notifications
FILE: src/app/admin/notifications/page.tsx

FEATURES:
  - All notifications list (chronological)
  - Filter: All | Unread | Read
  - Type icons: Appointment, Message, System, Alert
  - Mark as read/unread
  - Mark all as read
  - Delete notification
  - Click notification → navigate to relevant page
  - Real-time notification bell in header (count badge)


## C3. ADMIN PANEL — GLOBAL FEATURES
────────────────────────────────────────────────────────────────────────────

  1. SIDEBAR NAVIGATION
     - Fixed sidebar with collapsible option
     - Logo at top
     - Navigation links with icons
     - Active link highlight
     - Collapsible sub-menus
     - Notification badges on relevant items
     - Logout button at bottom
     - User info (name, role, avatar) at bottom

  2. TOP HEADER BAR
     - Breadcrumb navigation
     - Global search
     - Notification bell (with count badge + dropdown)
     - Admin profile dropdown:
       → My Profile
       → Settings
       → Logout
     - Mobile: hamburger to toggle sidebar

  3. RESPONSIVE DESIGN
     - Sidebar collapses to icon-only on tablet
     - Sidebar becomes overlay on mobile
     - Tables become scrollable or card-layout on mobile
     - Charts resize responsively

  4. DATA TABLES
     - Sortable columns
     - Searchable
     - Filterable
     - Pagination
     - Items per page selector
     - Row selection (checkboxes)
     - Bulk actions
     - Export (CSV, Excel)
     - Column visibility toggle
     - Loading skeletons
     - Empty state illustrations

  5. FORMS
     - Validation (real-time + on submit)
     - Error messages
     - Success notifications (toast)
     - Loading states on submit
     - Unsaved changes warning on navigate away
     - File upload with preview
     - Rich text editor
     - Date/time pickers

  6. CONFIRMATION DIALOGS
     - Delete confirmations ("Are you sure?")
     - Status change confirmations
     - Destructive action warnings (red button)

  7. TOAST NOTIFICATIONS
     - Success (green)
     - Error (red)
     - Warning (amber)
     - Info (blue)
     - Auto-dismiss (5 seconds)
     - Dismiss button
     - Stack multiple toasts



# ╔══════════════════════════════════════════════════════════════════════════╗
# ║                                                                        ║
# ║              SECTION D — SECURITY IMPLEMENTATION PLAN                  ║
# ║                                                                        ║
# ╚══════════════════════════════════════════════════════════════════════════╝


## D1. AUTHENTICATION & AUTHORIZATION SECURITY
────────────────────────────────────────────────────────────────────────────

  1. PASSWORD SECURITY
     ✅ Hash all passwords with bcrypt (12 salt rounds minimum)
     ✅ Minimum password requirements:
        - 8+ characters
        - 1 uppercase, 1 lowercase, 1 number, 1 special character
     ✅ Password strength indicator on registration
     ✅ Never store plain-text passwords
     ✅ Never return passwords in API responses
     ✅ Implement password history (prevent reusing last 5 passwords)

  2. JWT TOKEN SECURITY
     ✅ Short-lived access tokens (15 minutes expiry)
     ✅ Long-lived refresh tokens (7 days expiry)
     ✅ Refresh token rotation (new refresh token on each refresh)
     ✅ Store refresh tokens in HttpOnly, Secure, SameSite cookies
     ✅ Access tokens in memory only (never localStorage)
     ✅ Token blacklisting on logout
     ✅ Include essential claims only (userId, role)
     ✅ Use strong JWT secret (256-bit minimum)
     ✅ Different secrets for access and refresh tokens

  3. ROLE-BASED ACCESS CONTROL (RBAC)
     ✅ User roles: user, admin, superadmin
     ✅ Middleware to check role on every protected route
     ✅ API routes verify role before processing
     ✅ Admin routes only accessible to admin/superadmin
     ✅ Superadmin-only features (admin management, critical settings)
     ✅ Permission-based access for granular control

  4. BRUTE FORCE PROTECTION
     ✅ Rate limiting on login endpoints (5 attempts per 15 minutes)
     ✅ Account lockout after 5 failed attempts (30 minutes)
     ✅ Progressive delays on failed attempts
     ✅ CAPTCHA after 3 failed attempts
     ✅ Notify admin of suspicious login attempts
     ✅ Log all login attempts (success and failure)

  5. TWO-FACTOR AUTHENTICATION (2FA)
     ✅ Optional for users, recommended for admins
     ✅ TOTP-based (Google Authenticator / Authy compatible)
     ✅ Backup codes for account recovery
     ✅ 2FA setup with QR code


## D2. API SECURITY
────────────────────────────────────────────────────────────────────────────

  1. INPUT VALIDATION & SANITIZATION
     ✅ Validate ALL inputs on server-side (using Zod schemas)
     ✅ Sanitize inputs to prevent XSS (DOMPurify for rich text)
     ✅ Validate file uploads:
        - Check file type (whitelist: jpg, jpeg, png, gif, webp)
        - Check file size (max 5MB for images)
        - Check file content (magic bytes verification)
        - Rename files on upload (prevent path traversal)
        - Store in secure location (cloud storage like Cloudinary)
     ✅ Validate ObjectIds before database queries
     ✅ Validate pagination parameters
     ✅ Reject unexpected fields in request body

  2. RATE LIMITING
     ✅ Global rate limit: 100 requests per minute per IP
     ✅ Auth endpoints: 5 requests per 15 minutes per IP
     ✅ Contact form: 3 submissions per hour per IP
     ✅ Appointment booking: 5 per hour per user
     ✅ API endpoints: 60 requests per minute per user
     ✅ File uploads: 10 per hour per user
     ✅ Use upstash/ratelimit or custom implementation
     ✅ Return 429 Too Many Requests with retry-after header

  3. CSRF PROTECTION
     ✅ CSRF tokens for all state-changing requests
     ✅ SameSite cookie attribute (Strict or Lax)
     ✅ Verify Origin/Referer headers

  4. CORS CONFIGURATION
     ✅ Restrict allowed origins to your domain only
     ✅ Specify allowed methods (GET, POST, PUT, DELETE)
     ✅ Specify allowed headers
     ✅ No wildcard (*) in production

  5. HTTP SECURITY HEADERS
     ✅ Content-Security-Policy (CSP)
     ✅ X-Content-Type-Options: nosniff
     ✅ X-Frame-Options: DENY
     ✅ X-XSS-Protection: 1; mode=block
     ✅ Strict-Transport-Security (HSTS)
     ✅ Referrer-Policy: strict-origin-when-cross-origin
     ✅ Permissions-Policy (disable unused browser features)
     ✅ Set via next.config.js headers or middleware


## D3. DATA SECURITY
────────────────────────────────────────────────────────────────────────────

  1. DATABASE SECURITY
     ✅ Use MongoDB Atlas with IP whitelist
     ✅ Database user with minimal required permissions
     ✅ Enable MongoDB Atlas encryption at rest
     ✅ Enable TLS/SSL for database connections
     ✅ Use parameterized queries (Mongoose handles this)
     ✅ Never expose database connection string
     ✅ Regular database backups (automated)
     ✅ Database user password rotation schedule

  2. SENSITIVE DATA HANDLING
     ✅ Encrypt sensitive data at rest (medical records, etc.)
     ✅ Use environment variables for all secrets
     ✅ Never commit .env files to git
     ✅ Mask sensitive data in logs
     ✅ Secure data deletion (when user requests account deletion)
     ✅ Data minimization (collect only necessary data)

  3. ENVIRONMENT VARIABLES SECURITY
     ✅ All secrets in .env.local (not committed to git)
     ✅ .env.example with placeholder values
     ✅ Vercel environment variables for production
     ✅ Separate secrets for development and production
     ✅ Required env vars:
        MONGODB_URI=
        JWT_ACCESS_SECRET=
        JWT_REFRESH_SECRET=
        BCRYPT_SALT_ROUNDS=
        NEXT_PUBLIC_SITE_URL=
        SMTP_HOST=
        SMTP_PORT=
        SMTP_USER=
        SMTP_PASS=
        CLOUDINARY_CLOUD_NAME=
        CLOUDINARY_API_KEY=
        CLOUDINARY_API_SECRET=
        RECAPTCHA_SECRET_KEY=
        NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
        ADMIN_INITIAL_EMAIL=
        ADMIN_INITIAL_PASSWORD=


## D4. APPLICATION SECURITY
────────────────────────────────────────────────────────────────────────────

  1. XSS PREVENTION
     ✅ React's built-in XSS protection (JSX escaping)
     ✅ Sanitize user-generated rich text content (DOMPurify)
     ✅ Content-Security-Policy header
     ✅ Never use dangerouslySetInnerHTML with unsanitized data
     ✅ Sanitize URL parameters
     ✅ Validate and sanitize search queries

  2. SQL/NoSQL INJECTION PREVENTION
     ✅ Use Mongoose ODM (parameterized queries)
     ✅ Validate input types with Zod
     ✅ Sanitize MongoDB query operators ($gt, $lt, etc.)
     ✅ Use mongo-sanitize package
     ✅ Never concatenate user input into queries

  3. FILE UPLOAD SECURITY
     ✅ Validate file type (server-side, by content not just extension)
     ✅ Limit file size (5MB max)
     ✅ Use cloud storage (Cloudinary) — never store on server filesystem
     ✅ Generate unique filenames
     ✅ Scan for malicious content (optional: virus scanning)
     ✅ Restrict upload access to authenticated users only

  4. SESSION SECURITY
     ✅ Regenerate session on login
     ✅ Invalidate session on logout (clear cookies + blacklist token)
     ✅ Session timeout (15 min inactivity for admin)
     ✅ Concurrent session limits
     ✅ Force re-authentication for sensitive actions


## D5. MONITORING & AUDIT
────────────────────────────────────────────────────────────────────────────

  1. AUDIT LOGGING
     ✅ Log all admin actions (create, update, delete)
     ✅ Log authentication events (login, logout, failed attempts)
     ✅ Log data access (who viewed what patient data)
     ✅ Log settings changes
     ✅ Store in AuditLog collection with:
        - Action, performer, target, changes, IP, timestamp

  2. ERROR HANDLING
     ✅ Global error boundary (React)
     ✅ API error handler middleware
     ✅ Never expose stack traces to clients in production
     ✅ Generic error messages for users
     ✅ Detailed error logs server-side
     ✅ Error monitoring (optional: Sentry integration)

  3. MONITORING
     ✅ Vercel Analytics (built-in)
     ✅ API response time monitoring
     ✅ Error rate monitoring
     ✅ Uptime monitoring


## D6. NEXT.JS MIDDLEWARE SECURITY
────────────────────────────────────────────────────────────────────────────

FILE: src/middleware.ts

IMPLEMENTATION:
  ✅ Route protection:
     - /admin/* routes → require admin authentication
     - /profile/* routes → require user authentication
     - /api/admin/* routes → require admin token
     - /api/user/* routes → require user token
     - Public routes → no authentication needed
  ✅ Token verification on every protected request
  ✅ Role checking
  ✅ Redirect unauthorized users to login
  ✅ Security headers injection
  ✅ Rate limiting check
  ✅ Maintenance mode check



# ╔══════════════════════════════════════════════════════════════════════════╗
# ║                                                                        ║
# ║              SECTION E — EMAIL SYSTEM                                  ║
# ║                                                                        ║
# ╚══════════════════════════════════════════════════════════════════════════╝


## E1. EMAIL TEMPLATES
────────────────────────────────────────────────────────────────────────────

  1. Welcome Email (on user registration)
  2. Email Verification
  3. Password Reset
  4. Appointment Confirmation (to patient)
  5. Appointment Reminder (24 hours before, automated)
  6. Appointment Cancellation
  7. Appointment Status Update
  8. New Appointment Notification (to admin)
  9. Contact Form Auto-Reply (to sender)
  10. New Contact Message Notification (to admin)
  11. Admin Reply to Contact Message
  12. Newsletter Subscription Confirmation

EMAIL SERVICE: Nodemailer with SMTP (or Resend/SendGrid)
TEMPLATE ENGINE: React Email or HTML templates



# ╔══════════════════════════════════════════════════════════════════════════╗
# ║                                                                        ║
# ║              SECTION F — DEPLOYMENT & CONFIGURATION                    ║
# ║                                                                        ║
# ╚══════════════════════════════════════════════════════════════════════════╝


## F1. VERCEL DEPLOYMENT
────────────────────────────────────────────────────────────────────────────

  • Connect GitHub repository to Vercel
  • Set all environment variables in Vercel dashboard
  • Configure custom domain (if applicable)
  • Enable Vercel Analytics
  • Configure build settings:
    - Framework: Next.js
    - Build command: next build
    - Output directory: .next
  • Set up preview deployments for branches
  • Configure serverless function regions

## F2. NEXT.JS CONFIGURATION (next.config.js)
────────────────────────────────────────────────────────────────────────────

  • Image domains (Cloudinary, etc.)
  • Security headers
  • Redirects (old URLs)
  • Rewrites (if needed)
  • Compression
  • Power by header removal
  • Strict mode enabled

## F3. INITIAL SETUP SCRIPT
────────────────────────────────────────────────────────────────────────────

  • Seed initial admin account (from env vars)
  • Seed initial site settings
  • Create database indexes
  • Verify database connection
  • Verify email configuration


# ╔══════════════════════════════════════════════════════════════════════════╗
# ║                                                                        ║
# ║              SECTION G — DEVELOPMENT WORKFLOW                          ║
# ║                                                                        ║
# ╚══════════════════════════════════════════════════════════════════════════╝

## G1. DEVELOPMENT PHASES
────────────────────────────────────────────────────────────────────────────

  PHASE 1: PROJECT SETUP & FOUNDATION
    → Initialize Next.js 14+ project with TypeScript
    → Install all dependencies
    → Set up Tailwind CSS with custom theme
    → Configure ESLint & Prettier
    → Set up folder structure
    → Configure environment variables
    → Set up MongoDB connection
    → Create all database models
    → Implement authentication system (JWT + bcrypt)
    → Create middleware for route protection
    → Set up shared UI components library

  PHASE 2: USER PANEL - CORE PAGES
    → Build layout (Navbar, Footer, TopBar)
    → Build Homepage (all sections)
    → Build About page
    → Build Services listing & detail pages
    → Build Doctors listing & profile pages
    → Build Contact page with form
    → Add animations (Framer Motion)

  PHASE 3: USER PANEL - ADVANCED FEATURES
    → Build Appointment booking system (multi-step form)
    → Build Blog listing & detail pages
    → Build Gallery page
    → Build Testimonials page
    → Build FAQ page
    → Build User authentication pages (login, register, etc.)
    → Build User profile dashboard
    → Implement email sending

  PHASE 4: ADMIN PANEL - CORE
    → Build Admin login page
    → Build Admin layout (sidebar, header)
    → Build Dashboard with stats and charts
    → Build Appointments management (CRUD + table + filters)
    → Build Patients management

  PHASE 5: ADMIN PANEL - CONTENT MANAGEMENT
    → Build Doctors management (CRUD)
    → Build Services management (CRUD)
    → Build Blog management (CRUD + rich text editor)
    → Build Messages management
    → Build Gallery management (upload + organize)
    → Build Testimonials management

  PHASE 6: ADMIN PANEL - ADVANCED
    → Build Reports & Analytics page
    → Build Site Settings page (all tabs)
    → Build Notifications system
    → Build Audit logging
    → Implement email templates

  PHASE 7: SECURITY & OPTIMIZATION
    → Implement all security measures (Section D)
    → Add rate limiting
    → Add CSRF protection
    → Add security headers
    → Performance optimization
    → Image optimization
    → SEO implementation (meta tags, structured data)
    → Accessibility audit

  PHASE 8: TESTING & DEPLOYMENT
    → Test all user flows
    → Test all admin flows
    → Test responsive design
    → Test cross-browser compatibility
    → Test security measures
    → Fix bugs
    → Deploy to Vercel
    → Post-deployment testing
    → Monitor and iterate


# ═══════════════════════════════════════════════════════════════════════════
# END OF program.md
# ═══════════════════════════════════════════════════════════════════════════