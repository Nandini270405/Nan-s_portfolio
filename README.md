# Nandini Kumari Biswal — Portfolio (Next.js + Tailwind + Framer Motion)

This repository is a ready-to-deploy personal portfolio scaffold customized from your resume.
It uses Next.js, TailwindCSS (dark-mode via system preference), and Framer Motion for animations.

## What's included
- `pages/` — Next.js pages (index.js)
- `public/profile.jpg` — your uploaded profile picture
- Tailwind & PostCSS config files
- `package.json` with dependencies

## Quick local setup
1. Install dependencies:
```bash
npm install
```
2. Run development server:
```bash
npm run dev
```
Open http://localhost:3000

## Deploy to Vercel
1. Push this folder to a new GitHub repository (or upload the zip).
2. Sign in to https://vercel.com with your GitHub account.
3. Create a new project and import the repository.
4. Use the default build command (`npm run build`) and output directory (auto).
Vercel will automatically detect Next.js and deploy.

## Notes & Next steps
- Update project `github` and `demo` links in `pages/index.js` to point to your real repos/live demos.
- If you want Tailwind to fully work locally, ensure packages in `package.json` are installed (tailwindcss, postcss, autoprefixer). After installation you can further customize `tailwind.config.js`.
- If you prefer dark-mode toggle (instead of system auto), I can add a switch component.

If you want, I can also:
- Create the GitHub repo for you (you'll need to provide GitHub auth/accept instructions).
- Push this code directly to your GitHub (I can't access your account; I will provide the files and exact commands).

Enjoy — and tell me any tweaks you want (colors, fonts, copy edits, project links)!
