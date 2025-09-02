'use client'

import { motion } from 'framer-motion'

export default function AnimatedBlob() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main blob */}
      <motion.div
        className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      {/* Secondary blob */}
      <motion.div
        className="absolute top-20 right-0 w-64 h-64 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 50, -20, 0],
          scale: [1, 0.8, 1.3, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      {/* Third blob */}
      <motion.div
        className="absolute bottom-0 left-1/2 w-80 h-80 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-60"
        animate={{
          x: [0, 30, -50, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      {/* Fourth blob */}
      <motion.div
        className="absolute bottom-20 right-20 w-56 h-56 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-50"
        animate={{
          x: [0, -40, 60, 0],
          y: [0, 40, -30, 0],
          scale: [1, 1.3, 0.7, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </div>
  )
}
