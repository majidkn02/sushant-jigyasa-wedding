import { useCallback, useEffect, useState } from 'react';
import { MediaProvider } from './context/MediaContext.jsx';
import { PhotoProvider } from './context/PhotoContext.jsx';
import { SvgDefs } from './components/Ornaments.jsx';
import { OpeningScreen } from './components/OpeningScreen.jsx';
import { Navbar } from './components/Navbar.jsx';
import { Hero } from './components/Hero.jsx';
import { Invocation } from './components/Invocation.jsx';
import { Couple } from './components/Couple.jsx';
import { Countdown } from './components/Countdown.jsx';
import { Celebrations } from './components/Celebrations.jsx';
import { WeddingHighlight } from './components/WeddingHighlight.jsx';
import { VideoSection } from './components/VideoSection.jsx';
import { Moments } from './components/Moments.jsx';
import { Venue } from './components/Venue.jsx';
import { Family } from './components/Family.jsx';
import { Blessings } from './components/Blessings.jsx';
import { ShareInvite } from './components/ShareInvite.jsx';
import { Footer } from './components/Footer.jsx';
import { FloatingActions } from './components/FloatingActions.jsx';
import { useButtonRipple } from './hooks/useButtonRipple.js';

const OPENED_KEY = 'invitation-opened';

/** Skip the opening screen when returning in the same tab session or arriving on a #section link. */
function alreadyOpened() {
  try {
    return sessionStorage.getItem(OPENED_KEY) === '1' || window.location.hash.length > 1;
  } catch {
    return false;
  }
}

export default function App() {
  const [opened, setOpened] = useState(alreadyOpened);
  const [justOpened, setJustOpened] = useState(false);
  const [revealing, setRevealing] = useState(false);
  useButtonRipple();

  useEffect(() => {
    document.documentElement.classList.toggle('is-scroll-locked', !opened);
  }, [opened]);

  // Arriving on a #section link: jump there once the page has rendered.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    window.setTimeout(() => document.getElementById(id)?.scrollIntoView(), 60);
  }, []);

  const handleOpened = useCallback(() => {
    try {
      sessionStorage.setItem(OPENED_KEY, '1');
    } catch {
      /* private mode */
    }
    setOpened(true);
    setJustOpened(true);
    requestAnimationFrame(() => document.getElementById('main')?.focus({ preventScroll: true }));
  }, []);

  return (
    <MediaProvider>
      <PhotoProvider>
        <SvgDefs />
        <a className="skip-link" href="#celebrations">
          Skip to the celebrations
        </a>
        {!opened && <OpeningScreen onReveal={() => setRevealing(true)} onDone={handleOpened} />}
        <div className={`site ${opened || revealing ? 'is-revealed' : ''}`} aria-hidden={!opened} inert={!opened}>
          <Navbar />
          <main id="main" tabIndex={-1}>
            <Hero justOpened={justOpened} />
            <Invocation />
            <Couple />
            <Countdown />
            <Celebrations />
            <WeddingHighlight />
            <VideoSection />
            <Moments />
            <Venue />
            <Family />
            <Blessings />
            <ShareInvite />
          </main>
          <Footer />
          <FloatingActions />
        </div>
      </PhotoProvider>
    </MediaProvider>
  );
}
