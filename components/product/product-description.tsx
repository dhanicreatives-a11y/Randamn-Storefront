import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { Product } from 'lib/types';
import { VariantSelector } from './variant-selector';
import { ProductAccordions } from './product-accordions';

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{
          fontSize: 'clamp(28px, 4vw, 52px)',
          fontWeight: 900,
          color: '#F5F5F5',
          letterSpacing: '-0.02em',
          marginBottom: 8,
          lineHeight: 1
        }}>
          {product.title}
        </h1>
        <p style={{ fontSize: 16, color: '#A8192E', marginBottom: 32 }}>
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

      <ProductAccordions descriptionHtml={product.descriptionHtml} />
    </>
  );
}
