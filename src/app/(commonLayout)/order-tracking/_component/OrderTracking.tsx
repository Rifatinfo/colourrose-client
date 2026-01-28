"use client"

import { motion } from 'framer-motion'
import { Download, ExternalLink, Info, CheckCircle2, Clock } from 'lucide-react'

import { ShipmentUpdate, ShipmentUpdateData } from './ShipmentUpdate'
import { OrderSummary } from './OrderSummary'
import StatusTimeline from './StatusTimeline'
// Mock Data
const updates: ShipmentUpdateData[] = [
    {
        id: '1',
        status: 'Out for Delivery',
        location: 'New York, NY 10001',
        description: 'Package is with the courier for final delivery.',
        timestamp: '09:12 AM',
        date: 'Today',
        icon: 'truck',
    },
    {
        id: '2',
        status: 'Arrived at Local Sort Facility',
        location: 'Jersey City Hub',
        description: 'Package sorted and ready for transport to local carrier.',
        timestamp: '11:45 PM',
        date: 'Yesterday',
        icon: 'map-pin',
    },
    {
        id: '3',
        status: 'Package Shipped',
        location: 'San Francisco, CA',
        description: 'Package has been picked up by the carrier.',
        timestamp: '02:30 PM',
        date: 'Oct 24',
        icon: 'package',
    },
    {
        id: '4',
        status: 'Order Confirmed',
        description:
            'Your order has been successfully placed and is being prepared.',
        timestamp: '10:15 AM',
        date: 'Oct 23',
        icon: 'check',
    },
]
const product = {
    name: 'Ultra-Wide Gaming Monitor X-Pro',
    image:
        'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=300&q=80',
    price: 899.0,
    quantity: 1,
}
const pricing = {
    subtotal: 899.0,
    shipping: 0,
    tax: 71.92,
    total: 970.92,
}
const OrderTracking = () => {
    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-gray-100">
            <div className="px-4 sm:px-6 lg:px-8 py-10 mt-[64px]">
                {/* Header Section */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: -20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12"
                >
                    <div className="flex flex-col gap-3 sm:gap-2">
                        {/* Order ID */}
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-black break-all">
                                Order #ID-992834
                            </h1>
                        </div>

                        {/* Status */}
                        <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base text-gray-600">
                            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-black shrink-0" />

                            <span className="font-medium text-black">
                                Arriving Today
                            </span>

                            <span className="hidden sm:inline text-gray-400">•</span>

                            <span className="text-gray-500">
                                Expected by 8:00 PM
                            </span>
                        </div>
                    </div>


                    <div className="flex items-center gap-3">
                        <button className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Invoice
                        </button>
                        <button className="px-5 py-2.5 rounded-xl bg-black text-white font-medium hover:bg-black shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2">
                            <ExternalLink className="w-4 h-4" />
                            Track Live
                        </button>
                    </div>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column - Tracking Info */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Progress Timeline */}
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm md:p-8 p-4">
                            <StatusTimeline currentStep={3} />

                            {/* Latest Status Alert */}
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    scale: 0.95,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                transition={{
                                    delay: 0.3,
                                }}
                                className="mt-8 bg-gray-50 rounded-xl p-4 flex gap-4 border border-gray-200"
                            >
                                <div className="flex gap-3 sm:gap-4 items-start">
                                    {/* Icon */}
                                    <div className="flex-shrink-0 mt-0.5 sm:mt-1">
                                        <Info className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <h3 className="font-bold text-sm sm:text-base text-black">
                                            Latest Status: Out for delivery
                                        </h3>

                                        <p className="text-black text-xs sm:text-sm mt-1 leading-relaxed">
                                            Your package has been loaded onto a delivery vehicle and is
                                            expected to arrive at your door by 8:00 PM tonight.
                                        </p>
                                    </div>
                                </div>

                            </motion.div>
                        </div>

                        {/* Shipment Updates */}
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <Clock className="w-5 h-5 text-gray-400" />
                                <h2 className="text-xl font-bold text-black">
                                    Shipment Updates
                                </h2>
                            </div>
                            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                                <div className="space-y-2">
                                    {updates.map((update, index) => (
                                        <ShipmentUpdate
                                            key={update.id}
                                            update={update}
                                            isLatest={index === 0}
                                            index={index}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Summary */}
                    <div className="lg:col-span-1">
                        <OrderSummary product={product} pricing={pricing} />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default OrderTracking;