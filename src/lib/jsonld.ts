import { projects } from '../data/projects.ts'
import { site } from '../data/site.ts'
import { skills } from '../data/skills.ts'
import { localeInfo, messages, type Locale } from '../i18n/index.ts'
import { resolveProjectLink } from './projectLinks.ts'

/**
 * schema.org structured data for the home page in one language, built from the
 * same content the page renders, so the two can never disagree. The person and
 * the website keep one id across languages; the profile page is per language.
 */
export function buildJsonLd(locale: Locale = 'en'): Record<string, unknown> {
  const t = messages[locale]
  const lang = localeInfo[locale].htmlLang
  const page = `${site.SITE_URL}${localeInfo[locale].path}`
  const id = (fragment: string) => `${site.SITE_URL}/#${fragment}`
  const skillLabel = new Map(skills.map((s) => [s.id, s.label]))

  const person = {
    '@type': 'Person',
    '@id': id('person'),
    name: site.name,
    alternateName: site.alternateName,
    jobTitle: t.meta.jobTitle,
    description: t.hero.headline,
    url: `${site.SITE_URL}/`,
    image: `${site.SITE_URL}/images/portrait-506.webp`,
    email: `mailto:${site.email}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Belgrade', addressCountry: 'RS' },
    worksFor: { '@type': 'Organization', name: 'Euronet Worldwide' },
    alumniOf: t.experience.education.map((e) => ({ '@type': 'CollegeOrUniversity', name: e.school })),
    knowsAbout: skills.map((s) => s.label),
    knowsLanguage: ['sr', 'en'],
    sameAs: [site.github, site.linkedin],
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': id('website'),
        url: `${site.SITE_URL}/`,
        name: site.name,
        description: t.meta.description,
        inLanguage: ['en', 'sr-Latn', 'ru'],
        publisher: { '@id': person['@id'] },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${page}#profile`,
        url: page,
        name: t.meta.title,
        inLanguage: lang,
        isPartOf: { '@id': id('website') },
        mainEntity: { '@id': person['@id'] },
      },
      person,
      {
        '@type': 'ItemList',
        '@id': `${page}#projects`,
        name: t.projects.title,
        itemListElement: projects.map((p, i) => {
          const href = resolveProjectLink(p, t.projects.links).primary?.href
          return {
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'CreativeWork',
              name: p.title,
              description: t.projects.items[p.id]?.summary,
              ...(href ? { url: href } : {}),
              keywords: p.tech.map((tech) => skillLabel.get(tech) ?? tech).join(', '),
              creator: { '@id': person['@id'] },
            },
          }
        }),
      },
    ],
  }
}
