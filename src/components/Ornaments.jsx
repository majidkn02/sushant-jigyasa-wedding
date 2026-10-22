/**
 * Decorative SVG artwork inspired by the invitation card:
 * mandala, marigold garland, bells, floral corners, lotus, diya, dividers,
 * Mahadev's trishul & damru. All decorative → aria-hidden.
 */

const range = (n) => Array.from({ length: n }, (_, i) => i);

/**
 * Shared gradients, rendered once (App.jsx). Kept out of the individual icons so
 * duplicate ids never break when one copy is hidden.
 */
export function SvgDefs() {
  return (
    <svg className="svg-defs" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="bellGrad" x1="0" x2="1">
          <stop offset="0" stopColor="#B88A33" />
          <stop offset="0.45" stopColor="#E9C977" />
          <stop offset="1" stopColor="#A87B2A" />
        </linearGradient>
        <linearGradient id="ceremonyGold" x1="0" x2="1">
          <stop offset="0" stopColor="#B88A33" />
          <stop offset="0.5" stopColor="#EBCB7C" />
          <stop offset="1" stopColor="#A87B2A" />
        </linearGradient>
        <radialGradient id="diyaGlow">
          <stop offset="0" stopColor="#FFD77A" stopOpacity="0.9" />
          <stop offset="1" stopColor="#FFB547" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="diyaFlame" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#E25A0C" />
          <stop offset="0.5" stopColor="#FFB02E" />
          <stop offset="1" stopColor="#FFF3B0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Mandala({ className = '' }) {
  return (
    <svg className={`mandala ${className}`} viewBox="-100 -100 200 200" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="0.8">
        <circle r="96" />
        <circle r="92" strokeDasharray="1 3" />
        {range(24).map((i) => (
          <path key={`o${i}`} d="M0 -92 C 9 -80 9 -70 0 -62 C -9 -70 -9 -80 0 -92 Z" transform={`rotate(${i * 15})`} />
        ))}
        <circle r="62" />
        {range(16).map((i) => (
          <path key={`m${i}`} d="M0 -62 C 12 -50 12 -38 0 -30 C -12 -38 -12 -50 0 -62 Z" transform={`rotate(${i * 22.5})`} />
        ))}
        {range(16).map((i) => (
          <circle key={`d${i}`} cy="-68" r="1.6" fill="currentColor" transform={`rotate(${i * 22.5 + 11.25})`} />
        ))}
        <circle r="30" />
        {range(8).map((i) => (
          <path key={`i${i}`} d="M0 -30 C 8 -22 8 -14 0 -8 C -8 -14 -8 -22 0 -30 Z" transform={`rotate(${i * 45})`} />
        ))}
        <circle r="6" fill="currentColor" />
      </g>
    </svg>
  );
}

function Marigold({ cx, cy, r = 7, tone = 0 }) {
  const outer = tone ? '#E8941E' : '#F2B233';
  const inner = tone ? '#D9771A' : '#E8941E';
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={outer} />
      {range(8).map((i) => (
        <circle
          key={i}
          cx={cx + Math.cos((i * Math.PI) / 4) * r * 0.62}
          cy={cy + Math.sin((i * Math.PI) / 4) * r * 0.62}
          r={r * 0.42}
          fill={inner}
          opacity="0.75"
        />
      ))}
      <circle cx={cx} cy={cy} r={r * 0.35} fill="#C45A12" />
    </g>
  );
}

export function Bell({ className = '' }) {
  return (
    <svg className={`bell ${className}`} viewBox="0 0 40 52" aria-hidden="true" focusable="false">
      <path d="M20 2 v6" stroke="var(--gold-deep)" strokeWidth="2" />
      <circle cx="20" cy="9" r="3" fill="none" stroke="var(--gold-deep)" strokeWidth="1.6" />
      <path d="M8 38 C 8 22 12 13 20 12 C 28 13 32 22 32 38 Z" fill="url(#bellGrad)" stroke="var(--gold-deep)" strokeWidth="1" />
      <path d="M5 38 h30 a2 2 0 0 1 0 4 h-30 a2 2 0 0 1 0 -4 Z" fill="var(--gold)" stroke="var(--gold-deep)" strokeWidth="0.8" />
      <circle cx="20" cy="46" r="3.4" fill="var(--gold-deep)" />
      <path d="M13 24 C 15 18 17 16 20 15.5" stroke="#FFF1C7" strokeWidth="1.4" fill="none" opacity="0.7" />
    </svg>
  );
}

