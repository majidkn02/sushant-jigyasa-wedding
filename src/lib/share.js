import { site } from '../data/weddingData.js';

/** The invitation link: the configured site URL, or the current page without a #hash. */
export function invitationUrl() {
  if (site.url) return site.url;
  if (typeof window === 'undefined') return '';
  return window.location.href.split('#')[0];
}

/** Copies text, with a fallback for older browsers / non-secure contexts. Returns true on success. */
export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'fixed';
    el.style.opacity = '0';
    document.body.appendChild(el);
    el.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch {
      ok = false;
    }
    el.remove();
    return ok;
  }
}

export const canNativeShare = () => typeof navigator !== 'undefined' && typeof navigator.share === 'function';

/** Opens the phone's share sheet. Returns 'shared' | 'cancelled' | 'unsupported' | 'failed'. */
export async function nativeShare() {
  if (!canNativeShare()) return 'unsupported';
  try {
    await navigator.share({ title: site.title, text: site.shareText, url: invitationUrl() });
    return 'shared';
  } catch (err) {
    return err?.name === 'AbortError' ? 'cancelled' : 'failed';
  }
}
