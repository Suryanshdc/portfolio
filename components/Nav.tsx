"use client";
import { useEffect, useState } from "react";

export default function Nav({ name, links }: { name: string; links: [string, string][] }) {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  useEffect(() => { setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark"); }, []);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
    setTheme(next);
  };
  return (
    <header className="fixed left-1/2 top-4 z-50 -translate-x-1/2">
      <div className="flex items-center gap-4 rounded-full border border-line bg-panel/90 py-2 pl-5 pr-2 backdrop-blur">
        <a href="#top" className="spin-name font-display text-lg font-semibold">{name}</a>
        <button aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} onClick={toggle}
          className="grid h-8 w-8 place-items-center rounded-full text-paper/80 transition hover:text-accent">
          {theme === "dark" ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            </svg>
          )}
        </button>
        <button
          aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}
          className="grid h-8 w-10 place-items-center rounded-full bg-paper text-ink transition hover:bg-accent"
        >
          <span aria-hidden className="text-lg leading-none tracking-tighter">•••</span>
        </button>
      </div>
      {open && (
        <ul className="mt-2 rounded-2xl border border-line bg-panel/95 p-2 backdrop-blur">
          {links.map(([l, h]) => (
            <li key={h}>
              <a href={h} onClick={() => setOpen(false)} className="block rounded-lg px-4 py-2 text-sm text-paper/80 transition hover:bg-line hover:text-paper">{l}</a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
