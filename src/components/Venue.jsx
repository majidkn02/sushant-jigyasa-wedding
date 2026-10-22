import { venue, baraat, invocation } from '../data/weddingData.js';
import { images } from '../data/media.js';
import { Garland } from './Ornaments.jsx';
import { Reveal, SectionHead } from './ui.jsx';
import { IconPin } from './Icons.jsx';

/** Venue with the supplied location QR (no overlays, never smaller than 220px). */
export function Venue() {
  return (
    <section className="section section-maroon venue" id="venue" aria-labelledby="venue-title">
      <Garland className="venue-garland venue-garland-l" count={10} />
      <Garland className="venue-garland venue-garland-r" count={10} />
      <div className="container">
        <SectionHead id="venue-title" hindi={invocation.venueHindi} title="The Venue" light />
        <div className="venue-grid">
          <Reveal className="venue-info" variant="left">
            <p className="kicker is-light">Shubh Vivah · 24 November 2026</p>
            <h3 className="venue-name">{venue.name}</h3>
            <address className="venue-address">
              {venue.landmark}
              {venue.addressLines.map((line) => (
                <span key={line}>
                  <br />
                  {line}
                </span>
              ))}
            </address>
            <a className="btn btn-gold" href={venue.mapsUrl} target="_blank" rel="noopener noreferrer">
              <IconPin /> Get Directions
            </a>
            <p className="venue-note">{venue.mapsNote}</p>
            <p className="venue-baraat">
              The Baraat leaves <strong>{baraat.from}</strong> at <strong>{baraat.displayTime}</strong>.
            </p>
          </Reveal>
          <Reveal className="qr-card" variant="right" delay={120}>
            <p className="qr-title">Scan for Directions</p>
            <a className="qr-link" href={venue.mapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Open directions in Google Maps">
              <img
                className="qr-img"
                src={images.venueQr.src}
                width={images.venueQr.width}
                height={images.venueQr.height}
                alt={images.venueQr.alt}
                loading="lazy"
                decoding="async"
              />
            </a>
            <p className="qr-sub">Point your phone camera at the code</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
