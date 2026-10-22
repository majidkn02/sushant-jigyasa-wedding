/**
 * OPTIONAL media optimiser.
 *
 * The optimised files are ALREADY included in /public, so you only need this
 * script if you replace a photo / the video and want new optimised copies.
 *
 * Requirements (only for this script, not for the website):
 *   - sharp   →  npm install --no-save sharp
 *   - ffmpeg  →  only needed for the video (https://ffmpeg.org/download.html)
 *
 * Usage:
 *   1. Put your original files in  media-originals/  using the names below.
 *   2. Run:  npm run media
 *
 * Originals expected (any of .png / .jpg / .jpeg / .webp):
 *   media-originals/bride-wedding.*            → public/images/bride/
 *   media-originals/groom-wedding.*            → public/images/groom/
 *   media-originals/couple-wedding.*           → public/images/couple/ (+ og-image.jpg)
 *   media-originals/couple-watercolor-lake.*   → public/images/couple/
 *   media-originals/couple-toon-sofa.*         → public/images/couple/
 *   media-originals/couple-watercolor-sketch.* → public/images/couple/
 *   media-originals/invitation-card.*          → public/images/invitation/
 *   media-originals/wedding-video.mp4          → public/video/ (+ poster)
 *   media-originals/gallery/*                  → public/images/gallery/
 */
import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const SRC = path.join(ROOT, 'media-originals');
const OUT = path.join(ROOT, 'public');

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.error('sharp is not installed. Run:  npm install --no-save sharp');
  process.exit(1);
}

const findOriginal = (base) => {
  for (const ext of ['.png', '.jpg', '.jpeg', '.webp']) {
    const p = path.join(SRC, base + ext);
    if (existsSync(p)) return p;
  }
  return null;
};

/** [originalName, outputFolder, widths[]] */
const IMAGES = [
  ['bride-wedding', 'images/bride', [480, 800, 940]],
  ['groom-wedding', 'images/groom', [480, 800, 940]],
  ['couple-wedding', 'images/couple', [640, 1024, 1448]],
  ['couple-watercolor-lake', 'images/couple', [640, 1000, 1254]],
  ['couple-toon-sofa', 'images/couple', [640, 1086]],
  ['couple-watercolor-sketch', 'images/couple', [640, 1024]],
  ['invitation-card', 'images/invitation', [800, 1086]],
];

async function webpSet(file, name, folder, widths) {
  const dir = path.join(OUT, folder);
  mkdirSync(dir, { recursive: true });
  const meta = await sharp(file).metadata();
  for (const w of widths) {
    const width = Math.min(w, meta.width);
    const out = path.join(dir, `${name}-${w}.webp`);
    await sharp(file)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: name === 'invitation-card' ? 90 : 84, effort: 6, smartSubsample: true })
      .toFile(out);
    console.log('  ✓', path.relative(ROOT, out));
  }
}

for (const [name, folder, widths] of IMAGES) {
  const file = findOriginal(name);
  if (!file) {
    console.log('· skipped (no original):', name);
    continue;
  }
  await webpSet(file, name, folder, widths);
  if (name === 'couple-wedding') {
    await sharp(file)
      .resize(1200, 630, { fit: 'cover', position: 'north' })
      .jpeg({ quality: 84, mozjpeg: true })
      .toFile(path.join(OUT, 'og-image.jpg'));
    console.log('  ✓ public/og-image.jpg');
  }
}

// Gallery: every file in media-originals/gallery → 640 + 1280 widths
const galleryDir = path.join(SRC, 'gallery');
if (existsSync(galleryDir)) {
  for (const f of readdirSync(galleryDir)) {
    if (!/\.(png|jpe?g|webp)$/i.test(f)) continue;
    const name = f.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await webpSet(path.join(galleryDir, f), name, 'images/gallery', [640, 1280]);
  }
}

// Video → H.264 1080×1080 (plays in every browser) + poster
const video = path.join(SRC, 'wedding-video.mp4');
if (existsSync(video)) {
  const dir = path.join(OUT, 'video');
  mkdirSync(dir, { recursive: true });
  try {
    execFileSync('ffmpeg', [
      '-y', '-i', video,
      '-vf', "scale='min(1080,iw)':-2:flags=lanczos,format=yuv420p",
      '-c:v', 'libx264', '-preset', 'slow', '-crf', '21', '-profile:v', 'high', '-level', '4.1',
      '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart',
      path.join(dir, 'wedding-video.mp4'),
    ], { stdio: 'inherit' });
    execFileSync('ffmpeg', [
      '-y', '-ss', '22.5', '-i', video, '-frames:v', '1', '-update', '1',
      '-vf', "scale='min(1080,iw)':-2", '-q:v', '3',
      path.join(dir, 'wedding-video-poster.jpg'),
    ], { stdio: 'inherit' });
    console.log('  ✓ public/video/wedding-video.mp4 + poster');
  } catch {
    console.error('ffmpeg failed or is not installed — video skipped.');
  }
}

console.log('\nDone. Update src/data/media.js if you added new gallery photos.');
