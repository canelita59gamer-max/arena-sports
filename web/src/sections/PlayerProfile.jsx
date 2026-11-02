import { motion } from 'motion/react'
import site from '../data/site.js'
import useReducedMotion from '../fx/useReducedMotion.js'
import Reveal from '../fx/Reveal.jsx'
import IsoPhone from '../fx/IsoPhone.jsx'
import PhoneScreens from './PhoneScreens.jsx'
import { SmartLink } from './Nav.jsx'

// Sección estrella de la landing: presenta Perfil de Jugador.
export default function PlayerProfile() {
  const p = site.player
  const reduced = useReducedMotion()
  return (
    <section id="perfil" className="relative overflow-hidden pb-28 sm:pb-36">
      {/* línea de luz que conecta Servicios con Perfil de Jugador */}
      <div aria-hidden="true" className="relative mx-auto mb-4 flex w-px flex-col items-center sm:mb-10">
        <div className="h-16 w-px bg-gradient-to-b from-transparent via-acento/60 to-acento sm:h-24" />
        <motion.span
          className="absolute top-0 h-6 w-[3px] rounded-full bg-acento shadow-[0_0_14px_#E8FF00]"
          animate={reduced ? undefined : { y: [0, 80], opacity: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeIn' }}
        />
        <span className="h-2.5 w-2.5 rounded-full bg-acento shadow-[0_0_16px_4px_rgba(232,255,0,0.6)]" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(30,58,138,0.35),transparent_60%)]" />
      <div aria-hidden="true" className="absolute left-[60%] top-1/3 h-[28rem] w-[28rem] rounded-full bg-acento/10 blur-[140px]" />

      <div className="container-x relative grid items-center gap-16 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <Reveal>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-acento/30 bg-acento/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-acento">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-acento" /> Nuevo · Tecnología Arena
            </span>
            <h2 className="h-section">
              Perfil de <span className="text-acento">Jugador</span>
            </h2>
            <p className="mt-3 font-display text-xl uppercase tracking-wide text-texto2 sm:text-2xl">{p.tagline}</p>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-texto2">{p.lead}</p>
          </Reveal>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {p.features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.07} className="glass rounded-2xl p-5">
                <p className="font-display text-base font-semibold uppercase tracking-wide text-texto">{f.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-texto2">{f.desc}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <SmartLink href="/perfil-jugador" className="btn-primary">Ver más</SmartLink>
            <a href={site.appUrl} target="_blank" rel="noreferrer" className="btn-ghost">Entrar a la app ↗</a>
          </Reveal>
        </div>

        <div className="order-1 pb-24 pt-4 lg:order-2">
          <IsoPhone badges={p.badges}>
            <PhoneScreens />
          </IsoPhone>
        </div>
      </div>
    </section>
  )
}
