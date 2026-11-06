# Portfolio site — design spec

- **Date:** 2026-11-06
- **Owner:** Miloš Milinkov
- **Status:** approved in chat, awaiting written-spec review

## 1. Purpose and success criteria

A personal portfolio that presents Miloš to recruiters, hiring managers and freelance clients: who he is, what he works with, where he has worked, and proof in the form of projects they can open.

The site succeeds when:

1. A visitor understands in under 10 seconds that Miloš is a .NET/SQL + Vue full-stack developer who works with AI coding agents.
2. Every project card leads somewhere useful: the live site if one exists, otherwise the GitHub repo with a clear note; a proprietary project says why it has no link.
3. Search engines and link previews (LinkedIn, Slack, X, Discord) receive the full content and a proper preview card without running JavaScript.
4. Lighthouse scores 95–100 in Performance, Accessibility, Best Practices and SEO on mobile.
5. The look is unmistakably dark, grey, gothic-industrial sci-fi ("warp drive" / cyberpunk / grimdark-inspired) while staying readable and original. No Warhammer names, logos, emblems or other trademarked iconography.

### What the user decided

| Decision | Choice |
|---|---|
| Stack | Same family as recent projects: Vue 3, TypeScript, Vite, Cloudflare Workers |
| Address | `*.workers.dev` subdomain for now; custom domain later |
| Accent palette | Brass + ember red on void black / gunmetal |
| ProjectAnvil | Not hosted: card links to the repo |
| Personal details | CV photo yes; phone number no; downloadable CV no |
| Language | English only |
| Repo | Proprietary, view only (`MiloshMilinkov/MilosMilinkovPortfolio`) |

## 2. Architecture

**Approach:** Vue 3 + TypeScript + Vite, prerendered to static HTML at build time, served as Cloudflare Workers Static Assets. No server code, no database, no runtime API.

```
npm run build
  ├─ vue-tsc -b                         type check
  ├─ vite build                         client bundle  → dist/
  ├─ vite build --ssr entry-server.ts   server bundle  → dist-ssr/ (temporary)
  └─ node scripts/prerender.mjs         renderToString(App)      → dist/index.html
                                        renderToString(NotFound) → dist/404.html
                                        then deletes dist-ssr/
```

- The client entry uses `createSSRApp` and hydrates the prerendered HTML.
- A small Vite plugin (`vite/seo-plugin.ts`) reads `src/data/site.ts` and:
  - fills `%SITE_URL%`-style tokens in `index.html` (canonical, Open Graph, Twitter);
  - injects the JSON-LD block built from the content data;
  - emits `robots.txt` and `sitemap.xml`.
  One value, `SITE_URL`, controls every absolute URL, so switching to a custom domain is a one-line change.
- No vue-router: the site is one page with in-page anchors plus a static 404 page.
- Hosting: `wrangler.jsonc` with `assets.directory = "./dist"`, `not_found_handling = "404-page"`, no `main` script. Worker name `milos-milinkov`.

### Dependencies

Runtime: `vue` only. Fonts are self-hosted via Fontsource (`@fontsource/chakra-petch`, `@fontsource-variable/ibm-plex-sans`, `@fontsource-variable/jetbrains-mono`), importing only the `latin` and `latin-ext` subsets (needed for š, č, ć).

Dev: `vite`, `@vitejs/plugin-vue`, `typescript`, `vue-tsc`, `@vue/tsconfig`, `vitest`, `@playwright/test`, `@axe-core/playwright`, `sharp` (asset scripts), `wrangler`.

No third-party scripts, analytics, trackers or CDNs at runtime.

## 3. Content model

All content lives in typed modules under `src/data/`. Components never hard-code content.

```ts
// src/data/types.ts
type SkillGroup = 'backend' | 'frontend' | 'data' | 'ai' | 'tools'
type SkillTier = 'core' | 'proficient' | 'familiar'

interface Skill {
  id: string          // 'vue', 'dotnet', 'mssql' …
  label: string       // 'Vue.js'
  group: SkillGroup
  tier: SkillTier
}

type ProjectStatus = 'live' | 'source' | 'classified'

interface Project {
  id: string
  title: string
  kind: string        // 'Law office website', 'E-commerce web app (thesis)' …
  year?: string
  summary: string     // one sentence
  highlights: string[]
  tech: string[]      // Skill ids — drives the skill ↔ project filter
  status: ProjectStatus
  liveUrl?: string    // required when status = 'live'
  repoUrl?: string    // required when status = 'source'; optional for 'live'
  featured: boolean
  image?: string      // base name of a screenshot in /images/projects
}

interface Role {
  title: string
  org: string
  place: string
  period: string      // '2022 — present'
  points: { label?: string; text: string }[]
}
```

