"use client";

import dynamic from "next/dynamic";

// The R3F canvas relies on WebGL/DOM APIs, so it's loaded client-only.
const TechCarousel = dynamic(() => import("./TechCarousel"), { ssr: false });

export default TechCarousel;
