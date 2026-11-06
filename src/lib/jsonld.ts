import { education } from '../data/experience.ts'
import { profile } from '../data/profile.ts'
import { projects } from '../data/projects.ts'
import { site } from '../data/site.ts'
import { skills } from '../data/skills.ts'
import { resolveProjectLink } from './projectLinks.ts'

/**
 * schema.org structured data for the home page (spec §6), built from the same
 * content modules the page renders, so the two can never disagree.
 */
export function buildJsonLd(): Record<string, unknown> {
  const home = `${site.SITE_URL}/`
  const id = (fragment: string) => `${site.SITE_URL}/#${fragment}`
  const skillLabel = new Map(skills.map((s) => [s.id, s.label]))

  const person = {
    '@type': 'Person',
    '@id': id('person'),
    name: site.name,
    alternateName: site.alternateName,
    jobTitle: site.jobTitle,
    description: profile.headline,
    url: home,
    image: `${site.SITE_URL}/images/portrait-360.webp`,
    email: `mailto:${site.email}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Belgrade', addressCountry: 'RS' },
    worksFor: { '@type': 'Organization', name: 'Euronet Worldwide' },
    alumniOf: education.map((e) => ({ '@type': 'CollegeOrUniversity', name: e.school })),
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
        url: home,
        name: site.name,
        description: site.description,
        inLanguage: 'en',
        publisher: { '@id': person['@id'] },
      },
      {
        '@type': 'ProfilePage',
        '@id': id('profile'),
        url: home,
        name: site.title,
        inLanguage: 'en',
        isPartOf: { '@id': id('website') },
        mainEntity: { '@id': person['@id'] },
      },
      person,
      {
        '@type': 'ItemList',
        '@id': id('projects'),
        name: 'Projects',
        itemListElement: projects.map((p, i) => {
          const href = resolveProjectLink(p).primary?.href
          return {
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'CreativeWork',
              name: p.title,
              description: p.summary,
              ...(href ? { url: href } : {}),
              keywords: p.tech.map((t) => skillLabel.get(t) ?? t).join(', '),
              creator: { '@id': person['@id'] },
            },
          }
        }),
      },
    ],
  }
}
