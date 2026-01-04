'use client';

import { useState } from 'react'
import {
    Heart,
    Share2,
    Minus,
    Plus,
    ShoppingBag,
    Store,
    ChevronDown,
    Zap,
} from 'lucide-react'
import { motion } from 'framer-motion';

interface Product {
    id: string;
    name: string;
    price: number;
    sku: string;
    image: string;
    color: string;
    size: string;
}

interface ProductInfoProps {
    product: Product;
    onShopNow: () => void;
    onPickup: () => void;
}
export function ProductInfo({ product,
    onShopNow,
    onPickup, }: ProductInfoProps) {
    const [quantity, setQuantity] = useState(1)
    const [selectedSize, setSelectedSize] = useState('M')
    const [selectedColor, setSelectedColor] = useState('Navy Blue')
    const sizes = ['S', 'M', 'L', 'XL', 'XXL', '3XL']
    const colors = ['Navy Blue', 'Black', 'White', 'Royal Blue', 'Maroon']
    return (
        <div className="flex flex-col space-y-8 md:px-20">
            {/* Header */}
            <div className="space-y-4">
                <motion.h1
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    className="text-3xl md:text-4xl font-serif font-medium text-gray-900 tracking-tight"
                >
                    EMBROIDERY PANJABI
                </motion.h1>
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 0.1,
                    }}
                    className="text-2xl font-medium text-gray-900"
                >
                    2,990.00৳
                </motion.div>
            </div>

            {/* Description */}
            <motion.div
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                transition={{
                    delay: 0.2,
                }}
                className="prose prose-sm text-gray-600"
            >
                <p>
                    Stylishly printed Punjabi kurta for traditional flair with modern
                    appeal. Crafted from premium BAMBOO SILK for exceptional comfort and
                    breathability.
                </p>
            </motion.div>

            {/*========================= Selectors ========================*/}
            <div className="space-y-6 pt-4 border-t border-gray-100">
                {/* Color Dropdown */}
                <div className="space-y-3">
                    <label
                        htmlFor="color-select"
                        className="block text-sm font-medium text-gray-900"
                    >
                        Color
                    </label>
                    <div className="relative">
                        <select
                            id="color-select"
                            value={selectedColor}
                            onChange={(e) => setSelectedColor(e.target.value)}
                            className="w-full appearance-none px-4 py-3 pr-10 border-2 border-gray-200 rounded-none bg-white text-gray-900 font-medium focus:border-black focus:ring-0 transition-colors cursor-pointer"
                        >
                            {colors.map((color) => (
                                <option key={color} value={color}>
                                    {color}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Size Dropdown */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <label
                            htmlFor="size-select"
                            className="block text-sm font-medium text-gray-900"
                        >
                            Size
                        </label>
                        <button className="text-xs text-black underline hover:text-black">
                            Size Guide
                        </button>
                    </div>
                    <div className="relative">
                        <select
                            id="size-select"
                            value={selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value)}
                            className="w-full appearance-none px-4 py-3 pr-10 border-2 border-gray-200 rounded-none bg-white text-gray-900 font-medium focus:border-black focus:ring-0 transition-colors cursor-pointer"
                        >
                            {sizes.map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/*======================== Actions ========================*/}

            <div className="space-y-4 pt-6 border-t border-gray-100 mt-5">
                <div className="flex flex-col sm:flex-row gap-4">
                    {/*=============== Quantity ======================*/}
                    <div className="flex items-center border border-gray-300 w-32">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-10 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                        >
                            <Minus className="h-4 w-4" />
                        </button>
                        <input
                            type="text"
                            value={quantity}
                            readOnly
                            className="w-12 h-12 text-center border-x border-gray-300 text-gray-900 focus:outline-none"
                        />
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-10 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                    </div>

                    {/*=============== Add to Cart ================== */}
                    <button className="flex-1 bg-black text-white h-12 px-8 py-4 flex items-center justify-center gap-2 cursor-pointer transition-colors uppercase tracking-wider text-sm font-medium">
                        <ShoppingBag className="h-4 w-4" />
                        Add to Cart
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
                    {/*================== Shop Now Button =================*/}
                    <button
                        onClick={onShopNow}
                        className="w-full sm:w-auto bg-black text-white h-12 px-6 sm:px-8 flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg uppercase tracking-wider text-sm font-bold cursor-pointer"
                    >
                        <Zap className="h-4 w-4" />
                        Shop Now
                    </button>

                    {/*================== Store Pickup Button =================*/}
                    <button
                        onClick={onPickup}
                        className="w-full sm:w-auto border-2 border-black text-black h-12 px-6 sm:px-8 flex items-center justify-center gap-2 transition-colors uppercase tracking-wider text-sm font-bold cursor-pointer"
                    >
                        <Store className="h-4 w-4" />
                        Store in Pickup
                    </button>
                </div>


                {/* Wishlist & Share */}
                <div className="flex items-center gap-6 pt-4">
                    <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors group">
                        <Heart className="h-4 w-4 group-hover:fill-current" />
                        Add to Wishlist
                    </button>
                    <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                        <Share2 className="h-4 w-4" />
                        Share
                    </button>
                </div>
            </div>

            {/* Meta */}
            <div className="pt-6 border-t border-gray-100 space-y-2 text-xs text-gray-500 uppercase tracking-wide">
                <p>
                    SKU: <span className="text-gray-900">P-1361</span>
                </p>
                <p>
                    Categories: <span className="text-gray-900">EID-25, Men Panjabi</span>
                </p>
            </div>
        </div>
    )
}
