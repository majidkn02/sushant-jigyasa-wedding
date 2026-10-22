import { useCallback, useEffect, useRef, useState } from 'react';
import { video } from '../data/media.js';
import { useMedia } from '../context/MediaContext.jsx';
import { prefersReducedMotion } from '../hooks/useMotion.js';
import { FloralCorner } from './Ornaments.jsx';
import { Reveal, SectionHead } from './ui.jsx';
import { IconMute, IconPause, IconPlay, IconVolume, IconExpand } from './Icons.jsx';

/**
 * Cinematic film section.
 *  • The file is only requested when the section comes near the screen.
 *  • Autoplays muted & inline when half visible; pauses when scrolled away.
 *  • Unmuting fades the background music out; muting/pausing/leaving brings it back.
 */
export function VideoSection() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const userPaused = useRef(false);
  const { setVideoAudible } = useMedia();
  const [load, setLoad] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  // 1) lazy-load when within ~1 screen; 2) autoplay / pause by visibility
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !('IntersectionObserver' in window)) {
      setLoad(true);
      return undefined;
    }
    const near = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoad(true);
          near.disconnect();
        }
      },
      { rootMargin: '600px 0px' },
    );
    const seen = new IntersectionObserver(
      (entries) => entries.forEach((e) => setVisible(e.intersectionRatio >= 0.45)),
      { threshold: [0, 0.45, 0.8] },
    );
    near.observe(el);
    seen.observe(videoRef.current ?? el);
    return () => {
      near.disconnect();
      seen.disconnect();
    };
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !load) return;
    if (visible) {
      if (!userPaused.current && !prefersReducedMotion()) {
        v.play().catch(() => setPlaying(false));
      }
    } else if (!v.paused) {
      v.pause();
    }
  }, [visible, load]);

  // Tell the music engine whether the film is making sound.
  useEffect(() => {
    setVideoAudible(playing && !muted);
  }, [playing, muted, setVideoAudible]);
  useEffect(() => () => setVideoAudible(false), [setVideoAudible]);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (!load) setLoad(true);
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  }, [load]);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted && v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    }
  }, []);

  const fullscreen = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.requestFullscreen) v.requestFullscreen().catch(() => {});
    else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen();
  };

  const seek = (e) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - rect.left) / rect.width) * v.duration;
  };

  return (
    <section ref={sectionRef} className="section section-dark film" id="film" aria-labelledby="film-title">
      <div className="container">
        <SectionHead id="film-title" hindi="हमारी कहानी" kicker="A short film" title="Moments of Us" light />
        <Reveal className="film-stage" variant="scale">
          <FloralCorner className="corner corner-tl" />
          <FloralCorner className="corner corner-tr" />
          <FloralCorner className="corner corner-bl" />
          <FloralCorner className="corner corner-br" />
          <div className={`film-frame ${playing ? 'is-playing' : ''}`}>
            <video
              ref={videoRef}
              className="film-video"
              poster={load ? video.poster : undefined}
              src={load ? video.src : undefined}
              width={video.width}
              height={video.height}
              muted
              playsInline
              loop={video.loop}
              preload="none"
              aria-label={video.title}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => {
                setPlaying(false);
                setVideoAudible(false);
              }}
              onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
              onTimeUpdate={(e) => {
                const v = e.currentTarget;
                if (v.duration) setProgress(v.currentTime / v.duration);
              }}
              onClick={togglePlay}
            />
            {!playing && (
              <button type="button" className="film-big-play" onClick={togglePlay} aria-label="Play the film">
                <IconPlay />
              </button>
            )}
            <div className="film-controls">
              <button type="button" className="film-btn" onClick={togglePlay} aria-label={playing ? 'Pause video' : 'Play video'}>
                {playing ? <IconPause /> : <IconPlay />}
              </button>
              <div
                className="film-progress"
                onClick={seek}
                role="progressbar"
                aria-label="Video progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress * 100)}
              >
                <span style={{ transform: `scaleX(${progress})` }} />
              </div>
              <button
                type="button"
                className={`film-btn film-sound ${muted ? '' : 'is-on'}`}
                onClick={toggleMute}
                aria-label={muted ? 'Unmute video' : 'Mute video'}
                aria-pressed={!muted}
              >
                {muted ? <IconMute /> : <IconVolume />}
                <span className="film-sound-label">{muted ? 'Unmute' : 'Mute'}</span>
              </button>
              <button type="button" className="film-btn" onClick={fullscreen} aria-label="Full screen">
                <IconExpand />
              </button>
            </div>
          </div>
          <p className="film-note">
            {muted ? 'Playing silently — tap Unmute to hear it. Background music pauses while the film has sound.' : 'Background music is paused while the film plays with sound.'}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
