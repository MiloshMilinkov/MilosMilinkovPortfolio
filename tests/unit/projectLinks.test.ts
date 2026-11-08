import { describe, expect, it } from 'vitest'
import { en } from '../../src/i18n/messages/en'
import { resolveProjectLink, validateProjects } from '../../src/lib/projectLinks'

const links = en.projects.links
import { project, skillFixture } from './fixtures'

describe('resolveProjectLink', () => {
  it('live project with a repo: live site first, source second, no note', () => {
    const p = project({
      id: 'live',
      status: 'live',
      liveUrl: 'https://example.com',
      repoUrl: 'https://github.com/x/live',
    })
    expect(resolveProjectLink(p, links)).toEqual({
      primary: { href: 'https://example.com', label: 'Visit live site' },
      secondary: { href: 'https://github.com/x/live', label: 'Source' },
      note: null,
    })
  })

  it('live project without a repo has no secondary link', () => {
    const p = project({ id: 'live', status: 'live', liveUrl: 'https://example.com', repoUrl: undefined })
    expect(resolveProjectLink(p, links).secondary).toBeNull()
  })

  it('source-only project links to the repo with the not-hosted note', () => {
    const p = project({ id: 'src', status: 'source', repoUrl: 'https://github.com/x/src' })
    expect(resolveProjectLink(p, links)).toEqual({
      primary: { href: 'https://github.com/x/src', label: 'View source on GitHub' },
      secondary: null,
      note: 'Not publicly hosted — view the source on GitHub.',
    })
  })

  it('classified project has no link and the NDA note', () => {
    const p = project({ id: 'nda', status: 'classified', repoUrl: undefined })
    expect(resolveProjectLink(p, links)).toEqual({
      primary: null,
      secondary: null,
      note: 'Proprietary system under NDA — details on request.',
    })
  })
})

describe('validateProjects', () => {
  it('accepts a valid list', () => {
    expect(validateProjects([project({ id: 'ok', tech: ['vue'] })], skillFixture)).toEqual([])
  })

  it('reports a live project without liveUrl', () => {
    const problems = validateProjects([project({ id: 'x', status: 'live' })], skillFixture)
    expect(problems).toHaveLength(1)
    expect(problems[0]).toContain('x')
    expect(problems[0]).toContain('liveUrl')
  })

  it('reports a source project without repoUrl', () => {
    const problems = validateProjects([project({ id: 'y', repoUrl: undefined })], skillFixture)
    expect(problems.join()).toContain('repoUrl')
  })

  it('reports a classified project that has any URL', () => {
    const p = project({ id: 'z', status: 'classified', repoUrl: 'https://github.com/leak' })
    expect(validateProjects([p], skillFixture).join()).toContain('classified')
  })

  it('reports duplicate ids', () => {
    const problems = validateProjects([project({ id: 'dup' }), project({ id: 'dup' })], skillFixture)
    expect(problems.join()).toContain('duplicate')
  })

  it('reports an unknown tech id by name', () => {
    const problems = validateProjects([project({ id: 'p', tech: ['cobol'] })], skillFixture)
    expect(problems.join()).toContain('cobol')
  })
})
