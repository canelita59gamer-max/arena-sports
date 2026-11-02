import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import site from '../data/site.js'
import Reveal from '../fx/Reveal.jsx'
import { ArrowIcon } from '../fx/Expand.jsx'
import { SmartLink } from './Nav.jsx'

// Tarjeta de servicio: casi todo es imagen y título. Al tocarla (o pasar el mouse)
// sube la explicación sobre la foto.
function ServiceCard({ s }) {
  const [open, setOpen] = useState(false)
  return (
    <button
      type="button"
      aria-expanded={open}
      onClick={() => setOpen((v) => !v)}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setOpen(false)}
      className="group relative block h-56 w-full overflow-hidden rounded-3xl border border-white/10 text-left sm:h-80"
    >
      <img
        src={s.img}
        alt=""
        loading="lazy"
        className={`absolute inset-0 h-full w-full object-cover transition duration-700 ${open ? 'scale-110 opacity-40' : 'scale-100 opacity-80'} ${s.dim ? 'object-[center_35%] brightness-[0.7] saturate-[0.55]' : ''}`}
      />
      {s.dim && <div className="absolute inset-0 bg-acento/25 mix-blend-color" />}
      <div className="absolute inset-0 bg-gradient-to-t from-negro via-negro/40 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-6">
        <div className="flex items-end justify-between gap-4">
          <h3 className="font-display text-2xl font-semibold uppercase leading-tight sm:text-[1.7rem]">{s.title}</h3>
          <ArrowIcon open={open} />
        </div>
        <AnimatePresence initial={false}>
          {open && (
            <motion.p
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden pt-3 text-[15px] leading-relaxed text-texto/90"
            >
              {s.desc}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </button>
  )
}

export default function Services() {
  return (
    <section id="servicios" className="relative pb-6 pt-28 sm:pb-10 sm:pt-36">
      <div aria-hidden="true" className="absolute right-0 top-20 h-96 w-96 rounded-full bg-acento/10 blur-[120px]" />
      <div className="container-x relative">
        <Reveal className="mb-12">
          <p className="eyebrow mb-5">Qué ofrecemos</p>
          <h2 className="h-section">Nuestros <span className="text-outline">servicios</span></h2>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {site.services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.08}>
              <ServiceCard s={s} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <SmartLink href="/#contacto" className="text-sm uppercase tracking-[0.2em] text-texto2 underline-offset-8 hover:text-acento hover:underline">
            ¿Buscas algo más específico? Hablemos →
          </SmartLink>
        </Reveal>
      </div>
    </section>
  )
}
