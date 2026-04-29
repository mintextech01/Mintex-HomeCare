import { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import {
  Accessibility, ZoomIn, ZoomOut, RotateCcw, X,
  Sun, Eye, Type, Link, AlignJustify, MoveHorizontal, Pause, MousePointer2,
} from "lucide-react";

type A11yState = {
  fontSize: number;
  highContrast: boolean;
  grayscale: boolean;
  dyslexiaFont: boolean;
  letterSpacing: boolean;
  lineHeight: boolean;
  highlightLinks: boolean;
  pauseAnimations: boolean;
  bigCursor: boolean;
};

const DEFAULT: A11yState = {
  fontSize: 100,
  highContrast: false,
  grayscale: false,
  dyslexiaFont: false,
  letterSpacing: false,
  lineHeight: false,
  highlightLinks: false,
  pauseAnimations: false,
  bigCursor: false,
};

const CSS_CLASS: Partial<Record<keyof A11yState, string>> = {
  highContrast:    "high-contrast",
  grayscale:       "grayscale-mode",
  dyslexiaFont:    "dyslexia-font",
  letterSpacing:   "extra-spacing",
  lineHeight:      "large-line-height",
  highlightLinks:  "highlight-links",
  pauseAnimations: "pause-animations",
  bigCursor:       "big-text-cursor",
};

const ALL_CLASSES = Object.values(CSS_CLASS) as string[];

function applyClass(cls: string, on: boolean) {
  document.documentElement.classList.toggle(cls, on);
}

/* ── Inner toggle row ── */
function ToggleRow({
  label, active, onClick, icon,
}: {
  label: string; active: boolean; onClick: () => void; icon: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between text-sm font-sans px-3 py-2.5 rounded-xl transition-all ${
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "bg-muted/60 hover:bg-muted text-foreground"
      }`}
    >
      <span className="flex items-center gap-2.5">
        <span className="shrink-0">{icon}</span>
        <span>{label}</span>
      </span>
      {/* pill toggle */}
      <span
        className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${
          active ? "bg-white/30" : "bg-border"
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all duration-200 ${
            active ? "left-[18px]" : "left-0.5"
          }`}
        />
      </span>
    </button>
  );
}

/* ── Section label ── */
function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5 px-1">
      {children}
    </p>
  );
}

