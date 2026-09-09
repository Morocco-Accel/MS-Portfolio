"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const CHARS = "01{}()=>;[]<>/*+-#$_.".split("");
const PALETTE = ["#79c0ff", "#ff7b72", "#a5d6ff", "#d2a8ff", "#7ee787", "#e6edf3"];
const FONT_SIZE = 15;
const FONT = `${FONT_SIZE}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
const GLOW_RADIUS = 240;

// A segment can be marked `rtl` — canvas fillText defaults to left-to-right
// layout, which draws an RTL (Arabic) string back-to-front unless
// ctx.direction is switched just for that segment's draw call.
type TypeSegment = { text: string; color: string; rtl?: boolean };

const NAMES: { text: string; rtl?: boolean }[] = [
  { text: "Marouane Shaimi" },
  { text: "مروان السحيمي", rtl: true },
];

// Wraps each name variant in one print-statement style, so every language
// gets both a Latin and an Arabic line in the rotation.
function withName(head: TypeSegment[], tail: TypeSegment[]): TypeSegment[][] {
  return NAMES.map((name) => [
    ...head,
    { text: `"${name.text}"`, color: "#7ee787", rtl: name.rtl },
    ...tail,
  ]);
}

// A rotating pool of "print the name" one-liners across the stack's
// languages, colored like real syntax highlighting (class/function, member,
// string) using the same rain palette.
const TYPE_LINES: TypeSegment[][] = [
  ...withName(
    [
      { text: "System", color: "#79c0ff" },
      { text: ".", color: "#e6edf3" },
      { text: "out", color: "#a5d6ff" },
      { text: ".", color: "#e6edf3" },
      { text: "println", color: "#d2a8ff" },
      { text: "(", color: "#e6edf3" },
    ],
    [{ text: ");", color: "#e6edf3" }],
  ),
  ...withName(
    [
      { text: "console", color: "#79c0ff" },
      { text: ".", color: "#e6edf3" },
      { text: "log", color: "#d2a8ff" },
      { text: "(", color: "#e6edf3" },
    ],
    [{ text: ");", color: "#e6edf3" }],
  ),
  ...withName(
    [
      { text: "print", color: "#d2a8ff" },
      { text: "(", color: "#e6edf3" },
    ],
    [{ text: ")", color: "#e6edf3" }],
  ),
  ...withName(
    [
      { text: "printf", color: "#d2a8ff" },
      { text: "(", color: "#e6edf3" },
    ],
    [{ text: ");", color: "#e6edf3" }],
  ),
];
const TYPE_MAX_FONT_SIZE = 12;
const TYPE_SPEED = 13; // chars/sec while typing
const ERASE_SPEED = 26; // chars/sec while erasing
const HOLD_MS = 1700;
const WAIT_MS = 500;

/**
 * Full-bleed digital-rain backdrop for the hero: falling code characters
 * that brighten near the pointer, smoothed through gsap.quickTo so the
 * glow trails the cursor rather than snapping to it every frame. Layered on
 * top: a looping typewriter line that types, holds, erases, and retypes.
 */
