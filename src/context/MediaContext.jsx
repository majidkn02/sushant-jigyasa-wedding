import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { MusicEngine } from '../lib/musicEngine.js';
import { music } from '../data/media.js';

/**
 * Coordinates background music and the wedding video so they never play sound
 * at the same time:
 *   video unmuted & playing → music fades out
 *   video muted / paused / ended / scrolled away → music returns to the visitor's choice
 */
const MediaCtx = createContext(null);

export function MediaProvider({ children }) {
  const engineRef = useRef(null);
  if (!engineRef.current) {
    engineRef.current = new MusicEngine({
      src: music.src,
      volume: music.volume,
      crossfade: music.loopCrossfade,
    });
  }
  const engine = engineRef.current;
  const [state, setState] = useState({ status: 'idle', on: false, ducked: false });

  useEffect(() => engine.subscribe(setState), [engine]);

  // Pause politely when the visitor switches tab / locks the phone.
  useEffect(() => {
    const onVis = () => engine.setHidden(document.visibilityState === 'hidden');
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, [engine]);

  const startMusic = useCallback(() => engine.start(), [engine]);
  const toggleMusic = useCallback(() => engine.toggle(), [engine]);
  const setVideoAudible = useCallback((audible) => engine.setDucked(audible), [engine]);

  const value = useMemo(
    () => ({ music: state, startMusic, toggleMusic, setVideoAudible }),
    [state, startMusic, toggleMusic, setVideoAudible],
  );
  return <MediaCtx.Provider value={value}>{children}</MediaCtx.Provider>;
}

export function useMedia() {
  const ctx = useContext(MediaCtx);
  if (!ctx) throw new Error('useMedia must be used inside <MediaProvider>');
  return ctx;
}
