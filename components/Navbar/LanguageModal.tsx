"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { locales, localeLabels, type Locale } from "@/i18n/config";
import { FlagBadge } from "./flags";

const RAINBOW =
  "linear-gradient(90deg, #ff2d55, #ff9500, #ffcc00, #34c759, #00c7be, #007aff, #af52de, #ff2d55)";

export type WipeOrigin = { x: number; y: number };

export default function LanguageModal({
  open,
  lang,
  onClose,
  onSelect,
}: {
  open: boolean;
  lang: Locale;
  onClose: () => void;
  onSelect: (locale: Locale, origin: WipeOrigin) => void;
}) {
  return (
    <>
      <motion.div
        aria-hidden="true"
        onClick={onClose}
        initial={false}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className={`fixed inset-0 z-40 bg-zinc-950/55 backdrop-blur-sm ${open ? "" : "pointer-events-none opacity-0"}`}
      />

      {/*
        Kept mounted at all times (visibility toggled via opacity/pointer-events,
        not mount/unmount) and hidden via a plain class so the closed state is
        already correct in the server-rendered HTML — no post-hydration flash.
      */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Choose language"
        aria-hidden={!open}
        initial={false}
        animate={{ opacity: open ? 1 : 0, scale: open ? 1 : 0.94, y: open ? 0 : 12 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed left-1/2 top-1/2 z-50 w-[min(94vw,32rem)] -translate-x-1/2 -translate-y-1/2 rounded-[28px] p-[3px] shadow-2xl ${open ? "" : "pointer-events-none opacity-0"}`}
      >
        <motion.div
          className="absolute inset-0 rounded-[28px]"
          style={{ backgroundImage: RAINBOW, backgroundSize: "300% 100%" }}
          animate={{ backgroundPositionX: ["0%", "300%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative overflow-hidden rounded-3xl bg-white">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            tabIndex={open ? 0 : -1}
            className="absolute end-3 top-3 z-10 rounded-full bg-white/90 p-2 text-zinc-500 shadow-sm ring-1 ring-black/[.06] transition-colors hover:bg-zinc-100 hover:text-zinc-900"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          <div className="flex flex-wrap items-center justify-center gap-5 px-10 py-14">
            {locales.map((locale) => (
              <LanguageButton
                key={locale}
                locale={locale}
                active={locale === lang}
                tabIndex={open ? 0 : -1}
                onSelect={onSelect}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}

function LanguageButton({
  locale,
  active,
  tabIndex,
  onSelect,
}: {
  locale: Locale;
  active: boolean;
  tabIndex: number;
  onSelect: (locale: Locale, origin: WipeOrigin) => void;
}) {
  const [wiping, setWiping] = useState(false);
  const originRef = useRef<WipeOrigin>({ x: 0, y: 0 });

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (wiping) return;
    const rect = event.currentTarget.getBoundingClientRect();
    originRef.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    setWiping(true);
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={active}
      aria-label={localeLabels[locale]}
      aria-current={active || undefined}
      tabIndex={tabIndex}
      whileHover={active ? undefined : { scale: 1.22 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`relative h-16 w-16 overflow-hidden rounded-full ring-1 ${
        active ? "ring-2 ring-offset-2 ring-black/70" : "ring-black/[.1]"
      }`}
    >
      <FlagBadge locale={locale} className="h-full w-full" ringClassName="" />

      {wiping && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 2.2 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={() => onSelect(locale, originRef.current)}
          className="pointer-events-none absolute inset-0 rounded-full bg-white/90"
        />
      )}
    </motion.button>
  );
}
