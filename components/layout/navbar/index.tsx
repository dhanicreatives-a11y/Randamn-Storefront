import CartModal from 'components/cart/modal';
import Link from 'next/link';

export async function Navbar({ currency }: { currency: string }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-3 bg-[#0d0d0d]">
      <Link
        href={`/${currency}`}
        prefetch={true}
        style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '0.05em' }}
        className="text-[#f5f5f5]"
      >
        #RanDamn
      </Link>
      <CartModal />
    </nav>
  );
}
