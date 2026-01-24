"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { RefreshCwIcon, MessageCircleIcon, HomeIcon } from "lucide-react";

// --- Hydration-safe StarField ---
type Star = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
};
type Beam = { id: number; x: number; rotation: number; delay: number };

export function StarField() {
  const [mounted, setMounted] = useState(false);
  const [stars, setStars] = useState<Star[]>([]);
  const [beams, setBeams] = useState<Beam[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    const colors = ["#FFD700", "#00D4FF", "#B794F6", "#FFFFFF"];
    const generateStars = () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 3,
        duration: Math.random() * 2 + 2,
      }));

    const generateBeams = () =>
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        rotation: Math.random() * 30 - 15,
        delay: Math.random() * 2,
      }));

    setStars(generateStars());
    setBeams(generateBeams());
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {beams.map((beam) => (
        <motion.div
          key={beam.id}
          className="absolute w-px h-32 md:h-48"
          style={{
            left: `${beam.x}%`,
            top: "-10%",
            background:
              "linear-gradient(to bottom, rgba(255, 215, 0, 0.3), transparent)",
            transform: `rotate(${beam.rotation}deg)`,
            transformOrigin: "top center",
          }}
          animate={{ x: [0, 20, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{
            duration: 8,
            delay: beam.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            backgroundColor: star.color,
            boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
          }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// --- Variants ---
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
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// --- PaymentCancelled Page ---
type CancellationDetails = {
  amount: string;
  cancelledAt: string;
  reason: string;
};
const cancellation: CancellationDetails = {
  amount: "$299.99",
  cancelledAt: "January 23, 2025, 3:45 PM",
  reason: "User cancelled transaction",
};

export default function PaymentCancelled() {
  return (
    <main className="min-h-screen mt-[64px] w-full bg-white relative overflow-hidden">
      <div className="opacity-40">
        <StarField />
      </div>

      <motion.div
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="mb-6 flex items-center justify-center"
        >
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #FF4D4F, #FF7875)",
              boxShadow:
                "0 8px 20px rgba(255, 77, 79, 0.4), 0 0 0 4px rgba(255, 77, 79, 0.2) inset",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold text-black mb-2 text-center"
        >
          Payment Cancelled
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-gray-500 text-base md:text-lg mb-8 text-center max-w-md"
        >
          No worries — no charges were made to your account
        </motion.p>

        {/* Info Card */}
        <motion.article
          variants={itemVariants}
          className="w-full max-w-md rounded-2xl p-6 md:p-8 mb-8"
          style={{
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow:
              "0 4px 24px rgba(0,0,0,0.06), 0 0 0 1px rgba(255,255,255,0.5) inset",
          }}
        >
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Cancellation Details
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-500 text-sm">Attempted Amount</span>
              <span className="text-xl font-semibold text-black">
                {cancellation.amount}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-500 text-sm">Cancelled At</span>
              <span className="text-black text-sm">
                {cancellation.cancelledAt}
              </span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-500 text-sm">Reason</span>
              <span className="text-gray-600 text-sm">
                {cancellation.reason}
              </span>
            </div>
          </div>
        </motion.article>

        {/* Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
        >
          {/* Try Again - Black */}
          <motion.button
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 font-semibold rounded-xl text-white"
            style={{
              backgroundColor: "#000",
              boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
            }}
            whileHover={{ y: -2, boxShadow: "0 8px 25px rgba(0,0,0,0.35)" }}
            whileTap={{ scale: 0.98 }}
          >
            <RefreshCwIcon className="w-5 h-5" /> Try Again
          </motion.button>

          {/* Contact Support */}
          <motion.button
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white text-black font-semibold rounded-xl border border-gray-200"
            whileHover={{
              y: -2,
              borderColor: "#000",
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageCircleIcon className="w-5 h-5" /> Contact Support
          </motion.button>
        </motion.div>

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
