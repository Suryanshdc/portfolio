import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display" });
const body = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-body" });

const title = "Suryansh | AI Engineer & Full-Stack Developer";
const description = "Suryansh, AI engineer and full-stack developer. RAG pipelines, LLM agents and workflow automation projects.";

export const metadata: Metadata = {
  title, description,
  openGraph: { title, description, images: ["/bg.jpg"], type: "website" },
  twitter: { card: "summary", title, description, images: ["/bg.jpg"] },
};
export const viewport = { themeColor: "#11151c" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
