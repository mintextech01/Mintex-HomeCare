import { useEffect, useRef, useState } from "react";
import { Move, ZoomIn, RotateCcw, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import type { ImageFrame } from "@/config/siteImageConfig";
import { type Crop, type FitQuality, MIN_SCALE, baseCrop, clampCrop, cropRect, encodeCrop, fitQuality, initialCrop } from "./imageFit";

/*
 * Every admin-managed photo is shown on the site with object-fit: cover inside a fixed box, so an
 * upload whose shape differs from the box gets cut off by the browser wherever it happens to fall.
 * Instead, uploads are cropped here to the box's exact shape (the admin drags / zooms to choose
 * what stays in), then saved at a size that stays sharp on retina screens.
 */

export const FitBadge = ({ quality, width, height }: { quality: FitQuality; width: number; height: number }) => {
  const size = `${Math.round(width)}×${Math.round(height)}px`;
  if (quality === "good") return (
    <p className="flex items-center gap-1.5 text-[11px] font-sans text-emerald-700 dark:text-emerald-400">
      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" /> Sharp fit ({size})
    </p>
  );
  if (quality === "soft") return (
    <p className="flex items-center gap-1.5 text-[11px] font-sans text-amber-700 dark:text-amber-400">
      <AlertTriangle className="h-3.5 w-3.5 shrink-0" /> Fits, but only {size} — may look slightly soft on large screens
    </p>
  );
  return (
    <p className="flex items-center gap-1.5 text-[11px] font-sans text-destructive">
      <XCircle className="h-3.5 w-3.5 shrink-0" /> Too small ({size}) — will look blurry here
    </p>
  );
};

/**
 * Inline cropper locked to `frame`'s shape. Drag the preview to reposition, use the slider to zoom.
 * Calls onApply with a JPEG data URI already cut to the frame, or onError if encoding fails.
 */
export const FramedImageCropper = ({
  image, frame, onApply, onCancel, onError,
}: {
  image: HTMLImageElement;
  frame: ImageFrame;
  onApply: (dataUrl: string) => void;
  onCancel: () => void;
  onError: (message: string) => void;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [crop, setCrop] = useState<Crop>(() => initialCrop(image, frame.aspect));
  const drag = useRef<{ x: number; y: number } | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => { setCrop(initialCrop(image, frame.aspect)); }, [image, frame.aspect]);

  const base = baseCrop(image, frame.aspect);
  // Zooming in is only allowed while the result stays sharp enough for this spot.
  const maxZoom = Math.max(1, Math.min(4, base.w / (frame.width * MIN_SCALE)));
  const rect = cropRect(image, frame.aspect, crop);

  // Redraw the preview at the canvas's real on-screen resolution
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const w = Math.round(canvas.clientWidth * dpr);
    const h = Math.round(w / frame.aspect);
    if (canvas.width !== w) canvas.width = w;
    if (canvas.height !== h) canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    ctx.imageSmoothingQuality = "high";
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(image, rect.x, rect.y, rect.w, rect.h, 0, 0, w, h);
  }, [image, frame.aspect, rect.x, rect.y, rect.w, rect.h]);

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drag.current) return;
    const scale = rect.w / e.currentTarget.clientWidth; // source px per screen px
    const dx = (e.clientX - drag.current.x) * scale;
    const dy = (e.clientY - drag.current.y) * scale;
    drag.current = { x: e.clientX, y: e.clientY };
    setCrop(c => clampCrop(image, frame.aspect, { ...c, cx: c.cx - dx, cy: c.cy - dy }));
  };
  const endDrag = () => { drag.current = null; };

  const apply = () => {
    setBusy(true);
    // Let the "Applying…" state paint before the (synchronous) encode
    setTimeout(() => {
      try { onApply(encodeCrop(image, frame, crop)); }
      catch (err) { onError(err instanceof Error ? err.message : "Could not process this image."); }
      finally { setBusy(false); }
    }, 0);
  };

  const canPan = base.w / crop.zoom < image.naturalWidth - 1 || base.h / crop.zoom < image.naturalHeight - 1;

  return (
    <div className="rounded-xl border border-primary/30 bg-primary/5 p-3 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-sans font-semibold text-foreground">Fit to frame ({frame.ratio})</p>
        {canPan && (
          <p className="flex items-center gap-1 text-[11px] font-sans text-muted-foreground">
            <Move className="h-3 w-3" /> Drag to reposition
          </p>
        )}
      </div>
      <canvas
        ref={canvasRef}
        className={`block w-full max-w-sm rounded-lg border border-border bg-muted touch-none select-none ${canPan ? "cursor-grab active:cursor-grabbing" : ""}`}
        style={{ aspectRatio: String(frame.aspect) }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        aria-label="Crop preview — exactly how the image will appear on the website"
      />
      {maxZoom > 1.01 && (
        <div className="flex items-center gap-3 max-w-sm">
          <ZoomIn className="h-4 w-4 text-muted-foreground shrink-0" />
          <Slider
            value={[crop.zoom]}
            min={1}
            max={maxZoom}
            step={0.01}
            onValueChange={([z]) => setCrop(c => clampCrop(image, frame.aspect, { ...c, zoom: z }))}
            aria-label="Zoom"
          />
        </div>
      )}
      <FitBadge quality={fitQuality(rect.w, frame)} width={Math.min(rect.w, frame.width)} height={Math.min(rect.w, frame.width) / frame.aspect} />
      <div className="flex flex-wrap gap-2">
        <Button size="sm" type="button" onClick={apply} disabled={busy} className="font-sans">
          {busy ? "Applying…" : "Use this crop"}
        </Button>
        <Button size="sm" type="button" variant="outline" onClick={() => setCrop(initialCrop(image, frame.aspect))} disabled={busy} className="font-sans">
          <RotateCcw className="h-3 w-3 mr-1" /> Reset
        </Button>
        <Button size="sm" type="button" variant="ghost" onClick={onCancel} disabled={busy} className="font-sans">
          Cancel
        </Button>
      </div>
    </div>
  );
};
