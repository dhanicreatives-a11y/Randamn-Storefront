import type { Metadata } from 'next';
import Image from 'next/image';
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
      <section className="flex h-screen flex-col items-center justify-center bg-[#0d0d0d]">
        <Image
          src="/logo-full.png"
          alt="RANDAMN"
          width={800}
          height={220}
          className="w-[40vw] max-w-[600px] min-w-[240px] object-contain"
          priority
        />
        <p className="mt-6 text-[13px] uppercase tracking-[0.3em] text-[#a8192e]">
          NOTHING IS PLANNED. EVERYTHING IS REAL.
        </p>
      </section>
      <ProductGrid currency={currency} />
    </Wrapper>
  );
}
