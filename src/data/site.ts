/** Site-wide identity and URLs. SITE_URL is the single source for every absolute URL. */
export const site = {
  name: 'Miloš Milinkov',
  alternateName: 'Milos Milinkov',
  jobTitle: 'Full-stack web developer',
  roleLine: 'Full-stack web developer in Belgrade',
  title: 'Miloš Milinkov — Websites & Web Apps for Businesses',
  description:
    'Miloš Milinkov builds fast, search-friendly websites and web apps for businesses: designed, developed and hosted from Belgrade, Serbia.',
  // Replaced with the real workers.dev URL after the first deploy (plan Task 12).
  SITE_URL: 'https://milos-milinkov.workers.dev',
  locale: 'en_US',
  email: 'milos300399@gmail.com',
  github: 'https://github.com/MiloshMilinkov',
  linkedin: 'https://www.linkedin.com/in/milo%C5%A1milinkov/',
  repo: 'https://github.com/MiloshMilinkov/MilosMilinkovPortfolio',
  ogImage: '/og-image.png',
  ogImageAlt: 'Miloš Milinkov — fast, modern websites and web apps for businesses',
} as const

export type Site = typeof site
