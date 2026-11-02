import { useLayoutEffect, useRef, useState } from 'react'
import logoPaths from './logoPaths.js'
import useReducedMotion from './useReducedMotion.js'

// El ingreso grande de Arena Sports: el logo se dibuja trazo por trazo con brillo lima
// y al terminar aparece encima el logo real (PNG). Misma idea que el index anterior.
const ICON_STEP = 22
const ICON_DRAW = 850
const TEXT_START = 900
const TEXT_STEP = 30
const TEXT_DRAW = 700
const EASE = 'cubic-bezier(.65,0,.35,1)'

export default function LogoDraw({ className = '' }) {
  const svgRef = useRef(null)
  const reduced = useReducedMotion()
  const [phase, setPhase] = useState(reduced ? 'done' : 'drawing') // drawing → raster → done

  useLayoutEffect(() => {
    if (reduced) {
      setPhase('done')
      return
    }
    const svg = svgRef.current
    const icon = [...svg.querySelectorAll('#logoIconPaths path')]
    const text = [...svg.querySelectorAll('#logoTextPaths path')]
    for (const p of [...icon, ...text]) {
      const len = p.getTotalLength()
      p.style.strokeDasharray = String(len)
      p.style.strokeDashoffset = String(len)
    }
    const timers = []
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        icon.forEach((p, i) => {
          p.style.transition = `stroke-dashoffset ${ICON_DRAW}ms ${EASE} ${i * ICON_STEP}ms`
          p.style.strokeDashoffset = '0'
        })
        text.forEach((p, i) => {
          p.style.transition = `stroke-dashoffset ${TEXT_DRAW}ms ${EASE} ${TEXT_START + i * TEXT_STEP}ms`
          p.style.strokeDashoffset = '0'
        })
        const total = Math.max((icon.length - 1) * ICON_STEP + ICON_DRAW, TEXT_START + (text.length - 1) * TEXT_STEP + TEXT_DRAW)
        timers.push(setTimeout(() => setPhase('raster'), total + 180))
        timers.push(setTimeout(() => setPhase('done'), total + 1200))
      }),
    )
    return () => {
      cancelAnimationFrame(raf)
      timers.forEach(clearTimeout)
    }
  }, [reduced])

  return (
    <div className={`relative mx-auto aspect-[608/427] w-full ${className}`}>
      {phase !== 'done' && (
        <svg
          ref={svgRef}
          viewBox="0 0 608 427"
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full overflow-visible transition-[opacity,filter] duration-700 ${
            phase === 'drawing' ? 'drop-shadow-[0_0_14px_rgba(200,240,0,0.4)]' : 'opacity-0'
          }`}
          dangerouslySetInnerHTML={{ __html: logoPaths }}
        />
      )}
      <img
        src="/assets/images/logo-arena-full.png"
        alt="Arena Sports"
        className={`absolute inset-0 h-full w-full object-contain transition duration-1000 ${
          phase === 'drawing' ? 'scale-[0.98] opacity-0' : 'scale-100 opacity-100'
        } drop-shadow-[0_0_60px_rgba(232,255,0,0.25)]`}
      />
    </div>
  )
}
