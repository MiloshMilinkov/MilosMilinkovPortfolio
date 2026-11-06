# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build, test and deploy Miloš Milinkov's one-page portfolio: prerendered Vue 3 site in a dark gothic-industrial theme, served from Cloudflare Workers Static Assets, source on GitHub under a proprietary licence.

**Architecture:** Vue 3 + TypeScript + Vite multi-page build (`index.html`, `404.html`). A second `vite build --ssr` produces a server bundle; `scripts/prerender.mjs` renders `App.vue` and `NotFound.vue` into the built HTML, and the client hydrates the home page with `createSSRApp`. All content lives in typed data modules; a Vite plugin derives canonical/OG tags, JSON-LD, `robots.txt` and `sitemap.xml` from them.

**Tech Stack:** Vue 3.5, Vite 8, TypeScript ~6.0, vue-tsc 3, Vitest 5, Playwright 1.65 + @axe-core/playwright, sharp, Fontsource, Wrangler 4 (Workers Static Assets), html-validate, Lighthouse.

**Spec:** `docs/superpowers/specs/2026-11-06-portfolio-site-design.md`

## Global Constraints

- Runtime dependency: `vue` only (plus Fontsource CSS packages). No vue-router, no third-party runtime scripts, analytics or CDNs.
- `package.json`: `"private": true`, `"license": "UNLICENSED"`, `"author": "Miloš Milinkov <milos300399@gmail.com>"`, `"type": "module"`.
- Copyright header (hardening skill format, project name "Miloš Milinkov — Portfolio", year 2026) on `src/main.ts` and `src/entry-server.ts` only.
- Owner's name is always written "Miloš Milinkov" in visible copy; JSON-LD `alternateName` "Milos Milinkov".
- English only. Dark only (`color-scheme: dark`). No phone number, no downloadable CV anywhere.
- No Warhammer names, logos, emblems or other trademarked iconography; all shapes original.
- Colour tokens exactly as spec §5 (`--void #0b0c0e`, `--gunmetal #16181c`, `--plate #2a2d33`, `--steel #8a8f98`, `--bone #e6e1d6`, `--brass #c8a35a`, `--brass-dim #8c7240`, `--ember #d9412b`, `--ember-deep #a82c1b`, `--ember-hot #ff5a3c`, `--terminal #7fbf7f`). `--ember` never used for small body text; primary buttons are `--ember-deep` fill with `--bone` text.
- Fonts: Chakra Petch 600/700 (headings), IBM Plex Sans variable (body), JetBrains Mono variable (labels); `latin` + `latin-ext` subsets only.
- All prerendered text must be real HTML text; animations only reveal existing text. Hidden-until-revealed states apply only after JS adds `html.js`.
- `prefers-reduced-motion: reduce` disables: canvas animation (one static frame), typing reveal, count-up, tilt, smooth scroll.
- External links: `target="_blank" rel="noopener noreferrer"` + visually hidden " (opens in a new tab)".
- Single source of absolute URLs: `SITE_URL` in `src/data/site.ts`.
- Worker name `milos-milinkov`; repo `MiloshMilinkov/MilosMilinkovPortfolio`.
- Budgets: JS ≤ 60 KB gzipped; Lighthouse mobile ≥ 95 in all four categories; CLS < 0.05.
- Commit messages end with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Review Focus

1. **320 px wide phone** — no horizontal scrolling anywhere (`scrollWidth <= innerWidth`). Test in Task 5.
2. **Reduced-motion visitor** — hero `<h1>` and every section heading fully visible (opacity 1) immediately, canvas not animating. Test in Task 6.
3. **Keyboard user in the mobile menu** — Escape closes it and focus returns to the menu button; following a link closes it. Test in Task 5.
4. **Serbian diacritics** (Miloš, Vladić, računarstva) render in the theme fonts, not a fallback — `document.fonts.check('700 32px "Chakra Petch"', 'Miloš Vladić')` is true after `document.fonts.ready`. Test in Task 6.
5. **Skills → "Show in projects"** — filter applies, the page scrolls to `#projects` and focus lands on the Projects heading so screen-reader and keyboard users know where they are. Test in Task 8.

---

## File structure

