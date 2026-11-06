import type { Stat } from './types.ts'

export const profile = {
  headline: 'I build reliable back-office systems by day and fast, search-friendly web apps for clients.',
  bio: [
    'I’m a software developer with 4+ years building financial back-office and reporting systems on .NET and Microsoft SQL Server at Euronet Worldwide. Alongside that, I build full-stack web apps with Vue.js and Node.js — from client websites to a complete project-management workspace.',
    'AI coding agents are part of my daily workflow. I use Claude Code and OpenAI Codex to plan, implement, test and document features, while I own the architecture, code review and quality gates.',
    'A passion for gaming since childhood fuels the curiosity, creativity and problem-solving I bring to every project.',
  ],
  stats: [
    { value: 4, suffix: '+', label: 'years in production' },
    { value: 3, suffix: '', label: 'live client sites' },
    { value: 10, suffix: '', label: 'projects built' },
    { value: 2, suffix: '', label: 'AI agents in the daily workflow' },
  ] satisfies Stat[],
  interests: ['Software Engineering', 'AI-assisted Development', 'Gaming', 'Fitness'],
  languages: ['Serbian — Native', 'English — Fluent'],
  location: 'Belgrade, Serbia',
  portraitAlt: 'Portrait of Miloš Milinkov',
}
