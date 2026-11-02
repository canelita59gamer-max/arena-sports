import { useEffect, useState } from 'react'
import site from '../data/site.js'

// Lo que se ve dentro del celular: capturas reales de la app que se van turnando.
// Todas las imágenes quedan cargadas y apiladas; solo cambia cuál se ve, así la pantalla
// nunca queda en negro mientras pasa de una a otra (ni en celulares lentos).
// Los puntos de abajo dejan elegir la pantalla; tocar uno pausa el cambio automático un rato.
export default function PhoneScreens() {
  const screens = site.player.screens
  const [i, setI] = useState(0)
  const [pausedAt, setPausedAt] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      if (Date.now() - pausedAt > 8000) setI((v) => (v + 1) % screens.length)
    }, 3200)
    return () => clearInterval(t)
  }, [pausedAt, screens.length])

  const pick = (k) => {
    setI(k)
    setPausedAt(Date.now())
  }

  return (
    <div className="absolute inset-0 bg-[#05070d]">
      {screens.map((s, k) => (
        <img
          key={s.src}
          src={s.src}
          alt={k === i ? s.alt : ''}
          aria-hidden={k !== i}
          loading="eager"
          decoding="async"
          draggable="false"
          className="absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700"
          style={{ opacity: k === i ? 1 : 0 }}
        />
      ))}
      <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 gap-1 rounded-full bg-negro/60 px-2 py-1.5 backdrop-blur">
        {screens.map((s, k) => (
          <button
            key={s.src}
            type="button"
            aria-label={`Ver pantalla ${k + 1}: ${s.alt}`}
            aria-current={k === i}
            onClick={() => pick(k)}
            className="flex h-5 items-center px-0.5"
          >
            <span className={`block h-1.5 rounded-full transition-all duration-500 ${k === i ? 'w-5 bg-acento' : 'w-1.5 bg-white/50'}`} />
          </button>
        ))}
      </div>
    </div>
  )
}
