"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Heart } from 'lucide-react'
import Image from 'next/image'



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

export function ProductCard({
    product,
    isLarge = false,
}: {
    product: any
    isLarge?: boolean
}) {
    const [isHovered, setIsHovered] = useState(false)
    const [isWishlisted, setIsWishlisted] = useState(false)

    return (
        <div>
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
                            : 'aspect-[4/5] md:h-[520px] lg:h-[600px]'
                        }`}
                >
                    <Image
                        fill
                        src={product.image}
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
                    {product.sold && (
                        <div className="absolute top-4 left-4">
                            <span className="bg-black px-3 py-1 text-xs font-bold uppercase text-white">
                                Sold
                            </span>
                        </div>
                    )}

                    {/* Wishlist Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            setIsWishlisted(!isWishlisted)
                        }}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 z-10"
                    >
                        <Heart
                            className={`w-4 h-4 transition-colors duration-300 ${isWishlisted ? 'fill-black' : 'text-black'
                                }`}
                        />
                    </button>

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
                                            {product.sizes.map((size: string) => (
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
                                            {product.colors.map((color: string, i: number) => (
                                                <button
                                                    key={i}
                                                    style={{ backgroundColor: color }}
                                                    className="h-8 w-8 rounded-full border border-neutral-200 shadow-sm  transition-all duration-200"
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Add to Bag */}
                                    <button className="cursor-pointer w-full bg-black text-white py-3 text-sm font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 mt-1">
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
                                <p className="text-xs font-medium uppercase tracking-widest text-white mb-1">
                                    {product.category}
                                </p>
                                <h3 className="text-lg font-medium leading-tight text-white">
                                    {product.name}
                                </h3>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-2">
                            <span className="text-base font-semibold text-white">{product.price}</span>
                        </div>
                    </div>
                )}


            </motion.div>
        </div>
    )
}