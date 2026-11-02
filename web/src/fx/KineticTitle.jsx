import { motion } from 'motion/react'
import useReducedMotion from './useReducedMotion.js'

const variantClass = {
  solid: 'text-texto',
  accent: 'text-acento drop-shadow-[0_0_30px_rgba(232,255,0,0.35)]',
  outline: 'text-outline',
}

// Título con kinetic type: cada letra sube desde abajo con rotación, línea por línea.
// El texto completo queda en aria-label para lectores de pantalla.
export default function KineticTitle({ lines, as: Tag = 'h1', className = '', delay = 0.2 }) {
  const reduced = useReducedMotion()
  const label = lines.map((l) => l.text).join(' ')
  let index = 0

  return (
    <Tag aria-label={label} className={`font-display font-bold uppercase leading-[0.88] tracking-tight ${className}`}>
      {lines.map((line, li) => (
        <span key={li} aria-hidden="true" className={`block overflow-hidden pb-[0.06em] ${variantClass[line.variant]}`}>
          {line.text.split(' ').map((word, wi, words) => (
            <span key={wi} className="inline-block whitespace-nowrap">
              {[...word].map((ch, ci) => {
                const i = index++
                return reduced ? (
                  <motion.span
                    key={ci}
                    className="inline-block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: delay + i * 0.02, duration: 0.6 }}
                  >
                    {ch}
                  </motion.span>
                ) : (
                  <motion.span
                    key={ci}
                    className="inline-block origin-bottom-left"
                    initial={{ y: '110%', rotate: 8, opacity: 0 }}
                    animate={{ y: '0%', rotate: 0, opacity: 1 }}
                    transition={{ delay: delay + i * 0.035, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {ch}
                  </motion.span>
                )
              })}
              {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  )
}
