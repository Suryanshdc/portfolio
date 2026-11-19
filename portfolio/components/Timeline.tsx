type Item = { period: string; title: string; org: string; note: string };

export default function Timeline({ items }: { items: Item[] }) {
  const n = items.length, W = 1000, H = 48, A = 14, half = W / (2 * n);
  let d = "";
  for (let x = 0; x <= W; x += 5) d += `${x ? "L" : "M"}${x} ${(H / 2 + A * Math.sin((Math.PI * x) / half)).toFixed(1)} `;

  const body = (e: Item) => (
    <>
      <p className="text-sm text-mute">{e.period}</p>
      <h3 className="mt-1 font-display text-2xl font-semibold">{e.title}</h3>
      {e.org && <p className="mt-1 text-paper/80">{e.org}</p>}
      <p className="mt-2 text-paper/70">{e.note}</p>
    </>
  );

  return (
    <>
      {/* desktop: horizontal wave */}
      <div className="mt-14 hidden md:block">
        <div className="relative h-12">
          <svg className="h-12 w-full" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden>
            <path d={d} fill="none" stroke="#3a4352" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          </svg>
          {items.map((e, i) => (
            <span key={e.title} className="absolute top-6 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink bg-accent"
                  style={{ left: `${((i + 0.5) / n) * 100}%` }} />
          ))}
        </div>
        <div className="mt-6 grid" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
          {items.map((e) => <div key={e.title} className="px-6 text-center">{body(e)}</div>)}
        </div>
      </div>

      {/* mobile: vertical */}
      <ol className="mt-12 border-l border-line md:hidden">
        {items.map((e) => (
          <li key={e.title} className="relative pb-10 pl-8 last:pb-0">
            <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-accent" />
            {body(e)}
          </li>
        ))}
      </ol>
    </>
  );
}
