import type { Metadata } from 'next';
import { ProductGrid } from 'components/grid/product-grid';
import { Wrapper } from 'components/wrapper';
import { getShop, getShopOgImage } from 'lib/fourthwall';

export function generateStaticParams() {
  return [{ currency: 'USD' }, { currency: 'EUR' }, { currency: 'GBP' }, { currency: 'CAD' }];
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
      <section style={{
        position: 'relative',
        height: '100vh',
        background: '#0d0d0d',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '40px 24px'
      }}>

        {/* giant ghost text */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '18vw',
          fontWeight: 900,
          color: '#F5F5F5',
          opacity: 0.04,
          letterSpacing: '-0.04em',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none'
        }}>RANDAMN</div>

        {/* red splatter top right */}
        <svg style={{position:'absolute',top:24,right:24,width:80,height:80}} viewBox="0 0 100 100">
          <path fill="#A8192E" d="M50 8C56 4,64 10,68 7C72 4,74 14,80 16C86 18,84 28,88 33C92 38,86 44,86 50C86 56,92 62,88 67C84 72,86 82,80 84C74 86,72 96,68 93C64 90,56 96,50 92C44 88,36 94,32 90C28 86,26 76,20 74C14 72,16 62,12 57C8 52,14 44,14 38C14 32,8 24,14 20C20 16,18 6,24 8C30 10,32 2,38 6C44 10,44 4,50 8Z"/>
        </svg>

        {/* bottom left text */}
        <div style={{position:'relative',zIndex:2}}>
          <p style={{
            fontSize: 10,
            color: '#A8192E',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom: 12
          }}>est. from a cosmic accident</p>
          <h1 style={{
            fontSize: 'clamp(36px, 7vw, 80px)',
            fontWeight: 900,
            color: '#F5F5F5',
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            transform: 'rotate(-1.5deg)',
            display: 'inline-block'
          }}>life is<br/><span style={{color:'#A8192E'}}>#RanDamn</span></h1>
        </div>

        {/* bottom right drop counter */}
        <div style={{
          position: 'absolute',
          bottom: 40,
          right: 24,
          border: '1px solid #222',
          padding: '12px 16px',
          textAlign: 'right',
          transform: 'rotate(2deg)'
        }}>
          <p style={{fontSize:9,color:'#444',letterSpacing:'0.2em',textTransform:'uppercase'}}>latest drop</p>
          <p style={{fontSize:32,fontWeight:900,color:'#F5F5F5',lineHeight:1}}>001</p>
          <p style={{fontSize:9,color:'#A8192E',letterSpacing:'0.1em'}}>no schedule. ever.</p>
        </div>

      </section>

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
    </Wrapper>
  );
}
