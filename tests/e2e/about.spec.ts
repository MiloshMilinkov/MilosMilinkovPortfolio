import { expect, test } from '@playwright/test'
import { services } from '../../src/data/services'
import { en } from '../../src/i18n/messages/en'

test('bio is in the prerendered HTML', async ({ request }) => {
  const html = await (await request.get('/')).text()
  const about = html.slice(html.indexOf('id="about"'))
  for (const paragraph of en.about.bio) expect(about).toContain(paragraph.slice(0, 60))
})

test('languages and interests are listed', async ({ page }) => {
  await page.goto('/')
  const about = page.locator('#about')
  for (const item of [...en.about.interests, ...en.about.languages]) {
    await expect(about.getByRole('listitem').filter({ hasText: item })).toHaveCount(1)
  }
  await expect(about).toContainText(en.about.location)
})

test('services list what each offer includes and lead to a quote', async ({ page }) => {
  await page.goto('/')
  const section = page.locator('#services')
  for (const { id } of services) {
    const s = en.services.items[id]
    await expect(section.getByRole('heading', { name: s.title })).toBeVisible()
    await expect(section.getByRole('list', { name: `${s.title} includes` }).getByRole('listitem')).toHaveCount(s.includes.length)
  }
  await expect(section.getByRole('link', { name: 'Get a free quote' })).toHaveAttribute('href', '#contact')
})

test('process shows the steps in order', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#process ol > li h3')).toHaveText(en.process.steps.map((s) => s.title))
})
