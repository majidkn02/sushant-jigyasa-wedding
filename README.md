# Sushant & Jigyasa — Wedding Invitation Website

An interactive digital version of the Hindi wedding invitation card for
**Chi. Sushant Srivastava** and **Ayu. Jigyasa Chitranshi** —
Shubh Vivah on **Tuesday, 24 November 2026**, Virasat Marriage Hall, Barahi, Ghazipur.

Built with **React 19 + Vite**, deployed as a static site on **GitHub Pages**.
There is no server, no database, no API key and no secret anywhere in this project.

---

## 1. What the website contains

| Section | What it does |
|---|---|
| Opening screen | ॥ श्री गणेशाय नमः ॥, blessing, names, date and **Enter the Celebration**. Pressing it starts the music and plays the mandala / petal opening. |
| Hero | Wedding photo in a gold arch, date, venue, quick buttons |
| Invocation | The card's Hindi wording (स्नेही स्वजन…) with an English rendering, diyas and Mahadev's trishul |
| Groom → परिणय → Bride | Portraits, Hindi & English names, parents and grandparents from the card. The lake watercolour joins the two (like the card's “परिणय” ribbon). |
| Countdown | Days / hours / minutes / seconds to 24 Nov 2026. Never negative — changes to a celebration message on and after the day. |
| वैवाहिक कार्यक्रम | Haldi · Sangeet · Shubh Vivah · Vadhu Aagman (doli) · Bahubhoj — tap a card for details and **Add to calendar** |
| Shubh Vivah day | 24 November highlight with the **Baraat** (2:00 PM, Janta Medical Hall, Karhan, Mau → Virasat Marriage Hall) |
| Film | The wedding video: loads only when you scroll near it, plays muted automatically, Play / Pause / Mute / Unmute / Full screen |
| Our Beginning | Gallery (the sofa illustration + any extra photos you add). Every photo on the page opens in the same viewer. |
| Venue | Address, **Get Directions**, and the location **QR code** (“Scan for Directions”) |
| Families | Both families + प्रेषक / विनीत / स्वागताकांक्षी / दर्शनाभिलाषी, and **View Original Invitation** |
| Send Your Blessings | Name + message → opens **WhatsApp** to the family with the formatted blessing |
| Share | Share sheet, Share on WhatsApp, Copy Link, Add all ceremonies to calendar |
| Floating actions | Blessings, Directions, Music On/Off, Back to top (bottom bar on phones, floating buttons on desktop) |

Features carried over from the first website (shushant): blessing form with
WhatsApp / endpoint / local modes, share sheet + WhatsApp share + copy-link
fallback, Google Calendar + .ics download, Maps link, contact (call) buttons,
music toggle, gallery + lightbox with keyboard and focus trap, opening screen
that is skipped when you come back in the same tab or open a `#section` link,
skip-link, reveal-on-scroll, button ripple, petals, reduced-motion support.

---

## 2. Local development

You need **Node.js 20.19 or newer** (Vite 7 requirement) — https://nodejs.org → “LTS”.

```bash
node --version      # must print v20.19.0 or higher (v22 recommended)
npm install         # one time: downloads React and Vite into node_modules/
npm run dev         # starts the local site, usually at http://localhost:5173
```

Changes you save appear instantly in the browser.

## 3. Production build

```bash
npm run build       # creates the finished website in dist/
npm run preview     # serves dist/ locally so you can check the real build
```

`dist/` uses only relative paths (`base: './'` in `vite.config.js`), so it works under
any GitHub Pages repository name, e.g. `https://USERNAME.github.io/REPOSITORY/`.

---

## 4. GitHub deployment (recommended: GitHub Actions)

GitHub builds and publishes the site for you — no need to build on your computer.

1. **Create a NEW GitHub repository** (do not reuse `shushant`), e.g. `sushant-jigyasa`.
   Keep it Public (GitHub Pages on the free plan needs a public repository).
2. **Upload / push the complete SOURCE project** (the contents of
   `sushant-jigyasa-wedding-source-final.zip`):
   `.github/`, `build/`, `public/`, `scripts/`, `src/`, `.gitignore`, `index.html`,
   `package.json`, `README.md`, `vite.config.js`.
   *Web upload:* “Add file → Upload files”, drag everything in, “Commit changes”.
   Check afterwards that **`.github/workflows/deploy.yml`** is in the repository —
   some computers hide folders starting with a dot. If it is missing:
   “Add file → Create new file”, name it `.github/workflows/deploy.yml`, paste its contents, commit.
3. **Do not upload `node_modules`** (or `dist`) — GitHub creates them itself.
4. Open the repository → **Settings → Pages**.
5. Under **Build and deployment → Source**, select **GitHub Actions**.
6. **Push to `main`** (any commit — e.g. the upload itself, or edit README and commit).
   You can also start it manually: **Actions → Deploy to GitHub Pages → Run workflow**.
7. **Wait for the deployment workflow**: Actions tab → the run turns green ✓ after ~1–2 minutes
   (steps: install → `npm run build` → upload `dist` → deploy).
   If it turns red, open it to see which step failed.
8. **Open the generated GitHub Pages URL**: shown in the finished run and in
   Settings → Pages, normally `https://USERNAME.github.io/REPOSITORY/`.

### Then set the final address (once)

Edit `src/data/weddingData.js` → `site.url`:

```js
url: 'https://USERNAME.github.io/REPOSITORY/',
```

Commit — the site rebuilds automatically. This single value updates the WhatsApp /
Facebook link-preview image, the canonical link and the link used by “Copy Link” /
“Share”. Everything else already works before this is set.

### Alternative: upload a pre-built `dist`

Run `npm run build`, upload the **contents** of `dist/` (including the empty `.nojekyll`)
to the repository root, then Settings → Pages → Source: **Deploy from a branch** → `main` / `(root)`.
(With this method, rebuild and re-upload after every change.)

---

## 5. Where to update things

| What | File → setting |
|---|---|
| Final website URL | `src/data/weddingData.js` → `site.url` |
| WhatsApp number (blessings) | `src/data/weddingData.js` → `blessings.whatsappNumber` |
| Venue name / address | `src/data/weddingData.js` → `venue` |
| Google Maps link | `src/data/weddingData.js` → `venue.mapsUrl` (QR image: `public/images/qr/venue-qr.png`) |
| Bride / groom names & families | `src/data/weddingData.js` → `couple.bride`, `couple.groom`, `hosts` |
| Ceremonies (dates, times, venues) | `src/data/weddingData.js` → `ceremonies`; Baraat → `baraat` |
| Countdown & messages | `src/data/weddingData.js` → `wedding` |
| Gallery photos | `public/images/gallery/` + `src/data/media.js` → `gallery` |
| Bride / groom illustrations | `src/data/media.js` → `toons` |
| Music | `public/audio/wedding-song.mp3` or `src/data/media.js` → `music` |
| Video | `public/video/wedding-video.mp4` (+ poster) or `src/data/media.js` → `video` |
| Call buttons (off) | `src/data/weddingData.js` → `contacts` |

Details for each are below.

## 6. Where everything is

```
public/                      ← files served as-is
  images/bride/              bride-wedding-480/800/940.webp
  images/groom/              groom-wedding-480/800/940.webp
  images/couple/             couple-wedding-*, couple-watercolor-lake-*,
                             couple-toon-sofa-*, couple-watercolor-sketch-*
  images/invitation/         invitation-card-800/1086.webp
  images/qr/venue-qr.png     location QR (lossless)
  images/decorative/         ganesha-maroon.webp
  images/gallery/            (empty — for extra photos)
  audio/wedding-song.mp3     background music
  video/wedding-video.mp4    wedding film (H.264) + wedding-video-poster.jpg
  og-image.jpg               link-preview image (1200×630)
src/
  data/weddingData.js        ★ ALL wedding text: names, dates, venue, WhatsApp, etc.
  data/media.js              ★ ALL photo / video / music paths
  components/                one file per section
  context/MediaContext.jsx   music ↔ video coordination
  lib/                       WhatsApp, share, calendar, music engine
  styles/                    tokens.css (colours/fonts), sections, opening, …
  assets/fonts/              self-hosted fonts (Open Font License)
scripts/optimize-media.mjs   optional: re-create optimised images / video
.github/workflows/deploy.yml GitHub Pages deployment
```

---

## 7. Replacing photos

Easiest: replace the file in `public/images/...` with a new one **with exactly the same
name** (e.g. `bride-wedding-800.webp`). Replace all sizes of that photo.

To generate the sizes automatically:

1. Put the original in `media-originals/` named e.g. `bride-wedding.jpg`
   (names are listed at the top of `scripts/optimize-media.mjs`).
2. `npm install --no-save sharp` then `npm run media`.

If a face is cropped awkwardly, change `position` for that photo in
`src/data/media.js` (e.g. `'50% 20%'` = centre horizontally, 20 % from the top).

**Adding gallery photos:** put files in `media-originals/gallery/`, run `npm run media`,
then add one line per photo to `gallery` in `src/data/media.js`
(an example line is written there). They appear in “Our Beginning” and the viewer.

**Separate bride / groom illustrations:** create them like any photo and set
`toons.bride` / `toons.groom` in `src/data/media.js` — they then appear directly
below the bride / groom portraits.

## 8. Replacing the video

Replace `public/video/wedding-video.mp4` (keep the name). It must be **H.264 MP4** to play
on every phone and browser, and below 25 MB for GitHub's web uploader.
With FFmpeg installed, put the original at `media-originals/wedding-video.mp4` and run
`npm run media` — it converts it (1080×1080 H.264) and makes a new poster image.
Change looping or the title in `video` in `src/data/media.js`.

## 9. Replacing the music

Replace `public/audio/wedding-song.mp3` (keep the name), or change `music.src` in
`src/data/media.js`. Any length works — the end crossfades smoothly into the beginning.
`volume` (0–1) and `loopCrossfade` (seconds) are in the same place.
Browsers only allow sound after a tap, so music starts on **Enter the Celebration**;
if a visitor skips that (e.g. opens a `#venue` link), a “Tap for music” button appears.

## 10. Updating wedding details

Everything is in **`src/data/weddingData.js`**: names (English & Hindi), parents,
grandparents, ceremonies, dates, hosts, venue, baraat, countdown target and messages.
Ceremony **time** and **venue** are empty because the card does not print them — fill
them in (e.g. `time: '18:00'`, `venue: 'Hall, Town'`) and they appear automatically.
The Bahubhoj venue is intentionally empty until confirmed.

## 11. Changing the WhatsApp number

`src/data/weddingData.js` → `blessings.whatsappNumber` — country code + number, digits only
(currently `917266061352`). The number is never shown on the page.
`blessings.mode` can be `'whatsapp'` (default), `'endpoint'` (POST to your own form
service) or `'local'` (saved only in the visitor's browser, like the first site).

## 12. Changing the venue / map

`src/data/weddingData.js` → `venue` (name, landmark, address lines, `mapsUrl`).
`mapsUrl` is the link decoded from the supplied QR code
(`https://maps.app.goo.gl/ny52o1e2sX1kT6Sc9`). If you change the QR image
(`public/images/qr/venue-qr.png`), update `mapsUrl` to match.

**Call buttons:** `contacts` in the same file — set `enabled: true` and add
`{ name, description, phone }` entries. They are switched off for now.

## 13. Integrations & environment variables

| Integration | How | Keys needed |
|---|---|---|
| WhatsApp blessings & sharing | `wa.me` links | none |
| Google Maps directions | public link from the QR | none |
| Google Calendar / .ics | generated links / file | none |
| Share sheet / copy link | browser built-ins | none |
| Optional blessing endpoint | `blessings.endpoint` (e.g. a Formspree URL) | none in code |

**No environment variables are required.** Nothing secret is stored in the project.

---

### Fonts

Cormorant Garamond (headings), Mukta (body) and Tiro Devanagari Hindi (mantras & Hindi)
are self-hosted in `src/assets/fonts` (SIL Open Font License, licence files included).
To change fonts, replace the files / names in `src/styles/fonts.css` and the
`--font-*` variables in `src/styles/tokens.css`.

### Accessibility & motion

Semantic sections, alt text on all photos, keyboard-operable viewer with focus trap,
visible focus rings, accessible labels on icon buttons, and a still version of the site
for visitors who turn on “Reduce motion”.
