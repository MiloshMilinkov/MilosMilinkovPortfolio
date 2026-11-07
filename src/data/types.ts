export type SkillGroup = 'backend' | 'frontend' | 'data' | 'ai' | 'tools'
export type SkillTier = 'core' | 'proficient' | 'familiar'

export interface Skill {
  /** Stable id used by Project.tech, e.g. 'vue', 'dotnet', 'mssql'. */
  id: string
  label: string
  group: SkillGroup
  tier: SkillTier
}

export interface SkillGroupInfo {
  id: SkillGroup
  label: string
  blurb: string
}

export type ProjectStatus = 'live' | 'source' | 'classified'

export interface Project {
  id: string
  title: string
  /** Short description of what it is, e.g. 'Law office website'. */
  kind: string
  year?: string
  /** One sentence. */
  summary: string
  highlights: string[]
  /** Skill ids: usage counts in the workflow section, JSON-LD keywords and validation. */
  tech: string[]
  status: ProjectStatus
  /** Required when status = 'live'. */
  liveUrl?: string
  /** Required when status = 'source'; optional for 'live'; never for 'classified'. */
  repoUrl?: string
  featured: boolean
  /** A showcase site for a fictional business: live, but not client work. */
  concept?: boolean
  /** Base name of a screenshot in /images/projects (`<image>-<width>.<avif|webp>`). */
  image?: string
}

export interface RolePoint {
  label?: string
  text: string
}

export interface Role {
  title: string
  org: string
  place: string
  period: string
  points: RolePoint[]
}

export interface Education {
  degree: string
  school: string
  place: string
  period: string
  points: string[]
}

export interface Stat {
  value: number
  suffix: string
  label: string
}
