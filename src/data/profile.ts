import type { Stat } from './types.ts'

export const profile = {
  headline: 'Fast, modern websites that bring you clients.',
  heroLead:
    'I’m Miloš, a full-stack developer in Belgrade. I design, build and host websites and web apps for businesses: quick on every phone, easy to find on Google, and looked after once they launch.',
  bio: [
    'I’m a software developer with 4+ years building financial back-office and reporting systems at Euronet Worldwide. Alongside that, I build websites and web apps for businesses, from small-business sites to a complete project-management workspace.',
    'A passion for gaming since childhood fuels the curiosity, creativity and problem-solving I bring to every project.',
  ],
  workflow:
    'AI coding agents are part of my daily workflow. I use Claude Code and OpenAI Codex to plan, implement, test and document features, while I own the architecture, code review and quality gates.',
  stats: [
    { value: 4, suffix: '+', label: 'years in production' },
    { value: 10, suffix: '', label: 'projects built' },
    { value: 100, suffix: '', label: 'PageSpeed score on this site (mobile)' },
  ] satisfies Stat[],
  interests: ['Software Engineering', 'AI-assisted Development', 'Gaming', 'Fitness'],
  languages: ['Serbian — Native', 'English — Fluent'],
  location: 'Belgrade, Serbia',
  portraitAlt: 'Portrait of Miloš Milinkov',
}
