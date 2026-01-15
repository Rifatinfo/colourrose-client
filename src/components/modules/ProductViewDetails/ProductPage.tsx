/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import ProductImageGallery from './ProductImageGallery';
import { ProductInfo } from './ProductInfo';
import ProductTabs from './ProductTabs';
import RelatedProducts from '@/components/shared/RelatedProduct/RelatedProducts';
import { CartDrawer } from '../card/CartDrawer';
import Breadcrumb from '@/components/shared/Breadcrumb/Breadcrumb';
// import { useCartDrawer } from '@/context/CartDrawerContext';


type ProductPageProps = {
    product: any;
};
const ProductPage = ({ product }: ProductPageProps) => {

    // const { isOpen, mode, closeDrawer } = useCartDrawer();

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            {/*================ Breadcrumb ================*/}
            <div className='bg-gray-200'>
                <Breadcrumb />
            </div>
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/*=========== Product Layout ============== */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    <ProductImageGallery />
                    <ProductInfo product={product} />
                </div>

                <ProductTabs product={product} />
                <RelatedProducts />
            </section>

            <CartDrawer/>
        </div>
    )
}

export default ProductPage;