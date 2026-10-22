import { couple, coupleOrdered, invocation } from '../data/weddingData.js';
import { images, toons } from '../data/media.js';
import { usePhotos } from '../context/PhotoContext.jsx';
import { FloralCorner, Garland, Lotus } from './Ornaments.jsx';
import { Img, Reveal, Ribbon, SectionHead } from './ui.jsx';
import { IconExpand } from './Icons.jsx';

const PORTRAITS = { groom: images.groom, bride: images.bride };

/** One person: arched portrait, names, family lineage from the card, optional toon below. */
function PersonSection({ person, side }) {
  const { openPhoto } = usePhotos();
  const portrait = PORTRAITS[person.id];
  const toon = toons[person.id];
  return (
    <article className={`person person-${side}`} id={person.id} aria-labelledby={`${person.id}-name`}>
      <Reveal className="person-visual" variant={side === 'left' ? 'left' : 'right'}>
        <div className="arch-frame person-frame">
          <button type="button" className="photo-btn" onClick={() => openPhoto(portrait)} aria-label={`Open portrait of ${person.firstName}`}>
            <Img image={portrait} sizes="(min-width: 1024px) 380px, (min-width: 640px) 46vw, 82vw" className="person-photo" />
            <span className="photo-zoom" aria-hidden="true">
              <IconExpand />
            </span>
          </button>
          <FloralCorner className="corner corner-bl" />
          <FloralCorner className="corner corner-br" />
        </div>
        <Garland className="person-garland" count={7} />
      </Reveal>
      <Reveal className="person-copy" delay={150}>
        <p className="kicker">{person.role}</p>
        <h3 id={`${person.id}-name`} className="person-name">
          <span className="person-honorific">{person.honorific}</span> {person.fullName}
        </h3>
        <p className="person-name-hi" lang="hi">
          {person.nameHindi}
        </p>
        <dl className="lineage">
          <div>
            <dt>{person.relationGrandparents}</dt>
            <dd>{person.grandparents}</dd>
          </div>
          <div>
            <dt>{person.relationParents}</dt>
            <dd>{person.parents}</dd>
          </div>
        </dl>
      </Reveal>
      {toon && (
        <Reveal className="person-toon" variant="scale">
          <button type="button" className="photo-btn polaroid" onClick={() => openPhoto(toon)} aria-label={`Open illustration of ${person.firstName}`}>
            <Img image={toon} sizes="(min-width: 768px) 360px, 80vw" />
          </button>
        </Reveal>
      )}
    </article>
  );
}

/** Groom → परिणय → Bride (mirroring the card), then the couple watercolour. */
export function Couple() {
  const { openPhoto } = usePhotos();
  const [first, second] = coupleOrdered;
  return (
    <section className="section couple" id="couple" aria-labelledby="couple-title">
      <div className="container">
        <SectionHead id="couple-title" kicker="Two families · One celebration" title="The Groom & The Bride" />
        <PersonSection person={first} side="left" />

        {/* परिणय — ceremonial transition between the Groom and the Bride */}
        <div className="parinay-bridge">
          <Reveal className="parinay-ribbon" variant="scale">
            <Lotus className="parinay-lotus" />
            <Ribbon lang="hi">{invocation.parinayHindi}</Ribbon>
          </Reveal>
        </div>

        <PersonSection person={second} side="right" />

        {/* Couple watercolour — after the Bride */}
        <div className="couple-watercolour">
          <Reveal className="parinay-art" variant="scale">
            <button
              type="button"
              className="photo-btn watercolor-frame"
              onClick={() => openPhoto(images.lakeWatercolor)}
              aria-label="Open watercolour of Sushant and Jigyasa"
            >
              <Img image={images.lakeWatercolor} sizes="(min-width: 1024px) 520px, 88vw" />
            </button>
            <p className="parinay-caption">
              {couple.groom.firstName} <span aria-hidden="true">♥</span>
              <span className="sr-only"> and </span> {couple.bride.firstName}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
