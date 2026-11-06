// Renders scripts/assets/og-template.html to public/og-image.png (1200×630).
// Usage: node scripts/assets/generate-og.mjs
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { chromium } from '@playwright/test'
import { publicDir, root } from './lib.mjs'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
await page.goto(pathToFileURL(path.join(root, 'scripts', 'assets', 'og-template.html')).href)
await page.evaluate(() => document.fonts.ready)
await page.screenshot({ path: path.join(publicDir, 'og-image.png'), type: 'png' })
await browser.close()
console.log('public/og-image.png 1200×630')
