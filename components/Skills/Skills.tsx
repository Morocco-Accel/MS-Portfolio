const skills = ["TypeScript", "React", "Next.js", "Tailwind CSS", "Node.js"];

type SkillsDict = {
  title: string;
};

export default function Skills({ dict }: { dict: SkillsDict }) {
  return (
    <main className="flex flex-1 flex-col bg-white px-6 py-24">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
          {dict.title}
        </h1>
        <ul className="mt-8 flex flex-wrap gap-3">
          {skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-black/[.08] px-4 py-2 text-sm font-medium text-zinc-700"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
