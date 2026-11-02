import site from '../data/site.js'
import { SmartLink } from './Nav.jsx'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 pt-20">
      <div className="container-x grid gap-10 pb-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <img src="/assets/images/logo-arena-full.png" alt="Arena Sports" className="h-16 w-auto" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-texto2">Donde el juego se vuelve historia. Organización profesional de eventos deportivos en Colombia.</p>
        </div>
        <div>
          <p className="mb-4 font-display text-xs uppercase tracking-[0.3em] text-acento">Explora</p>
          <ul className="grid gap-2.5 text-sm text-texto2">
            {site.nav.map((n) => (
              <li key={n.href}><SmartLink href={n.href} className="hover:text-texto">{n.label}</SmartLink></li>
            ))}
            <li><a href={site.torneoUrl} className="hover:text-texto">Torneo en vivo</a></li>
          </ul>
        </div>
        <div>
          <p className="mb-4 font-display text-xs uppercase tracking-[0.3em] text-acento">Síguenos</p>
          <ul className="grid gap-2.5 text-sm text-texto2">
            <li><a href={site.social.instagram} target="_blank" rel="noreferrer" className="hover:text-texto">Instagram</a></li>
            <li><a href={site.social.tiktok} target="_blank" rel="noreferrer" className="hover:text-texto">TikTok</a></li>
            <li><a href={site.social.youtube} target="_blank" rel="noreferrer" className="hover:text-texto">YouTube</a></li>
            <li><a href={`mailto:${site.social.email}`} className="hover:text-texto">{site.social.email}</a></li>
          </ul>
        </div>
      </div>
      <p aria-hidden="true" className="select-none whitespace-nowrap text-center font-display text-[21vw] font-bold uppercase leading-[0.8] text-white/[0.03]">Arena Sports</p>
      <p className="border-t border-white/5 py-6 text-center text-xs text-texto2/70">© {new Date().getFullYear()} Arena Sports · Todos los derechos reservados</p>
    </footer>
  )
}
