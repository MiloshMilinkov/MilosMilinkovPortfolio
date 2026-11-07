import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']

async function audit(page: Page) {
  const { violations } = await new AxeBuilder({ page }).withTags(TAGS).analyze()
  // Readable failure output: rule id, impact and the offending selectors.
  return violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.map((n) => n.target.join(' ')).join(' | ')}`)
}

test('home page has no WCAG A/AA violations', async ({ page }) => {
  await page.goto('/')
  for (const id of ['about', 'skills', 'experience', 'projects', 'contact']) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded()
  }
  await page.waitForTimeout(1500) // let count-ups and transitions finish
  expect(await audit(page)).toEqual([])
})

test('interactive states have no violations (skill selected, filter on, entries open)', async ({ page }) => {
  await page.goto('/')
  const skills = page.locator('#skills')
  await skills.getByRole('tab', { name: 'Frontend' }).click()
  await skills.getByRole('button', { name: /Vue\.js/ }).click()
  await page.locator('#projects').getByRole('button', { name: 'C#', exact: true }).click()
  await page.locator('#experience summary').nth(1).click()
  await page.waitForTimeout(400)
  expect(await audit(page)).toEqual([])
})

test.describe('mobile', () => {
  test.use({ viewport: { width: 375, height: 740 } })

  test('open mobile menu has no violations', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Menu' }).click()
    expect(await audit(page)).toEqual([])
  })
})

test('404 page has no violations', async ({ page }) => {
  await page.goto('/missing-page')
  expect(await audit(page)).toEqual([])
})
