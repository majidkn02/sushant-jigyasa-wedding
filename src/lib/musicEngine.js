/**
 * Background-music engine.
 *
 * • Web Audio API with a crossfaded loop, so a short track (the supplied one is
 *   24 s) repeats without a gap or a jump in volume.
 * • Smooth fades for play / pause / ducking (iPhones ignore <audio>.volume,
 *   Web Audio gain works everywhere).
 * • Falls back to a plain looping <audio> element if Web Audio or fetch is not
 *   available (e.g. when index.html is opened directly from disk).
 *
 * Browsers only allow sound after a user gesture, so `start()` must be called
 * from a click/tap handler (the “Enter the Celebration” button or the music button).
 */
export class MusicEngine {
  constructor({ src, volume = 0.5, crossfade = 2.5 }) {
    this.src = src;
    this.volume = volume;
    this.crossfade = crossfade;
    this.wantPlaying = false; // the visitor's choice (Music On / Off)
    this.ducked = false; // true while the video plays with sound
    this.hidden = false; // true while the browser tab is hidden
    this.status = 'idle'; // idle | loading | playing | paused | blocked | error
    this.listeners = new Set();
    this.ctx = null;
    this.buffer = null;
    this.mode = null; // 'webaudio' | 'element'
    this.timer = null;
    this.nextStart = 0;
    this.sources = [];
  }

