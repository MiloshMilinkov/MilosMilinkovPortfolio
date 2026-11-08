import { createApp, createSSRApp, type App, type Component } from 'vue'
import { I18N_KEY, messages, type Locale } from './i18n/index.ts'

/**
 * Single place where the Vue app is created, so the server render (prerender)
 * and the browser hydration register exactly the same plugins and providers.
 * `ssr: true` → createSSRApp (prerender + hydration); `false` → plain client
 * mount for the Vite dev server, where the page has no prerendered markup.
 */
export function createPortfolioApp(root: Component, { ssr, locale }: { ssr: boolean; locale: Locale }): App {
  const app = ssr ? createSSRApp(root) : createApp(root)
  app.provide(I18N_KEY, { locale, t: messages[locale] })
  return app
}
