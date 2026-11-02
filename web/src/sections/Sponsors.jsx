import site from '../data/site.js'
import Reveal from '../fx/Reveal.jsx'
import { SmartLink } from './Nav.jsx'

export default function Sponsors() {
  const row = [...site.sponsors, ...site.sponsors]
  return (
    <section id="patrocinadores" className="py-28 sm:py-32">
      <div className="container-x mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <Reveal>
          <p className="eyebrow mb-5">Gracias por creer en nosotros</p>
          <h2 className="h-section">Nuestros <span className="text-outline">patrocinadores</span></h2>
        </Reveal>
        <Reveal delay={0.1}>
          <SmartLink href="/#contacto" className="btn-ghost">Quiero patrocinar</SmartLink>
        </Reveal>
      </div>

      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <ul className="flex w-max animate-marquee gap-5 hover:[animation-play-state:paused] motion-reduce:animate-none">
          {row.map((s, i) => (
            <li key={i} aria-hidden={i >= site.sponsors.length} className="glass flex h-28 w-48 shrink-0 items-center justify-center rounded-2xl p-5 sm:h-32 sm:w-56">
              <img src={s.logo} alt={s.name} loading="lazy" className="max-h-full max-w-full rounded-lg object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
