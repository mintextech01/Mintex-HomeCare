import type { ImageFrame } from "@/config/siteImageConfig";

/*
 * Fitting admin uploads to the fixed frames they are shown in on the site (see FramedImageCropper).
 */

/** Below this share of frame.width the photo is shown larger than its real pixels — refuse it. */
export const MIN_SCALE = 0.45;
/** Below this share it's usable but a little soft on large / retina screens — warn. */
const GOOD_SCALE = 0.75;
/** Each site image is its own Firestore document (1 MiB max), stored as a base64 data URI. */
const MAX_DATA_URL_LENGTH = 900_000;
const MAX_FILE_BYTES = 25 * 1024 * 1024;

export type FitQuality = "good" | "soft" | "too-small";

/** How well an image `width` px wide fills `frame` — shared by the cropper and URL previews. */
export const fitQuality = (width: number, frame: ImageFrame): FitQuality =>
  width >= frame.width * GOOD_SCALE ? "good" : width >= frame.width * MIN_SCALE ? "soft" : "too-small";

/** Smallest image (in frame shape) the site accepts for this slot. */
export const minSizeFor = (frame: ImageFrame) => {
  const w = Math.ceil(frame.width * MIN_SCALE);
  return { w, h: Math.ceil(w / frame.aspect) };
};

/** Recommended size for a sharp result. */
export const idealSizeFor = (frame: ImageFrame) => ({ w: frame.width, h: Math.round(frame.width / frame.aspect) });

/** Decode a picked file, or throw an Error with a message an admin can act on. */
export const loadImageFile = (file: File): Promise<HTMLImageElement> => {
  if (!file.type.startsWith("image/") && !/\.(jpe?g|png|webp|gif|svg|avif|bmp)$/i.test(file.name)) {
    return Promise.reject(new Error(`"${file.name}" is not an image. Please choose a JPG, PNG or WEBP photo.`));
  }
  if (file.size > MAX_FILE_BYTES) {
    return Promise.reject(new Error(`This file is ${(file.size / 1024 / 1024).toFixed(0)} MB — the limit is 25 MB. Please choose a smaller photo.`));
  }
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      if (!img.naturalWidth || !img.naturalHeight) reject(new Error("This image has no size and can't be used. Please choose a JPG, PNG or WEBP photo."));
      else resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(/\.hei[cf]$/i.test(file.name)
        ? "iPhone HEIC photos can't be opened in the browser. Please export it as JPG first."
        : "This image couldn't be opened — it may be damaged or in an unsupported format. Please use JPG, PNG or WEBP."));
    };
    img.src = url;
  });
};

/** Largest crop of the frame's shape that fits inside the image, at zoom 1. */
export const baseCrop = (img: HTMLImageElement, aspect: number) =>
  img.naturalWidth / img.naturalHeight > aspect
    ? { w: img.naturalHeight * aspect, h: img.naturalHeight }
    : { w: img.naturalWidth, h: img.naturalWidth / aspect };

/** Throws if even the uncropped image is too small for this frame. */
export const assertFitsFrame = (img: HTMLImageElement, frame: ImageFrame) => {
  if (fitQuality(baseCrop(img, frame.aspect).w, frame) === "too-small") {
    const min = minSizeFor(frame);
    throw new Error(
      `This image is too small for this spot (${img.naturalWidth}×${img.naturalHeight}px) and would look blurry. ` +
      `Please use a photo at least ${min.w}×${min.h}px (ideally ${idealSizeFor(frame).w}×${idealSizeFor(frame).h}px).`,
    );
  }
};

export interface Crop { zoom: number; cx: number; cy: number }

export const clampCrop = (img: HTMLImageElement, aspect: number, c: Crop): Crop => {
  const base = baseCrop(img, aspect);
  const w = base.w / c.zoom, h = base.h / c.zoom;
  return {
    zoom: c.zoom,
    cx: Math.min(Math.max(c.cx, w / 2), img.naturalWidth - w / 2),
    cy: Math.min(Math.max(c.cy, h / 2), img.naturalHeight - h / 2),
  };
};

export const cropRect = (img: HTMLImageElement, aspect: number, c: Crop) => {
  const base = baseCrop(img, aspect);
  const w = base.w / c.zoom, h = base.h / c.zoom;
  return { x: c.cx - w / 2, y: c.cy - h / 2, w, h };
};

/** Start centred, but a little above middle when trimming top/bottom — faces are usually in the upper part of a photo. */
export const initialCrop = (img: HTMLImageElement, aspect: number): Crop =>
  clampCrop(img, aspect, { zoom: 1, cx: img.naturalWidth / 2, cy: img.naturalHeight * 0.42 });

export const encodeCrop = (img: HTMLImageElement, frame: ImageFrame, c: Crop): string => {
  const r = cropRect(img, frame.aspect, c);
  // Never upscale — the browser scales a smaller file up just as well, and the file stays small.
  let outW = Math.round(Math.min(frame.width, r.w));
  for (let attempt = 0; attempt < 4; attempt++) {
    const outH = Math.round(outW / frame.aspect);
    const canvas = document.createElement("canvas");
    canvas.width = outW;
    canvas.height = outH;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff"; // transparent PNGs would otherwise turn black as JPEG
    ctx.fillRect(0, 0, outW, outH);
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, r.x, r.y, r.w, r.h, 0, 0, outW, outH);
    for (const q of [0.86, 0.78, 0.7]) {
      const url = canvas.toDataURL("image/jpeg", q);
      if (url.length <= MAX_DATA_URL_LENGTH) return url;
    }
    outW = Math.round(outW * 0.8);
  }
  throw new Error("This photo is too detailed to store even after compressing. Please try a different photo.");
};
