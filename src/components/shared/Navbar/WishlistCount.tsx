"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useSyncExternalStore } from "react";

type Props = {
  isMobileMenuOpen: boolean;        // optional, like CartButton
};

const emptySubscribe = () => () => {};

export default function WishlistButton({ isMobileMenuOpen}: Props) {
  const { wishlist } = useWishlist();
  const count = wishlist.length;

  //  Hydration guard to avoid server/client mismatch
  const isHydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  return (
    <button
      aria-label="Wishlist"
      className="relative p-2 hover:text-gold transition-colors duration-200"
    >
      {/* Heart Icon */}
      <Heart strokeWidth={2} className="w-6 h-6" />

      {/* Count Badge */}
      {isHydrated  && (
        <span
          className={`absolute -top-1 -right-1 min-w-[20px] h-5 px-1 flex items-center justify-center rounded-full text-xs font-semibold shadow-md
            ${isMobileMenuOpen ? "bg-white text-black" : "bg-black text-white"}`}
        >
          {count}
        </span>
      )}
    </button>
  );
}
