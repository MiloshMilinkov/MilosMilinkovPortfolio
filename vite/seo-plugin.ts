import type { Plugin } from 'vite'
import { site } from '../src/data/site.ts'
import { alternates, fillHead, homeUrl } from '../src/i18n/head.ts'
import { LOCALES, localeFromPath } from '../src/i18n/index.ts'

export function renderRobots(): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${site.SITE_URL}/sitemap.xml\n`
}

/** One <url> per language, each listing every language version (hreflang alternates). */
export function renderSitemap(lastmod: string): string {
  const links = alternates()
    .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}"/>`)
    .join('\n')
  const urls = LOCALES.map((l) =>
    ['  <url>', `    <loc>${homeUrl(l)}</loc>`, `    <lastmod>${lastmod}</lastmod>`, links, '  </url>'].join('\n'),
  )
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n')
}

/**
 * Font preload marker, robots.txt and sitemap.xml. In a build, the per-language head
 * (title, canonical, hreflang, JSON-LD, font preload…) is filled by scripts/prerender.mjs;
 * the dev server fills it here in the language of the requested URL.
 */
export function seoPlugin(): Plugin {
  return {
    name: 'portfolio-seo',
    // Client only: the SSR bundle is temporary and never served.
    applyToEnvironment: (environment) => environment.name === 'client',

    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        let out = html

        // The hero heading (the LCP text) should not wait for its font: fonts arriving after
        // first paint force a costly relayout. The marker names both subsets; fillHead()
        // turns it into a preload of the one each language's headline is set in.
        const files = ctx.bundle ? Object.keys(ctx.bundle) : []
        const latin = files.find((f) => /geist-latin-wght-normal-[\w-]+\.woff2$/.test(f)) ?? ''
        const cyrillic = files.find((f) => /geist-cyrillic-wght-normal-[\w-]+\.woff2$/.test(f)) ?? ''
        if (latin) {
          out = out.replace('<meta name="viewport"', `<!--font:latin=${latin};cyrillic=${cyrillic}-->\n    <meta name="viewport"`)
        }

        if (ctx.server && out.includes('__LANG__')) out = fillHead(out, localeFromPath(ctx.originalUrl ?? '/'))
        return out
      },
    },

    generateBundle() {
      const lastmod = new Date().toISOString().slice(0, 10)
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: renderRobots() })
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: renderSitemap(lastmod) })
    },
  }
}
