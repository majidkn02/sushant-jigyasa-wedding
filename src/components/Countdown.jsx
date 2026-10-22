import { wedding } from '../data/weddingData.js';
import { useCountdown } from '../hooks/useCountdown.js';
import { Diya, Mandala } from './Ornaments.jsx';
import { Petals } from './Petals.jsx';
import { Reveal, Ribbon } from './ui.jsx';

const UNITS = [
  ['days', 'Days'],
  ['hours', 'Hours'],
  ['minutes', 'Minutes'],
  ['seconds', 'Seconds'],
];

export function Countdown() {
  const t = useCountdown(wedding.countdownTarget, wedding.celebrationEnds);
  return (
    <section className="section section-maroon countdown" id="countdown" aria-labelledby="countdown-title">
      <Mandala className="countdown-mandala" />
      <div className="container center">
        <Reveal>
          <Ribbon lang="hi" small className="ribbon-on-dark">
            शुभ मुहूर्त
          </Ribbon>
          <h2 id="countdown-title" className="section-title is-light">
            {t.phase === 'before' ? 'Counting down to the Shubh Vivah' : t.phase === 'today' ? wedding.todayMessage : wedding.afterMessage}
          </h2>
          <p className="countdown-date">
            {wedding.dayName} · {wedding.displayDate}
          </p>
        </Reveal>
        {t.phase === 'before' ? (
          <Reveal className="countdown-grid" variant="scale" delay={150}>
            {UNITS.map(([key, label]) => (
              <div className="countdown-cell" key={key}>
                <span className="countdown-num" aria-hidden="true">
                  {String(t[key]).padStart(2, '0')}
                </span>
                <span className="countdown-label" aria-hidden="true">
                  {label}
                </span>
              </div>
            ))}
            <p className="sr-only">
              {t.days} days, {t.hours} hours and {t.minutes} minutes to go.
            </p>
          </Reveal>
        ) : (
          <Reveal className="countdown-celebrate" variant="scale">
            <Petals count={18} />
            <Diya className="countdown-diya" />
            <p className="countdown-celebrate-text">{t.phase === 'today' ? wedding.todaySub : wedding.afterSub}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
