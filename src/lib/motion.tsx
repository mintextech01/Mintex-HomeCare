/**
 * Stand-in for the parts of framer-motion the site used (motion.*, AnimatePresence, useInView).
 *
 * The website has no animations, so framer-motion (~37 KB gzipped plus start-up work and forced
 * reflows on phones) is no longer loaded. `motion.div` etc. render the plain element and drop the
 * animation props; every animation on the site ended in the element's normal state (fully visible,
 * not moved), so the page looks the same as the end of the old animations.
 */
import { createElement, forwardRef, Fragment, type ComponentType, type ReactNode } from "react";

const MOTION_PROPS = new Set([
  "initial", "animate", "exit", "transition", "variants", "custom",
  "whileHover", "whileTap", "whileInView", "whileFocus", "whileDrag", "viewport",
  "layout", "layoutId", "onAnimationStart", "onAnimationComplete",
]);

type AnyProps = Record<string, unknown>;

const cache = new Map<string, unknown>();
const plain = (tag: string) => {
  if (!cache.has(tag)) {
    const C = forwardRef<Element, AnyProps>((props, ref) => {
      const rest: AnyProps = { ref };
      for (const k in props) if (!MOTION_PROPS.has(k)) rest[k] = props[k];
      return createElement(tag, rest);
    });
    C.displayName = `motion.${tag}`;
    cache.set(tag, C);
  }
  return cache.get(tag);
};

// motion.div, motion.p, motion.svg, ... — typed loosely like the JSX intrinsic elements plus motion props.
type MotionComponent = ComponentType<AnyProps & { children?: ReactNode }>;
export const motion = new Proxy({} as Record<string, MotionComponent>, {
  get: (_, tag: string) => plain(tag),
});

export const AnimatePresence = ({ children }: { children?: ReactNode; mode?: string; initial?: boolean }) =>
  createElement(Fragment, null, children);

/** Content is always shown, so everything counts as "in view". */
export const useInView = (..._args: unknown[]) => true;
