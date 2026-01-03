"use client";
import { ProductCard } from '@/components/shared/ProductCard/ProductCard';
import { motion, } from 'framer-motion'

export const products = [
    {
        id: 1,
        name: 'The Quilted Patchwork Jacket',
        price: '$398.00',
        image:
            'https://cdn.magicpatterns.com/uploads/64ZrYudT1YWtvFcXmHbcMd/image.png',
        category: 'Limited Edition',
        badge: 'Best Seller',
        rating: 4.9,
        colors: ['#C45D48', '#000000', '#F57C00', '#FFD700'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
    },
    {
        id: 2,
        name: 'Oversized Wool Coat',
        price: '$298.00',
        image:
            'https://cdn.magicpatterns.com/uploads/c3ZWP99BmDtxDVPC4ximJy/image.png',
        category: 'Outerwear',
        badge: 'New Arrival',
        rating: 4.7,
        colors: ['#C45D48', '#000000', '#F57C00', '#FFD700'],
        sizes: ['S', 'M', 'L'],
    },
    {
        id: 3,
        name: 'Textured Knit Sweater',
        price: '$145.00',
        image:
            'https://cdn.magicpatterns.com/uploads/632fbkwpepgm2bRnJQjkwt/image.png',
        category: 'Knitwear',
        rating: 4.8,
        colors: ['#C45D48', '#000000', '#F57C00', '#FFD700'],
        sizes: ['XS', 'S', 'M', 'L'],
    },
]
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
                {products.map((product, index) => (
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
                        <ProductCard product={product} />
                    </motion.div>
                ))}

            </div>
        </section>
    )
}
