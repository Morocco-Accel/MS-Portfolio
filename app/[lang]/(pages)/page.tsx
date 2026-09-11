import { notFound } from "next/navigation";
import { hasLocale } from "../dictionaries";
import Header from "@/components/Header/Header";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <main className="flex flex-1 flex-col">
      <Header />
    </main>
  );
}
