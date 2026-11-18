// Places desktop-app screenshots on the site's backdrop (1280×800) and writes AVIF/WebP variants
// to public/images/projects/<id>-<width>.<ext>. Several shots are laid out side by side.
// Usage: node scripts/assets/frame-app-shots.mjs <id> <shot.png> [<shot2.png> ...]
import path from 'node:path'
import sharp from 'sharp'
import { publicDir, writeVariants } from './lib.mjs'

const [id, ...shots] = process.argv.slice(2)
if (!id || shots.length === 0) {
  console.error('Usage: node scripts/assets/frame-app-shots.mjs <id> <shot.png> [<shot2.png> ...]')
  process.exit(1)
}

const W = 1280
const H = 800
const PAD_X = 80
const TOP = 64
const GAP = 48
const RADIUS = 14
const BLUR = 28

const backdrop = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <radialGradient id="a" cx="0.9" cy="0" r="0.75"><stop offset="0" stop-color="#d48cf8" stop-opacity="0.32"/><stop offset="1" stop-color="#d48cf8" stop-opacity="0"/></radialGradient>
    <radialGradient id="b" cx="0.55" cy="-0.1" r="0.7"><stop offset="0" stop-color="#6a4fdf" stop-opacity="0.38"/><stop offset="1" stop-color="#6a4fdf" stop-opacity="0"/></radialGradient>
    <radialGradient id="c" cx="0" cy="1" r="0.7"><stop offset="0" stop-color="#7ee0c3" stop-opacity="0.16"/><stop offset="1" stop-color="#7ee0c3" stop-opacity="0"/></radialGradient>
    <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#c4ccff" fill-opacity="0.1"/></pattern>
  </defs>
  <rect width="100%" height="100%" fill="#171b2f"/>
  <rect width="100%" height="100%" fill="url(#dots)"/>
  <rect width="100%" height="100%" fill="url(#a)"/>
  <rect width="100%" height="100%" fill="url(#b)"/>
  <rect width="100%" height="100%" fill="url(#c)"/>
</svg>`)

/** Trims the black border Windows leaves around a captured window, keeps transparency. */
async function load(file) {
  const { isOpaque } = await sharp(file).stats()
  const img = sharp(file)
  return isOpaque ? img.trim({ background: '#000000', threshold: 12 }).png().toBuffer() : img.png().toBuffer()
}

const buffers = await Promise.all(shots.map(load))
const metas = await Promise.all(buffers.map((b) => sharp(b).metadata()))

// Fit every shot to the same height, within the width left after padding and gaps.
const maxH = H - TOP
const ratios = metas.map((m) => m.width / m.height)
const widthAtMaxH = ratios.reduce((sum, r) => sum + r * maxH, 0)
const room = W - 2 * PAD_X - GAP * (shots.length - 1)
const h = Math.round(Math.min(maxH, (maxH * room) / widthAtMaxH))
const widths = ratios.map((r) => Math.round(r * h))
let x = Math.round((W - widths.reduce((a, b) => a + b, 0) - GAP * (shots.length - 1)) / 2)

const layers = []
for (const [i, buf] of buffers.entries()) {
  const w = widths[i]
  // sharp resizes before it composites, so the rounded-corner mask applies to the resized shot.
  const mask = Buffer.from(`<svg width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="${RADIUS}" fill="#fff"/></svg>`)
  const rounded = await sharp(buf).resize(w, h).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer()
  const shadow = Buffer.from(`<svg width="${w + BLUR * 4}" height="${h + BLUR * 4}">
    <filter id="s"><feGaussianBlur stdDeviation="${BLUR / 2}"/></filter>
    <rect x="${BLUR * 2}" y="${BLUR * 2 + 18}" width="${w}" height="${h}" rx="${RADIUS}" fill="#05070f" fill-opacity="0.75" filter="url(#s)"/>
  </svg>`)
  layers.push({ input: shadow, left: x - BLUR * 2, top: TOP - BLUR * 2 })
  layers.push({ input: rounded, left: x, top: TOP })
  x += w + GAP
}

// Layers may run past the bottom edge (the shots are anchored at the top and cropped below).
const extended = await sharp(backdrop)
  .extend({ bottom: 400, background: '#171b2f' })
  .composite(layers)
  .png()
  .toBuffer()
const png = await sharp(extended).extract({ left: 0, top: 0, width: W, height: H }).png().toBuffer()
const written = await writeVariants(png, path.join(publicDir, 'images', 'projects', id), [640, 960, 1280])
console.log(`${id}: ${written.join(', ')}`)
