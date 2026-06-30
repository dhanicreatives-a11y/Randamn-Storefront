import { Wrapper } from 'components/wrapper';
import { getShop } from 'lib/fourthwall';

export default async function AboutPage({
  params
}: {
  params: Promise<{ currency: string }>;
}) {
  const currency = (await params).currency;
  const shop = await getShop();

  const section: React.CSSProperties = {
    padding: '48px 24px',
    borderBottom: '1px solid #1a1a1a',
    position: 'relative'
  };

  const label: React.CSSProperties = {
    fontSize: 9,
    color: '#888',
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    marginBottom: 12
  };

  const numLabel: React.CSSProperties = {
    fontSize: 11,
    color: '#A8192E',
    letterSpacing: '0.2em',
    marginBottom: 8
  };

  const body: React.CSSProperties = {
    fontSize: 15,
    color: '#bbb',
    lineHeight: 1.75,
    maxWidth: 600
  };

  const twoCol: React.CSSProperties = {
    display: 'flex',
    gap: '48px',
    flexWrap: 'wrap'
  };

  const colLabel: React.CSSProperties = {
    fontSize: 9,
    color: '#888',
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    minWidth: 140,
    paddingTop: 4
  };

  return (
    <Wrapper currency={currency} shop={shop}>

      {/* SECTION 1 — Opening */}
      <div style={{ ...section, overflow: 'hidden' }}>
        {/* ghost text */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '22vw',
          fontWeight: 900,
          color: '#F5F5F5',
          opacity: 0.03,
          letterSpacing: '-0.05em',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none'
        }}>WHO</div>

        <p style={{ ...label, color: '#A8192E', marginBottom: 24 }}>* the truth about us</p>
        <h1 style={{
          fontSize: 'clamp(32px, 6vw, 64px)',
          fontWeight: 900,
          color: '#F5F5F5',
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          position: 'relative',
          zIndex: 1
        }}>
          we don't know what<br />we're doing{' '}
          <span style={{ color: '#A8192E' }}>next.</span>
        </h1>
      </div>

      {/* SECTION 2 — Origin */}
      <div style={section}>
        <div style={twoCol}>
          <p style={colLabel}>001 / origin story</p>
          <div style={body}>
            <p>
              The universe began from a random accident. A cosmic explosion nobody planned,
              nobody scheduled, nobody put in a quarterly roadmap. Fourteen billion years later,
              here we are — wearing clothes and calling it culture.
            </p>
            <p style={{ marginTop: 16 }}>
              Randamn started from the same place.{' '}
              <strong style={{ color: '#F5F5F5' }}>No business plan. No target demographic.
              No mood board.</strong>{' '}
              Just a stubborn belief that the best things in life are the ones nobody saw
              coming —{' '}
              <span style={{ color: '#A8192E' }}>including this brand.</span>
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3 — What we are */}
      <div style={section}>
        <div style={twoCol}>
          <p style={colLabel}>002 / what we are</p>
          <div style={body}>
            <p>
              A British clothing brand built on the philosophy that{' '}
              <strong style={{ color: '#F5F5F5' }}>randomness is not a flaw — it's the point.</strong>
            </p>
            <p style={{ marginTop: 16 }}>
              We don't have collections. We don't have seasons. We don't have a signature look.{' '}
              <span style={{ color: '#A8192E' }}>The unpredictability IS the product.</span>{' '}
              Every drop is a different idea, a different feeling, a different accident that
              somehow became a garment.
            </p>
            <p style={{ marginTop: 16 }}>
              Every piece is genuinely human-crafted.{' '}
              <strong style={{ color: '#F5F5F5' }}>We don't know what we're dropping next.</strong>{' '}
              That's not a marketing line. That's the operating model.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 4 — What we are not */}
      <div style={section}>
        <div style={twoCol}>
          <p style={colLabel}>003 / what we are not</p>
          <div style={body}>
            <p>
              We are not a streetwear brand trying to be the next Supreme. We are not a
              minimalist brand with a carefully curated aesthetic. We are not chasing hype.
              We are not building a universe.{' '}
              <strong style={{ color: '#F5F5F5' }}>We are not for everyone.</strong>
            </p>
            <p style={{ marginTop: 16 }}>
              If you need to know what's coming next, this isn't for you.
            </p>
            <p style={{ marginTop: 8 }}>
              <span style={{ color: '#A8192E' }}>If you're okay with not knowing — welcome.</span>
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 5 — Philosophy statement */}
      <div style={{ ...section, textAlign: 'center', padding: '72px 24px' }}>
        <p style={{
          fontSize: 'clamp(22px, 4vw, 42px)',
          fontWeight: 900,
          color: '#F5F5F5',
          lineHeight: 1.1,
          letterSpacing: '-0.02em'
        }}>
          life isn't structured.<br />why should your{' '}
          <span style={{ color: '#A8192E' }}>wardrobe be?</span>
        </p>
      </div>

      {/* SECTION 6 — Why Randamn */}
      <div style={section}>
        <p style={{ ...label, marginBottom: 32 }}>* why randamn</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

          {[
            {
              num: '01',
              title: 'Every drop is genuinely one-of-a-kind',
              text: 'Not limited edition as a marketing trick. We mean we haven\'t made this design before and we won\'t make it again. Each drop is its own accident.'
            },
            {
              num: '02',
              title: 'Actually human-made',
              text: 'No AI-generated designs. No agency. No committee. One person, one idea, whenever it arrives. The messiness is the point.'
            },
            {
              num: '03',
              title: 'British wit. Zero corporate.',
              text: 'Made in Britain, for people who find the absurdity of existence vaguely funny. We take the clothes seriously. We don\'t take ourselves seriously.'
            },
            {
              num: '04',
              title: 'No restocks. No waiting lists.',
              text: 'When it\'s gone it\'s gone. We\'re not running a subscription service. If you see something — that\'s the sign.'
            },
            {
              num: '05',
              title: 'The surprise is the product',
              text: 'You don\'t follow Randamn because you like our aesthetic. You follow Randamn because you have no idea what\'s coming next. Neither do we. That\'s the whole thing.'
            }
          ].map(({ num, title, text }) => (
            <div key={num} style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              <p style={{ ...numLabel, minWidth: 32, paddingTop: 2 }}>{num}</p>
              <div style={{ flex: 1, minWidth: 240 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#F5F5F5', marginBottom: 6 }}>
                  — {title}
                </p>
                <p style={body}>{text}</p>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* SECTION 7 — Closing */}
      <div style={{ ...section, borderBottom: 'none', padding: '72px 24px' }}>
        <p style={{
          fontSize: 'clamp(22px, 4vw, 42px)',
          fontWeight: 900,
          color: '#F5F5F5',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          marginBottom: 24
        }}>
          the universe didn't ask for permission to{' '}
          <span style={{ color: '#A8192E' }}>exist.</span>
          <br />neither did we.
        </p>
        <p style={{ fontSize: 12, color: '#555', marginBottom: 16 }}>
          — randamn, london. born from nothing, going everywhere.
        </p>
        <span style={{
          display: 'inline-block',
          fontSize: 8,
          color: '#A8192E',
          border: '1px solid #A8192E',
          padding: '3px 8px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase'
        }}>
          * wear the accident
        </span>
      </div>

    </Wrapper>
  );
}
