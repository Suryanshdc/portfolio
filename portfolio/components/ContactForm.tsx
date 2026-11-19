"use client";
import { useState, type FormEvent } from "react";

export default function ContactForm({ to }: { to: string }) {
  const [f, setF] = useState({ name: "", email: "", msg: "" });
  const field = "w-full rounded-md border border-line bg-panel px-4 py-3 text-paper placeholder:text-mute focus:border-accent focus:outline-none";
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${f.name}`);
    const body = encodeURIComponent(`${f.msg}\n\n${f.name}\n${f.email}`);
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  };
  return (
    <form onSubmit={submit} className="grid gap-4">
      <label className="grid gap-1.5 text-sm text-mute">Your name
        <input required className={field} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
      </label>
      <label className="grid gap-1.5 text-sm text-mute">Email address
        <input required type="email" className={field} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
      </label>
      <label className="grid gap-1.5 text-sm text-mute">What do you have in mind?
        <textarea required rows={4} className={field} value={f.msg} onChange={(e) => setF({ ...f, msg: e.target.value })} />
      </label>
      <button className="rounded-md bg-paper px-5 py-3 font-medium text-ink transition hover:bg-accent">Create email draft</button>
    </form>
  );
}
