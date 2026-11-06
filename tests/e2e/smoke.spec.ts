import { expect, test } from '@playwright/test'

test('home page is prerendered and served', async ({ page, request }) => {
  const res = await request.get('/')
  expect(res.status()).toBe(200)
  const html = await res.text()
  // Name must be in the raw HTML (prerendered), not only after client render.
  expect(html).toMatch(/<h1[^>]*>[\s\S]*Miloš Milinkov[\s\S]*<\/h1>/)

  await page.goto('/')
  await expect(page.locator('h1')).toContainText('Miloš Milinkov')
})

test('unknown path returns the 404 page with status 404', async ({ request }) => {
  const res = await request.get('/does-not-exist')
  expect(res.status()).toBe(404)
  expect(await res.text()).toContain('Signal lost')
})
