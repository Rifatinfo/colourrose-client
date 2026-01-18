"use client";

import { useCart } from "@/context/CartContext";
import { useSyncExternalStore } from "react";

 const CartItemCount = ()  => {
  const { cart } = useCart();
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