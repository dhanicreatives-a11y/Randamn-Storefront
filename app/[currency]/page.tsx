import type { Metadata } from 'next';
import { HeroSection } from 'components/hero-section';
import { ProductGrid } from 'components/grid/product-grid';
import { Wrapper } from 'components/wrapper';
import { getShop, getShopOgImage } from 'lib/fourthwall';

export function generateStaticParams() {
  return [{ currency: 'GBP' }, { currency: 'EUR' }, { currency: 'USD' }, { currency: 'CAD' }];
}

export async function generateMetadata(): Promise<Metadata> {
  const [ogImageUrl, shop] = await Promise.all([getShopOgImage(), getShop()]);

  return {
    title: shop.name,
    description: 'Nothing is planned. Everything is real.',
    openGraph: {
      type: 'website',
      images: ogImageUrl ? [{ url: ogImageUrl }] : undefined
    },
    twitter: {
      card: 'summary_large_image',
      images: ogImageUrl ? [ogImageUrl] : undefined
    }
  };
}

export default async function HomePage({ params }: { params: Promise<{ currency: string }> }) {
  const currency = (await params).currency;
  const shop = await getShop();

  return (
    <Wrapper currency={currency} shop={shop}>
      <HeroSection />

      {/* ticker strip */}
      <div style={{
        padding: '10px 20px',
        borderBottom: '1px solid #1a1a1a',
        fontSize: 9,
        color: '#444',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
      }}>
        british made chaos &nbsp;*&nbsp; no restocks &nbsp;*&nbsp;
        free shipping uk &nbsp;*&nbsp; no collections &nbsp;*&nbsp;
        just drops &nbsp;*&nbsp; no rules &nbsp;*&nbsp; wear the accident
      </div>

      <style>{`
        .pg-wrap > a:nth-child(3n+1) { grid-column: span 2 }
        .pg-wrap > a:nth-child(3n+2) { grid-column: span 1 }
      `}</style>
      <div
        className="pg-wrap"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gridAutoRows: '280px'
        }}
      >
        <ProductGrid currency={currency} />
      </div>

      <div style={{
        padding: '60px 24px',
        borderTop: '1px solid #1a1a1a'
      }}>
        <p style={{
          fontSize: 'clamp(20px,3vw,36px)',
          fontWeight: 900,
          color: '#F5F5F5',
          lineHeight: 1.1,
          letterSpacing: '-0.02em'
        }}>
          the universe began from a{' '}
          <span style={{color:'#A8192E'}}>random accident.</span>
          <br/>so did this.
        </p>
        <p style={{
          fontSize: 9,
          color: '#444',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginTop: 16
        }}>— randamn, london</p>
      </div>
    </Wrapper>
  );
}
