/** Service order (each has its own illustration); titles and copy live in the language files (services.items). */
export const services = ['websites', 'web-apps', 'content', 'care'] as const

export type ServiceId = (typeof services)[number]
