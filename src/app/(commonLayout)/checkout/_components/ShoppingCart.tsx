"use client";

import Image from "next/image";
import { Plus, Minus, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { useCart } from "@/context/CartContext";
import CartItemCount from "./CartItemCount";

export function ShoppingCart() {
  const { cart, updateQty, removeItem } = useCart();
  if (!cart || cart.length === 0) {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">
            Shopping Cart
          </h2>
        </div>
        <p className="text-center text-gray-500">Your cart is empty</p>
      </div>
    );
  }
  return (
    <div className="mb-8">
      {/*=============== Section Header ===================*/}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">
          Shopping Cart
        </h2>
        {/* <span className="font-semibold text-gray-400">{cart.length} Items</span> */}
        <CartItemCount />
      </div>

      {/* Cart List */}
      <div className="space-y-4">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="group relative overflow-hidden shadow-2xl bg-white/80 backdrop-blur-xl p-5 transition-all duration-300  hover:shadow-xl"
          >
            <div className="flex gap-5">
              {/* Image */}
              <div className="w-24 h-28 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                <Image
                  width={96}
                  height={112}
                  src="https://colourrose.shop/wp-content/uploads/2024/03/P-1131-01-768x998.jpg"
                  alt="Oversized Sweatshirt"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-wide text-gray-900">
                    Oversized Sweatshirt
                  </h3>

                  <p className="text-xs text-gray-500 mt-2">
                    Quantity{" "}
                    <span className="mx-1 font-semibold text-gray-800">1</span>
                    · Price{" "}
                    <span className="font-semibold text-gray-800">
                      Tk. 840
                    </span>
                  </p>
                </div>

                {/* Bottom */}
                <div className="flex items-center justify-between mt-4">
                  <span className="text-[11px] uppercase tracking-widest text-gray-400">
                    SKU · P-6543
                  </span>

                  <span className="text-base font-semibold text-[#E31E24]">
                    Tk. 840
                  </span>
                </div>
              </div>
            </div>

            {/* Soft Accent */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </div>
  );
}