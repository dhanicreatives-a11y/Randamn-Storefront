'use client';

import clsx from 'clsx';
import { addItem } from 'components/cart/actions';
import { useProduct } from 'components/product/product-context';
import { useShop } from 'components/shop/shop-context';
import { trackAddToCart } from 'lib/analytics';
import { Product, ProductVariant } from 'lib/types';
import { useActionState } from 'react';
import { useCart } from './cart-context';

const buttonBase =
  'relative flex w-full items-center justify-center bg-[#a8192e] px-6 py-4 text-sm font-medium uppercase tracking-widest text-[#f5f5f5] transition-colors duration-200 hover:bg-[#f5f5f5] hover:text-[#a8192e]';
const disabledClasses = 'cursor-not-allowed opacity-50 hover:bg-[#a8192e] hover:text-[#f5f5f5]';

function SubmitButton({
  availableForSale,
  selectedVariantId
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonBase, disabledClasses)}>
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button aria-label="Please select an option" disabled className={clsx(buttonBase, disabledClasses)}>
        Select an Option
      </button>
    );
  }

  return (
    <button aria-label="Add to cart" className={buttonBase}>
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
