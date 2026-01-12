/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Send } from 'lucide-react'
import Image from 'next/image'
const tabs = [
  {
    id: 'description',
    label: 'Description',
  },
  {
    id: 'additional',
    label: 'Additional information',
  },
  {
    id: 'reviews',
    label: 'Reviews (0)',
  },
]
const ProductTabs = ({ product }: { product: any }) => {
  const [activeTab, setActiveTab] = useState('description')
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  return (
    <div className="mt-16 md:mt-24">
      {/* Tab Headers */}
      <div className="flex flex-wrap justify-center gap-8 border-b border-gray-200 mb-8 md:mb-12">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 text-sm md:text-base font-medium tracking-wide transition-colors relative ${activeTab === tab.id ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"
              />
            )}
          </button>
        ))}
      </div>

      {/*================== Tab Content==================== */}
      <div className="max-w-5xl mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            {activeTab === 'description' && (
              <div className="space-y-8">
                <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed">
                  <p className="text-center mb-8">
                    The actual color of the physical product may vary slightly
                    due to the deviation of lighting sources, photography, or
                    your device display setting.
                  </p>

                  <div>
                    <Image
                      className='mx-auto'
                      src="https://colourrose.shop/wp-content/uploads/2024/03/SIZE-03-01-01-768x1024.jpg"
                      width={500}
                      height={500}
                      alt="Size Chart Image"
                    />
                  </div>
                </div>

                {/* Size Chart Image */}


                {/* Material Info */}
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Product Features
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Premium Bamboo Silk fabric</li>
                      <li>• Intricate embroidery on collar, chest & cuffs</li>
                      <li>• Slim fit design for modern appeal</li>
                      <li>• Breathable and comfortable for all-day wear</li>
                      <li>• Perfect for traditional occasions</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Care Instructions
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Dry clean only recommended</li>
                      <li>• Iron on low heat if needed</li>
                      <li>• Store in a cool, dry place</li>
                      <li>• Avoid direct sunlight exposure</li>
                      <li>• Handle embroidery with care</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'additional' && (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-6 font-semibold text-gray-900 bg-gray-50 w-1/3">
                        Weight
                      </td>
                      <td className="py-4 px-6 text-gray-600">0.5 kg</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-6 font-semibold text-gray-900 bg-gray-50">
                        Dimensions
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        30 × 20 × 5 cm
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-6 font-semibold text-gray-900 bg-gray-50">
                        Material
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        100% Bamboo Silk
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-6 font-semibold text-gray-900 bg-gray-50">
                        Color Options
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        Navy Blue, Black, White
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-6 font-semibold text-gray-900 bg-gray-50">
                        Available Sizes
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        S, M, L, XL, XXL, 3XL
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-6 font-semibold text-gray-900 bg-gray-50">
                        Fit Type
                      </td>
                      <td className="py-4 px-6 text-gray-600">Slim Fit</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-6 font-semibold text-gray-900 bg-gray-50">
                        Occasion
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        Traditional, Festive, Wedding
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-6 font-semibold text-gray-900 bg-gray-50">
                        Care
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        Dry Clean Only
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-6 font-semibold text-gray-900 bg-gray-50">
                        Country of Origin
                      </td>
                      <td className="py-4 px-6 text-gray-600">Bangladesh</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold text-gray-900 bg-gray-50">
                        SKU
                      </td>
                      <td className="py-4 px-6 text-gray-600">P-1361</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="max-w-3xl mx-auto">

                {/* ==================== Review Form  ==================*/}
                <div className="bg-white ">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Write a Review
                  </h3>

                  <form className="space-y-6">
                    {/* Rating */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">
                        Your Rating <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="transition-transform hover:scale-110"
                          >
                            <Star
                              className={`h-8 w-8 transition-colors ${star <= (hoverRating || rating) ? 'fill-black text-black' : 'fill-gray-200 text-gray-200'}`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Review Text */}
                    <div>
                      <label
                        htmlFor="review"
                        className="block text-sm font-semibold text-gray-900 mb-3"
                      >
                        Your Review <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="review"
                        rows={6}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:ring-0 transition-colors resize-none"
                        placeholder="Share your experience with this product..."
                      />
                    </div>

                    {/* Name and Email */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-semibold text-gray-900 mb-3"
                        >
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:ring-0 transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-semibold text-gray-900 mb-3"
                        >
                          Your Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:ring-0 transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    {/* Checkbox */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="save-info"
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-900 focus:ring-blue-900"
                      />
                      <label
                        htmlFor="save-info"
                        className="text-sm text-gray-600"
                      >
                        Save my name and email in this browser for the next time
                        I comment.
                      </label>
                    </div>

                    {/*================ Submit Button ==============*/}
                    <button className="flex-1 bg-black text-white h-12 px-8 py-4 flex items-center justify-center gap-2 cursor-pointer transition-colors uppercase tracking-wider text-sm font-medium">
                      <Send className="h-4 w-4" />
                      Submit Review
                    </button>
                  </form>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ProductTabs;