import site from '../data/site.js'
import Reveal from '../fx/Reveal.jsx'
import KineticTitle from '../fx/KineticTitle.jsx'

const s = site.social

// Lista única de redes: la usan el hero, esta sección, el dock flotante y el contacto.
export const socials = [
  { name: 'Instagram', icon: 'fa-brands fa-instagram', href: s.instagram, handle: s.handle, desc: 'Historias, reels y lo que pasa detrás de cada jornada.', glow: 'rgba(225,48,108,0.45)', grad: 'from-[#f58529] via-[#dd2a7b] to-[#8134af]' },
  { name: 'TikTok', icon: 'fa-brands fa-tiktok', href: s.tiktok, handle: s.handle, desc: 'Clips cortos, jugadas y la energía de cada partido.', glow: 'rgba(37,244,238,0.4)', grad: 'from-[#25f4ee] via-[#111] to-[#fe2c55]' },
  { name: 'YouTube', icon: 'fa-brands fa-youtube', href: s.youtube, handle: '@ArenaSportsCo', desc: 'Resúmenes y momentos clave de cada torneo.', glow: 'rgba(255,0,0,0.4)', grad: 'from-[#ff0000] to-[#900]' },
  { name: 'Facebook', icon: 'fa-brands fa-facebook-f', href: s.facebook, handle: 'Arena Sports', desc: 'Anuncios, fechas y fotos de cada evento.', glow: 'rgba(24,119,242,0.45)', grad: 'from-[#1877f2] to-[#0b3d91]' },
  { name: 'WhatsApp', icon: 'fa-brands fa-whatsapp', href: `https://wa.me/${s.whatsapp}`, handle: s.whatsappLabel, desc: 'Inscripciones y consultas: respuesta directa para equipos y marcas.', glow: 'rgba(37,211,102,0.45)', grad: 'from-[#25d366] to-[#128c7e]' },
]

// Sección grande "Síguenos": cada red es una tarjeta con su color de marca al pasar el mouse.
export default function Social() {
  return (
    <section id="redes" className="relative overflow-hidden py-28 sm:py-36">
      <div aria-hidden="true" className="absolute left-1/2 top-1/3 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-acento/10 blur-[150px]" />
      <div className="container-x relative">
        <Reveal className="mb-4 text-center">
          <p className="eyebrow">Síguenos</p>
        </Reveal>
        <div className="mb-14 text-center">
          <KineticTitle
            as="h2"
            delay={0}
            lines={[{ text: s.handle, variant: 'accent' }]}
            className="text-[9.5vw] sm:text-7xl lg:text-8xl"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
          {socials.map((n, i) => (
            <Reveal key={n.name} delay={i * 0.07} className="h-full last:col-span-2 lg:last:col-span-1">
              <a
                href={n.href}
                target="_blank"
                rel="noreferrer"
                className="glass group relative flex h-full flex-col overflow-hidden rounded-3xl p-5 transition duration-500 hover:-translate-y-1.5 sm:p-6"
                style={{ '--glow': n.glow }}
              >
                <span aria-hidden="true" className={`absolute inset-0 bg-gradient-to-br ${n.grad} opacity-0 transition duration-500 group-hover:opacity-[0.18]`} />
                <span aria-hidden="true" className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" style={{ background: 'var(--glow)' }} />
                <span className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${n.grad} text-2xl text-white shadow-lg`}>
                  <i className={n.icon} aria-hidden="true" />
                </span>
                <span className="relative mt-5 flex items-center justify-between font-display text-xl font-semibold uppercase sm:text-2xl">
                  {n.name}
                  <span aria-hidden="true" className="text-base text-texto2 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-acento">↗</span>
                </span>
                <span className="relative mt-1 truncate text-sm text-acento">{n.handle}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// Botones flotantes de redes: columna fija a la derecha en computador, WhatsApp en celular.
export function SocialDock() {
  const wa = socials.find((n) => n.name === 'WhatsApp')
  return (
    <>
      <ul className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 xl:flex" aria-label="Redes sociales">
        {socials.map((n) => (
          <li key={n.name}>
            <a
              href={n.href}
              target="_blank"
              rel="noreferrer"
              aria-label={n.name}
              className="glass group flex h-11 w-11 items-center justify-center rounded-full bg-negro/50 text-texto2 transition hover:scale-110 hover:border-acento/50 hover:text-acento"
            >
              <i className={n.icon} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
      <a
        href={wa.href}
        target="_blank"
        rel="noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-3xl text-white shadow-[0_10px_40px_rgba(37,211,102,0.5)] transition hover:scale-110 xl:hidden"
      >
        <i className="fa-brands fa-whatsapp" aria-hidden="true" />
      </a>
    </>
  )
}
