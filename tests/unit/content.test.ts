import { describe, expect, it } from 'vitest'
import { education, roles } from '../../src/data/experience'
import { profile } from '../../src/data/profile'
import { projects } from '../../src/data/projects'
import { site } from '../../src/data/site'
import { skillGroups, skills } from '../../src/data/skills'
import { validateProjects } from '../../src/lib/projectLinks'

const allData = { site, profile, skills, skillGroups, projects, roles, education }

function collectStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') out.push(value)
  else if (Array.isArray(value)) value.forEach((v) => collectStrings(v, out))
  else if (value && typeof value === 'object') Object.values(value).forEach((v) => collectStrings(v, out))
  return out
}

describe('site content', () => {
  it('projects pass validation against the skills list', () => {
    expect(validateProjects(projects, skills)).toEqual([])
  })

  it('has 7 projects, all featured', () => {
    expect(projects).toHaveLength(7)
    expect(projects.filter((p) => p.featured)).toHaveLength(7)
  })

  it('marks exactly the hosted sites as live and Euronet as classified', () => {
    const ids = (status: string) => projects.filter((p) => p.status === status).map((p) => p.id)
    expect(ids('live').sort()).toEqual(['advokat-vladic', 'arizonalifts', 'little-fern-coffee', 'mabels-chair'])
    expect(projects.filter((p) => p.concept).map((p) => p.id)).toEqual(['little-fern-coffee', 'mabels-chair'])
    expect(ids('classified')).toEqual(['euronet'])
  })

  it('uses https for every URL', () => {
    for (const p of projects) {
      for (const url of [p.liveUrl, p.repoUrl].filter(Boolean)) expect(url).toMatch(/^https:\/\//)
    }
    for (const url of [site.SITE_URL, site.github, site.linkedin, site.repo]) expect(url).toMatch(/^https:\/\//)
  })

  it('stat tiles agree with the project data', () => {
    const byLabel = (needle: string) => profile.stats.find((s) => s.label.includes(needle))
    // Concept sites are live but are not client work.
    expect(byLabel('live')?.value).toBe(projects.filter((p) => p.status === 'live' && !p.concept).length)
    // 'projects built' counts everything on GitHub, so it may exceed the listed projects.
    expect(byLabel('projects')?.value).toBeGreaterThanOrEqual(projects.length)
  })

  it('every skill group has at least one skill', () => {
    for (const g of skillGroups) expect(skills.some((s) => s.group === g.id)).toBe(true)
  })

  it('never exposes the phone number or a CV file', () => {
    const strings = collectStrings(allData)
    expect(strings.some((s) => s.includes('+381'))).toBe(false)
    expect(strings.some((s) => s.toLowerCase().includes('.pdf'))).toBe(false)
  })
})
