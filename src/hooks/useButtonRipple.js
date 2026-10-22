import { useEffect } from 'react';

/** Soft gold ripple on every .btn press (skipped with reduced motion). */
export function useButtonRipple() {
  useEffect(() => {
    const onDown = (e) => {
      const btn = e.target.closest?.('.btn');
      if (!btn || btn.matches(':disabled') || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const r = btn.getBoundingClientRect();
      const size = Math.max(r.width, r.height);
      const span = document.createElement('span');
      span.className = 'ripple';
      span.style.width = span.style.height = `${size}px`;
      span.style.left = `${e.clientX - r.left - size / 2}px`;
      span.style.top = `${e.clientY - r.top - size / 2}px`;
      btn.appendChild(span);
      span.addEventListener('animationend', () => span.remove());
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, []);
}
