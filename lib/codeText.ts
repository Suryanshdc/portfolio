import type { data as D } from "./data";

// Builds the source-code-looking text shown (dim, lit on hover) behind the hero. Stays in sync with lib/data.ts.
export function buildCode(d: typeof D): string {
  const q = (s: string) => JSON.stringify(s);
  const list = (a: string[]) => `[${a.map(q).join(", ")}]`;
  const v = d.name.toLowerCase();
  return [
    `const ${v} = {`,
    `  name: ${q(d.name)},`,
    `  role: ${q(d.role)},`,
    `  focus: ${list(["RAG pipelines", "LLM agents", "workflow automation"])},`,
    `  status: ${q(d.status)},`,
    `  experience: [`,
    ...d.experience.map((e) => `    { period: ${q(e.period)}, title: ${q(e.title)}${e.org ? `, org: ${q(e.org)}` : ""} },`),
    `  ],`,
    `  projects: [`,
    ...d.projects.map((p) => `    { name: ${q(p.name)}, tag: ${q(p.tag)}, repo: ${q(p.repo)} },`),
    `  ],`,
    `  skills: {`,
    ...d.skills.map((s) => `    ${q(s.title)}: ${list(s.items)},`),
    `  },`,
    `  contact: { email: ${q(d.email)}, github: ${q(d.links.GitHub)}, linkedin: ${q(d.links.LinkedIn)} },`,
    `};`,
    ``,
    `export default function Portfolio() {`,
    `  return (`,
    `    <main>`,
    `      <Hero name={${v}.name} role={${v}.role} />`,
    `      <section id="skills">`,
    `        {Object.entries(${v}.skills).map(([category, tools]) => (`,
    `          <div key={category}><h3>{category}</h3><p>{tools.join(", ")}</p></div>`,
    `        ))}`,
    `      </section>`,
    `      <section id="projects">`,
    `        {${v}.projects.map((p) => <ProjectFolder key={p.name} {...p} />)}`,
    `      </section>`,
    `      <section id="experience">`,
    `        <Timeline items={${v}.experience} />`,
    `      </section>`,
    `      <Contact email={${v}.contact.email} />`,
    `    </main>`,
    `  );`,
    `}`,
    ``,
  ].join("\n");
}
