// Renders every page with the SSR bundle and writes the HTML into the built templates.
// Runs after `vite build` (client → dist/) and `vite build --ssr` (server → dist-ssr/).
// Home page: one file per language (dist/index.html, dist/sr/index.html, dist/ru/index.html).
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')
const MARKER = '<!--app-html-->'

function fail(message) {
  console.error(`prerender: ${message}`)
  process.exit(1)
}

const { render, fillHead, LOCALES, localeInfo } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)

async function writePage(template, outFile, html, locale) {
  if (!template.includes(MARKER)) fail(`template for ${outFile} has no ${MARKER} marker`)
  if (!html || !html.trim()) fail(`empty render for ${outFile}`)
  let out = template.replace(MARKER, () => html)
  if (locale) out = fillHead(out, locale)
  if (/__[A-Z_]+__/.test(out)) fail(`${outFile} still has unfilled head tokens`)
  const target = path.join(dist, outFile)
  await mkdir(path.dirname(target), { recursive: true })
  await writeFile(target, out)
  console.log(`prerender: ${outFile} (${html.length} chars)`)
}

// Read once, before index.html is overwritten with the English page.
const homeTemplate = await readFile(path.join(dist, 'index.html'), 'utf8')
for (const locale of LOCALES) {
  const outFile = path.posix.join(localeInfo[locale].path.slice(1), 'index.html')
  await writePage(homeTemplate, outFile, await render('home', locale), locale)
}

const notFound = (await readFile(path.join(dist, '404.html'), 'utf8')).replace(/<!--font:latin=([^;]*);[^>]*-->/, (_, latin) =>
  latin ? `<link rel="preload" href="/${latin}" as="font" type="font/woff2" crossorigin>` : '',
)
await writePage(notFound, '404.html', await render('404', 'en'))

await rm(ssrDir, { recursive: true, force: true })
