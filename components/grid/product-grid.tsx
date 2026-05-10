import { getCollectionProducts } from 'lib/fourthwall';
import Link from 'next/link';
import { GridTileImage } from './tile';

export async function ProductGrid({ currency }: { currency: string }) {
  const products = await getCollectionProducts({
    collection: process.env.NEXT_PUBLIC_FW_COLLECTION || 'all',
    currency
  });

  if (!products.length) return null;

  return (
    <>
      {products.map((product, index) => (
        <Link
          key={product.handle}
          href={`/${currency}/product/${product.handle}`}
          prefetch={true}
          style={{ display: 'block', position: 'relative' }}
        >
          <GridTileImage
            src={product.featuredImage.url}
            transformedSrc={product.featuredImage.transformedUrl}
            fill
            sizes="(min-width: 1024px) 33vw, 50vw"
            alt={product.title}
            index={index}
            label={{
              title: product.title,
              amount: product.priceRange.maxVariantPrice.amount,
              currencyCode: product.priceRange.maxVariantPrice.currencyCode
            }}
          />
        </Link>
      ))}
    </>
  );
}
