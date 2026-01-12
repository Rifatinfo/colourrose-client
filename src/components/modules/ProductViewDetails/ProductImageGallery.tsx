/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image';
const images = [
  'https://res.cloudinary.com/dgp5rqeqh/image/upload/v1767438820/WhatsApp_Image_2026-01-03_at_5.09.34_PM_1_fg0dlm.jpg',
  'https://res.cloudinary.com/dgp5rqeqh/image/upload/v1767438821/WhatsApp_Image_2026-01-03_at_5.09.34_PM_gdbj0c.jpg',
  'https://res.cloudinary.com/dgp5rqeqh/image/upload/v1767439371/WhatsApp_Image_2026-01-03_at_1.30.28_PM_wrpegp.jpg',
  // 'https://res.cloudinary.com/dgp5rqeqh/image/upload/v1767439371/WhatsApp_Image_2026-01-03_at_1.30.28_PM_wrpegp.jpg',
]
const ProductImageGallery = () => {
  const [activeImage, setActiveImage] = useState(0)
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  })
  const [isZooming, setIsZooming] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return
    const rect = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePosition({
      x,
      y,
    })
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-4 lg:gap-6">
      {/* Thumbnails - Always vertical, stacked one by one */}
      <div className="grid grid-cols-1 gap-3 lg:gap-4 lg:h-[600px]">
        {images.slice(0, 3).map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(index)}
            className={`relative w-full aspect-[3/4] lg:flex-1 overflow-hidden border-2 transition-all duration-300 ${activeImage === index ? 'border-gray-500 shadow-md' : 'border-gray-200 hover:border-gray-400'}`}
          >
            <Image
              fill
              src={img}
              alt={`Product view ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image with cursor-based zoom */}
      <div
        ref={imageRef}
        className="relative bg-gray-100 overflow-hidden cursor-zoom-in aspect-[3/4] lg:h-[600px]"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.4,
            }}
            className="relative w-full h-full"
          >
            <Image
              fill
              src={images[activeImage]}
              alt="Product main view"
              className="w-full h-full object-cover"
              style={{
                transform: isZooming ? 'scale(2)' : 'scale(1)',
                transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                transition: 'transform 0.3s ease-out',
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Zoom indicator */}
        {isZooming && (
          <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
            Zoomed In
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductImageGallery;