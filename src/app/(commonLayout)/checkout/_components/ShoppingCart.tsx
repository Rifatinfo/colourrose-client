import Image from 'next/image'
export function ShoppingCart() {
  return (
    <div className="mb-6">
      <h2 className="text-[#333333] font-bold uppercase text-sm mb-3">
        Shopping Cart
      </h2>
      <div className="bg-white p-3 border border-gray-200 flex gap-4">
        {/* Product Image Placeholder */}
        <div className="w-16 h-20 bg-gray-200 flex-shrink-0">
          <Image
            width={64}
            height={80}
            src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
            alt="Oversized Sweatshirt"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h3 className="text-sm text-gray-700 font-medium uppercase">
            OVERSIZED SWEATSHIRT
          </h3>
          <div className="text-xs text-gray-500 mt-1">
            Qty: <span className="font-bold text-black">1</span> x Tk. 840
          </div>
          <div className="text-sm font-bold text-black mt-1">
            666/08 <span className="ml-4">Tk. 840</span>
          </div>
        </div>
      </div>
    </div>
  )
}
