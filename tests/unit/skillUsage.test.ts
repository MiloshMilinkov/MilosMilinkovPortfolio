import { describe, expect, it } from 'vitest'
import { projectsUsing } from '../../src/lib/skillUsage'
import { projectFixture } from './fixtures'

describe('projectsUsing', () => {
  it('returns only projects using the skill, in original order', () => {
    expect(projectsUsing(projectFixture, 'vue').map((p) => p.id)).toEqual(['a', 'c'])
  })

  it('returns an empty list for a skill nobody uses', () => {
    expect(projectsUsing(projectFixture, 'react')).toEqual([])
  })
})
