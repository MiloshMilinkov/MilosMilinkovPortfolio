import { createApp, createSSRApp, type App, type Component } from 'vue'

/**
 * Single place where the Vue app is created, so the server render (prerender)
 * and the browser hydration register exactly the same plugins and directives.
 * `ssr: true` → createSSRApp (prerender + hydration); `false` → plain client
 * mount for the Vite dev server, where the page has no prerendered markup.
 */
export function createPortfolioApp(root: Component, { ssr }: { ssr: boolean }): App {
  return ssr ? createSSRApp(root) : createApp(root)
}