```
index.html                     home template: head tokens (%SITE_URL% …), <div id="app"><!--app-html--></div>
404.html                       404 template: noindex, <div id="app"><!--app-html--></div>
vite.config.ts                 vue plugin, seoPlugin, multi-page input (client build only), vitest config
vite/seo-plugin.ts             head tokens, JSON-LD injection, robots.txt + sitemap.xml emission
scripts/prerender.mjs          render pages into dist/*.html, delete dist-ssr/
scripts/assets/                one-off asset generators (outputs committed under public/)
wrangler.jsonc                 assets-only Worker config
playwright.config.ts           e2e against `wrangler dev` on 127.0.0.1:8788
public/_headers                security + cache headers
public/                        favicon.svg, icons, site.webmanifest, og-image.png, images/
src/main.ts                    client entry: styles + createSSRApp(App).mount('#app')
src/entry-404.ts               404 client entry: styles only
src/entry-server.ts            render(page) for prerender
src/App.vue / src/NotFound.vue page roots
src/data/*.ts                  types + content (site, profile, skills, projects, experience)
src/lib/projectLinks.ts        resolveProjectLink, validateProjects
src/lib/techFilter.ts          projectsUsing, usageCount, techsInUse
src/lib/jsonld.ts              buildJsonLd
src/composables/*.ts           useTechFilter, useReducedMotion, useInView, useActiveSection, useCountUp
src/styles/*.css               tokens.css, base.css, fonts.ts
src/components/ui/*            Panel, SectionHeading, StatusBadge, TechTag, ExternalLink, ResponsiveImage, Monogram, SchematicArt
src/components/layout/*        SiteHeader, SiteFooter
src/components/hero/*          HeroSection, WarpField, BootSequence, Portrait
src/components/sections/*      AboutSection, SkillsSection, ExperienceSection, ProjectsSection, ContactSection
src/components/projects/*      ProjectCard, ProjectRow, TechFilterBar
tests/unit/*.test.ts           Vitest (node environment)
tests/e2e/*.spec.ts            Playwright
.github/workflows/ci.yml       typecheck, unit, build, e2e (chromium)
.claude/launch.json            preview config (vite dev on 5173)
```

---

### Task 1: Scaffold + prerender pipeline + Workers config

**Files:**
- Create: `package.json`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `vite.config.ts`, `index.html`, `404.html`, `src/main.ts`, `src/entry-404.ts`, `src/entry-server.ts`, `src/App.vue`, `src/NotFound.vue`, `src/env.d.ts`, `scripts/prerender.mjs`, `wrangler.jsonc`, `playwright.config.ts`, `.claude/launch.json`
- Test: `tests/e2e/smoke.spec.ts`

**Interfaces:**
- Produces: `render(page: 'home' | '404'): Promise<string>` from `src/entry-server.ts`; npm scripts `dev`, `build`, `typecheck`, `test`, `test:e2e`, `preview`, `deploy`; Playwright `baseURL` `http://127.0.0.1:8788`.

- [ ] **Step 1: Create `package.json`** with the Global Constraints metadata, scripts:
  - `build`: `vue-tsc -b && vite build && vite build --ssr src/entry-server.ts --outDir dist-ssr && node scripts/prerender.mjs`
  - `test`: `vitest run`; `test:e2e`: `playwright test`; `preview`: `npm run build && wrangler dev --port 8788 --ip 127.0.0.1`; `deploy`: `npm run build && wrangler deploy`
  Install `vue`, Fontsource packages, and dev deps from the spec (`typescript@~6.0.3`). Run `npx playwright install chromium firefox webkit` if browsers are missing.
- [ ] **Step 2: Write the failing e2e smoke test** `tests/e2e/smoke.spec.ts`:
  - `GET /` → status 200; `page.locator('h1')` has text `Miloš Milinkov`.
  - Raw HTML (`(await request.get('/')).text()`) contains `Miloš Milinkov` inside `<h1` (proves prerender, not client render).
  - `GET /does-not-exist` → status 404 and body contains `Signal lost`.
- [ ] **Step 3: Run** `npm run build` → Expected: FAIL (files missing).
- [ ] **Step 4: Implement the pipeline.**
  - `vite.config.ts`: `defineConfig(({ isSsrBuild }) => …)`; client build `build.rollupOptions.input = { main: 'index.html', notFound: '404.html' }` only when `!isSsrBuild`; `test: { include: ['tests/unit/**/*.test.ts'], environment: 'node' }`.
  - `src/entry-server.ts`: `createSSRApp(page === 'home' ? App : NotFound)` + `renderToString`.
  - `scripts/prerender.mjs`: for `[['home','index.html'],['404','404.html']]` replace `<!--app-html-->` in `dist/<file>`; exit 1 if the marker is missing or the render is empty; `rm -r dist-ssr`.
  - Placeholder `App.vue` = `<main><h1>Miloš Milinkov</h1></main>`; `NotFound.vue` = `<main><h1>Signal lost</h1><a href="/">Return to base</a></main>`.
  - `wrangler.jsonc`: `name: "milos-milinkov"`, `compatibility_date: "2026-11-01"`, `assets: { directory: "./dist", not_found_handling: "404-page", html_handling: "auto-trailing-slash" }`, no `main`.
  - `playwright.config.ts`: `testDir: tests/e2e`, `webServer: { command: 'npx wrangler dev --port 8788 --ip 127.0.0.1', url: 'http://127.0.0.1:8788', reuseExistingServer: !process.env.CI }`, env `WRANGLER_SEND_METRICS=false`, projects chromium/firefox/webkit.
  - Copyright headers on `src/main.ts`, `src/entry-server.ts`.
