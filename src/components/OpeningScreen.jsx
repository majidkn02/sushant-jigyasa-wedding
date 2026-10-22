import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { invocation, coupleOrdered, wedding } from '../data/weddingData.js';
import { images } from '../data/media.js';
import { useMedia } from '../context/MediaContext.jsx';
import { prefersReducedMotion } from '../hooks/useMotion.js';
import { FloralCorner, Garland, Mandala } from './Ornaments.jsx';
import { Petals } from './Petals.jsx';
import { Img, Ribbon } from './ui.jsx';

/**
 * Ceremonial opening: Ganesh invocation → blessing → names → date → Enter.
 * Pressing “Enter the Celebration” starts the music (allowed because it is a
 * user tap), plays the mandala/petal reveal, then hands over to the site.
 */
export function OpeningScreen({ onReveal, onDone }) {
  const { startMusic } = useMedia();
  const [phase, setPhase] = useState('idle'); // idle | opening
  const rootRef = useRef(null);
  const contentRef = useRef(null);
  const buttonRef = useRef(null);
  const [groom, bride] = coupleOrdered;

  // Keep the couple's faces below the text on every screen height:
  // the sketch is scaled so its empty upper part sits behind the text.
  useLayoutEffect(() => {
    const root = rootRef.current;
    const content = contentRef.current;
    if (!root || !content) return undefined;
    const update = () => root.style.setProperty('--content-h', `${Math.ceil(content.offsetHeight)}px`);
    update();
    const ro = 'ResizeObserver' in window ? new ResizeObserver(update) : null;
    ro?.observe(content);
    window.addEventListener('resize', update);
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    buttonRef.current?.focus({ preventScroll: true });
  }, []);

  const enter = () => {
    if (phase !== 'idle') return;
    startMusic(); // inside the click → allowed by browsers
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect && rootRef.current) {
      rootRef.current.style.setProperty('--ox', `${rect.left + rect.width / 2}px`);
      rootRef.current.style.setProperty('--oy', `${rect.top + rect.height / 2}px`);
    }
    setPhase('opening');
    const reduced = prefersReducedMotion();
    window.setTimeout(() => onReveal?.(), reduced ? 0 : 450); // hero starts appearing as the circle opens
    window.setTimeout(onDone, reduced ? 250 : 1700);
  };

  return (
    <div
      ref={rootRef}
      className={`opening ${phase === 'opening' ? 'is-opening' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="opening-names"
    >
      <div className="opening-frame" aria-hidden="true" />
      <Garland className="opening-garland opening-garland-l" count={11} />
      <Garland className="opening-garland opening-garland-r" count={11} />

      <div className="opening-card">
        <FloralCorner className="corner corner-tl" />
        <FloralCorner className="corner corner-tr" />

        <div className="opening-content" ref={contentRef}>
          <img
            className="opening-ganesha"
            src={images.ganeshaMaroon.src}
            width={images.ganeshaMaroon.width}
            height={images.ganeshaMaroon.height}
            alt="Lord Ganesha"
            decoding="async"
            fetchPriority="high"
          />
          <p className="mantra" lang="hi">
            {invocation.mantra}
          </p>
          <p className="opening-grace">
            <span lang="hi" className="opening-grace-hi">
              {invocation.graceHindi}
            </span>
            <span className="opening-grace-en">{invocation.graceEnglish}</span>
          </p>
          <h1 id="opening-names" className="opening-names">
            <span>{groom.firstName}</span>
            <span className="amp" aria-label="and">
              &amp;
            </span>
            <span>{bride.firstName}</span>
          </h1>
          <Ribbon lang="hi" small className="opening-ribbon">
            शुभ विवाह
          </Ribbon>
          <p className="opening-date">
            <span>{wedding.dayName}</span>
            <strong>{wedding.displayDate}</strong>
          </p>
          <button ref={buttonRef} type="button" className="btn btn-primary btn-enter" onClick={enter}>
            <span className="btn-enter-shimmer" aria-hidden="true" />
            Enter the Celebration
          </button>
          <p className="opening-sound-note">Best enjoyed with sound on</p>
        </div>

        <Img image={images.sketch} sizes="(min-width: 640px) 600px, 100vw" eager className="opening-art" />
      </div>

      {phase === 'opening' && (
        <>
          <Mandala className="opening-mandala" />
          <Petals count={26} mode="burst" className="opening-petals" />
        </>
      )}
    </div>
  );
}