Files: `site.ts` (name, title, description, SITE_URL, socials), `profile.ts` (bio, stats, interests, languages), `skills.ts`, `projects.ts`, `experience.ts` (roles + education).

Skill levels are shown as a tier (core / proficient / familiar) plus "used in N projects", computed from the data. No made-up percentages.

### Project link rules (pure function, unit-tested)

`resolveProjectLink(project)` returns:

| status | primary action | note shown on card |
|---|---|---|
| `live` | Open `liveUrl` in a new tab — "Visit live site" | Secondary link "Source" when `repoUrl` exists |
| `source` | Open `repoUrl` in a new tab — "View source on GitHub" | "Not publicly hosted — view the source on GitHub." |
| `classified` | No link | "Proprietary system under NDA — details on request." |

`validateProjects(projects, skills)` runs in a unit test and fails if: a `live` project lacks `liveUrl`, a `source` project lacks `repoUrl`, a `classified` project has any URL, an id is duplicated, or a `tech` id is not a known skill.

### Project list

| # | Project | Status | Target | Featured |
|---|---|---|---|---|
| 1 | ProjectAnvil — project, task & knowledge workspace (2026) | source | github.com/MiloshMilinkov/ProjectAnvil | yes |
| 2 | Advokatska kancelarija Vladić — law office website (2026) | live | https://advokatvladic.rs (+ repo) | yes |
| 3 | ARIZONALIFTS — fitness coach website | live | https://arizonalifts.com (+ repo) | yes |
| 4 | ASTRA-engineering — construction company portfolio | live | https://astra-engineering-website.vercel.app (+ repo) | yes |
| 5 | Financial Back-Office & DCC Reporting — Euronet Worldwide | classified | — | yes |
| 6 | Silicon Lottery — e-commerce web app (thesis) | source | github.com/MiloshMilinkov/SiliconLottery_Extended | yes |
| 7 | Blog App | source | github.com/MiloshMilinkov/Blog-App | no |
| 8 | Job Board | source | github.com/MiloshMilinkov/JobBoardApplication | no |
| 9 | SpendSmart | source | github.com/MiloshMilinkov/SpendSmart | no |
| 10 | Recipe Sharing API | source | github.com/MiloshMilinkov/Recipe-Sharing-Platform | no |

Descriptions and tech come from the CV.

## 4. Page structure and interactions

Sections (in order, each a component under `src/components/sections/`), with anchors:

1. **Header** (sticky): monogram, nav links (About, Skills, Experience, Projects, Contact) with the current section highlighted (IntersectionObserver), mobile menu button with a focus-trapped panel, Escape to close.
2. **Hero `#top`**
   - Background: `<canvas>` warp-tunnel starfield; star streaks bend toward the pointer; speeds up briefly on scroll. Paused when off-screen or when the tab is hidden; device pixel ratio capped at 2; `aria-hidden`.
   - "Boot sequence": a few monospace status lines, then the `<h1>` name and the role line. **All text is in the prerendered HTML.** The typing is a CSS reveal on the existing text, not JavaScript inserting text.
   - Portrait cropped from the CV in an angled brass frame with a scanline/duotone treatment.
   - Calls to action: "View projects" (ember, primary) and "Contact" (outline).
