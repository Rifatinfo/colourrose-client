"use client";

import { ShoppingCart } from "lucide-react";
import { useSyncExternalStore } from "react";

type Props = {
    cartCount: number;
    isMobileMenuOpen: boolean;
};

const emptySubscribe = () => () => { };

export default function CartButton({ cartCount, isMobileMenuOpen }: Props) {
    const isHydrated = useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    );

    return (
        <button
            aria-label="Shopping cart"
            className="relative p-2 hover:text-gold transition-colors duration-200"
        >
            <ShoppingCart strokeWidth={2} className="w-6 h-6" />

            <span
                className={`absolute -top-1 -right-1 min-w-[20px] h-5 px-1
        rounded-full flex items-center justify-center
        text-xs font-semibold shadow-md
        ${isMobileMenuOpen ? "bg-white text-black" : "bg-black text-white"}`}
            >
                {isHydrated ? cartCount : ""}
            </span>
        </button>
    );
}
