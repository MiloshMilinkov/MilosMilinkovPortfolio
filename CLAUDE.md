# CLAUDE.md — Miloš Milinkov portfolio

Portfolio and service site for Miloš's web-building business. Proprietary, view only (see LICENSE).
Live: https://milos-milinkov.milos300399.workers.dev · Repo: MiloshMilinkov/MilosMilinkovPortfolio (public).

## Commands

```bash
npm install
npm run dev            # Vite dev server (client render only, no prerender)
npm run build          # vue-tsc -b → vite build → vite build --ssr → scripts/prerender.mjs
npm run typecheck      # vue-tsc -b
npm test               # Vitest unit tests (tests/unit)
npm run validate:html  # html-validate on dist/index.html and dist/404.html
npm run check          # typecheck + unit + build + validate:html
npm run test:e2e       # Playwright against `wrangler dev` on 127.0.0.1:8788 — build first
npm run deploy         # build + wrangler deploy (Worker "milos-milinkov", static assets only)
```

No linter is configured. Local e2e: `npx playwright test --project=chromium --project=webkit`.

## Stack

Vue 3 + TypeScript + Vite 8, prerendered to static HTML and hydrated with `createSSRApp`.
Served as Cloudflare Workers Static Assets (`wrangler.jsonc`, no Worker script; `public/_headers`
sets CSP/HSTS/cache). Font: Geist (self-hosted, latin + latin-ext + cyrillic). Runtime dependency: `vue` only.

## Layout

- `src/i18n/` — languages: `messages/en.ts` (defines the `Messages` shape), `sr.ts` (Serbian, Latin
  script), `ru.ts`; `index.ts` (locales, `useI18n()`), `head.ts` (per-language title, canonical,
  hreflang, OG, JSON-LD).
- `src/data/` — non-text facts: `site.ts` (`SITE_URL`, links, OG/guide paths), `projects.ts` (ids,
  URLs, status, tech), `profile.ts` (stat numbers), `services.ts` (ids/icons), `skills.ts`, `nav.ts`.
- `src/lib/` — pure logic: project link rules, skill usage, JSON-LD, schematic art.
- `src/components/` — `hero/`, `sections/`, `projects/`, `layout/`, `ui/` (Icon, cards, badges…).
- `src/styles/` — `tokens.css` (palette, type scale), `base.css` (cards, buttons, pills), `fonts.css`.
- `vite/seo-plugin.ts` — font preload, robots.txt and the hreflang sitemap; fills the head tokens
  only on the dev server. In a build, `scripts/prerender.mjs` fills them per language.
- `scripts/` — `prerender.mjs`; `assets/` one-off generators (screenshots, icons, OG image).
- `tests/unit` (Vitest), `tests/e2e` (Playwright + axe).

## Content rules

- All visible text lives in `src/i18n/messages/*.ts`; change EN, SR and RU together (TypeScript
  fails the build if a language misses a key). Pages: `/` (en), `/sr/`, `/ru/`, each prerendered
  with its own head; the language picker links between them.
- After changing hero copy, re-run `node scripts/assets/generate-og.mjs` (one OG image per language).
- Cloudflare setup guides (PDF, per language) live in `public/guides/`; the Hosting section links them.
- Portrait: `node scripts/assets/process-portrait.mjs <photo>` (4:5 crop, never upscaled).
- Projects: `status` is `live` (needs `liveUrl`), `source` (needs `repoUrl`) or `classified` (no URL).
  Fictional showcase sites get `concept: true`: shown as Live but never counted as client work.
- New live project screenshots: add `image: '<id>'`, then `node scripts/assets/capture-screenshots.mjs`.
- `SITE_URL` in `src/data/site.ts` drives every absolute URL (canonical, OG, sitemap, JSON-LD).
- Tool/technology names belong only in the workflow section (`#skills`) and the Hosting section
  (`#hosting`, which explains Cloudflare); an e2e test enforces it for the other sections.
- Never publish the phone number or the CV PDF; tests check for `+381` / `tel:`.
- Dark theme only. Copy is client-facing: the site sells Miloš's web-building service.

## Testing

- The owner wants UI/UX tests only (e2e, accessibility, layout); don't add new unit-test suites.
- `content.test.ts` pins project counts and statuses: update it when projects change.

## Gotchas

- Firefox and full Chrome cannot launch on this Windows machine (`spawn UNKNOWN`); local e2e runs
  Chromium (Playwright headless shell) + WebKit; CI on GitHub runs Chromium + Firefox. Local
  Lighthouse does not work either: use pagespeed.web.dev on the live URL.
- A Playwright file filter like `projects` also matches the `D:\Projects` path and runs every spec:
  pass the full path, e.g. `tests/e2e/projects.spec.ts`.
- Files imported by `vite.config.ts` (src/data, src/lib, vite/) must use explicit `.ts` import
  extensions: Vite 8 loads the config natively.
- WebKit's Tab key skips links (like Safari): Tab-order tests skip WebKit.
- Push with plain `git push` (Git Credential Manager). The `gh` CLI token lacks the `workflow` scope,
  so it cannot push changes to `.github/workflows`.
- Before committing logic changes, run the `simplify` skill, then `code-review` at low effort.
