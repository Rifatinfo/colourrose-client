"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useSyncExternalStore } from "react";
import { getImageUrl } from "@/lib/getImageUrl";
// import SelectOptionsButton from "./SelectOptionsButton";

const WishlistTable = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  //  Ensure same HTML on server & client
  console.log("Wishlidtttttttttttttttttt", wishlist[0]?.images[0]?.url);

  const mounted = useSyncExternalStore(
    () => () => { },
    () => true,
    () => false
  );

  //  Prevent hydration mismatch
  if (!mounted) return null;

  // Empty state
  if (wishlist.length === 0) {
    return <p className="text-center py-10">Your wishlist is empty</p>;
  }

  return (
    <div className="space-y-6 px-4 lg:px-10 mt-10">
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
        {wishlist.map((item, idx) => (
          console.log(
            "FINAL IMAGE URL:",
            getImageUrl(item?.images?.[0]?.url)
          ),
          console.log(
            "ENV:",
            process.env.NEXT_PUBLIC_API_URL
          ),
          <div
            key={idx}
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
                  key={idx}
                  // src={getImageUrl(item.images[0].url)}
                  src={getImageUrl(item?.images?.[0]?.url)}
                  alt={item.name}
                  width={80}
                  height={112}
                  unoptimized
                />
              </div>
              <h3 className="tracking-wide uppercase">
                {item.name}
              </h3>
            </div>

            <div className="">{item.salePrice} TK</div>

            <div className="uppercase tracking-wide text-gray-500">
              {/* {item.stockStatus > 0 ? "In stock" : "Out of stock"} */}
              {Number(item.stockStatus) > 0 ? "In stock" : "Out of stock"}
            </div>

            <button className="group relative bg-black px-8 py-3 text-xs tracking-widest text-white overflow-hidden">
              <span className="relative z-10">SELECT OPTIONS</span>
              <span className="absolute bottom-2 left-1/2 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-[70%] group-hover:left-[15%]" />
            </button>

            {/* <SelectOptionsButton productId={item.productId} /> */}

          </div>
        ))}
      </div>

      {/* ================= MOBILE / TABLET ================= */}
      <div className="space-y-6 lg:hidden">
        {wishlist.map((item, index) => (
          <div
            key={index}
            className="relative border p-4 rounded-md space-y-4"
          >
            <button
              onClick={() => removeFromWishlist(item.productId)}
              className="absolute top-2 right-2 flex items-center justify-center bg-black text-white h-8 w-8 rounded-full border"
            >
              <X size={18} />
            </button>

            <div className="flex gap-4">
              <div className="relative h-32 w-24 overflow-hidden">
                <Image
                  key={index}
                  // src={getImageUrl(item.images[0].url)}
                  src={getImageUrl(item?.images?.[0]?.url)}
                  alt={item.name}
                  width={80}
                  height={112}
                  unoptimized
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium uppercase">
                  {item.name}
                </h3>
                <p className="text-sm">{item.salePrice} TK</p>
                <p className="text-xs uppercase">
                  {Number(item.stockStatus) > 0 ? "In stock" : "Out of stock"}
                </p>
              </div>
            </div>

            <button className="cursor-pointer w-full bg-black py-3 text-xs tracking-widest text-white">
              SELECT OPTIONS
            </button>
            {/* Select Options */}
            {/* <SelectOptionsButton productId={item.productId} /> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistTable;
