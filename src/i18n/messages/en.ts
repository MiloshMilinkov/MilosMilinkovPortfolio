import type { Education, Role } from '../../data/types.ts'

/** Per-project copy, keyed by project id (src/data/projects.ts). */
export interface ProjectText {
  kind: string
  summary: string
  highlights: string[]
  /** Overrides the project's year when it needs words (e.g. "2022 — present"). */
  year?: string
}

/**
 * English copy. This object defines the shape every language must match
 * (`Messages` below); sr.ts and ru.ts are checked against it.
 */
export const en = {
  meta: {
    title: 'Miloš Milinkov — Websites & Web Apps for Businesses',
    description:
      'Miloš Milinkov builds fast, search-friendly websites and web apps for businesses: designed, developed and hosted from Belgrade, Serbia.',
    ogImageAlt: 'Miloš Milinkov — fast, modern websites and web apps for businesses',
    jobTitle: 'Full-stack web developer',
  },
  a11y: {
    skip: 'Skip to content',
    newTab: '(opens in a new tab)',
    toTop: 'Miloš Milinkov — back to top',
  },
  header: {
    menu: 'Menu',
    cta: 'Start a project',
    languages: 'Language',
  },
  nav: {
    services: 'Services',
    projects: 'Work',
    process: 'Process',
    hosting: 'Hosting',
    about: 'About',
    contact: 'Contact',
  },
  hero: {
    pill: 'Websites and web apps for businesses',
    headline: 'Fast, modern websites that bring you clients.',
    lead: 'I’m Miloš, a full-stack developer in Belgrade. I design, build and host websites and web apps for businesses: quick on every phone, easy to find on Google, and looked after once they launch.',
    primary: 'Start a project',
    secondary: 'See my work',
    roleLine: 'Full-stack web developer in Belgrade',
    portraitAlt: 'Portrait of Miloš Milinkov',
    liveValue: (n: number) => `${n} client sites live`,
    liveText: 'A law office and a fitness coach, both built, launched and maintained by me.',
    statsLabel: 'At a glance',
    stats: {
      years: 'years in production',
      projects: 'projects built',
      pagespeed: 'PageSpeed score on this site (mobile)',
    },
  },
  services: {
    title: 'What I can build for you',
    lede: 'From a first business website to a custom web app, designed, built and hosted by one developer who answers your emails.',
    includesLabel: (title: string) => `${title} includes`,
    items: {
      websites: {
        title: 'Business websites',
        summary: 'A fast, mobile-first site that explains what you do and makes it easy for customers to get in touch.',
        includes: ['Custom design for your brand', 'Mobile-first layout', 'On-page SEO and sitemap', 'Contact and booking links'],
      },
      'web-apps': {
        title: 'Web apps and dashboards',
        summary: 'Custom tools for your business: client portals, admin panels, internal dashboards and workflows.',
        includes: ['Fast, responsive interface', 'Secure server and API', 'Reliable database', 'Logins and user roles'],
      },
      content: {
        title: 'Content you can edit',
        summary: 'Publish articles and update pages yourself through a simple admin editor with a live preview.',
        includes: ['Simple admin editor', 'Articles with images', 'Per-page SEO tags', 'Images optimised for speed'],
      },
      care: {
        title: 'Hosting, speed and care',
        summary: 'Deployment, domain and SSL, security headers and ongoing updates, so the site stays fast and online.',
        includes: ['Fast global hosting', 'Custom domain and SSL', 'Security best practices', 'Updates and fixes'],
      },
    },
    ctaText: 'Not sure what you need? Describe your business and I’ll suggest the simplest option, with a free quote.',
    ctaButton: 'Get a free quote',
  },
  projects: {
    title: 'Selected work',
    lede: 'Client sites and concept sites you can visit today, plus apps and systems I’ve built. Live sites open in a new tab; projects that aren’t hosted link to their source code.',
    archiveTitle: 'More on GitHub',
    status: { live: 'Live', source: 'Source only', classified: 'Classified' },
    links: {
      visit: 'Visit live site',
      source: 'Source',
      viewSource: 'View source on GitHub',
      noteSource: 'Not publicly hosted — view the source on GitHub.',
      noteClassified: 'Proprietary system under NDA — details on request.',
    },
    screenshotAlt: (title: string) => `Screenshot of the ${title} website`,
    items: {
      'advokat-vladic': {
        kind: 'Law office website',
        summary: 'A fast law office website with a blog the office runs itself, and search-friendly tags on every page.',
        highlights: [
          'Admin blog editor with a live preview.',
          '11 existing articles moved into the new site.',
          'Sitemap and per-page SEO for practice areas and articles.',
        ],
      },
      arizonalifts: {
        kind: 'Fitness coach website',
        summary: 'Website for fitness trainer @arizonalifts, which I develop, host and maintain.',
        highlights: [
          'Fast, mobile-first single-page site on the client’s own domain.',
          'Ongoing development and maintenance for the client.',
        ],
      },
      'little-fern-coffee': {
        kind: 'Concept site for a neighbourhood coffee bar',
        summary:
          'A showcase site for a made-up coffee bar, built to show local businesses what their website could look like.',
        highlights: [
          'Live “open now / closed” badge based on Belgrade time.',
          'Chalkboard menu with tabs for coffee, other drinks and pastries.',
          'Opening hours with today highlighted, an events list and an illustrated map.',
          'Lightweight pages that load almost instantly on any phone.',
        ],
      },
      'mabels-chair': {
        kind: 'Concept site for a hair studio and barber',
        summary:
          'A showcase site for a made-up hair studio and barber, built to show local businesses what their website could look like.',
        highlights: [
          'Lit vanity-mirror hero with a live “open now / closed” badge.',
          'Price list, gallery of recent work, team and reviews.',
          'Booking request form beside the address and opening hours (demo: nothing is sent).',
          'Lightweight pages that load almost instantly on any phone.',
        ],
      },
      'lovely-layers': {
        kind: 'Concept site for a cake bakery',
        summary:
          'A showcase site for a made-up cake bakery, built to show local businesses what their website could look like.',
        highlights: [
          'Cake builder: pick flavour, size, frosting, decorations and writing, with a live drawing, a cut slice and the price.',
          'Every cake is drawn in the browser, so there are no photos to load.',
          'Order request form, reviews and opening hours with a live “open now / closed” badge (demo: nothing is sent).',
          'Lightweight pages that load almost instantly on any phone.',
        ],
      },
      projectanvil: {
        kind: 'Project, task & knowledge workspace',
        summary:
          'An installable, offline-capable workspace for projects, tasks, notes, canvases, a relationship graph and decision records.',
        highlights: [
          'Team workspaces with Viewer / Editor / Admin roles, live collaborative editing, mentions and notifications.',
          'Recurring tasks with time-zone-aware reminders, bulk editing, and saved board, list and timeline views.',
          'Security hardening, verified backups with rollback, and automated tests across all major browsers.',
          'Built with an AI-assisted workflow: I set the architecture, standards and docs; AI agents implemented under my review.',
        ],
      },
      euronet: {
        kind: 'Internal systems at Euronet Worldwide',
        year: '2022 — present',
        summary: 'Automated invoicing, payment tracking and email reporting for finance and accounting teams.',
        highlights: [
          'Automated invoice generation and payment tracking.',
          'Automated DCC email reports, with the report logic kept in the database.',
          'Data pipelines that move and transform data between internal and external systems.',
          'Streamlined financial operations and more accurate, timely reporting for decision-making.',
        ],
      },
      'silicon-lottery': {
        kind: 'E-commerce web app (BSc thesis)',
        summary: 'An online store for computer components, built as my final-year thesis.',
        highlights: ['Separate back end and front end, with a layered architecture.', 'Runs in containers for a one-command setup.'],
      },
    } satisfies Record<string, ProjectText> as Record<string, ProjectText>,
  },
  process: {
    title: 'How we’ll work together',
    lede: 'Four clear steps, with you involved at every one. No surprises on scope or price.',
    steps: [
      { title: 'Brief', text: 'A short call or email about your goals, pages and deadline. You get a clear, free quote.' },
      { title: 'Design', text: 'A layout and look that fit your brand, reviewed with you before any code is written.' },
      { title: 'Build', text: 'Fast, accessible pages, tested on phones and desktops, with SEO set up from the start.' },
      { title: 'Launch and care', text: 'Hosting, domain and analytics set up. I stay on for updates, fixes and new features.' },
    ],
  },
  hosting: {
    title: 'Hosting, in your own account',
    lede: 'Your website lives in a Cloudflare account that belongs to you, not to me. Setting it up takes about 10 minutes, and you never share a password.',
    reasons: [
      { title: 'You own it', text: 'Your website, domain and data stay in your account.' },
      {
        title: 'You control the costs',
        text: 'Cloudflare is free for most small websites. If you ever upgrade to a paid plan, the bill goes to you.',
      },
      {
        title: 'It stays secure',
        text: 'You never share your password. You invite me as a member and can remove access at any time.',
      },
    ],
    stepsTitle: 'How it works',
    steps: [
      {
        title: 'Create a free account',
        text: 'Sign up at dash.cloudflare.com/sign-up with your e-mail, confirm it, and turn on two-factor authentication.',
      },
      {
        title: 'Invite me as a member',
        text: 'In Manage account → Members, click Invite, enter my e-mail address and choose the Administrator role.',
      },
      {
        title: 'I publish your site',
        text: 'I set up the domain and publish the project into your account. You don’t need to do anything else, or have a GitHub account.',
      },
      {
        title: 'You stay in control',
        text: 'Billing and members stay with you only, and you can remove my access at any time. Your website stays in your account.',
      },
    ],
    neverTitle: 'Never send anyone',
    never: [
      'Your Cloudflare password',
      'Codes from your two-factor authentication app',
      'Bank card details by e-mail or chat (you enter them yourself, under Billing)',
      'Your “Global API Key”',
    ],
    costsTitle: 'Costs',
    costs:
      'The free plan is enough for most small websites. If yours outgrows it, I’ll tell you and you decide whether to upgrade: paid plans start at around 5 USD a month (prices may change).',
    guideTitle: 'Step-by-step guide',
    guideText: 'A two-page PDF with every click, to keep or forward to whoever manages your accounts.',
    guideButton: 'Download the guide (PDF)',
    guideOther: 'Also available in:',
  },
  about: {
    title: 'About me',
    bio: [
      'I’m a software developer with 4+ years building financial back-office and reporting systems at Euronet Worldwide. Alongside that, I build websites and web apps for businesses, from small-business sites to a complete project-management workspace.',
      'A passion for gaming since childhood fuels the curiosity, creativity and problem-solving I bring to every project.',
    ],
    factsLabel: 'Quick facts',
    basedIn: 'Based in',
    location: 'Belgrade, Serbia',
    languagesTitle: 'Languages',
    languages: ['Serbian — Native', 'English — Fluent'],
    interestsTitle: 'Interests',
    interests: ['Software Engineering', 'AI-assisted Development', 'Gaming', 'Fitness'],
  },
  skills: {
    title: 'How I work and what I use',
    lede: 'AI coding agents are part of my daily workflow. I use Claude Code and OpenAI Codex to plan, implement, test and document features, while I own the architecture, code review and quality gates.',
    tablistLabel: 'Skill groups',
    groups: {
      backend: { label: 'Backend', blurb: 'C# and .NET in production since 2022; Node.js and Express for full-stack projects.' },
      frontend: {
        label: 'Frontend',
        blurb: 'Vue 3 + Vite is my default for client sites and apps, with TypeScript where it pays off.',
      },
      data: {
        label: 'Data',
        blurb: 'Stored procedures, query tuning and SSIS pipelines that move financial data between systems.',
      },
      ai: {
        label: 'AI',
        blurb: 'Agents plan, implement, test and document under my review — I own architecture and quality gates.',
      },
      tools: {
        label: 'Tools',
        blurb: 'Version control, containers, browser testing and edge hosting for shipping with confidence.',
      },
    },
    tiers: { core: 'Core', proficient: 'Proficient', familiar: 'Familiar' },
    usedIn: (n: number) => `Used in ${n} project${n === 1 ? '' : 's'}`,
    readoutIn: 'in these projects:',
    readoutNone: 'is part of my everyday work rather than one listed project.',
    hint: 'Pick a tool to see which of my projects use it.',
  },
  experience: {
    title: 'Experience',
    lede: 'Most recent first. Open an entry for the details.',
    roles: [
      {
        title: 'Software Application Developer',
        org: 'Euronet Worldwide',
        place: 'Belgrade',
        period: '2022 — present',
        points: [
          {
            label: 'Financial back-office',
            text: 'Build and maintain a system that automates invoice generation and payment tracking.',
          },
          {
            label: 'DCC reporting',
            text: 'Built an automated email reporting solution for finance and accounting teams, with all report logic in complex stored procedures.',
          },
          {
            label: 'Data integration',
            text: 'Design data pipelines that move and transform data between internal and external systems.',
          },
          {
            label: 'Database optimization',
            text: 'Write, tune and deploy advanced stored procedures, applying SQL best practices for data integrity, speed and scalability.',
          },
          {
            text: 'Generate financial reports and work with cross-functional teams to align features with business needs.',
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
            text: 'Designed and taught beginner programming and game-development courses for children of different ages.',
          },
          {
            label: 'Teaching & content',
            text: 'Adapted methods to each group’s level and kept course materials current with programming trends.',
          },
          { label: 'Mentorship', text: 'Trained and mentored new educators.' },
        ],
      },
    ] as Role[],
    education: [
      {
        degree: 'Bachelor of Science in Computer Science',
        school: 'Visoka škola elektrotehnike i računarstva',
        place: 'Belgrade',
        period: '2019 — 2023',
        points: [
          'Specialisation in object-oriented programming, with balanced back-end and front-end work.',
          'Final thesis “Silicon Lottery”: a full-stack e-commerce app for computer components.',
        ],
      },
    ] as Education[],
  },
  contact: {
    title: 'Have a project in mind?',
    lede: 'Tell me about your business and what the site should do. I’ll reply with ideas and a free quote.',
    emailButton: 'Email me about a project',
    copyButton: 'Copy email',
    copyAria: 'Copy email address',
    copied: 'Email address copied',
    copyFailed: (email: string) => `Copy failed — the address is ${email}`,
    mailSubject: 'New website project',
    labels: { email: 'Email', linkedin: 'LinkedIn', github: 'GitHub', location: 'Location' },
  },
  footer: {
    built: 'Designed, built and hosted by me.',
    source: 'Source on GitHub',
    top: 'Back to top',
  },
}

export type Messages = typeof en
