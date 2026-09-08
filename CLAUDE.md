# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

Package manager is pnpm (`packageManager: pnpm@11.25.0` in package.json) — use `pnpm`, not `npm`/`yarn`.

- `pnpm dev` — start the dev server (http://localhost:3000)
- `pnpm build` — production build
- `pnpm start` — serve the production build (run `build` first)
- `pnpm lint` — ESLint via `eslint-config-next` (flat config in `eslint.config.mjs`)

There is no test setup in this repo yet.

## Architecture

Next.js App Router project (Next 16.3.4, React 19.2.8) implementing a personal portfolio with i18n routing and a couple of react-three-fiber 3D scenes.

- **i18n routing**: every route lives under `app/[lang]/`, with page routes grouped in `app/[lang]/(pages)/` (`about`, `contact`, `projects`, `skills`, plus the index page). Supported locales, the default locale, and RTL locales are defined in `i18n/config.ts`. `app/[lang]/dictionaries.ts` lazily imports the matching JSON file from `app/[lang]/dictionaries/{en,fr,es,de,ar}.json` and is `server-only`; `app/[lang]/layout.tsx` awaits `params`, 404s via `notFound()` on an unknown locale, resolves `dir` (`rtl` for `ar`), and passes the loaded dictionary down to `Navbar`/`Footer`. Adding a locale means updating `i18n/config.ts` and adding a dictionary file; adding a page means adding both the route under `(pages)/` and the corresponding keys to every dictionary.
- **Locale detection/redirect**: `proxy.ts` (not `middleware.ts` — Next 16 renamed the convention, see `AGENTS.md`) negotiates the visitor's locale with `@formatjs/intl-localematcher` + `negotiator` and redirects unprefixed paths to `/{locale}/...`. Its matcher excludes `_next`, `api`, `favicon.ico`, and any path with a file extension.
- **Components**: live under `components/<Name>/<Name>.tsx` (PascalCase directories, one component family per directory) rather than colocated in `app/`. Page components under `app/[lang]/(pages)/` typically just render the matching `components/<Name>` component with the dictionary/locale passed as props.
- **3D scenes (react-three-fiber)**: `components/TechCarousel` and `components/DevMachine` are WebGL scenes built with `@react-three/fiber` + `@react-three/drei` + `three`. Each has a `*Client.tsx` wrapper that `next/dynamic`-imports the real component with `ssr: false` (WebGL needs `document`/`window`), so pages should import the `*Client` component, not the base one directly. `useFrame` render loops mutate refs/materials imperatively every frame per the documented r3f pattern — `eslint.config.mjs` disables `react-hooks/refs` and `react-hooks/immutability` specifically for these two directories to allow that.
- **Styling**: Tailwind CSS v4, configured entirely in `app/globals.css` via `@import "tailwindcss"` and an inline `@theme` block (no `tailwind.config.*` file — v4's CSS-first config). Dark mode is driven by `prefers-color-scheme`, not a class strategy. Fonts (Geist Sans/Mono) are loaded with `next/font/google` in `app/[lang]/layout.tsx` and exposed as CSS variables consumed by the `@theme` block.
- **Path alias**: `@/*` maps to the repo root (`tsconfig.json`), e.g. `@/i18n/config`, `@/components/...`.
- **TypeScript**: `strict` mode is on.
- **pnpm workspace**: `pnpm-workspace.yaml` disables native builds for `sharp` and `unrs-resolver` (`allowBuilds: false`) — be aware `next/image` optimization falls back to the non-`sharp` path unless this is changed.
