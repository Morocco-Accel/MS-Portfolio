import { notFound } from "next/navigation";
import Home from "@/components/Home/Home";
import { hasLocale } from "../dictionaries";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return <Home />;
}
