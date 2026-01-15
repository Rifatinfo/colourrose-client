"use client";

import { Heart } from "lucide-react";
import { useSyncExternalStore } from "react";
import { useWishlist } from "@/context/WishlistContext";
import { useFettie } from "@/hooks/use-confetti";

type Props = {
    product: {
        productId: string;
        name: string;
        sku: string;
        price: number;
        image: string;
        stock: number;
    };
};

export default function WishlistIconButton({ product }: Props) {
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const { run } = useFettie();
    const mounted = useSyncExternalStore(
        () => () => { },
        () => true,
        () => false
    );

    if (!mounted) {
        // 👇 prevents hydration mismatch
        return null;
    }

    const wishlisted = isInWishlist(product.productId);

    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                if (wishlisted) {
                    removeFromWishlist(product.productId);
                } else {
                    addToWishlist({
                        productId: product.productId,
                        name: product.name,
                        sku: product.sku,
                        price: product.price,
                        image: product.image,
                        stock: product.stock,
                    });
                    run();
                }
            }}
            className="cursor-pointer absolute top-4 right-4 p-2 rounded-full
                 bg-white/80 backdrop-blur-sm hover:bg-white
                 transition-all duration-300 z-10"
        >
            <Heart
                className={`w-4 h-4 transition-colors duration-300 ${wishlisted ? "fill-black text-black" : "text-black"
                    }`}
            />
        </button>
    );
}
