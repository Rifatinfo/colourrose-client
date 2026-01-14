import Image from "next/image";

export function ShoppingCart() {
  return (
    <div className="mb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">
          Shopping Cart
        </h2>
        <span className="font-semibold text-gray-400">2 Items</span>
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
                  src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
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
