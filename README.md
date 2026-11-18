# KAIROS Registration Website

A responsive event registration landing page for **KAIROS — God’s Appointed Time**, organized by the McPherson University Chapel of Praise.

- Event: 28 November 2026
- Time: 8:00 AM–4:00 PM, West Africa Time
- Venue: Stephen and Hannah Obaro Hall, McPherson University
- Registration: https://forms.gle/SD2RkfVTwZcWujkw5

## Project structure

```
karios app/
├── frontend/     # Next.js app: pages, components, UI utils, config, app/api routes
└── backend/      # Data layer: Prisma schema, database, migrations, seed & scripts
```

- See [`frontend/README.md`](frontend/README.md) and [`backend/README.md`](backend/README.md) for details.
- Next.js requires API route handlers to stay in `frontend/app/api/`; they call the data layer in `backend/`.

## Commands

Run from the project root:

```bash
npm run dev          # start the app at http://localhost:3000
npm run build        # production build
npm run start        # serve the production build
npm run lint         # lint the frontend
npm run db:generate  # generate Prisma Client
npm run db:push      # push schema to database
npm run db:seed      # seed the database
npm run db:studio    # open Prisma Studio
npm run verify:db    # verify database contents
```

Copy `.env.example` to `frontend/.env` (or set the environment variables in your deployment platform) before running database commands.

## Features

| Feature | Description |
| --- | --- |
| Authentication | Role-based login. Regular users use email/password; `admin@karios.com` accesses the admin panel. Session stored in `localStorage`. |
| Dashboard | Statistic cards, recent orders table, and quick actions. |
| Admin Panel | Admin-only user management, PDF slip generation, admin status display. |
| Projects | Project tracking with status filters, progress, due dates, and owners. |
| Team | Team members with active/away/offline status indicators. |
| Slip Generation | `GET /api/slip?userId=...` returns a printable payment slip. |

## Technology stack

- **Framework:** Next.js 14 App Router, React 18, TypeScript
- **Database:** Prisma ORM (PostgreSQL)
- **Styling:** Tailwind CSS with shadcn-style components, Radix UI primitives
- **Forms:** React Hook Form + Zod
- **Charts:** Recharts
- **Notifications:** sonner

## Pages

- `/` dashboard, `/login`, `/admin`, `/projects`, `/team`, `/analytics`, `/settings`
