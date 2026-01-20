"use client";

import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import Swal from "sweetalert2";
import { useCart } from "@/context/CartContext";
import CartItemCount from "./CartItemCount";
import { getImageUrl } from "@/lib/getImageUrl";
import { useSyncExternalStore } from "react";

export function ShoppingCart() {
  const { cart, updateQty } = useCart();

  //================Prevent SSR hydration mismatch for client-only state (cart/localStorage) ================//
  const mounted = useSyncExternalStore(
    () => () => { },
    () => true,
    () => false
  );

  if (!mounted) return null;
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
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">
          Shopping Cart
        </h2>
        <CartItemCount />
      </div>

      {/* Cart List */}
      <div className="space-y-4">

        {cart.map((item) => (
          console.log(`item image`, item.image),
          console.log("CART ITEMS", `${process.env.NEXT_PUBLIC_API_URL}${item.image}`),
          console.log("CART ITEM IMAGE URL", getImageUrl(item.image)),
          <div
            key={`${item.productId}-${item.color}-${item.size}`}
            className="group relative overflow-hidden shadow-2xl bg-white/80 backdrop-blur-xl p-5 transition-all duration-300  hover:shadow-xl"
          >
            <div className="flex gap-5">
              {/* Image */}
              <div className="w-24 h-28  overflow-hidden bg-gray-100 flex-shrink-0">
                <Image
                  width={96}
                  height={112}
                  src={getImageUrl(item.image)}
                  // src={`${process.env.NEXT_PUBLIC_API_URL}${item.image}`}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-wide text-gray-900">
                    {item.name}
                  </h3>

                  <p className="text-xs text-gray-500 mt-2">
                    Quantity{" "}
                    <span className="mx-1 font-semibold text-gray-800">{item.quantity}</span>
                    · Price{" "}
                    <span className="font-semibold text-gray-800">{item.price}TK</span>
                  </p>

                  <p className="text-xs text-gray-600 mt-1">
                    Color: <span className="font-medium text-gray-900">{item.color}</span> · Size:{" "}
                    <span className="font-medium text-gray-900">{item.size}</span>
                  </p>
                </div>

                {/* Quantity & Price Controls */}
                <div className="flex items-center justify-between mt-4 gap-2">
                  <div className="flex items-center border border-gray-300">
                    <button
                      onClick={() =>
                        updateQty(item.productId, item.color, item.size, item.quantity - 1)
                      }
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 cursor-pointer"
                    >
                      <Minus size={12} />
                    </button>

                    <input
                      type="text"
                      value={item.quantity}
                      readOnly
                      className="w-10 h-8 text-center border-x border-gray-300 text-sm text-gray-900 focus:outline-none"
                    />

                    <button
                      onClick={() => {
                        if (item.quantity >= item.stock) {
                          Swal.fire({
                            icon: "warning",
                            title: "Stock limit reached",
                            text: `Only ${item.stock} item(s) available`,
                          });
                          return;
                        }
                        updateQty(item.productId, item.color, item.size, item.quantity + 1);
                      }}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 cursor-pointer"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  <p className="text-base font-semibold text-[#E31E24]">
                    {(item.price * item.quantity).toFixed(2)}TK
                  </p>

                </div>

                {/* SKU */}
                <div className="mt-2">
                  <span className="text-[11px] uppercase tracking-widest text-gray-400">
                    SKU · {item.sku}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
}