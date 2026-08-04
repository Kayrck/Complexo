import { useEffect } from "react";

const BASE_ANGLE = 156;

/**
 * Drives the --silk-angle custom property that the Silk Blend background
 * (theme.css, light-mode-only .bg-complexo-dark override) reads every
 * frame. Renders nothing itself — in dark mode the CSS rule simply doesn't
 * apply, so this keeps ticking harmlessly in the background.
 *
 * ph is re-derived from elapsed seconds (not accumulated per frame) so the
 * sway always starts at exactly 0 — no snap when the page loads.
 */
export const SilkBackgroundDriver = () => {
  useEffect(() => {
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = (now - start) / 1000;
      const ph = t * 0.4;
      const amt = 0.36;
      const dir = 1;
      const spin = ph * dir;
      const angle = BASE_ANGLE + Math.sin(spin * 0.6) * 24 * amt;

      document.documentElement.style.setProperty("--silk-angle", `${angle}deg`);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return null;
};
