import { useEffect, useRef } from 'react';
import { coupleOrdered, wedding, venue, invocation } from '../data/weddingData.js';
import { images } from '../data/media.js';
import { usePhotos } from '../context/PhotoContext.jsx';
import { isLowPowerDevice, prefersReducedMotion } from '../hooks/useMotion.js';
import { FloralCorner, Lotus, Mandala } from './Ornaments.jsx';
import { Petals } from './Petals.jsx';
import { Img, Reveal } from './ui.jsx';
import { IconExpand } from './Icons.jsx';
import { scrollToId } from './Navbar.jsx';

export function Hero({ justOpened }) {
  const [groom, bride] = coupleOrdered;
  const { openPhoto } = usePhotos();
  const frameRef = useRef(null);

  // Subtle parallax on the photo (desktop / capable devices only).
  useEffect(() => {
    const el = frameRef.current;
    if (!el || prefersReducedMotion() || isLowPowerDevice()) return undefined;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 800);
        el.style.setProperty('--parallax', `${y * 0.06}px`);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true">
        <Mandala className="hero-mandala" />
      </div>
      {justOpened && <Petals count={14} className="hero-petals" />}
      <div className="container hero-grid">
        <div className="hero-copy">
          <Reveal as="p" className="mantra mantra-sm" lang="hi" delay={100}>
            {invocation.mantra}
          </Reveal>
          <Reveal as="p" className="kicker" delay={200}>
            Together with their families
          </Reveal>
          <Reveal as="h1" id="hero-title" className="hero-names" delay={300}>
            <span className="hero-name">{groom.firstName}</span>
            <span className="hero-amp" aria-hidden="true">
              &amp;
            </span>
            <span className="sr-only"> and </span>
            <span className="hero-name">{bride.firstName}</span>
          </Reveal>
          <Reveal as="p" className="hero-sub" delay={420}>
            invite you to celebrate their <em>Shubh Vivah</em>
          </Reveal>
          <Reveal className="hero-date" delay={520}>
            <Lotus className="hero-lotus" />
            <p>
              <span className="hero-day">{wedding.dayName}</span>
              <strong>{wedding.displayDate}</strong>
              <span className="hero-place">
                {venue.name} · {venue.addressLines[0]}
              </span>
            </p>
          </Reveal>
          <Reveal className="hero-actions" delay={640}>
            <a className="btn btn-primary" href="#celebrations" onClick={(e) => (e.preventDefault(), scrollToId('celebrations'))}>
              View the Celebrations
            </a>
            <a className="btn btn-outline" href="#venue" onClick={(e) => (e.preventDefault(), scrollToId('venue'))}>
              Venue &amp; Directions
            </a>
          </Reveal>
        </div>

        <Reveal className="hero-visual" variant="scale" delay={200}>
          <div className="arch-frame hero-frame" ref={frameRef}>
            <button type="button" className="photo-btn" onClick={() => openPhoto(images.coupleWedding)} aria-label="Open photo of Sushant and Jigyasa">
              <Img
                image={images.coupleWedding}
                eager
                sizes="(min-width: 1024px) 540px, (min-width: 640px) 80vw, 92vw"
                className="hero-photo"
              />
              <span className="photo-zoom" aria-hidden="true">
                <IconExpand />
              </span>
            </button>
            <FloralCorner className="corner corner-bl" />
            <FloralCorner className="corner corner-br" />
          </div>
        </Reveal>
      </div>
      <a className="scroll-cue" href="#blessing" onClick={(e) => (e.preventDefault(), scrollToId('blessing'))}>
        <span>Scroll</span>
        <span className="scroll-cue-line" aria-hidden="true" />
      </a>
    </header>
  );
}
