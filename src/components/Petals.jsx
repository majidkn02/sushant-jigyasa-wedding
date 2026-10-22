import { useEffect, useMemo, useState } from 'react';
import { useInView } from '../hooks/useInView.js';
import { isLowPowerDevice, prefersReducedMotion } from '../hooks/useMotion.js';

const COLORS = ['#C2334A', '#E8941E', '#F2B233', '#B11226', '#E77F90'];
const rand = (i, k) => (((Math.sin(i * 12.9898 + k * 78.233) * 43758.5453) % 1) + 1) % 1;

/**
 * Lightweight CSS petals. Only animates while its area is on screen, uses
 * fewer petals on low-powered phones and none with reduced motion.
 *  mode="fall"  → gentle continuous fall inside the parent (relative) element
 *  mode="burst" → one short burst from the centre (opening, blessings sent)
 */
export function Petals({ count = 14, mode = 'fall', className = '' }) {
  const [ref, inView] = useInView({ once: false, rootMargin: '0px', threshold: 0 });
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    setEnabled(!prefersReducedMotion());
  }, []);
  const n = useMemo(() => (isLowPowerDevice() ? Math.ceil(count * 0.55) : count), [count]);
  const petals = useMemo(
    () =>
      Array.from({ length: n }, (_, i) => ({
        '--x': `${Math.round(rand(i, 1) * 100)}%`,
        '--delay': `${(mode === 'burst' ? rand(i, 2) * 0.35 : rand(i, 2) * 12).toFixed(2)}s`,
        '--dur': `${(mode === 'burst' ? 1.8 + rand(i, 3) * 1.4 : 10 + rand(i, 3) * 8).toFixed(2)}s`,
        '--drift': `${Math.round((rand(i, 4) - 0.5) * 160)}px`,
        '--spin': `${Math.round(200 + rand(i, 5) * 400)}deg`,
        '--size': `${Math.round(9 + rand(i, 6) * 9)}px`,
        '--color': COLORS[i % COLORS.length],
        '--angle': `${Math.round(rand(i, 7) * 360)}deg`,
        '--dist': `${Math.round(120 + rand(i, 8) * 200)}px`,
      })),
    [n, mode],
  );
  return (
    <div
      ref={ref}
      className={`petals petals-${mode} ${inView && enabled ? 'is-active' : ''} ${className}`}
      aria-hidden="true"
    >
      {enabled && petals.map((style, i) => <span key={i} className="petal" style={style} />)}
    </div>
  );
}