- [ ] **Step 5: Run** `npm run build && npx playwright test smoke` → Expected: PASS on all 3 browsers.
- [ ] **Step 6: Commit** `feat: scaffold Vue + Vite prerender pipeline on Workers static assets`

---

### Task 2: Content model, data and link rules

**Files:**
- Create: `src/data/types.ts`, `src/data/site.ts`, `src/data/profile.ts`, `src/data/skills.ts`, `src/data/projects.ts`, `src/data/experience.ts`, `src/lib/projectLinks.ts`, `src/lib/techFilter.ts`
- Test: `tests/unit/projectLinks.test.ts`, `tests/unit/techFilter.test.ts`, `tests/unit/content.test.ts`

**Interfaces:**
- Produces (types exactly as spec §3: `Skill`, `SkillGroup`, `SkillTier`, `Project`, `ProjectStatus`, `Role`), plus:
  - `interface Education { degree: string; school: string; place: string; period: string; points: string[] }`
  - `interface Stat { value: number; suffix: string; label: string }`
  - `site: { name; title; description; SITE_URL; locale: 'en_US'; email; github; linkedin; repo; ogImage: '/og-image.png' }` (`linkedin` = `https://www.linkedin.com/in/milo%C5%A1milinkov/`, `SITE_URL` = `https://milos-milinkov.workers.dev` placeholder until Task 12 sets the real one)
  - `profile: { headline; bio: string[]; stats: Stat[]; interests: string[]; languages: string[]; location: 'Belgrade, Serbia'; portraitAlt }`
  - `skills: Skill[]`, `skillGroups: { id: SkillGroup; label: string; blurb: string }[]`, `projects: Project[]`, `roles: Role[]`, `education: Education[]`
  - `interface ProjectAction { href: string; label: string }`
  - `resolveProjectLink(p: Project): { primary: ProjectAction | null; secondary: ProjectAction | null; note: string | null }`
  - `validateProjects(projects: Project[], skills: Skill[]): string[]` (problem messages; empty = valid)
  - `projectsUsing(projects: Project[], techId: string | null): Project[]` (null → all, order preserved)
  - `usageCount(projects: Project[], techId: string): number`
  - `techsInUse(projects: Project[], skills: Skill[]): Skill[]` (skills order, only ids used by ≥ 1 project)

- [ ] **Step 1: Write failing tests.**
  - `projectLinks.test.ts`:
    - live with repo → `primary {href: liveUrl, label: 'Visit live site'}`, `secondary {href: repoUrl, label: 'Source'}`, `note null`.
    - live without repo → `secondary null`.
    - source → `primary {href: repoUrl, label: 'View source on GitHub'}`, `secondary null`, `note 'Not publicly hosted — view the source on GitHub.'`
    - classified → `primary null`, `secondary null`, `note 'Proprietary system under NDA — details on request.'`
    - `validateProjects` reports: live without `liveUrl`; source without `repoUrl`; classified with any URL; duplicate id; unknown tech id (message names the id).
  - `techFilter.test.ts`: `projectsUsing(fixture, 'vue')` returns only Vue projects in original order; `null` returns all; `usageCount` matches; `techsInUse` excludes unused skills and keeps skills order.
  - `content.test.ts` (real data): `validateProjects(projects, skills)` is `[]`; exactly 10 projects, 6 featured; statuses: live = advokat-vladic, arizonalifts, astra; classified = euronet; every URL starts with `https://`; `profile.stats` live-site value equals the live project count and projects value equals `projects.length`; no string anywhere in the data contains `+381` or `.pdf`.
- [ ] **Step 2: Run** `npx vitest run` → Expected: FAIL (modules missing).
- [ ] **Step 3: Implement** `projectLinks.ts`, `techFilter.ts` and the data files.
  - Skills (id · label · group · tier):
    backend — `csharp` C# core · `dotnet` .NET core · `aspnet` ASP.NET Core proficient · `node` Node.js proficient · `express` Express.js proficient;
    frontend — `vue` Vue.js core · `javascript` JavaScript core · `typescript` TypeScript proficient · `vite` Vite core · `htmlcss` HTML & CSS core · `nuxt` Nuxt familiar · `react` React familiar · `angular` Angular familiar · `tailwind` Tailwind CSS familiar;
    data — `mssql` Microsoft SQL Server core · `ssis` SSIS proficient · `sqlite` SQLite proficient · `mongodb` MongoDB familiar;
    ai — `claude-code` Claude Code core · `codex` OpenAI Codex core;
    tools — `git` Git core · `cloudflare` Cloudflare Workers proficient · `playwright` Playwright proficient · `docker` Docker proficient · `vercel` Vercel familiar · `postman` Postman / Thunder Client proficient · `vscode` Visual Studio / VS Code core.
  - Project tech: ProjectAnvil `typescript react vite playwright codex` · Vladić `vue typescript vite cloudflare sqlite claude-code` · ARIZONALIFTS `vue vite javascript cloudflare` · ASTRA `vue javascript vercel` · Euronet `dotnet csharp mssql ssis` · Silicon Lottery `aspnet csharp angular mssql sqlite docker` · Blog App `node express mongodb vue tailwind` · Job Board `vue node express sqlite` · SpendSmart `aspnet csharp` · Recipe Sharing API `aspnet csharp`.
  - URLs and statuses from spec §3 table; repo URLs for live projects: `advokat-vladic`, `ArizonaLiftsWebSite`, `Astra_engineering--website-`. Images: `advokat-vladic`, `arizonalifts`, `astra` (files arrive in Task 4).
  - Copy (bio, summaries, highlights, role points, education) written from the CV, tightened; stats `4+ years in production`, `3 live client sites`, `10 projects shipped`, `2 AI agents in the daily workflow`.
