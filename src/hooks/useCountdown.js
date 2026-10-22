import { useEffect, useState } from 'react';

/** Returns days / hours / minutes / seconds until `target`, never negative, plus a phase. */
export function useCountdown(targetISO, endISO) {
  const target = new Date(targetISO).getTime();
  const end = new Date(endISO).getTime();
  const compute = () => {
    const now = Date.now();
    const diff = Math.max(0, target - now);
    const phase = now < target ? 'before' : now <= end ? 'today' : 'after';
    return {
      phase,
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff / 3600000) % 24),
      minutes: Math.floor((diff / 60000) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };
  const [value, setValue] = useState(compute);
  useEffect(() => {
    const id = window.setInterval(() => setValue(compute()), 1000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, end]);
  return value;
}
