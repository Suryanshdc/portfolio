import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const sans = Space_Grotesk({ subsets: ["latin"], variable: "--font-sans" });

const title = "Suryansh | AI Engineer & Full-Stack Developer";
const description = "Suryansh, AI engineer and full-stack developer. RAG pipelines, LLM agents and workflow automation projects.";

export const metadata: Metadata = {
  title, description,
  openGraph: { title, description, images: ["/bg.jpg"], type: "website" },
  twitter: { card: "summary", title, description, images: ["/bg.jpg"] },
};
export const viewport = { themeColor: "#1b1b1a" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={sans.variable}>
      <head><script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem("theme");if(t)document.documentElement.dataset.theme=t}catch(e){}` }} /></head>
      <body>{children}</body>
    </html>
  );
}
