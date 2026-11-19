# Kiddos After School — website + CMS

The Kiddos After School site, built on the Kiddos Summer Camp design system, with its own
Sanity CMS and analytics. Deploys to Vercel from this repo.

| Layer | Choice |
|---|---|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind 3 |
| Routing | react-router-dom 6 |
| Content | Sanity project `3p5mllwc`, dataset `production` — Studio lives in `/studio` and is served by the site at **/studio** |
| Contact form | EmailJS |
| Analytics | Vercel Web Analytics + Google Analytics 4 (+ optional Microsoft Clarity) |
| Hosting | Vercel (`vercel.json` routes the site and the Studio) |

## Run it

```bash
npm install
npm run dev          # site → http://localhost:5173
npm run studio       # Sanity Studio → http://localhost:3333/studio
npm run build        # production build: site → dist/, Studio → dist/studio
npm run build:site   # site only (faster)
```

## Content (Sanity)

Everything on the site is editable in the Studio. Pages are **singletons** (one document each,
can't be duplicated or deleted); **Schools** are a list, one document per school.

| Studio section | What it controls | Route |
|---|---|---|
| Pages → Home | hero, intro + info blocks, Day in the Life, the ten benefit cards, Activity Choices, testimonials | `/` |
| Pages → The Kiddos Way | hero, pinky promise, story, growth, team, recognition | `/values` |
| Pages → Our Team | hero, founder, team intro, team members (video or photo + name blob) | `/team` |
| Pages → Schedule & Activities | hero, What Goes On (+ sample calendar PDF), activity cards, specials, daily timeline | `/schedule` |
| Pages → Rates & Enrollment | hero, enrollment steps, rates box, rates-by-school table, add-ons, scholarships, cancelation | `/pricing` |
| Pages → Extracurricular Classes | hero, term info, notes, weekly schedule, class cards (optionally per school) | `/classes` |
| Pages → Parent & Guardian Info | policy cards, full-policies links (defaults to each school's PDF) | `/policies` |
| Pages → FAQ's | questions and answers | `/faq` |
| Pages → Contact | intro, form options, form messages, locations intro | `/contact` |
| Schools | name, URL, contact, location (+ map image), hours/grades/enrollment, rates, hero video/photo, photo carousel, policies PDF | `/schools/<slug>` |
| School pages — shared copy | tagline, How to Enroll steps, What Goes On, rates/classes blocks shared by every school page | all school pages |
| Announcement Bar · Navigation · Footer · "One Click Away" CTA · "Anything Else?" block · Site Settings | site-wide pieces | everywhere |

**Inline markup** in any text field: `<br>`, `<green>…</green>`, `<yellow>…</yellow>`,
`<strong>`, `<u>`, `<a href="…">`. Draft placeholders like `[NEEDED: …]` render highlighted so
they're easy to spot and replace.

**Media** fields are optional everywhere: leave a video/photo empty and the site uses the
default that ships in `public/assets`. Upload one to replace it.

### How content reaches the site

Pages render instantly from the bundled export (`src/content/sanity-export.json` + media in
`public/cms`), then refresh from the live dataset. After editing in the Studio the live site
updates immediately; run `npm run content:pull` and commit now and then so the bundled
fallback stays current.

`scripts/seed.mjs` is the one-time import that created the dataset from
`src/content/site.pre-cms.json` (kept for reference). Re-running it overwrites every document.

### Sanity dashboard settings (manage.sanity.io → project → API)

- **CORS origins** must include every host the site or Studio runs on, with *Allow credentials*
  ticked for the ones that serve the Studio: the Vercel URL(s), the production domain,
  `http://localhost:5173` and `http://localhost:3333`.
- No API token is needed by the site (the dataset is public). Tokens are only for scripts.

## Analytics

Set `VITE_GA_ID` (GA4 measurement ID) in Vercel's environment variables and enable
**Web Analytics** in the Vercel project. Page views are tracked on every route change and
these events are sent to both GA4 and Vercel:

| Event | Fired when | Data |
|---|---|---|
| `enroll_click` | any link to the registration portal | page, label |
| `contact_submit` | contact form sent | category, school |
| `phone_click` / `email_click` | tel: / mailto: links | number / address |
| `document_download` | PDFs (calendar, policies) | file |
| `directions_click` | Google Maps links | label |
| `outbound_click` | any other external link | url |
| `school_view` | a school page opens | school |

Optional: set `VITE_CLARITY_ID` for Microsoft Clarity session recordings and heatmaps.

## Environment variables

See `.env.example`. All optional; set them in Vercel → Project → Settings → Environment Variables.

## Deploy

Vercel: framework **Vite**, build `npm run build`, output `dist`. `vercel.json` serves the
Studio at `/studio` and routes everything else to the single-page app. To launch, add the
production domain in Vercel → Domains and the same domain to Sanity's CORS origins.

## Media still needed

See the highlighted `[NEEDED]` notes in the Studio. Headline items: after-school photos and
videos for the heroes and school carousels, map images for E. Rivers and Garden Hills,
each school's Policies & Procedures PDF, the sample calendar PDF, and the social handle.
