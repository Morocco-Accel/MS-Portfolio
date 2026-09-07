import { notFound } from "next/navigation";
import Projects from "@/components/Projects/Projects";
import { getDictionary, hasLocale } from "../../dictionaries";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return <Projects dict={dict.projects} />;
}
