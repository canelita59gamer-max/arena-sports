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
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="eventos" className="py-28 sm:py-36">
      <div className="container-x">
        <Reveal className="mb-14">
          <p className="eyebrow mb-5">Trayectoria</p>
          <h2 className="h-section">Eventos <span className="text-outline">que hicimos historia</span></h2>
        </Reveal>

        <Reveal>
          <div ref={ref} className="group relative overflow-hidden rounded-[2rem] border border-white/10">
            <motion.img
              src={featured.img}
              alt={`${featured.name} — torneo de Arena Sports`}
              loading="lazy"
              className="h-[460px] w-full scale-110 object-cover sm:h-[540px]"
              style={reduced ? undefined : { y: imgY }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-negro via-negro/60 to-negro/10" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 p-7 sm:p-12 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-red-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" /> En vivo
                </span>
                <h3 className="font-display text-5xl font-bold uppercase sm:text-7xl">{featured.name}</h3>
                <p className="mt-3 text-texto2 sm:text-lg">{featured.desc}</p>
              </div>
              <a href={site.torneoUrl} className="btn-primary shrink-0">Ver torneo en vivo →</a>
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
