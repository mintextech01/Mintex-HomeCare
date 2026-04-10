import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        serif: ["Poppins", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
        body: ["Montserrat", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        "hero-bg": "hsl(var(--hero-bg))",
        "footer-bg": "hsl(var(--footer-bg))",
        "footer-foreground": "hsl(var(--footer-foreground))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontSize: {
        "heading-h1": ["clamp(2rem, 5vw, 3.5rem)", { lineHeight: "1.1", fontWeight: "700", letterSpacing: "-0.01em" }],
        "heading-h2": ["clamp(1.75rem, 4vw, 3rem)", { lineHeight: "1.1", fontWeight: "600", letterSpacing: "-0.01em" }],
        "heading-h3": ["clamp(1.25rem, 3vw, 2rem)", { lineHeight: "1.2", fontWeight: "600", letterSpacing: "-0.01em" }],
        "label": ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.22em", fontWeight: "600" }],
      },
      letterSpacing: {
        "label": "0.22em",
        "heading": "-0.01em",
        "body": "0.04em",
      },
      opacity: {
        "subtle": "0.05",
        "light": "0.1",
        "medium": "0.15",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(10px)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)", opacity: "0.3" },
          "50%": { transform: "translateY(-30px)", opacity: "0.5" },
        },
        "slide-up-3d": {
          "0%": { opacity: "0", transform: "perspective(800px) translateY(60px) rotateX(10deg)" },
          "100%": { opacity: "1", transform: "perspective(800px) translateY(0) rotateX(0deg)" },
        },
        "depth-push": {
          "0%": { opacity: "0", transform: "perspective(1200px) translateZ(-200px) scale(0.85)", filter: "blur(6px)" },
          "100%": { opacity: "1", transform: "perspective(1200px) translateZ(0) scale(1)", filter: "blur(0)" },
        },
        "flip-3d": {
          "0%": { opacity: "0", transform: "perspective(600px) rotateY(-30deg) scale(0.9)" },
          "100%": { opacity: "1", transform: "perspective(600px) rotateY(0deg) scale(1)" },
        },
        "counter-flip": {
          "0%": { transform: "perspective(400px) rotateX(90deg)", opacity: "0" },
          "60%": { transform: "perspective(400px) rotateX(-10deg)", opacity: "1" },
          "80%": { transform: "perspective(400px) rotateX(5deg)" },
          "100%": { transform: "perspective(400px) rotateX(0deg)", opacity: "1" },
        },
        "float-rotate": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "25%": { transform: "translateY(-12px) rotate(1deg)" },
          "50%": { transform: "translateY(-20px) rotate(-1deg)" },
          "75%": { transform: "translateY(-8px) rotate(0.5deg)" },
        },
        "morph-blob": {
          "0%, 100%": { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
          "25%": { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%" },
          "50%": { borderRadius: "50% 60% 30% 60% / 30% 60% 70% 40%" },
          "75%": { borderRadius: "60% 30% 60% 40% / 70% 30% 50% 60%" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(38,104,188,0.1), 0 0 40px rgba(8,145,178,0.05)" },
          "50%": { boxShadow: "0 0 30px rgba(38,104,188,0.2), 0 0 60px rgba(8,145,178,0.1)" },
        },
        "scale-rotate-in": {
          "0%": { opacity: "0", transform: "scale(0.6) rotate(-8deg)" },
          "100%": { opacity: "1", transform: "scale(1) rotate(0deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.4s ease-out",
        "fade-out": "fade-out 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "float": "float 8s ease-in-out infinite",
        "float-slow": "float-slow 12s ease-in-out infinite",
        "slide-up-3d": "slide-up-3d 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "depth-push": "depth-push 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "flip-3d": "flip-3d 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "counter-flip": "counter-flip 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "float-rotate": "float-rotate 8s ease-in-out infinite",
        "morph-blob": "morph-blob 15s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "scale-rotate-in": "scale-rotate-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
