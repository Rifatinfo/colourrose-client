'use client';
import Image from 'next/image'
import { useEffect, useState } from 'react';
// Various fashion product images for diversity
const PRODUCT_IMAGES = [
    'https://res.cloudinary.com/dgp5rqeqh/image/upload/v1767438821/WhatsApp_Image_2026-01-03_at_5.09.34_PM_gdbj0c.jpg',
    // 'https://colourrose.shop/wp-content/uploads/2024/06/1-1-650x650.jpg',
    'https://res.cloudinary.com/dgp5rqeqh/image/upload/v1767438820/WhatsApp_Image_2026-01-03_at_5.09.34_PM_1_fg0dlm.jpg',
    'https://res.cloudinary.com/dgp5rqeqh/image/upload/v1767439371/WhatsApp_Image_2026-01-03_at_1.30.28_PM_wrpegp.jpg',
    'https://colourrose.shop/wp-content/uploads/2025/01/SWIP-SHIRT-2-650x650.jpg',
    'https://colourrose.shop/wp-content/uploads/2024/12/2-14.jpg',
    // 'https://colourrose.shop/wp-content/uploads/2025/05/S-768-1-650x650.jpg',
    'https://colourrose.shop/wp-content/uploads/2024/03/P-1131-01.jpg',
    'https://colourrose.shop/wp-content/uploads/2025/03/POLO-2-3-650x650.jpg',
    // 'https://colourrose.shop/wp-content/uploads/2025/01/WhatsApp-Image-2025-01-09-at-17.30.45_9a45fa73-650x650.jpg',
    'https://colourrose.shop/wp-content/uploads/2024/12/2-9-650x650.jpg',
    'https://colourrose.shop/wp-content/uploads/2024/03/P_1258-1-650x650.jpg'
]

// Generate more items for a denser, continuous flow
const PRODUCTS = Array.from({
    length: 15,
}).map((_, i) => ({
    id: i,
    image: PRODUCT_IMAGES[i % PRODUCT_IMAGES.length],
    // Randomize positions to cover the screen
    left: `${Math.random() * 90}%`,
    top: `${Math.random() * 80}%`,
    // Stagger delays for continuous flow
    delay: `-${Math.random() * 20}s`,
    // Vary duration slightly for natural feel
    duration: `${15 + Math.random() * 10}s`,
    // Random scale multiplier for variety
    scale: 0.8 + Math.random() * 0.4,
}))
const CinematicBackground = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) return null;
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#fafafa]">
            <style>{`
        @keyframes flow-toward {
          0% {
            opacity: 0;
            transform: perspective(1000px) translate3d(0, -200px, -1000px) scale(0.5);
            filter: blur(10px);
          }
          20% {
            opacity: 0.8;
            filter: blur(0px);
          }
          80% {
            opacity: 0.8;
            filter: blur(0px);
          }
          100% {
            opacity: 0;
            transform: perspective(1000px) translate3d(0, 200px, 500px) scale(1.5);
            filter: blur(20px);
          }
        }

        .animate-flow {
          animation-name: flow-toward;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>

            {/* Gradient Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white z-10 opacity-80" />

            {/* Radial gradient to focus attention on center */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-white/80 z-10" />

            {/* Floating Products */}
            {PRODUCTS.map((product) => (
                <div
                    key={product.id}
                    className="absolute z-0 animate-flow will-change-transform"
                    style={{
                        left: product.left,
                        top: product.top,
                        animationDuration: product.duration,
                        animationDelay: product.delay,
                        width: '280px',
                    }}
                >
                    <div
                        className="relative transform transition-transform hover:scale-105 duration-500"
                        style={{
                            transform: `scale(${product.scale})`,
                        }}
                    >
                        <div className="bg-white p-2 rounded-xl shadow-xl border border-gray-100">
                            <Image
                                src={product.image}
                                alt="Fashion Product"
                                className="w-full h-auto rounded-lg object-cover aspect-[3/4]"
                                width={280}
                                height={373}
                            />
                        </div>
                        {/* Soft shadow below */}
                        <div className="absolute -bottom-4 left-4 right-4 h-4 bg-black/10 blur-xl rounded-full" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CinematicBackground;