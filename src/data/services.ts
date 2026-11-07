import type { IconName } from '../components/ui/icons.ts'

export interface Service {
  id: string
  icon: IconName
  title: string
  summary: string
  includes: string[]
}

export interface Step {
  title: string
  text: string
}

export const services: Service[] = [
  {
    id: 'websites',
    icon: 'globe',
    title: 'Business websites',
    summary: 'A fast, mobile-first site that explains what you do and makes it easy for customers to get in touch.',
    includes: ['Custom design for your brand', 'Mobile-first layout', 'On-page SEO and sitemap', 'Contact and booking links'],
  },
  {
    id: 'web-apps',
    icon: 'layers',
    title: 'Web apps and dashboards',
    summary: 'Custom tools for your business: client portals, admin panels, internal dashboards and workflows.',
    includes: ['Fast, responsive interface', 'Secure server and API', 'Reliable database', 'Logins and user roles'],
  },
  {
    id: 'content',
    icon: 'edit',
    title: 'Content you can edit',
    summary: 'Publish articles and update pages yourself through a simple admin editor with a live preview.',
    includes: ['Simple admin editor', 'Articles with images', 'Per-page SEO tags', 'Images optimised for speed'],
  },
  {
    id: 'care',
    icon: 'shield',
    title: 'Hosting, speed and care',
    summary: 'Deployment, domain and SSL, security headers and ongoing updates, so the site stays fast and online.',
    includes: ['Fast global hosting', 'Custom domain and SSL', 'Security best practices', 'Updates and fixes'],
  },
]

export const steps: Step[] = [
  {
    title: 'Brief',
    text: 'A short call or email about your goals, pages and deadline. You get a clear, free quote.',
  },
  {
    title: 'Design',
    text: 'A layout and look that fit your brand, reviewed with you before any code is written.',
  },
  {
    title: 'Build',
    text: 'Fast, accessible pages, tested on phones and desktops, with SEO set up from the start.',
  },
  {
    title: 'Launch and care',
    text: 'Hosting, domain and analytics set up. I stay on for updates, fixes and new features.',
  },
]
