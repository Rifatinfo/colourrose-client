"use client";

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
const categories = [
  {
    id: 'men',
    title: 'MEN',
    image:
      'https://cdn.magicpatterns.com/uploads/c3ZWP99BmDtxDVPC4ximJy/image.png',
    link: '#',
  },
  {
    id: 'women',
    title: 'WOMEN',
    image:
      'https://cdn.magicpatterns.com/uploads/632fbkwpepgm2bRnJQjkwt/image.png',
    link: '#',
  },
  {
    id: 'kids',
    title: 'KIDS',
    image:
      'https://cdn.magicpatterns.com/uploads/1UPPFPky7GHr95ovyiNr1o/image.png',
    link: '#',
  },
]
export function CategorySection() {
  return (
    <section>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
              }}
              className="group relative aspect-[3/4] overflow-hidden cursor-pointer funnel-display"
            >
              <Image
                fill
                src={category.image}
                alt={category.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />

              <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                <div className="flex items-end justify-between text-white">
                  <h3 className="text-2xl md:text-3xl font-bold tracking-wide uppercase">
                    {category.title}
                  </h3>
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
