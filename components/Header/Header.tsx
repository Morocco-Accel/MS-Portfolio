"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Model } from "./Model";

export default function Header() {
  return (
    <section className="relative h-screen w-full">
      <Canvas shadows camera={{ position: [8, 4, 8], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
        <Suspense fallback={null}>
          <Model />
          <Environment preset="apartment" />
        </Suspense>
        <OrbitControls enablePan={false} minDistance={4} maxDistance={14} />
      </Canvas>
    </section>
  );
}
