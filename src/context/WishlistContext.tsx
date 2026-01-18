"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

export type WishlistItem = {
   productId: string;
    name: string;
    sku: string;
    salePrice: number;
    images: { url: string }[];
    stockStatus: string;
};

type WishlistContextType = {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
};

const WishlistContext = createContext<WishlistContextType | null>(null);
const isClient = typeof window !== "undefined";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    if (!isClient) return [];
    try {
      const saved = localStorage.getItem("wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (item: WishlistItem) => {
    console.log();
    
    setWishlist((prev) => {
      if (prev.some((p) => p.productId === item.productId)) {
        Swal.fire("Already in wishlist");
        return prev;
      }
      return [...prev, item];
    });
  };


  // inside your WishlistContext
 const removeFromWishlist = (productId: string) => {
  const item = wishlist.find((i) => i.productId === productId);

  if (!item) return; 

  // Show confirmation modal
  Swal.fire({
    title: "Are you sure?",
    text: `Do you want to remove "${item.name}" from your wishlist?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, remove it",
    cancelButtonText: "Cancel",
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      setWishlist((prev) =>
        prev.filter((i) => i.productId !== productId)
      );
    }
  });
};

  const isInWishlist = (productId: string) =>
    wishlist.some((item) => item.productId === productId);

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
};
