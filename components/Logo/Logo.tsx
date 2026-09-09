"use client";

import Image from "next/image";
import { motion } from "motion/react";
import logo from "@/public/assets/logos/MD.png";

// Classic double-beat heartbeat curve: two quick pulses then a rest,
// looped. Keyframe pairs below are [scale, time] as fractions of the cycle.
const HEARTBEAT_SCALE = [1, 1.15, 1, 1.15, 1, 1];
const HEARTBEAT_TIMES = [0, 0.14, 0.28, 0.42, 0.56, 1];

export default function Logo({ size }: { size?: number }) {
  return (
    <motion.div
      className={size === undefined ? "h-full w-full" : undefined}
      style={size === undefined ? undefined : { width: size, height: size }}
      animate={{ scale: HEARTBEAT_SCALE }}
      transition={{
        duration: 3.2,
        times: HEARTBEAT_TIMES,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Image
        src={logo}
        alt="MD logo"
        priority
        className="h-full w-full object-contain"
      />
    </motion.div>
  );
}
