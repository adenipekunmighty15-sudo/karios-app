# Frontend

This is the Next.js 14 (App Router) application. It contains everything the user sees
plus the API route handlers that Next.js requires to live inside `app/api/`.

## Contents

| Path | Purpose |
| --- | --- |
| `app/` | Pages (`dashboard`, `admin`, `projects`, `team`, `analytics`, `settings`, `login`) and `api/` route handlers |
| `components/ui/` | Reusable UI primitives (buttons, cards, tables, etc.) |
| `components/layout/` | Navbar, sidebar, theme toggle |
| `components/analytics-charts.tsx` | Chart components |
| `lib/utils.ts` | Shared frontend helpers (e.g. `cn`) |
| `*.config.*` | Next.js, TypeScript, Tailwind, and PostCSS configuration |

## Imports

- `@/...` resolves to files inside `frontend/` (configured in `tsconfig.json`)
- `@backend/...` resolves to files in the sibling `backend/` folder

## Run

From the project root:

```bash
npm run dev
```
