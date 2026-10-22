import { useEffect, useState } from 'react';
import { venue } from '../data/weddingData.js';
import { useMedia } from '../context/MediaContext.jsx';
import { IconArrowUp, IconMusicOff, IconMusicOn, IconPin, IconWhatsApp } from './Icons.jsx';
import { scrollToId } from './Navbar.jsx';

/**
 * Phones: a compact dock along the bottom edge (never covers content — the page
 * has matching bottom padding). Tablets/desktops: a small floating column.
 */
export function FloatingActions() {
  const { music, toggleMusic } = useMedia();
  const [showTop, setShowTop] = useState(false);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Music could not start by itself (opening skipped or autoplay blocked) → gentle hint.
  useEffect(() => {
    const needsTap = music.status === 'blocked' || (!music.on && music.status === 'idle');
    if (!needsTap) {
      setHint(false);
      return undefined;
    }
    const show = window.setTimeout(() => setHint(true), 1200);
    const hide = window.setTimeout(() => setHint(false), 11000);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, [music.status, music.on]);

  const playing = music.on && music.status !== 'blocked';
  const musicLabel = playing ? (music.ducked ? 'Music paused for the video' : 'Music On — tap to mute') : 'Music Off — tap to play';

  return (
    <div className="fab-wrap">
      {hint && (
        <button type="button" className="music-hint" onClick={toggleMusic}>
          <IconMusicOn /> Tap for music
        </button>
      )}
      <nav className="fab-dock" aria-label="Quick actions">
        <button
          type="button"
          className="fab fab-blessing"
          onClick={() => {
            scrollToId('blessings');
            window.setTimeout(() => document.getElementById('blessing-name')?.focus({ preventScroll: true }), 700);
          }}
        >
          <IconWhatsApp />
          <span className="fab-label">Blessings</span>
          <span className="fab-tip">Send blessings on WhatsApp</span>
        </button>
        <a className="fab fab-map" href={venue.mapsUrl} target="_blank" rel="noopener noreferrer">
          <IconPin />
          <span className="fab-label">Directions</span>
          <span className="fab-tip">Directions to {venue.name}</span>
        </a>
        <button
          type="button"
          className={`fab fab-music ${playing && !music.ducked ? 'is-playing' : ''}`}
          onClick={toggleMusic}
          aria-pressed={playing}
          aria-label={musicLabel}
        >
          {playing ? <IconMusicOn /> : <IconMusicOff />}
          <span className="fab-label" aria-hidden="true">
            {playing ? 'Music On' : 'Music Off'}
          </span>
          <span className="fab-tip" aria-hidden="true">
            {playing ? '🔊 Music On' : '🔇 Music Off'}
          </span>
          {playing && !music.ducked && (
            <span className="eq" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          )}
        </button>
        <button
          type="button"
          className={`fab fab-top ${showTop ? 'is-visible' : ''}`}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            history.replaceState(null, '', window.location.pathname + window.location.search);
          }}
          aria-label="Back to top"
          tabIndex={showTop ? 0 : -1}
        >
          <IconArrowUp />
          <span className="fab-label" aria-hidden="true">
            Top
          </span>
          <span className="fab-tip" aria-hidden="true">
            Back to top
          </span>
        </button>
      </nav>
    </div>
  );
}
