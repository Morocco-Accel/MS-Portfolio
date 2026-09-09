import type Lenis from "lenis";

// Module-scoped singleton so other client components (e.g. BackToTop) can
// drive the same Lenis instance SmoothScroll owns, without prop drilling or
// a context provider for a single fixed-position consumer.
let instance: Lenis | null = null;

export function setLenisInstance(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenisInstance() {
  return instance;
}
