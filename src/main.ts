/*
 * Miloš Milinkov — Portfolio
 * Copyright (c) 2026 Miloš Milinkov. All rights reserved.
 * Proprietary and confidential. Use, copying, modification or distribution
 * without written permission is prohibited. See the LICENSE file.
 */
import App from './App.vue'
import { createPortfolioApp } from './app'

// Progressive enhancement hook: "hidden until revealed" styles apply only under html.js.
document.documentElement.classList.add('js')

// Production HTML is prerendered, so hydrate it; the dev server serves an empty shell.
createPortfolioApp(App, { ssr: !import.meta.env.DEV }).mount('#app')
