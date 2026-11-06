import type { Project, Skill } from '../data/types'

/** Projects that use `techId`, in their original order; `null` means no filter. */
export function projectsUsing(projects: Project[], techId: string | null): Project[] {
  return techId === null ? [...projects] : projects.filter((p) => p.tech.includes(techId))
}

export function usageCount(projects: Project[], techId: string): number {
  return projects.reduce((n, p) => (p.tech.includes(techId) ? n + 1 : n), 0)
}

/** Skills used by at least one project, in the skills list's order (filter chips). */
export function techsInUse(projects: Project[], skills: Skill[]): Skill[] {
  const used = new Set(projects.flatMap((p) => p.tech))
  return skills.filter((s) => used.has(s.id))
}