  subscribe(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  emit(status) {
    if (status) this.status = status;
    const snap = { status: this.status, on: this.wantPlaying, ducked: this.ducked };
    this.listeners.forEach((fn) => fn(snap));
  }

  get audible() {
    return this.wantPlaying && !this.ducked && !this.hidden;
  }

  /** MUST be called synchronously inside a click/tap handler. */
  start() {
    this.wantPlaying = true;
    try {
      // iOS 17+: let Web Audio play even when the phone's silent switch is on.
      if (navigator.audioSession) navigator.audioSession.type = 'playback';
    } catch {
      /* not supported */
    }
    if (!this.mode) this.init();
    else if (this.mode === 'element' && this.el) this.el.play().catch(() => this.emit('blocked'));
    else if (this.ctx && this.ctx.state !== 'running') this.ctx.resume().catch(() => {});
    this.apply();
  }

  stop() {
    this.wantPlaying = false;
    this.apply();
  }

  toggle() {
    if (this.wantPlaying && this.status !== 'blocked') this.stop();
    else this.start();
  }

  setDucked(ducked) {
    if (this.ducked === ducked) return;
    this.ducked = ducked;
    this.apply();
  }

  setHidden(hidden) {
    if (this.hidden === hidden) return;
    this.hidden = hidden;
    this.apply();
  }

  init() {
    const AC = window.AudioContext || window.webkitAudioContext;
    const canFetch = typeof fetch === 'function' && window.location.protocol !== 'file:';
    if (AC && canFetch) {
      this.mode = 'webaudio';
      this.ctx = new AC();
      // Unlock immediately inside the gesture (iOS requirement).
      this.ctx.resume().catch(() => {});
      const silent = this.ctx.createBufferSource();
      silent.buffer = this.ctx.createBuffer(1, 1, 22050);
      silent.connect(this.ctx.destination);
      silent.start(0);
      this.master = this.ctx.createGain();
      this.master.gain.value = 0;
      this.master.connect(this.ctx.destination);
      this.emit('loading');
      fetch(this.src)
        .then((r) => {
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          return r.arrayBuffer();
        })
        .then((data) => new Promise((res, rej) => this.ctx.decodeAudioData(data, res, rej)))
        .then((buffer) => {
          this.buffer = buffer;
          this.trim = findAudibleRange(buffer);
          this.nextStart = this.ctx.currentTime + 0.05;
          this.scheduleAhead(true);
          this.timer = window.setInterval(() => this.scheduleAhead(false), 250);
          this.apply();
        })
        .catch(() => this.fallbackToElement());
    } else {
      this.fallbackToElement();
    }
  }

  fallbackToElement() {
    if (this.timer) window.clearInterval(this.timer);
    this.sources.forEach((s) => {
      try {
        s.src.stop();
      } catch {
        /* already stopped */
      }
    });
    this.sources = [];
    if (this.ctx) this.ctx.close().catch(() => {});
    this.ctx = null;
    this.mode = 'element';
    this.el = new Audio(this.src);
    this.el.loop = true;
    this.el.preload = 'auto';
    this.el.volume = this.volume;
    this.el.addEventListener('playing', () => this.emit('playing'));
    this.el.addEventListener('error', () => this.emit('error'));
    this.apply();
  }

  /** Queues the next loop iteration about two seconds before it is needed. */
  scheduleAhead(first) {
    if (!this.buffer || !this.ctx) return;
    const { start, end } = this.trim;
    const length = end - start;
    const xf = Math.min(this.crossfade, length / 4);
    const t = this.ctx.currentTime;
    while (this.nextStart < t + 2) {
      const when = Math.max(this.nextStart, t + 0.02);
      const src = this.ctx.createBufferSource();
      src.buffer = this.buffer;
      const g = this.ctx.createGain();
      src.connect(g).connect(this.master);
      const isFirst = first && this.sources.length === 0;
      // fade in (very short for the first play — the master gain does the main fade)
      g.gain.setValueAtTime(0, when);
      g.gain.linearRampToValueAtTime(1, when + (isFirst ? 0.05 : xf));
      // fade out across the crossfade window at the end of this iteration
      g.gain.setValueAtTime(1, when + length - xf);
      g.gain.linearRampToValueAtTime(0, when + length);
      src.start(when, start, length);
      const entry = { src, endsAt: when + length };
      src.onended = () => {
        this.sources = this.sources.filter((s) => s !== entry);
      };
      this.sources.push(entry);
      this.nextStart = when + length - xf;
      first = false;
    }
  }

  /** Applies the current wanted state with a gentle fade. */
  apply() {
    const target = this.audible;
    if (this.mode === 'element' && this.el) {
      if (target) {
        this.el.volume = this.volume;
        const p = this.el.play();
        if (p) p.catch(() => this.emit('blocked'));
      } else {
        this.el.pause();
        this.emit('paused');
      }
      return;
    }
    if (this.mode !== 'webaudio' || !this.ctx) {
      this.emit();
      return;
    }
    const now = this.ctx.currentTime;
    const g = this.master.gain;
    g.cancelScheduledValues(now);
    g.setValueAtTime(g.value, now);
    if (target) {
      if (this.ctx.state !== 'running') {
        this.ctx
          .resume()
          .then(() => this.emit(this.buffer ? 'playing' : 'loading'))
          .catch(() => this.emit('blocked'));
      }
      g.linearRampToValueAtTime(this.volume, now + 1.2);
      this.emit(this.buffer ? 'playing' : 'loading');
      clearTimeout(this.suspendTimer);
    } else {
      g.linearRampToValueAtTime(0, now + 0.5);
      clearTimeout(this.suspendTimer);
      // suspend the context after the fade so the loop position is kept and the CPU rests
      this.suspendTimer = setTimeout(() => {
        if (!this.audible && this.ctx && this.ctx.state === 'running') this.ctx.suspend().catch(() => {});
      }, 600);
      this.emit('paused');
    }
  }
}

/** Skips leading / trailing silence so the loop does not contain a quiet gap. */
function findAudibleRange(buffer) {
  const data = buffer.getChannelData(0);
  const threshold = 0.0015;
  let s = 0;
  while (s < data.length && Math.abs(data[s]) < threshold) s++;
  let e = data.length - 1;
  while (e > s && Math.abs(data[e]) < threshold) e--;
  const rate = buffer.sampleRate;
  const start = Math.max(0, s / rate - 0.01);
  const end = Math.min(buffer.duration, e / rate + 0.01);
  return end - start > 4 ? { start, end } : { start: 0, end: buffer.duration };
}
