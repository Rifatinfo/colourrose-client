"use client";

import React from "react";
import { motion, Variants, cubicBezier } from "framer-motion";
import { CheckCircle2Icon, MessageCircleIcon, HomeIcon } from "lucide-react";
import { SuccessBadge } from "./SuccessBadge";
import { Confetti } from "./ConfettiAnimation";
import { StarField } from "./StarField";

// Badge component
function Badge({ label, color }: { label: string; color: string }) {
  return (
    <div
      className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg"
      style={{ backgroundColor: color }}
    >
      {label}
    </div>
  );
}

// Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: cubicBezier(0.25, 0.46, 0.45, 0.94) },
  },
};

export function CODSuccess() {
  const orderDetails = {
    amount: "$299.99",
    confirmedAt: "January 23, 2026, 10:15 AM",
    paymentMethod: "Cash on Delivery",
    orderNumber: "ORD-123456789",
  };

  return (
    <main className="min-h-screen mt-[64px] w-full bg-white relative overflow-hidden flex items-center justify-center">
      <Confetti/>
      <StarField/>
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center px-4 py-12 w-full max-w-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <SuccessBadge />
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold text-black mb-2 text-center"
        >
          Order Confirmed!
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-gray-500 text-base md:text-lg mb-8 text-center max-w-md"
        >
          Thank you! Your order will be prepared and delivered to you soon.
        </motion.p>

        {/* Info Card */}
        <motion.article
          variants={itemVariants}
          className="w-full rounded-2xl p-6 md:p-8 mb-8"
          style={{
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow:
              "0 4px 24px rgba(0,0,0,0.06), 0 0 0 1px rgba(255,255,255,0.5) inset",
          }}
        >
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Order Details
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-500 text-sm">Amount</span>
              <span className="text-xl font-semibold text-black">
                {orderDetails.amount}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-500 text-sm">Confirmed At</span>
              <span className="text-black text-sm">
                {orderDetails.confirmedAt}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-500 text-sm">Payment Method</span>
              <span className="text-gray-600 text-sm">
                {orderDetails.paymentMethod}
              </span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-500 text-sm">Order Number</span>
              <span className="text-gray-600 text-sm">
                {orderDetails.orderNumber}
              </span>
            </div>
          </div>
        </motion.article>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-3 w-full"
        >
          {/* Track Order */}
          <motion.button
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 font-semibold rounded-xl text-white"
            style={{
              background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
              boxShadow: "0 4px 14px rgba(16,185,129,0.35)",
            }}
            whileHover={{
              y: -2,
              boxShadow:
                "0 8px 25px rgba(16,185,129,0.45), 0 0 20px rgba(16,185,129,0.2)",
            }}
            whileTap={{ scale: 0.98 }}
            aria-label="Track your order"
          >
            <CheckCircle2Icon className="w-5 h-5" aria-hidden="true" />
            Track Order
          </motion.button>

          {/* Contact Support */}
          <motion.button
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white text-black font-semibold rounded-xl border border-gray-200"
            whileHover={{
              y: -2,
              borderColor: "#10B981",
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
            }}
            whileTap={{ scale: 0.98 }}
            aria-label="Contact customer support"
          >
            <MessageCircleIcon className="w-5 h-5" aria-hidden="true" />
            Contact Support
          </motion.button>
        </motion.div>

        {/* Footer */}
        <motion.p
          variants={itemVariants}
          className="mt-8 text-sm text-gray-400 text-center max-w-sm"
        >
          Need help? Our support team is available 24/7 to assist you
        </motion.p>
      </motion.div>
    </main>
  );
}
