import { site } from '../data/site.ts'
import { buildJsonLd } from '../lib/jsonld.ts'
import { LOCALES, localeInfo, messages, type Locale } from './index.ts'

export const escapeAttr = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Absolute URL of the home page in `locale`. */
export const homeUrl = (locale: Locale) => `${site.SITE_URL}${localeInfo[locale].path}`

/** Values for the __TOKENS__ in index.html, per language. */
export function headTokens(locale: Locale): Record<string, string> {
  const t = messages[locale]
  return {
    __LANG__: localeInfo[locale].htmlLang,
    __TITLE__: t.meta.title,
    __DESCRIPTION__: t.meta.description,
    __CANONICAL__: homeUrl(locale),
    __OG_LOCALE__: localeInfo[locale].ogLocale,
    __OG_IMAGE__: `${site.SITE_URL}${site.ogImage(locale)}`,
    __OG_IMAGE_ALT__: t.meta.ogImageAlt,
  }
}

/** Every language version of the home page, plus x-default (English), for hreflang. */
export function alternates(): { hreflang: string; href: string }[] {
  return [
    ...LOCALES.map((l) => ({ hreflang: localeInfo[l].htmlLang, href: homeUrl(l) })),
    { hreflang: 'x-default', href: homeUrl('en') },
  ]
}

/** hreflang alternates, other-language og:locale tags and JSON-LD for the <head>. */
export function headExtra(locale: Locale): string {
  const links = alternates().map((a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`)
  const ogAlternates = LOCALES.filter((l) => l !== locale).map(
    (l) => `<meta property="og:locale:alternate" content="${localeInfo[l].ogLocale}" />`,
  )
  // Escape "<" so content can never close the script element early.
  const json = JSON.stringify(buildJsonLd(locale)).replace(/</g, '\\u003c')
  return [...links, ...ogAlternates, `<script type="application/ld+json">${json}</script>`].join('\n    ')
}

/**
 * Fills the head tokens and the <!--head-extra--> marker of the built index.html.
 * The build marks the preloaded font as <!--font:latin=…;cyrillic=…-->: each language
 * preloads the subset its headline is set in.
 */
export function fillHead(template: string, locale: Locale): string {
  let out = template
  for (const [token, value] of Object.entries(headTokens(locale))) out = out.replaceAll(token, escapeAttr(value))
  out = out.replace(/<!--font:latin=([^;]*);cyrillic=([^>]*)-->/, (_, latin: string, cyrillic: string) => {
    const file = locale === 'ru' && cyrillic ? cyrillic : latin
    return file ? `<link rel="preload" href="/${file}" as="font" type="font/woff2" crossorigin>` : ''
  })
  return out.replace('<!--head-extra-->', headExtra(locale))
}
