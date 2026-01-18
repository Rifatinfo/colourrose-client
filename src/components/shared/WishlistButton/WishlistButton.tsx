"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useFettie } from "@/hooks/use-confetti";

type Props = {
    product: {
    productId: string;
    name: string;
    sku: string;
    salePrice: string;
    images: { url: string }[];
    stockStatus: string;
    };
};

export default function WishlistButton({ product }: Props) {
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const { run } = useFettie();
    const inWishlist = isInWishlist(product.productId);

    const toggleWishlist = () => {
        if (inWishlist) {
            removeFromWishlist(product.productId);
        } else {
            addToWishlist({
                productId: product.productId,
                name: product.name,
                sku: product.sku,
                salePrice: parseFloat(product.salePrice),
                images: product.images || "",
                stockStatus: product.stockStatus,
            });
            run();
        }
    };

    return (
        <button
            onClick={toggleWishlist}
            className="flex items-center gap-2 text-sm transition-colors cursor-pointer"
        >
            <Heart
                className={`h-4 w-4 transition ${inWishlist
                    ? "fill-black text-black"
                    : "text-gray-500 hover:text-black"
                    }`}
            />
            {inWishlist ? "Wishlisted" : "Add to Wishlist"}
        </button>
    );
}
