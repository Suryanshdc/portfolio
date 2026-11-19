import Image from "next/image";
import { data } from "@/lib/data";
import ContactForm from "@/components/ContactForm";
import Timeline from "@/components/Timeline";

const nav = [["Skills", "#skills"], ["Projects", "#projects"], ["Experience", "#experience"], ["Contact", "#contact"]];

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-10 border-b border-line bg-ink/85 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="font-display text-xl font-semibold">{data.name}</a>
          <ul className="flex gap-5 text-sm text-mute sm:gap-8">
            {nav.map(([l, h]) => <li key={h}><a className="transition hover:text-paper" href={h}>{l}</a></li>)}
          </ul>
        </nav>
      </header>

      <main id="top">
        <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-4 select-none">
          <div className="marquee outline-text flex w-max whitespace-nowrap font-display text-[clamp(6rem,19vw,17rem)] font-semibold uppercase leading-none">
            <span>AI Engineer /&gt; Full-Stack Developer /&gt;&nbsp;</span>
            <span>AI Engineer /&gt; Full-Stack Developer /&gt;&nbsp;</span>
          </div>
        </div>
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-[1.1fr_.9fr] md:py-28">
          <div>
            <h1 className="hero-in font-display text-[clamp(3.5rem,11vw,8rem)] font-semibold leading-[.92] tracking-tight">{data.name}.</h1>
            <p className="mt-6 font-display text-2xl text-accent">{data.role}</p>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-paper/80">{data.pitch}</p>
            <p className="mt-8 text-sm text-mute">{data.status}, {data.school}</p>
            <a href="#projects" className="mt-8 inline-block rounded-md bg-paper px-5 py-3 font-medium text-ink transition hover:bg-accent">Explore projects</a>
          </div>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-sm border border-line">
            <Image src="/bg.jpg" alt={`Portrait of ${data.name}`} fill priority sizes="(min-width:768px) 420px, 90vw" className="object-cover" />
          </div>
        </div>
        </section>

        <section id="skills" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="font-display text-4xl font-semibold md:text-5xl">Tech stack</h2>
            <p className="mt-3 text-mute">The tools behind my work.</p>
            <div className="mt-12 grid gap-10 md:grid-cols-3">
              {data.skills.map((s) => (
                <div key={s.title}>
                  <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                  <p className="mt-1 text-sm text-mute">{s.sub}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {s.items.map((i) => <li key={i} className="cursor-default rounded-full border border-line px-3 py-1 text-sm transition-colors duration-200 hover:border-paper hover:bg-paper hover:text-ink">{i}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="flex items-end justify-between">
              <h2 className="font-display text-4xl font-semibold md:text-5xl">Featured projects</h2>
              <a className="text-sm text-mute underline-offset-4 hover:text-paper hover:underline" href={data.links.GitHub}>All on GitHub</a>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {data.projects.map((p) => (
                <a key={p.name} href={p.repo} target="_blank" rel="noopener noreferrer" className="group folder block">
                  <span className="folder-tab" />
                  <span className="folder-back" />
                  <span className="sheet s2" />
                  <span className="sheet" />
                  <span className="folder-front">
                    <span>
                      <span className="block text-sm text-accent">{p.tag}</span>
                      <span className="mt-1 block font-display text-3xl font-semibold">{p.name}</span>
                      <span className="mt-2 line-clamp-3 block max-w-md text-sm leading-relaxed text-paper/70">{p.desc}</span>
                    </span>
                    <span className="text-sm text-mute transition group-hover:text-paper">View source on GitHub</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="font-display text-4xl font-semibold md:text-5xl">Experience</h2>
            <Timeline items={data.experience} />
          </div>
        </section>

        <section id="contact" className="border-t border-line">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2">
            <div>
              <h2 className="font-display text-4xl font-semibold md:text-5xl">Let&rsquo;s talk.</h2>
              <p className="mt-4 max-w-sm text-paper/75">Whether it&rsquo;s a full-time role or a freelance project, my inbox is open.</p>
              <a className="mt-6 block break-all text-accent underline-offset-4 hover:underline" href={`mailto:${data.email}`}>{data.email}</a>
              <ul className="mt-6 flex gap-5 text-sm text-mute">
                {Object.entries(data.links).map(([l, h]) => <li key={l}><a className="hover:text-paper" href={h} target="_blank" rel="noopener noreferrer">{l}</a></li>)}
              </ul>
            </div>
            <ContactForm to={data.email} />
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-6 py-8 text-sm text-mute">
          <span>{data.name} · {data.role}</span>
          <span>© {new Date().getFullYear()} {data.name}</span>
        </div>
      </footer>
    </>
  );
}
