import { data } from "@/lib/data";
import Contact from "@/components/Contact";
import TechStack from "@/components/TechStack";
import Timeline from "@/components/Timeline";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { buildCode } from "@/lib/codeText";

const nav = [["Skills", "#skills"], ["Projects", "#projects"], ["Experience", "#experience"], ["Contact", "#contact"]];

export default function Home() {
  return (
    <>
      <Nav name={data.name} links={nav as [string, string][]} />

      <main id="top">
        <Hero name={data.name} role={data.role} pitch={data.pitch} titleLines={data.heroTitle} tag={data.heroTag} currently={data.currently} code={buildCode(data)} />

        <TechStack skills={data.skills} />

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

        <Contact email={data.email} links={data.links} />
      </main>

      <Footer name={data.name} role={data.role} email={data.email} links={data.links} nav={nav as [string, string][]} />
    </>
  );
}
