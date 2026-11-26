# Arian Haghani — Civil Engineering Student & Digital Product Builder

A premium, responsive personal portfolio built with Next.js App Router, React, TypeScript, Framer Motion, and Three.js. It combines an editorial dark visual system, interactive 3D hero, project case studies, product concepts, a personal profile, and a GitHub Pages static deployment.

## Portfolio content

- Civil Engineering student at Amirkabir University of Technology (AUT)
- Basketball lover and NBA Knowledge Game prototype creator
- Website projects: Nowastedtime.ir, Tehran Online Shop, and Mr. Biliard
- Product concept: Smart Hydration Bottle
- Current research: a mathematical trading formula, clearly labelled as in progress and not as a proven trading system

## Features

- Responsive one-page portfolio with Home, Work, Products, About, Services, and Contact sections
- Interactive Three.js hero sculpture with pointer response, resize handling, reduced-motion support, and CSS fallback
- Project filtering and accessible project-detail overlays
- Product spotlights for the Smart Hydration Bottle concept and NBA Knowledge Game prototype
- CSS-built project artwork (no stock-image dependency)
- Education and basketball interest highlights
- Dark/light theme toggle, mobile navigation, scroll progress, custom desktop cursor, magnetic CTAs, and scroll reveals
- Centralized content in `lib/site-config.ts` and `lib/projects.ts`
- Static contact-form fallback: opens a pre-filled email draft when a public email address is configured
- SEO metadata, Open Graph basics, favicon, and reduced-motion styles

## Requirements

- Node.js 20.9 or newer (Node 22 LTS recommended)
- npm

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Personalize the website

### Identity and links

Edit `lib/site-config.ts`:

- `name`, `shortName`, `role`, `location`, and `availability`
- `education` for the Civil Engineering programme and university details
- `email`, `github`, `linkedin`, `instagram`, and `instagramHandle`

The university ranking line is accompanied by a note because rankings can vary by ranking body and year. Update it if you want to reference a specific ranking source and year.

### Projects and products

Edit `lib/projects.ts`:

- `projects` controls the Selected Work gallery and its filters.
- `products` controls the Product Thinking section.
- `services` controls the Services list.
- `technologies` controls the interactive toolkit visualization.

Each project supports a title, category, status, tags, year, visual type, optional live/source URLs, and a case-study detail object. Only add a `liveUrl` when the public URL is confirmed. Only add a `sourceUrl` when the repository is public and correct.

Available visual types: `storefront`, `billiards`, `basketball`, `bottle`, `time`, and `trading`. Add a new visual in `components/project-visual.tsx` and its corresponding styles in `app/globals.css` when adding a new type.

## Deploy to GitHub Pages

This repository is configured for a static GitHub Pages deployment at:

`https://arianhero.github.io/Arian-portfolio/`

The GitHub Actions workflow in `.github/workflows/deploy.yml` builds the Next.js static export and publishes the `out` directory.

1. In GitHub, open **Settings → Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions** (not Deploy from a branch).
3. Commit or upload the project files to the `main` branch.
4. Open the **Actions** tab and wait for **Deploy portfolio to GitHub Pages** to finish successfully.
5. Open the URL above.

GitHub Pages only hosts static files and cannot run server-side Next.js API routes. The contact form therefore uses a `mailto:` fallback when an email address is added to `lib/site-config.ts`; the visitor must send the message from their email app. For automatic form delivery, connect a hosted form service or deploy to a server-capable host.

## Honest project status

- Nowastedtime.ir is listed as a live website using the URL supplied by Arian. Add a fuller case study when project details and screenshots are ready.
- Tehran Online Shop is listed as an in-progress storefront project until its public page URL is confirmed.
- The Trading Formula is shown as research in progress, with no profitability or performance claims.
- Smart Hydration Bottle is displayed as a **Concept**. The weight-measurement approach still requires hardware calibration and real-world validation.
- NBA Knowledge Game is displayed as a **Prototype**. The showcase only lists interactive trivia questions, the question flow, and score tracking. Leaderboards and multiplayer are presented as future exploration, not existing features.
- Mr. Biliard is labelled **In progress** because production inventory, deployment, and end-to-end enquiry delivery still need verification.
