# Karios App

This repository contains two projects.

## 1. Karios Dashboard — `frontend/` + `backend/`

A full-stack SaaS dashboard built with Next.js 14 (App Router), React 18, Prisma and Tailwind CSS.

```
frontend/   # Next.js app: pages, components, UI utils, config, app/api route handlers
backend/    # Data layer: Prisma schema, database, migrations, seed and scripts
```

Run it from the repository root:

```bash
npm install
npm run dev
```

Other commands: `npm run build`, `npm run start`, `npm run lint`, `npm run db:generate`, `npm run db:push`, `npm run db:seed`, `npm run db:studio`, `npm run verify:db`.

Copy `.env.example` to `frontend/.env` (or set the environment variables in your deployment platform) before using the database.

## 2. KAIROS Registration Site — `kairos-registration/`

A single-page event registration website for **KAIROS — God's Appointed Time** (McPherson University Prays), built with React 19, TypeScript, Vite and Tailwind CSS 4 with custom glassmorphism styling. It includes a live countdown, the official event content, and links to the Google Form.

Run it from its own folder:

```bash
cd kairos-registration
npm install
npm run dev
```

Build with `npm run build`. See [`kairos-registration/README.md`](kairos-registration/README.md) for details on changing the registration link, event date, colours and flyer image.
