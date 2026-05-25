import CartModal from 'components/cart/modal';
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
        {/* Desktop: full white logo */}
        <img
          src="/Logo-full%20white.png"
          alt="Randamn"
          style={{
            width: 140,
            height: 'auto',
            objectFit: 'contain',
            display: 'block'
          }}
          className="hidden md:block"
        />
        {/* Mobile: icon logo */}
        <img
          src="/logo-icon.png"
          alt="Randamn"
          style={{
            width: 36,
            height: 'auto',
            objectFit: 'contain',
            display: 'block'
          }}
          className="block md:hidden"
        />
      </Link>
      <Link
        href={`/${currency}/about`}
        prefetch={true}
        style={{
          fontSize: 10,
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          color: '#555'
        }}
      >
        about
      </Link>
      <div style={{ color: '#A8192E' }}>
        <CartModal />
      </div>
    </nav>
  );
}
