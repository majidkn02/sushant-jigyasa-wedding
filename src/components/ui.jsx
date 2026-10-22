import { useInView } from '../hooks/useInView.js';
import { Divider } from './Ornaments.jsx';

/** Fades/slides children in when they scroll into view. variant: up | scale | left | right | fade */
export function Reveal({ as: Tag = 'div', variant = 'up', delay = 0, className = '', children, ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={`reveal reveal-${variant} ${inView ? 'is-in' : ''} ${className}`}
      style={delay ? { '--reveal-delay': `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Maroon ribbon banner with gold scroll ends — the card's heading style. */
export function Ribbon({ children, lang, small = false, className = '' }) {
  return (
    <span className={`ribbon ${small ? 'ribbon-sm' : ''} ${className}`} lang={lang}>
      <svg className="ribbon-end ribbon-end-l" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
        <path d="M38 20 C 30 8 20 6 12 12 C 6 16 8 26 15 26 C 20 26 21 19 17 18 C 14 17 13 21 15 22" />
        <path d="M38 20 C 30 32 20 34 12 28" />
        <circle cx="4" cy="20" r="2.4" />
      </svg>
      <span className="ribbon-text">{children}</span>
      <svg className="ribbon-end ribbon-end-r" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
        <path d="M38 20 C 30 8 20 6 12 12 C 6 16 8 26 15 26 C 20 26 21 19 17 18 C 14 17 13 21 15 22" />
        <path d="M38 20 C 30 32 20 34 12 28" />
        <circle cx="4" cy="20" r="2.4" />
      </svg>
    </span>
  );
}

/** Standard section heading: optional Hindi ribbon, English title, divider, intro. */
export function SectionHead({ id, hindi, kicker, title, intro, light = false, ribbon = true }) {
  return (
    <Reveal className={`section-head ${light ? 'is-light' : ''}`}>
      {hindi && ribbon && (
        <Ribbon lang="hi" small>
          {hindi}
        </Ribbon>
      )}
      {kicker && <p className="kicker">{kicker}</p>}
      <h2 id={id} className="section-title">
        {title}
      </h2>
      <Divider className="section-divider" />
      {intro && <p className="section-intro">{intro}</p>}
    </Reveal>
  );
}

/** Responsive <img> from media.js descriptors (srcset, lazy, safe cropping). */
export function Img({ image, sizes = '100vw', eager = false, className = '', alt, style, ...rest }) {
  if (!image) return null;
  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={image.srcSet ? sizes : undefined}
      width={image.width}
      height={image.height}
      alt={alt ?? image.alt ?? ''}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : undefined}
      className={className}
      style={{ objectPosition: image.position, ...style }}
      {...rest}
    />
  );
}
