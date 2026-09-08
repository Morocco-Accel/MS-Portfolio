"use client";

// Adapted from https://pmndrs.github.io/examples/cards-with-border-radius/
// Cards are swapped for circular technology badges (radius pinned to 0.5 = full circle).

import * as THREE from "three";
import { useRef, useState } from "react";
import {
  Canvas,
  useFrame,
  type ThreeElements,
  type ThreeEvent,
} from "@react-three/fiber";
import { Image, Environment } from "@react-three/drei";
import { easing } from "maath";
import "./util";

const TECHS = [
  "react",
  "next",
  "angular",
  "springboot",
  "nest",
  "git",
  "drf",
  "tailwind",
  "docker",
].map((name) => `/assets/tech/${name}.png`);

const ROTATE_SPEED = 0.22; // radians/sec — one lap roughly every 28s

export default function TechCarousel() {
  return (
    <Canvas camera={{ position: [0, 0, 100], fov: 15 }} gl={{ alpha: true }}>
      <fog attach="fog" args={["#a79", 8.5, 12]} />
      <Rig rotation={[0, 0, 0.15]}>
        <Carousel />
      </Rig>
      <Environment preset="dawn" blur={0.5} />
    </Canvas>
  );
}

function Rig(props: ThreeElements["group"]) {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * ROTATE_SPEED; // Auto-rotate contents
    state.events.update?.(); // Raycasts every frame rather than on pointer-move
    easing.damp3(
      state.camera.position,
      [-state.pointer.x * 2, state.pointer.y + 1.5, 10],
      0.3,
      delta,
    ); // Move camera
    state.camera.lookAt(0, 0, 0); // Look at center
  });
  return <group ref={ref} {...props} />;
}

function Carousel({
  radius = 1.9,
  count = TECHS.length,
}: {
  radius?: number;
  count?: number;
}) {
  return Array.from({ length: count }, (_, i) => (
    <Card
      key={i}
      url={TECHS[i % TECHS.length]}
      position={[
        Math.sin((i / count) * Math.PI * 2) * radius,
        0,
        Math.cos((i / count) * Math.PI * 2) * radius,
      ]}
      rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
    />
  ));
}

function Card({
  url,
  ...props
}: { url: string } & Pick<ThreeElements["mesh"], "position" | "rotation">) {
  const groupRef = useRef<THREE.Group>(null!);
  const frontRef = useRef<THREE.Mesh>(null!);
  const backRef = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const pointerOver = (e: ThreeEvent<PointerEvent>) => (
    e.stopPropagation(), hover(true)
  );
  const pointerOut = () => hover(false);
  useFrame((state, delta) => {
    easing.damp3(groupRef.current.scale, hovered ? 1.15 : 1, 0.1, delta);
    for (const ref of [frontRef, backRef]) {
      // Pinned at 0.5 (half the plane's UV space) so every card renders as a full circle.
      easing.damp(ref.current.material, "radius", 0.5, 0.2, delta);
      // Kept near 1 so the whole square logo stays visible — a couple of the
      // icons touch their canvas edges and were getting clipped at a heavier zoom.
      easing.damp(ref.current.material, "zoom", hovered ? 1.05 : 1, 0.2, delta);
    }
  });
  return (
    <group ref={groupRef} {...props}>
      {/*
        Two front-only faces back-to-back instead of one DoubleSide plane:
        a DoubleSide plane's back shows a horizontally-mirrored copy of the
        texture, which read backwards through the ring's gaps once cards got
        sparse enough to see through. Each face here only ever renders its
        own, correctly oriented front — whichever currently faces the camera.
      */}
      {/* eslint-disable-next-line jsx-a11y/alt-text -- this is drei's <Image> (a Three.js mesh), not next/image */}
      <Image
        ref={frontRef}
        url={url}
        transparent
        side={THREE.FrontSide}
        onPointerOver={pointerOver}
        onPointerOut={pointerOut}
      >
        <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
      </Image>
      {/* eslint-disable-next-line jsx-a11y/alt-text -- this is drei's <Image> (a Three.js mesh), not next/image */}
      <Image
        ref={backRef}
        url={url}
        transparent
        side={THREE.FrontSide}
        rotation={[0, Math.PI, 0]}
        onPointerOver={pointerOver}
        onPointerOut={pointerOut}
      >
        <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
      </Image>
    </group>
  );
}
