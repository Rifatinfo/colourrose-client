'use client';
import { useState } from 'react'

import ProductImageGallery from './ProductImageGallery';
import { ProductInfo } from './ProductInfo';
import ProductTabs from './ProductTabs';
import RelatedProducts from '@/components/shared/RelatedProduct/RelatedProducts';
import { CartDrawer } from './CartDrawer';
import Breadcrumb from '@/components/shared/Breadcrumb/Breadcrumb';

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
            {/*================ Breadcrumb ================*/}
            <div className='bg-gray-200'>
                <Breadcrumb />
            </div>
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">


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