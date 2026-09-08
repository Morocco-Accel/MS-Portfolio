"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "motion/react";
import type { Locale } from "@/i18n/config";
import { FlagBadge } from "./flags";
import LanguageModal, { type WipeOrigin } from "./LanguageModal";
import PageWipe, { type WipePhase } from "./PageWipe";

export default function Navbar({ lang }: { lang: Locale }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [wipePhase, setWipePhase] = useState<WipePhase>("idle");
  const [wipeOrigin, setWipeOrigin] = useState<WipeOrigin>({ x: 0, y: 0 });
  const [pendingLocale, setPendingLocale] = useState<Locale | null>(null);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function handleSelect(next: Locale, origin: WipeOrigin) {
    setOpen(false);
    if (next === lang) return;
    setPendingLocale(next);
    setWipeOrigin(origin);
    setWipePhase("in");
  }

  function handleCovered() {
    if (pendingLocale) {
      const segments = pathname.split("/");
      segments[1] = pendingLocale;
      router.push(segments.join("/") || `/${pendingLocale}`);
    }
    // Give the new route a moment to render behind the wipe before revealing it.
    window.setTimeout(() => setWipePhase("out"), 260);
  }

  function handleRevealed() {
    setWipePhase("idle");
    setPendingLocale(null);
  }

  return (
    <>
      <motion.button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Change language"
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.92 }}
        className="fixed start-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-black/[.08]"
      >
        <FlagBadge locale={lang} className="h-9 w-9" ringClassName="" />
      </motion.button>

      <LanguageModal open={open} lang={lang} onClose={() => setOpen(false)} onSelect={handleSelect} />

      <PageWipe
        phase={wipePhase}
        origin={wipeOrigin}
        onCovered={handleCovered}
        onRevealed={handleRevealed}
      />
    </>
  );
}
