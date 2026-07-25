# Portfolio Website

Personal portfolio for **Fady Seha** — projects, resume, and contact.

**Live site:** [treewoper.github.io/PortfolioWebsite](https://treewoper.github.io/PortfolioWebsite/)

## Tech stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

## Local development

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

Preview the production build locally:

```bash
npm run build
npm run preview
```

For GitHub Pages, use the preview URL with the base path:  
`http://localhost:4173/PortfolioWebsite/`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Type-check and build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## Deployment

The site deploys to GitHub Pages via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. Push to `main`
2. The workflow runs `npm run build` and publishes `dist/` to the `gh-pages` branch
3. In repo **Settings → Pages**, set source to branch **`gh-pages`**, folder **`/` (root)**

`vite.config.ts` sets `base: '/PortfolioWebsite/'` so asset paths match the project site URL. Change this if you rename the repo or use a custom domain.

## Project structure

```
src/
  PersonalSite.tsx   # Main page (hero, projects, resume, contact)
  App.tsx
  main.tsx
  index.css
public/                # Static assets (images, videos, resume PDF)
```

## Contact form

The contact section uses [Formspree](https://formspree.io/) for submissions without a backend.
