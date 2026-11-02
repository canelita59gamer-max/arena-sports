import { useRef, useState } from 'react'
import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import useReducedMotion from './useReducedMotion.js'

// Celular 3D interactivo:
// - Se endereza mientras haces scroll (de inclinado a casi de frente).
// - Se puede arrastrar con el dedo o el mouse para girarlo; al soltar vuelve con rebote.
// - En computador también se inclina siguiendo el mouse.
// - `badges` son etiquetas que flotan delante del celular con profundidad.
// `children` es lo que se ve en la pantalla.
export default function IsoPhone({ children, badges = [], className = '' }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const [dragging, setDragging] = useState(false)
  const [touched, setTouched] = useState(false)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const p = useSpring(scrollYProgress, { stiffness: 70, damping: 20 })
  const scrollX = useTransform(p, [0, 0.5, 1], reduced ? [14, 14, 14] : [38, 14, 4])
  const scrollZ = useTransform(p, [0, 0.5, 1], reduced ? [-8, -8, -8] : [-24, -8, -2])
  const lift = useTransform(p, [0, 1], reduced ? [0, 0] : [30, -30])

  // giro extra por arrastre o por mouse (grados), con resorte
  const dragX = useMotionValue(0)
  const dragY = useMotionValue(0)
  const rx = useSpring(dragX, { stiffness: 140, damping: 14 })
  const ry = useSpring(dragY, { stiffness: 140, damping: 14 })

  const rotateX = useTransform([scrollX, rx], ([s, d]) => s + d)
  const rotateZ = scrollZ
  // reflejo que se mueve según el giro
  const glareX = useTransform(ry, [-40, 40], [0, 100])
  const glare = useMotionTemplate`radial-gradient(120% 60% at ${glareX}% 0%, rgba(255,255,255,0.22), transparent 55%)`

  const start = useRef(null)
  const onDown = (e) => {
    if (e.target.closest('button')) return // los puntos de pantalla se tocan normal
    start.current = { x: e.clientX, y: e.clientY, rx: dragX.get(), ry: dragY.get() }
    setDragging(true)
    setTouched(true)
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  const onMove = (e) => {
    if (start.current) {
      const dx = e.clientX - start.current.x
      const dy = e.clientY - start.current.y
      dragY.set(Math.max(-55, Math.min(55, start.current.ry + dx * 0.35)))
      dragX.set(Math.max(-25, Math.min(25, start.current.rx - dy * 0.2)))
    } else if (e.pointerType === 'mouse') {
      const r = ref.current.getBoundingClientRect()
      dragY.set((((e.clientX - r.left) / r.width) * 2 - 1) * 16)
      dragX.set(-(((e.clientY - r.top) / r.height) * 2 - 1) * 10)
    }
  }
  const onUp = () => {
    start.current = null
    setDragging(false)
    dragX.set(0)
    dragY.set(0)
  }

  return (
    <div
      ref={ref}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onPointerLeave={() => !start.current && onUp()}
      className={`relative mx-auto aspect-[9/18.5] w-[250px] select-none sm:w-[280px] ${dragging ? 'cursor-grabbing' : 'cursor-grab'} ${className}`}
      style={{ perspective: 1400, touchAction: 'pan-y' }}
    >
      {/* sombra en el piso */}
      <div aria-hidden="true" className="absolute -bottom-12 left-1/2 h-16 w-[95%] -translate-x-1/2 rounded-[50%] bg-acento/30 blur-3xl" />

      {/* flotación suave continua */}
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={reduced ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div className="relative h-full w-full" style={{ transformStyle: 'preserve-3d', rotateX, rotateY: ry, rotateZ, y: lift }}>
          {/* grosor: capas metálicas apiladas detrás */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              aria-hidden="true"
              className="absolute inset-0 rounded-[2.7rem] bg-gradient-to-br from-[#3a3a3a] via-[#1c1c1c] to-[#0d0d0d]"
              style={{ transform: `translateZ(${-(i + 1) * 1.6}px)`, backfaceVisibility: 'hidden' }}
            />
          ))}
          {/* botones laterales */}
          <div aria-hidden="true" className="absolute -left-[3px] top-[22%] h-10 w-[3px] rounded-l bg-[#2a2a2a]" />
          <div aria-hidden="true" className="absolute -left-[3px] top-[31%] h-16 w-[3px] rounded-l bg-[#2a2a2a]" />
          <div aria-hidden="true" className="absolute -right-[3px] top-[27%] h-20 w-[3px] rounded-r bg-[#2a2a2a]" />

          {/* frente: un poco adelante en Z para que Safari (iPhone) no lo tape con el grosor */}
          <div
            className="absolute inset-0 rounded-[2.7rem] bg-gradient-to-br from-[#5a5a5a] via-[#202020] to-[#3a3a3a] p-[3px] shadow-[0_50px_120px_-25px_rgba(232,255,0,0.45)]"
            style={{ transform: 'translateZ(1px)' }}
          >
            <div className="h-full w-full rounded-[2.55rem] bg-negro p-2">
              <div className="relative h-full w-full overflow-hidden rounded-[2.1rem] bg-gris1">
                <div aria-hidden="true" className="absolute left-1/2 top-2 z-20 flex h-6 w-24 -translate-x-1/2 items-center justify-end rounded-full bg-black pr-2">
                  <span className="h-2 w-2 rounded-full bg-[#1a2a4a]" />
                </div>
                {children}
                <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10" style={{ background: glare }} />
              </div>
            </div>
          </div>

          {/* etiquetas flotando delante, con profundidad */}
          {badges.map((b, i) => (
            <div
              key={b.label}
              className={`pointer-events-none absolute z-30 whitespace-nowrap ${b.className}`}
              style={{ transform: `translateZ(${60 + i * 25}px)` }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.15, type: 'spring', stiffness: 200, damping: 15 }}
                className="glass flex items-center gap-2 rounded-2xl bg-negro/70 px-3 py-2 text-xs font-semibold text-texto shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-acento font-display text-sm text-negro">{b.icon}</span>
                <span>
                  <span className="block font-display text-[13px] uppercase tracking-wide">{b.label}</span>
                  <span className="block text-[10px] font-normal text-texto2">{b.sub}</span>
                </span>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* pista para que la gente sepa que se puede mover */}
      {!touched && (
        <motion.p
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap text-[11px] uppercase tracking-[0.25em] text-texto2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.span animate={reduced ? undefined : { x: [-6, 6, -6] }} transition={{ duration: 2, repeat: Infinity }}>↔</motion.span>
          Arrástralo
        </motion.p>
      )}
    </div>
  )
}
