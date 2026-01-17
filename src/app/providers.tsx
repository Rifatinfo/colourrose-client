'use client';

import { CartProvider } from '@/context/CartContext';
import { CartDrawerProvider } from '@/context/CartDrawerContext';
import { LoginProvider } from '@/context/UIContext';
import { WishlistProvider } from '@/context/WishlistContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LoginProvider>
      <CartProvider>
        <CartDrawerProvider>
          <WishlistProvider>
            {children}
          </WishlistProvider>
        </CartDrawerProvider>
      </CartProvider>
    </LoginProvider>
  );
}

