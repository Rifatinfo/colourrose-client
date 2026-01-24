"use client";

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const colors = ['#c73450', '#FFD700', '#40E0D0', '#FF69B4', '#87CEEB']

interface Particle {
  id: number
  x: number
  y: number
  color: string
  rotation: number
  scale: number
  finalRotation: number
  duration: number
  delay: number
}

function generateParticles(): Particle[] {
  const particleCount = 50
  return Array.from({ length: particleCount }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: -10 - Math.random() * 20,
    color: colors[Math.floor(Math.random() * colors.length)],
    rotation: Math.random() * 360,
    scale: 0.5 + Math.random() * 0.5,
    finalRotation: Math.random() * 180,
    duration: 2.5 + Math.random() * 2,
    delay: Math.random() * 0.5,
  }))
}

export function Confetti() {
  const [mounted, setMounted] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    // Only generate particles after client mounts
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    setParticles(generateParticles())
  }, [])

  // Avoid SSR rendering
  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            top: `${p.y}%`,
            left: `${p.x}%`,
            rotate: p.rotation,
            scale: p.scale,
            opacity: 1,
          }}
          animate={{
            top: '120%',
            rotate: p.rotation + 360 + p.finalRotation,
            opacity: 0,
          }}
          transition={{
            duration: p.duration,
            ease: 'easeOut',
            delay: p.delay,
          }}
          className="absolute w-3 h-3 rounded-sm"
          style={{
            backgroundColor: p.color,
          }}
        />
      ))}
    </div>
  )
}
