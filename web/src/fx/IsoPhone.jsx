import { useRef } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import useReducedMotion from './useReducedMotion.js'
import useIsTouch from './useIsTouch.js'

// Celular en vista isométrica (CSS 3D). Se endereza con el scroll y además se inclina
// siguiendo el mouse (en computador). `children` es lo que se ve en la pantalla.
export default function IsoPhone({ children, className = '' }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const touch = useIsTouch()

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 20 })
  const scrollX = useTransform(p, [0, 0.5, 1], [52, 22, 10])
  const scrollZ = useTransform(p, [0, 0.5, 1], [-38, -18, -6])
  const y = useTransform(p, [0, 1], [80, -60])

  // inclinación con el mouse: -1..1 en cada eje
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const tiltX = useSpring(my, { stiffness: 120, damping: 15 })
  const tiltY = useSpring(mx, { stiffness: 120, damping: 15 })

  const byScroll = !reduced && !touch
  const rotateX = useTransform([scrollX, tiltX], ([s, t]) => (byScroll ? s : 24) - t * 14)
  const rotateZ = useTransform(scrollZ, (s) => (byScroll ? s : -16))
  const rotateY = useTransform(tiltY, (t) => t * 18)

  const onMove = (e) => {
    if (touch) return
    const r = ref.current.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1)
    my.set(((e.clientY - r.top) / r.height) * 2 - 1)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`relative mx-auto aspect-[9/18] w-[240px] sm:w-[280px] ${className}`}
      style={{ perspective: 1600 }}
    >
      {/* sombra en el piso */}
      <div aria-hidden="true" className="absolute -bottom-10 left-1/2 h-16 w-[90%] -translate-x-1/2 rounded-[50%] bg-acento/25 blur-3xl" />
      <motion.div className="relative h-full w-full" style={{ transformStyle: 'preserve-3d', rotateX, rotateY, rotateZ, y: byScroll ? y : 0 }}>
        {/* grosor del aparato: capas apiladas detrás */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            aria-hidden="true"
            className="absolute inset-0 rounded-[2.6rem] border border-white/10 bg-gris3"
            style={{ transform: `translateZ(${-(i + 1) * 2.5}px)` }}
          />
        ))}
        <div className="absolute inset-0 overflow-hidden rounded-[2.6rem] border border-white/15 bg-negro p-2.5 shadow-[0_40px_120px_-20px_rgba(232,255,0,0.35)]">
          <div className="relative h-full w-full overflow-hidden rounded-[2.1rem] bg-gris1">
            <div aria-hidden="true" className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-negro" />
            {children}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.06] to-white/[0.14]" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
