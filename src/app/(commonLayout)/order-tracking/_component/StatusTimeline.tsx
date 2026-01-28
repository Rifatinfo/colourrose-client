import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Settings, Truck, MapPin, Check } from 'lucide-react'
interface StatusTimelineProps {
  currentStep: number // 0 to 3
}
const steps = [
  {
    id: 0,
    label: 'Order Placed',
    icon: ShoppingCart,
  },
  {
    id: 1,
    label: 'Processing',
    icon: Settings,
  },
  {
    id: 2,
    label: 'Shipped',
    icon: Truck,
  },
  {
    id: 3,
    label: 'Delivered',
    icon: MapPin,
  },
]
 const StatusTimeline = ({ currentStep }: StatusTimelineProps) => {
  return (
    <div className="w-full py-8">
      <div className="relative md:flex items-center md:justify-between  w-full max-w-3xl mx-auto">
        {/*================ Background Line ===================*/}
        <div className="absolute md:top-1/2 top-full md:mt-0 mt-6 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 rounded-full z-0" />

        {/*================ Active Progress Line ===================*/}
        <motion.div
          className="absolute md:top-1/2 top-full md:mt-0 mt-6 left-0 h-1 bg-black -translate-y-1/2 rounded-full z-0"
          initial={{
            width: '0%',
          }}
          animate={{
            width: `${(currentStep / (steps.length - 1)) * 100}%`,
          }}
          transition={{
            duration: 0.8,
            ease: 'easeInOut',
          }}
        />

        {/*================ Steps ===================*/}
        {steps.map((step, index) => {
          const isCompleted = index <= currentStep
          const isActive = index === currentStep
          const Icon = step.icon
          return (
            <div
              key={step.id}
              className="relative z-10 flex flex-col items-center group"
            >
              <motion.div
                className={`flex items-center justify-center w-12 h-12 rounded-full border-4 transition-colors duration-300  ${isCompleted ? 'bg-black border-black text-white' : 'bg-white border-gray-200 text-gray-400'}`}
                initial={false}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  backgroundColor: isCompleted ? '#000000' : '#FFFFFF',
                  borderColor: isCompleted ? '#000000' : '#E5E7EB',
                }}
                transition={{
                  duration: 0.3,
                }}
              >
                {index < currentStep ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </motion.div>

              <motion.span
                className={`mt-3 mb-2 text-xs font-bold uppercase tracking-wider ${isCompleted ? 'text-black' : 'text-gray-400'}`}
                animate={{
                  color: isCompleted ? '#000000' : '#9CA3AF',
                  y: isActive ? -2 : 0,
                }}
              >
                {step.label}
              </motion.span>
            </div>
          )
        })}
      </div>
    </div>
  )
}


export default StatusTimeline; 