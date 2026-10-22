const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** '2026-11-24' → { day: 24, month: 'November', monthShort: 'NOV', year: 2026 } */
export function parseISODate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return { day: d, month: MONTHS[m - 1], monthShort: MONTHS[m - 1].slice(0, 3).toUpperCase(), year: y };
}

/** '14:00' → '2:00 PM' */
export function formatTime(hhmm) {
  if (!hhmm) return null;
  const [h, m] = hhmm.split(':').map(Number);
  return `${h % 12 === 0 ? 12 : h % 12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
}
