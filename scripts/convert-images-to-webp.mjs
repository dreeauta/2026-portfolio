import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const imgDir = path.join(rootDir, 'img')

const args = new Set(process.argv.slice(2))
const overwrite = args.has('--overwrite')

const supportedExt = new Set(['.jpg', '.jpeg', '.png', '.tif', '.tiff', '.heic'])
const skippedExt = new Set(['.webp', '.svg', '.gif', '.ico'])
const WEBP_MAX_DIMENSION = 16383

function walk(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(fullPath, files)
      continue
    }
    files.push(fullPath)
  }
  return files
}

if (!fs.existsSync(imgDir)) {
  console.error('Error: img directory not found.')
  process.exit(1)
}

const allFiles = walk(imgDir)
const targets = allFiles.filter((file) => supportedExt.has(path.extname(file).toLowerCase()))

if (!targets.length) {
  console.log('No supported image files found in img/.')
  process.exit(0)
}

let converted = 0
let skipped = 0
let failed = 0

for (const input of targets) {
  const output = `${input.slice(0, input.lastIndexOf('.'))}.webp`

  if (!overwrite && fs.existsSync(output)) {
    skipped += 1
    continue
  }

  try {
    const image = sharp(input)
    const meta = await image.metadata()
    const width = meta.width || 0
    const height = meta.height || 0

    let pipeline = image
    if (width > WEBP_MAX_DIMENSION || height > WEBP_MAX_DIMENSION) {
      // WebP has a maximum dimension; downscale only when needed.
      pipeline = image.resize({
        width: Math.min(width, WEBP_MAX_DIMENSION),
        height: Math.min(height, WEBP_MAX_DIMENSION),
        fit: 'inside',
        withoutEnlargement: true,
      })
    }

    await pipeline.webp({ quality: 82 }).toFile(output)
    converted += 1
  } catch (err) {
    failed += 1
    console.error(`Failed: ${path.relative(rootDir, input)}`)
    if (err instanceof Error && err.message) console.error(err.message)
  }
}

const ignored = allFiles.filter((file) => skippedExt.has(path.extname(file).toLowerCase())).length

console.log(`Done. Converted: ${converted}, Skipped existing: ${skipped}, Failed: ${failed}, Ignored: ${ignored}`)
console.log('Tip: pass --overwrite to regenerate existing .webp files.')

if (failed > 0) process.exit(1)

