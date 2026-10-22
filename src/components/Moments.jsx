import { moments } from '../data/media.js';
import { usePhotos } from '../context/PhotoContext.jsx';
import { FloralCorner } from './Ornaments.jsx';
import { Img, Reveal, SectionHead } from './ui.jsx';
import { IconExpand } from './Icons.jsx';

/**
 * “Our Beginning” — gallery of photos that are not shown elsewhere on the page.
 * Add more photos in src/data/media.js → `gallery` and they appear here
 * (and in the viewer) automatically. Every photo on the page opens the same viewer.
 */
export function Moments() {
  const { openPhoto } = usePhotos();
  const [feature, ...rest] = moments;
  return (
    <section className="section moments" id="gallery" aria-labelledby="gallery-title">
      <div className="container">
        <SectionHead
          id="gallery-title"
          hindi="हमारी शुरुआत"
          title="Our Beginning"
          intro="Every photograph on this page opens in the viewer — swipe through all of them."
        />
        <div className={`moments-layout ${rest.length ? 'has-grid' : ''}`}>
          {feature && (
            <Reveal className="moments-feature" variant="scale">
              <div className="polaroid-stack" aria-hidden="true">
                <span />
                <span />
              </div>
              <button type="button" className="photo-btn polaroid" onClick={() => openPhoto(feature)} aria-label="Open illustration of Sushant and Jigyasa">
                <Img image={feature} sizes="(min-width: 1024px) 440px, 80vw" />
                <span className="polaroid-caption">Together, always</span>
                <span className="photo-zoom" aria-hidden="true">
                  <IconExpand />
                </span>
              </button>
              <FloralCorner className="corner corner-tl" />
            </Reveal>
          )}
          {rest.length > 0 && (
            <ul className="moments-grid">
              {rest.map((img, i) => (
                <Reveal as="li" key={img.src} delay={(i % 3) * 80} variant="up">
                  <button type="button" className="photo-btn moments-item" onClick={() => openPhoto(img)} aria-label={`Open photo: ${img.alt}`}>
                    <Img image={img} sizes="(min-width: 1024px) 300px, 45vw" />
                  </button>
                </Reveal>
              ))}
            </ul>
          )}
          <Reveal className="moments-copy" delay={120}>
            <p className="moments-quote">
              Two families, one celebration — and a lifetime of togetherness beginning on <strong>24 November 2026</strong>.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
