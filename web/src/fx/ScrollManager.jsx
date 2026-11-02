import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Al cambiar de página sube al inicio; si la URL trae #seccion, baja hasta ella.
export function scrollToHash(hash) {
  const el = hash && document.querySelector(hash)
  if (!el) return false
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -80 })
  else el.scrollIntoView({ behavior: 'smooth' })
  return true
}

export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => scrollToHash(hash), 60)
      return () => clearTimeout(t)
    }
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
