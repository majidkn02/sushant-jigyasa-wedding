/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  WEDDING DETAILS — the single place to edit names, dates, venue & contacts.
 *  Source of truth: the printed Hindi invitation card.
 *  Every component reads from this file, so change things here only.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ── Website / sharing ───────────────────────────────────────────────────── */
export const site = {
  /**
   * The final public address of this website, e.g.
   *   'https://majidkn02.github.io/<your-repo-name>/'
   * Leave '' until the repository exists. While empty, the site still works;
   * only link previews (WhatsApp / Facebook) cannot show the photo, because
   * they need a full https:// address for og-image.jpg.
   */
  url: '',
  title: 'Sushant & Jigyasa — Shubh Vivah · 24 November 2026',
  description:
    'With the blessings of Baba Bholenath and Shriji, the Srivastava family invites you to the wedding celebrations of Sushant & Jigyasa — 21 to 26 November 2026. Shubh Vivah on Tuesday, 24 November 2026 at Virasat Marriage Hall, Barahi, Ghazipur.',
  shareText:
    'You are warmly invited to the wedding of Sushant & Jigyasa — Shubh Vivah on Tuesday, 24 November 2026 at Virasat Marriage Hall, Barahi, Ghazipur.',
  ogImage: 'og-image.jpg',
  ogImageAlt: 'Sushant and Jigyasa in their wedding attire',
  themeColor: '#7A0019',
  language: 'en-IN',
};

/* ── Devotional / invitation wording (kept in Hindi as on the card) ──────── */
export const invocation = {
  mantra: '॥ श्री गणेशाय नमः ॥',
  greetingHindi: 'स्नेही स्वजन,',
  graceHindi: 'बाबा भोलेनाथ व श्रीजी की असीम अनुकम्पा एवं आशीर्वाद से',
  graceEnglish: 'With the boundless grace and blessings of Baba Bholenath and Shriji',
  parinayHindi: 'परिणय',
  invitationHindi:
    'के परिणय सूत्र बन्धन की मांगलिक बेला पर कृपया पधार कर अपने आशीर्वचनों से नवयुगल के जीवन को अभिसिंचित कर हमें कृतार्थ करें।',
  invitationEnglish:
    'On the auspicious occasion of their sacred union, we humbly request you to grace us with your presence and shower the newly-wed couple with your blessings.',
  programmeHindi: 'वैवाहिक कार्यक्रम',
  venueHindi: 'वैवाहिक स्थल',
  closingHindi: '॥ शुभ विवाह ॥',
};

/* ── The couple (card order: groom first) ────────────────────────────────── */
export const couple = {
  order: 'groom-first',
  groom: {
    id: 'groom',
    role: 'The Groom',
    honorific: 'Chi.',
    firstName: 'Sushant',
    fullName: 'Sushant Srivastava',
    nameHindi: 'चि. सुशान्त श्रीवास्तव',
    relationParents: 'Son of',
    parents: 'Smt. Suman Lakshmi Srivastava & Shri Vishnu Kant Srivastava',
    parentsHindi: 'सुपुत्रः श्रीमती सुमन लक्ष्मी श्रीवास्तव एवं श्री विष्णु कान्त श्रीवास्तव',
    relationGrandparents: 'Grandson of',
    grandparents: 'Smt. Urmila Devi & Shri Surendra Lal Srivastava',
    // The card prints “सुषौत्रः” — an obvious printing typo for “सुपौत्रः” (grandson).
    grandparentsHindi: 'सुपौत्रः श्रीमती उर्मिला देवी एवं श्री सुरेन्द्र लाल श्रीवास्तव',
  },
  bride: {
    id: 'bride',
    role: 'The Bride',
    honorific: 'Ayu.',
    firstName: 'Jigyasa',
    fullName: 'Jigyasa Chitranshi',
    nameHindi: 'आयु. जिज्ञासा चित्रांशी',
    relationParents: 'Daughter of',
    parents: 'Smt. Seema Devi & Shri Vedprakash Srivastava',
    parentsHindi: 'सुपुत्री: श्रीमती सीमा देवी एवं श्री वेदप्रकाश श्रीवास्तव',
    relationGrandparents: 'Granddaughter of',
    grandparents: 'Late Draupadi Devi & Late Rajmangal Lal',
    grandparentsHindi: 'सुपौत्री: स्व. द्रौपदी देवी एवं स्व. राजमंगल लाल',
  },
};

export const coupleOrdered =
  couple.order === 'groom-first' ? [couple.groom, couple.bride] : [couple.bride, couple.groom];
export const coupleNames = `${coupleOrdered[0].firstName} & ${coupleOrdered[1].firstName}`;

/* ── Main wedding date & countdown ───────────────────────────────────────── */
export const wedding = {
  date: '2026-11-24',
  dayName: 'Tuesday',
  displayDate: '24 November 2026',
  /** Countdown counts down to this moment (IST). No ceremony time is printed on the card. */
  countdownTarget: '2026-11-24T00:00:00+05:30',
  /** After this moment the "today" message changes to the "married" message. */
  celebrationEnds: '2026-11-24T23:59:59+05:30',
  timezone: 'Asia/Kolkata',
  todayMessage: 'Today is the day — Shubh Vivah!',
  todaySub: 'Sushant & Jigyasa tie the sacred knot today. Thank you for your blessings.',
  afterMessage: 'Happily married',
  afterSub: 'Thank you for blessing Sushant & Jigyasa as they begin their new life together.',
};

