"use client";

import { motion } from 'framer-motion'
import Image from 'next/image';
export function CollectionSection() {
    return (
        <section className="overflow-hidden">
            <div>
                <motion.div
                    initial={{
                        opacity: 0,
                        x: -50,
                    }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                    }}
                    viewport={{
                        once: true,
                    }}
                    transition={{
                        duration: 0.8,
                    }}
                    className="relative h-[420px] lg:h-[680px] w-full aspect-square  overflow-hidden group cursor-pointer funnel-display"
                >
                    <Image
                        fill
                        src="/assets/winter-collection.jpeg"
                        alt="Seasonal Collection"
                        className="object-cover hover:grayscale-0 transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Dark overlay for readability */}
                    <div className="absolute inset-0 bg-black/20" />

                    {/* Centered text */}
                    <div className="absolute inset-0 flex items-center justify-center text-center">
                        <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-semibold tracking-wide">
                            Discover Winter Fall ’25
                        </h2>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
