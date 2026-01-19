"use client";

import { useCart } from "@/context/CartContext";
import { useSyncExternalStore } from "react";

 const CartItemCount = ()  => {
  const { cart } = useCart();
  //================Prevent SSR hydration mismatch for client-only state (cart/localStorage) ================//
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) return null;

  return (
    <span className="font-semibold text-gray-400">
      {cart.length} Items
    </span>
  );
}

export default CartItemCount;