/* ── Venue ───────────────────────────────────────────────────────────────── */
export const venue = {
  name: 'Virasat Marriage Hall',
  landmark: 'Opposite Shrikant Marriage Hall',
  addressLines: ['Barahi, Ghazipur', 'Uttar Pradesh'],
  /** Decoded from the supplied location QR code (do not change unless the QR changes). */
  mapsUrl: 'https://maps.app.goo.gl/ny52o1e2sX1kT6Sc9',
  mapsNote: 'The map pin marks Shrikant Marriage Hall — Virasat Marriage Hall is directly opposite.',
};

/* ── Baraat (part of the Shubh Vivah day — not a separate ceremony) ──────── */
export const baraat = {
  date: '2026-11-24',
  displayDate: '24 November 2026',
  time: '14:00',
  displayTime: '2:00 PM',
  from: 'Janta Medical Hall, Karhan, Mau',
  fromNote: 'Our family residence',
  to: 'Virasat Marriage Hall, Barahi, Ghazipur',
};

/* ── Ceremonies (five main cards, from the card) ─────────────────────────── */
/**
 * time / venue are null because the card does not print them.
 * Fill them in later (e.g. time: '18:00', venue: 'Hall name, Town') and they will appear automatically.
 */
export const ceremonies = [
  {
    id: 'haldi',
    name: 'Haldi',
    nameHindi: 'हल्दी',
    date: '2026-11-21',
    dayName: 'Saturday',
    icon: 'haldi',
    time: null,
    venue: null,
    blurb: 'A golden morning of turmeric, laughter and blessings.',
  },
  {
    id: 'sangeet',
    name: 'Sangeet',
    nameHindi: 'संगीत',
    date: '2026-11-23',
    dayName: 'Monday',
    icon: 'sangeet',
    time: null,
    venue: null,
    blurb: 'An evening of dhol, songs and dancing with family.',
  },
  {
    id: 'shubh-vivah',
    name: 'Shubh Vivah',
    nameHindi: 'शुभ विवाह',
    date: '2026-11-24',
    dayName: 'Tuesday',
    icon: 'vivah',
    time: null,
    venue: 'Virasat Marriage Hall, Barahi, Ghazipur',
    highlight: true,
    blurb: 'The sacred union before the holy fire.',
  },
  {
    id: 'vadhu-aagman',
    name: 'Vadhu Aagman',
    nameHindi: 'वधू आगमन',
    date: '2026-11-25',
    dayName: 'Wednesday',
    icon: 'doli',
    time: null,
    venue: null,
    blurb: 'Welcoming the bride home with love.',
  },
  {
    id: 'bahubhoj',
    name: 'Bahubhoj',
    nameHindi: 'बहुभोज',
    date: '2026-11-26',
    dayName: 'Thursday',
    icon: 'bhoj',
    time: null,
    venue: null, // Not printed on the new card — add it here once confirmed.
    blurb: 'A celebratory feast to bless the newly-weds.',
  },
];

/* ── Families & hosts (from the card) ────────────────────────────────────── */
export const hosts = [
  { titleHindi: 'प्रेषक', title: 'Invited by', names: ['Shri Vishnu Kant Srivastava'] },
  { titleHindi: 'विनीत', title: 'With humble regards', names: ['Dr. Surendra Lal Srivastava'] },
  {
    titleHindi: 'स्वागताकांक्षी',
    title: 'Eager to welcome you',
    names: ['Dr. Ashish Srivastava', 'Er. Abhishek Srivastava'],
  },
  {
    titleHindi: 'दर्शनाभिलाषी',
    title: 'Longing to see you',
    names: ['Vaibhavi Srivastava', 'Snehil Srivastava', 'Saksham Srivastava', 'Samarth Srivastava'],
    note: 'and the entire Kayastha family',
  },
];

/* ── Send Your Blessings ─────────────────────────────────────────────────── */
export const blessings = {
  /**
   * 'whatsapp' → opens WhatsApp with the formatted blessing (default)
   * 'endpoint' → POSTs { name, message } as JSON to `endpoint`
   * 'local'    → keeps blessings only in the visitor's own browser (old site behaviour)
   */
  mode: 'whatsapp',
  /** Country code + number, digits only. Displayed nowhere on the page. */
  whatsappNumber: '917266061352',
  endpoint: null,
  messageTitle: 'Wedding Blessings ❤️',
  maxNameLength: 60,
  maxMessageLength: 600,
};

/* ── Call buttons (disabled for now) ─────────────────────────────────────── */
/**
 * Set enabled: true and add people to show "Call" buttons in the Family section.
 * Format: { name: 'Full Name', description: 'optional line', phone: '9876543210' }
 */
export const contacts = {
  enabled: false,
  heading: 'For any assistance',
  people: [],
};

/* ── Closing ─────────────────────────────────────────────────────────────── */
export const closing = {
  line: 'Your presence and blessings will make our celebration complete.',
  signOff: 'With love — the Srivastava family',
};
