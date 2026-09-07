import { notFound } from "next/navigation";
import About from "@/components/About/About";
import { getDictionary, hasLocale } from "../../dictionaries";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return <About dict={dict.about} />;
}
