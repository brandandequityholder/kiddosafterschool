# Kiddos After School — website

The Kiddos After School site, built on the Kiddos Summer Camp rebuild (same components, same
design system) with the copy and navigation from the *Kiddos After School Wireframes*.

**Draft status:** copy that the wireframes flagged as still needed renders as a yellow highlighted
note on the page (search the code for `draft-note`, or the content file for `[NEEDED` / `[CONFIRM`).
Replace those strings in `src/content/site.json` and the highlight disappears.

Same stack as the current site so it drops straight into the existing GitHub → Vercel flow:

| Layer | Choice |
|---|---|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind 3 (all brand values inline, no extra config needed) |
| Routing | react-router-dom 6 |
| Content | `src/content/site.json` (Sanity-ready: same hook, dataset can be added later) |
| Contact form | EmailJS (same service + template as today) |
| Hosting | Vercel (`vercel.json` rewrites all routes to `index.html`) |

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve dist/ locally
```

## Project layout

```
public/
  assets/   every SVG curve, blob, logo, video and image the site uses (clean names, no hashes)
  cms/      media that lives in Sanity (team videos, name blobs, activity + step icons)
  fonts/    MADE Gentle, More Sugar, Gibson, Proxima — self-hosted
src/
  components/  Announcement, Navbar (desktop dropdowns + mobile menu + brand switcher),
               Footer (+ "One Click Away" CTA), AnythingElse, Button
  pages/       Home, Schedule, Pricing, Team, Values (The Kiddos Way), Policies, Faq, Contact
  content/     sanity-export.json (CMS fallback), benefits.js, pricingSvgs.jsx,
               teamSvgs.jsx, policyCards.jsx (decorative artwork extracted 1:1)
  lib/         sanity.js (client + useContent + assetUrl), RichText.jsx, hooks.js
  styles/      index.css (fonts, fade-in, nav hover rules)
scripts/
  pull-content.mjs   re-export Sanity content + media into the repo
```

## Content

All copy lives in `src/content/site.json`, keyed by page:

| Route | Key |
|---|---|
| `/` | `homePageContent` (+ `benefits`, `announcement`, `lastSec`, `footer`) |
| `/schedule` | `schedulePage` |
| `/pricing` | `homePage` *(kept from the camp schema; holds Rates & Enrollment + `ratesBySchool`)* |
| `/classes` | `classesPage` |
| `/schools/:slug` | `schools[]` (e-rivers, garden-hills, atlanta-classical) |
| `/team` | `teamPage` |
| `/values` | `KiddosWayPage` |
| `/policies` | `policiesPage` |
| `/faq` | `faqPage` |
| `/contact` | `contactPage` + `schools[]` |
| all inner pages | `anythingElseSection` |

Inline markup supported in text fields: `<br>`, `<green>…</green>`, `<yellow>…</yellow>`, `<strong>`,
`<u>`, `<a href>`. Anything in square brackets starting with NEEDED / CONFIRM / TIME / GRADES NEEDED /
PARENT NAME renders as a draft highlight.

To move content into Sanity later: create an after-school dataset with the same document types,
set `VITE_SANITY_LIVE=true` plus the project/dataset vars, and `useContent()` will refresh from it.

## Media still needed

- After school photos/videos: every hero, the team portraits and the school-page carousels currently
  use summer camp footage as stand-ins.
- Maps for Garden Hills and E. Rivers (the Atlanta Classical map is reused for all three).
- Policies & Procedures PDFs per school and the sample calendar PDF (links are `#`).
- Social handle for the footer.

## Environment variables (all optional)

```
VITE_SANITY_PROJECT_ID=mpky4rym
VITE_SANITY_DATASET=production
VITE_SANITY_LIVE=true            # set false to serve only the bundled export
VITE_EMAILJS_SERVICE=service_nuvhrhi
VITE_EMAILJS_TEMPLATE=template_porm1gg
VITE_EMAILJS_PUBLIC_KEY=…
VITE_ROUTER=browser              # "hash" only for static hosts without rewrites
```

## Deploy to Vercel

Import the repo, framework preset **Vite**, build `npm run build`, output `dist`. The included
`vercel.json` handles client-side routing. Point the `kiddossummercamp.com` domain at the project
when you're ready to cut over.

