import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    // react-three-fiber's render loop (useFrame) is intentionally imperative —
    // it mutates refs/materials every frame instead of going through React
    // state, which is the documented r3f performance pattern. The React
    // Compiler-oriented react-hooks rules assume a purely declarative render
    // path and flag that mutation, so they're relaxed for these 3D components.
    files: ["components/TechCarousel/**/*.{ts,tsx}", "components/DevMachine/**/*.{ts,tsx}"],
    rules: {
      "react-hooks/refs": "off",
      "react-hooks/immutability": "off",
    },
  },
]);

export default eslintConfig;
