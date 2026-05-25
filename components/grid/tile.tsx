import clsx from 'clsx';
import Image from 'next/image';
import Price from 'components/price';

const useFourthwallImages = process.env.NEXT_PUBLIC_USE_FW_IMAGE_OPTIMIZATION === 'true';

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  transformedSrc,
  index,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  index?: number;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: 'bottom' | 'center';
  };
  transformedSrc?: string;
} & React.ComponentProps<typeof Image>) {
  const showNew = label && index !== undefined && index % 2 === 0;

  const imgClass = clsx('h-full w-full object-contain transition-opacity duration-300', {
    'group-hover:opacity-50': isInteractive && label
  });

  return (
    <div
      className={clsx(
        'group relative flex h-full w-full items-center justify-center overflow-hidden',
        { 'ring-2 ring-[#a8192e]': active }
      )}
      style={{ background: '#111', padding: '16px' }}
    >
      {props.src ? (
        useFourthwallImages && transformedSrc ? (
          <img
            src={transformedSrc}
            alt={props.alt as string}
            className={imgClass}
            width={props.width as number}
            height={props.height as number}
            loading={props.priority ? 'eager' : 'lazy'}
            style={{ background: '#111' }}
          />
        ) : (
          <Image className={imgClass} style={{ background: '#111' }} {...props} />
        )
      ) : null}

      {showNew && (
        <div style={{
          position: 'absolute',
          top: 8,
          left: 8,
          fontSize: 8,
          color: '#A8192E',
          border: '1px solid #A8192E',
          padding: '2px 6px',
          letterSpacing: '0.15em',
          pointerEvents: 'none'
        }}>
          NEW
        </div>
      )}

      {label && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.9))',
          padding: '12px 14px',
          pointerEvents: 'none'
        }}>
          <p style={{
            fontSize: 13,
            color: '#F5F5F5',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em'
          }}>
            {label.title}
          </p>
          <p style={{ fontSize: 12, color: '#A8192E', marginTop: 4 }}>
            <Price amount={label.amount} currencyCode={label.currencyCode} />
          </p>
        </div>
      )}
    </div>
  );
}
