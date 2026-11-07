import { expect, test } from '@playwright/test'
import { profile } from '../../src/data/profile'
import { projects } from '../../src/data/projects'
import { site } from '../../src/data/site'

const attr = (html: string, re: RegExp) => html.match(re)?.[1]

test.describe('home page head', () => {
  let html = ''
  test.beforeAll(async ({ request }) => {
    html = await (await request.get('/')).text()
  })

  test('has language, title and a short description', () => {
    expect(html).toMatch(/<html lang="en"/)
    // The title is HTML-escaped in the source ("&" → "&amp;"); browsers show it decoded.
    expect(attr(html, /<title>([^<]*)<\/title>/)?.replaceAll('&amp;', '&')).toBe(site.title)
    const description = attr(html, /<meta name="description" content="([^"]*)"/) ?? ''
    expect(description.length).toBeGreaterThan(50)
    expect(description.length).toBeLessThanOrEqual(160)
  })

  test('has canonical URL and Open Graph / Twitter tags', () => {
    expect(html).toContain(`<link rel="canonical" href="${site.SITE_URL}/"`)
    expect(attr(html, /<meta property="og:type" content="([^"]*)"/)).toBe('profile')
    expect(attr(html, /<meta property="og:url" content="([^"]*)"/)).toBe(`${site.SITE_URL}/`)
    expect(attr(html, /<meta property="og:image" content="([^"]*)"/)).toBe(`${site.SITE_URL}/og-image.png`)
    expect(attr(html, /<meta name="twitter:card" content="([^"]*)"/)).toBe('summary_large_image')
  })

  test('embeds valid JSON-LD', () => {
    const json = attr(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/)
    expect(json).toBeTruthy()
    const ld = JSON.parse(json!)
    expect(ld['@context']).toBe('https://schema.org')
  })
})

test('404 page is noindex and has no canonical', async ({ request }) => {
  const html = await (await request.get('/missing-page')).text()
  expect(html).toContain('<meta name="robots" content="noindex"')
  expect(html).not.toContain('rel="canonical"')
  expect(html).not.toContain('application/ld+json')
})

test('robots.txt points at the sitemap', async ({ request }) => {
  const res = await request.get('/robots.txt')
  expect(res.status()).toBe(200)
  const body = await res.text()
  expect(body).toContain('User-agent: *')
  expect(body).toContain(`Sitemap: ${site.SITE_URL}/sitemap.xml`)
})

test('sitemap.xml lists the home page', async ({ request }) => {
  const res = await request.get('/sitemap.xml')
  expect(res.status()).toBe(200)
  const body = await res.text()
  expect(body).toContain(`<loc>${site.SITE_URL}/</loc>`)
  expect(body).toMatch(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/)
})

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false })

  test('content is readable from the prerendered HTML', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText(profile.bio[0]!.slice(0, 60))).toBeVisible()
    for (const p of projects) await expect(page.getByText(p.title, { exact: true }).first()).toBeAttached()
  })
})
