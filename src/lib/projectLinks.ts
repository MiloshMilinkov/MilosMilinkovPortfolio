import type { Project, Skill } from '../data/types.ts'
import type { Messages } from '../i18n/messages/en.ts'

export interface ProjectAction {
  href: string
  label: string
}

export interface ResolvedProjectLink {
  primary: ProjectAction | null
  secondary: ProjectAction | null
  note: string | null
}

/** Link labels and notes for one language. */
export type LinkText = Messages['projects']['links']

/** Decides where a project card leads (spec §3, "Project link rules"). */
export function resolveProjectLink(p: Project, text: LinkText): ResolvedProjectLink {
  switch (p.status) {
    case 'live':
      return {
        primary: p.liveUrl ? { href: p.liveUrl, label: text.visit } : null,
        secondary: p.repoUrl ? { href: p.repoUrl, label: text.source } : null,
        note: null,
      }
    case 'source':
      return {
        primary: p.repoUrl ? { href: p.repoUrl, label: text.viewSource } : null,
        secondary: null,
        note: text.noteSource,
      }
    case 'classified':
      return { primary: null, secondary: null, note: text.noteClassified }
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
