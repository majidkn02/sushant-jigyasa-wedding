import { useState } from 'react';
import { ceremonies, invocation } from '../data/weddingData.js';
import { parseISODate, formatTime } from '../lib/dates.js';
import { googleCalendarUrl, downloadIcs } from '../lib/calendar.js';
import { useInView } from '../hooks/useInView.js';
import { CeremonyIcon } from './Ornaments.jsx';
import { Reveal, SectionHead } from './ui.jsx';
import { IconCalendar, IconDownload } from './Icons.jsx';
import { scrollToId } from './Navbar.jsx';

function CeremonyCard({ c, index, open, onToggle }) {
  const d = parseISODate(c.date);
  const time = formatTime(c.time);
  return (
    <li className={`ceremony ${c.highlight ? 'is-highlight' : ''} ${open ? 'is-open' : ''}`} style={{ '--i': index }}>
      <span className="ceremony-dot" aria-hidden="true" />
      <article className="ceremony-card" aria-labelledby={`c-${c.id}`}>
        <button
          type="button"
          className="ceremony-toggle"
          aria-expanded={open}
          aria-controls={`c-${c.id}-more`}
          onClick={onToggle}
        >
          <span className="ceremony-arch" aria-hidden="true">
            <CeremonyIcon name={c.icon} />
          </span>
          <span className="ceremony-date">
            <span className="ceremony-day-num">{d.day}</span>
            <span className="ceremony-month">
              {d.monthShort} {d.year}
            </span>
          </span>
          <span className="ceremony-names">
            <span id={`c-${c.id}`} className="ceremony-name">
              {c.name}
            </span>
            <span className="ceremony-name-hi" lang="hi">
              {c.nameHindi}
            </span>
          </span>
          <span className="ceremony-weekday">
            {c.dayName}
            {time ? ` · ${time}` : ''}
          </span>
          <span className="ceremony-more-hint" aria-hidden="true">
            {open ? 'Less' : 'Details'}
          </span>
        </button>
        <div id={`c-${c.id}-more`} className="ceremony-more" hidden={!open}>
          <p className="ceremony-blurb">{c.blurb}</p>
          {c.venue && <p className="ceremony-venue">{c.venue}</p>}
          {c.highlight && (
            <button type="button" className="link-btn" onClick={() => scrollToId('shubh-vivah')}>
              Wedding-day details &amp; Baraat →
            </button>
          )}
          <div className="ceremony-cal">
            <a className="chip" href={googleCalendarUrl(c)} target="_blank" rel="noopener noreferrer">
              <IconCalendar /> Google Calendar
            </a>
            <button type="button" className="chip" onClick={() => downloadIcs([c], `${c.id}-2026.ics`)}>
              <IconDownload /> Apple / Outlook
            </button>
          </div>
        </div>
      </article>
    </li>
  );
}

/** वैवाहिक कार्यक्रम — vertical timeline on phones, card row with a drawn line on desktop. */
export function Celebrations() {
  const [openId, setOpenId] = useState(null);
  const [ref, inView] = useInView({ threshold: 0.15 });
  return (
    <section className="section celebrations" id="celebrations" aria-labelledby="celebrations-title">
      <div className="container">
        <SectionHead
          id="celebrations-title"
          hindi={invocation.programmeHindi}
          title="The Wedding Celebrations"
          intro="Five days of rituals, music and blessings. Tap a celebration for details and to add it to your calendar."
        />
        <ol ref={ref} className={`timeline ${inView ? 'is-in' : ''}`}>
          {ceremonies.map((c, i) => (
            <CeremonyCard
              key={c.id}
              c={c}
              index={i}
              open={openId === c.id}
              onToggle={() => setOpenId((id) => (id === c.id ? null : c.id))}
            />
          ))}
        </ol>
        <Reveal className="center timeline-actions">
          <button type="button" className="btn btn-outline" onClick={() => downloadIcs()}>
            <IconCalendar /> Add all five to my calendar
          </button>
        </Reveal>
      </div>
    </section>
  );
}
