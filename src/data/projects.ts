import type { Project } from './types.ts'

// Text (kind, summary, highlights) lives in the language files (projects.items).

const gh = (repo: string) => `https://github.com/MiloshMilinkov/${repo}`

export const projects: Project[] = [
  {
    id: 'advokat-vladic',
    title: 'Advokatska kancelarija Vladić',
    year: '2026',
    tech: ['vue', 'typescript', 'vite', 'cloudflare', 'sqlite', 'claude-code'],
    status: 'live',
    liveUrl: 'https://advokat-vladic.milos300399.workers.dev/',
    repoUrl: gh('advokat-vladic'),
    featured: true,
    image: 'advokat-vladic',
  },
  {
    id: 'arizonalifts',
    title: 'ARIZONALIFTS',
    tech: ['vue', 'vite', 'javascript', 'cloudflare'],
    status: 'live',
    liveUrl: 'https://arizonalifts.com',
    repoUrl: gh('ArizonaLiftsWebSite'),
    featured: true,
    image: 'arizonalifts',
  },
  {
    id: 'little-fern-coffee',
    title: 'Little Fern Coffee',
    year: '2026',
    tech: ['htmlcss', 'javascript', 'cloudflare'],
    status: 'live',
    liveUrl: 'https://little-fern-coffee.milos300399.workers.dev/',
    repoUrl: gh('little-fern-coffee'),
    featured: true,
    concept: true,
    image: 'little-fern-coffee',
  },
  {
    id: 'mabels-chair',
    title: 'Mabel’s Chair',
    year: '2026',
    tech: ['htmlcss', 'javascript', 'cloudflare'],
    status: 'live',
    liveUrl: 'https://mabels-chair.milos300399.workers.dev/',
    repoUrl: gh('mabels-chair'),
    featured: true,
    concept: true,
    image: 'mabels-chair',
  },
  {
    id: 'projectanvil',
    title: 'ProjectAnvil',
    year: '2026',
    tech: ['typescript', 'react', 'vite', 'playwright', 'codex'],
    status: 'source',
    repoUrl: gh('ProjectAnvil'),
    featured: true,
  },
  {
    id: 'euronet',
    title: 'Financial Back-Office & DCC Reporting',
    tech: ['dotnet', 'csharp', 'mssql', 'ssis'],
    status: 'classified',
    featured: true,
  },
  {
    id: 'silicon-lottery',
    title: 'Silicon Lottery',
    year: '2023',
    tech: ['aspnet', 'csharp', 'angular', 'mssql', 'sqlite', 'docker'],
    status: 'source',
    repoUrl: gh('SiliconLottery_Extended'),
    featured: true,
  },
]
