"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CodeBackground from "@/components/Home/CodeBackground";
import { RAINBOW_COLORS } from "@/components/ScrollProgress/ScrollProgress";

gsap.registerPlugin(ScrollTrigger);

const TIMELINE_GRADIENT = `linear-gradient(180deg, ${RAINBOW_COLORS.join(", ")})`;

export type EducationItem = {
  period: string;
  degree: string;
  school: string;
  description: string;
};

export type EducationDict = {
  eyebrow: string;
  heading: string;
  items: EducationItem[];
};

/**
 * Second landing-page section: a centered vertical timeline of the
 * education parcours. The center line fills — with an arrowhead riding its
 * leading edge — as the section scrolls past (scrubbed via Lenis +
 * ScrollTrigger), and each milestone card scales up as it nears the
 * viewport center and shrinks back down as it moves away.
 */
export default function Education({ dict }: { dict: EducationDict }) {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    const arrow = arrowRef.current;
    if (!section || !line || !arrow) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = section.querySelectorAll<HTMLElement>("[data-timeline-item]");
    const cards = section.querySelectorAll<HTMLElement>("[data-timeline-card]");

    if (reduceMotion) {
      gsap.set(line, { scaleY: 1 });
      gsap.set(arrow, { top: "100%" });
      gsap.set(items, { autoAlpha: 1, y: 0 });
      gsap.set(cards, { scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const lineScrollTrigger = {
        trigger: section,
        start: "top 65%",
        end: "bottom 55%",
        scrub: 0.6,
      };

      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: lineScrollTrigger,
        },
      );

      gsap.fromTo(
        arrow,
        { top: "0%" },
        {
          top: "100%",
          ease: "none",
          scrollTrigger: lineScrollTrigger,
        },
      );

      items.forEach((item, index) => {
        const dot = item.querySelector("[data-timeline-dot]");
        const card = item.querySelector("[data-timeline-card]");
        if (!card) return;

        gsap.fromTo(
          card,
          { y: 32, autoAlpha: 0, filter: "blur(6px)" },
          {
            y: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              once: true,
            },
          },
        );

        // Grows as the card approaches the viewport center, shrinks again
        // once it drifts away — driven purely by scroll position.
        gsap
          .timeline({
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          })
          .fromTo(card, { scale: 0.85 }, { scale: 1.06, ease: "none" })
          .to(card, { scale: 0.85, ease: "none" });

        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0, autoAlpha: 0 },
            {
              scale: 1,
              autoAlpha: 1,
              duration: 0.5,
              ease: "back.out(2)",
              delay: index === 0 ? 0 : 0.05,
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                once: true,
              },
            },
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-story-section
      className="relative w-full overflow-hidden bg-[#0b0f14] px-6 py-24 sm:py-32"
    >
      <CodeBackground />
      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium tracking-[0.2em] text-[#7ee787] uppercase">
            {dict.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{dict.heading}</h2>
        </div>

        <div className="relative mt-20">
          <div
            aria-hidden="true"
            className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-white/10"
          />
          <div
            ref={lineRef}
            aria-hidden="true"
            className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2"
            style={{ backgroundImage: TIMELINE_GRADIENT, transform: "scaleY(0)" }}
          />
          <div
            ref={arrowRef}
            aria-hidden="true"
            className="absolute left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]"
            style={{ top: "0%" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <polyline
                points="6 9 12 16 18 9"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <ol className="flex flex-col gap-16 sm:gap-20">
            {dict.items.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <li
                  key={`${item.period}-${item.degree}`}
                  data-timeline-item
                  className="relative grid grid-cols-[1fr_2rem_1fr] items-center"
                >
                  <div className={isLeft ? "col-start-1 pr-8 text-right sm:pr-10" : "col-start-1"}>
                    {isLeft && <Card item={item} />}
                  </div>

                  <div className="col-start-2 flex justify-center">
                    <span
                      data-timeline-dot
                      aria-hidden="true"
                      className="h-3.5 w-3.5 rounded-full border-2 border-[#0b0f14] shadow-[0_0_0_3px_rgba(255,255,255,0.15)]"
                      style={{ backgroundImage: TIMELINE_GRADIENT, opacity: 0 }}
                    />
                  </div>

                  <div className={!isLeft ? "col-start-3 pl-8 text-left sm:pl-10" : "col-start-3"}>
                    {!isLeft && <Card item={item} />}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Card({ item }: { item: EducationItem }) {
  return (
    <div
      data-timeline-card
      className="group relative inline-block w-full max-w-sm rounded-2xl will-change-transform"
      style={{ opacity: 0 }}
    >
      <div
        aria-hidden="true"
        className="absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ backgroundImage: TIMELINE_GRADIENT }}
      />
      <div className="relative rounded-2xl border border-white/10 bg-[#0b0f14]/90 p-6 text-left backdrop-blur-sm transition-colors duration-300 group-hover:border-transparent">
        <span className="font-mono text-xs tracking-wide text-[#79c0ff] uppercase">
          {item.period}
        </span>
        <h3 className="mt-2 text-xl font-semibold text-white">{item.degree}</h3>
        <p className="mt-1 text-sm text-zinc-400">{item.school}</p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-300">{item.description}</p>
      </div>
    </div>
  );
}