export default function CodeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let columns = 0;
    let drops: number[] = [];
    let colors: string[] = [];
    let typeFontSize = TYPE_MAX_FONT_SIZE;
    let typeFont = "";

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.font = FONT;
      columns = Math.max(1, Math.ceil(width / FONT_SIZE));
      drops = Array.from({ length: columns }, () => (Math.random() * -height) / FONT_SIZE);
      colors = Array.from({ length: columns }, () => PALETTE[Math.floor(Math.random() * PALETTE.length)]);
      // Scale the typed line to the container so it also fits the short footer strip.
      typeFontSize = Math.max(8, Math.min(TYPE_MAX_FONT_SIZE, height * 0.14));
      typeFont = `600 ${typeFontSize}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
    }

    resize();
    window.addEventListener("resize", resize);

    let currentLine: TypeSegment[] = TYPE_LINES[0];
    let currentTotalChars = 0;
    let currentX = 24;
    let currentY = 0;
    let lastLineIndex = -1;

    function pickNextLine() {
      let index = Math.floor(Math.random() * TYPE_LINES.length);
      if (TYPE_LINES.length > 1 && index === lastLineIndex) {
        index = (index + 1) % TYPE_LINES.length;
      }
      lastLineIndex = index;
      currentLine = TYPE_LINES[index];
      currentTotalChars = currentLine.reduce((sum, segment) => sum + segment.text.length, 0);

      ctx!.font = typeFont;
      const lineWidth = currentLine.reduce((sum, segment) => sum + ctx!.measureText(segment.text).width, 0);
      const marginX = 20;
      const spanX = Math.max(0, width - lineWidth - marginX * 2);
      currentX = marginX + Math.random() * spanX;

      const marginY = Math.max(typeFontSize, height * 0.18);
      const spanY = Math.max(0, height - marginY * 2);
      currentY = marginY + Math.random() * spanY;
    }
    pickNextLine();

    function drawTypeLine(count: number, blink: boolean) {
      ctx!.font = typeFont;
      ctx!.textAlign = "left";
      ctx!.globalAlpha = 1;

      let remaining = count;
      let x = currentX;
      for (const segment of currentLine) {
        if (remaining <= 0) break;
        const shown = segment.text.slice(0, Math.max(0, Math.floor(remaining)));
        ctx!.direction = segment.rtl ? "rtl" : "ltr";
        ctx!.fillStyle = segment.color;
        ctx!.fillText(shown, x, currentY);
        x += ctx!.measureText(shown).width;
        remaining -= segment.text.length;
      }
      ctx!.direction = "ltr";

      if (blink) {
        ctx!.fillStyle = "#e6edf3";
        ctx!.fillRect(x + 3, currentY - typeFontSize * 0.78, 2, typeFontSize * 0.95);
      }
      ctx!.font = FONT;
    }

    if (reduceMotion) {
      ctx.fillStyle = "#0b0f14";
      ctx.fillRect(0, 0, width, height);
      for (let i = 0; i < columns; i++) {
        ctx.fillStyle = colors[i];
        ctx.globalAlpha = 0.45;
        ctx.fillText(CHARS[i % CHARS.length], i * FONT_SIZE, ((i * 37) % height) || 0);
      }
      ctx.globalAlpha = 1;
      drawTypeLine(currentTotalChars, false);
      return () => window.removeEventListener("resize", resize);
    }

    const pointer = { x: 0, y: 0 };
    const moveX = gsap.quickTo(pointer, "x", { duration: 0.6, ease: "power3.out" });
    const moveY = gsap.quickTo(pointer, "y", { duration: 0.6, ease: "power3.out" });
    pointer.x = width / 2;
    pointer.y = height / 3;

    function onPointerMove(event: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      moveX(event.clientX - rect.left);
      moveY(event.clientY - rect.top);
    }
    window.addEventListener("pointermove", onPointerMove);

    const typeState: { phase: "typing" | "hold" | "erasing" | "wait"; count: number; timer: number } = {
      phase: "typing",
      count: 0,
      timer: 0,
    };

    function advanceTyping(deltaMs: number) {
      switch (typeState.phase) {
        case "typing":
          typeState.count += (deltaMs / 1000) * TYPE_SPEED;
          if (typeState.count >= currentTotalChars) {
            typeState.count = currentTotalChars;
            typeState.phase = "hold";
            typeState.timer = 0;
          }
          break;
        case "hold":
          typeState.timer += deltaMs;
          if (typeState.timer >= HOLD_MS) typeState.phase = "erasing";
          break;
        case "erasing":
          typeState.count -= (deltaMs / 1000) * ERASE_SPEED;
          if (typeState.count <= 0) {
            typeState.count = 0;
            typeState.phase = "wait";
            typeState.timer = 0;
          }
          break;
        case "wait":
          typeState.timer += deltaMs;
          if (typeState.timer >= WAIT_MS) {
            pickNextLine();
            typeState.phase = "typing";
          }
          break;
      }
    }

    let frame = 0;
    let lastTime = performance.now();
    let elapsed = 0;

    function draw(time: number) {
      const deltaMs = Math.min(48, time - lastTime);
      lastTime = time;
      elapsed += deltaMs;

      ctx!.fillStyle = "rgba(6, 9, 13, 0.16)";
      ctx!.fillRect(0, 0, width, height);

      for (let i = 0; i < columns; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * FONT_SIZE;
        const y = drops[i] * FONT_SIZE;

        const dx = x - pointer.x;
        const dy = y - pointer.y;
        const proximity = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / GLOW_RADIUS);

        ctx!.fillStyle = colors[i];
        ctx!.globalAlpha = 0.28 + proximity * 0.72;
        ctx!.fillText(char, x, y);

        if (y > height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.35 + Math.random() * 0.4;
      }
      ctx!.globalAlpha = 1;

      advanceTyping(deltaMs);
      const blink = typeState.phase !== "erasing" && Math.floor(elapsed / 500) % 2 === 0;
      drawTypeLine(typeState.count, blink);

      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      gsap.killTweensOf(pointer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
