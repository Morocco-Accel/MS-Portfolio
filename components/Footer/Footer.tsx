type FooterDict = {
  brand: string;
  rights: string;
};

export default function Footer({ dict }: { dict: FooterDict }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/[.08] bg-white">
      <div className="mx-auto flex w-full max-w-4xl items-center justify-center px-6 py-6 text-sm text-zinc-500">
        <p>
          &copy; {year} {dict.brand}. {dict.rights}
        </p>
      </div>
    </footer>
  );
}
