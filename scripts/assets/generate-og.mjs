// Renders scripts/assets/og-template.html once per language:
// public/og-image.png (English) and public/og-image-<locale>.png. Usage: node scripts/assets/generate-og.mjs
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { chromium } from '@playwright/test'
import { site } from '../../src/data/site.ts'
import { LOCALES, messages } from '../../src/i18n/index.ts'
import { publicDir, root } from './lib.mjs'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
await page.goto(pathToFileURL(path.join(root, 'scripts', 'assets', 'og-template.html')).href)

for (const locale of LOCALES) {
  const t = messages[locale]
  await page.evaluate(
    ({ pill, headline, role }) => {
      document.documentElement.lang = role.lang
      document.getElementById('pill').textContent = pill
      document.getElementById('headline').textContent = headline
      document.getElementById('role').textContent = role.text
    },
    { pill: t.hero.pill, headline: t.hero.headline, role: { text: `${site.name} · ${t.hero.roleLine}`, lang: locale } },
  )
  await page.evaluate(() => document.fonts.ready)
  const file = site.ogImage(locale).slice(1)
  await page.screenshot({ path: path.join(publicDir, file), type: 'png' })
  console.log(`public/${file} 1200×630`)
}
await browser.close()
