import { ceremonies, venue, baraat, coupleNames, site } from '../data/weddingData.js';
import { invitationUrl } from './share.js';

const compact = (iso) => iso.replaceAll('-', '');
const nextDay = (iso) => {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
};

/** Calendar entry for one ceremony. Times are not printed on the card, so entries are all-day. */
export function ceremonyEvent(c) {
  const lines = [`${c.name} — wedding celebrations of ${coupleNames}.`];
  if (c.id === 'shubh-vivah') {
    lines.push(`Baraat departs at ${baraat.displayTime} from ${baraat.from} for ${baraat.to}.`);
  }
  lines.push(invitationUrl());
  const location =
    c.venue ?? (c.id === 'shubh-vivah' ? `${venue.name}, ${venue.landmark}, ${venue.addressLines.join(', ')}` : '');
  return {
    uid: `${c.id}-${compact(c.date)}@${coupleNames.replace(/\W+/g, '').toLowerCase()}`,
    title: `${c.name} · ${coupleNames}`,
    start: compact(c.date),
    end: compact(nextDay(c.date)),
    details: lines.join('\n'),
    location,
  };
}

export function googleCalendarUrl(c) {
  const e = ceremonyEvent(c);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: e.title,
    dates: `${e.start}/${e.end}`,
    details: e.details,
    location: e.location,
    ctz: 'Asia/Kolkata',
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

const escapeIcs = (s) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
const stamp = () => new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

/** Downloads an .ics file (works with Apple Calendar, Outlook, Google) for one or all ceremonies. */
export function downloadIcs(list = ceremonies, filename = 'sushant-jigyasa-wedding.ics') {
  const body = list.flatMap((c) => {
    const e = ceremonyEvent(c);
    return [
      'BEGIN:VEVENT',
      `UID:${e.uid}`,
      `DTSTAMP:${stamp()}`,
      `DTSTART;VALUE=DATE:${e.start}`,
      `DTEND;VALUE=DATE:${e.end}`,
      `SUMMARY:${escapeIcs(e.title)}`,
      `DESCRIPTION:${escapeIcs(e.details)}`,
      ...(e.location ? [`LOCATION:${escapeIcs(e.location)}`] : []),
      'END:VEVENT',
    ];
  });
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:-//${escapeIcs(site.title)}//EN`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    ...body,
    'END:VCALENDAR',
  ].join('\r\n');
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
