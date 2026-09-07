"use client";

import dynamic from "next/dynamic";

// The R3F canvas relies on WebGL/DOM APIs, so it's loaded client-only.
const DevMachine = dynamic(() => import("./DevMachine"), { ssr: false });

export default DevMachine;
