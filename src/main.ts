/*
 * Miloš Milinkov — Portfolio
 * Copyright (c) 2026 Miloš Milinkov. All rights reserved.
 * Proprietary and confidential. Use, copying, modification or distribution
 * without written permission is prohibited. See the LICENSE file.
 */
import './styles/index.css'
import App from './App.vue'
import { createPortfolioApp } from './app'

// Production HTML is prerendered, so hydrate it; the dev server serves an empty shell.
createPortfolioApp(App, { ssr: !import.meta.env.DEV }).mount('#app')
