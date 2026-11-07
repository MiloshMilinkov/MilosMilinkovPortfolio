# Miloš Milinkov — Portfolio

> **⚠️ View only — not open source.**
> This code is public for viewing only. Copying, modifying, deploying, redistributing or reusing any part of it (code, design, texts or branding), or using it to train AI models, is not allowed without written permission. See [LICENSE](LICENSE).

**Live site:** https://milos-milinkov.milos300399.workers.dev

Portfolio and service site of Miloš Milinkov — fast, modern websites and web apps for businesses.

Built with Vue 3, TypeScript and Vite, prerendered to static HTML and served from Cloudflare Workers.

## Development

```bash
npm install
npm run dev          # Vite dev server
npm run check        # typecheck, unit tests, build, HTML validation
npm run test:e2e     # Playwright UI tests against wrangler dev (build first)
npm run deploy       # build and deploy to Cloudflare Workers
```

Content lives in `src/data/`; `SITE_URL` in `src/data/site.ts` controls every absolute URL (canonical, Open Graph, sitemap).

## License

Copyright © 2026 Miloš Milinkov. All rights reserved.

This project is proprietary and **not** open source. No licence is granted to use, copy, modify, deploy or distribute it. See [LICENSE](LICENSE) for the full terms. For permission requests, contact milos300399@gmail.com.

Security issues: see [SECURITY.md](SECURITY.md).
