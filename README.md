# Arian Haghani — Civil Engineering Student & Digital Product Builder

A premium, responsive personal portfolio built with Next.js App Router, React, TypeScript, Framer Motion, and Three.js. It combines an editorial dark visual system, interactive 3D hero, project case studies, product concepts, a personal profile, and a GitHub Pages static deployment.

## Portfolio content

- Civil Engineering student at Amirkabir University of Technology (AUT)
- Basketball enthusiast with a playable NBA trivia prototype
- Website projects: Nowastedtime.ir, Tehran Online Shop, and Mr. Biliard
- Product concept: Smart Hydration Bottle
- Mathematical trading formula research in progress
- Literature review on everyday traffic violations in Tehran
- Conference paper in preparation on water waste across Tehran
- Traffic Violation Reporting App in progress

## Features

- Responsive one-page portfolio with Home, Work, Products, About, Collaborate, and Contact sections
- Interactive Three.js hero sculpture with pointer response, resize handling, reduced-motion support, and CSS fallback
- Project filtering and accessible project-detail overlays
- Product spotlights for the Smart Hydration Bottle concept and NBA Knowledge Game prototype
- CSS-built project artwork (no stock-image dependency)
- Education and basketball interest highlights
- Dark/light theme toggle, mobile navigation, scroll progress, custom desktop cursor, magnetic CTAs, and scroll reveals
- Centralized content in `lib/site-config.ts` and `lib/projects.ts`
- Contact by email draft or optional Formspree submission
- A favicon and social share image under the GitHub Pages project URL

## Requirements

- Node.js 22
- npm

## Run locally

```bash
npm ci
npm run dev
```

Open http://localhost:3000/Arian-portfolio/.

## Personalize the website

### Identity and links

Edit `lib/site-config.ts`:

- `name`, `shortName`, `role`, `location`, and `availability`
- `education` for the Civil Engineering programme and university details
- `email`, `github`, `linkedin`, `instagram`, and `instagramHandle`

The university ranking appears as Arian's description.

### Projects and products

Edit `lib/projects.ts`:

- `projects` controls the Selected Work gallery and its filters.
- `products` controls the Product Thinking section.
- `collaborationTopics` controls the Collaborate section.
- `familiarTechnologies` in `lib/site-config.ts` controls the list of technologies Arian is familiar with.

Each project supports a title, category, status, tags, year, visual type, optional live/source URLs, and a case-study detail object. Only add a `liveUrl` when the public URL is confirmed. Only add a `sourceUrl` when the repository is public and correct.

Project artwork is defined in `components/project-visual.tsx` and `app/globals.css`.

## Deploy to GitHub Pages

This repository is configured for a static GitHub Pages deployment at:

`https://arianhero.github.io/Arian-portfolio/`

The GitHub Actions workflow in `.github/workflows/deploy.yml` builds the Next.js static export and publishes the `out` directory.

1. Extract the ZIP and open the folder that contains `package.json`.
2. In GitHub, go to the repository's **Code** tab and choose **Add file → Upload files**.
3. Drag the contents of the extracted folder onto the upload page. Preserve the folder names, including `.github`, and upload `package-lock.json` with `package.json`.
4. Commit to `main`. The existing Pages workflow will run automatically.
5. In **Actions**, open the latest **Deploy Portfolio to GitHub Pages** run. Once both jobs are green, reload the portfolio URL above.

For a new repository setup, choose **GitHub Actions** under **Settings → Pages → Build and deployment → Source**. The workflow installs locked dependencies, builds the static export, and publishes `out/`.

## Contact delivery

With the public email in `lib/site-config.ts`, the form opens an email draft that the visitor sends from their email app.

To receive submissions directly from the website, create a [Formspree form](https://formspree.io/) and confirm its recipient. In GitHub, go to **Settings → Secrets and variables → Actions → Variables**, add a repository variable named `NEXT_PUBLIC_FORMSPREE_FORM_ID`, and paste only the form ID from the Formspree URL. Run the Pages workflow again. The form shows a confirmation after Formspree accepts the submission. For local development, the same public variable can be set in `.env.local`.

## Honest project status

- Nowastedtime.ir is a live personal planner for tasks, habits, and workouts.
- Tehran Online Shop is listed as an in-progress storefront project until its public page URL is confirmed.
- The Trading Formula is shown as research in progress, with no profitability or performance claims.
- Smart Hydration Bottle is displayed as a **Concept**. The weight-measurement approach still requires hardware calibration and real-world validation.
- NBA Knowledge Game is a **Prototype** with five questions, answer feedback, scoring, and replay. The questions use the [NBA rules](https://official.nba.com/rule-no-5-scoring-and-timing) and the [NBA's 2016 MVP announcement](https://pr.nba.com/stephen-curry-2015-16-kia-nba-mvp-award-warriors/).
- Mr. Biliard is labelled **In progress** because production inventory, deployment, and end-to-end enquiry delivery still need verification.
