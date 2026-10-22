import { useEffect, useRef, useState } from 'react';
import { site } from '../data/weddingData.js';
import { canNativeShare, copyText, invitationUrl, nativeShare } from '../lib/share.js';
import { shareWhatsAppUrl } from '../lib/whatsapp.js';
import { downloadIcs } from '../lib/calendar.js';
import { Reveal, SectionHead } from './ui.jsx';
import { IconCalendar, IconLink, IconShare, IconWhatsApp } from './Icons.jsx';

/** Share the invitation (native share sheet / WhatsApp / copy link) + calendar. */
export function ShareInvite() {
  const [native, setNative] = useState(false);
  const [toast, setToast] = useState('');
  const timer = useRef(0);

  useEffect(() => {
    setNative(canNativeShare());
    return () => window.clearTimeout(timer.current);
  }, []);

  const flash = (text) => {
    setToast(text);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(''), 2800);
  };

  const copy = async () => {
    const ok = await copyText(invitationUrl());
    flash(ok ? 'Invitation link copied' : 'Could not copy — please copy the address bar link');
  };

  const share = async () => {
    const r = await nativeShare();
    if (r === 'failed' || r === 'unsupported') copy();
  };

  return (
    <section className="section share" id="share" aria-labelledby="share-title">
      <div className="container narrow center">
        <SectionHead id="share-title" kicker="Spread the joy" title="Share the Invitation" ribbon={false} />
        <Reveal className="share-actions">
          {native && (
            <button type="button" className="btn btn-primary" onClick={share}>
              <IconShare /> Share
            </button>
          )}
          <a
            className="btn btn-whatsapp"
            href={shareWhatsAppUrl(site.shareText, invitationUrl())}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconWhatsApp /> Share on WhatsApp
          </a>
          <button type="button" className="btn btn-outline" onClick={copy}>
            <IconLink /> Copy Link
          </button>
          <button type="button" className="btn btn-outline" onClick={() => downloadIcs()}>
            <IconCalendar /> Add to Calendar
          </button>
        </Reveal>
        <p className={`toast ${toast ? 'is-visible' : ''}`} role="status" aria-live="polite">
          {toast}
        </p>
      </div>
    </section>
  );
}
