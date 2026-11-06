import { describe, expect, it } from 'vitest'
import { projectsUsing, techsInUse, usageCount } from '../../src/lib/techFilter'
import { projectFixture, skillFixture } from './fixtures'

describe('projectsUsing', () => {
  it('returns only projects using the tech, in original order', () => {
    expect(projectsUsing(projectFixture, 'vue').map((p) => p.id)).toEqual(['a', 'c'])
  })

  it('returns every project when no tech is selected', () => {
    expect(projectsUsing(projectFixture, null).map((p) => p.id)).toEqual(['a', 'b', 'c'])
  })

  it('returns an empty list for a tech nobody uses', () => {
    expect(projectsUsing(projectFixture, 'react')).toEqual([])
  })
})

describe('usageCount', () => {
  it('counts projects using a tech', () => {
    expect(usageCount(projectFixture, 'vue')).toBe(2)
    expect(usageCount(projectFixture, 'mssql')).toBe(1)
    expect(usageCount(projectFixture, 'react')).toBe(0)
  })
})

describe('techsInUse', () => {
  it('keeps skills order and drops skills no project uses', () => {
    expect(techsInUse(projectFixture, skillFixture).map((s) => s.id)).toEqual(['csharp', 'vue', 'mssql'])
  })
})
