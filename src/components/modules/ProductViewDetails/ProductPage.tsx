'use client';
import { useState } from 'react'

import { ChevronRight } from 'lucide-react'
import ProductImageGallery from './ProductImageGallery';
import { ProductInfo } from './ProductInfo';
import ProductTabs from './ProductTabs';
import RelatedProducts from '@/components/shared/RelatedProduct/RelatedProducts';
import { CartDrawer } from './CartDrawer';

type CartMode = "SHOP" | "PICKUP";


const ProductPage = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [mode, setMode] = useState<CartMode>("SHOP");

    // ✅ This will come from DB / API later
    const product = {
        id: "1",
        name: "EMBROIDERY PANJABI",
        price: 2990,
        sku: "P-1361",
        color: "Navy Blue",
        size: "M",
        image:
            "https://res.cloudinary.com/dgp5rqeqh/image/upload/v1767438820/WhatsApp_Image_2026-01-03_at_5.09.34_PM_1_fg0dlm.jpg",
    };

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <nav className="flex items-center text-xs text-gray-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
                    <a href="#" className="hover:text-gray-900 transition-colors">
                        Home
                    </a>
                    <ChevronRight className="h-3 w-3 mx-2 flex-shrink-0" />
                    <a href="#" className="hover:text-gray-900 transition-colors">
                        EID-25
                    </a>
                    <ChevronRight className="h-3 w-3 mx-2 flex-shrink-0" />
                    <span className="text-gray-900 font-medium">EMBROIDERY PANJABI</span>
                </nav>

                {/* Product Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    <ProductImageGallery />
                    <ProductInfo product={product}
                        onShopNow={() => {
                            setMode("SHOP");
                            setIsCartOpen(true);
                        }}
                        onPickup={() => {
                            setMode("PICKUP");
                            setIsCartOpen(true);
                        }} />
                </div>

                <ProductTabs />
                <RelatedProducts />
            </section>

            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                mode={mode}
                product={product}
            />
        </div>
    )
}

export default ProductPage;