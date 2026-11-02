import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import site from '../data/site.js'
import useReducedMotion from '../fx/useReducedMotion.js'

// Lo que se ve dentro del celular: capturas reales de la app que se van turnando.
export default function PhoneScreens() {
  const screens = site.player.screens
  const reduced = useReducedMotion()
  const [i, setI] = useState(0)

  useEffect(() => {
    if (reduced) return
    const t = setInterval(() => setI((v) => (v + 1) % screens.length), 3200)
    return () => clearInterval(t)
  }, [reduced, screens.length])

  return (
    <div className="absolute inset-0">
      <AnimatePresence initial={false}>
        <motion.img
          key={screens[i].src}
          src={screens[i].src}
          alt={screens[i].alt}
          className="absolute inset-0 h-full w-full object-cover object-top"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </AnimatePresence>
      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
        {screens.map((s, k) => (
          <span key={s.src} className={`h-1 rounded-full transition-all duration-500 ${k === i ? 'w-5 bg-acento' : 'w-1.5 bg-white/40'}`} />
        ))}
      </div>
    </div>
  )
}
