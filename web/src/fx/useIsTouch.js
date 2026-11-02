import { useState } from 'react'

// true en celulares/tablets (sin mouse fino): se simplifican los efectos de cursor.
export default function useIsTouch() {
  const [touch] = useState(
    () => typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(hover: none), (pointer: coarse)').matches,
  )
  return touch
}
