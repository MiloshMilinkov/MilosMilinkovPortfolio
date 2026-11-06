import type { Plugin } from 'vite'
import { site } from '../src/data/site.ts'
import { buildJsonLd } from '../src/lib/jsonld.ts'

const escapeAttr = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Tokens in index.html / 404.html, filled from src/data/site.ts. */
const tokens: Record<string, string> = {
  __SITE_URL__: site.SITE_URL,
  __TITLE__: site.title,
  __DESCRIPTION__: site.description,
  __OG_IMAGE__: site.ogImage,
  __OG_IMAGE_ALT__: site.ogImageAlt,
}

export function renderRobots(): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${site.SITE_URL}/sitemap.xml\n`
}

export function renderSitemap(lastmod: string): string {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '  <url>',
    `    <loc>${site.SITE_URL}/</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    '  </url>',
    '</urlset>',
    '',
  ].join('\n')
}

/**
 * Derives every SEO artefact from the content data (spec §2, §6):
 * head tokens, JSON-LD on the home page, robots.txt and sitemap.xml.
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
        for (const [token, value] of Object.entries(tokens)) out = out.replaceAll(token, escapeAttr(value))

        // Preload the display font (latin subset) — it sets the hero name, the LCP text.
        const fontFile = ctx.bundle
          ? Object.keys(ctx.bundle).find((f) => /grenze-gotisch-latin-wght-normal-[\w-]+\.woff2$/.test(f))
          : undefined
        if (fontFile) {
          out = out.replace(
            '<meta name="viewport"',
            `<link rel="preload" href="/${fontFile}" as="font" type="font/woff2" crossorigin>\n    <meta name="viewport"`,
          )
        }

        if (ctx.path === '/index.html' || ctx.path === '/') {
          // Escape "<" so content can never close the script element early.
          const json = JSON.stringify(buildJsonLd()).replace(/</g, '\\u003c')
          out = out.replace('</head>', `  <script type="application/ld+json">${json}</script>\n  </head>`)
        }
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