- [ ] **Step 4: Run** `npx vitest run` → Expected: PASS.
- [ ] **Step 5: Commit** `feat: add typed content model, project link rules and tech filter`

---

### Task 3: SEO layer — JSON-LD, head tags, robots, sitemap

**Files:**
- Create: `src/lib/jsonld.ts`, `vite/seo-plugin.ts`
- Modify: `index.html`, `404.html`, `vite.config.ts`
- Test: `tests/unit/jsonld.test.ts`, `tests/e2e/seo.spec.ts`

**Interfaces:**
- Consumes: data modules from Task 2.
- Produces: `buildJsonLd(): Record<string, unknown>` (reads data modules; returns `{ '@context': 'https://schema.org', '@graph': [...] }`), `seoPlugin(): import('vite').Plugin`.

- [ ] **Step 1: Write failing unit test** `jsonld.test.ts`: graph contains `WebSite`, `ProfilePage`, `Person`, `ItemList`; `ProfilePage.mainEntity['@id']` equals the Person `@id`; Person has `name 'Miloš Milinkov'`, `alternateName 'Milos Milinkov'`, `sameAs` containing GitHub and LinkedIn URLs, `worksFor.name 'Euronet Worldwide'`, `knowsAbout` length = skills length; `ItemList.itemListElement` length 10 with positions 1..10; every `url`/`@id`/`image` value is absolute and starts with `SITE_URL` or `https://`; classified project item has no `url`.
- [ ] **Step 2: Write failing e2e** `seo.spec.ts` (raw HTML via `request.get`):
  - `/` has `<link rel="canonical" href="${SITE_URL}/">`, `og:type` `profile`, `og:image` absolute ending `/og-image.png`, `twitter:card` `summary_large_image`, a `<script type="application/ld+json">` that `JSON.parse`s, `<html lang="en">`, title `Miloš Milinkov — Software Developer (.NET, SQL, Vue.js)`, meta description ≤ 160 chars.
  - `/404.html` content has `<meta name="robots" content="noindex">` and no canonical.
  - `/robots.txt` contains `Sitemap: ${SITE_URL}/sitemap.xml`; `/sitemap.xml` contains `<loc>${SITE_URL}/</loc>` and a `<lastmod>`.
  - With `javaScriptEnabled: false` context: page shows the bio's first sentence and all 10 project titles.
- [ ] **Step 3: Run** `npx vitest run jsonld` → FAIL.
- [ ] **Step 4: Implement** `buildJsonLd` and `seoPlugin`: `transformIndexHtml` replaces `%SITE_URL%`, `%TITLE%`, `%DESCRIPTION%`, `%OG_IMAGE%` and, for `index.html` only, injects the JSON-LD script before `</head>` (escape `<` as `<`); `generateBundle` emits `robots.txt` and `sitemap.xml` (lastmod = build date `YYYY-MM-DD`). Add full head per spec §6 to `index.html` (meta, OG incl. `og:image:width/height/alt`, Twitter, theme-color `#0b0c0e`, icons, manifest, font preload added in Task 4).
- [ ] **Step 5: Run** `npx vitest run && npm run build && npx playwright test seo --project=chromium` → PASS (the no-JS project-title check may stay failing until Task 9; mark it `test.fixme` until then and remove the mark in Task 9).
- [ ] **Step 6: Commit** `feat: add JSON-LD, head tags, robots.txt and sitemap from content data`

---

### Task 4: Design system, fonts and static assets

Load the `frontend-design` skill before writing styles.

**Files:**
- Create: `src/styles/tokens.css`, `src/styles/base.css`, `src/styles/fonts.ts`, `src/components/ui/{Panel,SectionHeading,StatusBadge,TechTag,ExternalLink,ResponsiveImage,Monogram,SchematicArt}.vue`, `scripts/assets/{extract-portrait.py,capture-screenshots.mjs,generate-icons.mjs,generate-og.mjs,og-template.html}`, `public/{favicon.svg,favicon-32.png,apple-touch-icon.png,icon-192.png,icon-512.png,site.webmanifest,og-image.png,_headers}`, `public/images/portrait-{320,640}.{avif,webp}`, `public/images/projects/{advokat-vladic,arizonalifts,astra}-{640,960,1280}.{avif,webp}`
- Test: `tests/e2e/assets.spec.ts`

