import { expect, test } from '@playwright/test'
import sharp from 'sharp'

const staticFiles = [
  '/favicon.svg',
  '/favicon-32.png',
  '/apple-touch-icon.png',
  '/icon-192.png',
  '/icon-512.png',
  '/site.webmanifest',
  '/og-image.png',
  '/images/portrait-240.avif',
  '/images/portrait-360.webp',
  '/images/projects/astra-1280.webp',
  '/images/projects/advokat-vladic-640.avif',
  '/images/projects/arizonalifts-960.webp',
]

for (const file of staticFiles) {
  test(`serves ${file}`, async ({ request }) => {
    const res = await request.get(file)
    expect(res.status()).toBe(200)
    expect((await res.body()).byteLength).toBeGreaterThan(100)
  })
}

test('Open Graph image is 1200×630', async ({ request }) => {
  const meta = await sharp(await (await request.get('/og-image.png')).body()).metadata()
  expect([meta.width, meta.height]).toEqual([1200, 630])
})

test('web manifest names the site and lists icons', async ({ request }) => {
  const manifest = await (await request.get('/site.webmanifest')).json()
  expect(manifest.name).toContain('Miloš Milinkov')
  expect(manifest.icons.map((i: { sizes: string }) => i.sizes)).toEqual(expect.arrayContaining(['192x192', '512x512']))
})

test('pages are served with security headers', async ({ request }) => {
  for (const path of ['/', '/missing-page']) {
    const h = (await request.get(path)).headers()
    expect(h['content-security-policy'], path).toContain("default-src 'self'")
    expect(h['content-security-policy'], path).toContain("frame-ancestors 'none'")
    expect(h['strict-transport-security'], path).toContain('max-age=31536000')
    expect(h['x-content-type-options'], path).toBe('nosniff')
    expect(h['referrer-policy'], path).toBe('strict-origin-when-cross-origin')
    expect(h['permissions-policy'], path).toContain('camera=()')
    expect(h['cross-origin-opener-policy'], path).toBe('same-origin')
  }
})

test('hashed build assets are cached immutably', async ({ request }) => {
  const html = await (await request.get('/')).text()
  const script = html.match(/<script type="module" crossorigin src="(\/assets\/[^"]+\.js)"/)?.[1]
  expect(script).toBeTruthy()
  expect((await request.get(script!)).headers()['cache-control']).toContain('immutable')
})

test('theme fonts are preloaded', async ({ request }) => {
  const html = await (await request.get('/')).text()
  expect(html).toMatch(/<link rel="preload" href="\/assets\/grenze-gotisch-latin-wght-normal-[^"]+\.woff2" as="font" type="font\/woff2" crossorigin>/)
})
