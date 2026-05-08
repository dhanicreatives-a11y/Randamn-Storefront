import clsx from 'clsx';
import Image from 'next/image';
import Price from 'components/price';

const useFourthwallImages = process.env.NEXT_PUBLIC_USE_FW_IMAGE_OPTIMIZATION === 'true';

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  transformedSrc,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: 'bottom' | 'center';
  };
  transformedSrc?: string;
} & React.ComponentProps<typeof Image>) {
  const imageClassName = clsx('h-full w-full object-cover transition-opacity duration-300', {
    'group-hover:opacity-60': isInteractive && label
  });

  return (
    <div
      className={clsx(
        'group relative flex h-full w-full items-center justify-center overflow-hidden bg-[#0d0d0d]',
        {
          'ring-2 ring-[#a8192e]': active
        }
      )}
    >
      {props.src ? (
        useFourthwallImages && transformedSrc ? (
          <img
            src={transformedSrc}
            alt={props.alt as string}
            className={imageClassName}
            width={props.width as number}
            height={props.height as number}
            loading={props.priority ? 'eager' : 'lazy'}
          />
        ) : (
          <Image className={imageClassName} {...props} />
        )
      ) : null}

      {label ? (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="px-4 text-center text-[13px] font-medium uppercase tracking-[0.15em] text-[#f5f5f5]">
            {label.title}
          </p>
          <p className="mt-1 text-[12px] tracking-wide text-[#a8192e]">
            <Price amount={label.amount} currencyCode={label.currencyCode} />
          </p>
        </div>
      ) : null}
    </div>
  );
}
