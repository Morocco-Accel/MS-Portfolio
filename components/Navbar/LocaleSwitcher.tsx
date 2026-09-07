"use client";

import { useRouter, usePathname } from "next/navigation";
import { locales, localeLabels, type Locale } from "@/i18n/config";

export default function LocaleSwitcher({ lang }: { lang: Locale }) {
  const router = useRouter();
  const pathname = usePathname();

  function handleChange(next: Locale) {
    if (next === lang) return;
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/") || `/${next}`);
  }

  return (
    <select
      aria-label="Select language"
      value={lang}
      onChange={(event) => handleChange(event.target.value as Locale)}
      className="rounded-full border border-black/[.08] bg-white px-3 py-1.5 text-sm font-medium text-zinc-700"
    >
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {localeLabels[locale]}
        </option>
      ))}
    </select>
  );
}
