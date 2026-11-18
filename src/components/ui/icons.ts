/** Minimal line icons (24×24, stroke = currentColor). Paths are original. */
export const icons = {
  edit: 'M4 20h4L19 9l-4-4L4 16v4Zm9-13 4 4',
  shield: 'M12 3 4.5 6v5.5c0 4.6 3.1 8.2 7.5 9.5 4.4-1.3 7.5-4.9 7.5-9.5V6L12 3Zm-3.2 9.2 2.3 2.3 4.2-4.6',
  code: 'M8.5 7 3.5 12l5 5m7-10 5 5-5 5',
  rocket: 'M14 4c3.5 0 6 2.5 6 6-1.6 3-4.4 5.5-8 7l-5-5c1.5-3.6 4-6.4 7-8Zm-7 11-3 1 1 3 3-1m6-9.5a1.5 1.5 0 1 0 0 .01',
  mail: 'M3.5 6.5h17v11h-17v-11Zm0 0 8.5 6.5 8.5-6.5',
  external: 'M14 4h6v6m0-6-9 9M18 14v5H5V6h5',
  copy: 'M9 9h10v10H9V9Zm-4 6V5h10',
  check: 'M5 12.5 9.5 17 19 7.5',
  briefcase: 'M4 8h16v11H4V8Zm5 0V5h6v3M4 13h16',
  download: 'M12 4v11m-5-5 5 5 5-5M5 20h14',
  lock: 'M7.5 11V8a4.5 4.5 0 0 1 9 0v3M5.5 11h13v9.5h-13V11Z',
  spark: 'M12 3v4m0 10v4M3 12h4m10 0h4M6 6l2.5 2.5m7 7L18 18M18 6l-2.5 2.5m-7 7L6 18',
} as const

export type IconName = keyof typeof icons
