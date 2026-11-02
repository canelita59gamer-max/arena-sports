// Cinta lima inclinada con texto corriendo, separa el hero del resto.
const words = ['Torneos', 'Perfil de Jugador', 'Ligas corporativas', 'Cobertura', 'Patrocinios', 'Comunidad']

export default function Marquee() {
  const row = [...words, ...words]
  return (
    <div className="relative z-10 -my-2 -rotate-[1.5deg] overflow-hidden bg-acento py-3.5 shadow-[0_0_60px_rgba(232,255,0,0.25)]" aria-hidden="true">
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0">
            {row.map((w, i) => (
              <span key={i} className="flex items-center gap-6 px-6 font-display text-lg font-bold uppercase tracking-[0.2em] text-negro">
                {w} <span className="text-sm">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
