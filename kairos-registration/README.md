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
| Registration link | `REGISTRATION_URL` near the top of `src/App.tsx` — updates the official-form fallback link |
| Countdown / event date | `EVENT_START` near the top of `src/App.tsx` |
| Speaker names & bios | `SPEAKERS` array near the top of `src/App.tsx` |
| Event wording | `src/App.tsx` (hero, about, speakers, details, scripture, registration sections) |
| Colours & glass effects | CSS variables at the top of `src/index.css` |

## Flyer image

The site includes a designed poster fallback. To use the official flyer instead:

1. Save the flyer as `public/kairos-flyer.jpg`.
2. It will automatically replace the fallback — no code changes needed.

## Registration form

Registration buttons scroll to the branded form in the **Register** section instead of leaving the site, so the form uses the same blue/orange background and glass styling as the rest of the app. The form submits directly to the official Google Form (`FORM_ENDPOINT` in `src/App.tsx`) using its question IDs, so responses still appear in the same Google Sheet/form responses.

- `REGISTRATION_URL` is kept as an "official Google Form" fallback link for anyone who prefers it.
- If the form questions ever change in Google Forms, the `entry.*` field names in `src/App.tsx` must be updated to match.

## Speakers

The Speakers section is powered by the `SPEAKERS` array at the top of `src/App.tsx`. Replace the placeholder names, roles and bios there — no other changes are needed.
