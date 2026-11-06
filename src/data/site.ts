/** Site-wide identity and URLs. SITE_URL is the single source for every absolute URL. */
export const site = {
  name: 'Miloš Milinkov',
  alternateName: 'Milos Milinkov',
  jobTitle: 'Software Developer',
  roleLine: 'Software Developer · .NET & SQL · Full-Stack · AI-Assisted Engineering',
  title: 'Miloš Milinkov — Software Developer (.NET, SQL, Vue.js)',
  description:
    'Miloš Milinkov, software developer in Belgrade: .NET & SQL Server back-office systems, Vue.js web apps and AI-assisted engineering.',
  // Replaced with the real workers.dev URL after the first deploy (plan Task 12).
  SITE_URL: 'https://milos-milinkov.workers.dev',
  locale: 'en_US',
  email: 'milos300399@gmail.com',
  github: 'https://github.com/MiloshMilinkov',
  linkedin: 'https://www.linkedin.com/in/milo%C5%A1milinkov/',
  repo: 'https://github.com/MiloshMilinkov/MilosMilinkovPortfolio',
  ogImage: '/og-image.png',
  ogImageAlt: 'Miloš Milinkov — Software Developer · .NET & SQL · Full-Stack · AI-Assisted Engineering',
} as const

export type Site = typeof site
