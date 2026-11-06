import type { Project, Skill } from '../data/types.ts'

export interface ProjectAction {
  href: string
  label: string
}

export interface ResolvedProjectLink {
  primary: ProjectAction | null
  secondary: ProjectAction | null
  note: string | null
}

export const NOTE_SOURCE_ONLY = 'Not publicly hosted — view the source on GitHub.'
export const NOTE_CLASSIFIED = 'Proprietary system under NDA — details on request.'

/** Decides where a project card leads (spec §3, "Project link rules"). */
export function resolveProjectLink(p: Project): ResolvedProjectLink {
  switch (p.status) {
    case 'live':
      return {
        primary: p.liveUrl ? { href: p.liveUrl, label: 'Visit live site' } : null,
        secondary: p.repoUrl ? { href: p.repoUrl, label: 'Source' } : null,
        note: null,
      }
    case 'source':
      return {
        primary: p.repoUrl ? { href: p.repoUrl, label: 'View source on GitHub' } : null,
        secondary: null,
        note: NOTE_SOURCE_ONLY,
      }
    case 'classified':
      return { primary: null, secondary: null, note: NOTE_CLASSIFIED }
  }
}

/** Returns a list of content problems; an empty list means the data is valid. */
export function validateProjects(projects: Project[], skills: Skill[]): string[] {
  const problems: string[] = []
  const known = new Set(skills.map((s) => s.id))
  const seen = new Set<string>()

  for (const p of projects) {
    if (seen.has(p.id)) problems.push(`duplicate project id "${p.id}"`)
    seen.add(p.id)

    if (p.status === 'live' && !p.liveUrl) problems.push(`"${p.id}" is live but has no liveUrl`)
    if (p.status === 'source' && !p.repoUrl) problems.push(`"${p.id}" is source-only but has no repoUrl`)
    if (p.status === 'classified' && (p.liveUrl || p.repoUrl)) {
      problems.push(`"${p.id}" is classified but has a public URL`)
    }

    for (const t of p.tech) {
      if (!known.has(t)) problems.push(`"${p.id}" uses unknown tech id "${t}"`)
    }
  }
  return problems
}
