import { motion, useScroll, useSpring } from 'motion/react'

// Línea lima arriba de la pantalla que se llena a medida que bajas por la página.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-acento2 via-acento to-white shadow-[0_0_12px_rgba(232,255,0,0.8)]"
      style={{ scaleX }}
    />
  )
}
