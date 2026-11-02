import { motion } from 'motion/react'
import useReducedMotion from './useReducedMotion.js'

// Aparece suave (sube y se desenfoca a nítido) cuando entra en pantalla.
export default function Reveal({ children, delay = 0, y = 32, className = '', as = 'div' }) {
  const reduced = useReducedMotion()
  const Tag = motion[as]
  if (reduced) {
    // Sin desplazamiento: solo un fundido suave, que no marea.
    return (
      <Tag className={className} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay }}>
        {children}
      </Tag>
    )
  }
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  )
}
