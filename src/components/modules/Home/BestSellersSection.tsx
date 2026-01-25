/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ProductCard } from '@/components/shared/ProductCard/ProductCard';
import { motion, } from 'framer-motion'



const container = {
    hidden: {
        opacity: 0,
    },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
}
export function BestSellersSection({ products }: { products: any[] }) {
    return (
        <section>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
                {products.map((product : any) => (
                    <motion.div
                        key={product.id}
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{
                            once: true,
                            margin: '-100px',
                        }}
                    >
                        <ProductCard product={product} category={product.category?.[0]?.categoryId || 'General'} />
                    </motion.div>
                ))}

            </div>
        </section>
    )
}
