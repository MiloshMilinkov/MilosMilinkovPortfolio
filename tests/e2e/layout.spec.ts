import { expect, test } from '@playwright/test'
import { site } from '../../src/data/site'

const NAV: [string, string][] = [
  ['Services', 'services'],
  ['Work', 'projects'],
  ['Process', 'process'],
  ['Hosting', 'hosting'],
  ['About', 'about'],
  ['Contact', 'contact'],
]
const WEBKIT_TAB = 'WebKit (like Safari by default) does not move Tab focus to links'

test('first Tab reaches a skip link to the main content', async ({ page, browserName }) => {
  test.skip(browserName === 'webkit', WEBKIT_TAB)
  await page.goto('/')
  await page.keyboard.press('Tab')
  const skip = page.getByRole('link', { name: 'Skip to content' })
  await expect(skip).toBeFocused()
  await expect(skip).toHaveAttribute('href', '#main')
})

test.describe('desktop navigation', () => {
  test.use({ viewport: { width: 1280, height: 800 } })

  test('links to every section and marks the one in view', async ({ page }) => {
    await page.goto('/')
    const nav = page.getByRole('navigation', { name: 'Menu' })
    for (const [name, id] of NAV) {
      await expect(nav.getByRole('link', { name, exact: true })).toHaveAttribute('href', `#${id}`)
    }
    await expect(nav.getByRole('link', { name: 'Start a project' })).toHaveAttribute('href', '#contact')
    await page.locator('#projects').scrollIntoViewIfNeeded()
    await expect(nav.getByRole('link', { name: 'Work', exact: true })).toHaveAttribute('aria-current', 'true')
    await expect(nav.getByRole('link', { name: 'About', exact: true })).not.toHaveAttribute('aria-current', 'true')
  })
})

test.describe('mobile menu', () => {
  test.use({ viewport: { width: 375, height: 740 } })

  test('opens, closes with Escape and returns focus to the button', async ({ page }) => {
    await page.goto('/')
    const button = page.getByRole('button', { name: 'Menu' })
    await expect(button).toHaveAttribute('aria-expanded', 'false')
    const panelId = await button.getAttribute('aria-controls')
    expect(panelId).toBeTruthy()
    const panel = page.locator(`#${panelId}`)
    await expect(panel).toBeHidden()

    await button.click()
    await expect(button).toHaveAttribute('aria-expanded', 'true')
    await expect(panel).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(panel).toBeHidden()
    await expect(button).toBeFocused()
  })

  test('keeps Tab inside the open menu', async ({ page, browserName }) => {
    test.skip(browserName === 'webkit', WEBKIT_TAB)
    await page.goto('/')
    const button = page.getByRole('button', { name: 'Menu' })
    await button.click()
    // links + the Start a project button, then back to the menu button
    for (let i = 0; i < NAV.length + 2; i++) await page.keyboard.press('Tab')
    await expect(button).toBeFocused()
  })

  test('following a link closes the menu', async ({ page }) => {
    await page.goto('/')
    const button = page.getByRole('button', { name: 'Menu' })
    await button.click()
    await page.locator(`#${await button.getAttribute('aria-controls')}`).getByRole('link', { name: 'Work', exact: true }).click()
    await expect(button).toHaveAttribute('aria-expanded', 'false')
    await expect(page).toHaveURL(/#projects$/)
  })
})

test.describe('narrow phone', () => {
  test.use({ viewport: { width: 320, height: 640 } })

  for (const path of ['/', '/missing-page']) {
    test(`${path} has no horizontal scrolling at 320 px`, async ({ page }) => {
      await page.goto(path)
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      expect(overflow).toBeLessThanOrEqual(0)
    })
  }
})

test('footer credits the owner and links to the source', async ({ page }) => {
  await page.goto('/')
  const footer = page.getByRole('contentinfo')
  await expect(footer).toContainText('© 2026 Miloš Milinkov')
  await expect(footer.locator(`a[href="${site.repo}"]`)).toBeVisible()
})

test('404 page explains and links home', async ({ page }) => {
  await page.goto('/missing-page')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Page not found')
  await expect(page.getByRole('link', { name: 'Return to the portfolio' })).toHaveAttribute('href', '/')
  await expect(page.getByRole('banner').locator('svg.monogram')).toBeVisible()
})
