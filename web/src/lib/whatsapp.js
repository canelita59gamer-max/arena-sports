// Arma el link de WhatsApp con el mensaje del formulario ya escrito.
export function buildWhatsAppUrl(phone, { name, contact, topic, message } = {}) {
  const lines = ['Hola Arena Sports 👋']
  if (name) lines.push(`Soy ${name}.`)
  if (topic) lines.push(`Me interesa: ${topic}.`)
  if (message) lines.push('', message)
  if (contact) lines.push('', `Mi contacto: ${contact}`)
  return `https://wa.me/${phone}?text=${encodeURIComponent(lines.join('\n'))}`
}
