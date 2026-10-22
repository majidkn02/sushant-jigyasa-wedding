import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { IconChevronLeft, IconChevronRight, IconClose } from './Icons.jsx';

/**
 * Accessible image viewer.
 *  • Previous / Next / Close buttons, ← → Esc keys, focus trapped inside
 *  • Swipe left/right on phones, double-tap / double-click to zoom
 *  • Restores focus to the photo that opened it
 */
export function Lightbox({ items, index, onIndex, onClose, label = 'Photo viewer' }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const returnFocus = useRef(null);
  const touch = useRef(null);
  const lastTap = useRef(0);
  const [zoomed, setZoomed] = useState(false);
  const [dir, setDir] = useState(0);
  const count = items.length;
  const item = items[index];

  const go = useCallback(
    (step) => {
      if (count < 2) return;
      setZoomed(false);
      setDir(step);
      onIndex((index + step + count) % count);
    },
    [count, index, onIndex],
  );

  useEffect(() => {
    returnFocus.current = document.activeElement;
    document.documentElement.classList.add('is-scroll-locked');
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      document.documentElement.classList.remove('is-scroll-locked');
      returnFocus.current?.focus?.({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'Tab') {
        const nodes = dialogRef.current?.querySelectorAll('button');
        if (!nodes?.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, onClose]);

  const onTouchStart = (e) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY, time: Date.now() };
  };
  const onTouchEnd = (e) => {
    const start = touch.current;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    touch.current = null;
    if (!zoomed && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      go(dx < 0 ? 1 : -1);
      return;
    }
    if (!zoomed && dy > 110 && Math.abs(dy) > Math.abs(dx) * 1.5) {
      onClose();
      return;
    }
    const now = Date.now();
    if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
      if (now - lastTap.current < 300) {
        setZoomed((z) => !z);
        lastTap.current = 0;
      } else lastTap.current = now;
    }
  };

  if (!item) return null;

  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      ref={dialogRef}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="lightbox-top">
        <p className="lightbox-count" aria-live="polite">
          {count > 1 ? `${index + 1} / ${count}` : ''}
        </p>
        <button ref={closeRef} type="button" className="lightbox-btn" onClick={onClose} aria-label="Close viewer">
          <IconClose />
        </button>
      </div>
      <figure
        className={`lightbox-figure ${zoomed ? 'is-zoomed' : ''}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onDoubleClick={() => setZoomed((z) => !z)}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <img
          key={item.src}
          className={`lightbox-img ${dir > 0 ? 'from-right' : dir < 0 ? 'from-left' : ''}`}
          src={item.src}
          srcSet={item.srcSet}
          sizes="100vw"
          alt={item.alt}
          width={item.width}
          height={item.height}
          decoding="async"
        />
        {item.caption && <figcaption className="lightbox-caption">{item.caption}</figcaption>}
      </figure>
      <p className="lightbox-hint">{count > 1 ? 'Swipe or use ← → · ' : ''}Double-tap to zoom</p>
      {count > 1 && (
        <>
          <button type="button" className="lightbox-btn lightbox-prev" onClick={() => go(-1)} aria-label="Previous photo">
            <IconChevronLeft />
          </button>
          <button type="button" className="lightbox-btn lightbox-next" onClick={() => go(1)} aria-label="Next photo">
            <IconChevronRight />
          </button>
        </>
      )}
    </div>,
    document.body,
  );
}
