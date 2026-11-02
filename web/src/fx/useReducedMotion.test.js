import { renderHook } from './testing.js'
import { afterEach, describe, expect, it, vi } from 'vitest'
import useReducedMotion from './useReducedMotion.js'

function mockMatchMedia(matches) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: query === '(prefers-reduced-motion: reduce)' ? matches : false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }))
}

describe('useReducedMotion', () => {
  afterEach(() => vi.restoreAllMocks())

  it('devuelve true cuando el sistema pide reducir movimiento', () => {
    mockMatchMedia(true)
    expect(renderHook(useReducedMotion)).toBe(true)
  })

  it('devuelve false cuando no lo pide', () => {
    mockMatchMedia(false)
    expect(renderHook(useReducedMotion)).toBe(false)
  })
})
