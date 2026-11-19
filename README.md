# Suryansh | Portfolio

Personal portfolio of Suryansh, an AI engineer and full-stack developer (RAG pipelines, LLM agents, workflow automation). Built with Next.js and Tailwind CSS.

## Features

- **Scroll-driven hero:** a giant title scrolls away while the portrait grows and flips into place.
- **Hover-lit code background:** dim source-code text behind the hero, generated from `lib/data.ts`. A soft spotlight lights it up under the cursor (desktop only).
- **Film grain:** a subtle grain texture over the whole page.
- **Folder-style project cards** that open on hover.
- **Skills, experience timeline and contact form.** The form opens a pre-filled email draft, so no backend is needed.
- **Dark and light theme** with the choice saved in `localStorage`.
- **Crowd footer:** an illustrated crowd walks past a standing portrait of Suryansh.
- Respects `prefers-reduced-motion`.

## Tech stack

Next.js (App Router), React 19, TypeScript, Tailwind CSS 3, Space Grotesk via `next/font`.

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Project structure

```
app/
  layout.tsx        metadata, font, theme bootstrap
  page.tsx          page composition
  globals.css       theme variables, folder cards, code background, grain, footer crowd
components/
  Nav.tsx           floating nav, theme toggle
  Hero.tsx          scroll-driven hero
  CodeBackground.tsx  hover-lit code text
  TechStack.tsx, Timeline.tsx, Contact.tsx
  Footer.tsx        crowd footer
lib/
  data.ts           all site content
  codeText.ts       builds the background code text from data.ts
  crowd.ts          list of crowd images (file id, width, height)
public/
  bg.jpg            hero portrait and social preview image
  suryansh-standing.webp   standing figure in the footer
  crowd/            105 individual people (p001.webp to p105.webp)
  grain.png         grain texture
```

## Customizing

- **Content:** edit `lib/data.ts` (name, role, skills, projects, experience, email, links). The hero, background code text, nav and footer all read from it.
- **Hero portrait and social preview:** replace `public/bg.jpg`.
- **Footer figure:** replace `public/suryansh-standing.webp` (transparent background, full body). Its size is set by `.crowd-figure` in `app/globals.css`.
- **Crowd:** lane count, size, spacing and speed are in the `lanes` array at the top of `components/Footer.tsx`.
- **Colors:** theme variables are at the top of `app/globals.css`.
- **Photo overlap in the hero:** the start position is the `top0` line in `components/Hero.tsx`.

## Deploy

1. Push the repo to GitHub.
2. On [vercel.com](https://vercel.com), choose Add New, then Project, import the repo and click Deploy. No settings need changing.
3. Set `metadataBase` in `app/layout.tsx` to your live URL so link previews (LinkedIn, X) show the correct image.

## Contact

- Email: suryanshshrivastava11@gmail.com
- GitHub: [Suryanshdc](https://github.com/Suryanshdc)
- LinkedIn: [suryansh2](https://www.linkedin.com/in/suryansh2/)
