import type { Locale } from '../i18n/index.ts'

/** Site-wide identity and URLs. SITE_URL is the single source for every absolute URL. */
export const site = {
  name: 'Miloš Milinkov',
  alternateName: 'Milos Milinkov',
  SITE_URL: 'https://milos-milinkov.milos300399.workers.dev',
  email: 'milos300399@gmail.com',
  github: 'https://github.com/MiloshMilinkov',
  linkedin: 'https://www.linkedin.com/in/milo%C5%A1milinkov/',
  repo: 'https://github.com/MiloshMilinkov/MilosMilinkovPortfolio',
  /** Open Graph image path for a language (English uses the default file). */
  ogImage: (locale: Locale) => (locale === 'en' ? '/og-image.png' : `/og-image-${locale}.png`),
  /** Cloudflare setup guide PDF for a language. */
  guide: (locale: Locale) => `/guides/cloudflare-guide-${locale}.pdf`,
} as const

