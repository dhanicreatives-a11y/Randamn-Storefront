import { FourthwallShop } from 'lib/fourthwall/types';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { CartProvider } from './cart/cart-context';
import { Navbar } from './layout/navbar';
import { ShopProvider } from './shop/shop-context';
import { WelcomeToast } from './welcome-toast';

export function Wrapper({
  children,
  currency,
  shop
}: {
  children: ReactNode;
  currency: string;
  shop: FourthwallShop;
}) {
  return (
    <ShopProvider shop={shop}>
      <CartProvider currency={currency}>
        <a
          href="#main-content"
          style={{
            position: 'absolute', top: -48, left: 0, zIndex: 100,
            background: '#A8192E', color: '#F5F5F5',
            padding: '8px 16px', fontSize: 11,
            letterSpacing: '0.15em', textTransform: 'uppercase',
            transition: 'top 0.1s'
          }}
          onFocus={(e) => { (e.currentTarget as HTMLAnchorElement).style.top = '0'; }}
          onBlur={(e) => { (e.currentTarget as HTMLAnchorElement).style.top = '-48px'; }}
        >
          Skip to content
        </a>
        <Navbar currency={currency} />
        <main id="main-content">
          {children}
          <Toaster closeButton />
          <WelcomeToast />
        </main>
      </CartProvider>
    </ShopProvider>
  );
}
