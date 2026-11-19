import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--ink) / <alpha-value>)", panel: "rgb(var(--panel) / <alpha-value>)", line: "rgb(var(--line) / <alpha-value>)",
        paper: "rgb(var(--paper) / <alpha-value>)", mute: "rgb(var(--mute) / <alpha-value>)", accent: "rgb(var(--accent) / <alpha-value>)",
      },
      fontFamily: { display: ["var(--font-sans)", "sans-serif"], body: ["var(--font-sans)", "sans-serif"] },
    },
  },
  plugins: [],
};
export default config;
