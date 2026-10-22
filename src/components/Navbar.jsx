import { useEffect, useState } from 'react';
import { coupleOrdered } from '../data/weddingData.js';
import { useActiveSection } from '../hooks/useActiveSection.js';
import { IconClose, IconMenu } from './Icons.jsx';

export const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'couple', label: 'Couple' },
  { id: 'celebrations', label: 'Celebrations' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'venue', label: 'Venue' },
  { id: 'blessings', label: 'Blessings' },
];
const IDS = NAV_ITEMS.map((n) => n.id);

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  history.replaceState(null, '', `#${id}`);
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(IDS);
  const [groom, bride] = coupleOrdered;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.documentElement.classList.add('is-scroll-locked');
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.classList.remove('is-scroll-locked');
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <nav className="navbar-inner" aria-label="Main">
        <a className="brand" href="#home" onClick={(e) => go(e, 'home')} aria-label={`${groom.firstName} and ${bride.firstName} — back to top`}>
          <span className="brand-mark" aria-hidden="true">
            {groom.firstName[0]}
            <i>&amp;</i>
            {bride.firstName[0]}
          </span>
          <span className="brand-name">
            {groom.firstName} <i>&amp;</i> {bride.firstName}
          </span>
        </a>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <IconClose /> : <IconMenu />}
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        </button>
        <ul id="nav-links" className="nav-links">
          {NAV_ITEMS.map((item, i) => (
            <li key={item.id} style={{ '--i': i }}>
              <a
                href={`#${item.id}`}
                onClick={(e) => go(e, item.id)}
                className={active === item.id ? 'is-active' : ''}
                aria-current={active === item.id ? 'true' : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {open && <button type="button" className="nav-scrim" aria-label="Close menu" onClick={() => setOpen(false)} />}
    </header>
  );
}