**Interfaces:**
- Produces components (props):
  - `Panel` `{ as?: string = 'div'; corner?: 'both' | 'tl' | 'br' = 'both' }` — armour-plate clipped panel with rivets, default slot.
  - `SectionHeading` `{ index: string; label: string; title: string; id: string }` — renders `// 02 — LABEL` mono kicker + `<h2 :id tabindex="-1">`.
  - `StatusBadge` `{ status: ProjectStatus }` → text `LIVE` / `SOURCE ONLY` / `CLASSIFIED`.
  - `TechTag` `{ label: string; active?: boolean }`.
  - `ExternalLink` `{ href: string }` — adds target/rel and the hidden "(opens in a new tab)".
  - `ResponsiveImage` `{ base: string; widths: number[]; sizes: string; alt: string; width: number; height: number; eager?: boolean }` — `<picture>` with AVIF + WebP `srcset` from `/images/<base>-<w>.<ext>`.
  - `Monogram` `{ size?: number }` — inline SVG, same geometry as `favicon.svg`.
  - `SchematicArt` `{ seed: string }` — deterministic SVG (seeded PRNG from the string), `aria-hidden`.
  - `vReveal` directive in `src/lib/reveal.ts` (registered in `src/main.ts` and `src/entry-server.ts`; `getSSRProps` returns `{}`): adds `.reveal` on mount and `.is-visible` once the element enters the viewport (one shared IntersectionObserver). CSS hides `.reveal:not(.is-visible)` only under `html.js` and `prefers-reduced-motion: no-preference`. Sections in Tasks 6–10 put `v-reveal` on their panels.
- [ ] **Step 1: Write failing e2e** `assets.spec.ts`: each of `/favicon.svg`, `/favicon-32.png`, `/apple-touch-icon.png`, `/icon-192.png`, `/icon-512.png`, `/site.webmanifest`, `/og-image.png`, `/images/portrait-640.avif`, `/images/projects/astra-1280.webp` returns 200; `og-image.png` decodes to 1200×630 (`sharp(buffer).metadata()`); response for `/` has `content-security-policy` containing `default-src 'self'`, `strict-transport-security`, `x-content-type-options: nosniff`, `referrer-policy`, `permissions-policy`, `cross-origin-opener-policy`; a hashed `/assets/*.js` response has `cache-control` containing `immutable`.
- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Implement** tokens/base CSS (spec §5: tokens, clamp type scale, plate `clip-path`, noise + scanline overlays via gradients, `:focus-visible` brass outline, `.sr-only`, `html.js` reveal classes, reduced-motion overrides), `fonts.ts` importing only `latin`/`latin-ext` files of the three families, the UI components, and `_headers` (values verbatim from spec §6). Add `<link rel="preload" as="font" type="font/woff2" crossorigin>` for Chakra Petch 700 latin to both HTML pages from `seoPlugin`'s `transformIndexHtml(html, ctx)`: during build, find the asset in `ctx.bundle` whose name matches `chakra-petch-latin-700-normal` and `.woff2`, and inject its hashed URL (skip in dev).
- [ ] **Step 4: Generate assets.**
  - Portrait: `python -I scripts/assets/extract-portrait.py "<CV pdf path>" public/images` (PyMuPDF in a scratch venv; extract the largest page-1 image, centre-crop square, then `sharp` → 320/640 AVIF + WebP). Do not commit the CV.
  - Screenshots: `node scripts/assets/capture-screenshots.mjs` (Playwright Chromium, 1280×800, wait for network idle, dismiss nothing, write 640/960/1280 AVIF + WebP).
  - Icons: `node scripts/assets/generate-icons.mjs` (sharp renders `public/favicon.svg` to 32/180/192/512; 512 maskable with safe-zone padding).
  - OG: `node scripts/assets/generate-og.mjs` (Playwright renders `og-template.html` at 1200×630 with the site fonts and colours: monogram, name, "Software Developer · .NET & SQL · Full-Stack · AI-Assisted Engineering").
  - Look at every generated image before committing.
- [ ] **Step 5: Run** `npm run build && npx playwright test assets` → PASS.
- [ ] **Step 6: Commit** `feat: add design tokens, UI primitives, fonts, icons, OG image and security headers`

---

### Task 5: Layout shell — header, mobile menu, footer, 404 page

**Files:**
- Create: `src/components/layout/SiteHeader.vue`, `src/components/layout/SiteFooter.vue`, `src/composables/useActiveSection.ts`
- Modify: `src/App.vue`, `src/NotFound.vue`
- Test: `tests/e2e/layout.spec.ts`

