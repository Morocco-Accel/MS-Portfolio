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

This is a Next.js App Router project (Next 16.3.4, React 19.2.8), currently the unmodified `create-next-app` scaffold — a single route at `app/page.tsx` with shared chrome in `app/layout.tsx`.

- **Routing**: App Router under `app/`. New routes are added as `app/<segment>/page.tsx`.
- **Styling**: Tailwind CSS v4, configured entirely in `app/globals.css` via `@import "tailwindcss"` and an inline `@theme` block (no `tailwind.config.*` file — v4's CSS-first config). Dark mode is driven by `prefers-color-scheme`, not a class strategy. Fonts (Geist Sans/Mono) are loaded with `next/font/google` in `app/layout.tsx` and exposed as CSS variables consumed by the `@theme` block.
- **Path alias**: `@/*` maps to the repo root (`tsconfig.json`), e.g. `@/app/...`.
- **TypeScript**: `strict` mode is on.
- **pnpm workspace**: `pnpm-workspace.yaml` disables native builds for `sharp` and `unrs-resolver` (`allowBuilds: false`) — be aware `next/image` optimization falls back to the non-`sharp` path unless this is changed.