export default function AccessibilityButton() {
  const [open, setOpen] = useState(false);
  const [s, setS] = useState<A11yState>(DEFAULT);
  const panelRef = useRef<HTMLDivElement>(null);

  /* close panel on outside click */
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  /* font size */
  const changeFontSize = (delta: number) => {
    const next = Math.min(130, Math.max(80, s.fontSize + delta));
    setS(prev => ({ ...prev, fontSize: next }));
    document.documentElement.style.fontSize = `${next}%`;
  };

  /* boolean toggles */
  const toggle = (key: keyof Omit<A11yState, "fontSize">) => {
    const next = !s[key];
    setS(prev => ({ ...prev, [key]: next }));
    const cls = CSS_CLASS[key];
    if (cls) applyClass(cls, next);
  };

  /* reset everything */
  const reset = () => {
    setS(DEFAULT);
    document.documentElement.style.fontSize = "";
    ALL_CLASSES.forEach(cls => document.documentElement.classList.remove(cls));
  };

  const activeCount =
    (s.fontSize !== 100 ? 1 : 0) +
    [s.highContrast, s.grayscale, s.dyslexiaFont, s.letterSpacing,
     s.lineHeight, s.highlightLinks, s.pauseAnimations, s.bigCursor]
      .filter(Boolean).length;

  return (
    <div ref={panelRef} className="fixed bottom-6 right-4 md:right-6 z-50">

      {/* ── Panel ── */}
      {open && (
        <div className="mb-3 bg-card border border-border rounded-2xl shadow-2xl w-64 animate-fade-in overflow-hidden">

          {/* header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-primary/5">
            <div className="flex items-center gap-2">
              <Accessibility className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-foreground font-sans">Accessibility</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="h-6 w-6 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Close accessibility panel"
            >
              <X className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          </div>

          {/* scrollable body */}
          <div className="p-3 max-h-[75vh] overflow-y-auto space-y-4">

            {/* ── Vision ── */}
            <div>
              <SectionLabel>Vision</SectionLabel>
              <div className="space-y-1.5">

                {/* Text size row */}
                <div className="flex items-center justify-between bg-muted/60 px-3 py-2.5 rounded-xl">
                  <span className="flex items-center gap-2.5 text-sm font-sans text-foreground">
                    <Eye className="h-4 w-4 shrink-0" />
                    Text Size
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => changeFontSize(-10)}
                      disabled={s.fontSize <= 80}
                      className="h-6 w-6 rounded-lg bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label="Decrease text size"
                    >
                      <ZoomOut className="h-3 w-3" />
                    </button>
                    <span className="text-xs font-sans w-9 text-center font-semibold text-foreground">
                      {s.fontSize}%
                    </span>
                    <button
                      onClick={() => changeFontSize(10)}
                      disabled={s.fontSize >= 130}
                      className="h-6 w-6 rounded-lg bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label="Increase text size"
                    >
                      <ZoomIn className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                <ToggleRow
                  label="High Contrast"
                  active={s.highContrast}
                  onClick={() => toggle("highContrast")}
                  icon={<Sun className="h-4 w-4" />}
                />
                <ToggleRow
                  label="Grayscale"
                  active={s.grayscale}
                  onClick={() => toggle("grayscale")}
                  icon={<span className="h-4 w-4 text-base leading-none font-bold">◑</span>}
                />
              </div>
            </div>

            {/* ── Reading ── */}
            <div>
              <SectionLabel>Reading</SectionLabel>
              <div className="space-y-1.5">
                <ToggleRow
                  label="Dyslexia-Friendly Font"
                  active={s.dyslexiaFont}
                  onClick={() => toggle("dyslexiaFont")}
                  icon={<Type className="h-4 w-4" />}
                />
                <ToggleRow
                  label="Letter Spacing"
                  active={s.letterSpacing}
                  onClick={() => toggle("letterSpacing")}
                  icon={<MoveHorizontal className="h-4 w-4" />}
                />
                <ToggleRow
                  label="Line Height"
                  active={s.lineHeight}
                  onClick={() => toggle("lineHeight")}
                  icon={<AlignJustify className="h-4 w-4" />}
                />
                <ToggleRow
                  label="Highlight Links"
                  active={s.highlightLinks}
                  onClick={() => toggle("highlightLinks")}
                  icon={<Link className="h-4 w-4" />}
                />
              </div>
            </div>

            {/* ── Motion & Interaction ── */}
            <div>
              <SectionLabel>Motion &amp; Interaction</SectionLabel>
              <div className="space-y-1.5">
                <ToggleRow
                  label="Pause Animations"
                  active={s.pauseAnimations}
                  onClick={() => toggle("pauseAnimations")}
                  icon={<Pause className="h-4 w-4" />}
                />
                <ToggleRow
                  label="Large Cursor"
                  active={s.bigCursor}
                  onClick={() => toggle("bigCursor")}
                  icon={<MousePointer2 className="h-4 w-4" />}
                />
              </div>
            </div>

          </div>

          {/* reset footer */}
          <div className="px-3 pb-3 pt-2 border-t border-border">
            <button
              onClick={reset}
              disabled={activeCount === 0}
              className="w-full flex items-center justify-center gap-2 text-sm font-sans px-3 py-2 rounded-xl bg-destructive/10 hover:bg-destructive/20 text-destructive transition-colors disabled:opacity-35 disabled:cursor-not-allowed"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset All
            </button>
          </div>
        </div>
      )}

      {/* ── Trigger button ── */}
      <button
        onClick={() => setOpen(o => !o)}
        className="relative h-12 w-12 md:h-14 md:w-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:scale-110 transition-transform animate-fade-in"
        aria-label="Accessibility options"
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <Accessibility className="h-6 w-6" />
        {activeCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-[10px] font-bold font-sans flex items-center justify-center shadow">
            {activeCount}
          </span>
        )}
      </button>

    </div>
  );
}
