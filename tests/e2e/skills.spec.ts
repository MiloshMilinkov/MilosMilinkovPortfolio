import { expect, test } from '@playwright/test'

const TABS = ['Backend', 'Frontend', 'Data', 'AI', 'Tools']
const VUE_PROJECTS = ['Advokatska kancelarija Vladić', 'ARIZONALIFTS']

test('every skill group is in the prerendered HTML', async ({ request }) => {
  const html = await (await request.get('/')).text()
  const skills = html.slice(html.indexOf('id="skills"'), html.indexOf('id="experience"'))
  for (const label of ['C#', 'Vue.js', 'Microsoft SQL Server', 'Claude Code', 'Playwright']) {
    expect(skills).toContain(label)
  }
})

test('tabs show one group at a time', async ({ page }) => {
  await page.goto('/')
  const skills = page.locator('#skills')
  const tabs = skills.getByRole('tab')
  await expect(tabs).toHaveText(TABS)
  await expect(tabs.first()).toHaveAttribute('aria-selected', 'true')
  await expect(skills.getByRole('tabpanel')).toHaveCount(1) // hidden panels are not exposed
  await expect(skills.getByRole('tabpanel')).toContainText('C#')

  await tabs.nth(2).click()
  await expect(tabs.nth(2)).toHaveAttribute('aria-selected', 'true')
  await expect(skills.getByRole('tabpanel')).toContainText('Microsoft SQL Server')
})

test('arrow keys, Home and End move between tabs', async ({ page }) => {
  await page.goto('/')
  const tabs = page.locator('#skills').getByRole('tab')
  await tabs.first().focus()
  await page.keyboard.press('ArrowRight')
  await expect(tabs.nth(1)).toBeFocused()
  await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true')
  await page.keyboard.press('End')
  await expect(tabs.nth(4)).toBeFocused()
  await page.keyboard.press('Home')
  await expect(tabs.nth(0)).toBeFocused()
  await page.keyboard.press('ArrowLeft')
  await expect(tabs.nth(4)).toBeFocused()
  await expect(tabs.nth(4)).toHaveAttribute('aria-selected', 'true')
})

test('skills show their level and how many projects use them', async ({ page }) => {
  await page.goto('/')
  const skills = page.locator('#skills')
  await skills.getByRole('tab', { name: 'Frontend' }).click()
  const vue = skills.getByRole('button', { name: /Vue\.js/ })
  await expect(vue).toContainText('Core')
  await expect(vue).toContainText('Used in 2 projects')
  await expect(skills.getByRole('button', { name: /React/ })).toContainText('Used in 1 project')
})

test('selecting a skill lists the projects that use it', async ({ page }) => {
  await page.goto('/')
  const skills = page.locator('#skills')
  await skills.getByRole('tab', { name: 'Frontend' }).click()
  const vue = skills.getByRole('button', { name: /Vue\.js/ })
  await vue.click()
  await expect(vue).toHaveAttribute('aria-pressed', 'true')
  const readout = skills.locator('.readout')
  await expect(readout.getByRole('listitem')).toHaveText(VUE_PROJECTS)
  await expect(readout.getByRole('button', { name: 'Show in projects' })).toBeVisible()
})

test('"Show in projects" filters the projects and moves focus there', async ({ page }) => {
  await page.goto('/')
  const skills = page.locator('#skills')
  await skills.getByRole('tab', { name: 'Frontend' }).click()
  await skills.getByRole('button', { name: /Vue\.js/ }).click()
  await skills.getByRole('button', { name: 'Show in projects' }).click()
  await expect(page.locator('#projects-title')).toBeFocused()
  await expect(page.locator('#projects-title')).toBeInViewport()
  await expect(page.locator('#projects').getByRole('button', { name: 'Vue.js', pressed: true })).toBeVisible()
})
