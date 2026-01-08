"use client";

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { menuData } from './menu-item';
import Image from 'next/image';
export type MenuItem = {
  title: string
  items: string[]
}
export type MenuCategory = {
  id: string
  columns: MenuItem[]
  featuredImage: string
  featuredTitle: string
}
interface MegaMenuProps {
  isOpen: boolean
  activeCategory: string | null
  onClose: () => void,
  isHome: boolean
}

export function MegaMenu({ isOpen, activeCategory, onClose , isHome }: MegaMenuProps) {
  const data = activeCategory ? menuData[activeCategory] : null;
 
  return (
    <AnimatePresence>
      {isOpen && data && (
        <motion.div
          initial={{
            height: 0,
            opacity: 0,
          }}
          animate={{
            height: 'auto',
            opacity: 1,
          }}
          exit={{
            height: 0,
            opacity: 0,
          }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }} // Custom ease for "curtain" feel
          className="absolute top-full left-0 w-full bg-black border-t border-gray-100 shadow-xl overflow-hidden z-40"
          onMouseLeave={onClose}
        >
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-12 gap-8">
              {/* Navigation Columns */}
              <div className="col-span-8 grid grid-cols-3 gap-8">
                {data.columns.map((column: MenuItem, colIndex: number) => (
                  <div key={column.title} className="space-y-6">
                    <motion.h3
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.1 + colIndex * 0.1,
                        duration: 0.4,
                      }}
                      className="text-sm uppercase tracking-widest  font-semibold text-white"
                    >
                      {column.title}
                    </motion.h3>
                    <ul className="space-y-3">
                      {column.items.map((item: string, itemIndex: number) => (
                        <motion.li
                          key={item}
                          initial={{
                            opacity: 0,
                            x: -5,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            delay: 0.2 + colIndex * 0.1 + itemIndex * 0.05,
                            duration: 0.3,
                          }}
                        >
                          <a
                            href="#"
                            className="group relative inline-block text-white  transition-colors duration-300"
                          >
                            <span className="relative z-10">{item}</span>
                            <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
                          </a>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Featured Image Section */}
              <div className="col-span-4">
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
                    duration: 0.6,
                  }}
                  className="relative h-full min-h-[300px] group overflow-hidden"
                >
                  <Image
                    fill
                    src={data.featuredImage}
                    alt={data.featuredTitle}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 p-8 text-white">
                    <p className="text-sm uppercase tracking-widest mb-2">
                      Featured
                    </p>
                    <h3 className="text-3xl font-serif italic mb-4">
                      {data.featuredTitle}
                    </h3>
                    <button className="flex items-center text-sm uppercase tracking-wider hover:text-gold transition-colors">
                      Explore <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
