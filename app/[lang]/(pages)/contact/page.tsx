import { notFound } from "next/navigation";
import Contact from "@/components/Contact/Contact";
import { getDictionary, hasLocale } from "../../dictionaries";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return <Contact dict={dict.contact} />;
}
