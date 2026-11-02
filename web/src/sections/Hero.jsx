import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import site from '../data/site.js'
import GradientMesh from '../fx/GradientMesh.jsx'
import Particles from '../fx/Particles.jsx'
import KineticTitle from '../fx/KineticTitle.jsx'
import useReducedMotion from '../fx/useReducedMotion.js'
import { SmartLink } from './Nav.jsx'

const fade = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] },
})

export default function Hero() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const ballY = useTransform(scrollYProgress, [0, 1], [0, 160])
  const ballRotate = useTransform(scrollYProgress, [0, 1], [0, 90])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80])

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28">
      <GradientMesh />
      <Particles />
      {/* cuadrícula sutil tipo cancha */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07] [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_75%)]"
        style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '72px 72px' }}
      />

      <motion.div style={reduced ? undefined : { y: contentY }} className="container-x relative grid items-center gap-10 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <motion.p {...fade(0.05)} className="eyebrow mb-7">{site.hero.eyebrow}</motion.p>
          <KineticTitle lines={site.hero.lines} className="text-[15vw] sm:text-[11vw] lg:text-[7.4rem] xl:text-[8.6rem]" />
          <motion.p {...fade(1.1)} className="mt-8 max-w-xl text-base leading-relaxed text-texto2 sm:text-lg">
            {site.hero.lead}
          </motion.p>
          <motion.div {...fade(1.25)} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <SmartLink href="/#contacto" className="btn-primary">Organiza con nosotros</SmartLink>
            <SmartLink href="/perfil-jugador" className="btn-ghost">
              Conoce Perfil de Jugador <span aria-hidden="true">→</span>
            </SmartLink>
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto hidden w-full max-w-md lg:block"
          initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.5, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div aria-hidden="true" className="absolute inset-[12%] rounded-full bg-acento/20 blur-[80px]" />
          <motion.img
            src="/assets/images/balon-arena.webp"
            alt="Balón oficial de Arena Sports"
            className="relative w-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.8)]"
            style={reduced ? undefined : { y: ballY, rotate: ballRotate }}
            animate={reduced ? undefined : { y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        {...fade(1.6)}
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-texto2 sm:flex"
      >
        Scroll
        <span className="h-10 w-px overflow-hidden bg-white/10">
          <motion.span
            className="block h-1/2 w-px bg-acento"
            animate={reduced ? undefined : { y: ['-100%', '200%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.div>
    </section>
  )
}
