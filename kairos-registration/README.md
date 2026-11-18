# KAIROS — God's Appointed Time

Single-page event registration website for **McPherson University Prays**, built with React 19, TypeScript, Vite and Tailwind CSS 4, with custom CSS and glassmorphism styling.

## Run

```bash
cd kairos-registration
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## What to edit

| Change | Where |
| --- | --- |
| Registration link | `REGISTRATION_URL` near the top of `src/App.tsx` — updates every button and the embedded form |
| Countdown / event date | `EVENT_START` near the top of `src/App.tsx` |
| Event wording | `src/App.tsx` (hero, about, details, scripture, registration sections) |
| Colours & glass effects | CSS variables at the top of `src/index.css` |

## Flyer image

The site includes a designed poster fallback. To use the official flyer instead:

1. Save the flyer as `public/kairos-flyer.jpg`.
2. It will automatically replace the fallback — no code changes needed.

## Google Form

The external Google Form itself cannot be restyled from this codebase (Google controls its markup). The site wraps it in a glassmorphic card with an event-styled background, heading and status indicator, plus a fallback link in case embedding is blocked. All buttons point to the same URL in `REGISTRATION_URL`.
