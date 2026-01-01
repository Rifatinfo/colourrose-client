"use client"

import { useEffect, useState } from 'react'
import { Search, User, Menu, X, ChevronDown, ShoppingCart, Heart } from 'lucide-react'
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useMotionValueEvent } from 'framer-motion'


import Image from 'next/image'
import { MegaMenu } from './MegaMenu'
import { menuData } from './menu-item'
import WhiteLogo from '../Logo/WhiteLogo'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<
    string | null
  >(null)
  const { scrollY } = useScroll()

  const forcedBg = useMotionValue("rgba(0,0,0,0)")

  const headerBackground = useTransform(
    scrollY,
    [0, 50],
    ["rgba(0,0,0,0)", "rgba(0,0,0,1)"]
  )

  const headerBackdropBlur = useTransform(
    scrollY,
    [0, 50],
    ["blur(0px)", "blur(6px)"]
  )

  const headerTextColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(255,255,255,1)", "rgba(255,255,255,1)"]
  )

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!isMobileMenuOpen) {
      forcedBg.set(latest > 50 ? "rgba(0,0,0,1)" : "rgba(0,0,0,0)")
    }
  })
  useEffect(() => {
    if (isMobileMenuOpen) {
      forcedBg.set("rgba(0,0,0,1)")
    }
  }, [isMobileMenuOpen])

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsScrolled(window.scrollY > 50)
  //   }
  //   window.addEventListener('scroll', handleScroll)
  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [])
  // Prevent body scroll when mobile menu is open
  // useEffect(() => {
  //   if (isMobileMenuOpen) {
  //     document.body.style.overflow = 'hidden'
  //   } else {
  //     document.body.style.overflow = 'unset'
  //   }
  //   return () => {
  //     document.body.style.overflow = 'unset'
  //   }
  // }, [isMobileMenuOpen])

  const navItems = ['WOMEN', 'MEN', 'KIDS', 'COLLECTION']

  return (
    <div className="">
      {/* Navigation */}
      <motion.header
        style={{
          backgroundColor: forcedBg,
          backdropFilter: headerBackdropBlur,
          WebkitBackdropFilter: headerBackdropBlur,
          color: headerTextColor,
        }}
        className="fixed top-0 left-0 right-0 z-50"
        onMouseLeave={() => setActiveCategory(null)}
      >

        <div className="max-w-7xl mx-auto px-6 text-black">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <WhiteLogo />
            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center space-x-12 h-full text-white">
              {navItems.map((item) => (
                <div
                  key={item}
                  className="h-full flex items-center"
                  onMouseEnter={() => setActiveCategory(item)}
                >
                  <button
                    className={`text-sm uppercase tracking-widest hover:text-gold transition-colors duration-300 flex items-center gap-1 ${activeCategory === item ? 'text-gold' : ''}`}
                  >
                    {item}
                    {activeCategory === item && (
                      <motion.div
                        layoutId="underline"
                        className="absolute bottom-8 h-[1px] bg-gold w-full"
                      />
                    )}
                  </button>
                </div>
              ))}
            </nav>

            {/* Icons */}
            <div className="hidden md:flex items-center space-x-6 z-50 text-white font-semibold">
              <button className="hover:text-gold transition-colors">
                <Search strokeWidth={2} className="w-6 h-6" />
              </button>
              <button className="hover:text-gold transition-colors">
                <User strokeWidth={2} className="w-6 h-6" />
              </button>
              <button className="hover:text-gold transition-colors relative">
                <ShoppingCart strokeWidth={2} className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-gold rounded-full" />
              </button>
              <button className="hover:text-gold transition-colors relative">
                <Heart strokeWidth={2} className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-gold rounded-full" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden md:mt-0 mt-5 z-50 text-white">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white"
              >
                {isMobileMenuOpen ? (
                  <X stroke="white" strokeWidth={2} />
                ) : (
                  <Menu stroke="white" strokeWidth={2} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        <MegaMenu
          isOpen={!!activeCategory}
          activeCategory={activeCategory}
          onClose={() => setActiveCategory(null)}
        />
      </motion.header>

      {/* Mobile Menu Overlay with Full Mega Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{
              x: '100%',
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: '100%',
            }}
            transition={{
              type: 'tween',
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-0 bg-black z-40 md:hidden overflow-y-auto"
          >
            <div className="pt-24 pb-12 px-6">
              {/* Mobile Icons */}
              <div className="flex items-center justify-end space-x-6 mb-8 pb-6 border-b border-gray-200 text-white font-semibold">
                <button className="text-soft-black hover:text-gold transition-colors">
                  <Search strokeWidth={2} className="w-6 h-6" />
                </button>
                <button className="text-soft-black hover:text-gold transition-colors">
                  <User strokeWidth={2} className="w-6 h-6" />
                </button>
                <button className="text-soft-black hover:text-gold transition-colors relative">
                  <ShoppingCart strokeWidth={2} className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-gold rounded-full" />
                </button>
                <button className="text-soft-black hover:text-gold transition-colors relative">
                  <Heart strokeWidth={2} className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-gold rounded-full" />
                </button>
              </div>

              {/* Mobile Mega Menu Accordion */}
              <nav className="space-y-2 text-white">
                {navItems.map((category) => {
                  const categoryData =
                    menuData[category as keyof typeof menuData]
                  const isExpanded = expandedMobileCategory === category
                  return (
                    <div key={category} className="border-b border-gray-100">
                      {/* Category Header */}
                      <button
                        onClick={() =>
                          setExpandedMobileCategory(
                            isExpanded ? null : category,
                          )
                        }
                        className="w-full flex items-center justify-between py-4 text-left"
                      >
                        <span className="text-xl font-serif italic text-soft-black">
                          {category}
                        </span>
                        <motion.div
                          animate={{
                            rotate: isExpanded ? 180 : 0,
                          }}
                          transition={{
                            duration: 0.3,
                          }}
                        >
                          <ChevronDown
                            strokeWidth={1}
                            className="w-5 h-5 text-gold"
                          />
                        </motion.div>
                      </button>

                      {/* Expanded Content */}
                      <AnimatePresence>
                        {isExpanded && (
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
                              duration: 0.3,
                              ease: 'easeInOut',
                            }}
                            className="overflow-hidden"
                          >
                            <div className="pb-6 space-y-6">
                              {/* Featured Image */}
                              <div className="relative h-48 overflow-hidden rounded-sm">
                                <Image
                                  fill
                                  src={categoryData.featuredImage}
                                  alt={categoryData.featuredTitle}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/20" />
                                <div className="absolute bottom-0 left-0 p-4 text-white">
                                  <p className="text-xs uppercase tracking-widest mb-1">
                                    Featured
                                  </p>
                                  <h4 className="text-lg font-serif italic">
                                    {categoryData.featuredTitle}
                                  </h4>
                                </div>
                              </div>

                              {/* Menu Columns */}
                              <div className="space-y-6">
                                {categoryData.columns.map((column) => (
                                  <div key={column.title}>
                                    <h4 className="text-xl uppercase tracking-widest font-semibold text-gold mb-3">
                                      {column.title}
                                    </h4>
                                    <ul className="space-y-2">
                                      {column.items.map((item) => (
                                        <li key={item}>
                                          <a
                                            href="#"
                                            className="text-soft-black hover:text-gold transition-colors "
                                          >
                                            {item}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
