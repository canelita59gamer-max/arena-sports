// Mini renderHook sin dependencias extra: monta el hook y devuelve su valor.
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { act } from 'react'

globalThis.IS_REACT_ACT_ENVIRONMENT = true

export function renderHook(hook) {
  let value
  function Probe() {
    value = hook()
    return null
  }
  const root = createRoot(document.createElement('div'))
  act(() => root.render(createElement(Probe)))
  act(() => root.unmount())
  return value
}
