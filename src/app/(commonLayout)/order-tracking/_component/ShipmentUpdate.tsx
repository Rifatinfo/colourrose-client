"use client";

import { motion } from 'framer-motion'
import { MapPin, Package, Truck, CheckCircle } from 'lucide-react'
export interface ShipmentUpdateData {
  id: string
  status: string
  location?: string
  description: string
  timestamp: string
  date: string
  icon: 'truck' | 'package' | 'check' | 'map-pin'
}
interface ShipmentUpdateProps {
  update: ShipmentUpdateData
  isLatest: boolean
  index: number
}
const iconMap = {
  truck: Truck,
  package: Package,
  check: CheckCircle,
  'map-pin': MapPin,
}
export function ShipmentUpdate({
  update,
  isLatest,
  index,
}: ShipmentUpdateProps) {
  const Icon = iconMap[update.icon]
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -20,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
      }}
      className="relative pl-8 pb-8 last:pb-0"
    >
      {/* Vertical Line */}
      <div className="absolute left-[11px] top-8 bottom-0 w-[2px] bg-gray-100 last:hidden" />

      {/* Dot/Icon */}
      <div
        className={`absolute left-0  top-1 flex items-center justify-center w-6 h-6 rounded-full border-2 ${isLatest ? 'bg-black border-black text-white shadow-[0_0_0_4px_rgba(0,0,0,0.2)]' : 'bg-white border-gray-300 text-gray-400'}`}
      >
        <div
          className={`w-2 h-2 rounded-full ${isLatest ? 'bg-white' : 'bg-gray-300'}`}
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
        <div>
          <h4
            className={`text-base font-semibold ${isLatest ? 'text-black' : 'text-gray-700'}`}
          >
            {update.status}
          </h4>
          {update.location && (
            <p className="text-sm text-gray-500 mt-0.5">{update.location}</p>
          )}
          <p className="text-sm text-gray-600 mt-2 leading-relaxed max-w-lg">
            {update.description}
          </p>
        </div>
        <div className="flex flex-col items-start sm:items-end mt-2 sm:mt-0 min-w-[100px]">
          <span className="text-xs font-medium text-gray-900">
            {update.timestamp}
          </span>
          <span className="text-xs text-gray-500">{update.date}</span>
        </div>
      </div>
    </motion.div>
  )
}
