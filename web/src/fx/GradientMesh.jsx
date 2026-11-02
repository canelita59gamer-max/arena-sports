// Fondo gradient mesh: manchas de color difuminadas que se mueven lento.
// Solo CSS (transform), así que no pesa. Con reduced motion quedan quietas.
import useReducedMotion from './useReducedMotion.js'

const blobs = [
  { color: 'rgba(232,255,0,0.22)', size: '55vmax', top: '-20%', left: '-15%', dur: 22 },
  { color: 'rgba(30,58,138,0.55)', size: '60vmax', top: '10%', left: '45%', dur: 28 },
  { color: 'rgba(184,224,0,0.14)', size: '45vmax', top: '55%', left: '-10%', dur: 26 },
  { color: 'rgba(56,189,248,0.16)', size: '40vmax', top: '60%', left: '60%', dur: 32 },
]

export default function GradientMesh({ className = '' }) {
  const reduced = useReducedMotion()
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <style>{`
        @keyframes mesh-drift {
          0%,100% { transform: translate3d(0,0,0) scale(1); }
          33% { transform: translate3d(6%,-8%,0) scale(1.12); }
          66% { transform: translate3d(-7%,5%,0) scale(0.92); }
        }
      `}</style>
      {blobs.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-[90px] will-change-transform"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            background: `radial-gradient(circle at center, ${b.color}, transparent 65%)`,
            animation: reduced ? 'none' : `mesh-drift ${b.dur}s ease-in-out ${i * -5}s infinite`,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#080808_85%)]" />
    </div>
  )
}
