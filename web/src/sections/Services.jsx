import site from '../data/site.js'
import Reveal from '../fx/Reveal.jsx'
import Spotlight from '../fx/Spotlight.jsx'
import { SmartLink } from './Nav.jsx'

export default function Services() {
  return (
    <section id="servicios" className="relative py-28 sm:py-36">
      <div aria-hidden="true" className="absolute right-0 top-20 h-96 w-96 rounded-full bg-acento/10 blur-[120px]" />
      <div className="container-x relative">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <p className="eyebrow mb-5">Qué ofrecemos</p>
            <h2 className="h-section">Nuestros <span className="text-outline">servicios</span></h2>
          </Reveal>
          <Reveal delay={0.1} className="max-w-sm text-texto2">
            Del primer partido a la premiación: organización, contenido y alianzas con estándar profesional.
          </Reveal>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {site.services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.08}>
              <Spotlight className="h-full">
                <div className="flex h-full min-h-[300px] flex-col p-7">
                  {s.img ? (
                    <div className="relative -mx-7 -mt-7 mb-6 h-40 overflow-hidden">
                      <img
                        src={s.img}
                        alt=""
                        loading="lazy"
                        className={`h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-90 ${s.dim ? 'object-[center_35%] brightness-[0.7] saturate-[0.55]' : ''}`}
                      />
                      {s.dim && <div className="absolute inset-0 bg-acento/25 mix-blend-color" />}
                      <div className="absolute inset-0 bg-gradient-to-t from-gris2 to-transparent" />
                    </div>
                  ) : (
                    <div className="mb-6 font-display text-6xl font-bold text-white/[0.07] transition group-hover:text-acento/30">{String(i + 1).padStart(2, '0')}</div>
                  )}
                  <span className="mb-3 text-xs uppercase tracking-[0.25em] text-acento">#{s.tag}</span>
                  <h3 className="font-display text-2xl font-semibold uppercase leading-tight">{s.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-texto2">{s.desc}</p>
                </div>
              </Spotlight>
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
