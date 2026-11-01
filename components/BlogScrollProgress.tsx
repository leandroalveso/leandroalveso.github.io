'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export default function BlogScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.4,
  })

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 right-0 top-16 z-40 h-0.5 origin-left bg-indigo-500"
      style={{ scaleX }}
    />
  )
}
