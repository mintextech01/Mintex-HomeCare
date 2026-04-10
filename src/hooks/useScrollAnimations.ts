import { useRef, useEffect, useState, useCallback, RefObject } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   3D TILT EFFECT — perspective + rotateX/Y on mouse move
   ═══════════════════════════════════════════════════════════════════════════ */
export function use3DTilt<T extends HTMLElement = HTMLDivElement>(
  intensity: number = 12,
  perspective: number = 800,
  scale: number = 1.02
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.transformStyle = "preserve-3d";
    el.style.transition = "transform 0.15s ease-out";

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(${perspective}px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale3d(${scale}, ${scale}, ${scale})`;
    };

    const handleLeave = () => {
      el.style.transition = "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)";
      el.style.transform = `perspective(${perspective}px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`;
      setTimeout(() => {
        el.style.transition = "transform 0.15s ease-out";
      }, 500);
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [intensity, perspective, scale]);

  return ref;
}

/* ═══════════════════════════════════════════════════════════════════════════
   3D TILT WITH GLOW — adds dynamic edge glow following cursor
   ═══════════════════════════════════════════════════════════════════════════ */
export function use3DTiltGlow<T extends HTMLElement = HTMLDivElement>(
  intensity: number = 15,
  glowColor: string = "88, 231, 251"
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.transformStyle = "preserve-3d";
    el.style.transition = "transform 0.15s ease-out, box-shadow 0.15s ease-out";

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const glowX = Math.round(x * 30);
      const glowY = Math.round(y * 30);
      el.style.transform = `perspective(800px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale3d(1.03, 1.03, 1.03)`;
      el.style.boxShadow = `${-glowX}px ${-glowY}px 40px rgba(${glowColor}, 0.15), 0 20px 60px rgba(0,0,0,0.15)`;
    };

    const handleLeave = () => {
      el.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.6s ease";
      el.style.transform = `perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`;
      el.style.boxShadow = "";
      setTimeout(() => {
        el.style.transition = "transform 0.15s ease-out, box-shadow 0.15s ease-out";
      }, 600);
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [intensity, glowColor]);

  return ref;
}

/* ═══════════════════════════════════════════════════════════════════════════
   PARALLAX ON SCROLL — translate element based on scroll position
   ═══════════════════════════════════════════════════════════════════════════ */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  speed: number = 0.3,
  direction: "y" | "x" = "y"
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.willChange = "transform";

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const viewportH = window.innerHeight;
        const center = rect.top + rect.height / 2 - viewportH / 2;
        const offset = center * speed;
        if (direction === "y") {
          el.style.transform = `translate3d(0, ${offset}px, 0)`;
        } else {
          el.style.transform = `translate3d(${offset}px, 0, 0)`;
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed, direction]);

  return ref;
}

/* ═══════════════════════════════════════════════════════════════════════════
   SCROLL PROGRESS — returns 0-1 progress of element through viewport
   ═══════════════════════════════════════════════════════════════════════════ */
export function useScrollProgress<T extends HTMLElement = HTMLDivElement>(): [
  RefObject<T | null>,
  number
] {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const viewportH = window.innerHeight;
        const start = viewportH;
        const end = -rect.height;
        const p = Math.min(Math.max((start - rect.top) / (start - end), 0), 1);
        setProgress(p);
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return [ref, progress];
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAGNETIC BUTTON — element follows cursor with spring
   ═══════════════════════════════════════════════════════════════════════════ */
export function useMagnetic<T extends HTMLElement = HTMLButtonElement>(
  strength: number = 0.35
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.transition = "transform 0.2s cubic-bezier(0.23, 1, 0.32, 1)";

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };

    const handleLeave = () => {
      el.style.transition = "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)";
      el.style.transform = "translate(0, 0)";
      setTimeout(() => {
        el.style.transition = "transform 0.2s cubic-bezier(0.23, 1, 0.32, 1)";
      }, 500);
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [strength]);

  return ref;
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE SCROLL PROGRESS — global 0-1 value for the entire page
   ═══════════════════════════════════════════════════════════════════════════ */
export function usePageScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}

/* ═══════════════════════════════════════════════════════════════════════════
   STAGGER CHILDREN — returns delay per index for cascade animations
   ═══════════════════════════════════════════════════════════════════════════ */
export function useStaggerDelay(baseDelay: number = 0.08) {
  return useCallback(
    (index: number) => ({
      delay: index * baseDelay,
    }),
    [baseDelay]
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SCROLL REVEAL — IntersectionObserver-based class toggle
   ═══════════════════════════════════════════════════════════════════════════ */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  threshold: number = 0.15
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.classList.add("scroll-reveal-hidden");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove("scroll-reveal-hidden");
          el.classList.add("scroll-reveal-visible");
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