3. **About `#about`**: bio (from the CV, tightened), 4 stat tiles (4+ years in production, 3 live client sites, 10 projects, 2 AI agents in the daily workflow) that count up once when scrolled into view. Final numbers are in the HTML; the animation runs only on the client. Interests and languages as small tags.
4. **Skills `#skills` — "Systems diagnostic"**: tablist (Backend, Frontend, Data, AI, Tools) with full ARIA tabs keyboard behaviour (arrow keys, Home, End). All five panels are in the prerendered HTML; inactive ones carry `hidden`, so every skill is indexable. Each skill is a button showing its tier as a 3-segment meter and "used in N projects". Selecting a skill shows those project names inline and a "Show in projects" button that sets the shared tech filter and scrolls to `#projects`.
5. **Experience `#experience` — "Service record"**: vertical timeline (Euronet, Freelance, Kliker, BSc). Each entry is a native `<details>`/`<summary>` disclosure showing its detail points (works without JavaScript); the most recent is open by default.
6. **Projects `#projects`**
   - Filter bar: "All" plus technology chips (only technologies used by at least one project). A polite live region announces "Showing N projects using X".
   - Featured projects: large cards with a screenshot (live sites) or generated schematic SVG art (others), status badge (LIVE / SOURCE ONLY / CLASSIFIED), kind, year, summary, highlights, tech tags, and the action from the link rules. Subtle 3D tilt on pointer hover (disabled for touch and reduced motion).
   - "More on GitHub": compact rows for non-featured projects.
   - Filtering hides non-matching cards; an empty archive group is hidden; a "Clear filter" button is always reachable.
7. **Contact `#contact`**: short call to action, large terminal-style links: email (`mailto:`), LinkedIn, GitHub. Location: Belgrade, Serbia.
8. **Footer**: © 2026 Miloš Milinkov, "Built with Vue 3 + Vite · hosted on Cloudflare", link to the source repo.
9. **404 page**: themed "Signal lost" page with a link home, `noindex`.

External links: `target="_blank" rel="noopener noreferrer"` plus visually hidden "(opens in a new tab)" text.

### Motion rules

- `prefers-reduced-motion: reduce` → canvas draws one static frame, no typing reveal, no count-up, no tilt, no smooth scroll.
- Animation uses `transform` / `opacity` only. Scroll-triggered reveals use IntersectionObserver and add a class. Content is visible without JavaScript (reveals are progressive: the hidden state is only applied once JS has loaded).

## 5. Visual system

### Colour tokens (CSS custom properties on `:root`)

| Token | Value | Use |
|---|---|---|
| `--void` | `#0b0c0e` | page background |
| `--gunmetal` | `#16181c` | panels |
| `--plate` | `#2a2d33` | borders, raised plates |
| `--steel` | `#8a8f98` | secondary text |
| `--bone` | `#e6e1d6` | primary text |
| `--brass` | `#c8a35a` | headings, structure, focus ring |
| `--brass-dim` | `#8c7240` | rules, inactive meters |
| `--ember` | `#d9412b` | LIVE badge, borders, glows, large accent text (4.4:1 on `--void`, so never small body text) |
| `--ember-deep` | `#a82c1b` | primary button fill with `--bone` text (≈ 5.3:1) |
| `--ember-hot` | `#ff5a3c` | hover glow |
| `--terminal` | `#7fbf7f` | small monospace labels |

Every text/background pair used must meet WCAG 2.2 AA (4.5:1 for body text, 3:1 for large text and UI). Ember-on-dark is used for large text and fills (with bone text on top), checked during the build pass. The site is dark only (`color-scheme: dark`).

### Typography

- Headings: Chakra Petch (600/700), uppercase with letter-spacing for section labels.
- Body: IBM Plex Sans (variable).
- Labels/terminal: JetBrains Mono (variable).
- Fluid sizes with `clamp()`; body ≥ 16px; line length ≤ 75ch.
- `font-display: swap`; the heading font file used above the fold is preloaded.

### Surface language

- Panels with clipped "armour plate" corners (`clip-path` polygons), thin brass rules, small rivet dots at corners.
- A faint noise texture and a 2px scanline overlay (CSS gradients, no images).
- Section labels such as `// 02 — SYSTEMS DIAGNOSTIC` in mono.
- Focus: 2px brass outline with offset, never removed.
- Monogram "MM" in an angled shield frame (original geometry) for the favicon and header.

## 6. SEO and standards

