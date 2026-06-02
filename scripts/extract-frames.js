#!/usr/bin/env node
/**
 * scripts/extract-frames.js
 *
 * Extracts every frame from the first DURATION seconds of
 * public/hero-reel.mp4 and saves them as JPEG files so the
 * browser never has to re-extract on every page load.
 *
 * Run once   :  npm run extract-frames
 * Re-extract :  npm run extract-frames:force
 *
 * Output: public/hero-frames/frame-0001.jpg … frame-NNNN.jpg
 *         public/hero-frames/manifest.json   (loaded by Hero.jsx)
 */

// ESM project but fluent-ffmpeg is CJS — bridge via createRequire
import { createRequire }                    from 'module'
import { fileURLToPath }                    from 'url'
import { dirname, join }                    from 'path'
import { existsSync, mkdirSync, readdirSync,
         writeFileSync, statSync, readFileSync } from 'fs'

const require   = createRequire(import.meta.url)
const ffmpeg    = require('fluent-ffmpeg')
const ffStatic  = require('ffmpeg-static')

const __dirname = dirname(fileURLToPath(import.meta.url))

// ── Config ──────────────────────────────────────────────────────────────────
const FPS      = 24      // frames per second to extract  (8 s × 24 = 192 frames)
const DURATION = 8       // seconds of video to cover
const QUALITY  = 3       // ffmpeg -q:v  (1 = best JPEG, 31 = worst; 2-4 is excellent)
const WIDTH    = 1280    // output width; height auto-scaled to keep aspect ratio

// ── Paths ───────────────────────────────────────────────────────────────────
const ROOT     = join(__dirname, '..')
const INPUT    = join(ROOT, 'public', 'hero-reel.mp4')
const OUT_DIR  = join(ROOT, 'public', 'hero-frames')
const MANIFEST = join(OUT_DIR, 'manifest.json')

// ── Guards ──────────────────────────────────────────────────────────────────
const forceRegen = process.argv.includes('--force')

if (!existsSync(INPUT)) {
  console.error(`\n  ✗  Input not found: ${INPUT}`)
  console.error('     Copy your video to public/hero-reel.mp4 and retry.\n')
  process.exit(1)
}

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true })

// Skip if already extracted (unless --force)
if (!forceRegen && existsSync(MANIFEST)) {
  const mf  = JSON.parse(readFileSync(MANIFEST, 'utf8'))
  const got = readdirSync(OUT_DIR).filter(f => /^frame-\d+\.jpg$/.test(f))
  if (got.length >= mf.count && mf.count > 0) {
    console.log(`\n  ✓  ${mf.count} frames already in public/hero-frames/ — skipping.`)
    console.log('     Use  npm run extract-frames:force  to re-extract.\n')
    process.exit(0)
  }
}

// ── Extract ──────────────────────────────────────────────────────────────────
ffmpeg.setFfmpegPath(ffStatic)

const expectedFrames = Math.round(FPS * DURATION)

console.log(`\n  Extracting ${expectedFrames} frames  (${FPS} fps × ${DURATION} s)…`)
console.log(`  Source  : public/hero-reel.mp4`)
console.log(`  Output  : public/hero-frames/frame-NNNN.jpg`)
console.log(`  Width   : ${WIDTH}px  |  JPEG quality : ${QUALITY}  (1=best)\n`)

const t0 = Date.now()

ffmpeg(INPUT)
  .inputOptions([`-t ${DURATION}`])                   // read only first DURATION seconds
  .videoFilters(`scale=${WIDTH}:-2,fps=${FPS}`)        // resize + fix fps
  .outputOptions([
    `-q:v ${QUALITY}`,
    `-vframes ${expectedFrames}`,
  ])
  .output(join(OUT_DIR, 'frame-%04d.jpg'))

  .on('progress', ({ frames, percent }) => {
    const pct  = Math.min(Math.round(percent ?? ((frames / expectedFrames) * 100)), 100)
    const fill = Math.round(pct / 4)
    const bar  = '█'.repeat(fill) + '░'.repeat(25 - fill)
    process.stdout.write(`\r  [${bar}] ${String(pct).padStart(3)}%  (${frames ?? '?'} frames)   `)
  })

  .on('end', () => {
    const elapsed = ((Date.now() - t0) / 1000).toFixed(1)
    const jpgs    = readdirSync(OUT_DIR).filter(f => /^frame-\d+\.jpg$/.test(f)).sort()
    const count   = jpgs.length
    const sizeMB  = (jpgs.reduce((s, f) => s + statSync(join(OUT_DIR, f)).size, 0) / 1048576).toFixed(1)

    // Write manifest — Hero.jsx reads this to know how many frames to load
    writeFileSync(MANIFEST, JSON.stringify({ count, fps: FPS, duration: DURATION, width: WIDTH }, null, 2))

    console.log(`\n\n  ✓  ${count} frames saved in ${elapsed}s  (${sizeMB} MB total)`)
    console.log('     Manifest written: public/hero-frames/manifest.json')
    console.log('     Hero will now load frames directly — no in-browser extraction.\n')
  })

  .on('error', err => {
    console.error('\n\n  ✗  ffmpeg error:', err.message, '\n')
    process.exit(1)
  })

  .run()