/** Vertical marigold string ending in a bell (as on both sides of the card). */
export function Garland({ count = 9, className = '', bell = true }) {
  const step = 15;
  const h = count * step + (bell ? 52 : 6);
  return (
    <svg className={`garland ${className}`} viewBox={`0 0 40 ${h}`} aria-hidden="true" focusable="false">
      <line x1="20" y1="0" x2="20" y2={count * step} stroke="#7A5A1E" strokeWidth="1" />
      {range(count).map((i) => (
        <g key={i}>
          {i % 3 === 1 && (
            <>
              <ellipse cx="11" cy={i * step + 8} rx="6" ry="2.6" fill="#486B3C" transform={`rotate(-30 11 ${i * step + 8})`} />
              <ellipse cx="29" cy={i * step + 8} rx="6" ry="2.6" fill="#5C8248" transform={`rotate(30 29 ${i * step + 8})`} />
            </>
          )}
          <Marigold cx={20} cy={i * step + 8} r={7.4} tone={i % 2} />
        </g>
      ))}
      {bell && (
        <g transform={`translate(0 ${count * step - 4})`}>
          <Bell />
        </g>
      )}
    </svg>
  );
}

function Flower({ x, y, r = 6, color = '#B11226', rot = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      {range(5).map((i) => (
        <ellipse key={i} cx="0" cy={-r * 0.7} rx={r * 0.48} ry={r * 0.78} fill={color} transform={`rotate(${i * 72})`} />
      ))}
      <circle r={r * 0.36} fill="#E9B949" />
    </g>
  );
}

function Leaf({ x, y, rot = 0, s = 1, c = '#486B3C' }) {
  return (
    <path
      d="M0 0 C 6 -6 16 -6 22 0 C 16 6 6 6 0 0 Z"
      transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}
      fill={c}
    />
  );
}

/** Floral vine for a corner (mirrored with CSS for the other corners). */
export function FloralCorner({ className = '' }) {
  return (
    <svg className={`floral-corner ${className}`} viewBox="0 0 160 160" aria-hidden="true" focusable="false">
      <path d="M4 156 C 10 100 40 50 100 22 C 120 13 138 8 156 6" fill="none" stroke="#5C7A3E" strokeWidth="1.6" />
      <path d="M30 104 C 40 96 54 92 70 94" fill="none" stroke="#5C7A3E" strokeWidth="1.2" />
      <path d="M62 50 C 64 64 72 74 84 80" fill="none" stroke="#5C7A3E" strokeWidth="1.2" />
      <Leaf x={16} y={124} rot={-70} s={1.1} />
      <Leaf x={24} y={100} rot={-20} s={0.9} c="#5C8248" />
      <Leaf x={44} y={76} rot={-80} s={1} />
      <Leaf x={70} y={48} rot={-15} s={0.9} c="#5C8248" />
      <Leaf x={96} y={28} rot={-50} s={1} />
      <Leaf x={122} y={16} rot={10} s={0.8} c="#5C8248" />
      <Leaf x={70} y={94} rot={10} s={0.8} c="#5C8248" />
      <Flower x={30} y={142} r={9} />
      <Flower x={84} y={80} r={7} color="#C2334A" rot={20} />
      <Flower x={110} y={22} r={8} rot={10} />
      <Flower x={58} y={58} r={5} color="#E8941E" />
      <Flower x={142} y={8} r={5} color="#E8941E" />
      <circle cx="44" cy="120" r="2.4" fill="var(--gold)" />
      <circle cx="96" cy="50" r="2" fill="var(--gold)" />
    </svg>
  );
}

