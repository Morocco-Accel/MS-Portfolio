type AboutDict = {
  title: string;
  description: string;
};

export default function About({ dict }: { dict: AboutDict }) {
  return (
    <main className="flex flex-1 flex-col bg-white px-6 py-24">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
          {dict.title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-zinc-600">{dict.description}</p>
      </div>
    </main>
  );
}
