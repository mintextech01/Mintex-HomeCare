import { useEffect, useRef } from "react";

interface ChromeBlob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
  phaseSpeed: number;
  colorIdx: number;
}

const PALETTE: [number, number, number][] = [
  [190, 210, 240], // steel blue chrome
  [220, 225, 245], // pale lavender chrome
  [200, 200, 215], // cool silver
  [155, 190, 235], // blue chrome
  [235, 238, 255], // near-white blue
  [170, 188, 222], // mid steel
  [210, 218, 238], // soft silver-blue
];

const LiquidChromeBackground = ({ className = "" }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const makeBlobs = (): ChromeBlob[] =>
      Array.from({ length: 8 }, (_, i) => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        radius: 180 + Math.random() * 280,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.003 + Math.random() * 0.005,
        colorIdx: i % PALETTE.length,
      }));

    const blobs = makeBlobs();
    let t = 0;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      // ── Dark chrome base ──────────────────────────────────────────────
      ctx.fillStyle = "#05080f";
      ctx.fillRect(0, 0, w, h);

      // ── Subtle deep-blue ambient gradient at top & bottom ─────────────
      const topGrad = ctx.createRadialGradient(w * 0.5, 0, 0, w * 0.5, 0, h * 0.65);
      topGrad.addColorStop(0, "rgba(30,55,120,0.28)");
      topGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = topGrad;
      ctx.fillRect(0, 0, w, h);

      // ── Chrome metallic blobs (screen blend = additive highlights) ────
      ctx.globalCompositeOperation = "screen";

      for (const blob of blobs) {
        blob.x += blob.vx;
        blob.y += blob.vy;
        blob.phase += blob.phaseSpeed;

        // wrap
        if (blob.x < -blob.radius) blob.x = w + blob.radius;
        else if (blob.x > w + blob.radius) blob.x = -blob.radius;
        if (blob.y < -blob.radius) blob.y = h + blob.radius;
        else if (blob.y > h + blob.radius) blob.y = -blob.radius;

        const pulse = 0.86 + 0.14 * Math.sin(blob.phase);
        const r = blob.radius * pulse;
        const [cr, cg, cb] = PALETTE[blob.colorIdx];

        // Offset highlight origin for a chrome-reflection look
        const hx = blob.x - r * 0.30;
        const hy = blob.y - r * 0.30;

        const g = ctx.createRadialGradient(hx, hy, 0, blob.x, blob.y, r);
        g.addColorStop(0,    `rgba(255,255,255,0.20)`);
        g.addColorStop(0.12, `rgba(${cr},${cg},${cb},0.18)`);
        g.addColorStop(0.40, `rgba(${Math.floor(cr*0.65)},${Math.floor(cg*0.70)},${Math.floor(cb*0.82)},0.11)`);
        g.addColorStop(0.75, `rgba(${Math.floor(cr*0.35)},${Math.floor(cg*0.38)},${Math.floor(cb*0.50)},0.04)`);
        g.addColorStop(1,    `rgba(0,0,0,0)`);

        ctx.beginPath();
        ctx.arc(blob.x, blob.y, r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      // ── Diagonal chrome sheen sweep ───────────────────────────────────
      const sheenX = ((t * 18) % (w + 400)) - 200;
      const sheen = ctx.createLinearGradient(sheenX, 0, sheenX + 350, h);
      sheen.addColorStop(0,   "rgba(0,0,0,0)");
      sheen.addColorStop(0.45, "rgba(210,228,255,0.045)");
      sheen.addColorStop(0.55, "rgba(230,240,255,0.055)");
      sheen.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.fillStyle = sheen;
      ctx.fillRect(0, 0, w, h);

      // ── Horizontal chrome highlight streak ────────────────────────────
      const streakY = h * (0.3 + 0.2 * Math.sin(t * 0.18));
      const streak = ctx.createLinearGradient(0, streakY - 90, 0, streakY + 90);
      streak.addColorStop(0,   "rgba(0,0,0,0)");
      streak.addColorStop(0.5, "rgba(200,220,255,0.038)");
      streak.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.fillStyle = streak;
      ctx.fillRect(0, 0, w, h);

      // ── Restore blend mode ────────────────────────────────────────────
      ctx.globalCompositeOperation = "source-over";

      // ── Vignette (edges darker) ───────────────────────────────────────
      const vig = ctx.createRadialGradient(w / 2, h / 2, h * 0.28, w / 2, h / 2, Math.max(w, h) * 0.85);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.62)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);

      t += 0.012;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
};

export default LiquidChromeBackground;
