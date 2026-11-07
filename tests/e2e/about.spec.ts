import { expect, test } from '@playwright/test'
import { profile } from '../../src/data/profile'
import { services, steps } from '../../src/data/services'

test('bio is in the prerendered HTML', async ({ request }) => {
  const html = await (await request.get('/')).text()
  const about = html.slice(html.indexOf('id="about"'))
  for (const paragraph of profile.bio) expect(about).toContain(paragraph.slice(0, 60))
})

test('languages and interests are listed', async ({ page }) => {
  await page.goto('/')
  const about = page.locator('#about')
  for (const item of [...profile.interests, ...profile.languages]) {
    await expect(about.getByRole('listitem').filter({ hasText: item })).toHaveCount(1)
  }
  await expect(about).toContainText(profile.location)
})

test('services list what each offer includes and lead to a quote', async ({ page }) => {
  await page.goto('/')
  const section = page.locator('#services')
  for (const s of services) {
    await expect(section.getByRole('heading', { name: s.title })).toBeVisible()
    await expect(section.getByRole('list', { name: `${s.title} includes` }).getByRole('listitem')).toHaveCount(s.includes.length)
  }
  await expect(section.getByRole('link', { name: 'Get a free quote' })).toHaveAttribute('href', '#contact')
})

test('process shows the steps in order', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#process ol > li h3')).toHaveText(steps.map((s) => s.title))
})
