/*
 * Miloš Milinkov — Portfolio
 * Copyright (c) 2026 Miloš Milinkov. All rights reserved.
 * Proprietary and confidential. Use, copying, modification or distribution
 * without written permission is prohibited. See the LICENSE file.
 */
import type { Component } from 'vue'
import { renderToString } from 'vue/server-renderer'
import App from './App.vue'
import NotFound from './NotFound.vue'
import { createPortfolioApp } from './app'

export type Page = 'home' | '404'

const pages: Record<Page, Component> = { home: App, '404': NotFound }

/** Renders a page to HTML at build time (see scripts/prerender.mjs). */
export async function render(page: Page): Promise<string> {
  return renderToString(createPortfolioApp(pages[page], { ssr: true }))
}
