import CodeBackground from "@/components/Home/CodeBackground";

type FooterDict = {
  brand: string;
  rights: string;
};

export default function Footer({ dict }: { dict: FooterDict }) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0b0f14]">
      <CodeBackground />
      <div className="relative z-10 mx-auto flex w-full max-w-4xl items-center justify-center px-6 py-6 text-sm text-zinc-400">
        <p>
          &copy; {year} {dict.brand}. {dict.rights}
        </p>
      </div>
    </footer>
  );
}
