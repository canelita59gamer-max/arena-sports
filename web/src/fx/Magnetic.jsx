import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import useIsTouch from './useIsTouch.js'

// Envuelve un botón para que "se pegue" un poco al cursor cuando pasas cerca (solo computador).
export default function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)
  const touch = useIsTouch()
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 })
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 })

  if (touch) return <div className={className}>{children}</div>

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} style={{ x, y }} className={`inline-flex ${className}`}>
      {children}
    </motion.div>
  )
}
