import { describe, expect, it } from 'vitest'
import { projects } from '../../src/data/projects'
import { site } from '../../src/data/site'
import { skills } from '../../src/data/skills'
import { buildJsonLd } from '../../src/lib/jsonld'

type Node = Record<string, any>

const ld = buildJsonLd() as { '@context': string; '@graph': Node[] }
const byType = (t: string) => ld['@graph'].find((n) => n['@type'] === t) as Node

function collectUrlValues(value: unknown, key = '', out: [string, string][] = []): [string, string][] {
  if (typeof value === 'string' && ['url', '@id', 'image'].includes(key)) out.push([key, value])
  else if (Array.isArray(value)) value.forEach((v) => collectUrlValues(v, key, out))
  else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) collectUrlValues(v, k, out)
  }
  return out
}

describe('buildJsonLd', () => {
  it('uses schema.org context with WebSite, ProfilePage, Person and ItemList', () => {
    expect(ld['@context']).toBe('https://schema.org')
    for (const t of ['WebSite', 'ProfilePage', 'Person', 'ItemList']) expect(byType(t)).toBeTruthy()
  })

  it('ProfilePage points at the Person', () => {
    expect(byType('ProfilePage').mainEntity['@id']).toBe(byType('Person')['@id'])
  })

  it('describes the person', () => {
    const person = byType('Person')
    expect(person.name).toBe('Miloš Milinkov')
    expect(person.alternateName).toBe('Milos Milinkov')
    expect(person.sameAs).toEqual(expect.arrayContaining([site.github, site.linkedin]))
    expect(person.worksFor.name).toBe('Euronet Worldwide')
    expect(person.knowsAbout).toHaveLength(skills.length)
  })

  it('lists all projects in order', () => {
    const items = byType('ItemList').itemListElement as Node[]
    expect(items).toHaveLength(projects.length)
    expect(items.map((i) => i.position)).toEqual(projects.map((_, i) => i + 1))
    expect(items.map((i) => i.item.name)).toEqual(projects.map((p) => p.title))
  })

  it('gives the classified project no url', () => {
    const items = byType('ItemList').itemListElement as Node[]
    const euronet = items.find((i) => i.item.name.startsWith('Financial Back-Office'))
    expect(euronet?.item.url).toBeUndefined()
  })

  it('only contains absolute URLs', () => {
    const urls = collectUrlValues(ld)
    expect(urls.length).toBeGreaterThan(10)
    for (const [key, url] of urls) expect(url, key).toMatch(/^https:\/\//)
    expect(byType('Person')['@id'].startsWith(site.SITE_URL)).toBe(true)
  })
})
