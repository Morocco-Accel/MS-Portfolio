"use client";

import { motion, useScroll, useSpring } from "motion/react";

const RAINBOW =
  "linear-gradient(90deg, #ff2d55, #ff9500, #ffcc00, #34c759, #00c7be, #007aff, #af52de, #ff2d55)";

/**
 * Fixed reading-progress line: its length tracks how far down the page the
 * viewer has scrolled, filled with a continuously flowing rainbow gradient.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-[3px]" aria-hidden="true">
      <motion.div
        className="h-full w-full"
        style={{
          scaleX,
          transformOrigin: "0%",
          backgroundImage: RAINBOW,
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPositionX: ["0%", "200%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
