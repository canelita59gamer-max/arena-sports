import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import site from '../data/site.js'
import Reveal from '../fx/Reveal.jsx'
import useReducedMotion from '../fx/useReducedMotion.js'

export default function Events() {
  const { featured, past } = site.events
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section id="eventos" className="py-28 sm:py-36">
      <div className="container-x">
        <Reveal className="mb-14">
          <p className="eyebrow mb-5">Trayectoria</p>
          <h2 className="h-section">Eventos <span className="text-outline">que hicimos historia</span></h2>
        </Reveal>

        <Reveal>
          <div ref={ref} className="relative grid items-center overflow-hidden rounded-[2rem] border border-white/10 bg-black md:grid-cols-2">
            <div aria-hidden="true" className="absolute right-[10%] top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-acento/20 blur-[110px]" />
            <div className="relative order-2 p-7 sm:p-12 md:order-1">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-red-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" /> En vivo
              </span>
              <h3 className="font-display text-5xl font-bold uppercase sm:text-7xl">{featured.name}</h3>
              <p className="mt-4 max-w-md text-texto2 sm:text-lg">{featured.desc}</p>
              <a href={site.torneoUrl} className="btn-primary mt-8">Ver torneo en vivo →</a>
            </div>
            <div className="relative order-1 flex justify-center p-8 md:order-2 md:p-12">
              <motion.img
                src={featured.img}
                alt={`Logo de ${featured.name}`}
                loading="lazy"
                className="w-full max-w-[280px] mix-blend-lighten sm:max-w-[380px]"
                style={reduced ? undefined : { y: imgY }}
              />
            </div>
          </div>
        </Reveal>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {past.map((e) => (
            <Reveal key={e.name} className="glass flex items-center gap-5 overflow-hidden rounded-3xl p-4">
              <img src={e.img} alt="" loading="lazy" className="h-28 w-28 shrink-0 rounded-2xl object-cover sm:h-32 sm:w-32" />
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-acento">{e.date}</p>
                <h3 className="mt-1 font-display text-xl font-semibold uppercase leading-tight">{e.name}</h3>
                <p className="mt-2 text-sm text-texto2">{e.desc}</p>
              </div>
            </Reveal>
          ))}
          <Reveal className="flex items-center justify-center rounded-3xl border border-dashed border-white/15 p-8 text-center">
            <div>
              <p className="font-display text-xl uppercase text-texto">Tu evento aquí</p>
              <p className="mt-1 text-sm text-texto2">El próximo capítulo lo escribimos juntos.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
