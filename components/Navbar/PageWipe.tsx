"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion } from "motion/react";

const COLS = 10;
const ROWS = 6;
const CELL_DURATION = 0.32;
const STAGGER = 0.022;

export type WipePhase = "idle" | "in" | "out";

/**
 * Full-viewport "pixels" wipe played across a locale switch: a grid of
 * rainbow-hued squares scales in, radiating outward from the clicked flag
 * button, staggered by distance from that point — then (once the new locale
 * has navigated in) scales back out the same way to reveal it.
 */
export default function PageWipe({
  phase,
  origin,
  onCovered,
  onRevealed,
}: {
  phase: WipePhase;
  origin: { x: number; y: number };
  onCovered: () => void;
  onRevealed: () => void;
}) {
  const covering = phase === "in";

  const cells = useMemo(() => {
    const width = typeof window !== "undefined" ? window.innerWidth : 1920;
    const height = typeof window !== "undefined" ? window.innerHeight : 1080;
    const originCol = (origin.x / width) * COLS;
    const originRow = (origin.y / height) * ROWS;

    return Array.from({ length: COLS * ROWS }, (_, i) => {
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      const distance = Math.hypot(col - originCol, row - originRow);
      const hue = (col / Math.max(1, COLS - 1)) * 300;
      return { key: i, delay: distance * STAGGER, color: `hsl(${hue} 90% 58%)` };
    });
  }, [origin.x, origin.y]);

  const maxDelay = useMemo(() => cells.reduce((max, cell) => Math.max(max, cell.delay), 0), [cells]);
  const totalDuration = maxDelay + CELL_DURATION;

  const callbacksRef = useRef({ onCovered, onRevealed });
  useEffect(() => {
    callbacksRef.current = { onCovered, onRevealed };
  });

  useEffect(() => {
    if (phase === "idle") return;
    const id = window.setTimeout(() => {
      if (phase === "in") callbacksRef.current.onCovered();
      if (phase === "out") callbacksRef.current.onRevealed();
    }, totalDuration * 1000);
    return () => window.clearTimeout(id);
  }, [phase, totalDuration]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100]"
      style={{ visibility: phase === "idle" ? "hidden" : "visible" }}
    >
      <div
        className="grid h-full w-full"
        style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}
      >
        {cells.map((cell) => (
          <motion.div
            key={cell.key}
            style={{ background: cell.color }}
            initial={false}
            animate={{ scale: covering ? 1 : 0 }}
            transition={{ duration: CELL_DURATION, delay: cell.delay, ease: [0.76, 0, 0.24, 1] }}
          />
        ))}
      </div>
    </div>
  );
}
