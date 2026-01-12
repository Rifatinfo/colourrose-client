/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ProductCard } from '@/components/shared/ProductCard/ProductCard';
import { motion, } from 'framer-motion'



const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/product`,
    { cache: "no-store" }
);

const json = await res.json();
const products = json.data;
console.log(products);

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
export function BestSellersSection() {
    return (
        <section>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
                {products.slice(0, 3).map((product : any, index : number) => (
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
                        <ProductCard product={product} category={product.category || 'General'} />
                    </motion.div>
                ))}

            </div>
        </section>
    )
}
