import { closing, coupleOrdered, invocation, wedding } from '../data/weddingData.js';
import { images } from '../data/media.js';
import { Petals } from './Petals.jsx';
import { Img, Reveal } from './ui.jsx';

/** Closing composition — the watercolour sketch returns, bookending the opening. */
export function Footer() {
  const [groom, bride] = coupleOrdered;
  return (
    <footer className="closing" aria-labelledby="closing-title">
      <Petals count={12} />
      <div className="closing-card">
        <Reveal className="closing-content">
          <img
            className="closing-ganesha"
            src={images.ganeshaMaroon.src}
            width={images.ganeshaMaroon.width}
            height={images.ganeshaMaroon.height}
            alt=""
            loading="lazy"
            decoding="async"
          />
          <p className="mantra mantra-sm" lang="hi">
            {invocation.closingHindi}
          </p>
          <h2 id="closing-title" className="closing-names">
            {groom.firstName} <span className="amp">&amp;</span> {bride.firstName}
          </h2>
          <p className="closing-date">
            {wedding.dayName} · {wedding.displayDate}
          </p>
          <p className="closing-line">{closing.line}</p>
          <p className="closing-sign">{closing.signOff}</p>
        </Reveal>
        <Img image={images.sketch} sizes="(min-width: 640px) 560px, 100vw" className="closing-art" alt="" />
      </div>
      <p className="credit">Made with love for {groom.firstName} &amp; {bride.firstName} · 2026</p>
    </footer>
  );
}
