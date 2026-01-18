"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link';
import WishlistIconButton from '../WishlistButton/WishlistIconButton';
import { getImageUrl } from '@/lib/getImageUrl';



const item = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1] as const,
        },
    },
}

interface ProductCardProps {
    product: any;
    category: string;
    subCategory?: string;
}


export function ProductCard({
    product,
    category,
    subCategory,
    isLarge = false,
}: {
    product: any
    category: string;
    subCategory?: string;
    isLarge?: boolean
}) {
    const [isHovered, setIsHovered] = useState(false)
    // =============  Determine if product is sold (out of stock) =============//
    const isSold = product.stockQuantity !== undefined ? product.stockQuantity <= 0 : product.sold || false;

    // ============= Extract unique sizes and colors from variants =============//
    const sizes: string[] = product.variants
        ? Array.from(new Set(product.variants.map((v: any) => v.size)))
        : [];

    const colors: string[] = product.variants
        ? Array.from(new Set(product.variants.map((v: any) => v.color)))
        : [];

    //  always include subCategory in URL if available
    const href = subCategory
        ? `/${category}/product/${subCategory}/${product.slug}`
        : `/${category}/product/${product.slug}`;
    return (
        <div>
            <Link href={href}>
                <motion.div
                    variants={item}
                    className={`group relative flex flex-col ${isLarge ? 'h-full' : 'h-full'}`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Image Container */}
                    <div
                        className={`relative overflow-hidden bg-neutral-100 ${isLarge
                            ? 'aspect-[4/5] md:h-[650px] lg:h-[800px]'
                            : 'aspect-[4/5] md:h-[520px] lg:h-[850px]'
                            }`}
                    >
                        {/* <Image
                        fill
                         src={product.images && product.images.length > 0 ? product.images[0].url : "/placeholder.png"}
                        alt={product.name}
                        className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    /> */}
                        <Image
                            fill
                            src={getImageUrl(product.images?.[0]?.url)}
                            unoptimized
                            alt={product.name}
                            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        />

                        {/* Badges */}
                        {/* {product.badge && (
                        <div className="absolute top-4 left-4">
                            <span className="bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-black">
                                {product.badge}
                            </span>
                        </div>
                    )} */}

                        {/* Sold Badge (top-left black) */}
                        {isSold && (
                            <div className="absolute top-4 left-4">
                                <span className="bg-black px-3 py-1 text-xs font-bold uppercase text-white">
                                    Sold
                                </span>
                            </div>
                        )}

                        
                        {/*====================== Wishlist Button ====================*/}
                         <WishlistIconButton product={product}  />
 
                        {/* Quick Add Overlay */}
                        <AnimatePresence>
                            {isHovered && (
                                <motion.div
                                    initial={{ y: '100%' }}
                                    animate={{ y: 0 }}
                                    exit={{ y: '100%' }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md py-2 border-t border-neutral-100 p-4"
                                >
                                    <div className="flex flex-col gap-3">
                                        {/* Sizes */}
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                                                Select Size
                                            </span>
                                            <span className="text-xs underline cursor-pointer hover:text-neutral-600">
                                                Size Guide
                                            </span>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <div className="flex items-center justify-start  gap-1">
                                                {sizes.map((size: string) => (
                                                    <button
                                                        key={size}
                                                        className="h-8 w-8 flex items-center justify-center text-xs border border-neutral-200 rounded-full hover:border-black hover:bg-black hover:text-white transition-all duration-200"
                                                    >
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>

                                            {/* Colors */}
                                            <div className="flex items-center justify-start  gap-1">
                                                {colors.map((color: string, i: number) => (
                                                    <button
                                                        key={i}
                                                        style={{ backgroundColor: color }}
                                                        className="h-8 w-8 rounded-full border border-neutral-200 shadow-sm  transition-all duration-200"
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Add to Bag */}
                                        <button
                                            disabled={isSold} // disable if sold
                                            // className="cursor-pointer w-full bg-black text-white py-3 text-sm font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 mt-1">
                                            className={`cursor-pointer w-full py-3 text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 mt-1 transition-colors ${isSold
                                                ? "bg-gray-400 text-white cursor-not-allowed"
                                                : "bg-black text-white hover:bg-neutral-800"
                                                }`} >
                                            <ShoppingBag className="w-4 h-4" />
                                            Add to Bag
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Product Info */}
                    {!isHovered && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 flex flex-col gap-1 shadow-md pointer-events-none">
                            <div className="flex justify-between items-start">
                                <div>
                                    {/* <p className="text-xs font-medium uppercase tracking-widest text-white mb-1">
                                    {product.categories && product.categories.length > 0
                                        ? product.categories[0].categoryId.toUpperCase()
                                        : "UNCATEGORIZED"}
                                </p> */}

                                    <h3 className="text-lg font-medium leading-tight text-white">
                                        {product.name}
                                    </h3>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-2">
                                <span className="text-base font-semibold text-white">{product.salePrice} TK
                                </span>
                            </div>
                        </div>
                    )}


                </motion.div>
            </Link>
        </div>
    )
}

