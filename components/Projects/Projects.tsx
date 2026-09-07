type ProjectsDict = {
  title: string;
  items: { title: string; description: string }[];
};

export default function Projects({ dict }: { dict: ProjectsDict }) {
  return (
    <main className="flex flex-1 flex-col bg-white px-6 py-24">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
          {dict.title}
        </h1>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {dict.items.map((project) => (
            <div key={project.title} className="rounded-lg border border-black/[.08] p-6">
              <h2 className="text-lg font-semibold text-zinc-950">{project.title}</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
