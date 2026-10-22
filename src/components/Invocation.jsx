import { invocation, coupleOrdered } from '../data/weddingData.js';
import { Diya, Divider, Trishul } from './Ornaments.jsx';
import { Reveal } from './ui.jsx';

/** The card's devotional opening and invitation wording, kept in Hindi with an English rendering. */
export function Invocation() {
  const [groom, bride] = coupleOrdered;
  return (
    <section className="section invocation" id="blessing" aria-labelledby="blessing-title">
      <div className="container narrow center">
        <Reveal variant="fade" className="invocation-symbols">
          <Diya className="invocation-diya" />
          <Trishul className="invocation-trishul" />
          <Diya className="invocation-diya" />
        </Reveal>
        <Reveal as="p" className="invocation-greeting" lang="hi" delay={120}>
          {invocation.greetingHindi}
        </Reveal>
        <Reveal as="h2" id="blessing-title" className="invocation-grace" lang="hi" delay={200}>
          {invocation.graceHindi}
        </Reveal>
        <Reveal as="p" className="invocation-grace-en" delay={260}>
          {invocation.graceEnglish}
        </Reveal>
        <Reveal className="invocation-couple" delay={320}>
          <p lang="hi" className="invocation-couple-hi">
            <span className="nowrap">{groom.nameHindi}</span> <span className="parinay">{invocation.parinayHindi}</span>{' '}
            <span className="nowrap">{bride.nameHindi}</span>
          </p>
          <Divider />
          <p lang="hi" className="invocation-text">
            {invocation.invitationHindi}
          </p>
          <p className="invocation-text-en">{invocation.invitationEnglish}</p>
        </Reveal>
      </div>
    </section>
  );
}
