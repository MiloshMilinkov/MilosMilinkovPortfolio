import type { Project } from '../data/types.ts'

/** Projects that use the skill `skillId`, in their original order. */
export function projectsUsing(projects: Project[], skillId: string): Project[] {
  return projects.filter((p) => p.tech.includes(skillId))
}
