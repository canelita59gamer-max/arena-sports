import { useEffect, useRef } from 'react'
import useReducedMotion from './useReducedMotion.js'
import useIsTouch from './useIsTouch.js'

// Partículas en canvas que flotan, se unen con líneas cercanas y se apartan del mouse.
export default function Particles({ count, className = '' }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const touch = useIsTouch()

  useEffect(() => {
    if (reduced) return
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const n = count ?? (touch ? 30 : 90)
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const mouse = { x: -9999, y: -9999 }
    let w = 0
    let h = 0
    let raf
    let visible = true

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const pts = Array.from({ length: n }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.6,
      lime: Math.random() < 0.35,
    }))

    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of pts) {
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const d2 = dx * dx + dy * dy
        if (d2 < 16000) {
          const f = (16000 - d2) / 16000
          p.vx += (dx / Math.sqrt(d2 + 1)) * f * 0.6
          p.vy += (dy / Math.sqrt(d2 + 1)) * f * 0.6
        }
        p.vx *= 0.96
        p.vy *= 0.96
        p.vx += (Math.random() - 0.5) * 0.02
        p.vy += (Math.random() - 0.5) * 0.02
        p.x += p.vx + 0.05
        p.y += p.vy - 0.08
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i]
          const b = pts[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 110) {
            ctx.strokeStyle = `rgba(232,255,0,${(1 - d / 110) * 0.12})`
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      for (const p of pts) {
        ctx.fillStyle = p.lime ? 'rgba(232,255,0,0.85)' : 'rgba(240,240,240,0.55)'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      if (visible) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }
    // Pausa cuando el hero sale de pantalla, para no gastar batería.
    const io = new IntersectionObserver(([entry]) => {
      const was = visible
      visible = entry.isIntersecting
      if (visible && !was) raf = requestAnimationFrame(tick)
    })
    io.observe(canvas)
    window.addEventListener('resize', resize)
    if (!touch) {
      window.addEventListener('pointermove', onMove)
      document.addEventListener('pointerleave', onLeave)
    }
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [reduced, touch, count])

  if (reduced) return null
  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />
}
