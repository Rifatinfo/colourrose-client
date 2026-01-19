"use client";

import { useSyncExternalStore } from "react";


 const OrderItemCount  = ({productCount} : {productCount: number})  => {
  
  //================Prevent SSR hydration mismatch for client-only state (cart/localStorage) ================//
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) return null;

  return (
    <span className="font-semibold text-gray-900">{productCount}</span>
  );
}

export default OrderItemCount;