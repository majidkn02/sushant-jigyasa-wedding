/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  MEDIA CONFIGURATION — every photo, the video and the music live here.
 *  Files are in /public, so paths are relative ("images/…") and work on
 *  GitHub Pages under any repository name.
 *
 *  To replace a file: overwrite it in /public with the SAME name, or change
 *  the path below. See README → "Replacing photos / video / music".
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Builds a responsive image description from a base name and the widths that exist on disk. */
const responsive = (folder, base, widths, { alt, width, height, position = 'center' }) => {
  const largest = widths[widths.length - 1];
  return {
    src: `${folder}/${base}-${largest}.webp`,
    srcSet: widths.map((w) => `${folder}/${base}-${w}.webp ${Math.min(w, width)}w`).join(', '),
    width,
    height,
    alt,
    position, // CSS object-position — keeps faces in frame when cropped
  };
};

const I = 'images';

export const images = {
  /** Opening & closing: watercolour sketch with the empty upper area */
  sketch: responsive(`${I}/couple`, 'couple-watercolor-sketch', [640, 1024], {
    alt: 'Watercolour sketch of Sushant and Jigyasa smiling together',
    width: 1024,
    height: 1536,
    position: '50% 100%',
  }),
  /** Hero, Shubh Vivah highlight & social preview */
  coupleWedding: responsive(`${I}/couple`, 'couple-wedding', [640, 1024, 1448], {
    alt: 'Sushant and Jigyasa seated together in their wedding attire with flower garlands',
    width: 1448,
    height: 1086,
    position: '50% 30%',
  }),
  groom: responsive(`${I}/groom`, 'groom-wedding', [480, 800, 940], {
    alt: 'Sushant in an ivory sherwani with a red and white flower garland',
    width: 940,
    height: 1673,
    position: '50% 18%',
  }),
  bride: responsive(`${I}/bride`, 'bride-wedding', [480, 800, 940], {
    alt: 'Jigyasa in a red bridal saree with a flower garland and mehendi',
    width: 940,
    height: 1674,
    position: '50% 18%',
  }),
  /** Parinay connector between the Groom and Bride sections */
  lakeWatercolor: responsive(`${I}/couple`, 'couple-watercolor-lake', [640, 1000, 1254], {
    alt: 'Watercolour painting of Sushant and Jigyasa standing by a lake with mountains',
    width: 1254,
    height: 1254,
    position: '50% 40%',
  }),
  /** Our Beginning / gallery feature */
  sofaToon: responsive(`${I}/couple`, 'couple-toon-sofa', [640, 1086], {
    alt: 'Illustration of Jigyasa in a maroon saree and Sushant in a lavender shirt seated side by side',
    width: 1086,
    height: 1448,
    position: '50% 35%',
  }),
  invitationCard: responsive(`${I}/invitation`, 'invitation-card', [800, 1086], {
    alt: 'The original Hindi wedding invitation card of Sushant and Jigyasa',
    width: 1086,
    height: 1448,
  }),
  venueQr: {
    src: `${I}/qr/venue-qr.png`,
    width: 500,
    height: 500,
    alt: 'QR code — scan to open directions to Virasat Marriage Hall in Google Maps',
  },
  ganeshaMaroon: { src: `${I}/decorative/ganesha-maroon.webp`, width: 449, height: 578 },
};

/**
 * Optional individual illustrations shown directly BELOW the bride / groom
 * portraits. Set to e.g.
 *   responsive(`${I}/bride`, 'bride-toon', [640, 1000], { alt: '…', width: 1000, height: 1250 })
 * once the files exist. While null, nothing is shown.
 */
export const toons = {
  groom: null,
  bride: null,
};

/**
 * Extra gallery photos. Add one line per photo after placing the files in
 * public/images/gallery (run `npm run media` to create the 640/1280 versions):
 *   responsive(`${I}/gallery`, 'haldi-01', [640, 1280], { alt: 'Haldi ceremony', width: 1280, height: 960 }),
 */
export const gallery = [];

/** Photos that appear in the "Moments" section (no photo is repeated on the page). */
export const moments = [images.sofaToon, ...gallery];

export const video = {
  src: 'video/wedding-video.mp4',
  poster: 'video/wedding-video-poster.jpg',
  width: 1080,
  height: 1080,
  title: 'Sushant & Jigyasa — a short film',
  loop: true,
};

export const music = {
  /** Replace this file to change the song. Any length works; the loop is crossfaded. */
  src: 'audio/wedding-song.mp3',
  volume: 0.5,
  /** Seconds of crossfade where the song loops back to its start. */
  loopCrossfade: 2.5,
};
