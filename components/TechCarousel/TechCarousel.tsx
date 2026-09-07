"use client";

// Adapted from https://pmndrs.github.io/examples/cards-with-border-radius/
// Cards are swapped for circular technology badges (radius pinned to 0.5 = full circle).

import * as THREE from "three";
import { useMemo, useRef, useState } from "react";
import {
  Canvas,
  useFrame,
  type ThreeElements,
  type ThreeEvent,
} from "@react-three/fiber";
import { Image, Environment, ScrollControls, useScroll } from "@react-three/drei";
import { easing } from "maath";
import "./util";
import type { MeshSineMaterial } from "./util";

const TECHS = [
  "react",
  "next",
  "type",
  "tailwind",
  "angular",
  "redux",
  "zustand",
  "query",
  "rnative",
  "nest",
  "drf",
  "springboot",
  "mongo",
  "mysql",
  "oracle",
  "firebase",
  "docker",
  "git",
  "github",
  "gitlab",
  "figma",
  "material",
  "chakra",
  "ant",
  "sass",
  "i18",
].map((name) => `/assets/tech/${name}.png`);

export default function TechCarousel() {
  return (
    <Canvas camera={{ position: [0, 0, 100], fov: 15 }} gl={{ alpha: true }}>
      <fog attach="fog" args={["#a79", 8.5, 12]} />
      <ScrollControls pages={4} infinite>
        <Rig rotation={[0, 0, 0.15]}>
          <Carousel />
        </Rig>
        <Banner position={[0, -0.15, 0]} />
      </ScrollControls>
      <Environment preset="dawn" background blur={0.5} />
    </Canvas>
  );
}

function Rig(props: ThreeElements["group"]) {
  const ref = useRef<THREE.Group>(null!);
  const scroll = useScroll();
  useFrame((state, delta) => {
    ref.current.rotation.y = -scroll.offset * (Math.PI * 2); // Rotate contents
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
  radius = 2.6,
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
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const pointerOver = (e: ThreeEvent<PointerEvent>) => (
    e.stopPropagation(), hover(true)
  );
  const pointerOut = () => hover(false);
  useFrame((state, delta) => {
    easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta);
    // Pinned at 0.5 (half the plane's UV space) so every card renders as a full circle.
    easing.damp(ref.current.material, "radius", 0.5, 0.2, delta);
    easing.damp(ref.current.material, "zoom", hovered ? 1 : 1.15, 0.2, delta);
  });
  return (
    // eslint-disable-next-line jsx-a11y/alt-text -- this is drei's <Image> (a Three.js mesh), not next/image
    <Image
      ref={ref}
      url={url}
      transparent
      side={THREE.DoubleSide}
      onPointerOver={pointerOver}
      onPointerOut={pointerOut}
      {...props}
    >
      <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
    </Image>
  );
}

function Banner(props: ThreeElements["mesh"]) {
  const ref = useRef<THREE.Mesh<THREE.BufferGeometry, MeshSineMaterial>>(null!);
  const texture = useMemo(() => createBannerTexture("TECHNOLOGIES"), []);
  const scroll = useScroll();
  useFrame((state, delta) => {
    ref.current.material.time.value += Math.abs(scroll.delta) * 4;
    ref.current.material.map!.offset.x += delta / 2;
  });
  return (
    <mesh ref={ref} {...props}>
      <cylinderGeometry args={[1.6, 1.6, 0.14, 128, 16, true]} />
      <meshSineMaterial
        map={texture}
        map-anisotropy={16}
        map-repeat={[30, 1]}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
}

function createBannerTexture(label: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#111111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.font = "700 34px Arial, Helvetica, sans-serif";
  ctx.textBaseline = "middle";
  ctx.fillText(`${label}   •   `, 12, canvas.height / 2);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  return texture;
}
