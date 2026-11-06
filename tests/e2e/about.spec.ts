import { expect, test } from '@playwright/test'
import { profile } from '../../src/data/profile'

const finalValues = profile.stats.map((s) => `${s.value}${s.suffix}`)

test('bio and final stat values are in the prerendered HTML', async ({ request }) => {
  const html = await (await request.get('/')).text()
  const about = html.slice(html.indexOf('id="about"'))
  for (const paragraph of profile.bio) expect(about).toContain(paragraph.slice(0, 60))
  for (const s of profile.stats) expect(about).toMatch(new RegExp(`<data[^>]*value="${s.value}"`))
})

test('stats count up to their final values once in view', async ({ page }) => {
  await page.goto('/')
  await page.locator('#about').scrollIntoViewIfNeeded()
  await page.waitForTimeout(1600)
  await expect(page.locator('#about .stat__value')).toHaveText(finalValues)
  for (const s of profile.stats) await expect(page.locator('#about')).toContainText(s.label)
})

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' })
  test('stats show final values without counting', async ({ page }) => {
    await page.goto('/')
    await page.locator('#about').scrollIntoViewIfNeeded()
    await expect(page.locator('#about .stat__value')).toHaveText(finalValues, { timeout: 200 })
  })
})

test('interests and languages are listed', async ({ page }) => {
  await page.goto('/')
  const about = page.locator('#about')
  for (const item of [...profile.interests, ...profile.languages]) {
    await expect(about.getByRole('listitem').filter({ hasText: item })).toHaveCount(1)
  }
})
