import { expect, test, type Page } from '@playwright/test'

const card = (page: Page, id: string) => page.locator(`#projects [data-project="${id}"]`)
const visibleIds = (page: Page) =>
  page.locator('#projects [data-project]:visible').evaluateAll((els) => els.map((e) => e.getAttribute('data-project')))

test('shows six featured projects and four archive rows', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#projects .featured > [data-project]')).toHaveCount(6)
  await expect(page.locator('#projects .archive [data-project]')).toHaveCount(4)
})

test('a live project links to the site, with the source as a second link', async ({ page }) => {
  await page.goto('/')
  const vladic = card(page, 'advokat-vladic')
  await expect(vladic.locator('[data-status]')).toHaveText('Live')
  const visit = vladic.getByRole('link', { name: /Visit live site/ })
  await expect(visit).toHaveAttribute('href', 'https://advokatvladic.rs')
  await expect(visit).toHaveAttribute('target', '_blank')
  await expect(visit).toHaveAttribute('rel', /noopener/)
  await expect(visit).toHaveAttribute('rel', /noreferrer/)
  await expect(vladic.getByRole('link', { name: /^Source/ })).toHaveAttribute(
    'href',
    'https://github.com/MiloshMilinkov/advokat-vladic',
  )
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
  const astra = card(page, 'astra')
  await astra.scrollIntoViewIfNeeded()
  const box = (await astra.locator('h3').boundingBox())!
  // Do not actually leave for the live site: capture the popup's URL and close it.
  await context.route('https://astra-engineering-website.vercel.app/**', (route) => route.fulfill({ body: 'ok' }))
  const [popup] = await Promise.all([page.waitForEvent('popup'), page.mouse.click(box.x + 5, box.y + box.height / 2)])
  expect(popup.url()).toContain('astra-engineering-website.vercel.app')
  await popup.close()
})

test('every new-tab link announces that it opens a new tab', async ({ page }) => {
  await page.goto('/')
  const links = page.locator('#projects a[target="_blank"]')
  expect(await links.count()).toBeGreaterThan(8)
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

test('filtering by technology shows only matching projects', async ({ page }) => {
  await page.goto('/')
  const section = page.locator('#projects')
  const chip = section.getByRole('button', { name: 'C#', exact: true })
  await chip.click()
  await expect(chip).toHaveAttribute('aria-pressed', 'true')
  await expect(section.locator('[aria-live="polite"]')).toHaveText('Showing 4 projects using C#')
  await expect.poll(() => visibleIds(page)).toEqual(['euronet', 'silicon-lottery', 'spendsmart', 'recipe-sharing'])

  await section.getByRole('button', { name: 'Clear filter' }).click()
  await expect.poll(async () => (await visibleIds(page)).length).toBe(10)
})

test('a filter with no archive matches hides the archive group', async ({ page }) => {
  await page.goto('/')
  const section = page.locator('#projects')
  await section.getByRole('button', { name: 'React', exact: true }).click()
  await expect(section.locator('[aria-live="polite"]')).toHaveText('Showing 1 project using React')
  await expect(section.locator('.archive')).toHaveCount(0)
})
