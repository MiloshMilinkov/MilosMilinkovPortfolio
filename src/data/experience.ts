import type { Education, Role } from './types.ts'

export const roles: Role[] = [
  {
    title: 'Software Application Developer',
    org: 'Euronet Worldwide',
    place: 'Belgrade',
    period: '2022 — present',
    points: [
      {
        label: 'Financial back-office',
        text: 'Build and maintain a system that automates invoice generation and payment tracking (.NET, Microsoft SQL Server).',
      },
      {
        label: 'DCC reporting',
        text: 'Built an automated email reporting solution for finance and accounting teams, with all report logic in complex stored procedures.',
      },
      {
        label: 'Data integration',
        text: 'Design SSIS packages that move and transform data between internal and external systems.',
      },
      {
        label: 'Database optimization',
        text: 'Write, tune and deploy advanced stored procedures, applying SQL best practices for data integrity, speed and scalability.',
      },
      {
        text: 'Generate financial reports with .NET Framework libraries and work with cross-functional teams to align features with business needs.',
      },
    ],
  },
  {
    title: 'Freelance Web Developer',
    org: 'Independent',
    place: 'Belgrade',
    period: '2024 — present',
    points: [
      {
        text: 'Deliver websites for small businesses — a law office, a construction company and a fitness coach — owning requirements, implementation, SEO, deployment and maintenance.',
      },
      { text: 'Use AI coding agents to speed up delivery while keeping code reviewed, tested and documented.' },
    ],
  },
  {
    title: 'Programming Educator',
    org: 'Kliker IT Center for Children',
    place: 'Belgrade',
    period: '2021 — 2023',
    points: [
      {
        label: 'Courses',
        text: 'Designed and taught beginner courses in C#, Python and Unity game development for children of different ages.',
      },
      {
        label: 'Teaching & content',
        text: 'Adapted methods to each group’s level and kept course materials current with programming trends.',
      },
      { label: 'Mentorship', text: 'Trained and mentored new educators.' },
    ],
  },
]

export const education: Education[] = [
  {
    degree: 'Bachelor of Science in Computer Science',
    school: 'Visoka škola elektrotehnike i računarstva',
    place: 'Belgrade',
    period: '2019 — 2023',
    points: [
      'Specialization in object-oriented programming with a strong emphasis on .NET, plus front-end frameworks.',
      'Final thesis “Silicon Lottery”: a full-stack e-commerce app with a .NET Web API backend and an Angular frontend.',
    ],
  },
]
