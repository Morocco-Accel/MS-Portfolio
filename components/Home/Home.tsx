import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import DevMachine from "@/components/DevMachine/DevMachineClient";
import TechCarousel from "@/components/TechCarousel/TechCarouselClient";

type HomeDict = {
  eyebrow: string;
  title: string;
  description: string;
  projectsCta: string;
  contactCta: string;
  techTitle: string;
};

export default function Home({ lang, dict }: { lang: Locale; dict: HomeDict }) {
  return (
    <main className="flex flex-1 flex-col">
      <section className="relative flex min-h-[80vh] items-center overflow-hidden">
        <Image
          src="/assets/images/myImg.png"
          alt=""
          fill
          priority
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />

        <div className="relative z-10 mx-auto grid w-full max-w-4xl grid-cols-1 items-center gap-8 px-6 py-24 sm:grid-cols-2">
          <div className="text-left">
            <p className="text-sm font-medium uppercase tracking-widest text-zinc-300">
              {dict.eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {dict.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-200">
              {dict.description}
            </p>
            <div className="mt-10 flex gap-4">
              <Link
                href={`/${lang}/projects`}
                className="rounded-full bg-white px-6 py-3 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-200"
              >
                {dict.projectsCta}
              </Link>
              <Link
                href={`/${lang}/contact`}
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                {dict.contactCta}
              </Link>
            </div>
          </div>

          <div className="h-72 w-full sm:h-80">
            <DevMachine />
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto w-full max-w-4xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
            {dict.techTitle}
          </h2>
          <div className="mt-8 h-[460px] w-full overflow-hidden rounded-2xl">
            <TechCarousel />
          </div>
        </div>
      </section>
    </main>
  );
}
