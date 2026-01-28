"use client";
import { motion } from 'framer-motion'
import { HelpCircle, XCircle } from 'lucide-react'
import Image from 'next/image'
import OrderLiveMapClient from './OrderLiveMap';


interface OrderSummaryProps {
    product: {
        name: string
        image: string
        price: number
        quantity: number
    }
    pricing: {
        subtotal: number
        shipping: number
        tax: number
        total: number
    }
}
export function OrderSummary({ product, pricing }: OrderSummaryProps) {

    return (
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
                delay: 0.2,
            }}
            className="space-y-6"
        >
            {/* Summary Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">
                    Order Summary
                </h3>

                {/* Product */}
                <div className="flex gap-4 mb-8 pb-8 border-b border-gray-100">
                    <div className="w-20 h-20 rounded-lg bg-gray-50 p-2 flex items-center justify-center border border-gray-100">
                        <Image
                            width={80}
                            height={80}
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain mix-blend-multiply"
                        />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 leading-tight mb-1">
                            {product.name}
                        </h4>
                        <p className="text-sm text-gray-500 mb-2">
                            Quantity: {product.quantity}
                        </p>
                        <p className="text-black font-bold">
                            ${product.price.toFixed(2)}
                        </p>
                    </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span className="font-medium">{pricing.subtotal.toFixed(2)} TK</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>inside_dhaka</span>
                        <span className="font-medium ">
                            {pricing.shipping === 0
                                ? '70 TK'
                                : `${pricing.shipping.toFixed(2)} TK`}
                        </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Tax</span>
                        <span className="font-medium">${pricing.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-gray-900 pt-4 border-t border-gray-100 mt-4">
                        <span>Total</span>
                        <span>${pricing.total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Delivery Address Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                    Delivery Address
                </h3>
                <div className="space-y-1">
                    <p className="font-bold text-gray-900">Jonathan Wick</p>
                    <p className="text-gray-600">123 Continental Plaza</p>
                    <p className="text-gray-600">Apt 4B, Manhattan</p>
                    <p className="text-gray-600">New York, NY 10001</p>
                    <p className="text-gray-500 text-sm mt-3">+1 (555) 000-1234</p>
                </div>

                {/* Map Placeholder */}
                <OrderLiveMapClient deliveryAddress="Mirpur-10, Dhaka 1216, Bangladesh" storeAddress = "Gulshan, Dhaka, Bangladesh" />
            </div>

            {/* Actions */}
            <div className="space-y-3">
                <button className="w-full py-3 px-4 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-xl flex items-center justify-center gap-2 transition-colors border border-gray-200">
                    <HelpCircle className="w-4 h-4" />
                    Help with this Order
                </button>
                <button className="w-full py-3 px-4 text-red-500 bg-red-50 font-medium rounded-xl flex items-center justify-center gap-2 transition-colors">
                    <XCircle className="w-4 h-4" />
                    Cancel Shipment
                </button>
            </div>
        </motion.div>
    )
}
