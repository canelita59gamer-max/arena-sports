import { useEffect } from 'react'
import { motion } from 'motion/react'
import site from '../data/site.js'
import GradientMesh from '../fx/GradientMesh.jsx'
import KineticTitle from '../fx/KineticTitle.jsx'
import IsoPhone from '../fx/IsoPhone.jsx'
import Reveal from '../fx/Reveal.jsx'
import Spotlight from '../fx/Spotlight.jsx'
import PhoneScreens from '../sections/PhoneScreens.jsx'
import Blueprint from '../sections/Blueprint.jsx'
import Contact from '../sections/Contact.jsx'
import { buildWhatsAppUrl } from '../lib/whatsapp.js'

const fade = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] },
})

// Página para venderle Perfil de Jugador a los clubes.
export default function PlayerProfilePage() {
  const p = site.player
  const wa = buildWhatsAppUrl(site.social.whatsapp, { topic: 'Perfil de Jugador para mi club' })

  useEffect(() => {
    const prev = document.title
    document.title = 'Perfil de Jugador · Arena Sports'
    return () => { document.title = prev }
  }, [])

  return (
    <>
      <section className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-32">
        <GradientMesh />
        <div className="container-x relative grid items-center gap-16 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <motion.p {...fade(0.05)} className="eyebrow mb-7">Tecnología Arena Sports para clubes</motion.p>
            <KineticTitle
              lines={[{ text: 'La historia', variant: 'solid' }, { text: 'de cada', variant: 'outline' }, { text: 'jugador', variant: 'accent' }]}
              className="text-[14vw] sm:text-[10vw] lg:text-[6.6rem] xl:text-[7.6rem]"
            />
            <motion.p {...fade(0.9)} className="mt-8 max-w-xl text-lg leading-relaxed text-texto2">{p.lead}</motion.p>
            <motion.div {...fade(1.05)} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href={wa} target="_blank" rel="noreferrer" className="btn-primary">Quiero la app para mi club</a>
              <a href={site.appUrl} target="_blank" rel="noreferrer" className="btn-ghost">Entrar a la app ↗</a>
            </motion.div>
            <motion.p {...fade(1.2)} className="mt-6 text-sm text-texto2">Para fútbol y voleibol · Desde el celular · Sin instalar nada</motion.p>
          </div>
          <div className="py-8">
            <IsoPhone>
              <PhoneScreens />
            </IsoPhone>
          </div>
        </div>
      </section>

      <section className="py-28">
        <div className="container-x">
          <Reveal className="mb-14 max-w-2xl">
            <p className="eyebrow mb-5">Qué incluye</p>
            <h2 className="h-section">Todo el club <span className="text-acento">en un solo lugar</span></h2>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {p.features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 2) * 0.08}>
                <Spotlight className="h-full">
                  <div className="p-8">
                    <p className="font-display text-5xl font-bold text-white/[0.08]">{String(i + 1).padStart(2, '0')}</p>
                    <h3 className="mt-4 font-display text-2xl font-semibold uppercase">{f.title}</h3>
                    <p className="mt-3 leading-relaxed text-texto2">{f.desc}</p>
                  </div>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Blueprint id="empezar" eyebrow="Cómo empezar" title="Tu club listo en" accent="3 pasos" steps={p.start} />

      <section className="py-28">
        <div className="container-x">
          <Reveal className="mb-10">
            <p className="eyebrow mb-5">Clubes que ya la usan</p>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {p.clubs.map((c) => (
              <Reveal key={c.name} className="glass flex items-center gap-5 rounded-3xl p-6">
                <img src="/app/escudo-jogo.webp" alt="" className="h-20 w-20 rounded-full object-cover" />
                <div>
                  <h3 className="font-display text-2xl font-semibold uppercase">{c.name}</h3>
                  <p className="text-texto2">{c.city}</p>
                </div>
              </Reveal>
            ))}
            <Reveal className="flex items-center gap-5 rounded-3xl border border-dashed border-acento/30 p-6">
              <span className="flex h-20 w-20 items-center justify-center rounded-full border border-acento/40 text-3xl text-acento">+</span>
              <div>
                <h3 className="font-display text-2xl font-semibold uppercase">Tu club aquí</h3>
                <a href={wa} target="_blank" rel="noreferrer" className="text-acento hover:underline">Escríbenos para unirte →</a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Contact defaultTopic="Perfil de Jugador para mi club" />
    </>
  )
}
