import type { Skill, SkillGroup } from './types.ts'

/** Group order; labels and blurbs live in the language files (skills.groups). */
export const skillGroups: SkillGroup[] = ['backend', 'frontend', 'data', 'ai', 'tools']

export const skills: Skill[] = [
  // Backend
  { id: 'csharp', label: 'C#', group: 'backend', tier: 'core' },
  { id: 'dotnet', label: '.NET', group: 'backend', tier: 'core' },
  { id: 'aspnet', label: 'ASP.NET Core', group: 'backend', tier: 'proficient' },
  { id: 'node', label: 'Node.js', group: 'backend', tier: 'proficient' },
  { id: 'express', label: 'Express.js', group: 'backend', tier: 'proficient' },
  // Frontend
  { id: 'vue', label: 'Vue.js', group: 'frontend', tier: 'core' },
  { id: 'javascript', label: 'JavaScript', group: 'frontend', tier: 'core' },
  { id: 'typescript', label: 'TypeScript', group: 'frontend', tier: 'proficient' },
  { id: 'vite', label: 'Vite', group: 'frontend', tier: 'core' },
  { id: 'htmlcss', label: 'HTML & CSS', group: 'frontend', tier: 'core' },
  { id: 'nuxt', label: 'Nuxt', group: 'frontend', tier: 'familiar' },
  { id: 'react', label: 'React', group: 'frontend', tier: 'familiar' },
  { id: 'angular', label: 'Angular', group: 'frontend', tier: 'familiar' },
  { id: 'tailwind', label: 'Tailwind CSS', group: 'frontend', tier: 'familiar' },
  // Data
  { id: 'mssql', label: 'Microsoft SQL Server', group: 'data', tier: 'core' },
  { id: 'ssis', label: 'SSIS', group: 'data', tier: 'proficient' },
  { id: 'sqlite', label: 'SQLite', group: 'data', tier: 'proficient' },
  { id: 'mongodb', label: 'MongoDB', group: 'data', tier: 'familiar' },
  // AI
  { id: 'claude-code', label: 'Claude Code', group: 'ai', tier: 'core' },
  { id: 'codex', label: 'OpenAI Codex', group: 'ai', tier: 'core' },
  // Tools
  { id: 'git', label: 'Git', group: 'tools', tier: 'core' },
  { id: 'cloudflare', label: 'Cloudflare Workers', group: 'tools', tier: 'proficient' },
  { id: 'playwright', label: 'Playwright', group: 'tools', tier: 'proficient' },
  { id: 'docker', label: 'Docker', group: 'tools', tier: 'proficient' },
  { id: 'vercel', label: 'Vercel', group: 'tools', tier: 'familiar' },
  { id: 'postman', label: 'Postman / Thunder Client', group: 'tools', tier: 'proficient' },
  { id: 'vscode', label: 'Visual Studio / VS Code', group: 'tools', tier: 'core' },
]

