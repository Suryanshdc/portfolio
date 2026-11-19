"use client";
import { useEffect, useRef } from "react";

/** Dim code text filling the hero; a soft spotlight under the cursor lights it up. */
export default function CodeBackground({ code }: { code: string }) {
  const root = useRef<HTMLDivElement>(null);
  const text = Array(6).fill(code).join("\n");

  useEffect(() => {
    const el = root.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let tx = 0, ty = 0, x = 0, y = 0, lit = 0, target = 0, raf = 0;

    const tick = () => {
      raf = 0;
      x += (tx - x) * 0.22; y += (ty - y) * 0.22; lit += (target - lit) * 0.12;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
      el.style.setProperty("--lit", lit.toFixed(3));
      if (Math.abs(tx - x) > 0.5 || Math.abs(ty - y) > 0.5 || Math.abs(target - lit) > 0.005) raf = requestAnimationFrame(tick);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if (inside && target === 0) { x = e.clientX - r.left; y = e.clientY - r.top; }
      tx = e.clientX - r.left; ty = e.clientY - r.top;
      target = inside ? 1 : 0;
      kick();
    };
    const leave = () => { target = 0; kick(); };

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={root} aria-hidden className="code-bg pointer-events-none absolute inset-0 z-0 hidden select-none overflow-hidden md:block">
      <div className="code-bg-text code-bg-dim">{text}</div>
      <div className="code-bg-text code-bg-lit">{text}</div>
    </div>
  );
}
