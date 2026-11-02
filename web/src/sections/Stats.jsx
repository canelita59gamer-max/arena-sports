import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'motion/react'
import site from '../data/site.js'

function Counter({ value, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, value, { duration: 1.8, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, value])
  return <span ref={ref}>{n}{suffix}</span>
}

// Cifras con contador animado. Solo aparece si hay datos reales en site.stats.
export default function Stats() {
  if (site.stats.length === 0) return null
  return (
    <section className="border-y border-white/5 bg-gris1/60 py-14">
      <div className="container-x grid grid-cols-2 gap-8 md:grid-cols-4">
        {site.stats.map((s) => (
          <div key={s.label}>
            <p className="font-display text-5xl font-bold text-acento sm:text-6xl"><Counter value={s.value} suffix={s.suffix} /></p>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-texto2">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
