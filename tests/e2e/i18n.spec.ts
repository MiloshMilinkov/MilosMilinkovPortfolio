import { expect, test } from '@playwright/test'
import { site } from '../../src/data/site'
import { LOCALES, localeInfo, messages } from '../../src/i18n'

const decode = (s: string) => s.replaceAll('&amp;', '&').replaceAll('&quot;', '"')

for (const locale of LOCALES) {
  const { path, htmlLang } = localeInfo[locale]
  const t = messages[locale]

  test.describe(`${locale} page`, () => {
    test('is prerendered in its language with its own head tags', async ({ request }) => {
      const res = await request.get(path)
      expect(res.status()).toBe(200)
      const html = await res.text()
      expect(html).toContain(`<html lang="${htmlLang}"`)
      expect(decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '')).toBe(t.meta.title)
      expect(html).toContain(`<link rel="canonical" href="${site.SITE_URL}${path}"`)
      expect(html).toContain(`<meta property="og:locale" content="${localeInfo[locale].ogLocale}"`)
      // Every language page lists every language version, plus x-default.
      for (const l of LOCALES) {
        expect(html).toContain(`hreflang="${localeInfo[l].htmlLang}" href="${site.SITE_URL}${localeInfo[l].path}"`)
      }
      expect(html).toContain('hreflang="x-default"')
      expect(html.replace(/<[^>]+>/g, '')).toContain(t.hero.headline)
      expect(html).not.toMatch(/__[A-Z_]+__/)
    })

    test('hydrates without errors and shows translated sections', async ({ page }) => {
      const problems: string[] = []
      page.on('console', (m) => {
        if (m.type() === 'error' || m.type() === 'warning') problems.push(m.text())
      })
      page.on('pageerror', (e) => problems.push(e.message))
      await page.goto(path)
      await page.waitForLoadState('networkidle')
      await expect(page.locator('h1')).toHaveText(t.hero.headline)
      await expect(page.locator('#hosting-title')).toHaveText(t.hosting.title)
      await expect(page.locator('#services-title')).toHaveText(t.services.title)
      expect(problems).toEqual([])
    })

    test('offers the hosting guide in this language and the others', async ({ page }) => {
      await page.goto(path)
      const hosting = page.locator('#hosting')
      await expect(hosting.getByRole('link', { name: t.hosting.guideButton })).toHaveAttribute('href', site.guide(locale))
      for (const other of LOCALES.filter((l) => l !== locale)) {
        await expect(hosting.locator(`a[href="${site.guide(other)}"]`)).toHaveText(localeInfo[other].name)
      }
    })
  })
}

test('the picker marks the current language and links to the others', async ({ page }) => {
  await page.goto('/sr/')
  const picker = page.getByRole('navigation', { name: messages.sr.header.languages })
  await expect(picker.getByRole('link', { name: 'Srpski' })).toHaveAttribute('aria-current', 'true')
  await expect(picker.getByRole('link', { name: 'English' })).toHaveAttribute('href', '/')
  await expect(picker.getByRole('link', { name: 'Русский' })).toHaveAttribute('href', '/ru/')
})

test('switching language keeps the reader on the same section', async ({ page }) => {
  await page.goto('/#hosting')
  await page.getByRole('navigation', { name: messages.en.header.languages }).getByRole('link', { name: 'Русский' }).click()
  await expect(page).toHaveURL(/\/ru\/#hosting$/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru')
})

test('the sitemap lists every language with alternates', async ({ request }) => {
  const xml = await (await request.get('/sitemap.xml')).text()
  for (const l of LOCALES) expect(xml).toContain(`<loc>${site.SITE_URL}${localeInfo[l].path}</loc>`)
  // Each language URL lists every language plus x-default.
  expect(xml.match(/xhtml:link/g)?.length).toBe(LOCALES.length * (LOCALES.length + 1))
})

test('each language preloads the font subset its headline uses', async ({ request }) => {
  for (const [path, subset] of [['/', 'latin'], ['/sr/', 'latin'], ['/ru/', 'cyrillic']] as const) {
    const html = await (await request.get(path)).text()
    expect(html, path).toMatch(new RegExp(`<link rel="preload" href="/assets/geist-${subset}-wght-normal-[^"]+\.woff2" as="font"`))
    expect(html, path).not.toContain('<!--font:')
  }
})

test.describe('narrow phone', () => {
  test.use({ viewport: { width: 320, height: 640 } })
  for (const locale of ['sr', 'ru'] as const) {
    test(`${locale} has no horizontal scrolling at 320 px`, async ({ page }) => {
      await page.goto(localeInfo[locale].path)
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      expect(overflow).toBeLessThanOrEqual(0)
    })
  }
})
