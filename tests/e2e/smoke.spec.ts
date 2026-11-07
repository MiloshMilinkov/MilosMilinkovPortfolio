import { expect, test } from '@playwright/test'
import { profile } from '../../src/data/profile'

test('home page is prerendered and served', async ({ page, request }) => {
  const res = await request.get('/')
  expect(res.status()).toBe(200)
  const html = await res.text()
  // Heading must be in the raw HTML (prerendered), not only after client render.
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? ''
  expect(h1.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()).toBe(profile.headline)

  await page.goto('/')
  await expect(page.locator('h1')).toContainText(profile.headline)
})

test('unknown path returns the 404 page with status 404', async ({ request }) => {
  const res = await request.get('/does-not-exist')
  expect(res.status()).toBe(404)
  expect(await res.text()).toContain('Page not found')
})
