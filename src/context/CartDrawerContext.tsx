'use client';
import { createContext, useContext, useState } from 'react';

type CartMode = "SHOP" | "PICKUP";

interface CartDrawerContextType {
  isOpen: boolean;
  mode: CartMode;
  openDrawer: (mode?: CartMode) => void;
  closeDrawer: () => void;
}

const CartDrawerContext = createContext<CartDrawerContextType | null>(null);

export const CartDrawerProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<CartMode>("SHOP");

  const openDrawer = (m: CartMode = "SHOP") => {
    setMode(m);
    setIsOpen(true);
  };

  const closeDrawer = () => setIsOpen(false);

  return (
    <CartDrawerContext.Provider value={{ isOpen, mode, openDrawer, closeDrawer }}>
      {children}
    </CartDrawerContext.Provider>
  );
};

export const useCartDrawer = () => {
  const ctx = useContext(CartDrawerContext);
  if (!ctx) throw new Error("useCartDrawer must be used inside CartDrawerProvider");
  return ctx;
};