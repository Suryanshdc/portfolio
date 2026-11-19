import type { CSSProperties } from "react";
import { crowd } from "@/lib/crowd";

type Props = { name: string; role: string; email: string; links: Record<string, string>; nav: [string, string][] };

// back → front. s = person scale, b = bottom offset, gap = space between people (all in "u" units, see .crowd-stage), v = speed (u/s)
const lanes = [
  { n: 30, s: 0.55, b: 300, gap: 6, v: 14, rev: false, z: 1 },
  { n: 28, s: 0.66, b: 215, gap: 8, v: 20, rev: true, z: 2 },
  { n: 27, s: 0.78, b: 120, gap: 12, v: 28, rev: false, z: 3 },
  { n: 20, s: 0.9, b: 0, gap: 250, v: 40, rev: true, z: 5 },
];
let from = 0;
const laneData = lanes.map((l) => {
  const people = crowd.slice(from, (from += l.n));
  const width = people.reduce((a, [, w]) => a + w * l.s + l.gap, 0);
  return { ...l, people, dur: Math.round(width / l.v) };
});

export default function Footer({ name, role, email, links, nav }: Props) {
  const year = new Date().getFullYear();
  const link = "underline-offset-4 transition hover:underline";
  return (
    <footer className="relative overflow-hidden bg-[#f3f1ea] text-[#1b1b1a]">
      <div className="crowd-stage mt-16 md:mt-24" role="img" aria-label={`Illustration of ${name} standing still while a crowd of people walks past`}>
        <p aria-hidden className="pointer-events-none absolute inset-0 z-0 grid select-none place-items-center whitespace-nowrap font-display text-[clamp(3.5rem,15.5vw,22rem)] font-semibold uppercase leading-none tracking-tighter text-[#1b1b1a]/[.12]">
          {name}.
        </p>
        {laneData.slice(0, 3).map((l, i) => <Lane key={i} lane={l} />)}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/suryansh-standing.webp" alt="" width={287} height={869} className="crowd-figure" />
        <Lane lane={laneData[3]} />
      </div>

      <div className="mx-auto grid max-w-[120rem] gap-12 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-[4vw] md:py-20">
        <p className="max-w-[14ch] font-display text-3xl font-semibold leading-tight md:text-4xl">{role}.</p>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1b1b1a]/55">Explore</h3>
          <ul className="mt-4 space-y-2 text-lg font-medium">
            {nav.map(([l, h]) => <li key={h}><a href={h} className={link}>{l}</a></li>)}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1b1b1a]/55">Get in touch</h3>
          <ul className="mt-4 space-y-2 text-lg font-medium">
            <li><a href={`mailto:${email}`} className={`${link} break-all`}>{email}</a></li>
            {Object.entries(links).map(([l, h]) => (
              <li key={l}><a href={h} target="_blank" rel="noopener noreferrer" className={link}>{l}</a></li>
            ))}
          </ul>
        </div>
        <div className="md:text-right">
          <p className="font-display text-3xl font-semibold md:text-4xl">See you around.</p>
          <a href="#top" className={`${link} mt-4 inline-block text-lg font-medium`}>Back to top ↑</a>
        </div>
      </div>

      <div className="border-t border-[#1b1b1a]/15">
        <p className="mx-auto max-w-[120rem] px-6 py-6 text-sm text-[#1b1b1a]/60 md:px-[4vw]">© {year} {name}</p>
      </div>
    </footer>
  );
}

function Lane({ lane }: { lane: (typeof laneData)[number] }) {
  const { people, s, b, gap, dur, rev, z } = lane;
  const copy = (k: number) => (
    <div className="crowd-copy" aria-hidden key={k}>
      {people.map(([id, w, h], i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={id} src={`/crowd/${id}.webp`} alt="" width={w} height={h} loading="lazy" decoding="async" className="crowd-person"
          style={{ height: `calc(var(--u) * ${(h * s).toFixed(1)})`, width: `calc(var(--u) * ${(w * s).toFixed(1)})`, animationDelay: `-${(i * 137) % 800}ms` }}
        />
      ))}
    </div>
  );
  return (
    <div className={`crowd-lane${rev ? " rev" : ""}`} style={{ "--b": b, "--gap": gap, "--dur": `${dur}s`, zIndex: z } as CSSProperties}>
      {copy(0)}{copy(1)}
    </div>
  );
}
