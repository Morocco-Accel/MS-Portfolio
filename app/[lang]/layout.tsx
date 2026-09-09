import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import Loading from "@/components/Loading/Loading";
import { hasLocale } from "./dictionaries";
import { locales, rtlLocales } from "@/i18n/config";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const blockcraft = localFont({
  src: "../../public/assets/fonts/BlockCraft.otf",
  variable: "--font-blockcraft",
  display: "swap",
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dir = rtlLocales.includes(lang) ? "rtl" : "ltr";

  return (
    <html
      lang={lang}
      dir={dir}
      className={`${geistSans.variable} ${geistMono.variable} ${blockcraft.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white">
        <Loading />
        <div className="flex flex-1 flex-col">{children}</div>
      </body>
    </html>
  );
}
