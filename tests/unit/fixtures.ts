import type { Project, Skill } from '../../src/data/types'

export const skillFixture: Skill[] = [
  { id: 'csharp', label: 'C#', group: 'backend', tier: 'core' },
  { id: 'vue', label: 'Vue.js', group: 'frontend', tier: 'core' },
  { id: 'react', label: 'React', group: 'frontend', tier: 'familiar' },
  { id: 'mssql', label: 'Microsoft SQL Server', group: 'data', tier: 'core' },
]

export function project(overrides: Partial<Project> & Pick<Project, 'id'>): Project {
  return {
    title: overrides.id,
    kind: 'Test project',
    summary: 'Summary.',
    highlights: [],
    tech: [],
    status: 'source',
    repoUrl: `https://github.com/example/${overrides.id}`,
    featured: false,
    ...overrides,
  }
}

export const projectFixture: Project[] = [
  project({ id: 'a', tech: ['vue', 'csharp'] }),
  project({ id: 'b', tech: ['mssql'] }),
  project({ id: 'c', tech: ['vue'] }),
]
