/**
 * Build-time helpers for index.html, used by vite.config.js.
 *
 * 1. Fills <head> (title, description, Open Graph / WhatsApp preview tags,
 *    canonical) from src/data/weddingData.js → `site`, so the final website
 *    address is changed in ONE place: site.url.
 * 2. Production safety net for GitHub Pages sub-folders
 *    (https://USERNAME.github.io/REPOSITORY/): any root-relative path such as
 *    "/favicon-32.png" left in the built HTML is rewritten to "./favicon-32.png".
 *    Vite already does this for public files when base is './'; this guarantees it.
 */
import { site } from '../src/data/weddingData.js';

const HEAD_TOKEN = '<!-- wedding:head-meta -->';
const NOSCRIPT_TOKEN = '<!-- wedding:noscript-text -->';

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Normalised site URL with a trailing slash, or '' when not configured yet. */
export function siteUrl() {
  const url = (site.url || '').trim();
  return url ? url.replace(/\/?$/, '/') : '';
}

export function buildHeadTags() {
  const url = siteUrl();
  // Link previews need an absolute image URL; until site.url is set a relative path is used.
  const image = url ? `${url}${site.ogImage}` : site.ogImage;
  const tags = [
    `<title>${esc(site.title)}</title>`,
    `<meta name="description" content="${esc(site.description)}" />`,
    `<meta name="theme-color" content="${esc(site.themeColor)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Sushant &amp; Jigyasa" />`,
    `<meta property="og:title" content="${esc(site.title)}" />`,
    `<meta property="og:description" content="${esc(site.description)}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(site.ogImageAlt)}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(site.title)}" />`,
    `<meta name="twitter:description" content="${esc(site.description)}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,
    `<meta name="twitter:image:alt" content="${esc(site.ogImageAlt)}" />`,
  ];
  if (url) {
    tags.push(`<link rel="canonical" href="${esc(url)}" />`, `<meta property="og:url" content="${esc(url)}" />`);
  }
  return tags.join('\n    ');
}

/** Rewrites href="/x" and src="/x" (but not "//cdn…") to "./x". */
export function makeRootPathsRelative(html) {
  return html.replace(/\b(href|src)="\/(?!\/)/g, '$1="./');
}

/** @param {{ build?: boolean }} opts  build: true → also apply the GitHub Pages path safety net */
export function transformHtml(html, { build = false } = {}) {
  let out = html.replace(HEAD_TOKEN, buildHeadTags()).replace(NOSCRIPT_TOKEN, esc(site.description));
  if (build) out = makeRootPathsRelative(out);
  return out;
}