**Interfaces:**
- Produces: `useActiveSection(ids: string[]): Ref<string>` (IntersectionObserver; SSR-safe, returns `'top'` on the server). Section ids used by every later task: `top`, `about`, `skills`, `experience`, `projects`, `contact`. `App.vue` renders `<SiteHeader/> <main id="main"> …sections… </main> <SiteFooter/>`; later tasks add their section component into `main` in that order.
- [ ] **Step 1: Write failing e2e** `layout.spec.ts`:
  - First Tab focuses a "Skip to content" link targeting `#main`.
  - Desktop (1280 px): nav has links About, Skills, Experience, Projects, Contact with `href="#…"`; after scrolling to `#projects`, its link has `aria-current="true"`.
  - Mobile (375 px): menu button has `aria-expanded="false"` and `aria-controls`; click → `true`, panel visible; Escape → closed and the button is focused; reopening and clicking "Projects" closes the panel and the URL hash is `#projects`.
  - **Review Focus 1:** at 320×640, `document.documentElement.scrollWidth <= window.innerWidth` on `/` and on `/missing`.
  - Footer contains `© 2026 Miloš Milinkov` and a link to the GitHub repo.
  - 404 page: `h1` "Signal lost", a link to `/`, the same header monogram.
- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Implement** header (sticky, monogram linking to `#top`, nav, menu button + panel with focus trap, Escape, close on link click, `html.js` class set in `main.ts`), footer, themed 404.
- [ ] **Step 4: Run** `npm run build && npx playwright test layout smoke` → PASS.
- [ ] **Step 5: Commit** `feat: add header with active-section nav, mobile menu, footer and 404 page`

---

### Task 6: Hero — warp field, boot sequence, portrait

**Files:**
- Create: `src/components/hero/{HeroSection,WarpField,BootSequence,Portrait}.vue`, `src/composables/useReducedMotion.ts`
- Modify: `src/App.vue`
- Test: `tests/e2e/hero.spec.ts`

**Interfaces:**
- Produces: `useReducedMotion(): Ref<boolean>` (false on the server; matchMedia listener on the client).
- [ ] **Step 1: Write failing e2e** `hero.spec.ts`:
  - `#top` contains `h1` "Miloš Milinkov", the role line `Software Developer · .NET & SQL · Full-Stack · AI-Assisted Engineering`, links "View projects" (`href="#projects"`) and "Contact" (`href="#contact"`).
  - Portrait `img` has non-empty `alt`, `width`/`height` attributes and `fetchpriority="high"`.
  - Canvas is `aria-hidden="true"`.
  - **Review Focus 2:** with `reducedMotion: 'reduce'`, immediately after `load` the `h1` and every `h2` have computed `opacity` `1`, and two canvas snapshots (`toDataURL`) 500 ms apart are identical.
  - Without reduced motion, two canvas snapshots 500 ms apart differ.
  - **Review Focus 4:** after `document.fonts.ready`, `document.fonts.check('700 32px "Chakra Petch"', 'Miloš Vladić')` and `document.fonts.check('16px "IBM Plex Sans Variable"', 'računarstva')` are true.
  - No console errors or warnings during load (catches hydration mismatches).
- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Implement.** `WarpField`: canvas created/started in `onMounted` only; ~300 stars on a perspective projection; pointer offsets the vanishing point (eased); scroll velocity briefly raises speed; IntersectionObserver + `visibilitychange` pause; DPR ≤ 2; resize via ResizeObserver; reduced motion → draw one frame and stop; static CSS gradient underneath as fallback. `BootSequence`: 3 mono status lines + `h1` + role line revealed with CSS `steps()` clip animation, gated by `html.js` and `prefers-reduced-motion: no-preference`. `Portrait`: `ResponsiveImage` (`base: 'portrait'`, widths 320/640, eager) inside an angled brass frame with duotone/scanline overlay.
- [ ] **Step 4: Run** `npm run build && npx playwright test hero` → PASS.
- [ ] **Step 5: Commit** `feat: add hero with warp-field canvas, boot sequence and portrait`

---

### Task 7: About section with stat counters

**Files:**
- Create: `src/components/sections/AboutSection.vue`, `src/composables/useInView.ts`, `src/composables/useCountUp.ts`
- Modify: `src/App.vue`
- Test: `tests/e2e/about.spec.ts`

**Interfaces:**
- Produces: `useInView(target: Ref<Element | null>, opts?: { once?: boolean; rootMargin?: string }): Ref<boolean>`; `useCountUp(target: number, start: Ref<boolean>, durationMs = 1200): Ref<number>` (returns `target` on the server and under reduced motion).
- [ ] **Step 1: Write failing e2e** `about.spec.ts`: raw HTML of `#about` contains every `profile.bio` paragraph and the final stat values `4+`, `3`, `10`, `2`; after scrolling `#about` into view and waiting 1.5 s the stat values read the same; interests (Software Engineering, AI-assisted Development, Gaming, Fitness) and languages (Serbian — Native, English — Fluent) are listed.
- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Implement** the section (`SectionHeading index="01" label="Operator profile" title="About me"`), stat tiles as `Panel`s with `<data value>` numbers; count-up resets to 0 on mount only while the tile is off-screen.
- [ ] **Step 4: Run** `npm run build && npx playwright test about hero` → PASS.
- [ ] **Step 5: Commit** `feat: add about section with animated stat tiles`