export function Lotus({ className = '' }) {
  return (
    <svg className={`lotus ${className}`} viewBox="0 0 64 40" aria-hidden="true" focusable="false">
      <path d="M32 4 C 40 14 40 26 32 36 C 24 26 24 14 32 4 Z" fill="#C2334A" />
      <path d="M32 36 C 22 32 14 22 13 10 C 24 14 30 24 32 36 Z" fill="#D9536A" />
      <path d="M32 36 C 42 32 50 22 51 10 C 40 14 34 24 32 36 Z" fill="#D9536A" />
      <path d="M32 37 C 20 38 8 32 2 22 C 14 22 26 28 32 37 Z" fill="#E77F90" />
      <path d="M32 37 C 44 38 56 32 62 22 C 50 22 38 28 32 37 Z" fill="#E77F90" />
      <path d="M14 38 h36" stroke="var(--gold)" strokeWidth="1.4" />
    </svg>
  );
}

/** Small ornamental divider: line – lotus bud – line. Draws in on reveal. */
export function Divider({ className = '' }) {
  return (
    <svg className={`divider ${className}`} viewBox="0 0 240 24" aria-hidden="true" focusable="false">
      <path className="divider-line" d="M4 12 H96" />
      <path className="divider-line" d="M236 12 H144" />
      <circle cx="100" cy="12" r="2" fill="currentColor" />
      <circle cx="140" cy="12" r="2" fill="currentColor" />
      <path d="M120 2 C 128 8 128 16 120 22 C 112 16 112 8 120 2 Z" fill="currentColor" />
      <path d="M120 22 C 112 20 106 15 104 9 C 112 10 117 15 120 22 Z" fill="currentColor" opacity="0.7" />
      <path d="M120 22 C 128 20 134 15 136 9 C 128 10 123 15 120 22 Z" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

export function Diya({ className = '', lit = true }) {
  return (
    <svg className={`diya ${lit ? 'is-lit' : ''} ${className}`} viewBox="0 0 80 72" aria-hidden="true" focusable="false">
      <circle className="diya-glow" cx="40" cy="26" r="26" fill="url(#diyaGlow)" />
      <g className="diya-flame">
        <path d="M40 8 C 47 20 46 32 40 36 C 34 32 33 20 40 8 Z" fill="url(#diyaFlame)" />
        <path d="M40 22 C 42 27 42 32 40 34 C 38 32 38 27 40 22 Z" fill="#FFF8D6" />
      </g>
      <path d="M6 42 C 14 40 30 40 40 40 C 52 40 66 39 76 34 C 72 52 58 62 40 62 C 22 62 8 54 6 42 Z" fill="#9B3A1E" />
      <path d="M8 44 C 18 46 60 46 74 38" stroke="var(--gold)" strokeWidth="1.6" fill="none" />
      <path d="M22 54 C 30 57 50 57 58 54" stroke="#E9B949" strokeWidth="1.2" fill="none" strokeDasharray="2 3" />
      <ellipse cx="40" cy="66" rx="18" ry="3" fill="#7A0019" opacity="0.15" />
    </svg>
  );
}

/** Symbolic Mahadev artwork: trishul with damru, bilva leaves and crescent. */
export function Trishul({ className = '' }) {
  return (
    <svg className={`trishul ${className}`} viewBox="0 0 120 160" aria-hidden="true" focusable="false">
      <path d="M60 10 C 64 22 64 34 60 44 C 56 34 56 22 60 10 Z" fill="var(--gold)" stroke="var(--gold-deep)" />
      <path d="M60 46 C 46 46 36 36 34 20 C 30 28 30 40 38 48 C 44 54 52 56 60 56" fill="var(--gold)" stroke="var(--gold-deep)" />
      <path d="M60 46 C 74 46 84 36 86 20 C 90 28 90 40 82 48 C 76 54 68 56 60 56" fill="var(--gold)" stroke="var(--gold-deep)" />
      <rect x="57" y="54" width="6" height="100" rx="2" fill="var(--gold-deep)" />
      <path d="M50 58 h20" stroke="var(--maroon)" strokeWidth="3" />
      <g transform="translate(60 78)">
        <path d="M-12 -10 L 12 -10 L 2 0 L 12 10 L -12 10 L -2 0 Z" fill="var(--maroon)" stroke="var(--gold)" strokeWidth="1.2" />
        <path d="M-12 -10 L 12 -10 M -12 10 L 12 10" stroke="var(--gold)" strokeWidth="2" />
        <path d="M12 0 C 20 4 22 12 18 18" stroke="var(--gold-deep)" fill="none" strokeWidth="1.2" />
        <circle cx="18" cy="19" r="2.2" fill="var(--gold-deep)" />
      </g>
      <path d="M63 64 C 76 70 80 82 74 96 C 70 90 66 80 63 72" fill="var(--red)" opacity="0.85" />
      <g transform="translate(60 118)">
        <Leaf x={-4} y={0} rot={200} s={0.9} />
        <Leaf x={4} y={0} rot={-20} s={0.9} />
        <Leaf x={0} y={-2} rot={-90} s={0.9} c="#5C8248" />
      </g>
      <path d="M86 12 a12 12 0 1 0 10 18 a9 9 0 1 1 -10 -18 Z" fill="var(--gold)" opacity="0.9" />
    </svg>
  );
}

/* ── Ceremony icons (as on the card) ─────────────────────────────────────── */

function HaldiIcon() {
  return (
    <>
      <path d="M20 58 C 26 50 38 46 50 58 Z" fill="#486B3C" opacity="0.85" />
      <path d="M78 58 C 72 48 60 46 50 56 Z" fill="#5C8248" opacity="0.85" />
      <ellipse cx="50" cy="52" rx="28" ry="10" fill="#F2B233" />
      <path d="M28 50 C 32 38 42 34 50 34 C 60 34 68 40 72 50 Z" fill="#E8A51F" />
      <path d="M36 44 C 40 40 46 38 52 39" stroke="#FFD66B" strokeWidth="2" fill="none" />
      <path d="M18 54 h64 C 80 70 68 80 50 80 C 32 80 20 70 18 54 Z" fill="url(#ceremonyGold)" stroke="var(--gold-deep)" />
      <path d="M24 62 C 36 66 64 66 76 62" stroke="#FFF1C7" strokeWidth="1.2" fill="none" opacity="0.8" />
      <path d="M40 80 h20 l-3 6 h-14 Z" fill="var(--gold-deep)" />
    </>
  );
}

function SangeetIcon() {
  return (
    <>
      <ellipse cx="30" cy="56" rx="9" ry="16" fill="#E9C977" stroke="var(--gold-deep)" />
      <path d="M30 40 h34 a9 16 0 0 1 0 32 h-34" fill="var(--red)" stroke="var(--gold-deep)" />
      <ellipse cx="64" cy="56" rx="9" ry="16" fill="#E9C977" stroke="var(--gold-deep)" />
      <path d="M34 42 L40 70 L46 42 L52 70 L58 42" stroke="var(--gold)" strokeWidth="1.6" fill="none" />
      <path d="M30 45 h34 M30 67 h34" stroke="var(--gold)" strokeWidth="1.4" />
      <path d="M72 30 v14 a4 3 0 1 1 -2 -2.6 V 30 l10 -3 v12 a4 3 0 1 1 -2 -2.6 v-8 Z" fill="var(--maroon)" />
      <path d="M20 22 v12 a4 3 0 1 1 -2 -2.6 V 22 Z" fill="var(--maroon)" opacity="0.8" />
    </>
  );
}

function VivahIcon() {
  return (
    <>
      <path className="ceremony-flame" d="M50 14 C 62 30 64 42 58 52 C 56 44 52 40 50 38 C 48 44 44 46 44 52 C 36 44 38 28 50 14 Z" fill="#F08A1C" />
      <path className="ceremony-flame" d="M50 30 C 56 40 56 48 50 54 C 44 48 44 40 50 30 Z" fill="#FFD050" />
      <path d="M28 54 h44 l-4 10 h-36 Z" fill="var(--maroon)" stroke="var(--gold)" />
      <path d="M22 64 h56 l-4 10 h-48 Z" fill="var(--red)" stroke="var(--gold)" />
      <path d="M16 74 h68 v8 h-68 Z" fill="var(--maroon)" stroke="var(--gold)" />
      <path d="M36 59 l2 2 l-2 2 l-2 -2 Z M50 59 l2 2 l-2 2 l-2 -2 Z M64 59 l2 2 l-2 2 l-2 -2 Z" fill="var(--gold)" />
      <path d="M28 78 h44" stroke="var(--gold)" strokeDasharray="2 3" />
    </>
  );
}

function DoliIcon() {
  return (
    <>
      <path d="M6 40 h88" stroke="var(--gold-deep)" strokeWidth="4" strokeLinecap="round" />
      <path d="M30 40 C 30 24 40 16 50 14 C 60 16 70 24 70 40 Z" fill="var(--red)" stroke="var(--gold)" strokeWidth="1.4" />
      <circle cx="50" cy="11" r="3.2" fill="var(--gold)" />
      <path d="M28 40 h44 v34 h-44 Z" fill="var(--maroon)" stroke="var(--gold)" strokeWidth="1.4" />
      <path d="M33 44 C 40 52 40 64 33 70 Z M67 44 C 60 52 60 64 67 70 Z" fill="#F6D9A8" />
      <path d="M33 44 h34 C 60 50 54 52 50 52 C 46 52 40 50 33 44 Z" fill="#E77F90" />
      <path d="M28 74 h44 l-4 8 h-36 Z" fill="var(--gold)" />
      {[36, 44, 52, 60].map((x) => (
        <circle key={x} cx={x + 2} cy="46" r="1.4" fill="var(--gold)" />
      ))}
      <path d="M24 82 v6 M76 82 v6" stroke="var(--gold-deep)" strokeWidth="3" strokeLinecap="round" />
    </>
  );
}

function BhojIcon() {
  return (
    <>
      <ellipse cx="50" cy="64" rx="38" ry="14" fill="url(#ceremonyGold)" stroke="var(--gold-deep)" />
      <ellipse cx="50" cy="61" rx="31" ry="10" fill="#F4E2B8" stroke="var(--gold-deep)" strokeWidth="0.8" />
      <ellipse cx="34" cy="58" rx="8" ry="4" fill="var(--gold)" stroke="var(--gold-deep)" strokeWidth="0.8" />
      <ellipse cx="34" cy="57" rx="6" ry="2.4" fill="#E8941E" />
      <ellipse cx="66" cy="58" rx="8" ry="4" fill="var(--gold)" stroke="var(--gold-deep)" strokeWidth="0.8" />
      <ellipse cx="66" cy="57" rx="6" ry="2.4" fill="#5C8248" />
      <ellipse cx="50" cy="65" rx="8" ry="4" fill="var(--gold)" stroke="var(--gold-deep)" strokeWidth="0.8" />
      <ellipse cx="50" cy="64" rx="6" ry="2.4" fill="var(--red)" />
      <circle cx="44" cy="54" r="3.6" fill="#E9C977" stroke="#B88A33" />
      <circle cx="56" cy="53" r="3.6" fill="#E9C977" stroke="#B88A33" />
      <path d="M38 34 C 40 28 36 24 38 18 M50 32 C 52 26 48 22 50 16 M62 34 C 64 28 60 24 62 18" stroke="#B88A33" strokeWidth="1.4" fill="none" opacity="0.6" />
    </>
  );
}

const CEREMONY_ICONS = { haldi: HaldiIcon, sangeet: SangeetIcon, vivah: VivahIcon, doli: DoliIcon, bhoj: BhojIcon };

export function CeremonyIcon({ name, className = '' }) {
  const Icon = CEREMONY_ICONS[name] ?? VivahIcon;
  return (
    <svg className={`ceremony-icon ${className}`} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <Icon />
    </svg>
  );
}
