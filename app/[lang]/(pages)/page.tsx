import { notFound } from "next/navigation";
import { hasLocale } from "../dictionaries";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return <main className="flex flex-1" />;
}