---

### Task 8: Skills "systems diagnostic" + shared tech filter

**Files:**
- Create: `src/components/sections/SkillsSection.vue`, `src/composables/useTechFilter.ts`
- Modify: `src/App.vue`
- Test: `tests/e2e/skills.spec.ts`

**Interfaces:**
- Consumes: `skills`, `skillGroups`, `projects`, `usageCount`, `projectsUsing`.
- Produces: `useTechFilter(): { active: Ref<string | null>; setFilter(id: string | null): void }` — module-level singleton state shared by Skills and Projects (single render at build time, so no cross-request leak).
- [ ] **Step 1: Write failing e2e** `skills.spec.ts`:
  - `role="tablist"` with 5 tabs Backend, Frontend, Data, AI, Tools; first selected (`aria-selected="true"`), its panel visible, others `hidden` but present in raw HTML (raw HTML contains `Microsoft SQL Server` and `Claude Code`).
  - Focus first tab, ArrowRight → Frontend selected and focused; End → Tools; Home → Backend; ArrowLeft from Backend → Tools.
  - Each skill shows its tier text and, when used, `Used in N projects` matching the data (Vue.js → 5).
  - Clicking Vue.js lists exactly the 5 Vue project titles (Advokatska kancelarija Vladić, ARIZONALIFTS, ASTRA-engineering, Blog App, Job Board) and shows a "Show in projects" button.
  - **Review Focus 5:** clicking "Show in projects" → `#projects` heading is focused (`document.activeElement.id === 'projects-title'`), `#projects` is in the viewport, and the active filter chip reads "Vue.js" (assert once Task 9 lands; until then mark this test `test.fixme` and remove the mark in Task 9).
- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Implement** ARIA tabs (roving `tabindex`), skill buttons with `aria-pressed`, 3-segment tier meter (`core` 3, `proficient` 2, `familiar` 1, with text label), per-group `blurb`, selected-skill readout with the project list and the "Show in projects" button (`setFilter(id)`, `scrollIntoView`, focus `#projects-title`; smooth scroll only without reduced motion).
- [ ] **Step 4: Run** `npm run build && npx playwright test skills` → PASS (except the fixme).
- [ ] **Step 5: Commit** `feat: add skills diagnostic with tabs and skill-to-project link`

---

### Task 9: Projects showcase with filter

**Files:**
- Create: `src/components/sections/ProjectsSection.vue`, `src/components/projects/{ProjectCard,ProjectRow,TechFilterBar}.vue`
- Modify: `src/App.vue`, `tests/e2e/skills.spec.ts` (remove fixme), `tests/e2e/seo.spec.ts` (remove fixme)
- Test: `tests/e2e/projects.spec.ts`

**Interfaces:**
- Consumes: `projects`, `skills`, `resolveProjectLink`, `projectsUsing`, `techsInUse`, `useTechFilter`, UI components. Section heading id `projects-title`.
- [ ] **Step 1: Write failing e2e** `projects.spec.ts`:
  - 6 featured cards (`[data-project]` in the featured list) and 4 archive rows.
  - Advokat Vladić card: badge `LIVE`, primary link `href="https://advokatvladic.rs"` with `target="_blank"` and `rel` containing `noopener` and `noreferrer`, secondary "Source" link to the repo.
  - ProjectAnvil card: badge `SOURCE ONLY`, primary link to `https://github.com/MiloshMilinkov/ProjectAnvil`, text `Not publicly hosted — view the source on GitHub.`
  - Euronet card: badge `CLASSIFIED`, no `<a>` inside the card, text `Proprietary system under NDA — details on request.`
  - Every `a[target=_blank]` in `#projects` contains the hidden text `(opens in a new tab)`.
  - Filter: click chip "C#" → visible cards/rows are exactly Euronet, Silicon Lottery, SpendSmart, Recipe Sharing API; the live region (`[aria-live="polite"]`) reads `Showing 4 projects using C#`; chip has `aria-pressed="true"`; click "Clear filter" → all 10 visible. Filter "React" → the archive group is not rendered.
  - Live-site cards show a `<picture>` with AVIF + WebP sources and `loading="lazy"`; others show the schematic SVG.
- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Implement** the section, filter bar (chips from `techsInUse`, "All"/"Clear filter"), cards (status badge, kind, year, summary, highlights, tech tags, actions from `resolveProjectLink`, pointer-tilt via CSS variables on `pointermove`, disabled for `pointer: coarse` and reduced motion), archive rows, `<TransitionGroup>` for filter changes (instant under reduced motion). Remove the `test.fixme` marks in `skills.spec.ts` and `seo.spec.ts`.
- [ ] **Step 4: Run** `npm run build && npx playwright test projects skills seo` → PASS.
- [ ] **Step 5: Commit** `feat: add projects showcase with status-aware links and tech filter`

