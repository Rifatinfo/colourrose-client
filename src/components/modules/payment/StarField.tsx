"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

type Star = {
  id: number
  x: number
  y: number
  size: number
  color: string
  delay: number
  duration: number
}

type Beam = {
  id: number
  x: number
  rotation: number
  delay: number
}

export function StarField() {
  const [mounted, setMounted] = useState(false)
  const [stars, setStars] = useState<Star[]>([])
  const [beams, setBeams] = useState<Beam[]>([])

  useEffect(() => {
    // Only run on client
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)

    // Generate stars and beams AFTER hydration
    const colors = ["#FFD700", "#00D4FF", "#B794F6", "#FFFFFF"]

    const generateStars = () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 3,
        duration: Math.random() * 2 + 2,
      }))

    const generateBeams = () =>
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        rotation: Math.random() * 30 - 15,
        delay: Math.random() * 2,
      }))

    setStars(generateStars())
    setBeams(generateBeams())
  }, [])

  // Avoid server render completely
  if (!mounted) return null

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {beams.map((beam) => (
        <motion.div
          key={beam.id}
          className="absolute w-px h-32 md:h-48"
          style={{
            left: `${beam.x}%`,
            top: "-10%",
            background: "linear-gradient(to bottom, rgba(255, 215, 0, 0.3), transparent)",
            transform: `rotate(${beam.rotation}deg)`,
            transformOrigin: "top center",
          }}
          animate={{ x: [0, 20, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 8, delay: beam.delay, repeat: Infinity, ease: "easeInOut" }}
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
          transition={{ duration: star.duration, delay: star.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  )
}
