import type { Stat } from './types.ts'

export const profile = {
  headline: 'Fast, modern websites that bring you clients.',
  heroLead:
    'I’m Miloš, a full-stack developer in Belgrade. I design, build and host websites and web apps for businesses: quick on every phone, easy to find on Google, and looked after once they launch.',
  bio: [
    'I’m a software developer with 4+ years building financial back-office and reporting systems on .NET and Microsoft SQL Server at Euronet Worldwide. Alongside that, I build full-stack web apps with Vue.js and Node.js — from client websites to a complete project-management workspace.',
    'AI coding agents are part of my daily workflow. I use Claude Code and OpenAI Codex to plan, implement, test and document features, while I own the architecture, code review and quality gates.',
    'A passion for gaming since childhood fuels the curiosity, creativity and problem-solving I bring to every project.',
  ],
  stats: [
    { value: 4, suffix: '+', label: 'years in production' },
    { value: 2, suffix: '', label: 'live client sites' },
    { value: 10, suffix: '', label: 'projects built' },
    { value: 2, suffix: '', label: 'AI agents in the daily workflow' },
  ] satisfies Stat[],
  interests: ['Software Engineering', 'AI-assisted Development', 'Gaming', 'Fitness'],
  languages: ['Serbian — Native', 'English — Fluent'],
  location: 'Belgrade, Serbia',
  portraitAlt: 'Portrait of Miloš Milinkov',
}
