# Arian — Developer & Product Builder Portfolio

A premium, responsive portfolio built with Next.js App Router, React, TypeScript, Framer Motion, and Three.js. The visual system is intentionally custom: cinematic dark surfaces, restrained violet/cyan lighting, editorial project layouts, CSS-built project previews, and an interactive 3D hero sculpture.

## Features

- Responsive one-page portfolio with Home, Work, Products, About, Services, and Contact sections
- Interactive Three.js hero sculpture with pointer response, resize handling, reduced-motion support, and a CSS fallback
- Project filtering and accessible project-detail overlays
- Product spotlights for the Smart Hydration Bottle concept and NBA Knowledge Game prototype
- CSS-built project artwork (no stock-image dependency)
- Dark/light theme toggle with local persistence
- Mobile navigation overlay, scroll progress, custom desktop cursor, magnetic CTAs, and scroll reveals
- Centralized content in `lib/site-config.ts` and `lib/projects.ts`
- Contact API route with validation, honeypot field, escaped email content, and real Resend delivery
- SEO metadata, Open Graph basics, favicon, and reduced-motion styles

## Requirements

- Node.js 20.9 or newer (Node 22 LTS recommended)
- npm

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

The site itself runs without contact-form credentials. Until the contact form is configured, the form intentionally returns a clear configuration message rather than pretending a message was sent.

## Configure the contact form

1. Create a Resend account and verify a sending domain (or use the provider's permitted test sender for development).
2. Add these values to `.env.local`:

```env
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=you@example.com
CONTACT_FROM_EMAIL=Portfolio <hello@your-verified-domain.com>
```

3. Restart the development server.
4. Submit a test enquiry and verify that it arrives in the destination inbox.
5. Before a high-traffic public launch, add host-level rate limiting or a privacy-friendly anti-abuse challenge; the included honeypot is only a lightweight first layer.

The server route is `app/api/contact/route.ts`. Never put `RESEND_API_KEY` in a `NEXT_PUBLIC_` variable or client-side file.

## Personalize the website

### Identity and links

Edit `lib/site-config.ts`:

- `name`, `shortName`, `role`, `location`, and `availability`
- `email`
- `github`, `linkedin`, and optional `instagram`

A blank LinkedIn or Instagram value hides that social link automatically.

### Projects and products

Edit `lib/projects.ts`:

- `projects` controls the Selected Work gallery and its filters.
- `products` controls the Product Thinking section.
- `services` controls the Services list.
- `technologies` controls the interactive toolkit visualization.

Each project supports a title, category, status, tags, year, visual type, optional live/source URLs, and a case-study detail object. Only add `liveUrl` when a working public demo exists. Only add `sourceUrl` when the repository is public and correct. Do not mark concepts or prototypes as launched products.

Available visual types: `storefront`, `billiards`, `basketball`, `bottle`. Add a new visual in `components/project-visual.tsx` and its corresponding styles in `app/globals.css` when adding a new type.

### Theme and visual system

Edit the CSS variables near the top of `app/globals.css`. The dark theme is the default; the light theme is selected with `data-theme="light"` on the root element.

## Production

```bash
npm run build
npm run start
```

Deploy to Vercel or another Node.js host that supports Next.js App Router and route handlers. Add the three Resend environment variables in the hosting provider's environment settings before enabling the contact form in production.

## Quality checks before launch

- Replace placeholder or provisional project descriptions with final approved copy.
- Confirm the public GitHub repository URL and add a real live demo only when available.
- Add your LinkedIn URL and public email address.
- Configure and test Resend delivery.
- Test the mobile menu, filters, theme switch, project overlays, and form at mobile/tablet/desktop widths.
- Run `npm run build` after installing dependencies.

## Honest project status

- Smart Hydration Bottle is displayed as a **Concept**. The weight-measurement approach still requires hardware calibration and real-world validation.
- NBA Knowledge Game is displayed as a **Prototype**. The showcase only lists trivia questions, the interactive question flow, and score tracking. Leaderboards and multiplayer are presented as future exploration, not existing features.
- The **Mr. Biliard** project is based on the public Django repository and is labelled **In progress** because the catalogue and production deployment still need business-specific completion.
- The website projects are labelled **Prototype** or **In progress** where a verified public launch URL was not provided.


## Deploy to GitHub Pages

This repository is configured for a static GitHub Pages deployment at `https://arianhero.github.io/Arian-portfolio/`. The GitHub Actions workflow in `.github/workflows/deploy.yml` builds the Next.js static export and publishes the `out` directory.

1. In GitHub, open **Settings → Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Push the project files to the `main` branch.
4. Open the **Actions** tab and wait for **Deploy portfolio to GitHub Pages** to finish.
5. Open `https://arianhero.github.io/Arian-portfolio/`.

GitHub Pages cannot run server-side Next.js API routes. For this static preview, the contact form does not submit to a server. If a public email is added in `lib/site-config.ts`, the form opens a pre-filled email draft instead. Use a hosted form provider or a server-capable host for automatic email delivery.
