type ContactDict = {
  title: string;
  description: string;
  email: string;
};

export default function Contact({ dict }: { dict: ContactDict }) {
  return (
    <main className="flex flex-1 flex-col bg-white px-6 py-24">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
          {dict.title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-zinc-600">
          {dict.description}{" "}
          <a
            href={`mailto:${dict.email}`}
            className="font-medium text-zinc-950 underline underline-offset-2"
          >
            {dict.email}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
