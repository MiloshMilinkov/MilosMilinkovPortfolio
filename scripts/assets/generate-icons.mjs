// Renders public/favicon.svg to the PNG icon set. Usage: node scripts/assets/generate-icons.mjs
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import { publicDir } from './lib.mjs'

const svg = await readFile(path.join(publicDir, 'favicon.svg'))
const VOID = '#0b0c0e'

/** Icon on a solid background, the mark scaled to `scale` of the canvas (maskable safe zone ≈ 0.8). */
async function icon(size, file, { scale = 1, background = null } = {}) {
  const inner = Math.round(size * scale)
  const mark = await sharp(svg, { density: 1200 }).resize(inner, inner).png().toBuffer()
  const canvas = sharp({
    create: { width: size, height: size, channels: 4, background: background ?? { r: 0, g: 0, b: 0, alpha: 0 } },
  })
  const offset = Math.round((size - inner) / 2)
  await canvas.composite([{ input: mark, left: offset, top: offset }]).png().toFile(path.join(publicDir, file))
  console.log(`${file} ${size}×${size}`)
}

await icon(32, 'favicon-32.png')
await icon(180, 'apple-touch-icon.png', { scale: 0.82, background: VOID })
await icon(192, 'icon-192.png', { scale: 0.9, background: VOID })
await icon(512, 'icon-512.png', { scale: 0.9, background: VOID })
await icon(512, 'icon-maskable-512.png', { scale: 0.66, background: VOID })
