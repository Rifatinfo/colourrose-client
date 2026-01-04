"use client";

import { useState } from 'react'
import { X, ShoppingBag, ArrowRight, Minus, Plus, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image';

interface Product {
    id: string;
    name: string;
    price: number;
    sku: string;
    image: string;
    color: string;
    size: string;
}

interface CartDrawerProps {
    isOpen: boolean
    onClose: () => void,
    mode: "SHOP" | "PICKUP";
    product: Product;
}
export function CartDrawer({ isOpen, onClose, mode }: CartDrawerProps) {
    const [quantity, setQuantity] = useState(1)
    // Product details
    const product = {
        name: 'EMBROIDERY PANJABI',
        price: 2990.0,
        color: 'Navy Blue',
        size: 'M',
        image:
            'https://res.cloudinary.com/dgp5rqeqh/image/upload/v1767438820/WhatsApp_Image_2026-01-03_at_5.09.34_PM_1_fg0dlm.jpg',
        sku: 'P-1361',
    }
    const subtotal = product.price * quantity

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{
                            x: '100%',
                        }}
                        animate={{
                            x: 0,
                        }}
                        exit={{
                            x: '100%',
                        }}
                        transition={{
                            type: 'spring',
                            damping: 25,
                            stiffness: 200,
                        }}
                        className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                                <ShoppingBag className="h-5 w-5" />
                                {mode === "SHOP" ? "Shopping Cart" : "Store Pickup"}
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 -mr-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-50"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {mode === "SHOP" ? (
                            <div className="flex flex-col h-full">
                                {/*================ Product List =================*/}
                                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                                    <div className="flex gap-4">
                                        {/* Product Image */}
                                        <div className="flex-shrink-0 w-24 h-32 bg-gray-100 overflow-hidden">
                                            <Image
                                                width={96}
                                                height={128}
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1 flex flex-col">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="font-medium text-gray-900 text-sm">{product.name}</h3>
                                                    <p className="text-xs text-gray-500 mt-1">SKU: {product.sku}</p>
                                                </div>
                                                <button className="text-gray-400 hover:text-red-500 transition-colors">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>

                                            {/* Variants */}
                                            <div className="text-xs text-gray-600 space-y-1 mb-3">
                                                <p>
                                                    Color: <span className="font-medium text-gray-900">{product.color}</span>
                                                </p>
                                                <p>
                                                    Size: <span className="font-medium text-gray-900">{product.size}</span>
                                                </p>
                                            </div>

                                            {/* Price and Quantity */}
                                            <div className="flex items-center justify-between mt-auto gap-2 md:gap-0">
                                                <div className="flex items-center border border-gray-300">
                                                    <button
                                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </button>
                                                    <input
                                                        type="text"
                                                        value={quantity}
                                                        readOnly
                                                        className="w-10 h-8 text-center border-x border-gray-300 text-sm text-gray-900 focus:outline-none"
                                                    />
                                                    <button
                                                        onClick={() => setQuantity(quantity + 1)}
                                                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </button>
                                                </div>
                                                <p className="text-sm md:text-lg font-semibold text-gray-900">
                                                    {product.price.toFixed(2)}৳
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/*================ Cart Summary =================*/}
                                <div className="border-t border-gray-100 p-6 bg-gray-50 flex-shrink-0 space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <p>Subtotal</p>
                                            <p>{subtotal.toFixed(2)}৳</p>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <p>Shipping</p>
                                            <p className="text-black font-medium">Free</p>
                                        </div>
                                        <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-200">
                                            <p>Total</p>
                                            <p>{subtotal.toFixed(2)}৳</p>
                                        </div>
                                    </div>


                                    <p className="text-xs text-gray-500 text-center">Taxes calculated at checkout</p>

                                    <div className="space-y-2">
                                        <button className="w-full flex items-center justify-center px-3 py-2 md:px-6 md:py-4 border border-transparent text-sm md:text-base font-bold rounded-none text-white bg-black transition-all shadow-md hover:shadow-lg uppercase tracking-wide md:tracking-wider cursor-pointer">
                                            Proceed to Checkout
                                            <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                                        </button>
                                        <button
                                            onClick={onClose}
                                            className="w-full text-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
                                        >
                                            Continue Shopping
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="p-6 text-center text-gray-500">
                                <p>No Records Found</p>
                            </div>
                        )}

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
