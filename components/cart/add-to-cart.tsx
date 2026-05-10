'use client';

import { addItem } from 'components/cart/actions';
import { useProduct } from 'components/product/product-context';
import { useShop } from 'components/shop/shop-context';
import { trackAddToCart } from 'lib/analytics';
import { Product, ProductVariant } from 'lib/types';
import { useActionState } from 'react';
import { useCart } from './cart-context';

const btnStyle: React.CSSProperties = {
  width: '100%',
  background: '#A8192E',
  color: '#F5F5F5',
  border: 'none',
  borderRadius: 0,
  padding: '16px',
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  cursor: 'pointer',
  transition: 'background 0.2s, color 0.2s'
};

const disabledStyle: React.CSSProperties = {
  ...btnStyle,
  opacity: 0.45,
  cursor: 'not-allowed'
};

function SubmitButton({
  availableForSale,
  selectedVariantId
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  if (!availableForSale) {
    return (
      <button disabled style={disabledStyle}>
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button disabled style={disabledStyle}>
        Select an Option
      </button>
    );
  }

  return (
    <button
      aria-label="Add to cart"
      style={btnStyle}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = '#F5F5F5';
        (e.currentTarget as HTMLButtonElement).style.color = '#A8192E';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = '#A8192E';
        (e.currentTarget as HTMLButtonElement).style.color = '#F5F5F5';
      }}
    >
      Add To Cart
    </button>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { addCartItem, refreshCart } = useCart();
  const { state } = useProduct();
  const { shop } = useShop();
  const [message, formAction] = useActionState(addItem, null);

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every((option) => option.value === state[option.name.toLowerCase()])
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const actionWithVariant = formAction.bind(null, selectedVariantId);
  const finalVariant = variants.find((variant) => variant.id === selectedVariantId)!;

  return (
    <form
      action={async () => {
        addCartItem(finalVariant, product);
        trackAddToCart({
          currency: finalVariant.price.currencyCode,
          value: parseFloat(finalVariant.price.amount),
          items: [
            {
              item_id: product.id,
              item_name: product.title,
              item_variant: finalVariant.title,
              item_brand: shop.name,
              price: parseFloat(finalVariant.price.amount),
              quantity: 1,
              currency: finalVariant.price.currencyCode
            }
          ],
          shopId: shop.id
        });
        await actionWithVariant();
        refreshCart();
      }}
    >
      <SubmitButton availableForSale={availableForSale} selectedVariantId={selectedVariantId} />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
