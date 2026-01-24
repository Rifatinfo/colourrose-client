/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion } from 'framer-motion'
import { DownloadIcon, HomeIcon, PackageIcon } from 'lucide-react'
import { SuccessBadge } from './SuccessBadge'
import { StarField } from './StarField'
import { Confetti } from './ConfettiAnimation';
// import { ConfettiAnimation } from './ConfettiAnimation'

type TransactionDetails = {
  id: string
  amount: string
  date: string
}
const transaction: TransactionDetails = {
  id: 'TXN-2024-ABC123',
  amount: '$299.99',
  date: 'January 23, 2025',
}
const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.0, 0.0, 0.2, 1.0] as any,
    },
  },
}


export function PaymentSuccess() {
  return (
    <main className="min-h-screen mt-[64px] w-full bg-white relative overflow-hidden">
      {/* Background effects */}
      <StarField />
      <Confetti />
      <motion.div
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Success Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <SuccessBadge />
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-3xl md:text-5xl font-bold text-black mb-2 text-center"
          style={{
            textShadow: '0 0 40px rgba(16, 185, 129, 0.3)',
          }}
        >
          Payment Successful!
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-gray-600 text-lg mb-8 text-center"
        >
          Thank you for your purchase
        </motion.p>

        {/* Transaction Card */}
        <motion.article
          variants={itemVariants}
          className="w-full max-w-md rounded-2xl p-6 md:p-8 mb-8"
          style={{
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow:
              '0 8px 32px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.5) inset',
          }}
        >
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Transaction Details
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Transaction ID</span>
              <span className="font-mono text-black font-medium">
                {transaction.id}
              </span>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Amount Paid</span>
              <span className="text-2xl font-bold text-black">
                {transaction.amount}
              </span>
            </div>

            <div className="flex justify-between items-center py-3">
              <span className="text-gray-600">Date</span>
              <span className="text-black">{transaction.date}</span>
            </div>
          </div>
        </motion.article>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
        >
          {/* Primary Button - View Order */}
          <motion.button
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-black text-white font-semibold rounded-xl"
            style={{
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
            }}
            whileHover={{
              y: -2,
              boxShadow:
                '0 8px 25px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 212, 255, 0.3)',
            }}
            whileTap={{
              scale: 0.98,
            }}
            aria-label="View your order details"
          >
            <PackageIcon className="w-5 h-5" aria-hidden="true" />
            View Order
          </motion.button>

          {/* Secondary Button - Download Invoice */}
          <motion.button
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white text-black font-semibold rounded-xl border-2 border-black"
            whileHover={{
              y: -2,
              backgroundColor: '#000',
              color: '#fff',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
            }}
            whileTap={{
              scale: 0.98,
            }}
            aria-label="Download invoice as PDF"
          >
            <DownloadIcon className="w-5 h-5" aria-hidden="true" />
            Download Invoice
          </motion.button>

        </motion.div>

        {/* Footer note */}
        <motion.p
          variants={itemVariants}
          className="mt-8 text-sm text-gray-400 text-center"
        >
          A confirmation email has been sent to your inbox
        </motion.p>
      </motion.div>
    </main>
  )
}
