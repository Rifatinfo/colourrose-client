"use client";

import { Heart } from "lucide-react";
import { useSyncExternalStore } from "react";
import { useWishlist } from "@/context/WishlistContext";
import { useFettie } from "@/hooks/use-confetti";

type Props = {
  product: {
    id: string;
    name: string;
    sku: string;
    salePrice: number;
    images: { url: string }[];
    stockStatus: string;
  };
};

export default function WishlistIconButton({ product }: Props) {
  
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { run } = useFettie();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!mounted) {
    // 👇 prevents hydration mismatch
    return null;
  }

  const wishlisted = isInWishlist(product.id);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        if (wishlisted) {
          removeFromWishlist(product.id);
        } else {

          addToWishlist({
            productId: product.id,
            name: product.name,
            sku: product.sku,
            salePrice: product.salePrice,
            images: product.images[0] ? [{ url: product.images[0].url }] : [],
            stockStatus: product.stockStatus,
          });
          run();
        }
      }}
      className="cursor-pointer absolute top-4 right-4 p-2 rounded-full
                 bg-white/80 backdrop-blur-sm hover:bg-white
                 transition-all duration-300 z-10"
    >
      <Heart
        className={`w-4 h-4 transition-colors duration-300 ${
          wishlisted ? "fill-black text-black" : "text-black"
        }`}
      />
    </button>
  );
}


