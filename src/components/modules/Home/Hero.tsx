"use client";


import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
export function Hero() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [showVideo, setShowVideo] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setShowVideo(true), 1200);
        return () => clearTimeout(timeout);
    }, []);
    useEffect(() => {
        if (!showVideo) return

        const video = videoRef.current
        if (!video) return

        video.play().catch((err) => {
            console.log("Autoplay blocked:", err)
        })
    }, [showVideo])
    return (
        <section className="relative w-full h-[150svh] overflow-hidden">
            {/* YouTube Background */}
            <div className="absolute inset-0 overflow-hidden bg-soft-black">
                <Image
                    fill
                    src="https://img.youtube.com/vi/mgOmjlEp1Ks/maxresdefault.jpg"
                    className="absolute w-full h-full object-cover"
                    alt=""
                />
                {/* Background video */}
                {
                    showVideo && (
                        <video
                            ref={videoRef}
                            className="absolute w-full h-full object-cover"
                            muted
                            loop
                            playsInline
                            preload="none"
                        >
                            <source src="/assets/arong.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )
                }

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40" />
            </div>


            {/* Content */}
            <div className="relative h-full max-w-7xl mx-auto px-4 flex">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="
                    mt-auto mb-24 
                    md:mb-32
                    text-center w-full
                "
                >
                    <div className="text-center text-white space-y-6">

                        {/* Top small nav text */}
                        <div className="flex justify-center gap-6 text-xs tracking-widest uppercase opacity-80">
                            <span className='hover:underline cursor-pointer'>Shop Now</span>
                            <span className='hover:underline cursor-pointer'>Men</span>
                            <span className='hover:underline cursor-pointer'>Women</span>
                        </div>

                        {/* Main heading */}
                        <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold tracking-tight">
                            Redefining
                        </h1>

                        {/* Script text */}
                        <p
                            className="
                            text-4xl md:text-5xl lg:text-7xl
                            font-light italic
                            tracking-wide
                        "
                            style={{ fontFamily: "'Pacifico', cursive" }}
                        >
                            Colourrose
                        </p>

                    </div>
                </motion.div>
            </div>
        </section>
    )
}
