"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";



const WishlistTable = () => {
      const { wishlist, removeFromWishlist } = useWishlist();
      if (wishlist.length === 0) {
      return <p className="text-center py-10">Wishlist is empty</p>;
       }
  return (
    <div className="max-w-7xl mx-auto space-y-6 px-4 sm:px-6 lg:px-8 mt-10">
      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden lg:block">
        {/* Header */}
        <div className="grid grid-cols-[80px_1fr_200px_200px_200px] border-b py-4 text-gray-500 text-xl">
          <div />
          <div>Product name</div>
          <div>Unit price</div>
          <div>Stock status</div>
          <div />
        </div>

        {/* Rows */}
        {wishlist?.map((item) => (
          <div
            key={item.productId}
            className="grid grid-cols-[80px_1fr_200px_200px_200px] items-center border-b py-6"
          >
            <button
               onClick={() => removeFromWishlist(item.productId)}
              className="flex items-center justify-center bg-black text-white h-8 w-8 rounded-full border cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-6">
              <div className="relative h-28 w-20 overflow-hidden">
                <Image
                  src="https://colourrose.shop/wp-content/uploads/2024/11/2-19-300x300.jpg"
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl tracking-wide uppercase">{item.name}</h3>
            </div>

            <div className="text-xl">{item.price.toLocaleString()} TK</div>

            <div className="text-xl uppercase tracking-wide text-gray-500">
              {item.stockStatus ? "In stock" : "Out of stock"}
            </div>

            <button className="group relative bg-black px-8 py-3 text-xs tracking-widest text-white overflow-hidden">
              <span className="relative z-10">SELECT OPTIONS</span>
              <span className="absolute bottom-2 left-1/2 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-[70%] group-hover:left-[15%]" />
            </button>
          </div>
        ))}
      </div>

      {/* ================= MOBILE / TABLET CARDS ================= */}
      <div className="space-y-6 lg:hidden">
        {wishlist?.map((item) => (
          <div
            key={item.productId}
            className="relative border p-4 rounded-md space-y-4"
          >
            {/* Remove */}
            <button
               onClick={() => removeFromWishlist(item.productId)}
              className="
                absolute top-2 right-2
                flex items-center justify-center
                bg-black text-white
                h-8 w-8 rounded-full
                border cursor-pointer
                transition hover:bg-red-600
                lg:hidden 
              "
              aria-label="Remove item"
            >
              <X size={18} />
            </button>
            {/* Product */}
            <div className="flex gap-4">
              <div className="relative h-32 w-24 overflow-hidden flex-shrink-0">
                <Image
                  src="https://colourrose.shop/wp-content/uploads/2024/11/2-19-300x300.jpg"
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium uppercase">{item.name}</h3>
                <p className="text-sm">{item.price.toLocaleString()} TK</p>
                <p className="text-xs uppercase ">
                  {item.stockStatus ? "In stock" : "Out of stock"}
                </p>
              </div>
            </div>

            {/* Button */}
            <button className="w-full group relative bg-black py-3 text-xs tracking-widest text-white overflow-hidden">
              <span className="relative z-10">SELECT OPTIONS</span>
              <span className="absolute bottom-2 left-1/2 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-[60%] group-hover:left-[20%]" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistTable;
