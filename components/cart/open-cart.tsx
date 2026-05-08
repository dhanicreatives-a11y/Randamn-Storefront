import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function OpenCart({
  className,
  quantity
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center text-[#f5f5f5] hover:text-[#a8192e] transition-colors duration-200">
      <ShoppingCartIcon className={clsx('h-5 w-5', className)} />
      {quantity ? (
        <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center bg-[#a8192e] text-[10px] font-medium text-[#f5f5f5]">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
