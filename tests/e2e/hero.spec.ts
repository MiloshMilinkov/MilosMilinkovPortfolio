import { expect, test } from '@playwright/test'
import { profile } from '../../src/data/profile'
import { en } from '../../src/i18n/messages/en'

test('hero leads with the offer and clear next steps', async ({ page }) => {
  await page.goto('/')
  const hero = page.locator('#top')
  await expect(hero.getByRole('heading', { level: 1 })).toHaveText(en.hero.headline)
  await expect(hero).toContainText('Miloš Milinkov')
  await expect(hero.getByRole('link', { name: 'Start a project' })).toHaveAttribute('href', '#contact')
  await expect(hero.getByRole('link', { name: 'See my work' })).toHaveAttribute('href', '#projects')
})

test('portrait is described, sized and prioritised', async ({ page }) => {
  await page.goto('/')
  const img = page.locator('#top img')
  await expect(img).toHaveAttribute('alt', /Miloš Milinkov/)
  await expect(img).toHaveAttribute('width', /\d+/)
  await expect(img).toHaveAttribute('height', /\d+/)
  await expect(img).toHaveAttribute('fetchpriority', 'high')
})

test('stats count up to their final values', async ({ page }) => {
  await page.goto('/')
  await page.locator('#top .hero__stats').scrollIntoViewIfNeeded()
  const expected = profile.stats.map((s) => `${s.value}${s.suffix}`)
  await expect(page.locator('#top .stat__value')).toHaveText(expected, { timeout: 4000 })
})

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' })

  test('headings are visible and in place at once', async ({ page }) => {
    await page.goto('/')
    const styles = await page.evaluate(() =>
      [...document.querySelectorAll('h1, h2')].map((el) => {
        const cs = getComputedStyle(el)
        return `${cs.opacity}|${cs.animationName}`
      }),
    )
    expect(styles.length).toBeGreaterThan(5)
    for (const s of styles) expect(s).toBe('1|none')
  })
})

test('Serbian diacritics load the theme font, not a fallback', async ({ page }) => {
  await page.goto('/')
  const faces = await page.evaluate(async () => {
    await document.fonts.ready
    return (await document.fonts.load('600 32px "Geist"', 'Miloš Vladić računarstva')).length
  })
  // Both the latin and the latin-ext face must be used.
  expect(faces).toBe(2)
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