- `<html lang="en">`, a single `<h1>`, an ordered heading hierarchy, landmarks (`header`, `nav`, `main`, `footer`), a skip link.
- Title: `Miloš Milinkov — Software Developer (.NET, SQL, Vue.js)`; meta description ≤ 160 characters.
- Canonical URL, `robots` meta, `theme-color`, `color-scheme`.
- Open Graph (`og:type=profile`, title, description, url, image 1200×630, image alt, `og:locale=en_US`) and Twitter `summary_large_image`.
- JSON-LD `@graph`: `WebSite`, `ProfilePage` whose `mainEntity` is a `Person` (name, alternateName "Milos Milinkov", jobTitle, worksFor Euronet Worldwide, alumniOf the college, address Belgrade RS, email, sameAs GitHub + LinkedIn, knowsAbout from skills, image), and an `ItemList` of projects (`CreativeWork` with url and keywords).
- `robots.txt` (allow all, sitemap link), `sitemap.xml` (home page with lastmod). `404.html` has `noindex`.
- Icons: `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png` (maskable), `site.webmanifest`.
- Images: AVIF + WebP via `<picture>`, explicit `width`/`height`, `loading="lazy"` below the fold, `fetchpriority="high"` on the portrait, descriptive `alt`.
- Valid HTML (checked with `html-validate` on the built output).
- `public/_headers`:
  - `Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; manifest-src 'self'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'; object-src 'none'; upgrade-insecure-requests`
  - `Strict-Transport-Security: max-age=31536000; includeSubDomains`
  - `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` denying camera, microphone, geolocation, etc., `Cross-Origin-Opener-Policy: same-origin`
  - `/assets/*` → `Cache-Control: public, max-age=31536000, immutable`
- Performance budget: JavaScript ≤ 60 KB gzipped, CLS < 0.05, LCP < 2.0 s on Lighthouse mobile.

## 7. Assets pipeline (one-off scripts in `scripts/`, outputs committed)

- `extract-portrait`: pull the portrait from the CV PDF, crop it square, export 320/640 AVIF + WebP.
- `capture-screenshots`: Playwright screenshots of the 3 live sites at 1280×800, exported 640/960/1280 AVIF + WebP.
- `generate-icons`: render the monogram SVG to the PNG icon sizes with sharp.
- `generate-og`: render an HTML template with the site fonts to `public/og-image.png` (1200×630) using Playwright.

Projects without a screenshot get a deterministic schematic SVG generated from the project id at render time (no files).

## 8. Error handling and edge cases

- Unknown path → `404.html` with HTTP status 404 (Workers `not_found_handling`).
- JavaScript disabled → all content in the HTML and all links work; experience disclosures still work (native `<details>`); the canvas, tech filter and tab switching are the only things that need JavaScript (the first skills tab is shown).
- Canvas or `requestAnimationFrame` unavailable → a static gradient background.
- Content mistakes (broken project link rules, unknown tech ids) fail the unit tests, not production.

## 9. Testing

- **Unit (Vitest):** `resolveProjectLink`, `validateProjects`, the tech filter logic (`projectsUsing`, `usageCount`), and the JSON-LD builder (valid shape, absolute URLs).
- **End-to-end (Playwright, Chromium + Firefox + WebKit, against `wrangler dev` serving `dist/`):**
  - home page renders with the `<h1>` and every section; no console errors;
  - each project card's link matches the rules (live → live URL, source → repo, classified → no link);
  - the tech filter shows/hides the right cards; Skills → "Show in projects" applies the filter;
  - the skills tabs work with the keyboard (arrows, Home, End) and the experience disclosures open and close;
  - an unknown path returns 404 with the 404 page;
  - security headers are present;
  - `axe` reports no WCAG A/AA violations on the home page and the 404 page;
  - with JavaScript disabled, the prerendered HTML contains the bio, every project title and the JSON-LD.
- **Lighthouse** (mobile) run once at the end; results reported.
- **CI:** GitHub Actions on push/PR: install, typecheck, unit tests, build, e2e (Chromium). No secrets in CI.

## 10. Repo and deployment

- Repo `MiloshMilinkov/MilosMilinkovPortfolio`, proprietary licence, hardening per the `hardening-new-repos` skill (LICENSE, SECURITY.md, README notice, `package.json` `UNLICENSED` + `private`, copyright header on `src/main.ts` and `src/entry-server.ts`, GitHub protections once the repo exists).
- The `gh` CLI is not installed: either install it with `winget install GitHub.cli` (the user runs `gh auth login`) or the user creates the empty repo on github.com; then add the remote and push `main`.
- Deploy with `npm run deploy` (`npm run build && wrangler deploy`). The first deploy reveals the `workers.dev` URL; `SITE_URL` is then set to it, the site rebuilt and redeployed, and the URL added to the README.
- Optional later: connect the GitHub repo to Cloudflare Workers Builds for deploy-on-push; attach a custom domain.

## 11. Out of scope

Blog, CMS, contact form or any backend, analytics, a Serbian translation, light theme, per-project detail pages, a downloadable CV, showing the phone number.
