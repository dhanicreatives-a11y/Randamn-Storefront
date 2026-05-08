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
    <section className="grid grid-cols-2 md:grid-cols-4 gap-[1px] randamn-grid">
      {products.map((product) => (
        <Link
          key={product.handle}
          href={`/${currency}/product/${product.handle}`}
          prefetch={true}
          className="relative block aspect-square"
        >
          <GridTileImage
            src={product.featuredImage.url}
            transformedSrc={product.featuredImage.transformedUrl}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            alt={product.title}
            label={{
              title: product.title,
              amount: product.priceRange.maxVariantPrice.amount,
              currencyCode: product.priceRange.maxVariantPrice.currencyCode
            }}
          />
        </Link>
      ))}
    </section>
  );
}
