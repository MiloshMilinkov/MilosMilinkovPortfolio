// Square-crops the extracted CV portrait and writes AVIF/WebP variants to public/images.
// Usage: node scripts/assets/process-portrait.mjs <portrait-source.jpeg>
import path from 'node:path'
import { publicDir, writeVariants } from './lib.mjs'

const source = process.argv[2]
if (!source) {
  console.error('usage: process-portrait.mjs <portrait-source image>')
  process.exit(1)
}

// The CV photo is 360×360; 240 and 360 avoid upscaling.
const written = await writeVariants(source, path.join(publicDir, 'images', 'portrait'), [240, 360], (img) =>
  img.resize({ width: 360, height: 360, fit: 'cover', position: 'attention' }),
)
console.log(written.join('\n'))
