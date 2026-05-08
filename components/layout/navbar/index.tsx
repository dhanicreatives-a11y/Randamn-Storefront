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
          className="block md:hidden h-11 w-auto object-contain"
          priority
        />
        <Image
          src="/logo-full.png"
          alt="RANDAMN"
          width={200}
          height={56}
          className="hidden md:block h-12 w-auto object-contain"
          priority
        />
      </Link>
      <CartModal />
    </nav>
  );
}
