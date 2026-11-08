// Crops the portrait to the hero card's 4:5 shape and writes AVIF/WebP variants to public/images.
// Usage: node scripts/assets/process-portrait.mjs <source image>
import path from 'node:path'
import sharp from 'sharp'
import { publicDir, writeVariants } from './lib.mjs'

const source = process.argv[2]
if (!source) {
  console.error('usage: process-portrait.mjs <portrait-source image>')
  process.exit(1)
}

const { width = 0, height = 0 } = await sharp(source).metadata()
// Largest 4:5 crop that fits the source; widths never exceed it (no upscaling).
const cropH = Math.min(height, Math.round((width * 5) / 4))
const cropW = Math.round((cropH * 4) / 5)
const written = await writeVariants(source, path.join(publicDir, 'images', 'portrait'), [400, cropW], (img) =>
  // extract (not resize): sharp keeps only the last resize, and writeVariants adds its own.
  img.extract({ left: Math.round((width - cropW) / 2), top: Math.round((height - cropH) / 2), width: cropW, height: cropH }),
)
console.log(`crop ${cropW}×${cropH}\n${written.join('\n')}`)
