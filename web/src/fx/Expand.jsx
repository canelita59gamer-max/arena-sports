import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

// Ícono + que gira a × cuando el contenido está abierto.
export function PlusIcon({ open, className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition duration-300 ${
        open ? 'rotate-45 border-acento bg-acento text-negro' : 'border-white/20 text-texto'
      } ${className}`}
    >
      <span className="absolute h-[1.5px] w-3 bg-current" />
      <span className="absolute h-3 w-[1.5px] bg-current" />
    </span>
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
        <PlusIcon open={open} />
      </button>
      <Reveal open={open} id={id}>
        <p className="pb-5 pr-12 text-[15px] leading-relaxed text-texto2">{children}</p>
      </Reveal>
    </div>
  )
}
