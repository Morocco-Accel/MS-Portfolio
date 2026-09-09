"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { RAINBOW_COLORS } from "@/components/ScrollProgress/ScrollProgress";
import { getLenisInstance } from "@/components/SmoothScroll/lenisInstance";

const BUBBLE_GRADIENT = `linear-gradient(135deg, ${RAINBOW_COLORS.join(", ")})`;

/**
 * Fixed circular "scroll to top" button. Hidden until the page has
 * scrolled past the hero, then rides in/out with the rest of the page.
 * Hovering fills it with a rainbow bubble — the same gradient as the
 * scroll-progress bar and the education timeline — that scales up from
 * the center and is clipped to the circle.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 480);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleClick() {
    const lenis = getLenisInstance();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={handleClick}
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 end-6 z-40 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-[#0b0f14]/85 text-white shadow-lg backdrop-blur-sm"
        >
          <motion.span
            aria-hidden="true"
            animate={{ scale: hovered ? 1.8 : 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 rounded-full"
            style={{ backgroundImage: BUBBLE_GRADIENT }}
          />
          <motion.span
            animate={{ y: hovered ? -3 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative z-10"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 19V5M12 5L5 12M12 5l7 7"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
