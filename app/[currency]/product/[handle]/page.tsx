import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Gallery } from 'components/product/gallery';
import { ProductProvider } from 'components/product/product-context';
import { ProductDescription } from 'components/product/product-description';
import { ProductViewTracker } from 'components/product/product-view-tracker';
import { Wrapper } from 'components/wrapper';
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import { getProduct, getShop, getShopOgImage } from 'lib/fourthwall';
import { Suspense } from 'react';

export const revalidate = 3600;

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ currency: string; handle: string }>;
}): Promise<Metadata> {
  const { currency, handle } = await params;
  const [product, shopOgImage, shop] = await Promise.all([
    getProduct({ handle, currency }),
    getShopOgImage(),
    getShop()
  ]);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);
  const ogImageUrl = url || shopOgImage;

  return {
    title: `${product.title} | ${shop.name}`,
    description: product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: { index: indexable, follow: indexable }
    },
    openGraph: ogImageUrl
      ? { images: [{ url: ogImageUrl, ...(url ? { width, height, alt } : {}) }] }
      : undefined,
    twitter: {
      card: 'summary_large_image',
      images: ogImageUrl ? [ogImageUrl] : undefined
    }
  };
}

export default async function ProductPage({
  params
}: {
  params: Promise<{ currency: string; handle: string }>;
}) {
  const { currency, handle } = await params;

  const [product, shop] = await Promise.all([getProduct({ handle, currency }), getShop()]);

  if (!product) return notFound();

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      '@type': 'AggregateOffer',
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount
    }
  };

  return (
    <Wrapper currency={currency} shop={shop}>
      <Suspense fallback={null}>
        <ProductProvider>
          <ProductViewTracker product={product} />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
            {/* Left: image — 55% desktop, full width mobile */}
            <div style={{
              width: '55%',
              minWidth: 300,
              flex: '1 1 300px',
              position: 'relative',
              minHeight: '90vh',
              overflow: 'hidden',
              background: '#0d0d0d'
            }}>
              <Suspense fallback={<div style={{ minHeight: '90vh', background: '#0d0d0d' }} />}>
                <Gallery product={product} />
              </Suspense>
            </div>

            {/* Right: details — 45% desktop, full width mobile */}
            <div style={{
              width: '45%',
              minWidth: 300,
              flex: '1 1 300px',
              padding: '40px 32px',
              background: '#0d0d0d',
              position: 'sticky',
              top: 0,
              alignSelf: 'flex-start'
            }}>
              <Suspense fallback={null}>
                <ProductDescription product={product} />
              </Suspense>
            </div>
          </div>
        </ProductProvider>
      </Suspense>
    </Wrapper>
  );
}
