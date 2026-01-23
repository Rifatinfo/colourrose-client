'use client';

import { CartProvider } from '@/context/CartContext';
import { CartDrawerProvider } from '@/context/CartDrawerContext';
import { WishlistProvider } from '@/context/WishlistContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
      <CartProvider>
        <CartDrawerProvider>
          <WishlistProvider>
            {children}
          </WishlistProvider>
        </CartDrawerProvider>
      </CartProvider>
  );
}

