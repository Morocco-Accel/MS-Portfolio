import Link from "next/link";
import type { Locale } from "@/i18n/config";
import LocaleSwitcher from "./LocaleSwitcher";

const routes = [
  { href: "", key: "home" },
  { href: "/about", key: "about" },
  { href: "/projects", key: "projects" },
  { href: "/skills", key: "skills" },
  { href: "/contact", key: "contact" },
] as const;

type NavDict = {
  brand: string;
  home: string;
  about: string;
  projects: string;
  skills: string;
  contact: string;
};

export default function Navbar({ lang, dict }: { lang: Locale; dict: NavDict }) {
  return (
    <header className="border-b border-black/[.08] bg-white">
      <nav className="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href={`/${lang}`} className="text-sm font-semibold tracking-tight text-zinc-950">
          {dict.brand}
        </Link>
        <ul className="flex items-center gap-6 text-sm font-medium text-zinc-600">
          {routes.map((route) => (
            <li key={route.key}>
              <Link
                href={`/${lang}${route.href}`}
                className="transition-colors hover:text-zinc-950"
              >
                {dict[route.key]}
              </Link>
            </li>
          ))}
        </ul>
        <LocaleSwitcher lang={lang} />
      </nav>
    </header>
  );
}
