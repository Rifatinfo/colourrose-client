"use client";
import { motion } from 'framer-motion'
import { CheckIcon } from 'lucide-react'
export function SuccessBadge() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow rings */}
      <motion.div
        className="absolute w-24 h-24 md:w-32 md:h-32 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute w-20 h-20 md:w-28 md:h-28 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.6, 0.2, 0.6],
        }}
        transition={{
          duration: 2,
          delay: 0.3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Main badge circle */}
      <motion.div
        className="relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
          boxShadow:
            '0 0 40px rgba(16, 185, 129, 0.5), 0 0 80px rgba(16, 185, 129, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.3)',
        }}
        initial={{
          scale: 0,
          rotate: -180,
        }}
        animate={{
          scale: [1, 1.05, 1],
          rotate: 0,
        }}
        transition={{
          scale: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          },
          rotate: {
            duration: 0.6,
            ease: 'backOut',
          },
        }}
      >
        {/* Inner highlight ring */}
        <div
          className="absolute inset-1 rounded-full"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)',
          }}
        />

        {/* Checkmark icon */}
        <motion.div
          initial={{
            scale: 0,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            delay: 0.3,
            duration: 0.4,
            ease: 'backOut',
          }}
        >
          <CheckIcon
            className="w-10 h-10 md:w-12 md:h-12 text-white"
            strokeWidth={3}
            aria-hidden="true"
          />
        </motion.div>
      </motion.div>

      {/* Sparkle accents around badge */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <motion.div
          key={angle}
          className="absolute w-2 h-2 rounded-full bg-yellow-400"
          style={{
            left: `calc(50% + ${Math.cos((angle * Math.PI) / 180) * 60}px)`,
            top: `calc(50% + ${Math.sin((angle * Math.PI) / 180) * 60}px)`,
            boxShadow: '0 0 8px #FFD700',
          }}
          initial={{
            scale: 0,
            opacity: 0,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            delay: 0.5 + i * 0.1,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      ))}
    </div>
  )
}
