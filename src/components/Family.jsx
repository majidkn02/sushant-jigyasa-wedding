import { useState } from 'react';
import { couple, hosts, contacts } from '../data/weddingData.js';
import { images } from '../data/media.js';
import { Lightbox } from './Lightbox.jsx';
import { FloralCorner, Lotus } from './Ornaments.jsx';
import { Reveal, SectionHead } from './ui.jsx';
import { IconExpand, IconPhone } from './Icons.jsx';

function Side({ person, title }) {
  return (
    <Reveal className="family-side">
      <h3 className="family-side-title">{title}</h3>
      <p className="family-side-name">
        {person.honorific} {person.fullName}
      </p>
      <dl className="lineage lineage-center">
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
  );
}

/** Call buttons — hidden until contacts.enabled is true in weddingData.js. */
function Contacts() {
  if (!contacts.enabled || contacts.people.length === 0) return null;
  return (
    <Reveal className="contacts">
      <h3 className="family-side-title">{contacts.heading}</h3>
      <ul className="contacts-list">
        {contacts.people.map((p) => (
          <li key={p.phone}>
            <span className="contact-name">{p.name}</span>
            {p.description && <span className="contact-desc">{p.description}</span>}
            <a className="btn btn-outline" href={`tel:+91${p.phone}`} aria-label={`Call ${p.name}`}>
              <IconPhone /> {p.phone.replace(/(\d{5})(\d{5})/, '$1 $2')}
            </a>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export function Family() {
  const [viewCard, setViewCard] = useState(false);
  return (
    <section className="section family" id="family" aria-labelledby="family-title">
      <FloralCorner className="corner corner-tl section-corner" />
      <FloralCorner className="corner corner-br section-corner" />
      <div className="container">
        <SectionHead id="family-title" hindi="सादर आमंत्रण" title="With the Blessings of Our Families" />
        <div className="family-grid">
          <Side person={couple.groom} title="The Groom’s Family" />
          <div className="family-join" aria-hidden="true">
            <Lotus />
          </div>
          <Side person={couple.bride} title="The Bride’s Family" />
        </div>

        <ul className="hosts">
          {hosts.map((h, i) => (
            <Reveal as="li" key={h.titleHindi} className="host" delay={i * 80}>
              <p className="host-title" lang="hi">
                {h.titleHindi}
              </p>
              <p className="host-title-en">{h.title}</p>
              <p className="host-names">
                {h.names.map((n, j) => (
                  <span key={n}>
                    {n}
                    {j < h.names.length - 1 ? <br /> : null}
                  </span>
                ))}
              </p>
              {h.note && <p className="host-note">{h.note}</p>}
            </Reveal>
          ))}
        </ul>

        <Contacts />

        <Reveal className="center original-card">
          <button type="button" className="btn btn-outline" onClick={() => setViewCard(true)}>
            <IconExpand /> View Original Invitation
          </button>
        </Reveal>
      </div>
      {viewCard && (
        <Lightbox
          items={[images.invitationCard]}
          index={0}
          onIndex={() => {}}
          onClose={() => setViewCard(false)}
          label="Original invitation card"
        />
      )}
    </section>
  );
}
