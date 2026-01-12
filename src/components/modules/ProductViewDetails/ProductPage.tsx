/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react'

import ProductImageGallery from './ProductImageGallery';
import { ProductInfo } from './ProductInfo';
import ProductTabs from './ProductTabs';
import RelatedProducts from '@/components/shared/RelatedProduct/RelatedProducts';
import { CartDrawer } from './CartDrawer';
import Breadcrumb from '@/components/shared/Breadcrumb/Breadcrumb';

type CartMode = "SHOP" | "PICKUP";

type ProductPageProps = {
  product: any;
};
const ProductPage = ({ product }: ProductPageProps) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [mode, setMode] = useState<CartMode>("SHOP");

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            {/*================ Breadcrumb ================*/}
            <div className='bg-gray-200'>
                <Breadcrumb />
            </div>
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Product Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    <ProductImageGallery  />
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

                <ProductTabs  product={product} />
                <RelatedProducts  />
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