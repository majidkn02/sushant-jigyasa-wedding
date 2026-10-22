import { useEffect, useState } from 'react';
import { blessings, coupleNames, wedding } from '../data/weddingData.js';
import { blessingWhatsAppUrl, formatBlessing } from '../lib/whatsapp.js';
import { Petals } from './Petals.jsx';
import { Diya, FloralCorner } from './Ornaments.jsx';
import { Reveal, SectionHead } from './ui.jsx';
import { IconHeart, IconWhatsApp } from './Icons.jsx';

const STORE_KEY = `blessings:${wedding.date}`;
const readLocal = () => {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) ?? '[]');
  } catch {
    return [];
  }
};

/**
 * Send Your Blessings.
 * Default (mode 'whatsapp'): opens WhatsApp with
 *   Wedding Blessings ❤️ / From: [Name] / [Message]
 * The 'endpoint' and 'local' modes from the first website are kept and can be
 * switched on in weddingData.js → blessings.mode.
 */
export function Blessings() {
  const mode =
    blessings.mode === 'whatsapp' && blessings.whatsappNumber
      ? 'whatsapp'
      : blessings.mode === 'endpoint' && blessings.endpoint
        ? 'endpoint'
        : 'local';
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState({ kind: 'idle', text: '' });
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState([]);
  const [burst, setBurst] = useState(0);

  useEffect(() => {
    if (mode === 'local') setSaved(readLocal());
  }, [mode]);

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = 'Please write your name.';
    if (!message.trim()) e.message = 'Please write a blessing for the couple.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const celebrate = () => setBurst((b) => b + 1);

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) {
      document.getElementById(!name.trim() ? 'blessing-name' : 'blessing-message')?.focus();
      return;
    }
    if (mode === 'whatsapp') {
      // Opened synchronously inside the click so pop-up blockers allow it.
      window.open(blessingWhatsAppUrl(name, message), '_blank', 'noopener');
      setStatus({
        kind: 'done',
        text: 'WhatsApp has opened with your blessing. Please tap Send in WhatsApp to deliver it.',
      });
      celebrate();
      return;
    }
    if (mode === 'endpoint') {
      setStatus({ kind: 'sending', text: 'Sending your blessing…' });
      try {
        const res = await fetch(blessings.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ name: name.trim(), message: message.trim() }),
        });
        if (!res.ok) throw new Error(String(res.status));
        setName('');
        setMessage('');
        setStatus({ kind: 'done', text: `Thank you! Your blessing has been sent to ${coupleNames}.` });
        celebrate();
      } catch {
        setStatus({ kind: 'error', text: 'Sorry, your blessing could not be sent. Please try again in a moment.' });
      }
      return;
    }
    const next = [{ name: name.trim(), message: message.trim(), at: Date.now() }, ...saved].slice(0, 30);
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable */
    }
    setSaved(next);
    setName('');
    setMessage('');
    setStatus({ kind: 'done', text: 'Thank you! Your blessing is shown below.' });
    celebrate();
  };

  const preview = formatBlessing(name || 'Your name', message || 'Your blessing for the couple…');

  return (
    <section className="section section-blush blessings" id="blessings" aria-labelledby="blessings-title">
      <FloralCorner className="corner corner-tr section-corner" />
      <div className="container">
        <SectionHead
          id="blessings-title"
          hindi="आशीर्वाद"
          title="Send Your Blessings"
          intro={`Write a few words for ${coupleNames}. Your blessing opens in WhatsApp, ready to send to the family.`}
        />
        <div className="blessings-grid">
          <Reveal as="form" className="blessing-form" onSubmit={submit} noValidate variant="left">
            <div className="field">
              <label htmlFor="blessing-name">Your name</label>
              <input
                id="blessing-name"
                name="name"
                type="text"
                autoComplete="name"
                maxLength={blessings.maxNameLength}
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={errors.name ? 'true' : undefined}
                aria-describedby={errors.name ? 'blessing-name-err' : undefined}
                placeholder="e.g. Anita Sharma"
              />
              {errors.name && (
                <p id="blessing-name-err" className="field-error">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="field">
              <label htmlFor="blessing-message">Your blessing / message</label>
              <textarea
                id="blessing-message"
                name="message"
                rows={5}
                maxLength={blessings.maxMessageLength}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                aria-invalid={errors.message ? 'true' : undefined}
                aria-describedby={`blessing-count${errors.message ? ' blessing-message-err' : ''}`}
                placeholder="Wishing you a lifetime of love, laughter and togetherness…"
              />
              <p id="blessing-count" className="field-count">
                {message.length} / {blessings.maxMessageLength}
              </p>
              {errors.message && (
                <p id="blessing-message-err" className="field-error">
                  {errors.message}
                </p>
              )}
            </div>
            <button type="submit" className={`btn ${mode === 'whatsapp' ? 'btn-whatsapp' : 'btn-primary'} btn-block`} disabled={status.kind === 'sending'}>
              {mode === 'whatsapp' ? (
                <>
                  <IconWhatsApp /> Send Blessings on WhatsApp
                </>
              ) : (
                <>
                  <IconHeart /> Send Blessings
                </>
              )}
            </button>
            <p className={`form-status is-${status.kind}`} role="status" aria-live="polite">
              {status.text}
            </p>
            {burst > 0 && (
              <div className="blessing-burst" key={burst} aria-hidden="true">
                <Petals count={18} mode="burst" />
                <span className="heart-pop">
                  <IconHeart />
                </span>
              </div>
            )}
          </Reveal>

          <Reveal className="blessing-preview" variant="right" delay={120}>
            <Diya className="blessing-diya" />
            <p className="kicker">Your message will look like this</p>
            <div className="chat-bubble">
              {preview.split('\n').map((line, i) => (
                <p key={i}>{line || ' '}</p>
              ))}
            </div>
            {mode === 'local' && saved.length > 0 && (
              <ul className="saved-blessings">
                {saved.map((b) => (
                  <li key={b.at}>
                    <p>“{b.message}”</p>
                    <span>— {b.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
