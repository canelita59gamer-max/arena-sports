import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import site from '../data/site.js'
import Reveal from '../fx/Reveal.jsx'
import useReducedMotion from '../fx/useReducedMotion.js'

// "Cómo organizamos tu torneo" con estética de plano técnico:
// cuadrícula azul, cotas y una línea que se dibuja con el scroll uniendo los pasos.
export default function Blueprint({ id = 'proceso', title = 'Cómo organizamos', accent = 'tu torneo', eyebrow = 'El proceso', steps = site.steps }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const draw = useSpring(scrollYProgress, { stiffness: 60, damping: 20 })

  return (
    <section id={id} ref={ref} className="relative overflow-hidden border-y border-sky-400/10 bg-[#06101f] py-28 sm:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(rgba(56,189,248,0.10) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,0.10) 1px,transparent 1px),linear-gradient(rgba(56,189,248,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,0.05) 1px,transparent 1px)',
          backgroundSize: '96px 96px,96px 96px,24px 24px,24px 24px',
        }}
      />
      <div className="container-x relative">
        <Reveal className="mb-16 max-w-2xl">
          <p className="mb-5 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-sky-300">
            <span className="h-px w-8 bg-sky-300" /> {eyebrow} · Plano A-01
          </p>
          <h2 className="h-section">
            {title} <span className="text-acento">{accent}</span>
          </h2>
        </Reveal>

        <div className="relative">
          {/* línea que conecta los pasos (horizontal en escritorio) */}
          <svg aria-hidden="true" className="absolute left-0 top-[34px] hidden h-4 w-full lg:block" preserveAspectRatio="none" viewBox="0 0 100 4">
            <line x1="0" y1="2" x2="100" y2="2" stroke="rgba(56,189,248,0.25)" strokeWidth="0.3" strokeDasharray="1 1" />
            <motion.line x1="0" y1="2" x2="100" y2="2" stroke="#E8FF00" strokeWidth="0.4" style={{ pathLength: reduced ? 1 : draw }} />
          </svg>

          <ol className="grid gap-6 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.12} className="relative">
                <div className="relative z-10 mb-6 flex h-[68px] w-[68px] items-center justify-center rounded-full border border-sky-300/40 bg-[#06101f] font-mono text-lg text-acento">
                  <span className="absolute inset-[-7px] rounded-full border border-dashed border-sky-300/25" />
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="relative rounded-xl border border-sky-300/20 bg-sky-400/[0.03] p-6">
                  <span className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-sky-300/60 to-transparent" />
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-sky-300/70">Paso {i + 1} / {steps.length}</p>
                  <h3 className="font-display text-2xl font-semibold uppercase">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-texto2">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
