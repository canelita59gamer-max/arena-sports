import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

// Flecha discreta que apunta a la derecha y gira hacia abajo cuando el contenido está abierto.
export function ArrowIcon({ open, className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-5 w-5 shrink-0 transition duration-300 ${open ? 'rotate-90 text-acento' : 'text-texto2 group-hover:translate-x-0.5 group-hover:text-acento'} ${className}`}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

// Contenido que se despliega con animación de altura.
export function Reveal({ open, id, children, className = '' }) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          id={id}
          key="body"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`overflow-hidden ${className}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Fila de acordeón: se ve solo el título; al tocar se abre la explicación.
export default function ExpandItem({ title, children, lead, className = '' }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return (
    <div className={`border-b border-white/10 ${className}`}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full items-center gap-4 py-5 text-left"
      >
        {lead}
        <span className={`flex-1 font-display text-lg font-semibold uppercase tracking-wide transition sm:text-xl ${open ? 'text-acento' : 'text-texto group-hover:text-acento'}`}>
          {title}
        </span>
        <ArrowIcon open={open} />
      </button>
      <Reveal open={open} id={id}>
        <p className="pb-5 pr-12 text-[15px] leading-relaxed text-texto2">{children}</p>
      </Reveal>
    </div>
  )
}
