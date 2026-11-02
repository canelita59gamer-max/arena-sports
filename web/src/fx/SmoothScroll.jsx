import { useEffect } from 'react'
import Lenis from 'lenis'
import useReducedMotion from './useReducedMotion.js'

// Scroll suave con Lenis. Se expone en window.__lenis para que los links internos lo usen.
export default function SmoothScroll({ children }) {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    window.__lenis = lenis
    let raf
    const loop = (t) => {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      delete window.__lenis
    }
  }, [reduced])

  return children
}
