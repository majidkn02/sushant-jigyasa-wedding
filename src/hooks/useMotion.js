const query = '(prefers-reduced-motion: reduce)';

/** Rough check for low-powered phones: fewer particles, no parallax. */
export function isLowPowerDevice() {
  if (typeof navigator === 'undefined') return false;
  const cores = navigator.hardwareConcurrency || 4;
  const memory = navigator.deviceMemory || 4;
  const saveData = navigator.connection?.saveData;
  return saveData || cores <= 4 || memory <= 2;
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && !!window.matchMedia?.(query).matches;
}
