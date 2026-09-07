import { notFound } from "next/navigation";
import Skills from "@/components/Skills/Skills";
import { getDictionary, hasLocale } from "../../dictionaries";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return <Skills dict={dict.skills} />;
}
