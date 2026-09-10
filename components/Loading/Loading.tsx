"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import Logo from "@/components/Logo/Logo";

const DURATION_MS = 3000;
const HOLD_AT_FULL_MS = 500;
const SHELL_PROMPT = "marouaneshaimi@dev";
const SECTIONS = [" #/home", " #/about", " #/contact", " #/projects"].map(
  (path) => `${SHELL_PROMPT}:${path}`,
);
const ALMOST_DONE_AT = 80;
const COLOR_PULSE_AT = 90;
// Sampled from the logo's own colors, light gold to deep bronze, repeated
// so the shimmer loops seamlessly as its position scrolls.
const BAR_GRADIENT =
  "linear-gradient(90deg, #996640, #e3b07d, #ffe4b8, #e3b07d, #996640, #e3b07d, #ffe4b8, #e3b07d, #996640)";
const PERCENT_COLOR_PULSE = ["#ffffff", "#ffe4b8", "#e3b07d", "#ffffff"];

// The name printed as if by different languages' print statements, for the
// faint background flourish — shuffled and sampled so a different subset
// shows on each load.
const PRINT_LINES = [
  'console.log("Marouane Shaimi")',
  'System.out.println("Marouane Shaimi");',
  'print("مروان السحيمي")',
  'printf("Marouane Shaimi\\n");',
  'puts "Marouane Shaimi"',
  'echo "Marouane Shaimi";',
  'println!("Marouane Shaimi");',
  'Console.WriteLine("Marouane Shaimi");',
  'fmt.Println("Marouane Shaimi")',
];

// Fixed screen slots (not fully random) so lines scatter around the logo
// and bar instead of landing on top of them.
const BG_SLOTS: CSSProperties[] = [
  { top: "10%", left: "6%" },
  { top: "16%", right: "6%" },
  { bottom: "18%", left: "8%" },
  { bottom: "12%", right: "8%" },
  { top: "48%", left: "4%" },
];

type BackgroundLine = {
  text: string;
  slot: CSSProperties;
  delay: number;
  duration: number;
};

function pickRandom<T>(items: T[], count: number): T[] {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

function BootingDots() {
  return (
    <span aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="inline-block"
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        >
          .
        </motion.span>
      ))}
    </span>
  );
}

/**
 * Full-screen preloader shown once per app load: the MD monogram pulses
 * like a heartbeat while a 4s progress bar "charges", with the label
 * above/below it cycling through the app's sections as if loading each one.
 */
export default function Loading() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [bgLines, setBgLines] = useState<BackgroundLine[]>([]);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setBgLines(
        pickRandom(PRINT_LINES, BG_SLOTS.length).map((text, i) => ({
          text,
          slot: BG_SLOTS[i],
          delay: i * 0.5 + Math.random() * 0.4,
          duration: 3.5 + Math.random() * 2,
        })),
      );
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    let holdTimer: ReturnType<typeof setTimeout> | undefined;

    function tick(now: number) {
      const elapsed = now - start;
      setProgress(Math.min(100, (elapsed / DURATION_MS) * 100));

      if (elapsed < DURATION_MS) {
        raf = requestAnimationFrame(tick);
      } else {
        holdTimer = setTimeout(() => setVisible(false), HOLD_AT_FULL_MS);
      }
    }

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(holdTimer);
    };
  }, []);

  const sectionIndex = Math.min(
    SECTIONS.length - 1,
    Math.floor((progress / 100) * SECTIONS.length),
  );
  const nearlyDone = progress >= COLOR_PULSE_AT;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-label="Loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-[#0b0f14]"
        >
          <div
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
            aria-hidden="true"
          >
            {bgLines.map((line) => (
              <motion.span
                key={line.text}
                className="absolute inline-block overflow-hidden text-[10px] whitespace-nowrap text-white opacity-90 sm:text-xs"
                style={line.slot}
                animate={{
                  width: [
                    "0ch",
                    `${line.text.length}ch`,
                    `${line.text.length}ch`,
                    "0ch",
                  ],
                }}
                transition={{
                  duration: line.duration,
                  times: [0, 0.55, 0.85, 1],
                  delay: line.delay,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {line.text}
              </motion.span>
            ))}
          </div>

          <div
            className="relative z-10 mb-[-2rem] h-56 w-56 sm:h-64 sm:w-64"
            aria-hidden="true"
          >
            <Logo />
          </div>

          <div className="relative z-10 flex w-96 flex-col items-start gap-3 sm:w-[34rem]">
            <p
              style={{ fontFamily: "var(--font-blockcraft)" }}
              className="text-lg tracking-[0.25em] text-[#e3b07d] uppercase sm:text-2xl"
            >
              {progress >= ALMOST_DONE_AT ? (
                "Almost done!"
              ) : (
                <>
                  Booting
                  <BootingDots />
                </>
              )}
            </p>
            <div className="relative h-12 w-full overflow-hidden border border-white/15 bg-white/10 sm:h-14">
              <motion.div
                className="h-full"
                style={{
                  width: `${progress}%`,
                  backgroundImage: BAR_GRADIENT,
                  backgroundSize: "200% 100%",
                }}
                animate={{ backgroundPositionX: ["0%", "-200%"] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
              />
              <motion.span
                className="absolute mt-[-13px] inset-0 flex items-center justify-center text-xl leading-none font-bold [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] sm:text-2xl"
                style={{
                  fontFamily: "var(--font-blockcraft)",
                  textShadow: "0 1px 2px rgba(0,0,0,0.6)",
                }}
                animate={
                  nearlyDone
                    ? { color: PERCENT_COLOR_PULSE }
                    : { color: "#ffffff" }
                }
                transition={
                  nearlyDone
                    ? { duration: 0.9, repeat: Infinity, ease: "easeInOut" }
                    : { duration: 0.3 }
                }
              >
                {Math.round(progress)}%
              </motion.span>
            </div>
            {progress < ALMOST_DONE_AT && (
              <p className="text-sm lowercase tracking-normal text-[#e3b07d] sm:text-lg">
                {SECTIONS[sectionIndex]}
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
