import TechCarousel from "@/components/TechCarousel/TechCarouselClient";
import CodeBackground from "./CodeBackground";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="relative h-[85vh] min-h-[560px] w-full overflow-hidden bg-[#0b0f14]">
        <CodeBackground />
        <div className="relative z-10 h-full w-full">
          <TechCarousel />
        </div>
      </section>
    </main>
  );
}
