// Renders each page with the SSR bundle and writes the HTML into the built templates.
// Runs after `vite build` (client → dist/) and `vite build --ssr` (server → dist-ssr/).
import { readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')
const MARKER = '<!--app-html-->'

/** [page passed to render(), HTML file in dist/] */
const pages = [
  ['home', 'index.html'],
  ['404', '404.html'],
]

function fail(message) {
  console.error(`prerender: ${message}`)
  process.exit(1)
}

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)

for (const [page, file] of pages) {
  const target = path.join(dist, file)
  const template = await readFile(target, 'utf8')
  if (!template.includes(MARKER)) fail(`${file} has no ${MARKER} marker`)
  const html = await render(page)
  if (!html || !html.trim()) fail(`render('${page}') returned empty HTML`)
  // Function replacer so "$&"-style sequences in the HTML are not interpreted.
  await writeFile(target, template.replace(MARKER, () => html))
  console.log(`prerender: ${file} (${html.length} chars)`)
}

await rm(ssrDir, { recursive: true, force: true })
