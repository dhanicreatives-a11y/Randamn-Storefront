import CartModal from 'components/cart/modal';
import Image from 'next/image';
import Link from 'next/link';

export async function Navbar({ currency }: { currency: string }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-3 bg-[#0d0d0d]">
      <Link href={`/${currency}`} prefetch={true} className="flex items-center">
        <Image
          src="/logo-icon.png"
          alt="RANDAMN"
          width={44}
          height={44}
          priority
          className="block md:hidden"
          style={{ width: '44px', height: 'auto', objectFit: 'contain' }}
        />
        <Image
          src="/logo-full.png"
          alt="RANDAMN"
          width={140}
          height={40}
          priority
          className="hidden md:block"
          style={{ width: '140px', height: 'auto', objectFit: 'contain' }}
        />
      </Link>
      <CartModal />
    </nav>
  );
}
