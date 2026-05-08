import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { Product } from 'lib/types';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-8 border-b border-[#f5f5f5]/10 pb-8">
        <h1
          className="mb-4 font-medium uppercase tracking-tight text-[#f5f5f5] leading-none"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
        >
          {product.title}
        </h1>
        <p className="text-[#a8192e] text-xl font-medium">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </p>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />
      {product.descriptionHtml ? (
        <Prose
          className="mb-8 text-sm leading-relaxed text-[#f5f5f5]/70"
          html={product.descriptionHtml}
        />
      ) : null}
      <AddToCart product={product} />
    </>
  );
}
