'use client';

import { useProduct, useUpdateURL } from 'components/product/product-context';
import { ProductOption, ProductVariant } from 'lib/types';

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

export function VariantSelector({
  options,
  variants
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const { state, updateOption } = useProduct();
  const updateURL = useUpdateURL();
  const hasNoOptionsOrJustOneOption =
    !options.length || (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({ ...accumulator, [option.name.toLowerCase()]: option.value }),
      {}
    )
  }));

  return options.map((option) => (
    <form key={option.id}>
      <dl style={{ marginBottom: 24 }}>
        <dt style={{
          fontSize: 10,
          color: '#F5F5F5',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: 12,
          opacity: 0.5
        }}>
          {option.name}
        </dt>
        <dd style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {option.values.map((value) => {
            const optionNameLowerCase = option.name.toLowerCase();
            const optionParams = { ...state, [optionNameLowerCase]: value };

            const filtered = Object.entries(optionParams).filter(([key, value]) =>
              options.find(
                (option) => option.name.toLowerCase() === key && option.values.includes(value)
              )
            );
            const isAvailableForSale = combinations.find((combination) =>
              filtered.every(
                ([key, value]) => combination[key] === value && combination.availableForSale
              )
            );

            const isActive = state[optionNameLowerCase] === value;

            return (
              <button
                formAction={() => {
                  const newState = updateOption(optionNameLowerCase, value);
                  updateURL(newState);
                }}
                key={value}
                aria-disabled={!isAvailableForSale}
                disabled={!isAvailableForSale}
                title={`${option.name} ${value}${!isAvailableForSale ? ' (Out of Stock)' : ''}`}
                style={{
                  background: isActive ? '#A8192E' : 'transparent',
                  border: isActive ? '1px solid #A8192E' : '1px solid #333',
                  color: '#F5F5F5',
                  borderRadius: 0,
                  padding: '8px 16px',
                  fontSize: 12,
                  letterSpacing: '0.05em',
                  cursor: isAvailableForSale ? 'pointer' : 'not-allowed',
                  opacity: isAvailableForSale ? 1 : 0.35,
                  transition: 'background 0.2s, border-color 0.2s'
                }}
              >
                {value}
              </button>
            );
          })}
        </dd>
      </dl>
    </form>
  ));
}
