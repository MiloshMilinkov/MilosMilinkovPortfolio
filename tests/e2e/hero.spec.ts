import { expect, test, type Page } from '@playwright/test'
import { site } from '../../src/data/site'

const snapshot = (page: Page) => page.locator('#top canvas').evaluate((c: HTMLCanvasElement) => c.toDataURL())

test('hero introduces the owner with clear next steps', async ({ page }) => {
  await page.goto('/')
  const hero = page.locator('#top')
  await expect(hero.getByRole('heading', { level: 1 })).toHaveText(/Miloš\s+Milinkov/)
  await expect(hero).toContainText(site.roleLine)
  await expect(hero.getByRole('link', { name: 'View projects' })).toHaveAttribute('href', '#projects')
  await expect(hero.getByRole('link', { name: 'Contact', exact: true })).toHaveAttribute('href', '#contact')
})

test('portrait is described, sized and prioritised', async ({ page }) => {
  await page.goto('/')
  const img = page.locator('#top img')
  await expect(img).toHaveAttribute('alt', /Miloš Milinkov/)
  await expect(img).toHaveAttribute('width', /\d+/)
  await expect(img).toHaveAttribute('height', /\d+/)
  await expect(img).toHaveAttribute('fetchpriority', 'high')
})

test('warp canvas is decorative and animates', async ({ page }) => {
  await page.goto('/')
  const canvas = page.locator('#top canvas')
  await expect(canvas).toHaveAttribute('aria-hidden', 'true')
  const a = await snapshot(page)
  // Poll rather than sleep: under parallel load a browser may paint frames late.
  await expect.poll(() => snapshot(page), { timeout: 5000 }).not.toBe(a)
})

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' })

  test('text is fully visible at once and the canvas holds still', async ({ page }) => {
    await page.goto('/')
    const opacities = await page.evaluate(() =>
      [...document.querySelectorAll('h1, h2, .boot__line')].map((el) => getComputedStyle(el).opacity),
    )
    expect(opacities.length).toBeGreaterThan(3)
    expect(new Set(opacities)).toEqual(new Set(['1']))
    const clips = await page.evaluate(() =>
      [...document.querySelectorAll('.boot__line')].map((el) => getComputedStyle(el).clipPath),
    )
    for (const clip of clips) expect(clip === 'none' || clip === 'inset(0px)').toBe(true)

    // Let fonts and images settle first: a layout change legitimately redraws the still frame.
    await page.waitForLoadState('networkidle')
    await page.evaluate(() => document.fonts.ready)
    await page.waitForTimeout(200)
    const a = await snapshot(page)
    await page.waitForTimeout(500)
    expect(await snapshot(page)).toBe(a)
  })
})

test('Serbian diacritics load the theme fonts, not a fallback', async ({ page }) => {
  await page.goto('/')
  const faces = await page.evaluate(async () => {
    await document.fonts.ready
    const display = await document.fonts.load('700 32px "Grenze Gotisch"', 'Miloš Vladić')
    const body = await document.fonts.load('16px "IBM Plex Sans"', 'Visoka škola računarstva')
    return { display: display.length, body: body.length }
  })
  // Both the latin and the latin-ext face must be used for each string.
  expect(faces.display).toBe(2)
  expect(faces.body).toBe(2)
})

test('page loads without console errors or warnings', async ({ page }) => {
  const problems: string[] = []
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning') problems.push(`${m.type()}: ${m.text()}`)
  })
  page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`))
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  expect(problems).toEqual([])
})
