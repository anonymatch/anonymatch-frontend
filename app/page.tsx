"use client"

import { useState } from 'react'
import { motion } from "motion/react"
import { Button } from '@/components/ui/button'

export default function Component() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full text-center space-y-8"
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative w-32 h-32 mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B6B] to-[#FF4081] rounded-full opacity-80"></div>
          <div className="absolute inset-[25%] bg-white transform rotate-45 rounded-lg"></div>
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold tracking-tight text-[#FF4081]"
        >
          ANONYMATCH
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm font-medium tracking-wider text-gray-600"
        >
          NON SUPERFICIAL ONCHAIN LOVE
        </motion.p>

        {/* Mission Statement */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-gray-700 leading-relaxed px-4"
        >
          We believe that true connections are built on more than just appearances. 
          Harness the power of AI to find meaningful connections based on true 
          compatibility, values, interests and shared visions.
        </motion.p>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
              w-48 h-14 text-lg font-semibold rounded-full 
              transition-all duration-300 transform
              ${isHovered ? 'bg-[#FF6B6B]' : 'bg-[#FF4081]'}
              hover:scale-105 hover:shadow-lg
              text-white
            `}
          >
            START
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}