# Backend

This folder contains all the server-side / data layer code for Karios.

## Contents

| Path | Purpose |
| --- | --- |
| `lib/prisma.ts` | Shared Prisma Client instance (imported in the frontend as `@backend/lib/prisma`) |
| `prisma/schema.prisma` | Database schema (User, Project, Order, AnalyticsEvent) |
| `prisma/migrations/` | Database migration history |
| `prisma/dev.db` | Local database file |
| `prisma/seed.ts` | Main database seed script |
| `scripts/` | Seed and database-verification utilities |

## Commands

Run these from the project root (they already point at this folder):

- `npm run db:generate` — generate the Prisma Client
- `npm run db:push` — push the schema to the database
- `npm run db:seed` — seed the database
- `npm run db:studio` — open Prisma Studio
- `npm run verify:db` — check database counts

## Note on API routes

Next.js requires route handlers to live in `app/api/`, so the API endpoints remain in
`frontend/app/api/`. They are thin controllers that call the data layer here in `backend/`.
