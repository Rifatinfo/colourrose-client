/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react'
import {
    Heart,
    Share2,
    Minus,
    Plus,
    ShoppingBag,
    Store,
    Zap,
} from 'lucide-react'
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Swal from 'sweetalert2';
import { useCart } from '@/context/CartContext';
import { useCartDrawer } from '@/context/CartDrawerContext';
import { useFettie } from '@/hooks/use-confetti';

interface Product {
    id: string;
    name: string;
    salePrice: number;
    sku: string;
    // image: string[];
    images: Array<{ url: string }>;
    color: string;
    size: string;
    shortDescription: string;
    subCategories: Array<{ subCategoryId: string }>;
    variants: Array<{ size: string; color: string; quantity: number }>;
}

interface ProductInfoProps {
    product: Product;
}
export function ProductInfo({ product }: ProductInfoProps) {
    const [quantity, setQuantity] = useState(1)
    const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
    const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
    const { addToCart } = useCart();
    const { openDrawer } = useCartDrawer();   
    const { run } = useFettie();
    const sizes = Array.from(
        new Set(product.variants.map(v => v.size))
    );
    const colors = Array.from(
        new Set(product.variants.map(v => v.color))
    );


    // ======================== Stock Track ========================//
    const selectedVariant = product.variants.find(
        (v: any) =>
            v.color === selectedColor &&
            v.size === selectedSize
    );

    const stock = selectedVariant?.quantity ?? 0;

    return (
        <div className="flex flex-col space-y-8 md:px-20">
            {/*========================= Header =========================*/}
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
                    className="text-3xl md:text-4xl font-serif uppercase font-medium text-gray-900 tracking-tight"
                >
                    {product.name}
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
                    {product.salePrice}.00 TK
                </motion.div>
            </div>

            {/*========================= Description =========================*/}
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
                    {product.shortDescription}
                </p>
            </motion.div>

            {/*========================= Selectors ========================*/}
            <div className="space-y-6 pt-4 border-t border-gray-100">
                {/*======================= Color Dropdown =========================*/}
                <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-900">
                        Color
                    </label>

                    <Select
                        value={selectedColor}
                        onValueChange={setSelectedColor}
                    >
                        <SelectTrigger
                            className="
                            w-full px-4 py-6
                            border-2 border-gray-200
                            rounded-none
                            text-gray-900 font-medium
                            focus:ring-0 focus:border-black
                        "
                        >
                            <SelectValue placeholder="Select color" />
                        </SelectTrigger>

                        <SelectContent>
                            {colors.map((color) => (
                                <SelectItem key={color} value={color}>
                                    {color}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>


                {/*======================= Size Dropdown =========================*/}
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium text-gray-900">
                            Size
                        </label>
                        <button className="text-sm underline font-medium text-gray-900">
                            Size Guide
                        </button>
                    </div>

                    <Select
                        value={selectedSize}
                        onValueChange={setSelectedSize}
                    >
                        <SelectTrigger
                            className="
                            w-full px-4 py-6
                            border-2 border-gray-200
                            rounded-none
                            text-gray-900 font-medium
                            focus:ring-0 focus:border-black
                        "
                        >
                            <SelectValue placeholder="Select size" />
                        </SelectTrigger>

                        <SelectContent>
                            {sizes.map((size) => (
                                <SelectItem key={size} value={size}>
                                    {size}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>


                <div>
                    {/* ======================= Stock Info ======================= */}
                    {/* {selectedColor && selectedSize && (
                        <p
                            className={`text-sm font-medium ${stock === 0 ? "text-red-600" : "text-gray-900"
                                }`}
                        >
                            {stock === 0
                                ? "OUT OF STOCK"
                                : `IN STOCK: ${stock} AVAILABLE`}
                        </p>
                    )} */}
                </div>
            </div>

            {/*======================== Actions ========================*/}

            <div className="space-y-4 pt-6 border-t border-gray-100 mt-1.5">
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
                            onClick={() => {
                                if (!selectedColor) {
                                    Swal.fire({
                                        icon: "warning",
                                        title: "Please select a color first",
                                    });
                                    return;
                                }
                                if (!selectedSize) {
                                    Swal.fire({
                                        icon: "warning",
                                        title: "Please select a size first",
                                    });
                                    return;
                                }

                                if (quantity < stock) {
                                    setQuantity((prev) => prev + 1);
                                } else {
                                    Swal.fire({
                                        icon: "error",
                                        title: "LIMIT EXCEEDED",
                                        text: `Only ${stock} item(s) available`,
                                    });
                                }
                            }}
                            className="w-10 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                    </div>

                    {/*=============== Add to Cart ================== */}

                    <button
                        onClick={() => {
                            if (!selectedColor) {
                                Swal.fire({ icon: "warning", title: "Please select a color first" });
                                return;
                            }
                            if (!selectedSize) {
                                Swal.fire({ icon: "warning", title: "Please select a size first" });
                                return;
                            }
                            if (stock === 0) {
                                Swal.fire({ icon: "error", title: "OUT OF STOCK", text: "This product is currently unavailable" });
                                return;
                            }
                            if (quantity > stock) {
                                Swal.fire({ icon: "error", title: "LIMIT EXCEEDED", text: `Only ${stock} item(s) available` });
                                return;
                            }

                            addToCart({
                                productId: product.id,
                                name: product.name,
                                sku: product.sku,
                                price: product.salePrice,
                                image: product.images[0]?.url || "",
                                color: selectedColor!,
                                size: selectedSize!,
                                quantity, // USE UI QUANTITY
                                stock,
                            });
                            run(); // Trigger confetti animation
                            // Reset quantity
                            setQuantity(1);
                        }}
                        className="flex-1 bg-black text-white h-12 px-8 py-4 flex items-center justify-center gap-2 cursor-pointer transition-colors uppercase tracking-wider text-sm font-medium"
                    >
                        <ShoppingBag className="h-4 w-4" />
                        Add to Cart
                    </button>

                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
                    {/*================== Shop Now Button =================*/}
                    <button
                        onClick={() => {
                            if (!selectedColor) {
                                Swal.fire({
                                    icon: "warning",
                                    title: "Please select a color first",
                                });
                                return;
                            }
                            if (!selectedSize) {
                                Swal.fire({
                                    icon: "warning",
                                    title: "Please select a size first",
                                });
                                return;
                            }

                            if (stock === 0) {
                                Swal.fire({
                                    icon: "error",
                                    title: "OUT OF STOCK",
                                    text: "This product is currently unavailable",
                                });
                                return;
                            }

                            if (quantity > stock) {
                                Swal.fire({
                                    icon: "error",
                                    title: "LIMIT EXCEEDED",
                                    text: `Only ${stock} item(s) available`,
                                });
                                return;
                            }
                            //  1. ADD TO CART (SAVED IN LOCALSTORAGE)
                            addToCart({
                                productId: product.id,
                                name: product.name,
                                sku: product.sku,
                                price: product.salePrice,
                                image: product.images[0]?.url || "",
                                color: selectedColor,
                                size: selectedSize,
                                quantity,
                                stock,
                            });
                            //================= All checks passed =================//
                            //  2. OPEN CART DRAWER
                            setQuantity(1); // Reset quantity
                            openDrawer("SHOP");
                           
                        }}

                        className="w-full sm:w-auto bg-black text-white h-12 px-6 sm:px-8 flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg uppercase tracking-wider text-sm font-bold cursor-pointer"
                    >
                        <Zap className="h-4 w-4" />
                        Shop Now
                    </button>

                    {/*================== Store Pickup Button =================*/}
                    <button
                        onClick={() => openDrawer("PICKUP")}
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
                    SKU: <span className="text-gray-900">{product.sku}</span>
                </p>
                <p>
                    Categories: <span className="text-gray-900">{product.subCategories
                        .map(sc => sc.subCategoryId)
                        .join(", ")}</span>
                </p>
            </div>
        </div >
    )
}
