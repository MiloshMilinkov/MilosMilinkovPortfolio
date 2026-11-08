import type { Stat } from './types.ts'

/** Numbers behind the hero stat tiles; their labels live in the language files (hero.stats). */
export const profile = {
  stats: [
    { id: 'years', value: 4, suffix: '+' },
    { id: 'projects', value: 10, suffix: '' },
    { id: 'pagespeed', value: 100, suffix: '' },
  ] satisfies Stat[],
}
