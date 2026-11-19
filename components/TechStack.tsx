"use client";
import { useEffect, useState, type CSSProperties } from "react";

type Skill = { title: string; sub: string; items: string[] };

export default function TechStack({ skills }: { skills: Skill[] }) {
  const [on, setOn] = useState<Set<string>>(new Set());

  // a few tags per column light up, then shuffle every couple of seconds
  useEffect(() => {
    const pick = () => {
      const next = new Set<string>();
      skills.forEach((s, ci) => {
        const n = Math.max(2, Math.round(s.items.length * 0.28));
        [...s.items.keys()].sort(() => Math.random() - 0.5).slice(0, n).forEach((i) => next.add(`${ci}-${i}`));
      });
      setOn(next);
    };
    pick();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(pick, 2600);
    return () => clearInterval(id);
  }, [skills]);

  return (
    <section id="skills">
      <div className="mx-auto max-w-[120rem] px-6 py-24 md:px-[11.3vw] md:py-[9vw]">
        <div className="flex items-start justify-between gap-8">
          <h2 className="text-[clamp(3rem,5vw,7rem)] font-semibold leading-none tracking-tight">Tech Stack</h2>
          <p className="hidden max-w-[9.5vw] text-[clamp(1.1rem,1.25vw,1.6rem)] leading-snug text-mute md:block">The tools behind my work.</p>
        </div>

        <div className="mt-12 grid gap-14 md:mt-[3.5vw] md:grid-cols-3 md:items-start md:gap-x-[2.7vw]">
          {skills.map((s, ci) => (
            <div key={s.title} className="border-t border-paper md:mt-[calc(var(--i)*4.2vw)]" style={{ "--i": ci } as CSSProperties}>
              <h3 className="mt-8 text-[clamp(1.6rem,2.4vw,3.2rem)] font-medium leading-[1.15] tracking-tight md:mt-[2.2vw]">{s.title}</h3>
              <p className="mt-5 max-w-xs text-[clamp(.9rem,.85vw,1.1rem)] leading-[1.75] text-mute md:mt-[1.4vw] md:max-w-[17.3vw]">{s.sub}</p>
              <ul className="mt-6 flex flex-wrap gap-2 md:mt-[1.8vw] md:gap-[.55vw]">
                {s.items.map((item, ii) => (
                  <li
                    key={item}
                    className={`cursor-default rounded-[4px] border px-4 py-3 text-[clamp(.95rem,1.05vw,1.35rem)] leading-tight transition-colors duration-500 hover:border-paper hover:bg-paper hover:text-ink md:px-[1vw] md:py-[1vw] ${
                      on.has(`${ci}-${ii}`) ? "border-paper bg-paper text-ink" : "border-line bg-panel text-paper"
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
