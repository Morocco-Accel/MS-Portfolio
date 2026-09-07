"use client";

import * as THREE from "three";
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

const SCREEN_W = 512;
const SCREEN_H = 320;

type Token = { width: number; color: string };

function mulberry32(seed: number) {
  return function random() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildCodeLines(): Token[][] {
  const palette = ["#79c0ff", "#ff7b72", "#a5d6ff", "#d2a8ff", "#7ee787", "#e6edf3"];
  const random = mulberry32(7);
  const lines: Token[][] = [];
  for (let i = 0; i < 11; i++) {
    const indent = i % 4 === 0 ? 0 : Math.floor(random() * 3) + 1;
    const tokenCount = 2 + Math.floor(random() * 4);
    const tokens: Token[] = [];
    if (indent) tokens.push({ width: indent * 18, color: "transparent" });
    for (let t = 0; t < tokenCount; t++) {
      tokens.push({
        width: 14 + random() * 46,
        color: palette[Math.floor(random() * palette.length)],
      });
    }
    lines.push(tokens);
  }
  return lines;
}

function ScreenContent() {
  // Refs are the sanctioned mutable escape hatch here: the canvas is redrawn
  // and the texture flagged dirty every frame inside useFrame below.
  const screenRef = useRef<{
    canvas: HTMLCanvasElement;
    texture: THREE.CanvasTexture;
  } | null>(null);
  if (!screenRef.current) {
    const canvas = document.createElement("canvas");
    canvas.width = SCREEN_W;
    canvas.height = SCREEN_H;
    screenRef.current = { canvas, texture: new THREE.CanvasTexture(canvas) };
  }
  const { canvas, texture } = screenRef.current;
  const lines = useMemo(() => buildCodeLines(), []);
  const progress = useRef(0);
  const totalTokens = useMemo(
    () => lines.reduce((sum, line) => sum + line.length, 0),
    [lines],
  );

  useFrame((_, delta) => {
    const speed = 7; // tokens per second
    progress.current += delta * speed;
    if (progress.current > totalTokens + 14) progress.current = 0;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#0d1117";
    ctx.fillRect(0, 0, SCREEN_W, SCREEN_H);

    ["#ff5f56", "#ffbd2e", "#27c93f"].forEach((color, i) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(16 + i * 18, 16, 5, 0, Math.PI * 2);
      ctx.fill();
    });

    const lineHeight = 22;
    const startY = 42;
    let shown = Math.floor(progress.current);
    let cursorX = 16;
    let cursorY = startY;

    lineLoop: for (let i = 0; i < lines.length; i++) {
      let x = 16;
      const y = startY + i * lineHeight;
      cursorX = x;
      cursorY = y;
      for (const token of lines[i]) {
        if (shown <= 0) break lineLoop;
        if (token.color !== "transparent") {
          ctx.fillStyle = token.color;
          ctx.fillRect(x, y, token.width, 8);
        }
        x += token.width + 6;
        cursorX = x;
        shown--;
      }
    }

    if (Math.floor(progress.current * 2) % 2 === 0) {
      ctx.fillStyle = "#58a6ff";
      ctx.fillRect(cursorX, cursorY, 8, 10);
    }

    texture.needsUpdate = true;
  });

  return (
    <mesh position={[0, 0.62, 0.034]}>
      <planeGeometry args={[1.8, 1.06]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

function Laptop() {
  const group = useRef<THREE.Group>(null!);

  useFrame((state) => {
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
  });

  return (
    <group ref={group}>
      <mesh position={[0, -0.5, 0.35]} rotation={[-0.05, 0, 0]}>
        <boxGeometry args={[2, 0.08, 1.3]} />
        <meshStandardMaterial color="#2b2d31" metalness={0.6} roughness={0.35} />
      </mesh>

      <group position={[0, -0.46, -0.28]} rotation={[-0.15, 0, 0]}>
        <mesh position={[0, 0.62, 0]}>
          <boxGeometry args={[2, 1.24, 0.06]} />
          <meshStandardMaterial color="#1c1d20" metalness={0.5} roughness={0.4} />
        </mesh>
        <ScreenContent />
      </group>
    </group>
  );
}

export default function DevMachine() {
  return (
    <Canvas camera={{ position: [0, 0.4, 3.4], fov: 32 }} gl={{ alpha: true }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 2]} intensity={1.4} />
      <directionalLight position={[-3, -1, -2]} intensity={0.3} />
      <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.6}>
        <Laptop />
      </Float>
    </Canvas>
  );
}
