import site from '../data/site.js'
import Reveal from '../fx/Reveal.jsx'
import useReducedMotion from '../fx/useReducedMotion.js'
import { SmartLink } from './Nav.jsx'

// Fondo claro: varios logos son oscuros y se perderían sobre el negro.
function Logo({ s, hidden, grid }) {
  return (
    <li
      aria-hidden={hidden}
      className={`flex h-28 shrink-0 items-center justify-center rounded-2xl bg-white/[0.94] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.4)] ring-1 ring-white/10 sm:h-32 sm:w-56 ${grid ? 'w-[calc(50%-0.5rem)]' : 'w-44'}`}
    >
      <img src={s.logo} alt={hidden ? '' : s.name} className="max-h-full max-w-full rounded-lg object-contain opacity-90 transition duration-300 hover:scale-105 hover:opacity-100" />
    </li>
  )
}

// Carrusel infinito de logos. Con "reducir movimiento" se muestran todos en cuadrícula,
// así ninguno queda escondido fuera de pantalla.
export default function Sponsors() {
  const reduced = useReducedMotion()
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

      {reduced ? (
        <ul className="container-x flex flex-wrap justify-center gap-4">
          {site.sponsors.map((s) => <Logo key={s.name} s={s} grid />)}
        </ul>
      ) : (
        <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <ul className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
            {[...site.sponsors, ...site.sponsors].map((s, i) => (
              <Logo key={i} s={s} hidden={i >= site.sponsors.length} />
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
