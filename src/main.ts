/*
 * Miloš Milinkov — Portfolio
 * Copyright (c) 2026 Miloš Milinkov. All rights reserved.
 * Proprietary and confidential. Use, copying, modification or distribution
 * without written permission is prohibited. See the LICENSE file.
 */
import './styles/index.css'
import App from './App.vue'
import { createPortfolioApp } from './app'
import { localeFromHtmlLang, localeFromPath } from './i18n/index.ts'

// Production HTML is prerendered, so hydrate it; the dev server serves an empty shell.
// Each language is its own prerendered page; <html lang> says which one this is
// (the dev server has one shell for all paths, so it reads the URL instead).
const locale = import.meta.env.DEV
  ? localeFromPath(location.pathname)
  : localeFromHtmlLang(document.documentElement.lang)
createPortfolioApp(App, { ssr: !import.meta.env.DEV, locale }).mount('#app')
