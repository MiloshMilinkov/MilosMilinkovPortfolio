import { expect, test, type Page } from '@playwright/test'

const card = (page: Page, id: string) => page.locator(`#projects [data-project="${id}"]`)

test('shows eight featured projects and no archive group', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#projects .featured > [data-project]')).toHaveCount(8)
  await expect(page.locator('#projects .archive')).toHaveCount(0)
})

test('a live project links to the site, with the source as a second link', async ({ page }) => {
  await page.goto('/')
  const vladic = card(page, 'advokat-vladic')
  await expect(vladic.locator('[data-status]')).toHaveText('Live')
  const visit = vladic.getByRole('link', { name: /Visit live site/ })
  await expect(visit).toHaveAttribute('href', 'https://advokat-vladic.milos300399.workers.dev/')
  await expect(visit).toHaveAttribute('target', '_blank')
  await expect(visit).toHaveAttribute('rel', /noopener/)
  await expect(visit).toHaveAttribute('rel', /noreferrer/)
  await expect(vladic.getByRole('link', { name: /^Source/ })).toHaveAttribute(
    'href',
    'https://github.com/MiloshMilinkov/advokat-vladic',
  )
})

test('concept sites link to the live demo and say they are concepts', async ({ page }) => {
  await page.goto('/')
  for (const [id, url] of [
    ['little-fern-coffee', 'https://little-fern-coffee.milos300399.workers.dev/'],
    ['mabels-chair', 'https://mabels-chair.milos300399.workers.dev/'],
    ['lovely-layers', 'https://lovely-layers.milos300399.workers.dev/'],
  ]) {
    const c = card(page, id!)
    await expect(c.locator('[data-status]')).toHaveText('Live')
    await expect(c).toContainText('Concept site')
    await expect(c.getByRole('link', { name: /Visit live site/ })).toHaveAttribute('href', url!)
  }
})

test('the hero counts only real client sites', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#top')).toContainText('2 client sites live')
})

test('a project that is not hosted links to its repo and says so', async ({ page }) => {
  await page.goto('/')
  const anvil = card(page, 'projectanvil')
  await expect(anvil.locator('[data-status]')).toHaveText('Source only')
  await expect(anvil.getByRole('link', { name: /View source on GitHub/ })).toHaveAttribute(
    'href',
    'https://github.com/MiloshMilinkov/ProjectAnvil',
  )
  await expect(anvil).toContainText('Not publicly hosted — view the source on GitHub.')
})

test('the classified project has no link and explains why', async ({ page }) => {
  await page.goto('/')
  const euronet = card(page, 'euronet')
  await expect(euronet.locator('[data-status]')).toHaveText('Classified')
  await expect(euronet.locator('a')).toHaveCount(0)
  await expect(euronet).toContainText('Proprietary system under NDA — details on request.')
})

test('clicking anywhere on a live card opens the site', async ({ page, context }) => {
  await page.goto('/')
  const arizona = card(page, 'arizonalifts')
  await arizona.scrollIntoViewIfNeeded()
  const box = (await arizona.locator('h3').boundingBox())!
  // Do not actually leave for the live site: capture the popup's URL and close it.
  await context.route('https://arizonalifts.com/**', (route) => route.fulfill({ body: 'ok' }))
  const [popup] = await Promise.all([page.waitForEvent('popup'), page.mouse.click(box.x + 5, box.y + box.height / 2)])
  expect(popup.url()).toContain('arizonalifts.com')
  await popup.close()
})

test('every new-tab link announces that it opens a new tab', async ({ page }) => {
  await page.goto('/')
  const links = page.locator('#projects a[target="_blank"]')
  expect(await links.count()).toBeGreaterThanOrEqual(10)
  for (const text of await links.allTextContents()) expect(text).toContain('(opens in a new tab)')
})

test('live projects show screenshots, others show schematic art', async ({ page }) => {
  await page.goto('/')
  const live = card(page, 'arizonalifts')
  await expect(live.locator('picture source[type="image/avif"]')).toHaveCount(1)
  await expect(live.locator('picture source[type="image/webp"]')).toHaveCount(1)
  await expect(live.locator('img')).toHaveAttribute('loading', 'lazy')
  await expect(card(page, 'silicon-lottery').locator('svg.schematic')).toHaveCount(1)
})

test('technology names appear only in the workflow and hosting sections', async ({ page }) => {
  await page.goto('/')
  const tools =
    /\b(Vue|React|Angular|ASP\.NET|SQL Server|SQLite|MongoDB|Cloudflare|Vite|TypeScript|Playwright|Docker|SSIS|Codex|Claude Code|Node\.js)\b|\.NET\b/
  // Exceptions by design: the workflow section lists tools; Hosting explains Cloudflare.
  const sections = page.locator('main > section:not(#skills):not(#hosting)')
  expect(await sections.count()).toBeGreaterThan(5)
  for (const section of await sections.all()) {
    const text = await section.innerText()
    expect(text.match(tools)?.[0] ?? null, (await section.getAttribute('id')) ?? '').toBeNull()
  }
  await expect(page.locator('#skills')).toContainText('Claude Code')
})
