import type { IconName } from '../components/ui/icons.ts'

/** Service order and icons; titles and copy live in the language files (services.items). */
export const services: { id: 'websites' | 'web-apps' | 'content' | 'care'; icon: IconName }[] = [
  { id: 'websites', icon: 'globe' },
  { id: 'web-apps', icon: 'layers' },
  { id: 'content', icon: 'edit' },
  { id: 'care', icon: 'shield' },
]
