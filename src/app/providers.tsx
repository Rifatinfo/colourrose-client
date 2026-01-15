'use client';

import { CartProvider } from '@/context/CartContext';
import { CartDrawerProvider } from '@/context/CartDrawerContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <CartDrawerProvider>
        {children}
      </CartDrawerProvider>
    </CartProvider>
  );
}

