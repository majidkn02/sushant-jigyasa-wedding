import { baraat, ceremonies, venue, wedding } from '../data/weddingData.js';
import { googleCalendarUrl } from '../lib/calendar.js';
import { useInView } from '../hooks/useInView.js';
import { CeremonyIcon, Diya, FloralCorner } from './Ornaments.jsx';
import { Petals } from './Petals.jsx';
import { Reveal, Ribbon } from './ui.jsx';
import { IconCalendar, IconPin } from './Icons.jsx';

const vivah = ceremonies.find((c) => c.id === 'shubh-vivah');

/** 24 November — the wedding day, with the Baraat journey as part of it. */
export function WeddingHighlight() {
  const [ref, inView] = useInView({ threshold: 0.3 });
  return (
    <section
      ref={ref}
      className={`section wedding-day ${inView ? 'is-lit' : ''}`}
      id="shubh-vivah"
      aria-labelledby="vivah-title"
    >
      <Petals count={16} />
      <div className="container narrow center">
        <Reveal className="wedding-day-diyas" variant="fade">
          <Diya className="wd-diya" />
          <CeremonyIcon name="vivah" className="wd-agni" />
          <Diya className="wd-diya" />
        </Reveal>
        <Reveal>
          <Ribbon lang="hi">शुभ विवाह</Ribbon>
          <h2 id="vivah-title" className="wedding-day-date">
            <span className="wd-day">{wedding.dayName}</span>
            <span className="wd-num">24</span>
            <span className="wd-month">November 2026</span>
          </h2>
          <p className="wedding-day-sub">The sacred union of Sushant &amp; Jigyasa before the holy fire.</p>
        </Reveal>

        <Reveal className="baraat-card" variant="scale" delay={150}>
          <FloralCorner className="corner corner-tl" />
          <FloralCorner className="corner corner-br" />
          <p className="kicker">The Baraat</p>
          <p className="baraat-time">
            Departs at <strong>{baraat.displayTime}</strong>
          </p>
          <ol className="baraat-route">
            <li className="baraat-stop">
              <span className="baraat-pin" aria-hidden="true" />
              <span className="baraat-label">From</span>
              <strong>{baraat.from}</strong>
              <span className="baraat-note">{baraat.fromNote}</span>
            </li>
            <li className="baraat-path" aria-hidden="true">
              <span className="baraat-path-line" />
              <span className="baraat-traveller" />
            </li>
            <li className="baraat-stop">
              <span className="baraat-pin is-dest" aria-hidden="true" />
              <span className="baraat-label">To</span>
              <strong>{baraat.to}</strong>
              <span className="baraat-note">{venue.landmark}</span>
            </li>
          </ol>
          <div className="baraat-actions">
            <a className="btn btn-primary" href={venue.mapsUrl} target="_blank" rel="noopener noreferrer">
              <IconPin /> Get Directions
            </a>
            <a className="btn btn-outline" href={googleCalendarUrl(vivah)} target="_blank" rel="noopener noreferrer">
              <IconCalendar /> Save the Date
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
