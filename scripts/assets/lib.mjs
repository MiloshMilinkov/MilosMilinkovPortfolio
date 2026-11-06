import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
export const publicDir = path.join(root, 'public')

/**
 * Writes `<outBase>-<width>.avif` and `.webp` for each width (never upscaling).
 * `input` is a file path or a Buffer; `pipeline` can add crops/grades first.
 */
export async function writeVariants(input, outBase, widths, pipeline = (img) => img) {
  await mkdir(path.dirname(outBase), { recursive: true })
  const written = []
  for (const width of widths) {
    const base = pipeline(sharp(input)).resize({ width, withoutEnlargement: true })
    await base.clone().avif({ quality: 55, effort: 6 }).toFile(`${outBase}-${width}.avif`)
    await base.clone().webp({ quality: 78, effort: 6 }).toFile(`${outBase}-${width}.webp`)
    written.push(`${path.relative(root, outBase)}-${width}.{avif,webp}`)
  }
  return written
}
