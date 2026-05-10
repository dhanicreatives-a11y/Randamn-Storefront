import CartModal from 'components/cart/modal';
import Image from 'next/image';
import Link from 'next/link';

export async function Navbar({ currency }: { currency: string }) {
  return (
    <nav
      style={{
        width: '100%',
        background: '#0d0d0d',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Link href={`/${currency}`} prefetch={true}>
        {/* Desktop: full logo */}
        <Image
          src="/logo-full.png"
          alt="Randamn"
          width={140}
          height={40}
          priority
          style={{ objectFit: 'contain', display: 'block' }}
          className="hidden md:block"
        />
        {/* Mobile: icon logo */}
        <Image
          src="/logo-icon.png"
          alt="Randamn"
          width={36}
          height={36}
          priority
          style={{ objectFit: 'contain', display: 'block' }}
          className="block md:hidden"
        />
      </Link>
      <div style={{ color: '#A8192E' }}>
        <CartModal />
      </div>
    </nav>
  );
}
