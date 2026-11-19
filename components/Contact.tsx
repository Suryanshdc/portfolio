"use client";
import { useState, type FormEvent, type ReactElement } from "react";

const Arrow = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M7 17L17 7M8 7h9v9" />
  </svg>
);

const icons: Record<string, ReactElement> = {
  LinkedIn: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  ),
  GitHub: (
    <svg width="22" height="22" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  ),
};

type Props = { email: string; links: Record<string, string> };

export default function Contact({ email, links }: Props) {
  const [f, setF] = useState({ name: "", email: "", msg: "" });
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try { await navigator.clipboard.writeText(email); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {}
  };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${f.name}`);
    const body = encodeURIComponent(`${f.msg}\n\n${f.name}\n${f.email}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const label = "text-[clamp(.9rem,.9vw,1.2rem)] font-semibold";
  const field = "mt-3 w-full border-0 border-b border-mute bg-transparent pb-4 pt-3 text-[clamp(1rem,1.1vw,1.4rem)] text-paper placeholder:text-mute focus:border-paper focus:outline-none md:mt-[.9vw] md:pb-[1.2vw] md:pt-[.85vw]";

  return (
    <section id="contact">
      <div className="mx-auto grid max-w-[120rem] gap-16 px-6 py-24 md:grid-cols-[1.066fr_1fr] md:gap-0 md:px-[11.3vw] md:py-[9vw]">
        <div>
          <h2 className="text-[clamp(3.5rem,6.7vw,9rem)] font-semibold leading-none tracking-tight">Let&rsquo;s talk.</h2>
          <p className="mt-6 max-w-md text-[clamp(1.1rem,1.25vw,1.6rem)] leading-[1.5] text-mute md:mt-[1.7vw] md:max-w-[23vw]">
            Whether it&rsquo;s a full-time role or a freelance project, my inbox is open.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4 md:mt-[2.6vw] md:gap-[1vw]">
            <a href={`mailto:${email}`} className="flex items-center gap-3 break-all text-[clamp(1.1rem,1.36vw,1.8rem)] font-semibold md:gap-[.75vw]">
              {email}<Arrow size={16} />
            </a>
            <button onClick={copy} aria-label="Copy email address" className="grid h-12 w-12 place-items-center rounded-[4px] border border-line text-paper transition hover:border-paper md:h-[2.9vw] md:w-[2.9vw]">
              {copied ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 13l4 4L19 7" /></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V6a2 2 0 012-2h9" /></svg>
              )}
            </button>
          </div>
          <ul className="mt-10 flex flex-wrap gap-6 md:mt-[3.2vw] md:gap-[1.45vw]">
            {Object.entries(links).map(([l, h]) => (
              <li key={l}>
                <a href={h} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-[clamp(.9rem,.9vw,1.2rem)] font-medium transition hover:text-mute">
                  {icons[l]}{l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={submit} className="md:pt-[1.3vw]">
          <div className="grid gap-10 md:grid-cols-2 md:gap-x-[1.6vw]">
            <label className="block">
              <span className={label}>Your name</span>
              <input required className={field} placeholder="What should I call you?" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
            </label>
            <label className="block">
              <span className={label}>Email address</span>
              <input required type="email" className={field} placeholder="you@company.com" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
            </label>
          </div>
          <label className="mt-10 block md:mt-[2.3vw]">
            <span className={label}>What do you have in mind?</span>
            <textarea required className={`${field} h-40 resize-y md:h-[9.7vw]`} placeholder="A little about your opportunity or project…" value={f.msg} onChange={(e) => setF({ ...f, msg: e.target.value })} />
          </label>
          <button className="mt-10 flex w-fit items-center gap-10 rounded-[4px] bg-paper px-7 py-5 text-[clamp(.95rem,1vw,1.3rem)] font-medium text-ink transition hover:opacity-85 md:mt-[2.15vw] md:gap-[3.1vw] md:px-[1.5vw] md:py-[1.2vw]">
            Create email draft<Arrow size={18} />
          </button>
        </form>
      </div>
    </section>
  );
}
