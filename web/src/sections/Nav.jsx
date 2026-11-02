import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import site from '../data/site.js'
import { scrollToHash } from '../fx/ScrollManager.jsx'

// Link que entiende rutas con #seccion: si ya estás en esa página, solo hace scroll.
export function SmartLink({ href, children, onClick, ...rest }) {
  const { pathname } = useLocation()
  const [path, hash] = href.split('#')
  const handle = (e) => {
    onClick?.()
    if (hash && (path || '/') === pathname && scrollToHash(`#${hash}`)) e.preventDefault()
  }
  if (href.startsWith('http') || href.endsWith('.html')) {
    return <a href={href} onClick={onClick} {...rest}>{children}</a>
  }
  return <Link to={href} onClick={handle} {...rest}>{children}</Link>
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-6 ${
          scrolled ? 'glass bg-negro/60' : 'border border-transparent'
        }`}
        aria-label="Principal"
      >
        <Link to="/" className="flex items-center gap-2.5" aria-label="Arena Sports, inicio">
          <img src="/assets/images/logo-arena-full.png" alt="" className="h-9 w-auto" />
          <span className="hidden font-display text-sm font-semibold uppercase tracking-[0.25em] text-texto sm:inline">Arena Sports</span>
        </Link>

        <div className="hidden items-center gap-5 lg:flex xl:gap-7">
          {site.nav.map((item) => (
            <SmartLink key={item.href} href={item.href} className="whitespace-nowrap font-display text-[13px] uppercase tracking-[0.16em] text-texto2 transition hover:text-acento">
              {item.label}
            </SmartLink>
          ))}
          <SmartLink href="/#contacto" className="btn-primary !px-5 !py-2.5 !text-xs">Contacto</SmartLink>
        </div>

        <button
          type="button"
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full glass lg:hidden"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`absolute h-0.5 w-5 bg-texto transition ${open ? 'rotate-45' : '-translate-y-1.5'}`} />
          <span className={`absolute h-0.5 w-5 bg-texto transition ${open ? '-rotate-45' : 'translate-y-1.5'}`} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center bg-negro/90 px-8 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...site.nav, { label: 'Contacto', href: '/#contacto' }].map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.06, ease: [0.16, 1, 0.3, 1], duration: 0.6 }}
              >
                <SmartLink href={item.href} onClick={() => setOpen(false)} className="block py-3 font-display text-4xl font-bold uppercase text-texto hover:text-acento">
                  {item.label}
                </SmartLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
