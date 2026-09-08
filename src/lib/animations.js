import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Checks if the user prefers reduced motion
 */
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Helper to smoothly interpolate between values
 */
export const lerp = (start, end, factor) => {
  return start + (end - start) * factor;
};

/**
 * Clamp a number between min and max
 */
export const clamp = (val, min, max) => {
  return Math.min(Math.max(val, min), max);
};
