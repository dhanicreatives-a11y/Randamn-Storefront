import CartModal from 'components/cart/modal';
import Link from 'next/link';

export async function Navbar({ currency }: { currency: string }) {
  return (
    <nav
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        background: 'transparent',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Link href={`/${currency}`} prefetch={true}>
        <img
          src="/Logo-full%20white.png"
          alt="Randamn"
          style={{
            width: 140,
            height: 'auto',
            objectFit: 'contain',
            display: 'block'
          }}
        />
      </Link>
      <Link
        href={`/${currency}/about`}
        prefetch={true}
        style={{
          fontSize: 10,
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          color: '#888'
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
