import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import GradientMesh from '../fx/GradientMesh.jsx'
import Particles from '../fx/Particles.jsx'
import LogoDraw from '../fx/LogoDraw.jsx'
import useReducedMotion from '../fx/useReducedMotion.js'
import { SmartLink } from './Nav.jsx'
import { socials } from './Social.jsx'

const fade = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] },
})

// Ingreso grande centrado en el logo de Arena Sports, como en el index anterior.
export default function Hero() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const logoScale = useTransform(scrollYProgress, [0, 1], [1, 0.82])
  const logoY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const fadeOut = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pb-20 pt-28 text-center">
      <GradientMesh />
      <Particles />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07] [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_75%)]"
        style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '72px 72px' }}
      />

      <motion.div style={reduced ? undefined : { scale: logoScale, y: logoY, opacity: fadeOut }} className="relative w-full max-w-[640px] md:max-w-[780px] xl:max-w-[920px]">
        <h1 className="sr-only">Arena Sports — Donde el juego se vuelve historia</h1>
        <LogoDraw />
      </motion.div>

      <div className="relative mt-10 flex w-full flex-col items-center">
        <motion.div {...fade(2.2)} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <SmartLink href="/#contacto" className="btn-primary">Organiza con nosotros</SmartLink>
          <SmartLink href="/perfil-jugador" className="btn-ghost">
            Conoce Perfil de Jugador <span aria-hidden="true">→</span>
          </SmartLink>
        </motion.div>

        <motion.ul {...fade(2.4)} className="mt-8 flex gap-2.5" aria-label="Redes sociales">
          {socials.map((s) => (
            <li key={s.name}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.name}
                className="glass flex h-11 w-11 items-center justify-center rounded-full text-lg text-texto transition hover:-translate-y-0.5 hover:border-acento/50 hover:text-acento"
              >
                <i className={s.icon} aria-hidden="true" />
              </a>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
