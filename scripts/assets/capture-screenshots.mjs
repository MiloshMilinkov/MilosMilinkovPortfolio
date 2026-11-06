// Captures the live client sites at 1280×800 and writes AVIF/WebP variants
// to public/images/projects/<id>-<width>.<ext>. Usage: node scripts/assets/capture-screenshots.mjs
import path from 'node:path'
import { chromium } from '@playwright/test'
import { projects } from '../../src/data/projects.ts'
import { publicDir, writeVariants } from './lib.mjs'

const targets = projects.filter((p) => p.status === 'live' && p.liveUrl && p.image)

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 })

for (const p of targets) {
  await page.goto(p.liveUrl, { waitUntil: 'networkidle', timeout: 60_000 })
  await page.waitForTimeout(1500) // let entrance animations settle
  const png = await page.screenshot({ type: 'png' })
  const written = await writeVariants(png, path.join(publicDir, 'images', 'projects', p.image), [640, 960, 1280])
  console.log(`${p.id}: ${written.join(', ')}`)
}

await browser.close()
