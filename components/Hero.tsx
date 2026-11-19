"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import CodeBackground from "@/components/CodeBackground";

type Props = {
  name: string; role: string; pitch: string;
  titleLines: [string, string]; tag: string;
  currently: { label: string; lines: string[] };
  code: string;
};

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

// each letter sits in its own box so the hover effect can tilt it without moving its measured position
const Letters = ({ text }: { text: string }) => (
  <>{[...text].map((ch, i) => <span key={i} className="tl"><span className="tl-in">{ch}</span></span>)}</>
);
const smooth = (t: number) => t * t * (3 - 2 * t);

export default function Hero({ name, role, pitch, titleLines, tag, currently, code }: Props) {
  const sec = useRef<HTMLElement>(null);
  const cover = useRef<HTMLDivElement>(null);
  const photo = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const flip = useRef<HTMLDivElement>(null);
  const face = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const s = sec.current, c = cover.current, p = photo.current, t = content.current, f = flip.current, fc = face.current;
    if (!s || !c || !p || !t || !f || !fc) return;
    const mq = window.matchMedia("(min-width: 768px)");
    let raf = 0;

    const update = () => {
      raf = 0;
      if (!mq.matches) { [c, p, t, f, fc].forEach((el) => el.removeAttribute("style")); return; }
      const H = window.innerHeight, W = window.innerWidth;
      const y = clamp(-s.getBoundingClientRect().top, 0, s.offsetHeight - H);
      const q = smooth(clamp(y / (0.7 * H)));

      // giant title + corner text scroll away faster than the page
      c.style.transform = `translateY(${-y * 1.35}px)`;

      // photo travels from small/low to large/centered
      const w0 = 0.15 * W, w1 = Math.min(0.25 * W, 0.58 * H * 0.875);
      const h1 = (w1 * 8) / 7;
      // start just under the giant title so "ENGINEER" overlaps the photo's top edge slightly
      const fs = clamp(0.095 * W, 64, 168);
      const top0 = 0.18 * H + 1.8 * fs - 0.18 * fs, top1 = 0.46 * H - h1 / 2;
      p.style.width = `${w0 + (w1 - w0) * q}px`;
      p.style.top = `${top0 + (top1 - top0) * q}px`;

      // photo flips over (3D) while it travels; un-mirror the back so the face stays the right way round
      const deg = q * 180;
      f.style.transform = `perspective(1100px) rotateY(${deg}deg)`;
      fc.style.transform = `scaleX(${deg > 90 ? -1 : 1})`;

      // text around the photo fades in once it has mostly arrived
      const k = smooth(clamp((q - 0.45) / 0.55));
      t.style.opacity = String(k);
      t.style.transform = `translateY(${(1 - k) * 24}px)`;
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(update); };

    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      cancelAnimationFrame(raf);
    };
  }, []);

  // hover: letters of the giant title tilt, lift and dim around the cursor, then spring back
  useEffect(() => {
    const s = sec.current;
    if (!s || !window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 768px) and (prefers-reduced-motion: no-preference)").matches) return;
    const items = Array.from(s.querySelectorAll<HTMLElement>(".tl")).map((o) => ({ o, i: o.firstElementChild as HTMLElement, v: 0 }));
    let mx = -9999, my = -9999, raf = 0;

    const tick = () => {
      raf = 0;
      let busy = false;
      const R = clamp(window.innerWidth * 0.095, 64, 168) * 2.4;
      for (const it of items) {
        const b = it.o.getBoundingClientRect();
        const dx = b.left + b.width / 2 - mx, dy = b.top + b.height / 2 - my;
        const t = clamp(1 - Math.hypot(dx, dy) / R);
        const target = smooth(t);
        it.v += (target - it.v) * 0.14;
        if (target === 0 && it.v < 0.004) it.v = 0;
        else busy = true;
        const rot = clamp(dx / R, -1, 1) * it.v * 24;
        it.i.style.transform = it.v ? `translateY(${(-it.v * 0.07).toFixed(3)}em) rotate(${rot.toFixed(2)}deg)` : "";
        it.i.style.opacity = it.v ? String(1 - it.v * 0.5) : "";
      }
      if (busy) raf = requestAnimationFrame(tick);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const move = (e: PointerEvent) => { mx = e.clientX; my = e.clientY; kick(); };
    const leave = () => { mx = my = -9999; kick(); };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", kick, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", kick);
      document.documentElement.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  const [pa, pb] = pitch.split("RAG pipelines");

  return (
    <section ref={sec} className="relative md:h-[220vh]">
      <div className="pt-24 md:sticky md:top-0 md:h-screen md:overflow-hidden md:pt-0">
        <CodeBackground code={code} />

        {/* cover: giant title + corner text */}
        <div ref={cover} className="pointer-events-none px-6 text-center md:absolute md:inset-0 md:z-20 md:px-0 md:will-change-transform">
          <h1 aria-label={titleLines.join(" ")} className="font-display text-[clamp(3rem,13vw,5rem)] font-semibold uppercase leading-[.9] tracking-tight md:absolute md:inset-x-0 md:top-[18vh] md:text-[clamp(4rem,9.5vw,10.5rem)]">
            <span className="block"><span className="mr-[.15em] font-light text-paper/80">&lt;</span><span aria-hidden><Letters text={titleLines[0]} /></span></span>
            <span className="block"><span aria-hidden><Letters text={titleLines[1]} /></span><span className="ml-[.15em] font-light text-paper/80">/&gt;</span></span>
          </h1>
          <div className="mt-8 flex justify-between gap-4 text-left text-sm md:absolute md:inset-x-0 md:bottom-[7vh] md:mt-0 md:px-[11%] md:text-base">
            <span>©{new Date().getFullYear()}</span>
            <span>{tag}</span>
          </div>
        </div>

        {/* photo */}
        <div ref={photo} className="relative mx-auto mt-8 aspect-[7/8] w-64 md:absolute md:left-1/2 md:top-[50vh] md:z-10 md:mx-0 md:mt-0 md:w-[15vw] md:-translate-x-1/2 md:will-change-[width,top]">
          <div ref={flip} className="relative h-full w-full overflow-hidden rounded-md border border-line">
            <div ref={face} className="absolute inset-0">
              <Image src="/bg.jpg" alt={`Portrait of ${name}`} fill priority sizes="(min-width:768px) 25vw, 16rem" className="object-cover" />
            </div>
          </div>
        </div>

        {/* text around the photo */}
        <div ref={content} className="mx-auto max-w-7xl px-6 py-12 md:absolute md:inset-0 md:grid md:grid-cols-[1fr_minmax(0,min(25vw,23rem))_1fr] md:items-center md:gap-10 md:pb-[8vh] md:py-0 md:opacity-0">
          <div>
            <h2 className="font-display text-[clamp(2.75rem,5vw,5.5rem)] font-semibold leading-[.95] tracking-tight">Hi, I&rsquo;m<br />{name}.</h2>
            <p className="mt-5 max-w-[14ch] font-display text-xl font-medium leading-tight md:text-2xl">{role}.</p>
            <div className="mt-8 text-sm">
              <p className="text-mute">{currently.label}</p>
              {currently.lines.map((l) => <p key={l} className="mt-1 font-medium">{l}</p>)}
            </div>
          </div>
          <div className="hidden md:block" aria-hidden />
          <div className="mt-10 md:mt-0">
            <p className="max-w-sm text-lg leading-snug md:text-xl">
              {pb === undefined ? pitch : <>{pa}<strong>RAG pipelines</strong>{pb}</>}
            </p>
            <a href="#projects" className="mt-6 inline-block rounded-md bg-paper px-5 py-3 text-sm font-medium text-ink transition hover:bg-accent">Explore projects</a>
          </div>
        </div>
      </div>
    </section>
  );
}
