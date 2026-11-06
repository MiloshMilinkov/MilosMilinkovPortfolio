/** In-page sections, in page order. `top` is the hero (not in the nav). */
export const SECTION_IDS = ['top', 'about', 'skills', 'experience', 'projects', 'contact'] as const

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const
