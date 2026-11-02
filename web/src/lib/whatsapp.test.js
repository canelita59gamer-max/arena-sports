import { describe, expect, it } from 'vitest'
import { buildWhatsAppUrl } from './whatsapp.js'

describe('buildWhatsAppUrl', () => {
  it('codifica tildes, & y saltos de línea', () => {
    const url = buildWhatsAppUrl('573222462392', { name: 'José & Cía', message: 'Hola\nquiero un torneo' })
    expect(url.startsWith('https://wa.me/573222462392?text=')).toBe(true)
    expect(url).toContain('Jos%C3%A9%20%26%20C%C3%ADa')
    expect(url).toContain('%0A')
    expect(url).not.toContain(' ')
  })

  it('incluye el tema y el contacto cuando vienen', () => {
    const url = decodeURIComponent(buildWhatsAppUrl('57300', { name: 'Ana', contact: 'ana@x.co', topic: 'Patrocinar un evento', message: 'Hola' }))
    expect(url).toContain('Ana')
    expect(url).toContain('ana@x.co')
    expect(url).toContain('Patrocinar un evento')
  })

  it('sin datos manda un saludo genérico', () => {
    const url = decodeURIComponent(buildWhatsAppUrl('57300', {}))
    expect(url).toContain('Hola Arena Sports')
  })
})
