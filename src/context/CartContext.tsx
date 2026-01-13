
'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';

export interface CartItem {
    productId: string;
    name: string;
    sku: string;
    price: number;
    image: string;
    color: string;
    size: string;
    quantity: number;
    stock: number;
}

interface CartContextType {
    cart: CartItem[];
    cartCount: number;
    addToCart: (item: CartItem) => void;
    updateQty: (productId: string, color: string, size: string, qty: number) => void;
    removeItem: (productId: string, color: string, size: string) => void;
}

const CartContext = createContext<CartContextType | null>(null);

const isClient = typeof window !== 'undefined';

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        if (!isClient) return [];
        try {
            const saved = localStorage.getItem('cart');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    /*===================== Persist cart to localStorage =====================*/
    useEffect(() => {
        if (!isClient) return;
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    /*===================== Add to Cart =====================*/
    const addToCart = (item: CartItem) => {
        setCart((prev) => {
            //======================== Block out-of-stock items============
            if (item.stock === 0) {
                Swal.fire({
                    icon: "error",
                    title: "OUT OF STOCK",
                    text: "This product is currently unavailable",
                });
                return prev;
            }

            //======================== Find if product already exists in cart (same color + size)============
            const exist = prev.find(
                (p) =>
                    p.productId === item.productId &&
                    p.color === item.color &&
                    p.size === item.size
            );

            if (exist) {
                const newQty = exist.quantity + item.quantity;

                // Prevent exceeding stock
                if (newQty > item.stock) {
                    Swal.fire({
                        icon: "error",
                        title: "LIMIT EXCEEDED",
                        text: `Only ${item.stock} item(s) available`,
                    });
                    return prev;
                }

                // Update existing item with correct quantity
                return prev.map((p) =>
                    p === exist ? { ...p, quantity: newQty } : p
                );
            }

            // Add new item
            return [...prev, item];
        });
    };

 

    /*===================== Update quantity inside cart =====================*/
    const updateQty = (productId: string, color: string, size: string, qty: number) => {
        setCart((prev) =>
            prev.map((p) =>
                p.productId === productId &&
                    p.color === color &&
                    p.size === size
                    ? { ...p, quantity: Math.max(1, Math.min(qty, p.stock)) }
                    : p
            )
        );
    };

    /*===================== Remove item from cart =====================*/
    const removeItem = (productId: string, color: string, size: string) => {
        setCart((prev) =>
            prev.filter(
                (p) =>
                    !(p.productId === productId && p.color === color && p.size === size)
            )
        );
    };

    const cartCount = useMemo(
        () => cart.reduce((sum, i) => sum + i.quantity, 0),
        [cart]
    );

    return (
        <CartContext.Provider value={{ cart, cartCount, addToCart , updateQty, removeItem }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used inside CartProvider');
    return ctx;
};