---

### Task 10: Experience timeline + contact

**Files:**
- Create: `src/components/sections/ExperienceSection.vue`, `src/components/sections/ContactSection.vue`
- Modify: `src/App.vue`
- Test: `tests/e2e/experience-contact.spec.ts`

- [ ] **Step 1: Write failing e2e** `experience-contact.spec.ts`:
  - `#experience` has 3 role `<details>` (Euronet Worldwide, Freelance Web Developer, Kliker IT Center for Children) in that order plus education (BSc Computer Science, Visoka škola elektrotehnike i računarstva); only the first `<details>` has `open`; clicking the second `summary` opens it; keyboard Enter on a focused `summary` toggles it.
  - `#contact` has `a[href="mailto:milos300399@gmail.com"]`, a LinkedIn link `https://www.linkedin.com/in/milo%C5%A1milinkov/`, a GitHub link `https://github.com/MiloshMilinkov`, text `Belgrade, Serbia`; page HTML does not contain `+381`.
- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Implement** "Service record" timeline (period, title, org, place, labelled points; brass rail with nodes) and contact panel (large mono links). Section order in `App.vue`: hero, about, skills, experience, projects, contact.
- [ ] **Step 4: Run** `npm run build && npx playwright test` (all specs, 3 browsers) → PASS.
- [ ] **Step 5: Commit** `feat: add experience timeline and contact section`

---

### Task 11: Accessibility, validation, performance gates + CI

**Files:**
- Create: `tests/e2e/a11y.spec.ts`, `.github/workflows/ci.yml`, `.html-validate.json`
- Modify: `package.json` (scripts `validate:html`, `check` = typecheck + test + build + validate:html)

- [ ] **Step 1: Write** `a11y.spec.ts`: `AxeBuilder` with tags `wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa` → zero violations on `/` (after scrolling through every section so reveals run), on `/` with the mobile menu open at 375 px, and on `/missing`.
- [ ] **Step 2: Run** `npm run build && npx playwright test a11y` → fix every violation until PASS.
- [ ] **Step 3: Run** `npx html-validate "dist/**/*.html"` (config extends `html-validate:recommended`) → 0 errors; fix markup.
- [ ] **Step 4: Check budgets.** JS gzipped total from `vite build` output ≤ 60 KB. Run Lighthouse mobile against `wrangler dev` (`npx lighthouse http://127.0.0.1:8788 --preset=perf --form-factor=mobile` plus a full-category run, Chrome path from Playwright's Chromium) → all four categories ≥ 95; fix and re-run until met. Record the scores for the final report.
- [ ] **Step 5: CI** `.github/workflows/ci.yml`: on push and pull_request to `main`; Node 24; `npm ci`, `npm run typecheck`, `npm test`, `npm run build`, `npx playwright install --with-deps chromium`, `npx playwright test --project=chromium`; `permissions: contents: read`; no secrets.
- [ ] **Step 6: Commit** `test: add axe accessibility checks, HTML validation and CI`

---

### Task 12: GitHub repo, protections, deploy

**Files:**
- Modify: `src/data/site.ts` (`SITE_URL`), `README.md` (live URL, dev/deploy instructions)

- [ ] **Step 1: Create the GitHub repo** `MiloshMilinkov/MilosMilinkovPortfolio`, public, empty (no README/licence). Either `winget install --id GitHub.cli` then the user runs `gh auth login` and `gh repo create MiloshMilinkov/MilosMilinkovPortfolio --public --source . --push`, or the user creates it on github.com and we `git remote add origin https://github.com/MiloshMilinkov/MilosMilinkovPortfolio.git && git push -u origin main`. Re-run the secrets grep (`git log -p --all | grep -inE "api[_-]?key|secret|token|password|private key|sk_live|ghp_|AKIA"`) before the first push.
- [ ] **Step 2: GitHub protections** per the hardening skill (`github-settings.md`): private vulnerability reporting, secret scanning + push protection, Dependabot alerts, ruleset "Protect main" (block force-push and deletion), Wiki and Projects off. Read each setting back.
- [ ] **Step 3: First deploy** `npm run deploy` → note the `https://milos-milinkov.<subdomain>.workers.dev` URL printed by Wrangler.
- [ ] **Step 4: Set `SITE_URL`** to that URL, add it to the README top, `npm run check && npx playwright test --project=chromium`, `npm run deploy` again.
- [ ] **Step 5: Verify live:** `curl -sI <url>/` shows 200 + security headers; `curl -s <url>/robots.txt`, `/sitemap.xml`, `/missing` (404); canonical and `og:url` in the live HTML equal the URL; open the site in the browser pane at desktop and 375 px widths and look at every section.
- [ ] **Step 6: Commit + push** `chore: set production site URL` and confirm CI passes on GitHub.
