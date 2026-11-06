import { expect, test } from '@playwright/test'
import { site } from '../../src/data/site'

test.describe('experience', () => {
  test('lists roles newest first, then education, with only the latest open', async ({ page }) => {
    await page.goto('/')
    const entries = page.locator('#experience details')
    await expect(entries).toHaveCount(4)
    const summaries = entries.locator('summary')
    await expect(summaries.nth(0)).toContainText('Euronet Worldwide')
    await expect(summaries.nth(1)).toContainText('Freelance Web Developer')
    await expect(summaries.nth(2)).toContainText('Kliker IT Center for Children')
    await expect(summaries.nth(3)).toContainText('Visoka škola elektrotehnike i računarstva')
    await expect(entries.nth(0)).toHaveAttribute('open', '')
    for (const i of [1, 2, 3]) await expect(entries.nth(i)).not.toHaveAttribute('open', '')
  })

  test('entries open by click and by keyboard', async ({ page }) => {
    await page.goto('/')
    const entries = page.locator('#experience details')
    await entries.nth(1).locator('summary').click()
    await expect(entries.nth(1)).toHaveAttribute('open', '')
    await expect(entries.nth(1)).toContainText('Use AI coding agents to speed up delivery')

    const kliker = entries.nth(2).locator('summary')
    await kliker.focus()
    await page.keyboard.press('Enter')
    await expect(entries.nth(2)).toHaveAttribute('open', '')
  })
})

test.describe('contact', () => {
  test('offers email, LinkedIn and GitHub, and the location', async ({ page }) => {
    await page.goto('/')
    const contact = page.locator('#contact')
    await expect(contact.locator(`a[href="mailto:${site.email}"]`)).toBeVisible()
    await expect(contact.locator(`a[href="${site.linkedin}"]`)).toBeVisible()
    await expect(contact.locator(`a[href="${site.github}"]`)).toBeVisible()
    await expect(contact).toContainText('Belgrade, Serbia')
  })

  test('never publishes the phone number', async ({ request }) => {
    const html = await (await request.get('/')).text()
    expect(html).not.toContain('+381')
    expect(html).not.toContain('tel:')
  })

  test('copies the email address', async ({ page, context, browserName }) => {
    test.skip(browserName !== 'chromium', 'clipboard permissions are only grantable in Chromium')
    await context.grantPermissions(['clipboard-read', 'clipboard-write'])
    await page.goto('/')
    const copy = page.locator('#contact').getByRole('button', { name: 'Copy email address' })
    await copy.click()
    await expect(page.locator('#contact [aria-live="polite"]')).toHaveText('Email address copied')
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(site.email)
  })
})
