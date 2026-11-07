/** In-page sections, in page order. `top` is the hero (not in the nav). */
export const SECTION_IDS = ['top', 'services', 'projects', 'process', 'about', 'skills', 'experience', 'contact'] as const

export const navLinks = [
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Work' },
  { id: 'process', label: 'Process' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
] as const
